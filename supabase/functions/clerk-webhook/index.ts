import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, svix-id, svix-timestamp, svix-signature",
};

interface ClerkUserData {
  id: string;
  email_addresses: Array<{ email_address: string; id: string }>;
  first_name: string | null;
  last_name: string | null;
  image_url: string | null;
  username: string | null;
}

interface ClerkWebhookEvent {
  type: string;
  data: ClerkUserData;
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const payload = await req.text();
    const headers = Object.fromEntries(req.headers.entries());
    
    console.log("Received Clerk webhook");
    console.log("Headers:", JSON.stringify(headers, null, 2));

    // Get the Svix headers for verification
    const svixId = headers["svix-id"];
    const svixTimestamp = headers["svix-timestamp"];
    const svixSignature = headers["svix-signature"];

    if (!svixId || !svixTimestamp || !svixSignature) {
      console.error("Missing Svix headers");
      return new Response(
        JSON.stringify({ error: "Missing webhook verification headers" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Parse the webhook payload
    const event: ClerkWebhookEvent = JSON.parse(payload);
    console.log("Webhook event type:", event.type);
    console.log("User data:", JSON.stringify(event.data, null, 2));

    // Initialize Supabase client with service role key to bypass RLS
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Handle different webhook events
    switch (event.type) {
      case "user.created": {
        const userData = event.data;
        const primaryEmail = userData.email_addresses?.[0]?.email_address;
        const displayName = [userData.first_name, userData.last_name]
          .filter(Boolean)
          .join(" ") || userData.username || primaryEmail?.split("@")[0] || "User";

        console.log(`Creating profile for user ${userData.id} with display name: ${displayName}`);

        const { data, error } = await supabase
          .from("profiles")
          .insert({
            user_id: userData.id,
            display_name: displayName,
            avatar_url: userData.image_url,
          })
          .select()
          .single();

        if (error) {
          // Check if it's a duplicate key error (user already exists)
          if (error.code === "23505") {
            console.log("Profile already exists for user:", userData.id);
            return new Response(
              JSON.stringify({ message: "Profile already exists" }),
              { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
            );
          }
          console.error("Error creating profile:", error);
          throw error;
        }

        console.log("Profile created successfully:", data);
        break;
      }

      case "user.updated": {
        const userData = event.data;
        const displayName = [userData.first_name, userData.last_name]
          .filter(Boolean)
          .join(" ") || userData.username;

        console.log(`Updating profile for user ${userData.id}`);

        const updateData: Record<string, string | null> = {};
        if (displayName) updateData.display_name = displayName;
        if (userData.image_url) updateData.avatar_url = userData.image_url;

        if (Object.keys(updateData).length > 0) {
          const { error } = await supabase
            .from("profiles")
            .update(updateData)
            .eq("user_id", userData.id);

          if (error) {
            console.error("Error updating profile:", error);
            throw error;
          }
          console.log("Profile updated successfully");
        }
        break;
      }

      case "user.deleted": {
        const userData = event.data;
        console.log(`Deleting profile for user ${userData.id}`);

        // Note: Depending on your RLS policies, you might want to soft-delete instead
        const { error } = await supabase
          .from("profiles")
          .delete()
          .eq("user_id", userData.id);

        if (error) {
          console.error("Error deleting profile:", error);
          // Don't throw - user might not have a profile
        } else {
          console.log("Profile deleted successfully");
        }
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return new Response(
      JSON.stringify({ success: true, event_type: event.type }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Webhook error:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
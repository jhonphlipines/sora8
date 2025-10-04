import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import { User, LogOut, Twitter, Linkedin, Github, Globe, Save } from "lucide-react";
import { z } from "zod";

const profileSchema = z.object({
  display_name: z.string().trim().max(100, "Name must be less than 100 characters").optional(),
  bio: z.string().trim().max(500, "Bio must be less than 500 characters").optional(),
  avatar_url: z.string().trim().url("Must be a valid URL").or(z.literal("")).optional(),
  twitter_url: z.string().trim().url("Must be a valid URL").or(z.literal("")).optional(),
  linkedin_url: z.string().trim().url("Must be a valid URL").or(z.literal("")).optional(),
  github_url: z.string().trim().url("Must be a valid URL").or(z.literal("")).optional(),
  website_url: z.string().trim().url("Must be a valid URL").or(z.literal("")).optional(),
});

interface Profile {
  display_name: string;
  bio: string;
  avatar_url: string;
  twitter_url: string;
  linkedin_url: string;
  github_url: string;
  website_url: string;
}

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState<Profile>({
    display_name: "",
    bio: "",
    avatar_url: "",
    twitter_url: "",
    linkedin_url: "",
    github_url: "",
    website_url: "",
  });

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        navigate("/auth");
        return;
      }

      setUser(user);

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      if (data) {
        setProfile({
          display_name: data.display_name || "",
          bio: data.bio || "",
          avatar_url: data.avatar_url || "",
          twitter_url: data.twitter_url || "",
          linkedin_url: data.linkedin_url || "",
          github_url: data.github_url || "",
          website_url: data.website_url || "",
        });
      }
    } catch (error) {
      console.error("Error loading profile:", error);
      toast.error("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      const validated = profileSchema.parse(profile);
      setSaving(true);

      const { error } = await supabase
        .from("profiles")
        .upsert({
          user_id: user.id,
          display_name: validated.display_name || null,
          bio: validated.bio || null,
          avatar_url: validated.avatar_url || null,
          twitter_url: validated.twitter_url || null,
          linkedin_url: validated.linkedin_url || null,
          github_url: validated.github_url || null,
          website_url: validated.website_url || null,
        });

      if (error) throw error;

      toast.success("Profile updated successfully!");
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error(error.errors[0].message);
      } else {
        console.error("Error saving profile:", error);
        toast.error("Failed to save profile");
      }
    } finally {
      setSaving(false);
    }
  };

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error("Error signing out");
    } else {
      toast.success("Signed out successfully");
      navigate("/auth");
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Profile Settings</h1>
        <p className="text-muted-foreground">Manage your account information and social links</p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={profile.avatar_url} alt={profile.display_name} />
                <AvatarFallback className="bg-primary/10 text-primary text-xl">
                  <User className="h-8 w-8" />
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle>{profile.display_name || "Anonymous User"}</CardTitle>
                <CardDescription>{user?.email}</CardDescription>
              </div>
            </div>
            <Button variant="destructive" onClick={handleSignOut}>
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>Update your profile details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="display_name">Display Name</Label>
            <Input
              id="display_name"
              placeholder="Your name"
              value={profile.display_name}
              onChange={(e) => setProfile({ ...profile, display_name: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              placeholder="Tell us about yourself"
              value={profile.bio}
              onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="avatar_url">Avatar URL</Label>
            <Input
              id="avatar_url"
              type="url"
              placeholder="https://example.com/avatar.jpg"
              value={profile.avatar_url}
              onChange={(e) => setProfile({ ...profile, avatar_url: e.target.value })}
            />
          </div>

          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold mb-4">Social Links</h3>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="twitter_url" className="flex items-center gap-2">
                  <Twitter className="h-4 w-4" />
                  Twitter
                </Label>
                <Input
                  id="twitter_url"
                  type="url"
                  placeholder="https://twitter.com/username"
                  value={profile.twitter_url}
                  onChange={(e) => setProfile({ ...profile, twitter_url: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="linkedin_url" className="flex items-center gap-2">
                  <Linkedin className="h-4 w-4" />
                  LinkedIn
                </Label>
                <Input
                  id="linkedin_url"
                  type="url"
                  placeholder="https://linkedin.com/in/username"
                  value={profile.linkedin_url}
                  onChange={(e) => setProfile({ ...profile, linkedin_url: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="github_url" className="flex items-center gap-2">
                  <Github className="h-4 w-4" />
                  GitHub
                </Label>
                <Input
                  id="github_url"
                  type="url"
                  placeholder="https://github.com/username"
                  value={profile.github_url}
                  onChange={(e) => setProfile({ ...profile, github_url: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="website_url" className="flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  Website
                </Label>
                <Input
                  id="website_url"
                  type="url"
                  placeholder="https://yourwebsite.com"
                  value={profile.website_url}
                  onChange={(e) => setProfile({ ...profile, website_url: e.target.value })}
                />
              </div>
            </div>
          </div>

          <Button onClick={handleSave} disabled={saving} className="w-full" size="lg">
            <Save className="h-4 w-4 mr-2" />
            {saving ? "Saving..." : "Save Changes"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;

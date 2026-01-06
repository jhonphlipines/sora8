import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Copy, Link2, Users, MousePointer, DollarSign, TrendingUp, RefreshCw, Share2 } from "lucide-react";
import { Header } from "@/components/Header";
interface AffiliateStats {
  link_id: string;
  user_id: string;
  referral_code: string;
  created_at: string;
  is_active: boolean;
  total_clicks: number;
  total_signups: number;
  paid_count: number;
}
const Affiliate = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [stats, setStats] = useState<AffiliateStats | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: {
          user
        }
      } = await supabase.auth.getUser();
      if (!user) {
        navigate('/auth');
        return;
      }
      setUserId(user.id);
      fetchStats(user.id);
    };
    checkAuth();
  }, [navigate]);
  const fetchStats = async (uid: string) => {
    setLoading(true);
    try {
      const {
        data,
        error
      } = await supabase.from('affiliate_stats').select('*').eq('user_id', uid).maybeSingle();
      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching stats:', error);
        toast.error('Failed to load affiliate stats');
      }
      setStats(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };
  const generateReferralCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 8; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };
  const createAffiliateLink = async () => {
    if (!userId) return;
    setCreating(true);
    try {
      const referralCode = generateReferralCode();
      const {
        error
      } = await supabase.from('affiliate_links').insert({
        user_id: userId,
        referral_code: referralCode
      });
      if (error) {
        if (error.code === '23505') {
          toast.error('You already have an affiliate link');
        } else {
          toast.error('Failed to create affiliate link');
        }
        return;
      }
      toast.success('Affiliate link created successfully!');
      fetchStats(userId);
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to create affiliate link');
    } finally {
      setCreating(false);
    }
  };
  const copyLink = () => {
    if (!stats) return;
    const link = `${window.location.origin}/auth?ref=${stats.referral_code}`;
    navigator.clipboard.writeText(link);
    toast.success('Link copied to clipboard!');
  };
  const shareLink = async () => {
    if (!stats) return;
    const link = `${window.location.origin}/auth?ref=${stats.referral_code}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Join and learn programming!',
          text: 'Start your coding journey with this learning platform',
          url: link
        });
      } catch (error) {
        copyLink();
      }
    } else {
      copyLink();
    }
  };
  const referralLink = stats ? `${window.location.origin}/auth?ref=${stats.referral_code}` : '';
  return <div className="min-h-screen bg-background">
      
      
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Affiliate Dashboard</h1>
          <p className="text-muted-foreground">
            Share your unique link and track referrals
          </p>
        </div>

        {loading ? <div className="flex items-center justify-center py-20">
            <RefreshCw className="h-8 w-8 animate-spin text-primary" />
          </div> : !stats ? <Card className="max-w-lg mx-auto">
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Link2 className="h-8 w-8 text-primary" />
              </div>
              <CardTitle>Start Your Affiliate Journey</CardTitle>
              <CardDescription>
                Create your unique referral link to start earning. Share it with friends and track your progress.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <Button onClick={createAffiliateLink} disabled={creating} size="lg">
                {creating ? <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </> : <>
                    <Link2 className="mr-2 h-4 w-4" />
                    Create Affiliate Link
                  </>}
              </Button>
            </CardContent>
          </Card> : <div className="space-y-6">
            {/* Referral Link Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Link2 className="h-5 w-5" />
                  Your Referral Link
                </CardTitle>
                <CardDescription>
                  Share this link to earn referrals
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Input value={referralLink} readOnly className="flex-1 font-mono text-sm" />
                  <div className="flex gap-2">
                    <Button onClick={copyLink} variant="outline" className="gap-2">
                      <Copy className="h-4 w-4" />
                      Copy
                    </Button>
                    <Button onClick={shareLink} className="gap-2">
                      <Share2 className="h-4 w-4" />
                      Share
                    </Button>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-3">
                  Referral Code: <span className="font-mono font-semibold">{stats.referral_code}</span>
                </p>
              </CardContent>
            </Card>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-500/10 rounded-lg">
                      <MousePointer className="h-6 w-6 text-blue-500" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Total Clicks</p>
                      <p className="text-3xl font-bold">{stats.total_clicks}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-green-500/10 rounded-lg">
                      <Users className="h-6 w-6 text-green-500" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Total Signups</p>
                      <p className="text-3xl font-bold">{stats.total_signups}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-yellow-500/10 rounded-lg">
                      <DollarSign className="h-6 w-6 text-yellow-500" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Paid Users</p>
                      <p className="text-3xl font-bold">{stats.paid_count}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-purple-500/10 rounded-lg">
                      <TrendingUp className="h-6 w-6 text-purple-500" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Conversion Rate</p>
                      <p className="text-3xl font-bold">
                        {stats.total_clicks > 0 ? `${(stats.total_signups / stats.total_clicks * 100).toFixed(1)}%` : '0%'}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Tips Card */}
            <Card>
              <CardHeader>
                <CardTitle>Tips to Maximize Referrals</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    Share your link on social media platforms like Twitter, LinkedIn, and Facebook
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    Write a blog post or create a video about your learning experience
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    Share in programming communities and forums where people are looking to learn
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    Include your referral link in your email signature or social profiles
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>}
      </main>
    </div>;
};
export default Affiliate;
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Copy, Link2, Users, MousePointer, DollarSign, TrendingUp, RefreshCw, Share2, Wallet, Phone, CreditCard, Calendar } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

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

interface AffiliateLinkData {
  upi_phone_number: string | null;
  upi_id: string | null;
}

const Affiliate = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [stats, setStats] = useState<AffiliateStats | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [upiDetails, setUpiDetails] = useState<AffiliateLinkData>({ upi_phone_number: null, upi_id: null });
  const [upiPhone, setUpiPhone] = useState("");
  const [upiId, setUpiId] = useState("");
  const [savingUpi, setSavingUpi] = useState(false);
  const [withdrawDialogOpen, setWithdrawDialogOpen] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [withdrawCurrency, setWithdrawCurrency] = useState<"INR" | "USD">("INR");
  const [requestingPayout, setRequestingPayout] = useState(false);

  const MIN_WITHDRAWAL_INR = 4000;
  const MIN_WITHDRAWAL_USD = 50;

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/auth');
        return;
      }
      setUserId(user.id);
      fetchStats(user.id);
      fetchUpiDetails(user.id);
    };
    checkAuth();
  }, [navigate]);

  const fetchStats = async (uid: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('affiliate_stats')
        .select('*')
        .eq('user_id', uid)
        .maybeSingle();
      
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

  const fetchUpiDetails = async (uid: string) => {
    try {
      const { data, error } = await supabase
        .from('affiliate_links')
        .select('upi_phone_number, upi_id')
        .eq('user_id', uid)
        .maybeSingle();
      
      if (data) {
        setUpiDetails(data);
        setUpiPhone(data.upi_phone_number || "");
        setUpiId(data.upi_id || "");
      }
    } catch (error) {
      console.error('Error fetching UPI details:', error);
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
      const { error } = await supabase
        .from('affiliate_links')
        .insert({
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

  const saveUpiDetails = async () => {
    if (!userId || !stats) return;
    
    if (!upiPhone && !upiId) {
      toast.error('Please enter at least one UPI detail');
      return;
    }

    setSavingUpi(true);
    try {
      const { error } = await supabase
        .from('affiliate_links')
        .update({
          upi_phone_number: upiPhone || null,
          upi_id: upiId || null
        })
        .eq('user_id', userId);
      
      if (error) throw error;
      
      setUpiDetails({ upi_phone_number: upiPhone || null, upi_id: upiId || null });
      toast.success('UPI details saved successfully!');
    } catch (error) {
      console.error('Error saving UPI details:', error);
      toast.error('Failed to save UPI details');
    } finally {
      setSavingUpi(false);
    }
  };

  const requestPayout = async () => {
    if (!userId || !stats) return;

    const amount = parseFloat(withdrawAmount);
    const minAmount = withdrawCurrency === 'INR' ? MIN_WITHDRAWAL_INR : MIN_WITHDRAWAL_USD;

    if (isNaN(amount) || amount < minAmount) {
      toast.error(`Minimum withdrawal is ${withdrawCurrency === 'INR' ? '₹4,000' : '$50'}`);
      return;
    }

    if (!upiDetails.upi_phone_number && !upiDetails.upi_id) {
      toast.error('Please save your UPI details first');
      return;
    }

    setRequestingPayout(true);
    try {
      const { error } = await supabase
        .from('affiliate_payouts')
        .insert({
          user_id: userId,
          upi_phone_number: upiDetails.upi_phone_number,
          upi_id: upiDetails.upi_id,
          amount: amount,
          currency: withdrawCurrency,
          payout_type: 'manual'
        });
      
      if (error) throw error;
      
      toast.success('Payout request submitted! You will receive payment within 5 business days.');
      setWithdrawDialogOpen(false);
      setWithdrawAmount("");
    } catch (error) {
      console.error('Error requesting payout:', error);
      toast.error('Failed to submit payout request');
    } finally {
      setRequestingPayout(false);
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
  const estimatedEarnings = stats ? stats.paid_count * 10 : 0; // 10% commission assumption

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Affiliate Dashboard</h1>
          <p className="text-muted-foreground">
            Share your unique link and earn <span className="text-primary font-semibold">10% commission</span> per paid user!
          </p>
        </div>

        {/* Commission Banner */}
        <Card className="mb-6 bg-transparent border-primary/30">
          <CardContent className="py-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/20 rounded-full">
                  <DollarSign className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Earn 10% Commission</h3>
                  <p className="text-muted-foreground">For every paid user you refer, you earn 10% of their payment!</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Share2 className="h-5 w-5 text-primary" />
                <span className="font-medium">Share → Signup → Earn</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <RefreshCw className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : !stats ? (
          <Card className="max-w-lg mx-auto">
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
                {creating ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <Link2 className="mr-2 h-4 w-4" />
                    Create Affiliate Link
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
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

            {/* UPI Details & Withdrawal Card */}
            <Card className="border-primary/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wallet className="h-5 w-5 text-primary" />
                  Withdrawal Settings
                </CardTitle>
                <CardDescription>
                  Add your UPI details for receiving payouts. Minimum withdrawal: ₹4,000 or $50.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="upi-phone" className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      UPI Phone Number
                    </Label>
                    <Input
                      id="upi-phone"
                      placeholder="Enter 10-digit phone number"
                      value={upiPhone}
                      onChange={(e) => setUpiPhone(e.target.value)}
                      maxLength={10}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="upi-id" className="flex items-center gap-2">
                      <CreditCard className="h-4 w-4" />
                      UPI ID
                    </Label>
                    <Input
                      id="upi-id"
                      placeholder="example@upi"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button onClick={saveUpiDetails} disabled={savingUpi} variant="outline" className="gap-2">
                    {savingUpi ? <RefreshCw className="h-4 w-4 animate-spin" /> : null}
                    Save UPI Details
                  </Button>

                  <Dialog open={withdrawDialogOpen} onOpenChange={setWithdrawDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="gap-2" disabled={!upiDetails.upi_phone_number && !upiDetails.upi_id}>
                        <Wallet className="h-4 w-4" />
                        Request Withdrawal
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Request Payout</DialogTitle>
                        <DialogDescription>
                          Minimum withdrawal: ₹4,000 (INR) or $50 (USD). Payouts are processed within 5 business days or on monthly basis.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 mt-4">
                        <div className="space-y-2">
                          <Label>Currency</Label>
                          <div className="flex gap-2">
                            <Button
                              variant={withdrawCurrency === 'INR' ? 'default' : 'outline'}
                              onClick={() => setWithdrawCurrency('INR')}
                              className="flex-1"
                            >
                              ₹ INR
                            </Button>
                            <Button
                              variant={withdrawCurrency === 'USD' ? 'default' : 'outline'}
                              onClick={() => setWithdrawCurrency('USD')}
                              className="flex-1"
                            >
                              $ USD
                            </Button>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="withdraw-amount">
                            Amount ({withdrawCurrency === 'INR' ? 'Min ₹4,000' : 'Min $50'})
                          </Label>
                          <Input
                            id="withdraw-amount"
                            type="number"
                            placeholder={withdrawCurrency === 'INR' ? '4000' : '50'}
                            value={withdrawAmount}
                            onChange={(e) => setWithdrawAmount(e.target.value)}
                            min={withdrawCurrency === 'INR' ? MIN_WITHDRAWAL_INR : MIN_WITHDRAWAL_USD}
                          />
                        </div>
                        <div className="bg-muted/50 p-3 rounded-lg text-sm space-y-1">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span>Payout within 5 business days or monthly</span>
                          </div>
                          <p className="text-muted-foreground text-xs">
                            Your UPI: {upiDetails.upi_id || upiDetails.upi_phone_number}
                          </p>
                        </div>
                        <Button 
                          onClick={requestPayout} 
                          disabled={requestingPayout}
                          className="w-full"
                        >
                          {requestingPayout ? (
                            <>
                              <RefreshCw className="h-4 w-4 animate-spin mr-2" />
                              Submitting...
                            </>
                          ) : (
                            'Submit Request'
                          )}
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardContent>
            </Card>

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
          </div>
        )}
      </main>
    </div>
  );
};

export default Affiliate;
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { 
  BarChart, 
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import { 
  TrendingUp, 
  Trophy,
  ArrowLeft,
  Target,
  Clock,
  Award,
  BookOpen,
  Code
} from "lucide-react";

interface PerformanceData {
  coursesCompleted: number;
  problemsSolved: number;
  certificatesEarned: number;
  totalTimeSpent: number;
  averageScore: number;
  coursesByCategory: { name: string; count: number; color: string }[];
  progressOverTime: { date: string; courses: number; problems: number }[];
  recentActivity: { type: string; name: string; date: Date; score?: number }[];
}

const DataAnalysis = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<PerformanceData>({
    coursesCompleted: 0,
    problemsSolved: 0,
    certificatesEarned: 0,
    totalTimeSpent: 0,
    averageScore: 0,
    coursesByCategory: [],
    progressOverTime: [],
    recentActivity: []
  });

  const COLORS = ['#8B5CF6', '#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#EC4899'];

  useEffect(() => {
    fetchPerformanceData();
    
    // Set up realtime subscriptions
    const coursesChannel = supabase
      .channel('course-progress-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'user_course_progress' }, () => {
        fetchPerformanceData();
      })
      .subscribe();

    const problemsChannel = supabase
      .channel('problems-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'user_problems_solved' }, () => {
        fetchPerformanceData();
      })
      .subscribe();

    const certificatesChannel = supabase
      .channel('certificates-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'user_certificates' }, () => {
        fetchPerformanceData();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(coursesChannel);
      supabase.removeChannel(problemsChannel);
      supabase.removeChannel(certificatesChannel);
    };
  }, []);

  const fetchPerformanceData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Fetch courses completed
      const { data: courses } = await supabase
        .from('user_course_progress')
        .select('*')
        .eq('user_id', user.id);

      // Fetch problems solved
      const { data: problems } = await supabase
        .from('user_problems_solved')
        .select('*')
        .eq('user_id', user.id);

      // Fetch certificates
      const { data: certificates } = await supabase
        .from('user_certificates')
        .select('*')
        .eq('user_id', user.id);

      // Calculate metrics
      const coursesCompleted = courses?.length || 0;
      const problemsSolved = problems?.length || 0;
      const certificatesEarned = certificates?.length || 0;
      
      const totalTimeSpent = (courses?.reduce((sum, c) => sum + (c.time_taken_seconds || 0), 0) || 0) +
                             (problems?.reduce((sum, p) => sum + (p.time_taken_seconds || 0), 0) || 0);
      
      const averageScore = courses && courses.length > 0
        ? Math.round(courses.reduce((sum, c) => sum + c.score, 0) / courses.length)
        : 0;

      // Group courses by category
      const categoryMap = new Map<string, number>();
      courses?.forEach(course => {
        const count = categoryMap.get(course.category_id) || 0;
        categoryMap.set(course.category_id, count + 1);
      });

      const coursesByCategory = Array.from(categoryMap.entries()).map(([name, count], idx) => ({
        name: name.charAt(0).toUpperCase() + name.slice(1),
        count,
        color: COLORS[idx % COLORS.length]
      }));

      // Progress over time (last 7 days)
      const last7Days = Array.from({ length: 7 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - (6 - i));
        return date.toISOString().split('T')[0];
      });

      const progressOverTime = last7Days.map(date => {
        const coursesOnDate = courses?.filter(c => 
          c.completed_at.startsWith(date)
        ).length || 0;
        
        const problemsOnDate = problems?.filter(p => 
          p.solved_at.startsWith(date)
        ).length || 0;

        return {
          date: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          courses: coursesOnDate,
          problems: problemsOnDate
        };
      });

      // Recent activity
      const recentActivity = [
        ...(courses?.slice(-5).map(c => ({
          type: 'course',
          name: c.level_id,
          date: new Date(c.completed_at),
          score: c.score
        })) || []),
        ...(problems?.slice(-5).map(p => ({
          type: 'problem',
          name: p.problem_id,
          date: new Date(p.solved_at)
        })) || []),
        ...(certificates?.slice(-5).map(c => ({
          type: 'certificate',
          name: c.certificate_name,
          date: new Date(c.earned_at)
        })) || [])
      ].sort((a, b) => b.date.getTime() - a.date.getTime()).slice(0, 5);

      setData({
        coursesCompleted,
        problemsSolved,
        certificatesEarned,
        totalTimeSpent,
        averageScore,
        coursesByCategory,
        progressOverTime,
        recentActivity
      });
    } catch (error) {
      toast({
        title: "Error loading data",
        description: "Failed to fetch performance analytics",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/")}
              className="text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Performance Analytics</h1>
              <p className="text-muted-foreground">
                Real-time insights into your learning progress
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <Card className="bg-gradient-to-br from-violet-500/10 to-violet-600/10 border-violet-500/20">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Courses</p>
                  <p className="text-3xl font-bold text-foreground">{data.coursesCompleted}</p>
                </div>
                <BookOpen className="h-10 w-10 text-violet-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border-blue-500/20">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Problems</p>
                  <p className="text-3xl font-bold text-foreground">{data.problemsSolved}</p>
                </div>
                <Code className="h-10 w-10 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500/10 to-green-600/10 border-green-500/20">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Certificates</p>
                  <p className="text-3xl font-bold text-foreground">{data.certificatesEarned}</p>
                </div>
                <Award className="h-10 w-10 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500/10 to-orange-600/10 border-orange-500/20">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Time Spent</p>
                  <p className="text-2xl font-bold text-foreground">{formatTime(data.totalTimeSpent)}</p>
                </div>
                <Clock className="h-10 w-10 text-orange-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-pink-500/10 to-pink-600/10 border-pink-500/20">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg Score</p>
                  <p className="text-3xl font-bold text-foreground">{data.averageScore}%</p>
                </div>
                <Target className="h-10 w-10 text-pink-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Progress Over Time */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Progress Over Time (Last 7 Days)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data.progressOverTime}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="courses" stroke="#8B5CF6" strokeWidth={2} name="Courses" />
                  <Line type="monotone" dataKey="problems" stroke="#3B82F6" strokeWidth={2} name="Problems" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Courses by Category */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5" />
                Courses by Category
              </CardTitle>
            </CardHeader>
            <CardContent>
              {data.coursesByCategory.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={data.coursesByCategory}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="count"
                    >
                      {data.coursesByCategory.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                  No course data yet
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest achievements and progress</CardDescription>
          </CardHeader>
          <CardContent>
            {data.recentActivity.length > 0 ? (
              <div className="space-y-3">
                {data.recentActivity.map((activity, idx) => (
                  <div key={idx} className="flex items-center gap-4 p-3 bg-muted/30 rounded-lg">
                    {activity.type === 'course' && <BookOpen className="h-5 w-5 text-violet-500" />}
                    {activity.type === 'problem' && <Code className="h-5 w-5 text-blue-500" />}
                    {activity.type === 'certificate' && <Award className="h-5 w-5 text-green-500" />}
                    
                    <div className="flex-1">
                      <p className="font-medium text-foreground">{activity.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {activity.date.toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                    
                    {activity.score !== undefined && (
                      <Badge variant="secondary">{activity.score}%</Badge>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Trophy className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No activity yet. Start learning to see your progress!</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DataAnalysis;

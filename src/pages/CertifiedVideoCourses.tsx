import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Play, Award, Clock, Users, BookOpen, CheckCircle2, Loader2, Lock, CreditCard } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Certificate } from "@/components/Certificate";

interface VideoCourse {
  id: string;
  title: string;
  description: string;
  youtubeId: string;
  duration: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  category: string;
  certified: boolean;
}

const videoCourses: VideoCourse[] = [
  {
    id: "ai-engineer-basics",
    title: "AI Engineer Basic and Roadmap",
    description: "Learn the fundamentals of becoming an AI Engineer. This comprehensive guide covers the essential skills, tools, and roadmap you need to start your journey in artificial intelligence and machine learning.",
    youtubeId: "MOdWhV9q29U",
    duration: "Full Course",
    level: "Beginner",
    category: "AI & Machine Learning",
    certified: true,
  },
  {
    id: "python-basics",
    title: "First Steps in Python Basic",
    description: "Get started with Python programming from scratch. This beginner-friendly course covers Python basics, syntax, data types, and fundamental programming concepts to build a strong foundation.",
    youtubeId: "gVAusNhmjhM",
    duration: "Full Course",
    level: "Beginner",
    category: "Python Programming",
    certified: true,
  },
  {
    id: "web-development-course",
    title: "Web Development Complete Course",
    description: "Master web development from scratch with this comprehensive course. Learn HTML, CSS, JavaScript, and modern web technologies to build responsive and interactive websites.",
    youtubeId: "2GvdTJaJTRM",
    duration: "Full Course",
    level: "Beginner",
    category: "Web Development",
    certified: true,
  },
  {
    id: "Huggingface-ai-agent",
    title: "Huggingface-ai-agent-course",
    description: "Master the basics of Hugging Face AI Agents with this comprehensive course.",
    youtubeId: "jWEe1fSa5F4",
    duration: "Full Course",
    level: "Intermediate",
    category: "Data Structures",
    certified: true,
  },
];

const CertifiedVideoCourses = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedCourse, setSelectedCourse] = useState<VideoCourse | null>(null);
  const [completedCourses, setCompletedCourses] = useState<Set<string>>(new Set());
  const [isCompleting, setIsCompleting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showCertificate, setShowCertificate] = useState(false);
  const [userName, setUserName] = useState<string>("");

  useEffect(() => {
    fetchCompletedCourses();
  }, []);

  const fetchCompletedCourses = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setLoading(false);
        return;
      }

      // Get user display name
      const { data: profileData } = await supabase
        .from('profiles')
        .select('display_name')
        .eq('user_id', user.id)
        .maybeSingle();
      
      setUserName(profileData?.display_name || user.email?.split('@')[0] || 'Student');

      const { data, error } = await supabase
        .from('user_certificates')
        .select('category_id')
        .eq('user_id', user.id)
        .like('category_id', 'video-course-%');

      if (error) throw error;

      const completed = new Set(data?.map(cert => cert.category_id.replace('video-course-', '')) || []);
      setCompletedCourses(completed);
    } catch (error) {
      console.error('Error fetching completed courses:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCompleteCourse = async (course: VideoCourse) => {
    setIsCompleting(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: "Login Required",
          description: "Please login to complete courses and earn certificates",
          variant: "destructive"
        });
        return;
      }

      // Check if already completed
      if (completedCourses.has(course.id)) {
        toast({
          title: "Already Completed",
          description: "You have already completed this course and earned a certificate!",
        });
        return;
      }

      // Create certificate
      const { error } = await supabase
        .from('user_certificates')
        .insert({
          user_id: user.id,
          category_id: `video-course-${course.id}`,
          certificate_name: `${course.title} - Video Course Completion`,
        });

      if (error) throw error;

      setCompletedCourses(prev => new Set([...prev, course.id]));
      
      toast({
        title: "🎉 Course Completed!",
        description: "Certificate earned! View it in your Completions page.",
      });

    } catch (error) {
      console.error('Error completing course:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to complete course",
        variant: "destructive"
      });
    } finally {
      setIsCompleting(false);
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Beginner":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "Intermediate":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "Advanced":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      default:
        return "bg-primary/20 text-primary border-primary/30";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (selectedCourse) {
    const isCompleted = completedCourses.has(selectedCourse.id);

    return (
      <div className="min-h-screen bg-background p-4 sm:p-6 pb-24">
        <div className="max-w-6xl mx-auto">
          <Button
            variant="ghost"
            onClick={() => setSelectedCourse(null)}
            className="mb-4 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Courses
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Video Player */}
            <div className="lg:col-span-2">
              <Card className="overflow-hidden border-border/50 bg-card/50 backdrop-blur">
                <div className="aspect-video bg-muted">
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${selectedCourse.youtubeId}?rel=0&modestbranding=1`}
                    title={selectedCourse.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    loading="eager"
                    className="w-full h-full"
                  />
                </div>
              </Card>

              <Card className="mt-4 border-border/50 bg-card/50 backdrop-blur">
                <CardHeader>
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge className={getLevelColor(selectedCourse.level)}>
                      {selectedCourse.level}
                    </Badge>
                    <Badge variant="outline" className="border-primary/30 text-primary">
                      {selectedCourse.category}
                    </Badge>
                    {selectedCourse.certified && (
                      <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30">
                        <Award className="h-3 w-3 mr-1" />
                        Certified
                      </Badge>
                    )}
                    {isCompleted && (
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                        <CheckCircle2 className="h-3 w-3 mr-1" />
                        Completed
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-xl sm:text-2xl text-foreground mt-2">
                    {selectedCourse.title}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    {selectedCourse.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>

            {/* Course Info Sidebar */}
            <div className="space-y-4">
              <Card className="border-border/50 bg-card/50 backdrop-blur">
                <CardHeader>
                  <CardTitle className="text-lg text-foreground flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-primary" />
                    Course Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{selectedCourse.duration}</span>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>Self-paced learning</span>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Award className="h-4 w-4" />
                    <span>Certificate included</span>
                  </div>
                </CardContent>
              </Card>

              {/* Complete Course Card */}
              <Card className={`border-2 ${isCompleted ? 'border-green-500/30 bg-green-500/5' : 'border-primary/30 bg-primary/5'} backdrop-blur`}>
                <CardContent className="p-4">
                  {isCompleted ? (
                    <>
                      <div className="flex items-center gap-2 text-green-400 mb-2">
                        <CheckCircle2 className="h-5 w-5" />
                        <span className="font-semibold">Course Completed!</span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">
                        Unlock your certificate to view and download it.
                      </p>
                      <Button 
                        className="w-full"
                        onClick={() => setShowCertificate(true)}
                      >
                        <Lock className="h-4 w-4 mr-2" />
                        Unlock Certificate
                      </Button>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center gap-2 text-primary mb-2">
                        <Award className="h-5 w-5" />
                        <span className="font-semibold">Earn Your Certificate</span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">
                        Watch the complete video course and mark it as completed to earn your verified certificate.
                      </p>
                      <Button 
                        className="w-full bg-primary hover:bg-primary/90"
                        onClick={() => handleCompleteCourse(selectedCourse)}
                        disabled={isCompleting}
                      >
                        {isCompleting ? (
                          <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          <>
                            <CheckCircle2 className="h-4 w-4 mr-2" />
                            Mark as Completed
                          </>
                        )}
                      </Button>
                    </>
                  )}
                </CardContent>
              </Card>

              <Card className="border-amber-500/30 bg-amber-500/5 backdrop-blur">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 text-amber-400 mb-2">
                    <CreditCard className="h-5 w-5" />
                    <span className="font-semibold">Certificate Pricing</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    First 2 certificates are free! Additional certificates require 1 credit each.
                  </p>
                  <Button 
                    variant="outline"
                    size="sm"
                    className="w-full border-amber-500/50 text-amber-400 hover:bg-amber-500/10"
                    onClick={() => navigate('/pricing')}
                  >
                    <CreditCard className="h-4 w-4 mr-2" />
                    Buy Credits
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Certificate Modal */}
          {showCertificate && (
            <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 overflow-y-auto">
              <div className="relative w-full max-w-5xl my-8">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowCertificate(false)}
                  className="absolute -top-12 right-0 text-white border-white/30 hover:bg-white/10"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Course
                </Button>
                <Certificate
                  studentName={userName}
                  score={100}
                  totalQuestions={100}
                  courseName={selectedCourse.title}
                  completionDate={new Date()}
                  certificateId={`video-course-${selectedCourse.id}`}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 pb-24">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Award className="h-8 w-8 text-primary" />
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
              Certified Video Courses
            </h1>
          </div>
          <p className="text-muted-foreground">
            Learn from expert-curated video courses and earn certificates to showcase your skills.
          </p>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {videoCourses.map((course) => {
            const isCompleted = completedCourses.has(course.id);
            
            return (
              <Card
                key={course.id}
                className={`group cursor-pointer border-border/50 bg-card/50 backdrop-blur hover:border-primary/50 transition-all duration-300 overflow-hidden ${isCompleted ? 'ring-2 ring-green-500/30' : ''}`}
                onClick={() => setSelectedCourse(course)}
              >
                {/* Thumbnail */}
                <div className="relative aspect-video overflow-hidden bg-muted">
                  <img
                    src={`https://img.youtube.com/vi/${course.youtubeId}/mqdefault.jpg`}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                      e.currentTarget.src = `https://img.youtube.com/vi/${course.youtubeId}/default.jpg`;
                    }}
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="bg-primary rounded-full p-4">
                      <Play className="h-8 w-8 text-primary-foreground fill-current" />
                    </div>
                  </div>
                  <div className="absolute top-3 right-3 flex gap-2">
                    {isCompleted && (
                      <Badge className="bg-green-500/90 text-white border-0">
                        <CheckCircle2 className="h-3 w-3 mr-1" />
                        Completed
                      </Badge>
                    )}
                    {course.certified && !isCompleted && (
                      <Badge className="bg-amber-500/90 text-white border-0">
                        <Award className="h-3 w-3 mr-1" />
                        Certified
                      </Badge>
                    )}
                  </div>
                </div>

                <CardHeader>
                  <div className="flex items-center gap-2 flex-wrap mb-2">
                    <Badge className={getLevelColor(course.level)}>
                      {course.level}
                    </Badge>
                    <Badge variant="outline" className="border-muted text-muted-foreground">
                      {course.category}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg text-foreground group-hover:text-primary transition-colors">
                    {course.title}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground line-clamp-2">
                    {course.description}
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>{course.duration}</span>
                    </div>
                    <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
                      {isCompleted ? 'View Again' : 'Start Course'}
                      <Play className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CertifiedVideoCourses;

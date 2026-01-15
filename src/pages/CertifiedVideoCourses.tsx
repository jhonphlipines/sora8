import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Play, Award, Clock, Users, BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";

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
    id: "1",
    title: "AI Engineer Basic and Roadmap",
    description: "Learn the fundamentals of becoming an AI Engineer. This comprehensive guide covers the essential skills, tools, and roadmap you need to start your journey in artificial intelligence and machine learning.",
    youtubeId: "MOdWhV9q29U",
    duration: "Full Course",
    level: "Beginner",
    category: "AI & Machine Learning",
    certified: true,
  },
  {
    id: "2",
    title: "First Steps in Python Basic",
    description: "Get started with Python programming from scratch. This beginner-friendly course covers Python basics, syntax, data types, and fundamental programming concepts to build a strong foundation.",
    youtubeId: "gVAusNhmjhM",
    duration: "Full Course",
    level: "Beginner",
    category: "Python Programming",
    certified: true,
  },
];

const CertifiedVideoCourses = () => {
  const navigate = useNavigate();
  const [selectedCourse, setSelectedCourse] = useState<VideoCourse | null>(null);

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

  if (selectedCourse) {
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
                <div className="aspect-video">
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${selectedCourse.youtubeId}`}
                    title={selectedCourse.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
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

              <Card className="border-amber-500/30 bg-amber-500/5 backdrop-blur">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 text-amber-400 mb-2">
                    <Award className="h-5 w-5" />
                    <span className="font-semibold">Certification Available</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Complete this course to earn a verified certificate that you can share on your profile.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
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
          {videoCourses.map((course) => (
            <Card
              key={course.id}
              className="group cursor-pointer border-border/50 bg-card/50 backdrop-blur hover:border-primary/50 transition-all duration-300 overflow-hidden"
              onClick={() => setSelectedCourse(course)}
            >
              {/* Thumbnail */}
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={`https://img.youtube.com/vi/${course.youtubeId}/maxresdefault.jpg`}
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    e.currentTarget.src = `https://img.youtube.com/vi/${course.youtubeId}/hqdefault.jpg`;
                  }}
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="bg-primary rounded-full p-4">
                    <Play className="h-8 w-8 text-primary-foreground fill-current" />
                  </div>
                </div>
                {course.certified && (
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-amber-500/90 text-white border-0">
                      <Award className="h-3 w-3 mr-1" />
                      Certified
                    </Badge>
                  </div>
                )}
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
                    Start Course
                    <Play className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CertifiedVideoCourses;

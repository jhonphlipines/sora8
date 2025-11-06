import { useState, useEffect } from "react";
import { BookOpen, Beaker, Globe, Calculator, GraduationCap, ChevronRight, Play, ArrowLeft } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

const YOUTUBE_API_KEY = "AIzaSyAYIZFLc4DU7o219ImEiCKqLjH10x7Nm_I";

interface YouTubeVideo {
  id: { videoId: string };
  snippet: {
    title: string;
    description: string;
    thumbnails: {
      medium: { url: string };
      high: { url: string };
    };
    channelTitle: string;
    publishedAt: string;
  };
}

const subjects = [
  {
    id: "science",
    name: "Science",
    icon: Beaker,
    color: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
    description: "Explore Physics, Chemistry, and Biology"
  },
  {
    id: "social",
    name: "Social Studies",
    icon: Globe,
    color: "bg-green-500/10 text-green-600 dark:text-green-400",
    description: "Learn History, Geography, and Civics"
  },
  {
    id: "mathematics",
    name: "Mathematics",
    icon: Calculator,
    color: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
    description: "Master Arithmetic, Algebra, and Geometry"
  }
];

const classes = [
  { level: 1, stage: "Primary" },
  { level: 2, stage: "Primary" },
  { level: 3, stage: "Primary" },
  { level: 4, stage: "Primary" },
  { level: 5, stage: "Primary" },
  { level: 6, stage: "Middle School" },
  { level: 7, stage: "Middle School" },
  { level: 8, stage: "Middle School" },
  { level: 9, stage: "High School" },
  { level: 10, stage: "High School" },
  { level: 11, stage: "Senior Secondary" },
  { level: 12, stage: "Senior Secondary" }
];

const InteractiveCourses = () => {
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [selectedClass, setSelectedClass] = useState<number | null>(null);
  const [showVideos, setShowVideos] = useState(false);
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSubjectSelect = (subjectId: string) => {
    setSelectedSubject(subjectId);
    setSelectedClass(null);
  };

  const handleClassSelect = (classLevel: number) => {
    setSelectedClass(classLevel);
  };

  const getVideoSearchQuery = () => {
    const subject = subjects.find(s => s.id === selectedSubject);
    return `${subject?.name} class ${selectedClass} tutorial educational`;
  };

  const searchYouTubeVideos = async (query: string) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=12&q=${encodeURIComponent(
          query
        )}&type=video&key=${YOUTUBE_API_KEY}&order=relevance&videoDuration=medium`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch videos');
      }
      
      const data = await response.json();
      setVideos(data.items || []);
    } catch (error) {
      console.error("Error fetching YouTube videos:", error);
      setVideos([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (showVideos) {
      searchYouTubeVideos(getVideoSearchQuery());
    }
  }, [showVideos]);

  const handleStartCourse = () => {
    if (selectedSubject && selectedClass) {
      setShowVideos(true);
    }
  };

  const handleBackToSelection = () => {
    setShowVideos(false);
    setSelectedVideo(null);
    setVideos([]);
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      searchYouTubeVideos(searchQuery);
    }
  };

  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  };

  // Video Player View
  if (selectedVideo) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted p-6">
        <div className="max-w-6xl mx-auto">
          <Button 
            onClick={() => setSelectedVideo(null)} 
            variant="outline" 
            className="mb-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Videos
          </Button>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="line-clamp-2">
                    {videos.find(v => v.id.videoId === selectedVideo)?.snippet.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video rounded-lg overflow-hidden bg-black">
                    <iframe
                      width="100%"
                      height="100%"
                      src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1`}
                      title="YouTube video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Play className="h-5 w-5" />
                    Related Videos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[600px]">
                    <div className="space-y-3 pr-4">
                      {videos.slice(0, 8).map((video) => (
                        <div
                          key={video.id.videoId}
                          className="flex gap-3 cursor-pointer hover:bg-muted/50 p-2 rounded-lg transition-colors"
                          onClick={() => setSelectedVideo(video.id.videoId)}
                        >
                          <img
                            src={video.snippet.thumbnails.medium.url}
                            alt={video.snippet.title}
                            className="w-24 h-16 object-cover rounded flex-shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium line-clamp-2 mb-1">
                              {truncateText(video.snippet.title, 60)}
                            </p>
                            <p className="text-xs text-muted-foreground line-clamp-1">
                              {video.snippet.channelTitle}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Videos List View
  if (showVideos) {
    const subject = subjects.find(s => s.id === selectedSubject);
    const Icon = subject?.icon || BookOpen;
    
    return (
      <div className="container mx-auto p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-lg ${subject?.color} flex items-center justify-center`}>
              <Icon className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">
                {subject?.name} - Class {selectedClass}
              </h1>
              <p className="text-muted-foreground">Educational Videos</p>
            </div>
          </div>
          <Button variant="outline" onClick={handleBackToSelection}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </div>

        <div className="flex gap-2">
          <Input
            placeholder="Search for specific topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            className="flex-1"
          />
          <Button onClick={handleSearch}>Search</Button>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i}>
                <CardContent className="p-0">
                  <Skeleton className="w-full aspect-video rounded-t-lg" />
                  <div className="p-4 space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video) => (
              <Card 
                key={video.id.videoId}
                className="cursor-pointer transition-all hover:shadow-lg hover:scale-[1.02]"
                onClick={() => setSelectedVideo(video.id.videoId)}
              >
                <CardContent className="p-0">
                  <div className="relative group">
                    <img
                      src={video.snippet.thumbnails.high.url}
                      alt={video.snippet.title}
                      className="w-full aspect-video object-cover rounded-t-lg"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-t-lg">
                      <Play className="h-16 w-16 text-white" />
                    </div>
                  </div>
                  <div className="p-4 space-y-2">
                    <h3 className="font-semibold line-clamp-2 min-h-[48px]">
                      {video.snippet.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-1">
                      {video.snippet.channelTitle}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold text-foreground">Interactive Courses</h1>
        <p className="text-muted-foreground text-lg">
          Choose your subject and grade level to begin learning
        </p>
      </div>

      {!selectedSubject ? (
        // Subject Selection View
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {subjects.map((subject) => {
              const Icon = subject.icon;
              return (
                <Card
                  key={subject.id}
                  className="cursor-pointer transition-all hover:shadow-lg hover:scale-105"
                  onClick={() => handleSubjectSelect(subject.id)}
                >
                  <CardHeader>
                    <div className={`w-16 h-16 rounded-lg ${subject.color} flex items-center justify-center mb-4`}>
                      <Icon className="h-8 w-8" />
                    </div>
                    <CardTitle className="text-2xl">{subject.name}</CardTitle>
                    <CardDescription className="text-base">
                      {subject.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full group">
                      Explore Courses
                      <ChevronRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <Card className="bg-muted/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="h-6 w-6" />
                Why Interactive Learning?
              </CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <h3 className="font-semibold">Engaging Content</h3>
                <p className="text-sm text-muted-foreground">
                  Interactive lessons with videos, animations, and quizzes
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">Grade-Aligned</h3>
                <p className="text-sm text-muted-foreground">
                  Content tailored to each class level (1-12)
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">Track Progress</h3>
                <p className="text-sm text-muted-foreground">
                  Monitor your learning journey and achievements
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        // Class Selection View
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {(() => {
                const subject = subjects.find(s => s.id === selectedSubject);
                const Icon = subject?.icon || BookOpen;
                return (
                  <>
                    <div className={`w-12 h-12 rounded-lg ${subject?.color} flex items-center justify-center`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold">{subject?.name}</h2>
                      <p className="text-muted-foreground">{subject?.description}</p>
                    </div>
                  </>
                );
              })()}
            </div>
            <Button variant="outline" onClick={() => setSelectedSubject(null)}>
              Change Subject
            </Button>
          </div>

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="all">All Classes</TabsTrigger>
              <TabsTrigger value="primary">Primary</TabsTrigger>
              <TabsTrigger value="middle">Middle School</TabsTrigger>
              <TabsTrigger value="high">High School</TabsTrigger>
              <TabsTrigger value="senior">Senior Secondary</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {classes.map((classItem) => (
                  <Card
                    key={classItem.level}
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      selectedClass === classItem.level
                        ? "ring-2 ring-primary shadow-lg"
                        : ""
                    }`}
                    onClick={() => handleClassSelect(classItem.level)}
                  >
                    <CardContent className="p-6 text-center">
                      <div className="text-3xl font-bold text-primary mb-2">
                        {classItem.level}
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {classItem.stage}
                      </Badge>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="primary" className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {classes.filter(c => c.stage === "Primary").map((classItem) => (
                  <Card
                    key={classItem.level}
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      selectedClass === classItem.level ? "ring-2 ring-primary shadow-lg" : ""
                    }`}
                    onClick={() => handleClassSelect(classItem.level)}
                  >
                    <CardContent className="p-6 text-center">
                      <div className="text-3xl font-bold text-primary mb-2">
                        {classItem.level}
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {classItem.stage}
                      </Badge>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="middle" className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {classes.filter(c => c.stage === "Middle School").map((classItem) => (
                  <Card
                    key={classItem.level}
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      selectedClass === classItem.level ? "ring-2 ring-primary shadow-lg" : ""
                    }`}
                    onClick={() => handleClassSelect(classItem.level)}
                  >
                    <CardContent className="p-6 text-center">
                      <div className="text-3xl font-bold text-primary mb-2">
                        {classItem.level}
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {classItem.stage}
                      </Badge>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="high" className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
                {classes.filter(c => c.stage === "High School").map((classItem) => (
                  <Card
                    key={classItem.level}
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      selectedClass === classItem.level ? "ring-2 ring-primary shadow-lg" : ""
                    }`}
                    onClick={() => handleClassSelect(classItem.level)}
                  >
                    <CardContent className="p-6 text-center">
                      <div className="text-3xl font-bold text-primary mb-2">
                        {classItem.level}
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {classItem.stage}
                      </Badge>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="senior" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {classes.filter(c => c.stage === "Senior Secondary").map((classItem) => (
                  <Card
                    key={classItem.level}
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      selectedClass === classItem.level ? "ring-2 ring-primary shadow-lg" : ""
                    }`}
                    onClick={() => handleClassSelect(classItem.level)}
                  >
                    <CardContent className="p-6 text-center">
                      <div className="text-3xl font-bold text-primary mb-2">
                        {classItem.level}
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {classItem.stage}
                      </Badge>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          {selectedClass && (
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold mb-1">
                    Ready to start Class {selectedClass} {subjects.find(s => s.id === selectedSubject)?.name}?
                  </h3>
                  <p className="text-muted-foreground">
                    Begin your interactive learning journey
                  </p>
                </div>
                <Button size="lg" onClick={handleStartCourse}>
                  Start Course
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
};

export default InteractiveCourses;

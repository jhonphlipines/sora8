import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Play, Search, BookOpen, Clock, Users, Star, Save, FileText, List, Heading1, Heading2, Heading3, Palette, Sparkles } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

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
  statistics?: {
    viewCount: string;
    likeCount: string;
  };
}

interface VideoLearningProps {
  onBackToCategories: () => void;
}

const VideoLearning = ({ onBackToCategories }: VideoLearningProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState("javascript");
  const [notes, setNotes] = useState("");
  const [savedNotes, setSavedNotes] = useState<Array<{ id: string; text: string; timestamp: string }>>([]);
  const [textColor, setTextColor] = useState("#000000");
  const [isAiProcessing, setIsAiProcessing] = useState(false);
  const { toast } = useToast();

  const learningCategories = [
    { id: "javascript", name: "JavaScript", query: "JavaScript tutorial programming" },
    { id: "react", name: "React", query: "React tutorial programming" },
    { id: "python", name: "Python", query: "Python programming tutorial" },
    { id: "html-css", name: "HTML & CSS", query: "HTML CSS tutorial web development" },
    { id: "nodejs", name: "Node.js", query: "Node.js tutorial backend" },
    { id: "typescript", name: "TypeScript", query: "TypeScript tutorial programming" },
    { id: "vue", name: "Vue.js", query: "Vue.js tutorial frontend" },
    { id: "angular", name: "Angular", query: "Angular tutorial frontend" },
  ];

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
    const category = learningCategories.find(cat => cat.id === activeCategory);
    if (category) {
      searchYouTubeVideos(category.query);
    }
  }, [activeCategory]);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      searchYouTubeVideos(searchQuery);
    }
  };

  const formatDuration = (publishedAt: string) => {
    const date = new Date(publishedAt);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 30) return `${diffDays} days ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
    return `${Math.floor(diffDays / 365)} years ago`;
  };

  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  };

  const handleSaveNote = async () => {
    if (notes.trim()) {
      try {
        const { data: userData } = await supabase.auth.getUser();
        if (!userData.user) {
          toast({
            title: "Authentication required",
            description: "Please log in to save notes.",
            variant: "destructive",
          });
          return;
        }

        const currentVideo = videos.find(v => v.id.videoId === selectedVideo);
        
        const { data, error } = await supabase
          .from("user_notes")
          .insert([{
            user_id: userData.user.id,
            title: currentVideo?.snippet.title || "Video Note",
            content: notes,
            video_id: selectedVideo || undefined,
            video_title: currentVideo?.snippet.title || undefined,
          }])
          .select()
          .single();

        if (error) throw error;

        const newNote = {
          id: data.id,
          text: notes,
          timestamp: new Date().toLocaleString()
        };
        setSavedNotes([newNote, ...savedNotes]);
        setNotes("");
        
        toast({
          title: "Note saved",
          description: "Your note has been saved successfully.",
        });
      } catch (error) {
        console.error("Error saving note:", error);
        toast({
          title: "Error",
          description: "Failed to save note. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  const handleDeleteNote = (id: string) => {
    setSavedNotes(savedNotes.filter(note => note.id !== id));
  };

  const insertFormatting = (prefix: string, suffix: string = "") => {
    const textarea = document.querySelector('textarea');
    if (!textarea) return;
    
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = notes.substring(start, end);
    const newText = notes.substring(0, start) + prefix + selectedText + suffix + notes.substring(end);
    
    setNotes(newText);
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + prefix.length, start + prefix.length + selectedText.length);
    }, 0);
  };

  const handleBulletPoint = () => {
    insertFormatting("• ");
  };

  const handleHeading = (level: number) => {
    const prefix = "#".repeat(level) + " ";
    insertFormatting(prefix);
  };

  const handleColorChange = (color: string) => {
    setTextColor(color);
    insertFormatting(`<span style="color:${color}">`, "</span>");
  };

  const handleAiAssist = async () => {
    if (!notes.trim()) {
      toast({
        title: "No content",
        description: "Please write some notes first for AI to improve.",
        variant: "destructive",
      });
      return;
    }

    setIsAiProcessing(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/improve-notes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ notes }),
      });

      if (!response.ok) throw new Error("Failed to improve notes");

      const data = await response.json();
      setNotes(data.improvedNotes);
      toast({
        title: "Notes improved!",
        description: "AI has enhanced your notes.",
      });
    } catch (error) {
      console.error("AI assist error:", error);
      toast({
        title: "Error",
        description: "Failed to improve notes. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAiProcessing(false);
    }
  };

  if (selectedVideo) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted p-6">
        <div className="max-w-6xl mx-auto">
          <Button 
            onClick={() => setSelectedVideo(null)} 
            variant="outline" 
            className="mb-6"
          >
            ← Back to Videos
          </Button>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
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
            </div>
            
            <div className="space-y-4">
              <Card className="overflow-hidden">
                <Tabs defaultValue="videos" className="w-full">
                  <CardHeader className="pb-0 border-b">
                    <TabsList className="grid w-full grid-cols-2 h-12 bg-muted/50">
                      <TabsTrigger value="videos" className="gap-2 data-[state=active]:bg-background">
                        <Play className="h-4 w-4" />
                        <span className="hidden sm:inline">Related Videos</span>
                        <span className="sm:hidden">Videos</span>
                      </TabsTrigger>
                      <TabsTrigger value="notes" className="gap-2 data-[state=active]:bg-background">
                        <FileText className="h-4 w-4" />
                        <span className="hidden sm:inline">Take Notes</span>
                        <span className="sm:hidden">Notes</span>
                      </TabsTrigger>
                    </TabsList>
                  </CardHeader>

                  <TabsContent value="videos" className="mt-0 p-0">
                    <CardContent className="p-4">
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
                  </TabsContent>

                  <TabsContent value="notes" className="mt-0 p-0">
                    <CardContent className="p-4">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Write a note</label>
                          
                          {/* Formatting Toolbar */}
                          <div className="flex flex-wrap gap-2 p-2 bg-muted/30 rounded-lg border">
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={handleBulletPoint}
                              className="h-8 px-2"
                              title="Add bullet point"
                            >
                              <List className="h-4 w-4" />
                            </Button>
                            
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => handleHeading(1)}
                              className="h-8 px-2"
                              title="Heading 1"
                            >
                              <Heading1 className="h-4 w-4" />
                            </Button>
                            
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => handleHeading(2)}
                              className="h-8 px-2"
                              title="Heading 2"
                            >
                              <Heading2 className="h-4 w-4" />
                            </Button>
                            
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => handleHeading(3)}
                              className="h-8 px-2"
                              title="Heading 3"
                            >
                              <Heading3 className="h-4 w-4" />
                            </Button>
                            
                            <Select onValueChange={handleColorChange} value={textColor}>
                              <SelectTrigger className="h-8 w-[100px]">
                                <Palette className="h-4 w-4 mr-2" />
                                <SelectValue placeholder="Color" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="#000000">Black</SelectItem>
                                <SelectItem value="#ef4444">Red</SelectItem>
                                <SelectItem value="#3b82f6">Blue</SelectItem>
                                <SelectItem value="#22c55e">Green</SelectItem>
                                <SelectItem value="#eab308">Yellow</SelectItem>
                                <SelectItem value="#a855f7">Purple</SelectItem>
                                <SelectItem value="#ec4899">Pink</SelectItem>
                              </SelectContent>
                            </Select>
                            
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={handleAiAssist}
                              disabled={isAiProcessing || !notes.trim()}
                              className="h-8 px-2 ml-auto"
                              title="AI Improve"
                            >
                              <Sparkles className="h-4 w-4 mr-1" />
                              AI
                            </Button>
                          </div>

                          <Textarea
                            placeholder="Take notes while watching the video..."
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            className="min-h-[100px] resize-none"
                          />
                          <Button 
                            onClick={handleSaveNote} 
                            className="w-full gap-2"
                            disabled={!notes.trim()}
                          >
                            <Save className="h-4 w-4" />
                            Save Note
                          </Button>
                        </div>

                        {savedNotes.length > 0 && (
                          <div className="space-y-2">
                            <h4 className="font-semibold text-sm flex items-center justify-between">
                              <span>Your Notes ({savedNotes.length})</span>
                              <Badge variant="secondary">{savedNotes.length}</Badge>
                            </h4>
                            <ScrollArea className="h-[460px] rounded-md border bg-muted/20 p-4">
                            <div className="space-y-3">
                              {savedNotes.map((note) => (
                                <div
                                  key={note.id}
                                  className="p-3 bg-muted/50 rounded-lg space-y-2"
                                >
                                  <p className="text-sm whitespace-pre-wrap">{note.text}</p>
                                  <div className="flex items-center justify-between">
                                    <span className="text-xs text-muted-foreground">
                                      {note.timestamp}
                                    </span>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => handleDeleteNote(note.id)}
                                      className="h-7 px-2 text-xs hover:bg-destructive/10 hover:text-destructive"
                                    >
                                      Delete
                                    </Button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </ScrollArea>
                        </div>
                      )}

                      {savedNotes.length === 0 && (
                        <div className="text-center py-8 text-muted-foreground">
                          <FileText className="h-12 w-12 mx-auto mb-2 opacity-50" />
                          <p className="text-sm">No notes yet. Start taking notes!</p>
                        </div>
                      )}
                      </div>
                    </CardContent>
                  </TabsContent>
                </Tabs>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <Button 
              onClick={onBackToCategories} 
              variant="outline" 
              className="mb-4"
            >
              ← Back to Learning
            </Button>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Video Learning Hub
            </h1>
            <p className="text-muted-foreground text-lg mt-2">
              Learn programming through curated video tutorials
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search for programming tutorials..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              className="pl-10"
            />
          </div>
          <Button onClick={handleSearch} className="px-8">
            Search
          </Button>
        </div>

        {/* Category Tabs */}
        <Tabs value={activeCategory} onValueChange={setActiveCategory} className="mb-8">
          <TabsList className="grid grid-cols-4 lg:grid-cols-8 w-full">
            {learningCategories.map((category) => (
              <TabsTrigger key={category.id} value={category.id} className="text-xs lg:text-sm">
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {/* Video Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 12 }).map((_, index) => (
              <Card key={index} className="overflow-hidden">
                <Skeleton className="h-48 w-full" />
                <CardContent className="p-4">
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-3/4 mb-2" />
                  <Skeleton className="h-3 w-1/2" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {videos.map((video) => (
              <Card key={video.id.videoId} className="overflow-hidden hover:shadow-lg transition-shadow group cursor-pointer">
                <div className="relative">
                  <img
                    src={video.snippet.thumbnails.high?.url || video.snippet.thumbnails.medium.url}
                    alt={video.snippet.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button
                      size="sm"
                      className="gap-2"
                      onClick={() => setSelectedVideo(video.id.videoId)}
                    >
                      <Play className="h-4 w-4" />
                      Watch
                    </Button>
                  </div>
                  <Badge className="absolute top-2 right-2 bg-black/80 text-white">
                    <Clock className="h-3 w-3 mr-1" />
                    Video
                  </Badge>
                </div>
                
                <CardContent className="p-4">
                  <CardTitle className="text-sm line-clamp-2 mb-2">
                    {video.snippet.title}
                  </CardTitle>
                  <CardDescription className="text-xs mb-3 line-clamp-3">
                    {truncateText(video.snippet.description, 100)}
                  </CardDescription>
                  
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      <span>{video.snippet.channelTitle}</span>
                    </div>
                    <span>{formatDuration(video.snippet.publishedAt)}</span>
                  </div>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full mt-3 gap-2"
                    onClick={() => setSelectedVideo(video.id.videoId)}
                  >
                    <Play className="h-4 w-4" />
                    Start Learning
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {!loading && videos.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">No videos found</h3>
            <p className="text-muted-foreground">
              Try searching for a different topic or check your internet connection.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoLearning;
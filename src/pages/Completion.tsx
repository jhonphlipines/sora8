import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Certificate } from "@/components/Certificate";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Award, Trophy, Calendar } from "lucide-react";
import { toast } from "sonner";

interface UserCertificate {
  id: string;
  category_id: string;
  certificate_name: string;
  earned_at: string;
}

// Category name mappings for better display
const CATEGORY_NAMES: Record<string, string> = {
  'python-levels': 'Python',
  'javascript-levels': 'JavaScript',
  'java-levels': 'Java',
  'cpp-levels': 'C++',
  'typescript-levels': 'TypeScript',
  'react-levels': 'React',
  'java': 'Java',
  'python': 'Python',
  'javascript': 'JavaScript',
  'html': 'HTML/CSS',
  'sql': 'SQL',
  'cpp': 'C++',
  'typescript': 'TypeScript',
  'video-course-ai-engineer-basics': 'Video Course - AI & ML',
  'video-course-python-basics': 'Video Course - Python',
};

const getCategoryName = (categoryId: string): string => {
  if (categoryId.startsWith('video-course-')) {
    return CATEGORY_NAMES[categoryId] || 'Video Course';
  }
  return CATEGORY_NAMES[categoryId] || categoryId.replace(/-levels?$/, '').replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
};

const Completion = () => {
  const [certificates, setCertificates] = useState<UserCertificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCertificate, setSelectedCertificate] = useState<UserCertificate | null>(null);
  const [displayName, setDisplayName] = useState("Student");

  useEffect(() => {
    fetchCertificates();
  }, []);

  const fetchCertificates = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast.error("Please log in to view your certificates");
        return;
      }

      // Fetch user profile for display name
      const { data: profile } = await supabase
        .from('profiles')
        .select('display_name')
        .eq('user_id', user.id)
        .maybeSingle();

      if (profile?.display_name) {
        setDisplayName(profile.display_name);
      }

      const { data, error } = await supabase
        .from("user_certificates")
        .select("*")
        .eq("user_id", user.id)
        .order("earned_at", { ascending: false });

      if (error) throw error;

      setCertificates(data || []);
    } catch (error) {
      console.error("Error fetching certificates:", error);
      toast.error("Failed to load certificates");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (selectedCertificate) {
    return (
      <div className="container mx-auto px-4 py-8">
        <button
          onClick={() => setSelectedCertificate(null)}
          className="mb-6 text-primary hover:underline flex items-center gap-2"
        >
          ← Back to all certificates
        </button>
        <Certificate
          studentName={displayName}
          score={100}
          totalQuestions={100}
          courseName={selectedCertificate.certificate_name}
          completionDate={new Date(selectedCertificate.earned_at)}
          certificateId={selectedCertificate.id}
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
          <Trophy className="h-10 w-10 text-primary" />
          My Completions
        </h1>
        <p className="text-muted-foreground">
          View and download your earned certificates
        </p>
      </div>

      {certificates.length === 0 ? (
        <Card className="text-center py-12">
          <CardContent>
            <div className="w-20 h-20 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
              <Award className="h-10 w-10 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No Certificates Yet</h3>
            <p className="text-muted-foreground">
              Complete courses or solve problems to earn certificates
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((cert) => (
            <Card
              key={cert.id}
              className="hover:shadow-lg transition-shadow cursor-pointer group"
              onClick={() => setSelectedCertificate(cert)}
            >
              <CardHeader>
                <div className="flex items-start justify-between mb-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Award className="h-6 w-6 text-primary" />
                  </div>
                  <div className="text-xs text-muted-foreground flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {new Date(cert.earned_at).toLocaleDateString()}
                  </div>
                </div>
                <CardTitle className="text-lg line-clamp-2">
                  {cert.certificate_name}
                </CardTitle>
                <CardDescription>
                  Category: {getCategoryName(cert.category_id)}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Certificate ID:</span>
                  <span className="font-mono text-xs">{cert.id.slice(0, 8)}...</span>
                </div>
                <div className="mt-4 text-center text-sm text-primary font-medium group-hover:underline">
                  View & Download →
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Completion;

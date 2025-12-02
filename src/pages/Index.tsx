import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, Clock, CheckCircle, BookOpen, Users, Trophy, ArrowRight, Star } from "lucide-react";
import heroImage from "@/assets/hero-programming.jpg";
import { VantaBackground } from "@/components/VantaBackground";
const Index = () => {
  const navigate = useNavigate();
  const features = [{
    icon: BookOpen,
    title: "11+ Technologies",
    description: "Python, JavaScript, Java, C/C++, HTML, Node.js, Git, Flutter, Swift, Next.js and more"
  }, {
    icon: Clock,
    title: "Timed Assessment",
    description: "30-minute time limit to test your knowledge under pressure"
  }, {
    icon: Award,
    title: "Professional Certificate",
    description: "Earn a beautiful certificate upon passing with 70% or higher"
  }, {
    icon: CheckCircle,
    title: "Instant Results",
    description: "Get immediate feedback with detailed explanations for each question"
  }];
  const stats = [{
    icon: Users,
    label: "Monthly Active Learners",
    value: "12 million+"
  }, {
    icon: Trophy,
    label: "Certified",
    value: "7 million+"
  }, {
    icon: Star,
    label: "Success Rate",
    value: "85%"
  }, {
    icon: CheckCircle,
    label: "Average Score",
    value: "78%"
  }];
  return <div className="min-h-screen bg-[var(--gradient-background)] relative">
      {/* Vanta.js Background Animation */}
      <VantaBackground effect="net" />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden z-10">
        <div className="absolute inset-0 bg-[var(--gradient-primary)] opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-3 sm:px-6 py-8 sm:py-12 md:py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-center">
            <div className="space-y-4 sm:space-y-6 md:space-y-8">
               <div className="space-y-2 sm:space-y-3 md:space-y-4">
                <Badge className="bg-primary/10 text-primary border-primary/20 text-[10px] sm:text-xs md:text-sm px-2 py-0.5 sm:px-3 sm:py-1">
                  Programming Certification
                </Badge>
                <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight">
                  <span className="bg-[var(--gradient-primary)] bg-clip-text text-transparent">
                    Master Programming
                  </span>
                  <br />
                  <span className="text-white">Get Certified</span>
                </h1>
                <p className="text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed text-white">
                  Test your programming knowledge with our comprehensive certification quiz. 
                  Cover essential topics from JavaScript and React to Python and algorithms.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-4">
                <Button onClick={() => navigate('/tests')} className="bg-primary hover:bg-primary/90 text-primary-foreground border-0 shadow-[var(--glow-primary)] text-xs sm:text-sm md:text-base px-3 sm:px-4 md:px-6 py-3 sm:py-4 md:py-5 w-full sm:w-auto">
                  Choose Your Test
                  <ArrowRight className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
                <Button variant="outline" className="text-xs sm:text-sm md:text-base px-3 sm:px-4 md:px-6 py-3 sm:py-4 md:py-5 border-border hover:bg-accent w-full sm:w-auto" onClick={() => navigate('/interactive-courses')}>
                  Video Learning
                </Button>
              </div>

              {/* Stats */}
              
            </div>

            <div className="relative hidden lg:block">
              <div className="absolute inset-0 bg-[var(--gradient-primary)] rounded-3xl blur-3xl opacity-20"></div>
              <img src={heroImage} alt="Programming certification platform" className="relative rounded-3xl shadow-2xl w-full" />
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-8 sm:py-12 md:py-16 lg:py-24 bg-background-secondary/80 backdrop-blur-sm relative z-10">
        <div className="max-w-7xl mx-auto px-3 sm:px-6">
          <div className="text-center mb-4 sm:mb-8 md:mb-12 lg:mb-16">
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-foreground mb-2 sm:mb-3 md:mb-4">
              Multiple Technology Certifications
            </h2>
            <p className="text-xs sm:text-sm md:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto px-2">
              Choose from 11 different programming languages and technologies with professional-grade questions.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
            {features.map((feature, index) => <Card key={index} className="bg-[var(--gradient-card)] border-border/50 hover:shadow-xl transition-all duration-300">
                <CardHeader className="text-center pb-2 sm:pb-3 md:pb-4 p-3 sm:p-4 md:p-6">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-2 sm:mb-3 md:mb-4">
                    <feature.icon className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xs sm:text-sm md:text-base">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="p-3 sm:p-4 md:p-6 pt-0">
                  <CardDescription className="text-center text-[10px] sm:text-xs md:text-sm">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>)}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-8 sm:py-12 md:py-16 lg:py-24 relative z-10">
        <div className="max-w-4xl mx-auto text-center px-3 sm:px-6">
          <div className="bg-[var(--gradient-card)] rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-12 border border-border/50 shadow-2xl">
            <h3 className="text-base sm:text-xl md:text-2xl lg:text-3xl font-bold text-foreground mb-2 sm:mb-4 md:mb-6">
              Ready to Test Your Skills?
            </h3>
            <p className="text-xs sm:text-sm md:text-base lg:text-lg text-muted-foreground mb-4 sm:mb-6 md:mb-8">
              Take our comprehensive programming quiz and earn your certification today.
            </p>
            <Button onClick={() => navigate('/tests')} className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-[var(--glow-primary)] text-xs sm:text-sm md:text-base px-4 sm:px-8 md:px-12 py-3 sm:py-4 md:py-5 w-full sm:w-auto">
              Choose Your Test
              <Award className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4" />
            </Button>
        </div>
      </div>

      {/* Student Ratings Section */}
      <div className="py-8 sm:py-12 md:py-16 lg:py-24 bg-background-tertiary/80 backdrop-blur-sm relative z-10">
        <div className="max-w-7xl mx-auto px-3 sm:px-6">
          <div className="text-center mb-4 sm:mb-8 md:mb-12 lg:mb-16">
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-foreground mb-2 sm:mb-3 md:mb-4">
              What Our Students Say
            </h2>
            <p className="text-xs sm:text-sm md:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto px-2">
              Over 12 million developers trust CodeCert for their programming certification needs.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
            {[{
              name: "Sarah Chen",
              role: "Full Stack Developer",
              company: "TechCorp",
              rating: 5,
              review: "CodeCert helped me validate my JavaScript skills and land my dream job. The questions were challenging but fair, exactly what you'd expect in real interviews."
            }, {
              name: "Marcus Rodriguez",
              role: "Python Developer",
              company: "DataFlow Inc",
              rating: 5,
              review: "The Python certification was comprehensive and well-structured. I gained confidence in my abilities and got promoted within 3 months of completing it."
            }, {
              name: "Emily Johnson",
              role: "React Developer",
              company: "StartupXYZ",
              rating: 4,
              review: "Great platform for testing React knowledge. The instant feedback and detailed explanations helped me understand concepts I was struggling with."
            }, {
              name: "David Kim",
              role: "Backend Engineer",
              company: "CloudTech",
              rating: 5,
              review: "The Node.js certification was exactly what I needed to prove my backend skills. The certificate looks professional and is recognized by employers."
            }, {
              name: "Lisa Thompson",
              role: "Software Engineer",
              company: "InnovateLab",
              rating: 5,
              review: "I completed 5 different certifications on CodeCert. Each one helped me identify knowledge gaps and improve my coding skills significantly."
            }, {
              name: "Alex Patel",
              role: "Frontend Developer",
              company: "DesignStudio",
              rating: 4,
              review: "The HTML/CSS certification was thorough and helped me brush up on fundamentals. The timed format really tests your knowledge under pressure."
            }].map((testimonial, index) => <Card key={index} className="bg-card hover:shadow-xl transition-all duration-300 border-border/50">
                <CardHeader className="pb-2 sm:pb-3 md:pb-4 p-3 sm:p-4 md:p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2 mb-1 sm:mb-2">
                    <div>
                      <CardTitle className="text-xs sm:text-sm md:text-base font-semibold">{testimonial.name}</CardTitle>
                      <p className="text-[10px] sm:text-xs text-muted-foreground">{testimonial.role} at {testimonial.company}</p>
                    </div>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => <Star key={i} className={`h-2.5 w-2.5 sm:h-3 sm:w-3 md:h-4 md:w-4 ${i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-muted-foreground'}`} />)}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-3 sm:p-4 md:p-6 pt-0">
                  <p className="text-[10px] sm:text-xs md:text-sm text-muted-foreground italic">"{testimonial.review}"</p>
                </CardContent>
              </Card>)}
          </div>

          {/* Overall Stats */}
          <div className="mt-8 sm:mt-12 md:mt-16 text-center">
            
          </div>
        </div>
      </div>
    </div>
    </div>;
};
export default Index;
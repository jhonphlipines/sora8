import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, Clock, CheckCircle, BookOpen, Users, Trophy, ArrowRight, Star } from "lucide-react";
import heroImage from "@/assets/hero-programming.jpg";
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
  return <div className="min-h-screen bg-[var(--gradient-background)]">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[var(--gradient-primary)] opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-16 md:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-primary/10 text-primary border-primary/20">
                  Programming Certification
                </Badge>
                <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                  <span className="bg-[var(--gradient-primary)] bg-clip-text text-transparent">
                    Master Programming
                  </span>
                  <br />
                  <span className="text-foreground">Get Certified</span>
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Test your programming knowledge with our comprehensive certification quiz. 
                  Cover essential topics from JavaScript and React to Python and algorithms.
                  Join over 12 million developers who trust our platform for skill validation.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" onClick={() => navigate('/tests')} className="bg-primary hover:bg-primary/90 text-primary-foreground border-0 shadow-[var(--glow-primary)] text-lg px-8 py-6">
                  Choose Your Test
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-border hover:bg-accent" onClick={() => navigate('/tests')}>
                  View All Categories
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 pt-8 border-t border-border/50">
                {stats.map((stat, index) => <div key={index} className="text-center p-2">
                    <stat.icon className="h-6 w-6 mx-auto mb-2 text-primary" />
                    <div className="font-bold text-lg text-foreground">{stat.value}</div>
                    <div className="text-xs sm:text-sm text-muted-foreground leading-tight">{stat.label}</div>
                  </div>)}
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-[var(--gradient-primary)] rounded-3xl blur-3xl opacity-20"></div>
              <img src={heroImage} alt="Programming certification platform" className="relative rounded-3xl shadow-2xl w-full" />
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-background-secondary">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Multiple Technology Certifications
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Choose from 11 different programming languages and technologies. 
              Each certification covers essential concepts with professional-grade questions.
              Our adaptive learning system ensures you master key concepts before advancing.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => <Card key={index} className="bg-[var(--gradient-card)] border-border/50 hover:shadow-xl transition-all duration-300">
                <CardHeader className="text-center pb-4">
                  <div className="w-12 h-12 mx-auto bg-[var(--gradient-primary)] rounded-full flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-white bg-gray-950" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>)}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24">
        <div className="max-w-4xl mx-auto text-center px-4">
          <div className="bg-[var(--gradient-card)] rounded-3xl p-12 border border-border/50 shadow-2xl">
            <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Ready to Test Your Skills?
            </h3>
            <p className="text-xl text-muted-foreground mb-8">
              Take our comprehensive programming quiz and earn your certification today. 
              Join thousands of developers who have already proven their skills.
              Get industry-recognized credentials that boost your career prospects.
            </p>
            <Button size="lg" onClick={() => navigate('/tests')} className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-[var(--glow-primary)] text-lg px-12 py-6">
              Choose Your Test
              <Award className="ml-2 h-5 w-5" />
            </Button>
        </div>
      </div>

      {/* Student Ratings Section */}
      <div className="py-24 bg-background-tertiary">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              What Our Students Say
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Over 12 million developers trust CodeCert for their programming certification needs.
              Here are some of their success stories.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <CardTitle className="text-lg font-semibold">{testimonial.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{testimonial.role} at {testimonial.company}</p>
                    </div>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => <Star key={i} className={`h-4 w-4 ${i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-muted-foreground'}`} />)}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground italic">"{testimonial.review}"</p>
                </CardContent>
              </Card>)}
          </div>

          {/* Overall Stats */}
          <div className="mt-16 text-center">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              <div>
                <div className="text-3xl font-bold text-primary">4.8/5</div>
                <div className="text-sm text-muted-foreground">Average Rating</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">98%</div>
                <div className="text-sm text-muted-foreground">Completion Rate</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">15k+</div>
                <div className="text-sm text-muted-foreground">Reviews</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">7M+</div>
                <div className="text-sm text-muted-foreground">Certificates Issued</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>;
};
export default Index;
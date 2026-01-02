import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Flame, Play, Zap, Code2, Trophy, Rocket, 
  ArrowRight, BookOpen, Terminal, Sparkles,
  ChevronRight, Clock, Award, Users, Star
} from "lucide-react";
import { VantaBackground } from "@/components/VantaBackground";

const Index = () => {
  const navigate = useNavigate();

  const technologies = [
    { name: "JavaScript", color: "from-yellow-400 to-yellow-600", icon: "JS" },
    { name: "Python", color: "from-blue-400 to-green-500", icon: "PY" },
    { name: "React", color: "from-cyan-400 to-blue-500", icon: "⚛️" },
    { name: "Java", color: "from-red-500 to-orange-500", icon: "☕" },
    { name: "Node.js", color: "from-green-500 to-green-700", icon: "🟢" },
    { name: "TypeScript", color: "from-blue-500 to-blue-700", icon: "TS" },
    { name: "C++", color: "from-blue-600 to-purple-600", icon: "C+" },
    { name: "Swift", color: "from-orange-500 to-red-500", icon: "🔶" },
  ];

  const courses = [
    {
      title: "JavaScript Masterclass",
      description: "From zero to hero in modern JS",
      duration: "30 min",
      level: "Beginner",
      students: "45K+",
      gradient: "from-yellow-500/20 to-orange-500/20",
      borderColor: "border-yellow-500/30",
    },
    {
      title: "Python Deep Dive",
      description: "Master Python programming",
      duration: "25 min",
      level: "Intermediate",
      students: "32K+",
      gradient: "from-blue-500/20 to-green-500/20",
      borderColor: "border-blue-500/30",
    },
    {
      title: "React in 100 Seconds",
      description: "Fast-track React mastery",
      duration: "20 min",
      level: "Advanced",
      students: "28K+",
      gradient: "from-cyan-500/20 to-blue-500/20",
      borderColor: "border-cyan-500/30",
    },
  ];

  const stats = [
    { value: "12M+", label: "Learners", icon: Users },
    { value: "50+", label: "Courses", icon: BookOpen },
    { value: "95%", label: "Pass Rate", icon: Trophy },
    { value: "24/7", label: "Access", icon: Clock },
  ];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <VantaBackground effect="net" />
      
      {/* Tech Grid Background */}
      <div className="absolute inset-0 tech-grid opacity-50"></div>

      {/* Hero Section */}
      <section className="relative z-10 pt-8 sm:pt-16 lg:pt-24 pb-16 sm:pb-24 lg:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Left Column - Text Content */}
            <div className="space-y-6 sm:space-y-8">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 rounded-full px-4 py-2 animate-fade-in" style={{ animationDelay: '0.1s' }}>
                <Flame className="h-4 w-4 text-primary animate-pulse" />
                <span className="text-primary font-medium text-sm">Learn. Code. Conquer.</span>
              </div>

              {/* Headline */}
              <div className="space-y-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black leading-[1.1] tracking-tight">
                  <span className="text-foreground">Build </span>
                  <span className="gradient-text">Epic</span>
                  <br />
                  <span className="text-foreground">Code Skills</span>
                </h1>
                <p className="text-muted-foreground text-lg sm:text-xl max-w-xl leading-relaxed">
                  Master programming with bite-sized lessons, hands-on quizzes, and earn certificates that prove your skills.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
                <Button 
                  onClick={() => navigate('/learn')}
                  size="lg"
                  className="btn-fire group text-lg px-8 py-6 rounded-xl"
                >
                  <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                  Start Learning
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button 
                  onClick={() => navigate('/tests')}
                  variant="outline"
                  size="lg"
                  className="text-lg px-8 py-6 rounded-xl border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-all"
                >
                  <Trophy className="mr-2 h-5 w-5 text-primary" />
                  Get Certified
                </Button>
              </div>

              {/* Stats Row */}
              <div className="flex flex-wrap gap-6 sm:gap-8 pt-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>
                {stats.map((stat, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <stat.icon className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-xl sm:text-2xl font-bold text-foreground">{stat.value}</p>
                      <p className="text-xs text-muted-foreground">{stat.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Code Preview */}
            <div className="relative hidden lg:block animate-fade-in" style={{ animationDelay: '0.5s' }}>
              <div className="relative">
                {/* Glow Effect */}
                <div className="absolute -inset-4 bg-gradient-to-r from-primary/30 via-accent/20 to-primary/30 rounded-3xl blur-3xl opacity-50"></div>
                
                {/* Code Window */}
                <div className="relative bg-background-tertiary rounded-2xl border border-border/50 overflow-hidden shadow-2xl">
                  {/* Window Header */}
                  <div className="flex items-center gap-2 px-4 py-3 bg-background-secondary border-b border-border/50">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <span className="text-muted-foreground text-sm font-mono ml-4">vilver.js</span>
                  </div>
                  
                  {/* Code Content */}
                  <div className="p-6 font-mono text-sm leading-relaxed">
                    <div className="space-y-2">
                      <p><span className="text-purple-400">const</span> <span className="text-cyan-400">developer</span> <span className="text-foreground">=</span> <span className="text-foreground">{'{'}</span></p>
                      <p className="pl-4"><span className="text-cyan-400">skills</span><span className="text-foreground">:</span> <span className="text-green-400">"leveling up"</span><span className="text-foreground">,</span></p>
                      <p className="pl-4"><span className="text-cyan-400">mindset</span><span className="text-foreground">:</span> <span className="text-green-400">"growth"</span><span className="text-foreground">,</span></p>
                      <p className="pl-4"><span className="text-cyan-400">coffee</span><span className="text-foreground">:</span> <span className="text-orange-400">Infinity</span><span className="text-foreground">,</span></p>
                      <p className="pl-4"><span className="text-purple-400">async</span> <span className="text-yellow-400">learn</span><span className="text-foreground">()</span> <span className="text-foreground">{'{'}</span></p>
                      <p className="pl-8"><span className="text-purple-400">return</span> <span className="text-green-400">"🚀 certified!"</span></p>
                      <p className="pl-4"><span className="text-foreground">{'}'}</span></p>
                      <p><span className="text-foreground">{'}'};</span></p>
                      <p className="mt-4">
                        <span className="text-muted-foreground">// Start your journey</span>
                      </p>
                      <p>
                        <span className="text-cyan-400">developer</span><span className="text-foreground">.</span><span className="text-yellow-400">learn</span><span className="text-foreground">();</span>
                        <span className="animate-pulse text-primary ml-1">▋</span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Floating Tech Icons */}
                <div className="absolute -top-6 -right-6 w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center text-2xl font-bold text-background float shadow-lg">
                  JS
                </div>
                <div className="absolute -bottom-4 -left-4 w-14 h-14 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center text-xl float shadow-lg" style={{ animationDelay: '1s' }}>
                  ⚛️
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technologies Marquee */}
      <section className="relative z-10 py-8 border-y border-border/30 bg-background-secondary/50 backdrop-blur-sm overflow-hidden">
        <div className="flex animate-marquee">
          <div className="flex gap-8 px-4 items-center">
            {[...technologies, ...technologies].map((tech, index) => (
              <div 
                key={index}
                className="flex items-center gap-3 px-6 py-3 bg-background/50 rounded-xl border border-border/30 whitespace-nowrap hover:border-primary/50 transition-colors cursor-pointer"
              >
                <span className={`w-8 h-8 bg-gradient-to-br ${tech.color} rounded-lg flex items-center justify-center text-sm font-bold text-white`}>
                  {tech.icon}
                </span>
                <span className="font-medium text-foreground">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
        <style>{`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            animation: marquee 30s linear infinite;
          }
        `}</style>
      </section>

      {/* Featured Courses */}
      <section className="relative z-10 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
            <div>
              <Badge className="bg-accent/20 text-accent border-accent/30 mb-4">
                <Sparkles className="h-3 w-3 mr-1" />
                Popular
              </Badge>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
                Featured <span className="gradient-text">Courses</span>
              </h2>
              <p className="text-muted-foreground mt-2 max-w-lg">
                Master in-demand skills with our most popular certifications
              </p>
            </div>
            <Button 
              variant="ghost" 
              className="text-primary hover:text-primary hover:bg-primary/10 self-start sm:self-auto"
              onClick={() => navigate('/interactive-courses')}
            >
              View All
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>

          {/* Course Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course, index) => (
              <div 
                key={index}
                className={`group relative bg-gradient-to-br ${course.gradient} rounded-2xl border ${course.borderColor} p-6 hover:scale-[1.02] transition-all duration-300 cursor-pointer`}
                onClick={() => navigate('/tests')}
              >
                {/* Card Content */}
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="p-3 bg-background/50 rounded-xl">
                      <Terminal className="h-6 w-6 text-primary" />
                    </div>
                    <Badge variant="secondary" className="bg-background/50">
                      {course.level}
                    </Badge>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                      {course.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mt-1">
                      {course.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {course.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {course.students}
                    </span>
                  </div>

                  <Button className="w-full bg-background/50 hover:bg-primary hover:text-primary-foreground border border-border/50 group-hover:border-primary/50 transition-all">
                    Start Quiz
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="relative z-10 py-16 sm:py-24 bg-background-secondary/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Why <span className="gradient-text">Vilver</span>?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The fastest way to prove your programming skills and level up your career
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Zap, title: "Fast Learning", desc: "Bite-sized lessons designed for busy developers", color: "text-yellow-500" },
              { icon: Code2, title: "Real Code", desc: "Practice with actual programming challenges", color: "text-cyan-500" },
              { icon: Award, title: "Certificates", desc: "Earn verified certificates for your portfolio", color: "text-purple-500" },
              { icon: Rocket, title: "Career Boost", desc: "Skills that employers actually want", color: "text-primary" },
            ].map((feature, index) => (
              <div 
                key={index}
                className="group p-6 bg-card/50 rounded-2xl border border-border/50 hover:border-primary/30 transition-all duration-300"
              >
                <div className={`w-12 h-12 rounded-xl bg-background flex items-center justify-center mb-4 group-hover:scale-110 transition-transform ${feature.color}`}>
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden bg-gradient-to-r from-primary/20 via-accent/10 to-primary/20 rounded-3xl border border-primary/30 p-8 sm:p-12 lg:p-16 text-center">
            {/* Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-accent/10 blur-3xl"></div>
            
            <div className="relative z-10">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/20 rounded-2xl mb-6 pulse-glow">
                <Flame className="h-8 w-8 text-primary" />
              </div>
              
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                Ready to <span className="gradient-text">Level Up</span>?
              </h2>
              <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-8">
                Join millions of developers who've certified their skills with Vilver. Start your journey today.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={() => navigate('/learn')}
                  size="lg"
                  className="btn-fire text-lg px-8 py-6 rounded-xl"
                >
                  <Rocket className="mr-2 h-5 w-5" />
                  Start Free
                </Button>
                <Button 
                  onClick={() => navigate('/tests')}
                  variant="outline"
                  size="lg"
                  className="text-lg px-8 py-6 rounded-xl border-border/50 hover:border-primary/50"
                >
                  <Star className="mr-2 h-5 w-5 text-primary" />
                  Take a Quiz
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-8 border-t border-border/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Flame className="h-6 w-6 text-primary" />
              <span className="font-bold text-lg">Vilver</span>
            </div>
            <p className="text-muted-foreground text-sm">
              © 2025 Vilver Learning. Learn. Code. Conquer.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

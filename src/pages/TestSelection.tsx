import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Clock, BookOpen, Award, Search } from "lucide-react";
import { testCategories } from "@/data/quizData";
import { AIAssistant } from "@/components/AIAssistant";
const TestSelection = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const handleTestSelect = (testId: string) => {
    navigate(`/quiz/${testId}`);
  };
  const filteredCategories = testCategories.filter(category => category.name.toLowerCase().includes(searchTerm.toLowerCase()) || category.description.toLowerCase().includes(searchTerm.toLowerCase()));
  return <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Button variant="ghost" onClick={() => navigate('/')} className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
          
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold bg-[var(--gradient-primary)] bg-clip-text text-transparent mb-4">
              Choose Your Testing Path
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-6">
              Select from comprehensive certification tests or progressive level-based learning paths.
            </p>
            
            {/* Testing Options */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button onClick={() => navigate('/levels')} className="bg-[var(--gradient-primary)] border-0 px-8 py-3 text-lg bg-lime-600 hover:bg-lime-500">
                🎯 Level-Based Learning
              </Button>
              
            </div>
            
            {/* Search Bar */}
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input type="text" placeholder="Search technologies..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10 bg-card border-border/50" />
            </div>
          </div>
        </div>

        {/* Test Categories Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCategories.length > 0 ? filteredCategories.map(category => <Card key={category.id} className="bg-[var(--gradient-card)] border-border/50 hover:shadow-xl transition-all duration-300 group cursor-pointer" onClick={() => handleTestSelect(category.id)}>
                <CardHeader className="text-center pb-4">
                  <div className={`w-16 h-16 mx-auto bg-gradient-to-r ${category.color} rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <span className="text-2xl">{category.icon}</span>
                  </div>
                  <CardTitle className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                    {category.name}
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <CardDescription className="text-center text-muted-foreground">
                    {category.description}
                  </CardDescription>
                  
                  <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <BookOpen className="h-4 w-4" />
                      <span>{category.questions.length} Questions</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>30 min</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-center">
                    <Badge className="bg-primary/10 text-primary border-primary/20">
                      <Award className="h-3 w-3 mr-1" />
                      Certificate Available
                    </Badge>
                  </div>
                  
                  <Button className="w-full bg-[var(--gradient-primary)] border-0 mt-4" onClick={e => {
              e.stopPropagation();
              handleTestSelect(category.id);
            }}>
                    Start {category.name} Test
                  </Button>
                </CardContent>
              </Card>) : <div className="col-span-full text-center py-12">
              <div className="text-muted-foreground mb-4">
                <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p className="text-lg">No technologies found for "{searchTerm}"</p>
                <p className="text-sm">Try searching for Python, JavaScript, React, Java, or other programming languages</p>
              </div>
              <Button variant="outline" onClick={() => setSearchTerm("")}>
                Clear Search
              </Button>
            </div>}
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <Card className="max-w-4xl mx-auto bg-[var(--gradient-card)] border-border/50">
            <CardContent className="py-8">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                How It Works
              </h3>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto bg-primary/20 rounded-full flex items-center justify-center mb-3">
                    <span className="text-xl font-bold text-primary">1</span>
                  </div>
                  <h4 className="font-semibold text-foreground mb-2">Choose Test</h4>
                  <p className="text-sm text-muted-foreground">Select your technology and start the assessment</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto bg-primary/20 rounded-full flex items-center justify-center mb-3">
                    <span className="text-xl font-bold text-primary">2</span>
                  </div>
                  <h4 className="font-semibold text-foreground mb-2">Take Quiz</h4>
                  <p className="text-sm text-muted-foreground">Answer questions within the time limit</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto bg-primary/20 rounded-full flex items-center justify-center mb-3">
                    <span className="text-xl font-bold text-primary">3</span>
                  </div>
                  <h4 className="font-semibold text-foreground mb-2">Get Certified</h4>
                  <p className="text-sm text-muted-foreground">Earn your certificate with 70%+ score</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* AI Assistant */}
      <AIAssistant context="Technology Certifications" />
    </div>;
};
export default TestSelection;
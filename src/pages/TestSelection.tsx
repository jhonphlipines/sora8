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
  return <div className="min-h-screen bg-background py-4 sm:py-6 md:py-8 px-3 sm:px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <Button variant="ghost" onClick={() => navigate('/')} className="mb-3 sm:mb-4 text-xs sm:text-sm">
            <ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
            Back to Home
          </Button>
          
          <div className="text-center">
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold bg-[var(--gradient-primary)] bg-clip-text text-transparent mb-2 sm:mb-3 md:mb-4">
              Choose Your Testing Path
            </h1>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto mb-4 sm:mb-6 px-2">
              Select from comprehensive certification tests or progressive level-based learning paths.
            </p>
            
            {/* Testing Options */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-6 sm:mb-8">
              <Button onClick={() => navigate('/levels')} className="bg-[var(--gradient-primary)] border-0 px-4 sm:px-6 md:px-8 py-2 sm:py-3 text-sm sm:text-base md:text-lg bg-lime-600 hover:bg-lime-500">
                🎯 Level-Based Learning
              </Button>
              
            </div>
            
            {/* Search Bar */}
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-3 w-3 sm:h-4 sm:w-4" />
              <Input type="text" placeholder="Search technologies..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-8 sm:pl-10 text-xs sm:text-sm bg-card border-border/50" />
            </div>
          </div>
        </div>

        {/* Test Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          {filteredCategories.length > 0 ? filteredCategories.map(category => <Card key={category.id} className="bg-[var(--gradient-card)] border-border/50 hover:shadow-xl transition-all duration-300 group cursor-pointer" onClick={() => handleTestSelect(category.id)}>
                <CardHeader className="text-center pb-3 sm:pb-4 p-3 sm:p-6">
                  <div className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mx-auto bg-gradient-to-r ${category.color} rounded-full flex items-center justify-center mb-2 sm:mb-3 md:mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <span className="text-xl sm:text-2xl">{category.icon}</span>
                  </div>
                  <CardTitle className="text-base sm:text-lg md:text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                    {category.name}
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="space-y-3 sm:space-y-4 p-3 sm:p-6 pt-0">
                  <CardDescription className="text-center text-xs sm:text-sm text-muted-foreground">
                    {category.description}
                  </CardDescription>
                  
                  <div className="flex items-center justify-center gap-2 sm:gap-4 text-[10px] sm:text-xs md:text-sm text-muted-foreground">
                    <div className="flex items-center gap-0.5 sm:gap-1">
                      <BookOpen className="h-3 w-3 sm:h-4 sm:w-4" />
                      <span>{category.questions.length} Questions</span>
                    </div>
                    <div className="flex items-center gap-0.5 sm:gap-1">
                      <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
                      <span>30 min</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-center">
                    <Badge className="bg-primary/10 text-primary border-primary/20 text-[10px] sm:text-xs">
                      <Award className="h-2 w-2 sm:h-3 sm:w-3 mr-1" />
                      Certificate Available
                    </Badge>
                  </div>
                  
                  <Button className="w-full bg-[var(--gradient-primary)] border-0 mt-3 sm:mt-4 text-xs sm:text-sm py-2 sm:py-3" onClick={e => {
              e.stopPropagation();
              handleTestSelect(category.id);
            }}>
                    Start {category.name} Test
                  </Button>
                </CardContent>
              </Card>) : <div className="col-span-full text-center py-8 sm:py-12">
              <div className="text-muted-foreground mb-3 sm:mb-4">
                <Search className="h-10 w-10 sm:h-12 sm:w-12 mx-auto mb-3 sm:mb-4 opacity-50" />
                <p className="text-sm sm:text-base md:text-lg mb-1 sm:mb-2">No technologies found for "{searchTerm}"</p>
                <p className="text-xs sm:text-sm px-2">Try searching for Python, JavaScript, React, Java, or other programming languages</p>
              </div>
              <Button variant="outline" onClick={() => setSearchTerm("")} className="text-xs sm:text-sm">
                Clear Search
              </Button>
            </div>}
        </div>

        {/* Additional Info */}
        <div className="mt-10 sm:mt-12 md:mt-16 text-center">
          <Card className="max-w-4xl mx-auto bg-[var(--gradient-card)] border-border/50">
            <CardContent className="py-4 sm:py-6 md:py-8 px-3 sm:px-6">
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground mb-3 sm:mb-4">
                How It Works
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                <div className="text-center">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto bg-primary/20 rounded-full flex items-center justify-center mb-2 sm:mb-3">
                    <span className="text-lg sm:text-xl font-bold text-primary">1</span>
                  </div>
                  <h4 className="font-semibold text-sm sm:text-base text-foreground mb-1 sm:mb-2">Choose Test</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground">Select your technology and start the assessment</p>
                </div>
                <div className="text-center">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto bg-primary/20 rounded-full flex items-center justify-center mb-2 sm:mb-3">
                    <span className="text-lg sm:text-xl font-bold text-primary">2</span>
                  </div>
                  <h4 className="font-semibold text-sm sm:text-base text-foreground mb-1 sm:mb-2">Take Quiz</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground">Answer questions within the time limit</p>
                </div>
                <div className="text-center">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto bg-primary/20 rounded-full flex items-center justify-center mb-2 sm:mb-3">
                    <span className="text-lg sm:text-xl font-bold text-primary">3</span>
                  </div>
                  <h4 className="font-semibold text-sm sm:text-base text-foreground mb-1 sm:mb-2">Get Certified</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground">Earn your certificate with 70%+ score</p>
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
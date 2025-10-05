import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Search, 
  SlidersHorizontal, 
  Play, 
  Upload, 
  Clock, 
  ChevronLeft, 
  ChevronRight,
  Lightbulb,
  BookOpen,
  Code2,
  CheckCircle2,
  XCircle,
  User,
  LogOut
} from "lucide-react";
import Editor from "@monaco-editor/react";
import { codingProblems, CodingProblem, supportedLanguages } from "@/data/codingProblems";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Practice = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProblem, setSelectedProblem] = useState<CodingProblem>(codingProblems[0]);
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');
  const [code, setCode] = useState(selectedProblem.startingCode[selectedLanguage] || '');
  const [activeTab, setActiveTab] = useState("description");
  const [testResults, setTestResults] = useState<any[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    // Auth state
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    // Timer
    const timer = setInterval(() => {
      setElapsedTime(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    setCode(selectedProblem.startingCode[selectedLanguage] || '');
    setTestResults([]);
    setShowHint(false);
  }, [selectedProblem, selectedLanguage]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    toast.success("Signed out successfully");
  };

  const filteredProblems = codingProblems.filter(problem =>
    problem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    problem.topics.some(topic => topic.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-500';
      case 'Medium': return 'text-yellow-500';
      case 'Hard': return 'text-red-500';
      default: return 'text-muted-foreground';
    }
  };

  const runCode = async () => {
    if (!user) {
      toast.error("Please sign in to run code");
      navigate("/auth");
      return;
    }

    setIsRunning(true);
    setTestResults([]);

    try {
      // Import the code executor
      const { executeCodeWithTests } = await import("@/utils/codeExecutor");
      
      // Execute code with real test cases
      const { results, allPassed } = await executeCodeWithTests(
        code,
        selectedLanguage,
        selectedProblem.testCases
      );

      // Format results for display
      const formattedResults = results.map(result => ({
        passed: result.passed,
        input: result.input,
        expected: result.expected,
        actual: result.actual,
        message: result.message
      }));

      setTestResults(formattedResults);

      if (allPassed) {
        toast.success("All test cases passed! 🎉");
      } else {
        const failedCount = results.filter(r => !r.passed).length;
        toast.error(`${failedCount} test case${failedCount > 1 ? 's' : ''} failed`);
      }
    } catch (error) {
      console.error('Error running code:', error);
      toast.error("Failed to run code. Please try again.");
      
      // Show error in test results
      setTestResults([{
        passed: false,
        input: 'Error',
        expected: '',
        actual: '',
        message: `Execution error: ${(error as Error).message}`
      }]);
    } finally {
      setIsRunning(false);
    }
  };

  const submitCode = async () => {
    if (!user) {
      toast.error("Please sign in to submit code");
      navigate("/auth");
      return;
    }

    await runCode();
    const allPassed = testResults.every(result => result.passed);
    if (allPassed) {
      toast.success("Solution accepted! 🎉");
      
      // Save to database
      try {
        const passedTests = testResults.filter(r => r.passed).length;
        const { error } = await supabase
          .from('user_problems_solved')
          .upsert({
            user_id: user.id,
            problem_id: selectedProblem.id.toString(),
            language: selectedLanguage,
            time_taken_seconds: elapsedTime,
            test_cases_passed: passedTests
          }, {
            onConflict: 'user_id,problem_id'
          });

        if (error) {
          console.error('Error saving problem solution:', error);
        }
      } catch (error) {
        console.error('Error saving to database:', error);
      }
    }
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Top Navigation */}
      <header className="h-12 border-b border-border bg-card flex items-center justify-between px-2 sm:px-4">
        <div className="flex items-center gap-2 sm:gap-4">
          <Button variant="ghost" size="sm" onClick={() => navigate("/")} className="h-8 px-2 sm:px-3">
            <ChevronLeft className="h-4 w-4 sm:mr-1" />
            <span className="hidden sm:inline">Back</span>
          </Button>
          <div className="text-xs sm:text-sm font-medium hidden md:block">Problem List</div>
        </div>
        
        <div className="flex items-center gap-1 sm:gap-3">
          <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-muted-foreground">
            <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="hidden xs:inline">{formatTime(elapsedTime)}</span>
          </div>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="h-7 w-7 sm:h-8 sm:w-8 cursor-pointer">
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-primary/10 text-primary">
                    <User className="h-3 w-3 sm:h-4 sm:w-4" />
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-popover z-50">
                <div className="px-2 py-1.5 text-sm text-muted-foreground">
                  {user.email}
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button size="sm" onClick={() => navigate("/auth")} className="h-7 text-xs sm:h-8 sm:text-sm">
              Sign In
            </Button>
          )}
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        {/* Mobile View */}
        <div className="md:hidden h-full flex flex-col">
          {/* Mobile Problem Selector */}
          <div className="border-b border-border bg-card p-2">
            <Select
              value={selectedProblem.id.toString()}
              onValueChange={(value) => {
                const problem = codingProblems.find(p => p.id.toString() === value);
                if (problem) setSelectedProblem(problem);
              }}
            >
              <SelectTrigger className="w-full h-9">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-popover z-50">
                {filteredProblems.map((problem) => (
                  <SelectItem key={problem.id} value={problem.id.toString()}>
                    <div className="flex items-center justify-between gap-2 w-full">
                      <span className="text-sm">{problem.id}. {problem.title}</span>
                      <Badge variant="outline" className={`text-xs ${getDifficultyColor(problem.difficulty)}`}>
                        {problem.difficulty}
                      </Badge>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Mobile Tabs */}
          <Tabs defaultValue="code" className="flex-1 flex flex-col overflow-hidden">
            <TabsList className="w-full rounded-none border-b h-10 bg-muted/50 justify-start">
              <TabsTrigger value="problem" className="flex-1 text-xs">Problem</TabsTrigger>
              <TabsTrigger value="code" className="flex-1 text-xs">Code</TabsTrigger>
            </TabsList>

            {/* Problem Tab */}
            <TabsContent value="problem" className="flex-1 overflow-auto m-0 p-3">
              <div className="space-y-4">
                <div>
                  <h1 className="text-lg font-bold mb-2">
                    {selectedProblem.id}. {selectedProblem.title}
                  </h1>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <Badge className={getDifficultyColor(selectedProblem.difficulty)}>
                      {selectedProblem.difficulty}
                    </Badge>
                    {selectedProblem.topics.map((topic) => (
                      <Badge key={topic} variant="outline" className="text-xs">
                        {topic}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-sm text-foreground whitespace-pre-line">
                    {selectedProblem.description}
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2 text-sm">Examples:</h3>
                  {selectedProblem.examples.map((example, index) => (
                    <Card key={index} className="p-3 mb-2 bg-muted/50">
                      <div className="font-mono text-xs space-y-1">
                        <div><strong>Input:</strong> {example.input}</div>
                        <div><strong>Output:</strong> {example.output}</div>
                        {example.explanation && (
                          <div className="text-muted-foreground">
                            <strong>Explanation:</strong> {example.explanation}
                          </div>
                        )}
                      </div>
                    </Card>
                  ))}
                </div>

                <div>
                  <h3 className="font-semibold mb-2 text-sm">Constraints:</h3>
                  <ul className="list-disc list-inside space-y-1 text-xs text-muted-foreground">
                    {selectedProblem.constraints.map((constraint, index) => (
                      <li key={index}>{constraint}</li>
                    ))}
                  </ul>
                </div>

                {selectedProblem.hints && (
                  <div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowHint(!showHint)}
                      className="mb-2 h-8 text-xs"
                    >
                      <Lightbulb className="h-3 w-3 mr-1" />
                      {showHint ? 'Hide' : 'Show'} Hint
                    </Button>
                    {showHint && (
                      <div className="space-y-2">
                        {selectedProblem.hints.map((hint, index) => (
                          <Card key={index} className="p-2 bg-yellow-500/10 border-yellow-500/20">
                            <p className="text-xs">💡 <strong>Hint {index + 1}:</strong> {hint}</p>
                          </Card>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </TabsContent>

            {/* Code Tab */}
            <TabsContent value="code" className="flex-1 flex flex-col m-0 overflow-hidden">
              <div className="border-b border-border bg-card p-2 flex items-center gap-2">
                <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                  <SelectTrigger className="w-32 h-8 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-popover z-50">
                    {supportedLanguages.map((lang) => (
                      <SelectItem key={lang.value} value={lang.value} className="text-xs">
                        {lang.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="flex gap-1 ml-auto">
                  <Button
                    onClick={runCode}
                    disabled={!user || isRunning}
                    size="sm"
                    variant="outline"
                    className="h-8 text-xs px-2"
                  >
                    <Play className="h-3 w-3 mr-1" />
                    Run
                  </Button>
                  <Button
                    onClick={submitCode}
                    disabled={!user || isRunning || testResults.length === 0}
                    size="sm"
                    className="h-8 text-xs px-2"
                  >
                    <Upload className="h-3 w-3 mr-1" />
                    Submit
                  </Button>
                </div>
              </div>

              <div className="flex-1 overflow-hidden">
                <Editor
                  height="100%"
                  language={supportedLanguages.find(l => l.value === selectedLanguage)?.monaco}
                  value={code}
                  onChange={(value) => setCode(value || '')}
                  theme="vs-dark"
                  options={{
                    minimap: { enabled: false },
                    fontSize: 12,
                    lineNumbers: 'on',
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                  }}
                />
              </div>

              {testResults.length > 0 && (
                <div className="border-t border-border bg-card p-2 max-h-32 overflow-auto">
                  <div className="space-y-1">
                    {testResults.map((result, index) => (
                      <div
                        key={index}
                        className={`p-2 rounded text-xs ${
                          result.passed
                            ? 'bg-green-500/10 text-green-600 dark:text-green-400'
                            : 'bg-red-500/10 text-red-600 dark:text-red-400'
                        }`}
                      >
                        <div className="font-medium flex items-center gap-1">
                          {result.passed ? (
                            <CheckCircle2 className="h-3 w-3" />
                          ) : (
                            <XCircle className="h-3 w-3" />
                          )}
                          Test {index + 1}: {result.passed ? 'Passed' : 'Failed'}
                        </div>
                        {!result.passed && result.message && (
                          <div className="mt-1 text-xs opacity-90">{result.message}</div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>

        {/* Desktop View */}
        <ResizablePanelGroup direction="horizontal" className="hidden md:flex">
          {/* Problem List Sidebar */}
          <ResizablePanel defaultSize={20} minSize={15} maxSize={30}>
            <div className="h-full flex flex-col bg-card border-r border-border">
              <div className="p-4 border-b border-border space-y-3">
                <h2 className="font-semibold text-lg">Problem List</h2>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search questions"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>
              
              <ScrollArea className="flex-1">
                <div className="p-2">
                  {filteredProblems.map((problem) => (
                    <button
                      key={problem.id}
                      onClick={() => setSelectedProblem(problem)}
                      className={`w-full text-left p-3 rounded-lg mb-1 transition-colors ${
                        selectedProblem.id === problem.id
                          ? 'bg-accent'
                          : 'hover:bg-accent/50'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium">
                          {problem.id}. {problem.title}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className={`text-xs ${getDifficultyColor(problem.difficulty)}`}>
                          {problem.difficulty}
                        </Badge>
                      </div>
                    </button>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </ResizablePanel>

          <ResizableHandle withHandle />

          {/* Problem Description */}
          <ResizablePanel defaultSize={35} minSize={30}>
            <div className="h-full flex flex-col">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
                <div className="border-b border-border">
                  <TabsList className="w-full justify-start rounded-none h-12 bg-transparent">
                    <TabsTrigger value="description" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none">
                      <BookOpen className="h-4 w-4 mr-2" />
                      Description
                    </TabsTrigger>
                    <TabsTrigger value="solutions" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none">
                      <Code2 className="h-4 w-4 mr-2" />
                      Solutions
                    </TabsTrigger>
                    <TabsTrigger value="submissions" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none">
                      <Upload className="h-4 w-4 mr-2" />
                      Submissions
                    </TabsTrigger>
                  </TabsList>
                </div>

                <ScrollArea className="flex-1">
                  <TabsContent value="description" className="p-6 mt-0">
                    <div className="space-y-6">
                      <div>
                        <h1 className="text-2xl font-bold mb-2">
                          {selectedProblem.id}. {selectedProblem.title}
                        </h1>
                        <div className="flex items-center gap-3 mb-4">
                          <Badge className={getDifficultyColor(selectedProblem.difficulty)}>
                            {selectedProblem.difficulty}
                          </Badge>
                          {selectedProblem.topics.map((topic) => (
                            <Badge key={topic} variant="outline">
                              {topic}
                            </Badge>
                          ))}
                        </div>
                        {selectedProblem.companies.length > 0 && (
                          <div className="flex items-center gap-2 mb-4">
                            <span className="text-sm text-muted-foreground">Companies:</span>
                            {selectedProblem.companies.map((company) => (
                              <Badge key={company} variant="secondary">
                                {company}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>

                      <div>
                        <p className="text-foreground whitespace-pre-line">{selectedProblem.description}</p>
                      </div>

                      <div>
                        <h3 className="font-semibold mb-3">Examples:</h3>
                        {selectedProblem.examples.map((example, index) => (
                          <Card key={index} className="p-4 mb-3 bg-muted/50">
                            <div className="font-mono text-sm space-y-1">
                              <div><strong>Input:</strong> {example.input}</div>
                              <div><strong>Output:</strong> {example.output}</div>
                              {example.explanation && (
                                <div className="text-muted-foreground"><strong>Explanation:</strong> {example.explanation}</div>
                              )}
                            </div>
                          </Card>
                        ))}
                      </div>

                      <div>
                        <h3 className="font-semibold mb-2">Constraints:</h3>
                        <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                          {selectedProblem.constraints.map((constraint, index) => (
                            <li key={index}>{constraint}</li>
                          ))}
                        </ul>
                      </div>

                      {selectedProblem.hints && (
                        <div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setShowHint(!showHint)}
                            className="mb-3"
                          >
                            <Lightbulb className="h-4 w-4 mr-2" />
                            {showHint ? 'Hide' : 'Show'} Hint
                          </Button>
                          {showHint && (
                            <div className="space-y-2">
                              {selectedProblem.hints.map((hint, index) => (
                                <Card key={index} className="p-3 bg-yellow-500/10 border-yellow-500/20">
                                  <p className="text-sm">💡 <strong>Hint {index + 1}:</strong> {hint}</p>
                                </Card>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </TabsContent>

                  <TabsContent value="solutions" className="p-6 mt-0">
                    <div className="text-center py-12">
                      <Code2 className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                      <p className="text-muted-foreground">Solutions will be available after you solve the problem</p>
                    </div>
                  </TabsContent>

                  <TabsContent value="submissions" className="p-6 mt-0">
                    <div className="text-center py-12">
                      <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                      <p className="text-muted-foreground">Your submissions will appear here</p>
                    </div>
                  </TabsContent>
                </ScrollArea>
              </Tabs>
            </div>
          </ResizablePanel>

          <ResizableHandle withHandle />

          {/* Code Editor */}
          <ResizablePanel defaultSize={45} minSize={35}>
            <div className="h-full flex flex-col">
              {/* Editor Header */}
              <div className="h-12 border-b border-border flex items-center justify-between px-4 bg-card">
                <div className="flex items-center gap-2">
                  <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                    <SelectTrigger className="w-[180px] h-8">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      {supportedLanguages.map((lang) => (
                        <SelectItem key={lang.value} value={lang.value}>
                          {lang.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center gap-2">
                  {!user && (
                    <span className="text-sm text-muted-foreground mr-2">
                      You need to <button onClick={() => navigate("/auth")} className="text-primary hover:underline">log in / sign up</button> to run or submit
                    </span>
                  )}
                  <Button size="sm" variant="outline" onClick={runCode} disabled={isRunning || !user}>
                    <Play className="h-4 w-4 mr-2" />
                    {isRunning ? 'Running...' : 'Run'}
                  </Button>
                  <Button size="sm" variant="default" onClick={submitCode} disabled={isRunning || !user} className="bg-green-600 hover:bg-green-700">
                    <Upload className="h-4 w-4 mr-2" />
                    Submit
                  </Button>
                </div>
              </div>

              {/* Monaco Editor */}
              <div className="flex-1 overflow-hidden">
                <Editor
                  key={selectedLanguage}
                  height="100%"
                  language={supportedLanguages.find(l => l.value === selectedLanguage)?.monaco || 'javascript'}
                  value={code}
                  onChange={(value) => setCode(value || '')}
                  theme="vs-dark"
                  options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    lineNumbers: 'on',
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                    tabSize: 2,
                  }}
                />
              </div>

              {/* Test Cases Panel */}
              {testResults.length > 0 && (
                <div className="border-t border-border bg-card">
                  <Tabs defaultValue="testcase" className="w-full">
                    <div className="border-b border-border">
                      <TabsList className="w-full justify-start rounded-none h-10 bg-transparent">
                        <TabsTrigger value="testcase" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none">
                          <CheckCircle2 className="h-4 w-4 mr-2" />
                          Test Results
                        </TabsTrigger>
                      </TabsList>
                    </div>
                    <TabsContent value="testcase" className="p-4 max-h-48 overflow-auto">
                      <div className="space-y-2">
                        {testResults.map((result, index) => (
                          <Card key={index} className={`p-3 ${result.passed ? 'border-green-500/50 bg-green-500/5' : 'border-red-500/50 bg-red-500/5'}`}>
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex items-center gap-2">
                                {result.passed ? (
                                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                                ) : (
                                  <XCircle className="h-4 w-4 text-red-500" />
                                )}
                                <span className="font-medium text-sm">Case {index + 1}</span>
                              </div>
                              <Badge variant={result.passed ? "default" : "destructive"} className="text-xs">
                                {result.passed ? 'Passed' : 'Failed'}
                              </Badge>
                            </div>
                            <div className="text-xs font-mono space-y-1 text-muted-foreground">
                              <div><strong>Input:</strong> {result.input}</div>
                              <div><strong>Expected:</strong> {result.expected}</div>
                              {result.actual && <div><strong>Actual:</strong> {result.actual}</div>}
                              {result.message && <div className="text-foreground mt-2">{result.message}</div>}
                            </div>
                          </Card>
                        ))}
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              )}
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
};

export default Practice;

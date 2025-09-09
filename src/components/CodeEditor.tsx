import { useState, useRef } from "react";
import Editor from "@monaco-editor/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Play, RotateCcw, CheckCircle, AlertCircle, Code } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const supportedLanguages = [
  { value: "javascript", label: "JavaScript", monacoLang: "javascript" },
  { value: "python", label: "Python", monacoLang: "python" },
  { value: "java", label: "Java", monacoLang: "java" },
  { value: "cpp", label: "C++", monacoLang: "cpp" },
  { value: "c", label: "C", monacoLang: "c" },
  { value: "csharp", label: "C#", monacoLang: "csharp" },
  { value: "html", label: "HTML/CSS", monacoLang: "html" },
  { value: "sql", label: "SQL", monacoLang: "sql" },
  { value: "php", label: "PHP", monacoLang: "php" },
];

interface CodeEditorProps {
  exercise: {
    id: number;
    title: string;
    description: string;
    language: string;
    startingCode: string;
    solution: string;
    testCases: Array<{
      input: string;
      expected: string;
    }>;
  };
}

const CodeEditor = ({ exercise }: CodeEditorProps) => {
  const { toast } = useToast();
  const editorRef = useRef<any>(null);
  const [code, setCode] = useState(exercise.startingCode);
  const [selectedLanguage, setSelectedLanguage] = useState(exercise.language.toLowerCase());
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [testResults, setTestResults] = useState<Array<{ passed: boolean; message: string }>>([]);

  const getCurrentLanguageConfig = () => {
    return supportedLanguages.find(lang => lang.value === selectedLanguage) || supportedLanguages[0];
  };

  const handleEditorDidMount = (editor: any) => {
    editorRef.current = editor;
  };

  const runCode = async () => {
    setIsRunning(true);
    setOutput("");
    setTestResults([]);
    
    try {
      // Simulate code execution - in a real app, this would be sent to a backend service
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock test results
      const results = exercise.testCases.map((testCase, index) => ({
        passed: Math.random() > 0.3, // 70% chance of passing
        message: `Test ${index + 1}: ${Math.random() > 0.3 ? "Passed" : "Failed - Expected " + testCase.expected}`
      }));
      
      setTestResults(results);
      setOutput(`Code executed successfully!\n${results.length} test cases ran.`);
      
      const allPassed = results.every(r => r.passed);
      if (allPassed) {
        toast({
          title: "All tests passed! 🎉",
          description: "Great job! You've solved the exercise.",
        });
      }
    } catch (error) {
      setOutput("Error: " + (error as Error).message);
    } finally {
      setIsRunning(false);
    }
  };

  const resetCode = () => {
    setCode(exercise.startingCode);
    setOutput("");
    setTestResults([]);
    if (editorRef.current) {
      editorRef.current.setValue(exercise.startingCode);
    }
  };

  const showSolution = () => {
    setCode(exercise.solution);
    if (editorRef.current) {
      editorRef.current.setValue(exercise.solution);
    }
    toast({
      title: "Solution revealed",
      description: "Study the solution and try to understand the approach.",
    });
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl">{exercise.title}</CardTitle>
            <div className="flex items-center gap-2">
              <Badge variant="outline">{getCurrentLanguageConfig().label}</Badge>
            </div>
          </div>
          <p className="text-muted-foreground">{exercise.description}</p>
        </CardHeader>
      </Card>

      <div className="grid lg:grid-cols-2 gap-4">
        {/* Code Editor */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Code Editor</CardTitle>
              <div className="flex items-center gap-2">
                <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="z-50 bg-background border border-border shadow-lg">
                    {supportedLanguages.map((lang) => (
                      <SelectItem key={lang.value} value={lang.value}>
                        {lang.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={resetCode}
                className="gap-2"
              >
                <RotateCcw className="h-4 w-4" />
                Reset
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={showSolution}
                className="gap-2"
              >
                Show Solution
              </Button>
              <Button
                onClick={runCode}
                disabled={isRunning}
                size="sm"
                className="gap-2"
              >
                <Play className="h-4 w-4" />
                {isRunning ? "Running..." : "Run Code"}
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="border rounded-md overflow-hidden">
              <Editor
                height="400px"
                language={getCurrentLanguageConfig().monacoLang}
                value={code}
                onChange={(value) => setCode(value || "")}
                onMount={handleEditorDidMount}
                theme="vs-dark"
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  lineNumbers: "on",
                  roundedSelection: false,
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                  tabSize: 2,
                  wordWrap: "on",
                  bracketPairColorization: { enabled: true },
                  suggest: {
                    showMethods: true,
                    showFunctions: true,
                    showConstructors: true,
                  },
                }}
              />
            </div>
          </CardContent>
        </Card>

        {/* Output and Test Results */}
        <div className="space-y-4">
          {/* Output */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Output</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-muted/50 p-4 rounded-md font-mono text-sm min-h-[100px]">
                {output || "Click 'Run Code' to see output..."}
              </div>
            </CardContent>
          </Card>

          {/* Test Results */}
          {testResults.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Test Results</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {testResults.map((result, index) => (
                    <div
                      key={index}
                      className={`flex items-center gap-2 p-2 rounded-md text-sm ${
                        result.passed
                          ? "bg-green-50 text-green-800 border border-green-200"
                          : "bg-red-50 text-red-800 border border-red-200"
                      }`}
                    >
                      {result.passed ? (
                        <CheckCircle className="h-4 w-4" />
                      ) : (
                        <AlertCircle className="h-4 w-4" />
                      )}
                      <span>{result.message}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;
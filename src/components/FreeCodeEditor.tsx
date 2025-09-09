import { useState, useRef } from "react";
import Editor from "@monaco-editor/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Play, RotateCcw, Save, Code2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const supportedLanguages = [
  { value: "javascript", label: "JavaScript", monacoLang: "javascript", starter: "// Welcome to the free code editor!\n// Start coding in JavaScript\n\nconsole.log('Hello, World!');" },
  { value: "python", label: "Python", monacoLang: "python", starter: "# Welcome to the free code editor!\n# Start coding in Python\n\nprint('Hello, World!')" },
  { value: "java", label: "Java", monacoLang: "java", starter: "// Welcome to the free code editor!\n// Start coding in Java\n\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Hello, World!\");\n    }\n}" },
  { value: "cpp", label: "C++", monacoLang: "cpp", starter: "// Welcome to the free code editor!\n// Start coding in C++\n\n#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << \"Hello, World!\" << endl;\n    return 0;\n}" },
  { value: "c", label: "C", monacoLang: "c", starter: "// Welcome to the free code editor!\n// Start coding in C\n\n#include <stdio.h>\n\nint main() {\n    printf(\"Hello, World!\\n\");\n    return 0;\n}" },
  { value: "csharp", label: "C#", monacoLang: "csharp", starter: "// Welcome to the free code editor!\n// Start coding in C#\n\nusing System;\n\nclass Program {\n    static void Main() {\n        Console.WriteLine(\"Hello, World!\");\n    }\n}" },
  { value: "html", label: "HTML/CSS", monacoLang: "html", starter: "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n    <meta charset=\"UTF-8\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n    <title>Free Code Editor</title>\n    <style>\n        body { font-family: Arial, sans-serif; margin: 40px; }\n        h1 { color: #333; }\n    </style>\n</head>\n<body>\n    <h1>Hello, World!</h1>\n    <p>Start building your HTML/CSS project here!</p>\n</body>\n</html>" },
  { value: "sql", label: "SQL", monacoLang: "sql", starter: "-- Welcome to the free code editor!\n-- Start writing SQL queries\n\nSELECT 'Hello, World!' as greeting;" },
  { value: "php", label: "PHP", monacoLang: "php", starter: "<?php\n// Welcome to the free code editor!\n// Start coding in PHP\n\necho 'Hello, World!';\n?>" },
];

const FreeCodeEditor = () => {
  const { toast } = useToast();
  const editorRef = useRef<any>(null);
  const [selectedLanguage, setSelectedLanguage] = useState("javascript");
  const [code, setCode] = useState(supportedLanguages[0].starter);
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);

  const getCurrentLanguageConfig = () => {
    return supportedLanguages.find(lang => lang.value === selectedLanguage) || supportedLanguages[0];
  };

  const handleEditorDidMount = (editor: any) => {
    editorRef.current = editor;
  };

  const handleLanguageChange = (newLanguage: string) => {
    const langConfig = supportedLanguages.find(lang => lang.value === newLanguage);
    if (langConfig) {
      setSelectedLanguage(newLanguage);
      setCode(langConfig.starter);
      setOutput("");
      if (editorRef.current) {
        editorRef.current.setValue(langConfig.starter);
      }
    }
  };

  const runCode = async () => {
    setIsRunning(true);
    setOutput("");
    
    try {
      // Simulate code execution
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Analyze code content for more realistic output
      const codeContent = code.toLowerCase();
      let simulatedOutput = "";
      
      if (selectedLanguage === "javascript") {
        // Try to execute JavaScript in a safe way
        try {
          const logs: string[] = [];
          const originalLog = console.log;
          console.log = (...args) => {
            logs.push(args.map(arg => String(arg)).join(' '));
          };
          
          // Create a safe execution context
          const safeCode = code.replace(/document|window|fetch|import|require/g, '/* restricted */');
          new Function(safeCode)();
          
          console.log = originalLog;
          simulatedOutput = logs.length > 0 ? logs.join('\n') : "No output";
        } catch (jsError) {
          simulatedOutput = `Error: ${(jsError as Error).message}`;
        }
      } else {
        // For other languages, provide intelligent simulation
        if (codeContent.includes('print(') || codeContent.includes('console.log') || codeContent.includes('cout') || codeContent.includes('printf') || codeContent.includes('system.out.println') || codeContent.includes('console.writeline')) {
          // Extract potential output from print statements
          const printMatches = code.match(/(print\(|console\.log\(|cout\s*<<|printf\(|System\.out\.println\(|Console\.WriteLine\()([^)]*)/gi);
          if (printMatches) {
            simulatedOutput = printMatches.map(match => {
              const content = match.replace(/(print\(|console\.log\(|cout\s*<<\s*|printf\(|System\.out\.println\(|Console\.WriteLine\()/gi, '');
              return content.replace(/['"]/g, '').trim();
            }).join('\n');
          } else {
            simulatedOutput = "Program executed successfully (no output statements found)";
          }
        } else if (selectedLanguage === "html") {
          simulatedOutput = "✓ HTML rendered successfully!\nOpen in browser to see the visual output.";
        } else if (selectedLanguage === "sql") {
          if (codeContent.includes('select')) {
            simulatedOutput = "Query executed successfully\n(Results would appear here in a real database)";
          } else {
            simulatedOutput = "SQL command executed successfully";
          }
        } else {
          simulatedOutput = "Program compiled and executed successfully";
        }
      }
      
      setOutput(simulatedOutput + "\n\n✓ Execution completed");
      
      toast({
        title: "Code executed! 🚀",
        description: "Your code ran in the simulated environment.",
      });
    } catch (error) {
      setOutput("Error: " + (error as Error).message);
    } finally {
      setIsRunning(false);
    }
  };

  const clearCode = () => {
    const langConfig = getCurrentLanguageConfig();
    setCode(langConfig.starter);
    setOutput("");
    if (editorRef.current) {
      editorRef.current.setValue(langConfig.starter);
    }
    toast({
      title: "Editor cleared",
      description: "Starting fresh with the default template.",
    });
  };

  const saveCode = () => {
    // In a real app, this would save to localStorage or backend
    localStorage.setItem(`freeCodeEditor_${selectedLanguage}`, code);
    toast({
      title: "Code saved! 💾",
      description: "Your code has been saved locally for this language.",
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Code2 className="h-6 w-6 text-primary" />
              <div>
                <CardTitle className="text-2xl">Freedom Code Editor</CardTitle>
                <p className="text-muted-foreground mt-1">
                  Practice coding freely without constraints. Choose your language and start building!
                </p>
              </div>
            </div>
            <Select value={selectedLanguage} onValueChange={handleLanguageChange}>
              <SelectTrigger className="w-40">
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
        </CardHeader>
      </Card>

      {/* Code Editor with Integrated Output */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Code Editor</CardTitle>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={clearCode}
                className="gap-2"
              >
                <RotateCcw className="h-4 w-4" />
                Clear
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={saveCode}
                className="gap-2"
              >
                <Save className="h-4 w-4" />
                Save
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
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="grid lg:grid-cols-3 gap-0">
            {/* Editor */}
            <div className="lg:col-span-2 border-r">
              <div className="border-b bg-muted/20 px-4 py-2 text-sm font-medium">
                {getCurrentLanguageConfig().label} Editor
              </div>
              <Editor
                height="500px"
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
                  formatOnPaste: true,
                  formatOnType: true,
                }}
              />
            </div>
            
            {/* Output Panel */}
            <div className="bg-background">
              <div className="border-b bg-muted/20 px-4 py-2 text-sm font-medium flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${output ? 'bg-green-500' : 'bg-muted-foreground'}`}></div>
                Output Console
              </div>
              <div className="p-4 h-[500px] overflow-auto">
                <pre className="font-mono text-sm whitespace-pre-wrap text-foreground">
                  {output || "Click 'Run Code' to see output...\n\nNote: This is a simulated environment for practice purposes."}
                </pre>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-muted/20">
        <CardContent className="pt-6">
          <div className="text-center text-sm text-muted-foreground">
            <p className="mb-2">
              💡 <strong>Tips for Free Practice:</strong>
            </p>
            <div className="grid md:grid-cols-3 gap-4 text-left">
              <div>
                • Experiment with different algorithms
              </div>
              <div>
                • Build small projects and utilities
              </div>
              <div>
                • Test language-specific features
              </div>
            </div>
            <p className="mt-4 text-xs">
              Your code is automatically saved locally for each language when you click Save.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FreeCodeEditor;
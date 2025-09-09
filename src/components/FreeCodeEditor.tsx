import { useState, useRef } from "react";
import Editor from "@monaco-editor/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Play, RotateCcw, Save, Code2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import OutputPanel from "./OutputPanel";
import { executeCode } from "@/utils/codeExecutor";

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
    if (!code.trim()) {
      toast({
        title: "No code to run",
        description: "Please write some code first.",
        variant: "destructive"
      });
      return;
    }

    setIsRunning(true);
    setOutput("");
    
    try {
      const result = await executeCode(code, selectedLanguage);
      setOutput(result);
      
      toast({
        title: "Code executed! 🚀",
        description: "Check the output panel for results.",
      });
    } catch (error) {
      const errorMsg = `Execution Error: ${(error as Error).message}`;
      setOutput(errorMsg);
      toast({
        title: "Execution failed",
        description: "Check the output panel for error details.",
        variant: "destructive"
      });
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

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Code Editor */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <Code2 className="h-5 w-5" />
                {getCurrentLanguageConfig().label} Editor
              </CardTitle>
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
                  disabled={isRunning || !code.trim()}
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
            <div className="border rounded-md overflow-hidden">
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
          </CardContent>
        </Card>

        {/* Output Panel */}
        <OutputPanel output={output} isRunning={isRunning} />
      </div>

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
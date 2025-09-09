import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface OutputPanelProps {
  output: string;
  isRunning: boolean;
}

const OutputPanel = ({ output, isRunning }: OutputPanelProps) => {
  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${
            isRunning ? 'bg-yellow-500 animate-pulse' : 
            output ? 'bg-green-500' : 'bg-muted-foreground'
          }`}></div>
          Console Output
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="bg-muted/30 rounded-md p-4 h-[450px] overflow-auto">
          <pre className="font-mono text-sm whitespace-pre-wrap text-foreground">
            {isRunning ? "Running code..." : 
             output || "Ready to run your code...\n\nClick 'Run Code' to execute."}
          </pre>
        </div>
      </CardContent>
    </Card>
  );
};

export default OutputPanel;
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  BarChart3, 
  PieChart, 
  TrendingUp, 
  Database, 
  FileSpreadsheet, 
  Brain,
  ArrowLeft,
  Upload,
  Download,
  Play
} from "lucide-react";

const DataAnalysis = () => {
  const navigate = useNavigate();
  const [selectedTool, setSelectedTool] = useState("");
  const [dataInput, setDataInput] = useState("");

  const analysisTools = [
    {
      id: "descriptive",
      icon: BarChart3,
      title: "Descriptive Analytics",
      description: "Summarize and understand your data with statistical measures",
      category: "Basic"
    },
    {
      id: "predictive",
      icon: TrendingUp,
      title: "Predictive Analytics", 
      description: "Forecast trends and patterns using machine learning",
      category: "Advanced"
    },
    {
      id: "clustering",
      icon: Database,
      title: "Data Clustering",
      description: "Group similar data points and find hidden patterns",
      category: "Advanced"
    },
    {
      id: "visualization",
      icon: PieChart,
      title: "Data Visualization",
      description: "Create charts and graphs from your datasets",
      category: "Basic"
    },
    {
      id: "preprocessing",
      icon: FileSpreadsheet,
      title: "Data Preprocessing",
      description: "Clean, transform and prepare your data for analysis",
      category: "Basic"
    },
    {
      id: "ml-insights",
      icon: Brain,
      title: "ML Insights",
      description: "Apply machine learning algorithms for deeper insights",
      category: "Expert"
    }
  ];

  return (
    <div className="min-h-screen bg-[var(--gradient-background)]">
      {/* Header */}
      <div className="bg-card border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/")}
              className="text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Data Analysis Tools</h1>
              <p className="text-muted-foreground">
                Analyze your data with powerful statistical and machine learning tools
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Tools Selection */}
          <div className="lg:col-span-2">
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Choose Analysis Type</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {analysisTools.map((tool) => (
                  <Card 
                    key={tool.id}
                    className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                      selectedTool === tool.id 
                        ? 'border-primary bg-primary/5' 
                        : 'border-border hover:border-primary/50'
                    }`}
                    onClick={() => setSelectedTool(tool.id)}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                            <tool.icon className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <CardTitle className="text-sm">{tool.title}</CardTitle>
                            <Badge variant="secondary" className="text-xs">
                              {tool.category}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <CardDescription className="text-sm">
                        {tool.description}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </div>

            {/* Data Input Section */}
            {selectedTool && (
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Upload className="h-5 w-5" />
                    Data Input
                  </CardTitle>
                  <CardDescription>
                    Upload your dataset or paste data directly
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload CSV
                    </Button>
                    <Button variant="outline" size="sm">
                      <FileSpreadsheet className="h-4 w-4 mr-2" />
                      Upload Excel
                    </Button>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Or paste your data:</label>
                    <Textarea
                      placeholder="Paste your CSV data here..."
                      value={dataInput}
                      onChange={(e) => setDataInput(e.target.value)}
                      className="min-h-[120px]"
                    />
                  </div>

                  <div className="flex gap-2">
                    <Select>
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="Data format" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="csv">CSV</SelectItem>
                        <SelectItem value="json">JSON</SelectItem>
                        <SelectItem value="tsv">TSV</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <Button className="ml-auto">
                      <Play className="h-4 w-4 mr-2" />
                      Run Analysis
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Results Panel */}
          <div>
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Analysis Results
                </CardTitle>
                <CardDescription>
                  Results will appear here after running analysis
                </CardDescription>
              </CardHeader>
              <CardContent>
                {!selectedTool ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Database className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Select an analysis tool to get started</p>
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <Brain className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Upload data and run analysis to see results</p>
                  </div>
                )}
                
                <div className="mt-6 pt-4 border-t border-border">
                  <Button variant="outline" size="sm" className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    Export Results
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataAnalysis;
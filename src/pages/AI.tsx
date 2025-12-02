import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowLeft, Bot, Send, Sparkles, Code, BookOpen, Lightbulb } from "lucide-react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const AI = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! I'm your AI learning assistant. I can help you with programming questions, explain concepts, debug code, and more. How can I assist you today?"
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simulate AI response (replace with actual AI integration)
    setTimeout(() => {
      const aiResponse: Message = {
        role: "assistant",
        content: "I'm here to help! This is a demo response. Connect me to Lovable AI for real AI-powered responses."
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1000);
  };

  const quickPrompts = [
    { icon: Code, text: "Explain a coding concept", prompt: "Can you explain how async/await works in JavaScript?" },
    { icon: BookOpen, text: "Help with learning", prompt: "What's the best way to learn Python for beginners?" },
    { icon: Lightbulb, text: "Debug my code", prompt: "Can you help me debug a piece of code?" },
  ];

  return (
    <div className="min-h-screen bg-background py-4 sm:py-8 px-3 sm:px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="mb-3 text-sm"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
          
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Bot className="h-8 w-8 text-primary" />
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-[var(--gradient-primary)] bg-clip-text text-transparent">
                AI Assistant
              </h1>
            </div>
            <p className="text-sm sm:text-base text-muted-foreground">
              Your intelligent learning companion for coding and programming
            </p>
          </div>
        </div>

        {/* Quick Prompts */}
        {messages.length === 1 && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
            {quickPrompts.map((prompt, index) => (
              <Card 
                key={index}
                className="cursor-pointer hover:border-primary/50 transition-colors bg-card/50"
                onClick={() => {
                  setInput(prompt.prompt);
                }}
              >
                <CardContent className="p-4 flex items-center gap-3">
                  <prompt.icon className="h-5 w-5 text-primary" />
                  <span className="text-sm text-foreground">{prompt.text}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Chat Area */}
        <Card className="bg-card border-border/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              Chat with AI
            </CardTitle>
            <CardDescription>Ask anything about programming, get explanations, or debug code</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[400px] pr-4 mb-4">
              <div className="space-y-4">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg px-4 py-2 ${
                        message.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-foreground"
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-muted rounded-lg px-4 py-2">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:0.1s]" />
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:0.2s]" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            <div className="flex gap-2">
              <Input
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                disabled={isLoading}
                className="flex-1"
              />
              <Button onClick={handleSend} disabled={isLoading || !input.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
          <Card className="bg-card/50 border-border/50">
            <CardContent className="p-4 text-center">
              <Code className="h-8 w-8 mx-auto mb-2 text-primary" />
              <h3 className="font-semibold text-foreground">Code Help</h3>
              <p className="text-xs text-muted-foreground">Get explanations and debug assistance</p>
            </CardContent>
          </Card>
          <Card className="bg-card/50 border-border/50">
            <CardContent className="p-4 text-center">
              <BookOpen className="h-8 w-8 mx-auto mb-2 text-primary" />
              <h3 className="font-semibold text-foreground">Learn Concepts</h3>
              <p className="text-xs text-muted-foreground">Understand programming topics</p>
            </CardContent>
          </Card>
          <Card className="bg-card/50 border-border/50">
            <CardContent className="p-4 text-center">
              <Lightbulb className="h-8 w-8 mx-auto mb-2 text-primary" />
              <h3 className="font-semibold text-foreground">Get Ideas</h3>
              <p className="text-xs text-muted-foreground">Project suggestions and tips</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AI;
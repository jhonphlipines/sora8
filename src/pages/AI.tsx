import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, Bot, Send, Sparkles, Code, BookOpen, Lightbulb, 
  Loader2, Paperclip, X, FileText, FileCode, FileArchive, File,
  User, Trash2
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import AIMessageContent from "@/components/AIMessageContent";
type FileAttachment = {
  name: string;
  type: string;
  size: number;
  content: string;
};

type Message = {
  role: "user" | "assistant";
  content: string;
  files?: FileAttachment[];
};

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-chat`;
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

async function streamChat({
  messages,
  onDelta,
  onDone,
  onError,
}: {
  messages: Message[];
  onDelta: (deltaText: string) => void;
  onDone: () => void;
  onError: (error: string) => void;
}) {
  try {
    const resp = await fetch(CHAT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
      },
      body: JSON.stringify({ messages }),
    });

    if (!resp.ok) {
      const errorData = await resp.json().catch(() => ({ error: "Failed to connect to AI" }));
      onError(errorData.error || `Error: ${resp.status}`);
      return;
    }

    if (!resp.body) {
      onError("No response body");
      return;
    }

    const reader = resp.body.getReader();
    const decoder = new TextDecoder();
    let textBuffer = "";
    let streamDone = false;

    while (!streamDone) {
      const { done, value } = await reader.read();
      if (done) break;
      textBuffer += decoder.decode(value, { stream: true });

      let newlineIndex: number;
      while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
        let line = textBuffer.slice(0, newlineIndex);
        textBuffer = textBuffer.slice(newlineIndex + 1);

        if (line.endsWith("\r")) line = line.slice(0, -1);
        if (line.startsWith(":") || line.trim() === "") continue;
        if (!line.startsWith("data: ")) continue;

        const jsonStr = line.slice(6).trim();
        if (jsonStr === "[DONE]") {
          streamDone = true;
          break;
        }

        try {
          const parsed = JSON.parse(jsonStr);
          const content = parsed.choices?.[0]?.delta?.content as string | undefined;
          if (content) onDelta(content);
        } catch {
          textBuffer = line + "\n" + textBuffer;
          break;
        }
      }
    }

    // Final flush
    if (textBuffer.trim()) {
      for (let raw of textBuffer.split("\n")) {
        if (!raw) continue;
        if (raw.endsWith("\r")) raw = raw.slice(0, -1);
        if (raw.startsWith(":") || raw.trim() === "") continue;
        if (!raw.startsWith("data: ")) continue;
        const jsonStr = raw.slice(6).trim();
        if (jsonStr === "[DONE]") continue;
        try {
          const parsed = JSON.parse(jsonStr);
          const content = parsed.choices?.[0]?.delta?.content as string | undefined;
          if (content) onDelta(content);
        } catch { /* ignore */ }
      }
    }

    onDone();
  } catch (error) {
    onError(error instanceof Error ? error.message : "Connection failed");
  }
}

const getFileIcon = (type: string, name: string) => {
  if (type === "application/pdf" || name.endsWith(".pdf")) return FileText;
  if (type.includes("zip") || type.includes("compressed") || name.endsWith(".zip")) return FileArchive;
  if (type.includes("text") || type.includes("javascript") || type.includes("json") || 
      name.match(/\.(js|ts|tsx|jsx|py|java|cpp|c|h|css|html|xml|yaml|yml|md|txt)$/i)) return FileCode;
  return File;
};

const formatFileSize = (bytes: number) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
};

const AI = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const scrollRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! I'm Sora AI, your intelligent study companion powered by Google Gemini. 🚀\n\nI can help you with:\n• **Programming questions** - Any language, any concept\n• **Code debugging** - Paste your code and I'll help fix it\n• **Learning concepts** - Clear explanations of complex topics\n• **File analysis** - Upload PDFs, code files, or text documents\n\nUpload a file or ask me anything to get started!"
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [attachedFiles, setAttachedFiles] = useState<FileAttachment[]>([]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const readFileContent = async (file: globalThis.File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      if (file.type === "application/pdf") {
        // For PDFs, we'll read as base64 and let the AI handle it
        reader.onload = () => {
          const base64 = (reader.result as string).split(",")[1];
          resolve(`[PDF Content - Base64 encoded]\n${base64}`);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      } else {
        // For text files, read as text
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsText(file);
      }
    });
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const validExtensions = /\.(txt|md|json|xml|csv|yaml|yml|js|ts|tsx|jsx|py|java|cpp|c|h|css|html|pdf|zip|log|sql|sh|bash|php|rb|go|rs|swift|kt|scala|r|m|mm)$/i;
    
    for (const file of files) {
      if (file.size > MAX_FILE_SIZE) {
        toast({
          title: "File too large",
          description: `${file.name} exceeds 5MB limit`,
          variant: "destructive"
        });
        continue;
      }

      if (!validExtensions.test(file.name) && !file.type.includes("text") && file.type !== "application/pdf") {
        toast({
          title: "Invalid file type",
          description: `${file.name} is not a supported file type. Supported: text, code, PDF, ZIP files`,
          variant: "destructive"
        });
        continue;
      }

      try {
        const content = await readFileContent(file);
        setAttachedFiles(prev => [...prev, {
          name: file.name,
          type: file.type || "text/plain",
          size: file.size,
          content
        }]);
      } catch {
        toast({
          title: "Error reading file",
          description: `Could not read ${file.name}`,
          variant: "destructive"
        });
      }
    }

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const removeFile = (index: number) => {
    setAttachedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSend = async () => {
    if ((!input.trim() && attachedFiles.length === 0) || isLoading) return;

    // Build message content with files
    let messageContent = input.trim();
    if (attachedFiles.length > 0) {
      const fileContents = attachedFiles.map(f => 
        `\n\n--- File: ${f.name} (${formatFileSize(f.size)}) ---\n${f.content}`
      ).join("\n");
      messageContent = messageContent 
        ? `${messageContent}\n\n[Attached Files]${fileContents}`
        : `Please analyze these files:${fileContents}`;
    }

    const userMessage: Message = { 
      role: "user", 
      content: messageContent,
      files: attachedFiles.length > 0 ? [...attachedFiles] : undefined
    };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setAttachedFiles([]);
    setIsLoading(true);

    let assistantContent = "";

    const updateAssistant = (chunk: string) => {
      assistantContent += chunk;
      setMessages(prev => {
        const last = prev[prev.length - 1];
        if (last?.role === "assistant" && prev.length > 1 && prev[prev.length - 2]?.role === "user") {
          return prev.map((m, i) => (i === prev.length - 1 ? { ...m, content: assistantContent } : m));
        }
        return [...prev, { role: "assistant", content: assistantContent }];
      });
    };

    // Send simplified messages to API (without file objects)
    const apiMessages = newMessages.map(m => ({ role: m.role, content: m.content }));

    await streamChat({
      messages: apiMessages,
      onDelta: (chunk) => updateAssistant(chunk),
      onDone: () => setIsLoading(false),
      onError: (error) => {
        setIsLoading(false);
        toast({
          title: "AI Error",
          description: error,
          variant: "destructive"
        });
        setMessages(prev => [...prev, { 
          role: "assistant", 
          content: `I apologize, but I encountered an error: ${error}. Please try again.` 
        }]);
      }
    });
  };

  const clearChat = () => {
    setMessages([{
      role: "assistant",
      content: "Chat cleared! How can I help you today?"
    }]);
    setAttachedFiles([]);
    setInput("");
  };

  const quickPrompts = [
    { icon: Code, text: "Explain async/await", prompt: "Can you explain how async/await works in JavaScript with examples?" },
    { icon: BookOpen, text: "Learn Python basics", prompt: "What's the best way to learn Python for beginners? Give me a roadmap." },
    { icon: Lightbulb, text: "Debug my code", prompt: "I have a bug in my code. Can you help me debug it?" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 pb-24">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-lg border-b border-border/50">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/')}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Back</span>
          </Button>
          
          <div className="flex items-center gap-2">
            <div className="relative">
              <Bot className="h-8 w-8 text-primary" />
              <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 bg-green-500 rounded-full border-2 border-background" />
            </div>
            <div>
              <h1 className="text-lg font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Sora AI
              </h1>
              <p className="text-xs text-muted-foreground">Powered by Gemini</p>
            </div>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={clearChat}
            className="gap-2 text-muted-foreground hover:text-destructive"
          >
            <Trash2 className="h-4 w-4" />
            <span className="hidden sm:inline">Clear</span>
          </Button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-4">
        {/* Quick Prompts - Show only on first message */}
        {messages.length === 1 && (
          <div className="flex flex-wrap gap-2 mb-4 justify-center">
            {quickPrompts.map((prompt, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="gap-2 bg-card/50 hover:bg-primary/10 hover:border-primary/50 transition-all"
                onClick={() => setInput(prompt.prompt)}
              >
                <prompt.icon className="h-4 w-4 text-primary" />
                {prompt.text}
              </Button>
            ))}
          </div>
        )}

        {/* Chat Messages */}
        <ScrollArea className="h-[calc(100vh-280px)] min-h-[400px]" ref={scrollRef}>
          <div className="space-y-4 pb-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex gap-3 ${message.role === "user" ? "flex-row-reverse" : ""}`}
              >
                {/* Avatar */}
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                  message.role === "user" 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20"
                }`}>
                  {message.role === "user" ? (
                    <User className="h-4 w-4" />
                  ) : (
                    <Sparkles className="h-4 w-4 text-primary" />
                  )}
                </div>

                {/* Message Content */}
                <div className={`flex-1 max-w-[85%] ${message.role === "user" ? "text-right" : ""}`}>
                  {/* File attachments for user messages */}
                  {message.files && message.files.length > 0 && (
                    <div className={`flex flex-wrap gap-2 mb-2 ${message.role === "user" ? "justify-end" : ""}`}>
                      {message.files.map((file, fileIndex) => {
                        const FileIcon = getFileIcon(file.type, file.name);
                        return (
                          <Badge key={fileIndex} variant="secondary" className="gap-1 py-1">
                            <FileIcon className="h-3 w-3" />
                            <span className="max-w-[100px] truncate">{file.name}</span>
                          </Badge>
                        );
                      })}
                    </div>
                  )}
                  
                  <div
                    className={`inline-block rounded-2xl px-4 py-3 ${
                      message.role === "user"
                        ? "bg-primary text-primary-foreground rounded-tr-sm"
                        : "bg-card border border-border/50 rounded-tl-sm shadow-sm max-w-full"
                    }`}
                  >
                    {message.role === "user" ? (
                      <div className="text-sm whitespace-pre-wrap leading-relaxed">
                        {message.files ? input || "Analyzing files..." : message.content.split("\n\n[Attached Files]")[0]}
                      </div>
                    ) : (
                      <AIMessageContent content={message.content} />
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            {/* Loading indicator */}
            {isLoading && messages[messages.length - 1]?.role === "user" && (
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20">
                  <Sparkles className="h-4 w-4 text-primary" />
                </div>
                <div className="bg-card border border-border/50 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                    <span className="text-sm text-muted-foreground">Thinking...</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Input Area */}
        <div className="sticky bottom-20 sm:bottom-4 bg-background/95 backdrop-blur-sm pt-4">
          {/* Attached Files Preview */}
          {attachedFiles.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3 p-3 bg-muted/50 rounded-lg border border-border/50">
              {attachedFiles.map((file, index) => {
                const FileIcon = getFileIcon(file.type, file.name);
                return (
                  <div
                    key={index}
                    className="flex items-center gap-2 bg-background rounded-md px-3 py-1.5 border border-border/50 group"
                  >
                    <FileIcon className="h-4 w-4 text-primary" />
                    <span className="text-sm max-w-[120px] truncate">{file.name}</span>
                    <span className="text-xs text-muted-foreground">({formatFileSize(file.size)})</span>
                    <button
                      onClick={() => removeFile(index)}
                      className="ml-1 text-muted-foreground hover:text-destructive transition-colors"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                );
              })}
            </div>
          )}

          <div className="flex gap-2 items-end">
            {/* File Upload Button */}
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept=".txt,.md,.json,.xml,.csv,.yaml,.yml,.js,.ts,.tsx,.jsx,.py,.java,.cpp,.c,.h,.css,.html,.pdf,.zip,.log,.sql,.sh,.bash,.php,.rb,.go,.rs,.swift,.kt,.scala,.r,.m,.mm"
              onChange={handleFileSelect}
              className="hidden"
            />
            <Button
              variant="outline"
              size="icon"
              onClick={() => fileInputRef.current?.click()}
              disabled={isLoading}
              className="flex-shrink-0 h-12 w-12 rounded-xl hover:bg-primary/10 hover:border-primary/50 transition-all"
              title="Attach files (max 5MB each)"
            >
              <Paperclip className="h-5 w-5" />
            </Button>

            {/* Text Input */}
            <div className="flex-1 relative">
              <Textarea
                ref={textareaRef}
                placeholder="Ask anything or drop files here..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                disabled={isLoading}
                className="min-h-[48px] max-h-[120px] resize-none pr-12 rounded-xl bg-card border-border/50 focus:border-primary/50"
                rows={1}
              />
              <Button
                onClick={handleSend}
                disabled={isLoading || (!input.trim() && attachedFiles.length === 0)}
                size="icon"
                className="absolute right-2 bottom-2 h-8 w-8 rounded-lg"
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          <p className="text-xs text-muted-foreground text-center mt-2">
            Upload text, code, PDF, or ZIP files (max 5MB) • Press Enter to send
          </p>
        </div>
      </div>
    </div>
  );
};

export default AI;
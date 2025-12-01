import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MessageCircle, Send, X, Minimize2, Maximize2, Sparkles, User, Bot, Globe, Code, Move } from "lucide-react";
import { cn } from "@/lib/utils";
interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}
interface AIAssistantProps {
  context?: string; // Current learning context (e.g., "JavaScript", "React")
  className?: string;
}
const languages = [{
  code: 'en',
  name: 'English',
  flag: '🇺🇸'
}, {
  code: 'es',
  name: 'Español',
  flag: '🇪🇸'
}, {
  code: 'fr',
  name: 'Français',
  flag: '🇫🇷'
}, {
  code: 'de',
  name: 'Deutsch',
  flag: '🇩🇪'
}, {
  code: 'it',
  name: 'Italiano',
  flag: '🇮🇹'
}, {
  code: 'pt',
  name: 'Português',
  flag: '🇵🇹'
}, {
  code: 'ru',
  name: 'Русский',
  flag: '🇷🇺'
}, {
  code: 'zh',
  name: '中文',
  flag: '🇨🇳'
}, {
  code: 'ja',
  name: '日本語',
  flag: '🇯🇵'
}, {
  code: 'ko',
  name: '한국어',
  flag: '🇰🇷'
}, {
  code: 'ar',
  name: 'العربية',
  flag: '🇸🇦'
}, {
  code: 'hi',
  name: 'हिन्दी',
  flag: '🇮🇳'
}];
const programmingLanguages = [{
  code: 'general',
  name: 'General Programming',
  icon: '💻'
}, {
  code: 'javascript',
  name: 'JavaScript',
  icon: '🟨'
}, {
  code: 'python',
  name: 'Python',
  icon: '🐍'
}, {
  code: 'react',
  name: 'React',
  icon: '⚛️'
}, {
  code: 'java',
  name: 'Java',
  icon: '☕'
}, {
  code: 'cpp',
  name: 'C++',
  icon: '🔷'
}, {
  code: 'csharp',
  name: 'C#',
  icon: '🔵'
}, {
  code: 'php',
  name: 'PHP',
  icon: '🟣'
}, {
  code: 'sql',
  name: 'SQL',
  icon: '🗄️'
}, {
  code: 'html',
  name: 'HTML/CSS',
  icon: '🌐'
}, {
  code: 'nodejs',
  name: 'Node.js',
  icon: '🟢'
}, {
  code: 'flutter',
  name: 'Flutter',
  icon: '📱'
}, {
  code: 'swift',
  name: 'Swift',
  icon: '🍎'
}, {
  code: 'kotlin',
  name: 'Kotlin',
  icon: '🤖'
}, {
  code: 'rust',
  name: 'Rust',
  icon: '🦀'
}, {
  code: 'go',
  name: 'Go',
  icon: '🐹'
}];
export const AIAssistant = ({
  context,
  className
}: AIAssistantProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [selectedProgrammingLanguage, setSelectedProgrammingLanguage] = useState('general');
  const [position, setPosition] = useState({
    left: window.innerWidth - 400,
    top: window.innerHeight - 450
  }); // Start at bottom-right
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({
    x: 0,
    y: 0
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const assistantRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth"
    });
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  useEffect(() => {
    // Check if API key exists in localStorage
    const savedApiKey = localStorage.getItem('openai_api_key');
    if (savedApiKey) {
      setApiKey(savedApiKey);
    } else {
      setShowApiKeyInput(true);
    }

    // Load saved position or set default
    const savedPosition = localStorage.getItem('ai_assistant_position');
    if (savedPosition) {
      setPosition(JSON.parse(savedPosition));
    } else {
      setPosition({
        left: window.innerWidth - 400,
        top: window.innerHeight - 450
      });
    }
  }, []);

  // Drag handlers
  const handlePointerDown = (e: React.PointerEvent) => {
    if ((e.target as HTMLElement).closest('.drag-handle')) {
      setIsDragging(true);
      setDragStart({
        x: e.clientX - position.left,
        y: e.clientY - position.top
      });
      e.preventDefault();
    }
  };
  const handlePointerMove = (e: PointerEvent) => {
    if (!isDragging) return;
    const newLeft = e.clientX - dragStart.x;
    const newTop = e.clientY - dragStart.y;

    // Keep within viewport bounds
    const maxLeft = window.innerWidth - (assistantRef.current?.offsetWidth || 320);
    const maxTop = window.innerHeight - (assistantRef.current?.offsetHeight || 384);
    const boundedPosition = {
      left: Math.max(0, Math.min(newLeft, maxLeft)),
      top: Math.max(0, Math.min(newTop, maxTop))
    };
    setPosition(boundedPosition);
    localStorage.setItem('ai_assistant_position', JSON.stringify(boundedPosition));
  };
  const handlePointerUp = () => {
    setIsDragging(false);
  };
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('pointermove', handlePointerMove);
      document.addEventListener('pointerup', handlePointerUp);
      return () => {
        document.removeEventListener('pointermove', handlePointerMove);
        document.removeEventListener('pointerup', handlePointerUp);
      };
    }
  }, [isDragging, dragStart, position]);
  const saveApiKey = () => {
    if (apiKey.trim()) {
      localStorage.setItem('openai_api_key', apiKey);
      setShowApiKeyInput(false);
      // Add welcome message in selected language
      const welcomeMessages = {
        en: `Hello! I'm your AI learning assistant${context ? ` for ${context}` : ''}. I'm here to help answer your questions, explain concepts, and provide guidance. What would you like to learn about?`,
        es: `¡Hola! Soy tu asistente de aprendizaje con IA${context ? ` para ${context}` : ''}. Estoy aquí para ayudarte a responder tus preguntas, explicar conceptos y brindarte orientación. ¿Sobre qué te gustaría aprender?`,
        fr: `Bonjour ! Je suis votre assistant d'apprentissage IA${context ? ` pour ${context}` : ''}. Je suis là pour vous aider à répondre à vos questions, expliquer des concepts et vous guider. Sur quoi aimeriez-vous apprendre ?`,
        de: `Hallo! Ich bin Ihr KI-Lernassistent${context ? ` für ${context}` : ''}. Ich bin hier, um Ihre Fragen zu beantworten, Konzepte zu erklären und Ihnen Anleitung zu geben. Worüber möchten Sie lernen?`,
        it: `Ciao! Sono il tuo assistente di apprendimento AI${context ? ` per ${context}` : ''}. Sono qui per aiutarti a rispondere alle tue domande, spiegare concetti e fornirti guida. Su cosa vorresti imparare?`,
        pt: `Olá! Sou seu assistente de aprendizagem com IA${context ? ` para ${context}` : ''}. Estou aqui para ajudar a responder suas perguntas, explicar conceitos e fornecer orientação. Sobre o que você gostaria de aprender?`,
        ru: `Привет! Я ваш ИИ-помощник по обучению${context ? ` для ${context}` : ''}. Я здесь, чтобы помочь ответить на ваши вопросы, объяснить концепции и предоставить руководство. О чем бы вы хотели узнать?`,
        zh: `你好！我是您的AI学习助手${context ? `，专门帮助您学习${context}` : ''}。我在这里回答您的问题，解释概念并提供指导。您想学习什么呢？`,
        ja: `こんにちは！私はあなたのAI学習アシスタントです${context ? `、${context}について` : ''}。質問にお答えし、概念を説明し、ガイダンスを提供します。何について学びたいですか？`,
        ko: `안녕하세요! 저는 당신의 AI 학습 도우미입니다${context ? `, ${context}에 대해` : ''}. 질문에 답하고, 개념을 설명하며, 안내를 제공하기 위해 여기 있습니다. 무엇에 대해 배우고 싶으신가요?`,
        ar: `مرحبا! أنا مساعد التعلم بالذكاء الاصطناعي${context ? ` لـ ${context}` : ''}. أنا هنا لمساعدتك في الإجابة على أسئلتك وشرح المفاهيم وتقديم التوجيه. ماذا تريد أن تتعلم؟`,
        hi: `नमस्ते! मैं आपका AI शिक्षा सहायक हूँ${context ? ` ${context} के लिए` : ''}। मैं यहाँ आपके प्रश्नों का उत्तर देने, अवधारणाओं को समझाने और मार्गदर्शन प्रदान करने के लिए हूँ। आप क्या सीखना चाहते हैं?`
      };
      const welcomeMessage: Message = {
        id: Date.now().toString(),
        content: welcomeMessages[selectedLanguage as keyof typeof welcomeMessages] || welcomeMessages.en,
        role: 'assistant',
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    }
  };
  const sendMessage = async () => {
    if (!inputValue.trim() || isLoading || !apiKey) return;
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      role: 'user',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);
    try {
      const currentLanguage = languages.find(lang => lang.code === selectedLanguage);
      const currentProgrammingLang = programmingLanguages.find(lang => lang.code === selectedProgrammingLanguage);
      const languageInstruction = selectedLanguage !== 'en' ? `IMPORTANT: Respond in ${currentLanguage?.name} language. All explanations, examples, and text should be in ${currentLanguage?.name}.` : '';
      const programmingContext = selectedProgrammingLanguage !== 'general' ? `Focus specifically on ${currentProgrammingLang?.name} programming language. Provide examples, best practices, and explanations related to ${currentProgrammingLang?.name}.` : '';
      const systemPrompt = `You are a helpful AI assistant specializing in programming and technology education. ${context ? `The user is currently learning about ${context}.` : ''} 
      
      ${languageInstruction}
      ${programmingContext}
      
      Your role is to:
      - Answer questions clearly and concisely
      - Explain complex concepts in simple terms
      - Provide practical examples and code snippets when relevant
      - Encourage learning and provide additional resources
      - Be supportive and patient
      ${selectedProgrammingLanguage !== 'general' ? `- Focus on ${currentProgrammingLang?.name} specific solutions and patterns` : ''}
      
      Keep responses focused, educational, and encouraging. Use markdown formatting for code blocks and structure your responses well.`;
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [{
            role: 'system',
            content: systemPrompt
          }, ...messages.map(msg => ({
            role: msg.role,
            content: msg.content
          })), {
            role: 'user',
            content: inputValue
          }],
          max_tokens: 1000,
          temperature: 0.7
        })
      });
      if (!response.ok) {
        throw new Error('Failed to get AI response');
      }
      const data = await response.json();
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.choices[0].message.content,
        role: 'assistant',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "I'm sorry, I encountered an error. Please check your API key and try again.",
        role: 'assistant',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (showApiKeyInput) {
        saveApiKey();
      } else {
        sendMessage();
      }
    }
  };
  const resetChat = () => {
    setMessages([]);
    if (apiKey) {
      const welcomeMessages = {
        en: `Hello! I'm your AI learning assistant${context ? ` for ${context}` : ''}. I'm here to help answer your questions, explain concepts, and provide guidance. What would you like to learn about?`,
        es: `¡Hola! Soy tu asistente de aprendizaje con IA${context ? ` para ${context}` : ''}. Estoy aquí para ayudarte a responder tus preguntas, explicar conceptos y brindarte orientación. ¿Sobre qué te gustaría aprender?`,
        fr: `Bonjour ! Je suis votre assistant d'apprentissage IA${context ? ` pour ${context}` : ''}. Je suis là pour vous aider à répondre à vos questions, expliquer des concepts et vous guider. Sur quoi aimeriez-vous apprendre ?`,
        de: `Hallo! Ich bin Ihr KI-Lernassistent${context ? ` für ${context}` : ''}. Ich bin hier, um Ihre Fragen zu beantworten, Konzepte zu erklären und Ihnen Anleitung zu geben. Worüber möchten Sie lernen?`,
        it: `Ciao! Sono il tuo assistente di apprendimento AI${context ? ` per ${context}` : ''}. Sono qui per aiutarti a rispondere alle tue domande, spiegare concetti e fornirti guida. Su cosa vorresti imparare?`,
        pt: `Olá! Sou seu assistente de aprendizagem com IA${context ? ` para ${context}` : ''}. Estou aqui para ajudar a responder suas perguntas, explicar conceitos e fornecer orientação. Sobre o que você gostaria de aprender?`,
        ru: `Привет! Я ваш ИИ-помощник по обучению${context ? ` для ${context}` : ''}. Я здесь, чтобы помочь ответить на ваши вопросы, объяснить концепции и предоставить руководство. О чем бы вы хотели узнать?`,
        zh: `你好！我是您的AI学习助手${context ? `，专门帮助您学习${context}` : ''}。我在这里回答您的问题，解释概念并提供指导。您想学习什么呢？`,
        ja: `こんにちは！私はあなたのAI学習アシスタントです${context ? `、${context}について` : ''}。質問にお答えし、概念を説明し、ガイダンスを提供します。何について学びたいですか？`,
        ko: `안녕하세요! 저는 당신의 AI 학습 도우미입니다${context ? `, ${context}에 대해` : ''}. 질문에 답하고, 개념을 설명하며, 안내를 제공하기 위해 여기 있습니다. 무엇에 대해 배우고 싶으신가요?`,
        ar: `مرحبا! أنا مساعد التعلم بالذكاء الاصطناعي${context ? ` لـ ${context}` : ''}. أنا هنا لمساعدتك في الإجابة على أسئلتك وشرح المفاهيم وتقديم التوجيه. ماذا تريد أن تتعلم؟`,
        hi: `नमस्ते! मैं आपका AI शिक्षा सहायक हूँ${context ? ` ${context} के लिए` : ''}। मैं यहाँ आपके प्रश्नों का उत्तर देने, अवधारणाओं को समझाने और मार्गदर्शन प्रदान करने के लिए हूँ। आप क्या सीखना चाहते हैं?`
      };
      const welcomeMessage: Message = {
        id: Date.now().toString(),
        content: welcomeMessages[selectedLanguage as keyof typeof welcomeMessages] || welcomeMessages.en,
        role: 'assistant',
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    }
  };
  if (!isOpen) {
    return <div ref={assistantRef} className={cn("fixed z-50 cursor-pointer", className)} style={{
      left: position.left + 'px',
      top: position.top + 'px'
    }} onPointerDown={handlePointerDown}>
        
        <Badge variant="secondary" className="absolute -top-2 -left-2 bg-primary text-primary-foreground animate-pulse pointer-events-none">
          <Sparkles className="h-3 w-3 mr-1" />
          AI Help
        </Badge>
      </div>;
  }
  return <div ref={assistantRef} className={cn("fixed z-50", className)} style={{
    left: position.left + 'px',
    top: position.top + 'px'
  }} onPointerDown={handlePointerDown}>
      <Card className={cn("w-80 shadow-2xl border-border/50 bg-card/95 backdrop-blur-sm transition-all duration-300", isMinimized ? "h-14" : "h-96", isDragging ? "cursor-grabbing" : "cursor-auto")}>
        <CardHeader className="flex flex-row items-center justify-between py-3 px-4 border-b border-border/50 drag-handle cursor-grab active:cursor-grabbing">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[var(--gradient-primary)] flex items-center justify-center">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <CardTitle className="text-sm font-semibold select-none">
              AI Assistant {context && <span className="text-xs text-muted-foreground">• {context}</span>}
            </CardTitle>
            <Move className="h-4 w-4 text-muted-foreground ml-auto" />
          </div>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="sm" onClick={() => setIsMinimized(!isMinimized)} className="h-8 w-8 p-0">
              {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)} className="h-8 w-8 p-0">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>

        {!isMinimized && <CardContent className="p-0 flex flex-col h-[calc(100%-4rem)]">
            {showApiKeyInput ? <div className="p-4 flex-1 flex flex-col justify-center">
                <div className="text-center mb-4">
                  <Sparkles className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <h3 className="font-semibold mb-2">Setup AI Assistant</h3>
                  <p className="text-xs text-muted-foreground mb-4">
                    Enter your OpenAI API key to enable AI-powered learning assistance
                  </p>
                </div>
                
                {/* Language Selector */}
                <div className="mb-3">
                  <label className="text-xs text-muted-foreground mb-2 block">Select Language</label>
                  <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                    <SelectTrigger className="w-full bg-background">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-background border border-border z-50">
                      {languages.map(lang => <SelectItem key={lang.code} value={lang.code} className="hover:bg-muted">
                          <div className="flex items-center gap-2">
                            <span>{lang.flag}</span>
                            <span>{lang.name}</span>
                          </div>
                        </SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                
                {/* Programming Language Selector */}
                <div className="mb-3">
                  <label className="text-xs text-muted-foreground mb-2 block">Programming Language</label>
                  <Select value={selectedProgrammingLanguage} onValueChange={setSelectedProgrammingLanguage}>
                    <SelectTrigger className="w-full bg-background">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-background border border-border z-50">
                      {programmingLanguages.map(lang => <SelectItem key={lang.code} value={lang.code} className="hover:bg-muted">
                          <div className="flex items-center gap-2">
                            <span>{lang.icon}</span>
                            <span>{lang.name}</span>
                          </div>
                        </SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                
                <Input type="password" placeholder="Enter your OpenAI API key..." value={apiKey} onChange={e => setApiKey(e.target.value)} onKeyPress={handleKeyPress} className="mb-3" />
                <Button onClick={saveApiKey} className="w-full" disabled={!apiKey.trim()}>
                  Start Learning with AI
                </Button>
                <p className="text-xs text-muted-foreground text-center mt-2">
                  Your API key is stored locally and securely
                </p>
              </div> : <>
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4">
                    {messages.map(message => <div key={message.id} className={cn("flex gap-2", message.role === 'user' ? "justify-end" : "justify-start")}>
                        {message.role === 'assistant' && <div className="w-6 h-6 rounded-full bg-[var(--gradient-primary)] flex items-center justify-center shrink-0 mt-1">
                            <Bot className="h-3 w-3 text-white" />
                          </div>}
                        <div className={cn("max-w-[80%] p-2 rounded-lg text-sm", message.role === 'user' ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground")}>
                          <div className="whitespace-pre-wrap">{message.content}</div>
                          <div className="text-xs opacity-50 mt-1">
                            {message.timestamp.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                          </div>
                        </div>
                        {message.role === 'user' && <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center shrink-0 mt-1">
                            <User className="h-3 w-3 text-primary-foreground" />
                          </div>}
                      </div>)}
                    {isLoading && <div className="flex gap-2 justify-start">
                        <div className="w-6 h-6 rounded-full bg-[var(--gradient-primary)] flex items-center justify-center shrink-0 mt-1">
                          <Bot className="h-3 w-3 text-white" />
                        </div>
                        <div className="bg-muted text-muted-foreground p-2 rounded-lg text-sm">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-current rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-current rounded-full animate-bounce [animation-delay:0.1s]"></div>
                            <div className="w-2 h-2 bg-current rounded-full animate-bounce [animation-delay:0.2s]"></div>
                          </div>
                        </div>
                      </div>}
                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>

                <div className="p-4 border-t border-border/50">
                  {/* Language Selectors */}
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    <div>
                      <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                        <SelectTrigger className="w-full bg-background h-8 text-xs">
                          <div className="flex items-center gap-2">
                            <Globe className="h-3 w-3" />
                            <SelectValue />
                          </div>
                        </SelectTrigger>
                        <SelectContent className="bg-background border border-border z-50">
                          {languages.map(lang => <SelectItem key={lang.code} value={lang.code} className="hover:bg-muted text-xs">
                              <div className="flex items-center gap-2">
                                <span className="text-sm">{lang.flag}</span>
                                <span>{lang.name}</span>
                              </div>
                            </SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Select value={selectedProgrammingLanguage} onValueChange={setSelectedProgrammingLanguage}>
                        <SelectTrigger className="w-full bg-background h-8 text-xs">
                          <div className="flex items-center gap-2">
                            <Code className="h-3 w-3" />
                            <SelectValue />
                          </div>
                        </SelectTrigger>
                        <SelectContent className="bg-background border border-border z-50">
                          {programmingLanguages.map(lang => <SelectItem key={lang.code} value={lang.code} className="hover:bg-muted text-xs">
                              <div className="flex items-center gap-2">
                                <span className="text-sm">{lang.icon}</span>
                                <span>{lang.name}</span>
                              </div>
                            </SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Input ref={inputRef} placeholder={selectedProgrammingLanguage !== 'general' ? `Ask about ${programmingLanguages.find(p => p.code === selectedProgrammingLanguage)?.name}...` : selectedLanguage === 'en' ? "Ask me anything about programming..." : selectedLanguage === 'es' ? "Pregúntame sobre programación..." : selectedLanguage === 'fr' ? "Demandez-moi sur la programmation..." : selectedLanguage === 'de' ? "Fragen Sie mich über Programmierung..." : selectedLanguage === 'it' ? "Chiedimi sulla programmazione..." : selectedLanguage === 'pt' ? "Pergunte-me sobre programação..." : selectedLanguage === 'ru' ? "Спросите меня о программировании..." : selectedLanguage === 'zh' ? "问我编程问题..." : selectedLanguage === 'ja' ? "プログラミングについて聞いてください..." : selectedLanguage === 'ko' ? "프로그래밍에 대해 물어보세요..." : selectedLanguage === 'ar' ? "اسألني عن البرمجة..." : selectedLanguage === 'hi' ? "प्रोग्रामिंग के बारे में पूछें..." : "Ask me anything about programming..."} value={inputValue} onChange={e => setInputValue(e.target.value)} onKeyPress={handleKeyPress} disabled={isLoading} className="flex-1" />
                    <Button onClick={sendMessage} disabled={!inputValue.trim() || isLoading} size="sm" className="bg-[var(--gradient-primary)] border-0">
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                  {messages.length > 0 && <Button variant="ghost" size="sm" onClick={resetChat} className="w-full mt-2 text-xs">
                      New Conversation
                    </Button>}
                </div>
              </>}
          </CardContent>}
      </Card>
    </div>;
};
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, XCircle, Clock } from "lucide-react";

interface QuizOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

interface QuizQuestion {
  id: string;
  question: string;
  options: QuizOption[];
  explanation?: string;
}

interface QuizCardProps {
  question: QuizQuestion;
  selectedAnswer: string | null;
  onAnswerSelect: (optionId: string) => void;
  onNext: () => void;
  onPrevious: () => void;
  currentQuestion: number;
  totalQuestions: number;
  showResult: boolean;
  canGoNext: boolean;
  canGoPrevious: boolean;
  timeRemaining: number;
}

export const QuizCard = ({
  question,
  selectedAnswer,
  onAnswerSelect,
  onNext,
  onPrevious,
  currentQuestion,
  totalQuestions,
  showResult,
  canGoNext,
  canGoPrevious,
  timeRemaining
}: QuizCardProps) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getOptionStyles = (option: QuizOption) => {
    if (!showResult) {
      return selectedAnswer === option.id 
        ? "border-quiz-selected bg-quiz-selected/10" 
        : "hover:border-quiz-hover hover:bg-quiz-hover/50";
    }
    
    if (option.isCorrect) {
      return "border-quiz-correct bg-quiz-correct/10";
    }
    
    if (selectedAnswer === option.id && !option.isCorrect) {
      return "border-quiz-incorrect bg-quiz-incorrect/10";
    }
    
    return "opacity-50";
  };

  return (
    <Card className="w-full max-w-4xl mx-auto bg-[var(--gradient-card)] border-border/50 shadow-2xl">
      <CardHeader className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            <span className="text-lg font-mono font-bold text-primary">
              {formatTime(timeRemaining)}
            </span>
          </div>
          <CardDescription className="text-right">
            Question {currentQuestion} of {totalQuestions}
          </CardDescription>
        </div>
        
        <Progress 
          value={(currentQuestion / totalQuestions) * 100} 
          className="h-2"
        />
        
        <CardTitle className="text-xl md:text-2xl text-foreground leading-relaxed">
          {question.question}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="grid gap-3">
          {question.options.map((option) => (
            <button
              key={option.id}
              onClick={() => !showResult && onAnswerSelect(option.id)}
              disabled={showResult}
              className={`
                p-4 rounded-lg border-2 text-left transition-all duration-200 
                ${getOptionStyles(option)}
                ${showResult ? 'cursor-not-allowed' : 'cursor-pointer'}
                group relative overflow-hidden
              `}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="font-bold text-primary min-w-[2rem]">
                    {option.id.toUpperCase()}.
                  </span>
                  <span className="text-foreground">{option.text}</span>
                </div>
                
                {showResult && (
                  <div className="flex-shrink-0">
                    {option.isCorrect ? (
                      <CheckCircle className="h-5 w-5 text-quiz-correct" />
                    ) : selectedAnswer === option.id ? (
                      <XCircle className="h-5 w-5 text-quiz-incorrect" />
                    ) : null}
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>
        
        {showResult && question.explanation && (
          <div className="mt-6 p-4 bg-muted/50 rounded-lg border border-border/50">
            <h4 className="font-semibold text-foreground mb-2">Explanation:</h4>
            <p className="text-muted-foreground">{question.explanation}</p>
          </div>
        )}
        
        <div className="flex justify-between pt-4">
          <Button 
            variant="outline" 
            onClick={onPrevious}
            disabled={!canGoPrevious}
          >
            Previous
          </Button>
          
          <Button 
            onClick={onNext}
            disabled={!canGoNext}
            className="bg-[var(--gradient-primary)] border-0 shadow-[var(--glow-primary)]"
          >
            {currentQuestion === totalQuestions ? 'Finish Quiz' : 'Next Question'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
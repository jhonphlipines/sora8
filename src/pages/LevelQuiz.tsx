import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { QuizCard } from "@/components/QuizCard";
import { testCategories } from "@/data/quizData";
import { levelCategories, Level, UserProgress } from "@/data/levelSystem";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home } from "lucide-react";
import { AIAssistant } from "@/components/AIAssistant";
import { toast } from "sonner";

export interface LevelQuizState {
  currentQuestionIndex: number;
  answers: Record<string, string>;
  showResult: boolean;
  timeRemaining: number;
  isCompleted: boolean;
}

const LevelQuiz = () => {
  const navigate = useNavigate();
  const { levelId } = useParams();

  // Find the level and get questions
  const findLevel = (): Level | null => {
    for (const category of levelCategories) {
      const level = category.levels.find(l => l.id === levelId);
      if (level) return level;
    }
    return null;
  };

  const level = findLevel();
  
  if (!level) {
    navigate('/levels');
    return null;
  }

  // Get questions for this level from all test categories
  const getLevelQuestions = () => {
    const allQuestions = testCategories.flatMap(cat => cat.questions);
    return level.questions.map(qId => 
      allQuestions.find(q => q.id === qId)
    ).filter(q => q !== undefined);
  };

  const levelQuestions = getLevelQuestions();
  
  // Check if we have questions for this level
  if (levelQuestions.length === 0) {
    return (
      <div className="min-h-screen bg-background py-8 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl font-bold mb-4">Questions Not Available</h1>
          <p className="text-muted-foreground mb-6">
            The questions for this level are not yet available. Please try a different level.
          </p>
          <Button onClick={() => navigate('/levels')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Levels
          </Button>
        </div>
      </div>
    );
  }

  const [quizState, setQuizState] = useState<LevelQuizState>({
    currentQuestionIndex: 0,
    answers: {},
    showResult: false,
    timeRemaining: level.timeLimit,
    isCompleted: false
  });

  // Timer effect
  useEffect(() => {
    if (quizState.timeRemaining > 0 && !quizState.isCompleted) {
      const timer = setTimeout(() => {
        setQuizState(prev => ({
          ...prev,
          timeRemaining: prev.timeRemaining - 1
        }));
      }, 1000);

      return () => clearTimeout(timer);
    } else if (quizState.timeRemaining === 0) {
      finishQuiz();
    }
  }, [quizState.timeRemaining, quizState.isCompleted]);

  const currentQuestion = levelQuestions[quizState.currentQuestionIndex];

  // Safety check for current question
  if (!currentQuestion) {
    return (
      <div className="min-h-screen bg-background py-8 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl font-bold mb-4">Question Not Found</h1>  
          <p className="text-muted-foreground mb-6">
            There was an issue loading the current question.
          </p>
          <Button onClick={() => navigate('/levels')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Levels
          </Button>
        </div>
      </div>
    );
  }

  const handleAnswerSelect = (optionId: string) => {
    setQuizState(prev => ({
      ...prev,
      answers: {
        ...prev.answers,
        [currentQuestion.id]: optionId
      }
    }));
  };

  const handleNext = () => {
    if (quizState.currentQuestionIndex === levelQuestions.length - 1) {
      finishQuiz();
    } else {
      setQuizState(prev => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex + 1,
        showResult: false
      }));
    }
  };

  const handlePrevious = () => {
    setQuizState(prev => ({
      ...prev,
      currentQuestionIndex: prev.currentQuestionIndex - 1,
      showResult: false
    }));
  };

  const finishQuiz = () => {
    setQuizState(prev => ({ ...prev, isCompleted: true }));
    
    // Calculate score
    const score = levelQuestions.reduce((total, question) => {
      const selectedAnswer = quizState.answers[question.id];
      const correctOption = question.options.find(opt => opt.isCorrect);
      return total + (selectedAnswer === correctOption?.id ? 1 : 0);
    }, 0);

    const percentage = Math.round((score / levelQuestions.length) * 100);
    const passed = percentage >= level.requiredScore;

    // Update user progress
    const savedProgress = localStorage.getItem('userLevelProgress');
    const userProgress: UserProgress = savedProgress ? JSON.parse(savedProgress) : {
      completedLevels: [],
      badges: [],
      scores: {},
      attempts: {}
    };

    // Update attempts
    userProgress.attempts[level.id] = (userProgress.attempts[level.id] || 0) + 1;
    
    // Update score and completion if passed
    if (passed) {
      if (!userProgress.completedLevels.includes(level.id)) {
        userProgress.completedLevels.push(level.id);
        userProgress.badges.push(level.badge.name);
        toast.success(`🎉 Level completed! Badge earned: ${level.badge.name}`);
      } else {
        toast.success(`✨ Level retaken successfully!`);
      }
      userProgress.scores[level.id] = Math.max(userProgress.scores[level.id] || 0, percentage);
    } else {
      toast.error(`❌ Score too low. Need ${level.requiredScore}% to pass.`);
    }

    localStorage.setItem('userLevelProgress', JSON.stringify(userProgress));

    // Navigate to results
    navigate('/level-results', { 
      state: { 
        score: percentage,
        totalQuestions: levelQuestions.length,
        answers: quizState.answers,
        timeSpent: level.timeLimit - quizState.timeRemaining,
        level: level,
        passed: passed,
        badge: passed ? level.badge : null,
        attempts: userProgress.attempts[level.id]
      } 
    });
  };

  const canGoNext = () => {
    return quizState.answers[currentQuestion.id] !== undefined;
  };

  const canGoPrevious = () => {
    return quizState.currentQuestionIndex > 0;
  };

  const getCategoryName = () => {
    for (const category of levelCategories) {
      if (category.levels.some(l => l.id === level.id)) {
        return category.name;
      }
    }
    return "Level Challenge";
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex gap-2 mb-4">
            <Button
              variant="ghost"
              onClick={() => navigate('/levels')}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Levels
            </Button>
            
            <Button
              variant="ghost"
              onClick={() => navigate('/')}
            >
              <Home className="h-4 w-4 mr-2" />
              Home
            </Button>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${level.badge.color} flex items-center justify-center text-2xl`}>
                {level.badge.icon}
              </div>
              <div className="text-left">
                <h1 className="text-2xl md:text-3xl font-bold bg-[var(--gradient-primary)] bg-clip-text text-transparent">
                  Level {level.level}: {level.name}
                </h1>
                <p className="text-muted-foreground">
                  {getCategoryName()} • {levelQuestions.length} questions • {Math.floor(level.timeLimit / 60)} minutes
                </p>
              </div>
            </div>
            
            <div className="max-w-md mx-auto bg-card/50 rounded-lg p-4 border border-border/30">
              <p className="text-sm text-muted-foreground mb-2">
                {level.description}
              </p>
              <div className="flex justify-center items-center gap-4 text-sm">
                <span className="font-medium text-foreground">
                  Pass: {level.requiredScore}%+
                </span>
                <span className="text-muted-foreground">•</span>
                <span className="font-medium text-primary">
                  Badge: {level.badge.name}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Quiz Card */}
        <QuizCard
          question={currentQuestion}
          selectedAnswer={quizState.answers[currentQuestion.id] || null}
          onAnswerSelect={handleAnswerSelect}
          onNext={handleNext}
          onPrevious={handlePrevious}
          currentQuestion={quizState.currentQuestionIndex + 1}
          totalQuestions={levelQuestions.length}
          showResult={quizState.showResult}
          canGoNext={canGoNext()}
          canGoPrevious={canGoPrevious()}
          timeRemaining={quizState.timeRemaining}
        />

        {/* Show Result Button */}
        {quizState.answers[currentQuestion.id] && !quizState.showResult && (
          <div className="text-center mt-6">
            <Button
              variant="outline"
              onClick={() => setQuizState(prev => ({ ...prev, showResult: true }))}
            >
              Show Answer
            </Button>
          </div>
        )}
      </div>
      
      {/* AI Assistant */}
      <AIAssistant context={`Level ${level.level}: ${level.name}`} />
    </div>
  );
};

export default LevelQuiz;
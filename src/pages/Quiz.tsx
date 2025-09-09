import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { QuizCard } from "@/components/QuizCard";
import { programmingQuiz, testCategories } from "@/data/quizData";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home } from "lucide-react";
import { AIAssistant } from "@/components/AIAssistant";

export interface QuizState {
  currentQuestionIndex: number;
  answers: Record<string, string>;
  showResult: boolean;
  timeRemaining: number;
  isCompleted: boolean;
}

const Quiz = () => {
  const navigate = useNavigate();
  const { testType } = useParams();
  const urlParams = new URLSearchParams(window.location.search);
  const limitQuestions = urlParams.get('questions');

  // Get the appropriate quiz questions based on test type
  const getQuizQuestions = () => {
    if (testType) {
      // Handle learn-based tests
      if (testType.startsWith('learn-')) {
        const language = testType.replace('learn-', '');
        const category = testCategories.find(cat => cat.id === language);
        if (category) {
          const questions = category.questions;
          // Limit to specified number of questions if provided
          return limitQuestions ? questions.slice(0, parseInt(limitQuestions)) : questions;
        }
      } else {
        const category = testCategories.find(cat => cat.id === testType);
        return category ? category.questions : programmingQuiz;
      }
    }
    return programmingQuiz;
  };

  const getTestName = () => {
    if (testType) {
      if (testType.startsWith('learn-')) {
        const language = testType.replace('learn-', '');
        const category = testCategories.find(cat => cat.id === language);
        return category ? `${category.name} Quick Test` : 'Programming Quick Test';
      } else {
        const category = testCategories.find(cat => cat.id === testType);
        return category ? `${category.name} Certification` : 'Programming Certification';
      }
    }
    return 'Programming Certification';
  };

  const quizQuestions = getQuizQuestions();
  const testName = getTestName();
  const [quizState, setQuizState] = useState<QuizState>({
    currentQuestionIndex: 0,
    answers: {},
    showResult: false,
    timeRemaining: limitQuestions ? 600 : 1800, // 10 minutes for quick test, 30 for full
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
      // Time's up - finish quiz
      finishQuiz();
    }
  }, [quizState.timeRemaining, quizState.isCompleted]);

  const currentQuestion = quizQuestions[quizState.currentQuestionIndex];

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
    if (quizState.currentQuestionIndex === quizQuestions.length - 1) {
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
    const score = quizQuestions.reduce((total, question) => {
      const selectedAnswer = quizState.answers[question.id];
      const correctOption = question.options.find(opt => opt.isCorrect);
      return total + (selectedAnswer === correctOption?.id ? 1 : 0);
    }, 0);

    // Navigate to results with score
    navigate('/results', { 
      state: { 
        score, 
        totalQuestions: quizQuestions.length,
        answers: quizState.answers,
        timeSpent: (limitQuestions ? 600 : 1800) - quizState.timeRemaining,
        testType: testType || 'general',
        testName: testName,
        isQuickTest: !!limitQuestions
      } 
    });
  };

  const canGoNext = () => {
    return quizState.answers[currentQuestion.id] !== undefined;
  };

  const canGoPrevious = () => {
    return quizState.currentQuestionIndex > 0;
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex gap-2 mb-4">
            <Button
              variant="ghost"
              onClick={() => navigate(testType?.startsWith('learn-') ? '/learn' : '/tests')}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              {testType?.startsWith('learn-') ? 'Back to Learn' : 'Back to Test Selection'}
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
            <h1 className="text-3xl md:text-4xl font-bold bg-[var(--gradient-primary)] bg-clip-text text-transparent mb-2">
              {testName}
            </h1>
            <p className="text-muted-foreground">
              {limitQuestions 
                ? `Quick test: ${quizQuestions.length} questions in ${Math.floor((limitQuestions ? 600 : 1800) / 60)} minutes`
                : `Answer all questions to earn your ${testName.toLowerCase()} certificate`
              }
            </p>
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
          totalQuestions={quizQuestions.length}
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
      <AIAssistant context={getTestName()} />
    </div>
  );
};

export default Quiz;
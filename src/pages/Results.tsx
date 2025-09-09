import { useLocation, useNavigate } from "react-router-dom";
import { Certificate } from "@/components/Certificate";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, RotateCcw, Home } from "lucide-react";
import { programmingQuiz, testCategories } from "@/data/quizData";

interface ResultsState {
  score: number;
  totalQuestions: number;
  answers: Record<string, string>;
  timeSpent: number;
  testType?: string;
  testName?: string;
  isQuickTest?: boolean;
}

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as ResultsState;

  if (!state) {
    navigate('/');
    return null;
  }

  const { score, totalQuestions, answers, timeSpent, testType, testName, isQuickTest } = state;
  const percentage = Math.round((score / totalQuestions) * 100);
  const isPassed = percentage >= 70;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  const generateCertificateId = () => {
    return `PROG-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Navigation */}
        <Button
          variant="ghost"
          onClick={() => navigate(testType?.startsWith('learn-') || isQuickTest ? '/learn' : '/tests')}
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          {testType?.startsWith('learn-') || isQuickTest ? 'Back to Learn' : 'Back to Test Selection'}
        </Button>

        {/* Results Summary */}
        <Card className="w-full max-w-2xl mx-auto bg-[var(--gradient-card)] border-border/50 shadow-xl">
          <CardHeader>
            <CardTitle className="text-center">
              <span className="text-2xl font-bold bg-[var(--gradient-primary)] bg-clip-text text-transparent">
                {isQuickTest ? 'Quick Test Results' : 'Quiz Results'}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-foreground mb-2">
                {score}/{totalQuestions}
              </div>
              <div className="text-xl text-muted-foreground mb-4">
                {percentage}% Score
              </div>
              <Progress value={percentage} className="h-3 mb-4" />
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="bg-muted/30 rounded-lg p-3">
                  <div className="font-semibold text-foreground">Time Spent</div>
                  <div className="text-muted-foreground">{formatTime(timeSpent)}</div>
                </div>
                <div className="bg-muted/30 rounded-lg p-3">
                  <div className="font-semibold text-foreground">Status</div>
                  <div className={isPassed ? "text-quiz-correct" : "text-quiz-incorrect"}>
                    {isPassed ? "PASSED" : "FAILED"}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-4 justify-center">
              {isQuickTest ? (
                <>
                  <Button
                    variant="outline"
                    onClick={() => navigate('/learn')}
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Continue Learning
                  </Button>
                  
                  <Button
                    onClick={() => navigate('/tests')}
                    className="bg-[var(--gradient-primary)] border-0"
                  >
                    Take Full Certification
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="outline"
                    onClick={() => navigate(`/quiz/${testType || ''}`)}
                  >
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Retake Quiz
                  </Button>
                  
                  <Button
                    onClick={() => navigate('/')}
                    className="bg-[var(--gradient-primary)] border-0"
                  >
                    <Home className="h-4 w-4 mr-2" />
                    Home
                  </Button>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Certificate */}
        <Certificate
          studentName="Programming Student"
          score={score}
          totalQuestions={totalQuestions}
          courseName={testName || "Programming Fundamentals Certification"}
          completionDate={new Date()}
          certificateId={generateCertificateId()}
        />

        {/* Detailed Results */}
        <Card className="w-full max-w-4xl mx-auto bg-[var(--gradient-card)] border-border/50 shadow-xl">
          <CardHeader>
            <CardTitle>Detailed Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Get questions based on test type */}
              {(() => {
                const getQuestions = () => {
                  if (testType && testType !== 'general') {
                    if (testType.startsWith('learn-')) {
                      const language = testType.replace('learn-', '');
                      const category = testCategories.find(cat => cat.id === language);
                      return category ? category.questions.slice(0, totalQuestions) : programmingQuiz.slice(0, totalQuestions);
                    } else {
                      const category = testCategories.find(cat => cat.id === testType);
                      return category ? category.questions : programmingQuiz;
                    }
                  }
                  return programmingQuiz;
                };
                
                return getQuestions().map((question, index) => {
                  const userAnswer = answers[question.id];
                  const correctOption = question.options.find(opt => opt.isCorrect);
                  const userOption = question.options.find(opt => opt.id === userAnswer);
                  const isCorrect = userAnswer === correctOption?.id;

                  return (
                    <div
                      key={question.id}
                      className={`p-4 rounded-lg border-2 ${
                        isCorrect 
                          ? 'border-quiz-correct/30 bg-quiz-correct/10' 
                          : 'border-quiz-incorrect/30 bg-quiz-incorrect/10'
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div className={`
                          w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold
                          ${isCorrect ? 'bg-quiz-correct text-white' : 'bg-quiz-incorrect text-white'}
                        `}>
                          {index + 1}
                        </div>
                        
                        <div className="flex-1">
                          <h4 className="font-semibold text-foreground mb-2">
                            {question.question}
                          </h4>
                          
                          <div className="space-y-1 text-sm">
                            <div>
                              <span className="text-muted-foreground">Your answer: </span>
                              <span className={isCorrect ? 'text-quiz-correct' : 'text-quiz-incorrect'}>
                                {userOption ? `${userAnswer.toUpperCase()}. ${userOption.text}` : 'No answer'}
                              </span>
                            </div>
                            
                            {!isCorrect && (
                              <div>
                                <span className="text-muted-foreground">Correct answer: </span>
                                <span className="text-quiz-correct">
                                  {correctOption?.id.toUpperCase()}. {correctOption?.text}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                });
              })()}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Results;
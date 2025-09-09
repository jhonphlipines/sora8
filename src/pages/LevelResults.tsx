import { useLocation, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Certificate } from "@/components/Certificate";
import { 
  Trophy, 
  RotateCcw, 
  ArrowRight, 
  Home, 
  Clock, 
  Target,
  Award,
  BookOpen
} from "lucide-react";
import { Level } from "@/data/levelSystem";
import { levelCategories, getNextLevel } from "@/data/levelSystem";
import { AIAssistant } from "@/components/AIAssistant";

interface LevelResultsState {
  score: number;
  totalQuestions: number;
  answers: Record<string, string>;
  timeSpent: number;
  level: Level;
  passed: boolean;
  badge?: { name: string; icon: string; color: string };
  attempts: number;
}

const LevelResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as LevelResultsState;

  if (!state) {
    navigate('/levels');
    return null;
  }

  const { score, totalQuestions, level, passed, badge, attempts, timeSpent } = state;
  
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-emerald-500";
    if (score >= 80) return "text-blue-500";
    if (score >= 70) return "text-yellow-500";
    return "text-red-500";
  };

  const getScoreMessage = (score: number, passed: boolean) => {
    if (!passed) return "Keep practicing! You'll get it next time.";
    if (score >= 95) return "Outstanding performance! You're a true master!";
    if (score >= 90) return "Excellent work! You've mastered this level!";
    if (score >= 80) return "Great job! You're doing really well!";
    return "Good work! You passed this level!";
  };

  // Find current category and next level
  const currentCategory = levelCategories.find(cat => 
    cat.levels.some(l => l.id === level.id)
  );
  
  const userProgress = JSON.parse(localStorage.getItem('userLevelProgress') || '{"completedLevels": []}');
  const nextLevel = currentCategory ? getNextLevel(currentCategory.id, userProgress.completedLevels) : null;

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Main Results Card */}
        <Card className="bg-[var(--gradient-card)] border-border/50 mb-8">
          <CardHeader className="text-center pb-6">
            <div className="flex items-center justify-center mb-4">
              {passed ? (
                <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center">
                  <Trophy className="h-10 w-10 text-emerald-500" />
                </div>
              ) : (
                <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center">
                  <Target className="h-10 w-10 text-red-500" />
                </div>
              )}
            </div>
            
            <CardTitle className="text-3xl font-bold text-foreground mb-2">
              {passed ? "Level Completed!" : "Level Not Passed"}
            </CardTitle>
            
            <CardDescription className="text-lg">
              Level {level.level}: {level.name}
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Score Display */}
            <div className="text-center">
              <div className={`text-6xl font-bold ${getScoreColor(score)} mb-2`}>
                {score}%
              </div>
              <p className="text-lg text-muted-foreground mb-4">
                {getScoreMessage(score, passed)}
              </p>
              <Progress value={score} className="h-4 mb-2" />
              <p className="text-sm text-muted-foreground">
                {Math.round((score / 100) * totalQuestions)}/{totalQuestions} correct answers
              </p>
            </div>

            {/* Badge Section */}
            {passed && badge && (
              <div className="text-center p-6 bg-primary/10 rounded-lg border border-primary/20">
                <div className={`w-16 h-16 mx-auto bg-gradient-to-r ${badge.color} rounded-full flex items-center justify-center text-3xl mb-4`}>
                  {badge.icon}
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  Badge Earned!
                </h3>
                <Badge className="bg-primary text-primary-foreground">
                  <Award className="h-3 w-3 mr-1" />
                  {badge.name}
                </Badge>
              </div>
            )}

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-card/50 rounded-lg">
                <Clock className="h-6 w-6 mx-auto mb-2 text-blue-500" />
                <div className="font-bold text-foreground">{formatTime(timeSpent)}</div>
                <div className="text-xs text-muted-foreground">Time Used</div>
              </div>
              
              <div className="text-center p-4 bg-card/50 rounded-lg">
                <BookOpen className="h-6 w-6 mx-auto mb-2 text-green-500" />
                <div className="font-bold text-foreground">{totalQuestions}</div>
                <div className="text-xs text-muted-foreground">Questions</div>
              </div>
              
              <div className="text-center p-4 bg-card/50 rounded-lg">
                <Target className="h-6 w-6 mx-auto mb-2 text-purple-500" />
                <div className="font-bold text-foreground">{level.requiredScore}%</div>
                <div className="text-xs text-muted-foreground">Required</div>
              </div>
              
              <div className="text-center p-4 bg-card/50 rounded-lg">
                <RotateCcw className="h-6 w-6 mx-auto mb-2 text-orange-500" />
                <div className="font-bold text-foreground">{attempts}</div>
                <div className="text-xs text-muted-foreground">Attempts</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Button
            variant="outline"
            onClick={() => navigate(`/level-quiz/${level.id}`)}
            className="h-12"
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Retake Level
          </Button>

          {nextLevel ? (
            <Button
              onClick={() => navigate(`/level-quiz/${nextLevel.id}`)}
              className="bg-[var(--gradient-primary)] border-0 h-12"
              disabled={!passed}
            >
              <ArrowRight className="h-4 w-4 mr-2" />
              Next Level {nextLevel.level}
            </Button>
          ) : (
            <Button
              onClick={() => navigate('/levels')}
              className="bg-[var(--gradient-primary)] border-0 h-12"
            >
              <Trophy className="h-4 w-4 mr-2" />
              View All Levels
            </Button>
          )}

          <Button
            variant="outline"
            onClick={() => navigate('/levels')}
            className="h-12"
          >
            <Home className="h-4 w-4 mr-2" />
            Back to Levels
          </Button>
        </div>

        {/* Certificate Section */}
        {passed && (
          <Card className="bg-[var(--gradient-card)] border-border/50">
            <CardHeader>
              <CardTitle className="text-center text-xl font-bold text-foreground">
                Your Level Certificate
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Certificate
                studentName="Achievement Earner"
                courseName={`Level ${level.level}: ${level.name}`}
                score={Math.round((score / 100) * totalQuestions)}
                totalQuestions={totalQuestions}
                completionDate={new Date()}
                certificateId={`LVL-${level.id}-${Date.now()}`}
              />
            </CardContent>
          </Card>
        )}

        {/* Next Steps */}
        {!passed && (
          <Card className="bg-[var(--gradient-card)] border-border/50">
            <CardContent className="py-6">
              <h3 className="text-lg font-bold text-foreground mb-4 text-center">
                Tips for Improvement
              </h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <h4 className="font-semibold text-foreground">Study Focus:</h4>
                  <p className="text-muted-foreground">{level.description}</p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-foreground">Target Score:</h4>
                  <p className="text-muted-foreground">
                    You need {level.requiredScore}% to pass. You scored {score}% 
                    ({level.requiredScore - score > 0 ? `${level.requiredScore - score}% more needed` : 'passed!'})
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <AIAssistant context={`Level ${level.level} Results`} />
    </div>
  );
};

export default LevelResults;
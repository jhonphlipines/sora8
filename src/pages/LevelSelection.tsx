import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Lock, Trophy, Clock, BookOpen, Star } from "lucide-react";
import { levelCategories, isLevelUnlocked, getCategoryProgress, Level, UserProgress, levelCategoryLogos } from "@/data/levelSystem";
import { AIAssistant } from "@/components/AIAssistant";
const LevelSelection = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [userProgress, setUserProgress] = useState<UserProgress>({
    completedLevels: [],
    badges: [],
    scores: {},
    attempts: {}
  });

  // Load user progress from localStorage
  useEffect(() => {
    const savedProgress = localStorage.getItem('userLevelProgress');
    if (savedProgress) {
      setUserProgress(JSON.parse(savedProgress));
    }
  }, []);
  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };
  const handleLevelStart = (levelId: string) => {
    navigate(`/level-quiz/${levelId}`);
  };
  const selectedCategoryData = selectedCategory ? levelCategories.find(cat => cat.id === selectedCategory) : null;
  const LevelCard = ({
    level,
    isUnlocked,
    isCompleted
  }: {
    level: Level;
    isUnlocked: boolean;
    isCompleted: boolean;
  }) => {
    const score = userProgress.scores[level.id];
    const attempts = userProgress.attempts[level.id] || 0;
    return <Card className={`relative overflow-hidden transition-all duration-300 ${isUnlocked ? 'hover:shadow-xl cursor-pointer bg-[var(--gradient-card)] border-border/50' : 'opacity-60 bg-muted border-muted-foreground/20'} ${isCompleted ? 'ring-2 ring-primary/50' : ''}`} onClick={() => isUnlocked && handleLevelStart(level.id)}>
        {/* Level number badge */}
        <div className={`absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${isCompleted ? 'bg-primary text-primary-foreground' : 'bg-muted-foreground/20 text-muted-foreground'}`}>
          {level.level}
        </div>

        {/* Lock overlay */}
        {!isUnlocked && <div className="absolute inset-0 bg-background/80 flex items-center justify-center z-10">
            <Lock className="h-8 w-8 text-muted-foreground" />
          </div>}

        <CardHeader className="pb-4">
          <div className="flex items-center gap-3 mb-2">
            <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${level.badge.color} flex items-center justify-center text-2xl`}>
              {level.badge.icon}
            </div>
            <div className="flex-1">
              <CardTitle className="text-lg font-bold text-foreground">
                {level.name}
              </CardTitle>
              {isCompleted && <div className="flex items-center gap-1 mt-1">
                  <Trophy className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium text-primary">
                    {score}% - {level.badge.name}
                  </span>
                </div>}
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <CardDescription className="text-muted-foreground">
            {level.description}
          </CardDescription>

          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <BookOpen className="h-4 w-4" />
              <span>{level.questions.length} Questions</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{Math.floor(level.timeLimit / 60)} min</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <Badge variant="outline" className="text-xs">
              Pass: {level.requiredScore}%+
            </Badge>
            {attempts > 0 && <Badge variant="secondary" className="text-xs">
                {attempts} attempt{attempts > 1 ? 's' : ''}
              </Badge>}
          </div>

          {isUnlocked && <Button className={`w-full ${isCompleted ? 'bg-primary/20 text-primary hover:bg-primary/30' : 'bg-[var(--gradient-primary)] border-0'}`} onClick={e => {
          e.stopPropagation();
          handleLevelStart(level.id);
        }}>
              {isCompleted ? 'Retake Level' : 'Start Level'}
            </Button>}
        </CardContent>
      </Card>;
  };
  if (selectedCategory && selectedCategoryData) {
    const progress = getCategoryProgress(selectedCategory, userProgress.completedLevels);
    return <div className="min-h-screen bg-background py-8 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Button variant="ghost" onClick={() => setSelectedCategory(null)} className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Categories
            </Button>

            <div className="text-center">
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-full bg-transparent flex items-center justify-center p-3">
                  <div className="w-full h-full" dangerouslySetInnerHTML={{ __html: levelCategoryLogos[selectedCategoryData.icon] || selectedCategoryData.icon }} />
                </div>
                <div className="text-left">
                  <h1 className="text-3xl md:text-4xl font-bold bg-[var(--gradient-primary)] bg-clip-text text-transparent">
                    {selectedCategoryData.name}
                  </h1>
                  <p className="text-xl text-muted-foreground">
                    {selectedCategoryData.description}
                  </p>
                </div>
              </div>

              {/* Progress Overview */}
              <Card className="max-w-md mx-auto bg-[var(--gradient-card)] border-border/50">
                <CardContent className="py-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-medium text-muted-foreground">Progress</span>
                    <span className="text-sm font-bold text-foreground">
                      {progress.completed}/{progress.total} Levels
                    </span>
                  </div>
                  <Progress value={progress.percentage} className="mb-2" />
                  <div className="flex items-center justify-center gap-2">
                    <Star className="h-4 w-4 text-primary" />
                    <span className="text-sm text-muted-foreground">
                      {progress.percentage}% Complete
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Levels Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {selectedCategoryData.levels.map(level => {
            const isUnlocked = isLevelUnlocked(level, userProgress.completedLevels);
            const isCompleted = userProgress.completedLevels.includes(level.id);
            return <LevelCard key={level.id} level={level} isUnlocked={isUnlocked} isCompleted={isCompleted} />;
          })}
          </div>
        </div>

        <AIAssistant context={`${selectedCategoryData.name} Levels`} />
      </div>;
  }
  return <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Button variant="ghost" onClick={() => navigate('/tests')} className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Tests
          </Button>

          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold bg-[var(--gradient-primary)] bg-clip-text text-transparent mb-4">
              Level-Based Learning Paths
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Master programming skills through progressive levels. Complete each level to unlock the next 
              and earn badges along your journey to expertise.
            </p>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {levelCategories.map(category => {
          const progress = getCategoryProgress(category.id, userProgress.completedLevels);
          const totalBadges = category.levels.length;
          const earnedBadges = category.levels.filter(level => userProgress.completedLevels.includes(level.id)).length;
          return <Card key={category.id} className="bg-[var(--gradient-card)] border-border/50 hover:shadow-xl transition-all duration-300 group cursor-pointer" onClick={() => handleCategorySelect(category.id)}>
                <CardHeader className="text-center pb-4">
                  <div className="w-20 h-20 mx-auto bg-transparent rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 p-4">
                    <div className="w-full h-full" dangerouslySetInnerHTML={{ __html: levelCategoryLogos[category.icon] || category.icon }} />
                  </div>
                  <CardTitle className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                    {category.name}
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-6">
                  <CardDescription className="text-center text-muted-foreground">
                    {category.description}
                  </CardDescription>

                  {/* Progress Section */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium text-muted-foreground">Progress</span>
                      <span className="font-bold text-foreground">
                        {progress.completed}/{progress.total} Levels
                      </span>
                    </div>
                    <Progress value={progress.percentage} className="h-2" />
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-primary">{category.levels.length}</div>
                      <div className="text-xs text-muted-foreground">Total Levels</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-primary">{earnedBadges}</div>
                      <div className="text-xs text-muted-foreground">Badges Earned</div>
                    </div>
                  </div>

                  <Button onClick={e => {
                e.stopPropagation();
                handleCategorySelect(category.id);
              }} className="w-full bg-[var(--gradient-primary)] border-0 mt-4 text-indigo-700">
                    Start Learning Path
                  </Button>
                </CardContent>
              </Card>;
        })}
        </div>

        {/* How It Works */}
        <div className="mt-16">
          <Card className="max-w-4xl mx-auto bg-[var(--gradient-card)] border-border/50">
            <CardContent className="py-8">
              <h3 className="text-2xl font-bold text-foreground mb-6 text-center">
                How Level-Based Learning Works
              </h3>
              <div className="grid md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto bg-primary/20 rounded-full flex items-center justify-center mb-3">
                    <span className="text-xl font-bold text-primary">1</span>
                  </div>
                  <h4 className="font-semibold text-foreground mb-2">Start Level 1</h4>
                  <p className="text-sm text-muted-foreground">Begin with foundational concepts</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto bg-primary/20 rounded-full flex items-center justify-center mb-3">
                    <span className="text-xl font-bold text-primary">2</span>
                  </div>
                  <h4 className="font-semibold text-foreground mb-2">Pass to Unlock</h4>
                  <p className="text-sm text-muted-foreground">Score 70%+ to advance</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto bg-primary/20 rounded-full flex items-center justify-center mb-3">
                    <span className="text-xl font-bold text-primary">3</span>
                  </div>
                  <h4 className="font-semibold text-foreground mb-2">Earn Badges</h4>
                  <p className="text-sm text-muted-foreground">Get certificates for each level</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto bg-primary/20 rounded-full flex items-center justify-center mb-3">
                    <span className="text-xl font-bold text-primary">4</span>
                  </div>
                  <h4 className="font-semibold text-foreground mb-2">Master Skills</h4>
                  <p className="text-sm text-muted-foreground">Complete all 10+ levels</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <AIAssistant context="Level-Based Learning Paths" />
    </div>;
};
export default LevelSelection;
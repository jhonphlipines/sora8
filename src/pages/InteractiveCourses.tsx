import { useState } from "react";
import { BookOpen, Beaker, Globe, Calculator, GraduationCap, ChevronRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const subjects = [
  {
    id: "science",
    name: "Science",
    icon: Beaker,
    color: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
    description: "Explore Physics, Chemistry, and Biology"
  },
  {
    id: "social",
    name: "Social Studies",
    icon: Globe,
    color: "bg-green-500/10 text-green-600 dark:text-green-400",
    description: "Learn History, Geography, and Civics"
  },
  {
    id: "mathematics",
    name: "Mathematics",
    icon: Calculator,
    color: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
    description: "Master Arithmetic, Algebra, and Geometry"
  }
];

const classes = [
  { level: 1, stage: "Primary" },
  { level: 2, stage: "Primary" },
  { level: 3, stage: "Primary" },
  { level: 4, stage: "Primary" },
  { level: 5, stage: "Primary" },
  { level: 6, stage: "Middle School" },
  { level: 7, stage: "Middle School" },
  { level: 8, stage: "Middle School" },
  { level: 9, stage: "High School" },
  { level: 10, stage: "High School" },
  { level: 11, stage: "Senior Secondary" },
  { level: 12, stage: "Senior Secondary" }
];

const InteractiveCourses = () => {
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [selectedClass, setSelectedClass] = useState<number | null>(null);

  const handleSubjectSelect = (subjectId: string) => {
    setSelectedSubject(subjectId);
    setSelectedClass(null);
  };

  const handleClassSelect = (classLevel: number) => {
    setSelectedClass(classLevel);
  };

  const handleStartCourse = () => {
    if (selectedSubject && selectedClass) {
      // Navigate to course content
      console.log(`Starting ${selectedSubject} for Class ${selectedClass}`);
      // You can add navigation logic here
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold text-foreground">Interactive Courses</h1>
        <p className="text-muted-foreground text-lg">
          Choose your subject and grade level to begin learning
        </p>
      </div>

      {!selectedSubject ? (
        // Subject Selection View
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {subjects.map((subject) => {
              const Icon = subject.icon;
              return (
                <Card
                  key={subject.id}
                  className="cursor-pointer transition-all hover:shadow-lg hover:scale-105"
                  onClick={() => handleSubjectSelect(subject.id)}
                >
                  <CardHeader>
                    <div className={`w-16 h-16 rounded-lg ${subject.color} flex items-center justify-center mb-4`}>
                      <Icon className="h-8 w-8" />
                    </div>
                    <CardTitle className="text-2xl">{subject.name}</CardTitle>
                    <CardDescription className="text-base">
                      {subject.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full group">
                      Explore Courses
                      <ChevronRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <Card className="bg-muted/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="h-6 w-6" />
                Why Interactive Learning?
              </CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <h3 className="font-semibold">Engaging Content</h3>
                <p className="text-sm text-muted-foreground">
                  Interactive lessons with videos, animations, and quizzes
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">Grade-Aligned</h3>
                <p className="text-sm text-muted-foreground">
                  Content tailored to each class level (1-12)
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">Track Progress</h3>
                <p className="text-sm text-muted-foreground">
                  Monitor your learning journey and achievements
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        // Class Selection View
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {(() => {
                const subject = subjects.find(s => s.id === selectedSubject);
                const Icon = subject?.icon || BookOpen;
                return (
                  <>
                    <div className={`w-12 h-12 rounded-lg ${subject?.color} flex items-center justify-center`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold">{subject?.name}</h2>
                      <p className="text-muted-foreground">{subject?.description}</p>
                    </div>
                  </>
                );
              })()}
            </div>
            <Button variant="outline" onClick={() => setSelectedSubject(null)}>
              Change Subject
            </Button>
          </div>

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="all">All Classes</TabsTrigger>
              <TabsTrigger value="primary">Primary</TabsTrigger>
              <TabsTrigger value="middle">Middle School</TabsTrigger>
              <TabsTrigger value="high">High School</TabsTrigger>
              <TabsTrigger value="senior">Senior Secondary</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {classes.map((classItem) => (
                  <Card
                    key={classItem.level}
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      selectedClass === classItem.level
                        ? "ring-2 ring-primary shadow-lg"
                        : ""
                    }`}
                    onClick={() => handleClassSelect(classItem.level)}
                  >
                    <CardContent className="p-6 text-center">
                      <div className="text-3xl font-bold text-primary mb-2">
                        {classItem.level}
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {classItem.stage}
                      </Badge>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="primary" className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {classes.filter(c => c.stage === "Primary").map((classItem) => (
                  <Card
                    key={classItem.level}
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      selectedClass === classItem.level ? "ring-2 ring-primary shadow-lg" : ""
                    }`}
                    onClick={() => handleClassSelect(classItem.level)}
                  >
                    <CardContent className="p-6 text-center">
                      <div className="text-3xl font-bold text-primary mb-2">
                        {classItem.level}
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {classItem.stage}
                      </Badge>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="middle" className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {classes.filter(c => c.stage === "Middle School").map((classItem) => (
                  <Card
                    key={classItem.level}
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      selectedClass === classItem.level ? "ring-2 ring-primary shadow-lg" : ""
                    }`}
                    onClick={() => handleClassSelect(classItem.level)}
                  >
                    <CardContent className="p-6 text-center">
                      <div className="text-3xl font-bold text-primary mb-2">
                        {classItem.level}
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {classItem.stage}
                      </Badge>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="high" className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
                {classes.filter(c => c.stage === "High School").map((classItem) => (
                  <Card
                    key={classItem.level}
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      selectedClass === classItem.level ? "ring-2 ring-primary shadow-lg" : ""
                    }`}
                    onClick={() => handleClassSelect(classItem.level)}
                  >
                    <CardContent className="p-6 text-center">
                      <div className="text-3xl font-bold text-primary mb-2">
                        {classItem.level}
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {classItem.stage}
                      </Badge>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="senior" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {classes.filter(c => c.stage === "Senior Secondary").map((classItem) => (
                  <Card
                    key={classItem.level}
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      selectedClass === classItem.level ? "ring-2 ring-primary shadow-lg" : ""
                    }`}
                    onClick={() => handleClassSelect(classItem.level)}
                  >
                    <CardContent className="p-6 text-center">
                      <div className="text-3xl font-bold text-primary mb-2">
                        {classItem.level}
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {classItem.stage}
                      </Badge>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          {selectedClass && (
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold mb-1">
                    Ready to start Class {selectedClass} {subjects.find(s => s.id === selectedSubject)?.name}?
                  </h3>
                  <p className="text-muted-foreground">
                    Begin your interactive learning journey
                  </p>
                </div>
                <Button size="lg" onClick={handleStartCourse}>
                  Start Course
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
};

export default InteractiveCourses;

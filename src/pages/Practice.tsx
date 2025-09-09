import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Code, Play, Clock, Star, ArrowLeft, Zap } from "lucide-react";
import CodeEditor from "@/components/CodeEditor";
import FreeCodeEditor from "@/components/FreeCodeEditor";

const practiceExercises = [
  {
    id: 1,
    title: "Array Manipulation - JavaScript",
    description: "Practice working with arrays, loops, and data transformation",
    difficulty: "Beginner",
    duration: "15 min",
    language: "javascript",
    completed: false,
    startingCode: `// Write a function that finds the maximum number in an array
function findMax(numbers) {
  // Your code here
  
}

// Test your function
console.log(findMax([1, 5, 3, 9, 2])); // Should return 9`,
    solution: `function findMax(numbers) {
  if (numbers.length === 0) return null;
  
  let max = numbers[0];
  for (let i = 1; i < numbers.length; i++) {
    if (numbers[i] > max) {
      max = numbers[i];
    }
  }
  return max;
}`,
    testCases: [
      { input: "[1, 5, 3, 9, 2]", expected: "9" },
      { input: "[-1, -5, -3]", expected: "-1" },
      { input: "[42]", expected: "42" }
    ]
  },
  {
    id: 2,
    title: "List Comprehension - Python",
    description: "Master Python list comprehensions and data filtering",
    difficulty: "Beginner",
    duration: "20 min",
    language: "python",
    completed: false,
    startingCode: `# Write a function that returns squares of even numbers
def squares_of_evens(numbers):
    # Your code here using list comprehension
    pass

# Test your function
print(squares_of_evens([1, 2, 3, 4, 5, 6]))  # Should return [4, 16, 36]`,
    solution: `def squares_of_evens(numbers):
    return [x**2 for x in numbers if x % 2 == 0]

# Alternative solution:
def squares_of_evens_alt(numbers):
    result = []
    for num in numbers:
        if num % 2 == 0:
            result.append(num ** 2)
    return result`,
    testCases: [
      { input: "[1, 2, 3, 4, 5, 6]", expected: "[4, 16, 36]" },
      { input: "[1, 3, 5]", expected: "[]" },
      { input: "[2, 4, 8]", expected: "[4, 16, 64]" }
    ]
  },
  {
    id: 3,
    title: "Class Implementation - Java",
    description: "Create a Java class with encapsulation and methods",
    difficulty: "Intermediate",
    duration: "30 min",
    language: "java",
    completed: false,
    startingCode: `// Create a BankAccount class with deposit, withdraw, and getBalance methods
public class BankAccount {
    // Your code here
    
}

// Test the class
public class Main {
    public static void main(String[] args) {
        BankAccount account = new BankAccount(100.0);
        account.deposit(50.0);
        System.out.println(account.getBalance()); // Should print 150.0
    }
}`,
    solution: `public class BankAccount {
    private double balance;
    
    public BankAccount(double initialBalance) {
        this.balance = Math.max(0, initialBalance);
    }
    
    public void deposit(double amount) {
        if (amount > 0) {
            this.balance += amount;
        }
    }
    
    public boolean withdraw(double amount) {
        if (amount > 0 && amount <= this.balance) {
            this.balance -= amount;
            return true;
        }
        return false;
    }
    
    public double getBalance() {
        return this.balance;
    }
}`,
    testCases: [
      { input: "BankAccount(100), deposit(50)", expected: "Balance: 150.0" },
      { input: "withdraw(200) from 100", expected: "false" },
      { input: "withdraw(50) from 100", expected: "true, Balance: 50.0" }
    ]
  },
  {
    id: 4,
    title: "Pointers and Memory - C++",
    description: "Practice pointer manipulation and dynamic memory allocation",
    difficulty: "Advanced",
    duration: "45 min",
    language: "cpp",
    completed: false,
    startingCode: `#include <iostream>
using namespace std;

// Create a function that reverses an array using pointers
void reverseArray(int* arr, int size) {
    // Your code here
}

int main() {
    int numbers[] = {1, 2, 3, 4, 5};
    int size = 5;
    
    reverseArray(numbers, size);
    
    for(int i = 0; i < size; i++) {
        cout << numbers[i] << " ";
    }
    
    return 0;
}`,
    solution: `#include <iostream>
using namespace std;

void reverseArray(int* arr, int size) {
    int* start = arr;
    int* end = arr + size - 1;
    
    while (start < end) {
        // Swap elements
        int temp = *start;
        *start = *end;
        *end = temp;
        
        start++;
        end--;
    }
}

int main() {
    int numbers[] = {1, 2, 3, 4, 5};
    int size = 5;
    
    reverseArray(numbers, size);
    
    for(int i = 0; i < size; i++) {
        cout << numbers[i] << " ";
    }
    
    return 0;
}`,
    testCases: [
      { input: "[1, 2, 3, 4, 5]", expected: "[5, 4, 3, 2, 1]" },
      { input: "[1, 2]", expected: "[2, 1]" },
      { input: "[42]", expected: "[42]" }
    ]
  },
  {
    id: 5,
    title: "File Operations - C",
    description: "Practice file reading and writing in C",
    difficulty: "Intermediate",
    duration: "35 min",
    language: "c",
    completed: false,
    startingCode: `#include <stdio.h>
#include <stdlib.h>

// Write a function that counts lines in a file
int countLines(const char* filename) {
    // Your code here
    return 0;
}

int main() {
    int lines = countLines("example.txt");
    printf("Number of lines: %d\\n", lines);
    return 0;
}`,
    solution: `#include <stdio.h>
#include <stdlib.h>

int countLines(const char* filename) {
    FILE* file = fopen(filename, "r");
    if (file == NULL) {
        return -1; // Error opening file
    }
    
    int count = 0;
    char ch;
    
    while ((ch = fgetc(file)) != EOF) {
        if (ch == '\\n') {
            count++;
        }
    }
    
    fclose(file);
    return count;
}

int main() {
    int lines = countLines("example.txt");
    if (lines >= 0) {
        printf("Number of lines: %d\\n", lines);
    } else {
        printf("Error reading file\\n");
    }
    return 0;
}`,
    testCases: [
      { input: "example.txt with 5 lines", expected: "5" },
      { input: "empty file", expected: "0" },
      { input: "non-existent file", expected: "-1" }
    ]
  },
  {
    id: 6,
    title: "LINQ Queries - C#",
    description: "Practice LINQ for data querying and manipulation",
    difficulty: "Intermediate",
    duration: "30 min",
    language: "csharp",
    completed: false,
    startingCode: `using System;
using System.Collections.Generic;
using System.Linq;

class Program 
{
    // Create a method that finds students with GPA > 3.5
    static List<string> GetHonorsStudents(List<Student> students) 
    {
        // Your LINQ query here
        return new List<string>();
    }
    
    static void Main() 
    {
        var students = new List<Student>
        {
            new Student { Name = "Alice", GPA = 3.8 },
            new Student { Name = "Bob", GPA = 3.2 },
            new Student { Name = "Charlie", GPA = 3.9 }
        };
        
        var honors = GetHonorsStudents(students);
        Console.WriteLine(string.Join(", ", honors));
    }
}

class Student 
{
    public string Name { get; set; }
    public double GPA { get; set; }
}`,
    solution: `using System;
using System.Collections.Generic;
using System.Linq;

class Program 
{
    static List<string> GetHonorsStudents(List<Student> students) 
    {
        return students
            .Where(s => s.GPA > 3.5)
            .OrderByDescending(s => s.GPA)
            .Select(s => s.Name)
            .ToList();
    }
    
    static void Main() 
    {
        var students = new List<Student>
        {
            new Student { Name = "Alice", GPA = 3.8 },
            new Student { Name = "Bob", GPA = 3.2 },
            new Student { Name = "Charlie", GPA = 3.9 }
        };
        
        var honors = GetHonorsStudents(students);
        Console.WriteLine(string.Join(", ", honors));
    }
}

class Student 
{
    public string Name { get; set; }
    public double GPA { get; set; }
}`,
    testCases: [
      { input: "Students with GPA 3.8, 3.2, 3.9", expected: "Charlie, Alice" },
      { input: "All students GPA < 3.5", expected: "Empty list" },
      { input: "All students GPA > 3.5", expected: "All students ordered by GPA" }
    ]
  },
  {
    id: 7,
    title: "Responsive Layout - HTML/CSS",
    description: "Create a responsive card layout with flexbox",
    difficulty: "Beginner",
    duration: "25 min",
    language: "html",
    completed: false,
    startingCode: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Responsive Cards</title>
    <style>
        /* Your CSS here */
    </style>
</head>
<body>
    <!-- Create responsive card layout here -->
</body>
</html>`,
    solution: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Responsive Cards</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        .container {
            display: flex;
            flex-wrap: wrap;
            gap: 20px;
            padding: 20px;
            justify-content: center;
        }
        
        .card {
            background: white;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            padding: 20px;
            min-width: 250px;
            flex: 1 1 300px;
            max-width: 400px;
        }
        
        .card h2 {
            color: #333;
            margin-bottom: 10px;
        }
        
        .card p {
            color: #666;
            line-height: 1.5;
        }
        
        @media (max-width: 768px) {
            .card {
                flex: 1 1 100%;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="card">
            <h2>Card 1</h2>
            <p>This is a responsive card that adapts to different screen sizes.</p>
        </div>
        <div class="card">
            <h2>Card 2</h2>
            <p>Flexbox makes creating responsive layouts much easier.</p>
        </div>
        <div class="card">
            <h2>Card 3</h2>
            <p>These cards will stack on mobile devices.</p>
        </div>
    </div>
</body>
</html>`,
    testCases: [
      { input: "Desktop view", expected: "Cards in row layout" },
      { input: "Mobile view", expected: "Cards stacked vertically" },
      { input: "Tablet view", expected: "Cards adapt to available space" }
    ]
  },
  {
    id: 8,
    title: "Advanced Queries - SQL",
    description: "Write complex JOIN queries with subqueries",
    difficulty: "Advanced",
    duration: "40 min",
    language: "sql",
    completed: false,
    startingCode: `-- Find customers who have ordered more than the average order amount
-- Tables: customers (id, name, email), orders (id, customer_id, total, order_date)

SELECT 
    -- Your query here

FROM 
    -- Your tables and joins here

WHERE 
    -- Your conditions here`,
    solution: `-- Solution using subquery to find average order amount
SELECT DISTINCT
    c.id,
    c.name,
    c.email,
    COUNT(o.id) as total_orders,
    AVG(o.total) as avg_order_amount
FROM 
    customers c
    INNER JOIN orders o ON c.id = o.customer_id
WHERE 
    o.total > (
        SELECT AVG(total) 
        FROM orders
    )
GROUP BY 
    c.id, c.name, c.email
HAVING 
    COUNT(o.id) > 0
ORDER BY 
    avg_order_amount DESC;

-- Alternative solution with CTE
WITH avg_order AS (
    SELECT AVG(total) as avg_total
    FROM orders
)
SELECT 
    c.id,
    c.name,
    c.email,
    o.total
FROM 
    customers c
    INNER JOIN orders o ON c.id = o.customer_id
    CROSS JOIN avg_order a
WHERE 
    o.total > a.avg_total
ORDER BY 
    o.total DESC;`,
    testCases: [
      { input: "Orders with average $100", expected: "Customers with orders > $100" },
      { input: "No orders above average", expected: "Empty result set" },
      { input: "Multiple high-value customers", expected: "All qualifying customers" }
    ]
  },
  {
    id: 9,
    title: "OOP Classes - PHP",
    description: "Create PHP classes with inheritance and interfaces",
    difficulty: "Intermediate",
    duration: "35 min",
    language: "php",
    completed: false,
    startingCode: `<?php

// Create a Vehicle interface and Car class that implements it
interface Vehicle {
    // Define interface methods here
}

class Car implements Vehicle {
    // Your class implementation here
}

// Test your implementation
$car = new Car("Toyota", "Camry", 2022);
echo $car->getInfo();

?>`,
    solution: `<?php

interface Vehicle {
    public function start();
    public function stop();
    public function getInfo();
}

abstract class BaseVehicle implements Vehicle {
    protected $make;
    protected $model;
    protected $year;
    protected $isRunning = false;
    
    public function __construct($make, $model, $year) {
        $this->make = $make;
        $this->model = $model;
        $this->year = $year;
    }
    
    public function start() {
        $this->isRunning = true;
        return "Vehicle started";
    }
    
    public function stop() {
        $this->isRunning = false;
        return "Vehicle stopped";
    }
    
    public function getInfo() {
        $status = $this->isRunning ? "running" : "stopped";
        return "{$this->year} {$this->make} {$this->model} - Status: {$status}";
    }
}

class Car extends BaseVehicle {
    private $doors;
    
    public function __construct($make, $model, $year, $doors = 4) {
        parent::__construct($make, $model, $year);
        $this->doors = $doors;
    }
    
    public function getInfo() {
        return parent::getInfo() . " - Doors: {$this->doors}";
    }
}

// Test the implementation
$car = new Car("Toyota", "Camry", 2022);
echo $car->getInfo() . "\\n";
echo $car->start() . "\\n";
echo $car->getInfo() . "\\n";

?>`,
    testCases: [
      { input: "Car creation", expected: "Car object with properties" },
      { input: "Start/stop methods", expected: "Status changes correctly" },
      { input: "Info display", expected: "Complete car information" }
    ]
  },
];

const Practice = () => {
  const [selectedExercise, setSelectedExercise] = useState<typeof practiceExercises[0] | null>(null);

  if (selectedExercise) {
    return (
      <div className="container mx-auto p-6">
        <div className="mb-6">
          <Button
            variant="outline"
            onClick={() => setSelectedExercise(null)}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Practice Lab
          </Button>
        </div>
        <CodeEditor exercise={selectedExercise} />
      </div>
    );
  }
  
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-100 text-green-800 border-green-200";
      case "Intermediate":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Advanced":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Practice Lab</h1>
        <p className="text-muted-foreground">
          Sharpen your coding skills with hands-on exercises and free practice
        </p>
      </div>

      <Tabs defaultValue="exercises" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="exercises" className="gap-2">
            <Code className="h-4 w-4" />
            Guided Exercises
          </TabsTrigger>
          <TabsTrigger value="freedom" className="gap-2">
            <Zap className="h-4 w-4" />
            Freedom Editor
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="exercises" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {practiceExercises.map((exercise) => (
              <Card key={exercise.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle className="text-lg">{exercise.title}</CardTitle>
                      <CardDescription>{exercise.description}</CardDescription>
                    </div>
                    {exercise.completed && (
                      <Star className="h-5 w-5 text-yellow-500 fill-current" />
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{exercise.duration}</span>
                    <Code className="h-4 w-4 ml-2" />
                    <span>{exercise.language}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Badge 
                      variant="outline" 
                      className={getDifficultyColor(exercise.difficulty)}
                    >
                      {exercise.difficulty}
                    </Badge>
                    
                    <Button 
                      variant={exercise.completed ? "outline" : "default"}
                      size="sm"
                      className="gap-2"
                      onClick={() => setSelectedExercise(exercise)}
                    >
                      <Play className="h-4 w-4" />
                      {exercise.completed ? "Review" : "Start"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-8 p-6 bg-muted/50 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Track Your Progress</h2>
            <p className="text-muted-foreground mb-4">
              Complete practice exercises to improve your skills and earn achievements
            </p>
            <div className="flex gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span>1 Completed</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span>3 In Progress</span>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="freedom">
          <FreeCodeEditor />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Practice;
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, BookOpen, Code, Database, Globe, Cpu, Smartphone, Search, Home } from "lucide-react";
import { AIAssistant } from "@/components/AIAssistant";

interface Slide {
  title: string;
  content: string;
  keyPoints?: string[];
  codeExample?: string;
  exercise?: string;
}

interface Language {
  id: string;
  name: string;
  level: string;
  icon: JSX.Element;
  color: string;
  description: string;
  slides: Slide[];
}

const Learn = () => {
  const navigate = useNavigate();
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [completedLanguages, setCompletedLanguages] = useState<Set<string>>(new Set());
  const [searchTerm, setSearchTerm] = useState("");

  const languages: Language[] = [
    // JavaScript courses
    {
      id: "javascript-intro",
      name: "JavaScript",
      level: "Introduction",
      icon: <Code className="h-8 w-8" />,
      color: "from-yellow-400 to-yellow-500",
      description: "Getting started with JavaScript",
      slides: [{
        title: "What is JavaScript?",
        content: "JavaScript is a high-level, interpreted programming language that runs in web browsers and servers. Originally designed to make web pages interactive, JavaScript has evolved into one of the most versatile programming languages in the world. It powers everything from simple website animations to complex web applications, mobile apps, desktop software, and even server-side applications through Node.js.",
        keyPoints: [
          "Interpreted language - no compilation needed",
          "Runs in browsers and on servers (Node.js)",
          "Dynamic typing - variables can change types",
          "Event-driven and functional programming support",
          "Huge ecosystem with millions of packages (npm)"
        ],
        codeExample: `// Your first JavaScript code
console.log("Hello, World!");

// Variables and basic operations
let message = "Welcome to JavaScript!";
let number = 42;
let isLearning = true;

console.log(message);
console.log("The answer is:", number);`,
        exercise: "Open your browser's developer console (F12) and try running some JavaScript code. Type console.log('Hello from the console!') and press Enter."
      }, {
        title: "Setting Up Development Environment",
        content: "A proper development environment is crucial for efficient JavaScript programming. Modern JavaScript development involves several tools and technologies that work together to create a smooth development experience. From simple text editors to full-featured IDEs, there are many options available.",
        keyPoints: [
          "Choose a code editor: VS Code, Sublime Text, or Atom",
          "Browser developer tools are essential for debugging",
          "Node.js enables JavaScript outside the browser",
          "Package managers like npm or yarn manage dependencies",
          "Version control with Git is industry standard"
        ],
        codeExample: `<!-- Simple HTML file to run JavaScript -->
<!DOCTYPE html>
<html>
<head>
    <title>My First JavaScript App</title>
</head>
<body>
    <h1>Hello JavaScript!</h1>
    <script>
        // JavaScript code goes here
        alert("Welcome to JavaScript programming!");
        
        // Or link to external file
        // <script src="script.js"></script>
    </script>
</body>
</html>`,
        exercise: "Install VS Code and create your first HTML file with embedded JavaScript. Try adding an alert message and opening the file in your browser."
      }, {
        title: "Your First JavaScript Program",
        content: "Writing your first JavaScript program is an exciting milestone! JavaScript programs can be as simple as a single line that displays text, or as complex as full web applications. Understanding the basic structure and syntax from the beginning will set you up for success in your programming journey.",
        keyPoints: [
          "console.log() displays output in developer console",
          "Statements typically end with semicolons (;)",
          "JavaScript is case-sensitive (myVariable ≠ MyVariable)",
          "Comments improve code readability and documentation",
          "Indentation makes code easier to read and maintain"
        ],
        codeExample: `// Single line comment
console.log("Hello, World!");

/* 
   Multi-line comment
   This is my first JavaScript program
*/

// Variables store data
let myName = "JavaScript Learner";
let age = 25;

// Display information
console.log("Name:", myName);
console.log("Age:", age);
console.log("Learning JavaScript is fun!");

// Mathematical operations
let result = 10 + 5;
console.log("10 + 5 =", result);`,
        exercise: "Create a program that displays your name, age, and a personal message using console.log(). Add comments explaining what each line does."
      }, {
        title: "Basic Syntax Rules",
        content: "JavaScript syntax is the set of rules that defines valid JavaScript programs. Understanding these fundamental rules is essential for writing clean, readable, and error-free code. JavaScript's syntax is relatively flexible, but following best practices will make your code professional and maintainable.",
        keyPoints: [
          "Use camelCase for variable and function names",
          "Use PascalCase for constructors and classes",
          "Strings can use single (') or double (\") quotes",
          "Numbers don't need quotes (integer or decimal)",
          "Use meaningful, descriptive variable names"
        ],
        codeExample: `// Good naming conventions
let userName = "alice_smith";        // camelCase for variables
let userAge = 28;                   // meaningful names
let isLoggedIn = true;              // boolean variables

// String examples
let firstName = 'John';             // single quotes
let lastName = "Doe";               // double quotes
let fullName = firstName + " " + lastName;

// Numbers
let temperature = 23.5;             // decimal
let count = 100;                    // integer
let negative = -42;                 // negative number

// Bad examples (avoid these)
let un = "user";                    // too short, unclear
let UserName = "alice";             // wrong case convention
let user name = "bob";              // spaces not allowed`,
        exercise: "Practice creating variables with proper naming conventions. Create variables for a person's information: firstName, lastName, age, email, and isStudent."
      }, {
        title: "Understanding Data Types",
        content: "JavaScript has several built-in data types that serve different purposes. Understanding these types is fundamental to programming effectively. JavaScript is dynamically typed, meaning variables can hold different types of values during program execution, and you don't need to declare the type explicitly.",
        keyPoints: [
          "Primitive types: number, string, boolean, undefined, null, symbol",
          "Non-primitive type: object (includes arrays, functions, dates)",
          "typeof operator helps identify variable types",
          "JavaScript automatically converts between types when needed",
          "Understanding types prevents common programming errors"
        ],
        codeExample: `// Primitive data types
let age = 25;                       // number
let name = "Alice";                 // string
let isStudent = true;               // boolean
let address;                        // undefined
let data = null;                    // null

// Check types with typeof
console.log(typeof age);            // "number"
console.log(typeof name);           // "string"
console.log(typeof isStudent);      // "boolean"
console.log(typeof address);        // "undefined"
console.log(typeof data);           // "object" (this is a JavaScript quirk!)

// Objects (non-primitive)
let person = {
    name: "Bob",
    age: 30,
    city: "New York"
};

let numbers = [1, 2, 3, 4, 5];      // array (type of object)

console.log(typeof person);         // "object"
console.log(typeof numbers);        // "object"`,
        exercise: "Create variables of each data type and use typeof to verify their types. Try changing a variable's value to a different type and see what happens."
      }, {
        title: "Working with Strings",
        content: "Strings are sequences of characters used to represent text in JavaScript. They're one of the most commonly used data types and come with many built-in methods for manipulation. Understanding string operations is essential for handling user input, formatting output, and processing text data.",
        keyPoints: [
          "Create strings with single quotes, double quotes, or template literals",
          "String concatenation with + operator or template literals",
          "Common string methods: length, toUpperCase(), toLowerCase(), slice()",
          "Template literals allow embedded expressions with ${expression}",
          "Strings are immutable - methods return new strings"
        ],
        codeExample: `// Different ways to create strings
let singleQuote = 'Hello World';
let doubleQuote = "JavaScript is fun";
let templateLiteral = \`Learning \${singleQuote}\`;

// String properties and methods
console.log(singleQuote.length);           // 11
console.log(doubleQuote.toUpperCase());    // "JAVASCRIPT IS FUN"
console.log(singleQuote.slice(0, 5));     // "Hello"

// Template literals for formatting
let name = "Alice";
let age = 25;
let message = \`Hi, I'm \${name} and I'm \${age} years old.\`;
console.log(message);

// String concatenation
let firstName = "John";
let lastName = "Doe";
let fullName = firstName + " " + lastName;  // Traditional way
let fullName2 = \`\${firstName} \${lastName}\`;  // Modern way`,
        exercise: "Create variables for your first name, last name, and age. Use template literals to create a formatted introduction message, and practice using different string methods."
      }, {
        title: "Numbers and Math Operations",
        content: "JavaScript has a single number type that represents both integers and floating-point numbers. Understanding numeric operations, the Math object, and common pitfalls with floating-point arithmetic is crucial for building robust applications.",
        keyPoints: [
          "JavaScript has one number type (64-bit floating point)",
          "Math object provides mathematical functions and constants",
          "Be aware of floating-point precision issues",
          "parseInt() and parseFloat() convert strings to numbers",
          "NaN (Not a Number) represents invalid numeric operations"
        ],
        codeExample: `// Basic arithmetic operations
let a = 10;
let b = 3;
console.log(a + b);    // 13 (addition)
console.log(a - b);    // 7  (subtraction)
console.log(a * b);    // 30 (multiplication)
console.log(a / b);    // 3.333... (division)
console.log(a % b);    // 1  (remainder/modulo)
console.log(a ** b);   // 1000 (exponentiation)

// Math object methods
console.log(Math.round(3.7));     // 4
console.log(Math.floor(3.9));     // 3
console.log(Math.ceil(3.1));      // 4
console.log(Math.random());       // Random number between 0 and 1
console.log(Math.max(5, 10, 2));  // 10

// Converting strings to numbers
let stringNumber = "42";
let converted = parseInt(stringNumber);
console.log(converted + 8);        // 50

// Floating point precision issue
console.log(0.1 + 0.2);            // 0.30000000000000004`,
        exercise: "Create a calculator program that performs basic arithmetic operations. Experiment with the Math object methods and practice converting strings to numbers."
      }, {
        title: "Introduction to Arrays",
        content: "Arrays are ordered collections of items in JavaScript. They're incredibly versatile and form the backbone of many programming solutions. Arrays can hold any type of data and provide numerous methods for manipulation, making them essential for organizing and processing collections of information.",
        keyPoints: [
          "Arrays are ordered lists that can hold any data type",
          "Access elements using index numbers starting from 0",
          "Dynamic sizing - arrays can grow and shrink automatically",
          "Common methods: push(), pop(), length, indexOf()",
          "Arrays are objects in JavaScript with special behavior"
        ],
        codeExample: `// Creating arrays
let numbers = [1, 2, 3, 4, 5];
let colors = ["red", "green", "blue"];
let mixed = [1, "hello", true, null];
let empty = [];

// Accessing array elements
console.log(colors[0]);           // "red" (first element)
console.log(colors[2]);           // "blue" (third element)
console.log(colors.length);       // 3 (number of elements)

// Adding and removing elements
colors.push("yellow");            // Adds to end
console.log(colors);              // ["red", "green", "blue", "yellow"]

let lastColor = colors.pop();     // Removes from end
console.log(lastColor);           // "yellow"

// Finding elements
let position = colors.indexOf("green");
console.log(position);            // 1

// Checking if element exists
let hasBlue = colors.includes("blue");
console.log(hasBlue);             // true`,
        exercise: "Create an array of your favorite movies. Practice adding new movies, removing movies, and finding specific movies in your list using array methods."
      }, {
        title: "Conditional Statements (if/else)",
        content: "Conditional statements allow your programs to make decisions based on different conditions. They're fundamental to creating dynamic, responsive applications that can handle different scenarios and user inputs. Mastering conditionals is essential for controlling program flow.",
        keyPoints: [
          "if statements execute code when conditions are true",
          "else provides alternative code when conditions are false",
          "else if allows checking multiple conditions",
          "Comparison operators: ==, ===, !=, !==, <, >, <=, >=",
          "Logical operators: && (and), || (or), ! (not)"
        ],
        codeExample: `// Basic if statement
let age = 18;
if (age >= 18) {
    console.log("You can vote!");
}

// if-else statement
let weather = "sunny";
if (weather === "sunny") {
    console.log("Go to the beach!");
} else {
    console.log("Stay inside and code!");
}

// if-else if-else chain
let score = 85;
if (score >= 90) {
    console.log("Grade: A");
} else if (score >= 80) {
    console.log("Grade: B");
} else if (score >= 70) {
    console.log("Grade: C");
} else {
    console.log("Grade: F");
}

// Logical operators
let hasLicense = true;
let hasInsurance = true;
if (hasLicense && hasInsurance) {
    console.log("You can drive!");
}

let isWeekend = false;
let isHoliday = true;
if (isWeekend || isHoliday) {
    console.log("No work today!");
}`,
        exercise: "Create a program that determines what to wear based on temperature. Use if-else statements to suggest clothing for different temperature ranges."
      }]
    },
    {
      id: "javascript-basic",
      name: "JavaScript",
      level: "Basic",
      icon: <Code className="h-8 w-8" />,
      color: "from-yellow-500 to-yellow-600",
      description: "Core JavaScript fundamentals",
      slides: [{
        title: "Variables and Data Types",
        content: "JavaScript has dynamic typing. Use 'let' and 'const' for modern variable declaration. Main data types: number, string, boolean, object, undefined, null, symbol, and bigint. Variables can change types during runtime.",
        keyPoints: ["Use 'let' for variables that change", "Use 'const' for constants", "JavaScript is dynamically typed"],
        codeExample: "let name = 'John';\nconst age = 25;\nconsole.log(typeof name);",
        exercise: "Try creating variables of different types and checking their types with typeof."
      }, {
        title: "Functions Basics",
        content: "Functions are reusable blocks of code. Declare with function keyword or arrow syntax (=>). Functions can take parameters and return values. They help organize code and avoid repetition.",
        keyPoints: ["Functions make code reusable", "Can take parameters and return values", "Two main syntaxes: function keyword and arrow functions"],
        codeExample: "function greet(name) {\n  return 'Hello, ' + name;\n}\n\nconst add = (a, b) => a + b;",
        exercise: "Create a function that takes two numbers and returns their sum."
      }, {
        title: "Objects and Arrays",
        content: "Objects store key-value pairs using {} syntax. Arrays are ordered lists using [] syntax. Access object properties with dot notation (obj.name) or brackets (obj['name']). Arrays use index numbers starting from 0.",
        keyPoints: ["Objects use key-value pairs", "Arrays are ordered lists", "Index starts from 0"],
        codeExample: "const person = { name: 'Alice', age: 30 };\nconst colors = ['red', 'green', 'blue'];\nconsole.log(person.name);",
        exercise: "Create an object representing a car with properties like brand, model, and year."
      }, {
        title: "Control Flow",
        content: "Use if-else statements for decisions. Loops include for (counting), while (condition-based), and for-of (arrays). Switch statements handle multiple conditions efficiently.",
        keyPoints: ["if-else for conditions", "for loops for counting", "while loops for conditions", "for-of for arrays"],
        codeExample: "if (age >= 18) {\n  console.log('Adult');\n} else {\n  console.log('Minor');\n}",
        exercise: "Write a loop that prints numbers from 1 to 10."
      }, {
        title: "Advanced Functions",
        content: "Functions are one of the most powerful features in JavaScript. Beyond basic function declarations, JavaScript offers arrow functions, function expressions, higher-order functions, and closures that enable more elegant and functional programming patterns.",
        keyPoints: [
          "Arrow functions provide shorter syntax: (param) => expression",
          "Functions can be stored in variables (function expressions)",
          "Functions can accept other functions as parameters",
          "Functions can return other functions",
          "Scope and closure concepts"
        ],
        codeExample: `// Function declaration
function greet(name) {
    return "Hello, " + name;
}

// Function expression
const greetExpression = function(name) {
    return "Hi, " + name;
};

// Arrow function
const greetArrow = (name) => "Hey, " + name;
const greetArrowBlock = (name) => {
    return "Greetings, " + name;
};

// Higher-order function
function applyOperation(a, b, operation) {
    return operation(a, b);
}

const add = (x, y) => x + y;
const multiply = (x, y) => x * y;

console.log(applyOperation(5, 3, add));      // 8
console.log(applyOperation(5, 3, multiply)); // 15

// Array methods with functions
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);
const evens = numbers.filter(n => n % 2 === 0);
const sum = numbers.reduce((total, n) => total + n, 0);`,
        exercise: "Create arrow functions for mathematical operations. Use array methods like map, filter, and reduce to process arrays of numbers."
      }, {
        title: "Working with Objects",
        content: "Objects are collections of key-value pairs and are fundamental to JavaScript programming. They allow you to group related data and functions together, making your code more organized and representing real-world entities in your programs.",
        keyPoints: [
          "Objects store data as key-value pairs",
          "Access properties with dot notation or bracket notation",
          "Objects can contain functions (called methods)",
          "Objects are mutable - you can add, modify, delete properties",
          "Objects are passed by reference, not by value"
        ],
        codeExample: `// Creating objects
const person = {
    name: "Alice",
    age: 30,
    city: "New York",
    isStudent: false,
    hobbies: ["reading", "cooking", "hiking"]
};

// Accessing properties
console.log(person.name);        // Dot notation
console.log(person["age"]);      // Bracket notation

// Adding new properties
person.email = "alice@email.com";
person["phone"] = "123-456-7890";

// Object methods
const calculator = {
    add: function(a, b) {
        return a + b;
    },
    subtract: (a, b) => a - b,
    multiply(a, b) {  // Shorthand method syntax
        return a * b;
    }
};

console.log(calculator.add(5, 3));        // 8
console.log(calculator.multiply(4, 2));   // 8

// Object destructuring
const { name, age, city } = person;
console.log(name, age, city);

// Nested objects
const student = {
    name: "Bob",
    grades: {
        math: 95,
        science: 87,
        english: 92
    }
};
console.log(student.grades.math);`,
        exercise: "Create an object representing a book with properties like title, author, pages, and a method to display book information. Practice accessing and modifying object properties."
      }]
    },
    {
      id: "python-intro",
      name: "Python",
      level: "Introduction",
      icon: <Cpu className="h-8 w-8" />,
      color: "from-blue-400 to-blue-500",
      description: "Getting started with Python",
      slides: [{
        title: "What is Python?",
        content: "Python is a high-level, interpreted programming language known for its simplicity and readability. It's used for web development, data science, automation, AI, and more. Python's philosophy emphasizes code readability.",
        keyPoints: ["High-level and readable", "Great for beginners", "Versatile - used in many fields"],
        codeExample: "print('Hello, World!')\nname = 'Python'\nprint(f'Learning {name} is fun!')",
        exercise: "Try running Python code in an online interpreter or install Python on your computer."
      }, {
        title: "Installing Python",
        content: "Download Python from python.org. Python comes with IDLE (development environment) and pip (package manager). Use command line or IDEs like PyCharm, VS Code for development. Check installation with 'python --version'.",
        keyPoints: ["Download from python.org", "Includes IDLE and pip", "Check with python --version"],
        codeExample: "# Check Python version\npython --version\n\n# Install packages\npip install requests",
        exercise: "Install Python and check the version. Try using IDLE to run a simple print statement."
      }, {
        title: "Python Variables and Data Types",
        content: "Python has several built-in data types that make it versatile for different programming tasks. Understanding these types and how to work with variables is fundamental to Python programming. Python is dynamically typed, meaning you don't need to declare variable types explicitly.",
        keyPoints: [
          "Main data types: int, float, str, bool, list, dict, tuple, set",
          "Variables are created when you assign values",
          "Use type() function to check variable types",
          "Python is case-sensitive with variable names",
          "Follow naming conventions: snake_case for variables"
        ],
        codeExample: `# Different data types in Python
name = "Alice"              # string
age = 25                    # integer
height = 5.6               # float
is_student = True          # boolean
hobbies = ["reading", "coding", "hiking"]  # list
grades = {"math": 95, "science": 87}       # dictionary

# Check types
print(type(name))          # <class 'str'>
print(type(age))           # <class 'int'>
print(type(hobbies))       # <class 'list'>

# Type conversion
age_str = str(age)         # Convert to string
height_int = int(height)   # Convert to integer (truncates)
number_str = "42"
number_int = int(number_str)  # Convert string to integer

# Multiple assignment
x, y, z = 1, 2, 3
a = b = c = 0

# f-strings for formatting (Python 3.6+)
message = f"Hi, I'm {name} and I'm {age} years old"
print(message)`,
        exercise: "Create variables of different types representing yourself (name, age, hobbies, etc.). Practice type conversion and use f-strings to create formatted messages."
      }, {
        title: "Python Lists and Basic Operations",
        content: "Lists are one of Python's most versatile and commonly used data structures. They are ordered, mutable collections that can store items of different types. Understanding list operations is crucial for effective Python programming.",
        keyPoints: [
          "Lists are ordered and mutable (can be changed)",
          "Can contain different data types in the same list",
          "Use square brackets [] to create lists",
          "Access elements by index (starting from 0)",
          "Negative indexing starts from the end (-1 is last element)"
        ],
        codeExample: `# Creating lists
fruits = ["apple", "banana", "orange"]
numbers = [1, 2, 3, 4, 5]
mixed = [1, "hello", 3.14, True]
empty_list = []

# Accessing elements
print(fruits[0])           # "apple" (first element)
print(fruits[-1])          # "orange" (last element)
print(fruits[1:3])         # ["banana", "orange"] (slicing)

# Adding elements
fruits.append("grape")     # Add to end
fruits.insert(1, "kiwi")   # Insert at index 1

# Removing elements
fruits.remove("banana")    # Remove by value
last_fruit = fruits.pop()  # Remove and return last element
del fruits[0]              # Remove by index

# List methods
print(len(fruits))         # Length of list
print("apple" in fruits)   # Check if element exists
fruits.sort()              # Sort the list
fruits.reverse()           # Reverse the list

# List comprehension (advanced)
squares = [x**2 for x in range(1, 6)]  # [1, 4, 9, 16, 25]
print(squares)`,
        exercise: "Create a list of your favorite movies. Practice adding, removing, and organizing movies. Try using list slicing and create a new list using list comprehension."
      }]
    },
    {
      id: "react-intro",
      name: "React",
      level: "Introduction",
      icon: <Globe className="h-8 w-8" />,
      color: "from-cyan-300 to-cyan-400",
      description: "Getting started with React",
      slides: [{
        title: "What is React?",
        content: "React is a JavaScript library for building user interfaces, developed by Meta (Facebook). It's component-based, making code reusable and maintainable. React uses a virtual DOM for efficient updates.",
        keyPoints: ["JavaScript library for UI", "Component-based architecture", "Virtual DOM for performance"],
        codeExample: "function Welcome() {\n  return <h1>Hello, React!</h1>;\n}",
        exercise: "Create your first React app using create-react-app or try React in an online editor."
      }, {
        title: "Setting up React",
        content: "Create React apps with 'npx create-react-app my-app' or Vite for faster builds. You need Node.js installed. Modern React uses functional components and hooks instead of class components.",
        keyPoints: ["Use create-react-app or Vite", "Requires Node.js", "Functional components preferred"],
        codeExample: "npx create-react-app my-app\ncd my-app\nnpm start",
        exercise: "Set up a new React project and explore the file structure."
      }, {
        title: "Understanding JSX",
        content: "JSX (JavaScript XML) is a syntax extension for JavaScript that allows you to write HTML-like code in your JavaScript files. It's the foundation of React components and makes creating user interfaces intuitive and declarative.",
        keyPoints: [
          "JSX combines JavaScript and HTML-like syntax",
          "Must return single parent element or React Fragment",
          "Use className instead of class (JavaScript reserved word)",
          "Embed JavaScript expressions with curly braces {}",
          "Self-closing tags must end with />"
        ],
        codeExample: `// Basic JSX component
function Welcome() {
  const name = "React Developer";
  const isLearning = true;
  
  return (
    <div className="welcome-container">
      <h1>Hello, {name}!</h1>
      <p>Learning React is {isLearning ? "awesome" : "challenging"}</p>
      <img src="/logo.png" alt="React Logo" />
      <input type="text" placeholder="Enter your name" />
    </div>
  );
}

// Using React Fragment to avoid extra div
function UserInfo() {
  return (
    <>
      <h2>User Information</h2>
      <p>This component uses a Fragment</p>
    </>
  );
}

// JSX with lists
function MovieList() {
  const movies = ["Inception", "Interstellar", "The Matrix"];
  
  return (
    <ul>
      {movies.map((movie, index) => (
        <li key={index}>{movie}</li>
      ))}
    </ul>
  );
}`,
        exercise: "Create a React component that displays your personal information using JSX. Include conditional rendering and practice embedding JavaScript expressions."
      }, {
        title: "Props - Passing Data to Components",
        content: "Props (properties) are how you pass data from parent components to child components in React. They make components reusable and enable communication between different parts of your application. Props are read-only and help maintain predictable data flow.",
        keyPoints: [
          "Props pass data from parent to child components",
          "Props are read-only (immutable)",
          "Access props as function parameters or this.props",
          "Can pass any data type including functions",
          "Default props can be set for optional values"
        ],
        codeExample: `// Child component that receives props
function UserCard({ name, age, email, isOnline }) {
  return (
    <div className="user-card">
      <h3>{name}</h3>
      <p>Age: {age}</p>
      <p>Email: {email}</p>
      <span className={isOnline ? "online" : "offline"}>
        {isOnline ? "Online" : "Offline"}
      </span>
    </div>
  );
}

// Parent component that passes props
function UserList() {
  const users = [
    { id: 1, name: "Alice", age: 25, email: "alice@email.com", isOnline: true },
    { id: 2, name: "Bob", age: 30, email: "bob@email.com", isOnline: false }
  ];
  
  return (
    <div>
      <h2>User Directory</h2>
      {users.map(user => (
        <UserCard
          key={user.id}
          name={user.name}
          age={user.age}
          email={user.email}
          isOnline={user.isOnline}
        />
      ))}
    </div>
  );
}

// Default props
UserCard.defaultProps = {
  isOnline: false
};`,
        exercise: "Create a ProductCard component that receives product information as props. Then create a ProductList component that renders multiple ProductCard components with different data."
      }, {
        title: "State and useState Hook",
        content: "State allows React components to store and manage data that can change over time. The useState hook is the foundation of state management in functional components, enabling components to be interactive and responsive to user actions.",
        keyPoints: [
          "State holds data that can change during component lifecycle",
          "useState returns current state value and setter function",
          "State updates trigger component re-renders",
          "State updates are asynchronous",
          "Each component instance has its own state"
        ],
        codeExample: `import React, { useState } from 'react';

// Counter component with state
function Counter() {
  const [count, setCount] = useState(0);
  
  const increment = () => {
    setCount(count + 1);
  };
  
  const decrement = () => {
    setCount(prevCount => prevCount - 1); // Using previous state
  };
  
  return (
    <div>
      <h2>Count: {count}</h2>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}

// Form with multiple state variables
function UserForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ name, email, age });
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="number"
        placeholder="Age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  );
}`,
        exercise: "Create a todo list component using useState. Allow users to add new todos, mark them as complete, and delete them. Practice managing arrays in state."
      }, {
        title: "Event Handling in React",
        content: "Event handling in React involves responding to user interactions like clicks, form submissions, and keyboard input. React provides a consistent event system across all browsers using SyntheticEvents, making event handling predictable and efficient.",
        keyPoints: [
          "React events are SyntheticEvents (cross-browser compatible)",
          "Event handlers are passed as props to JSX elements",
          "Use arrow functions or bind to preserve 'this' context",
          "preventDefault() stops default browser behavior",
          "Event delegation improves performance with many elements"
        ],
        codeExample: `import React, { useState } from 'react';

function EventExamples() {
  const [message, setMessage] = useState('');
  const [items, setItems] = useState(['Apple', 'Banana', 'Orange']);
  
  // Click event handler
  const handleClick = () => {
    setMessage('Button was clicked!');
  };
  
  // Form submit handler
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page refresh
    const formData = new FormData(e.target);
    const newItem = formData.get('item');
    if (newItem) {
      setItems([...items, newItem]);
      e.target.reset(); // Clear form
    }
  };
  
  // Keyboard event handler
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      setMessage('Enter key pressed!');
    }
  };
  
  // List item click handler
  const handleItemClick = (index, item) => {
    setMessage(\`Clicked on \${item} at index \${index}\`);
  };
  
  return (
    <div>
      <h3>Event Handling Examples</h3>
      
      <button onClick={handleClick}>Click Me</button>
      
      <form onSubmit={handleSubmit}>
        <input 
          name="item" 
          placeholder="Add new item" 
          onKeyPress={handleKeyPress}
        />
        <button type="submit">Add</button>
      </form>
      
      <ul>
        {items.map((item, index) => (
          <li 
            key={index}
            onClick={() => handleItemClick(index, item)}
            style={{ cursor: 'pointer' }}
          >
            {item}
          </li>
        ))}
      </ul>
      
      <p>{message}</p>
    </div>
  );
}`,
        exercise: "Create an interactive image gallery component. Handle click events to select images, keyboard events for navigation, and form events to add new images."
      }]
    },
    {
      id: "java-intro",
      name: "Java",
      level: "Introduction",
      icon: <Cpu className="h-8 w-8" />,
      color: "from-red-400 to-red-500",
      description: "Object-oriented programming with Java",
      slides: [{
        title: "What is Java?",
        content: "Java is a robust, object-oriented programming language designed to be platform-independent. Known for 'write once, run anywhere', Java is widely used in enterprise applications, Android development, and web services.",
        keyPoints: ["Platform independent", "Object-oriented", "Strong memory management", "Used in enterprise applications"],
        codeExample: "public class HelloWorld {\n    public static void main(String[] args) {\n        System.out.println(\"Hello, Java!\");\n    }\n}",
        exercise: "Install Java JDK and compile your first Java program."
      }]
    },
    {
      id: "javascript-intermediate",
      name: "JavaScript",
      level: "Intermediate",
      icon: <Code className="h-8 w-8" />,
      color: "from-yellow-600 to-orange-500",
      description: "Advanced JavaScript concepts and patterns",
      slides: [{
        title: "Asynchronous JavaScript - Promises",
        content: "Promises are a way to handle asynchronous operations in JavaScript, providing a cleaner alternative to callbacks. They represent a value that may be available now, in the future, or never, and help avoid callback hell while making code more readable.",
        keyPoints: [
          "Promises have three states: pending, fulfilled, rejected",
          "Use .then() for success handling and .catch() for errors",
          "Promise.all() runs multiple promises concurrently",
          "Promise.race() returns the first resolved promise",
          "Always handle promise rejections to avoid unhandled errors"
        ],
        codeExample: `// Creating a simple promise
const fetchUserData = (userId) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (userId > 0) {
        resolve({ id: userId, name: "John Doe", email: "john@example.com" });
      } else {
        reject(new Error("Invalid user ID"));
      }
    }, 1000);
  });
};

// Using promises
fetchUserData(1)
  .then(user => {
    console.log("User data:", user);
    return user.email;
  })
  .then(email => {
    console.log("User email:", email);
  })
  .catch(error => {
    console.error("Error:", error.message);
  });

// Promise.all for multiple operations
const promise1 = fetchUserData(1);
const promise2 = fetchUserData(2);
const promise3 = fetchUserData(3);

Promise.all([promise1, promise2, promise3])
  .then(users => {
    console.log("All users:", users);
  })
  .catch(error => {
    console.error("One or more requests failed:", error);
  });`,
        exercise: "Create a promise that simulates fetching weather data. Practice chaining multiple .then() calls and handling errors with .catch()."
      }, {
        title: "Async/Await - Modern Asynchronous Code",
        content: "Async/await is syntactic sugar built on top of promises that makes asynchronous code look and behave more like synchronous code. It provides a cleaner, more readable way to work with promises and handle asynchronous operations.",
        keyPoints: [
          "async functions always return a promise",
          "await pauses execution until promise resolves",
          "Use try/catch blocks for error handling",
          "await can only be used inside async functions",
          "Multiple awaits run sequentially, use Promise.all for parallel execution"
        ],
        codeExample: `// Async function declaration
async function getUserData(userId) {
  try {
    const response = await fetch(\`/api/users/\${userId}\`);
    const userData = await response.json();
    return userData;
  } catch (error) {
    console.error("Failed to fetch user data:", error);
    throw error;
  }
}

// Using async/await
async function displayUserInfo() {
  try {
    const user = await getUserData(1);
    console.log("User name:", user.name);
    
    const posts = await fetch(\`/api/users/\${user.id}/posts\`);
    const userPosts = await posts.json();
    console.log("User posts:", userPosts);
  } catch (error) {
    console.error("Error loading user info:", error);
  }
}

// Parallel execution with Promise.all
async function getMultipleUsers() {
  try {
    const [user1, user2, user3] = await Promise.all([
      getUserData(1),
      getUserData(2),
      getUserData(3)
    ]);
    
    console.log("All users loaded:", { user1, user2, user3 });
  } catch (error) {
    console.error("Failed to load users:", error);
  }
}`,
        exercise: "Convert promise-based code to use async/await. Create an async function that fetches multiple pieces of data and handles errors appropriately."
      }, {
        title: "ES6+ Features - Destructuring and Spread",
        content: "Modern JavaScript includes powerful features that make code more concise and readable. Destructuring allows extracting values from arrays and objects, while the spread operator provides flexible ways to work with collections of data.",
        keyPoints: [
          "Destructuring extracts values from arrays and objects",
          "Spread operator (...) expands arrays and objects",
          "Rest parameters collect multiple arguments into arrays",
          "Default values can be set during destructuring",
          "Destructuring works in function parameters and assignments"
        ],
        codeExample: `// Array destructuring
const colors = ["red", "green", "blue", "yellow"];
const [primary, secondary, ...otherColors] = colors;
console.log(primary);     // "red"
console.log(secondary);   // "green"
console.log(otherColors); // ["blue", "yellow"]

// Object destructuring
const user = {
  name: "Alice",
  age: 30,
  email: "alice@example.com",
  city: "New York"
};

const { name, age, city = "Unknown" } = user;
console.log(name, age, city);

// Nested destructuring
const student = {
  info: { name: "Bob", grade: "A" },
  subjects: ["Math", "Science"]
};
const { info: { name: studentName, grade }, subjects: [firstSubject] } = student;

// Spread operator with arrays
const numbers1 = [1, 2, 3];
const numbers2 = [4, 5, 6];
const combined = [...numbers1, ...numbers2];  // [1, 2, 3, 4, 5, 6]

// Spread with objects
const defaultSettings = { theme: "dark", notifications: true };
const userSettings = { theme: "light", language: "en" };
const finalSettings = { ...defaultSettings, ...userSettings };

// Rest parameters in functions
function sum(...numbers) {
  return numbers.reduce((total, num) => total + num, 0);
}
console.log(sum(1, 2, 3, 4, 5)); // 15`,
        exercise: "Practice destructuring arrays and objects with different patterns. Use the spread operator to combine arrays and objects, and create functions with rest parameters."
      }]
    },
    {
      id: "python-intermediate", 
      name: "Python",
      level: "Intermediate",
      icon: <Cpu className="h-8 w-8" />,
      color: "from-blue-500 to-green-500",
      description: "Advanced Python programming concepts",
      slides: [{
        title: "Python Functions and Scope",
        content: "Functions are reusable blocks of code that perform specific tasks. Understanding function scope, parameters, return values, and different types of functions is crucial for writing modular and maintainable Python code.",
        keyPoints: [
          "Functions reduce code repetition and improve organization",
          "Local scope vs global scope affects variable access",
          "Parameters can have default values",
          "*args and **kwargs handle variable arguments",
          "Lambda functions provide concise one-line functions"
        ],
        codeExample: `# Basic function with parameters and return value
def greet_user(name, greeting="Hello"):
    """Function with default parameter"""
    return f"{greeting}, {name}!"

print(greet_user("Alice"))           # "Hello, Alice!"
print(greet_user("Bob", "Hi"))       # "Hi, Bob!"

# Variable arguments
def calculate_average(*numbers):
    """Function that accepts any number of arguments"""
    if not numbers:
        return 0
    return sum(numbers) / len(numbers)

print(calculate_average(1, 2, 3, 4, 5))  # 3.0

# Keyword arguments
def create_profile(**info):
    """Function that accepts keyword arguments"""
    profile = {}
    for key, value in info.items():
        profile[key] = value
    return profile

user_profile = create_profile(name="Alice", age=25, city="New York")
print(user_profile)

# Lambda functions
square = lambda x: x ** 2
numbers = [1, 2, 3, 4, 5]
squared_numbers = list(map(square, numbers))
print(squared_numbers)  # [1, 4, 9, 16, 25]

# Scope example
global_var = "I'm global"

def demonstrate_scope():
    local_var = "I'm local"
    print(global_var)  # Can access global
    print(local_var)   # Can access local`,
        exercise: "Create functions for a simple calculator that can handle variable numbers of arguments. Practice using default parameters and lambda functions."
      }, {
        title: "Object-Oriented Programming in Python",
        content: "Object-Oriented Programming (OOP) allows you to create classes and objects that model real-world entities. This paradigm helps organize code, promotes reusability, and makes complex programs more manageable through encapsulation, inheritance, and polymorphism.",
        keyPoints: [
          "Classes are blueprints for creating objects",
          "__init__ method initializes object attributes",
          "Methods are functions defined inside classes",
          "Inheritance allows classes to inherit from other classes",
          "Encapsulation protects data with private attributes"
        ],
        codeExample: `# Basic class definition
class Dog:
    # Class attribute (shared by all instances)
    species = "Canis familiaris"
    
    def __init__(self, name, age, breed):
        # Instance attributes
        self.name = name
        self.age = age
        self.breed = breed
    
    def bark(self):
        return f"{self.name} says Woof!"
    
    def get_info(self):
        return f"{self.name} is a {self.age} year old {self.breed}"

# Creating objects
my_dog = Dog("Buddy", 3, "Golden Retriever")
print(my_dog.bark())      # "Buddy says Woof!"
print(my_dog.get_info())  # "Buddy is a 3 year old Golden Retriever"

# Inheritance
class Puppy(Dog):
    def __init__(self, name, age, breed, training_level):
        super().__init__(name, age, breed)  # Call parent constructor
        self.training_level = training_level
    
    def play(self):
        return f"{self.name} is playing happily!"
    
    def bark(self):  # Method overriding
        return f"{self.name} says Yip! (puppy bark)"

# Using inheritance
my_puppy = Puppy("Max", 1, "Labrador", "Beginner")
print(my_puppy.play())    # "Max is playing happily!"
print(my_puppy.bark())    # "Max says Yip! (puppy bark)"`,
        exercise: "Create a class hierarchy for vehicles (Car, Motorcycle) that inherit from a base Vehicle class. Include methods for starting, stopping, and displaying information."
      }]
    },
    {
      id: "html-css-intro",
      name: "HTML & CSS",
      level: "Introduction", 
      icon: <Globe className="h-8 w-8" />,
      color: "from-orange-400 to-orange-500",
      description: "Building web pages with HTML and CSS",
      slides: [{
        title: "HTML Basics",
        content: "HTML (HyperText Markup Language) is the standard markup language for creating web pages. It describes the structure and content of web pages using elements and tags.",
        keyPoints: ["Markup language for web pages", "Uses tags and elements", "Semantic structure", "Foundation of all websites"],
        codeExample: "<!DOCTYPE html>\n<html>\n<head>\n    <title>My Page</title>\n</head>\n<body>\n    <h1>Welcome!</h1>\n    <p>This is my first webpage.</p>\n</body>\n</html>",
        exercise: "Create a simple HTML page with headings, paragraphs, and links."
      }, {
        title: "HTML Forms and Input Elements",
        content: "HTML forms are essential for collecting user input on web pages. Understanding different input types, form validation, and how to structure forms properly is crucial for creating interactive web applications that can gather and process user data effectively.",
        keyPoints: [
          "Forms use <form> element to group input controls",
          "Various input types: text, email, password, number, date",
          "Labels improve accessibility and user experience",
          "Form validation can be done with HTML attributes",
          "Submit buttons trigger form submission"
        ],
        codeExample: `<!-- Contact form example -->
<form action="/submit" method="POST">
  <div>
    <label for="name">Full Name:</label>
    <input type="text" id="name" name="name" required>
  </div>
  
  <div>
    <label for="email">Email:</label>
    <input type="email" id="email" name="email" required>
  </div>
  
  <div>
    <label for="phone">Phone Number:</label>
    <input type="tel" id="phone" name="phone" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}">
  </div>
  
  <div>
    <label for="age">Age:</label>
    <input type="number" id="age" name="age" min="18" max="100">
  </div>
  
  <div>
    <label for="message">Message:</label>
    <textarea id="message" name="message" rows="4" cols="50"></textarea>
  </div>
  
  <div>
    <label for="country">Country:</label>
    <select id="country" name="country">
      <option value="">Select a country</option>
      <option value="us">United States</option>
      <option value="ca">Canada</option>
      <option value="uk">United Kingdom</option>
    </select>
  </div>
  
  <div>
    <input type="checkbox" id="newsletter" name="newsletter">
    <label for="newsletter">Subscribe to newsletter</label>
  </div>
  
  <button type="submit">Submit</button>
  <button type="reset">Reset</button>
</form>`,
        exercise: "Create a registration form with various input types including personal information, preferences, and file upload. Add proper labels and validation."
      }, {
        title: "CSS Styling Fundamentals",
        content: "CSS (Cascading Style Sheets) controls the presentation and layout of HTML elements. Understanding selectors, properties, values, and the cascade is essential for creating visually appealing and well-structured web pages.",
        keyPoints: [
          "CSS selectors target HTML elements for styling",
          "Properties define what aspect to style (color, size, etc.)",
          "Values specify how the property should be applied",
          "Cascade determines which styles take precedence",
          "Box model: content, padding, border, margin"
        ],
        codeExample: `/* CSS Selectors and Basic Styling */

/* Element selector */
h1 {
  color: #333;
  font-size: 2em;
  text-align: center;
}

/* Class selector */
.highlight {
  background-color: yellow;
  padding: 10px;
  border-radius: 5px;
}

/* ID selector */
#header {
  background-color: #f0f0f0;
  padding: 20px;
  margin-bottom: 30px;
}

/* Descendant selector */
.container p {
  line-height: 1.6;
  margin-bottom: 15px;
}

/* Box model example */
.box {
  width: 300px;
  height: 200px;
  padding: 20px;
  border: 2px solid #333;
  margin: 10px;
  background-color: lightblue;
}

/* Hover effect */
button {
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #0056b3;
}

/* Responsive design */
@media (max-width: 768px) {
  .container {
    padding: 10px;
  }
  
  h1 {
    font-size: 1.5em;
  }
}`,
        exercise: "Style your HTML form using CSS. Add colors, spacing, hover effects, and make it responsive for mobile devices."
      }]
    },
    {
      id: "nodejs-intro",
      name: "Node.js",
      level: "Introduction",
      icon: <Database className="h-8 w-8" />,
      color: "from-green-400 to-green-500", 
      description: "Server-side JavaScript with Node.js",
      slides: [{
        title: "What is Node.js?",
        content: "Node.js is a JavaScript runtime built on Chrome's V8 engine that allows you to run JavaScript on the server. It's perfect for building scalable network applications and APIs.",
        keyPoints: ["JavaScript on the server", "Built on V8 engine", "Great for APIs and microservices", "Large ecosystem (npm)"],
        codeExample: "const http = require('http');\n\nconst server = http.createServer((req, res) => {\n    res.writeHead(200, {'Content-Type': 'text/plain'});\n    res.end('Hello from Node.js!');\n});\n\nserver.listen(3000);",
        exercise: "Install Node.js and create a simple HTTP server."
      }, {
        title: "Working with NPM and Packages",
        content: "NPM (Node Package Manager) is the default package manager for Node.js, providing access to millions of reusable code packages. Understanding how to manage dependencies, create scripts, and work with package.json is essential for Node.js development.",
        keyPoints: [
          "package.json manages project dependencies and metadata",
          "npm install adds packages to your project",
          "Scripts in package.json automate common tasks",
          "Semantic versioning helps manage package updates",
          "node_modules folder contains installed packages"
        ],
        codeExample: `// package.json example
{
  "name": "my-node-app",
  "version": "1.0.0",
  "description": "A sample Node.js application",
  "main": "app.js",
  "scripts": {
    "start": "node app.js",
    "dev": "nodemon app.js",
    "test": "jest"
  },
  "dependencies": {
    "express": "^4.18.0",
    "lodash": "^4.17.21"
  },
  "devDependencies": {
    "nodemon": "^2.0.15",
    "jest": "^28.0.0"
  }
}

// Using installed packages in code
const express = require('express');
const _ = require('lodash');

const app = express();
const port = 3000;

// Using lodash utility function
const numbers = [1, 2, 3, 4, 5];
const doubled = _.map(numbers, n => n * 2);

app.get('/', (req, res) => {
  res.json({
    message: 'Hello from Node.js!',
    doubledNumbers: doubled
  });
});

app.listen(port, () => {
  console.log(\`Server running at http://localhost:\${port}\`);
});

// NPM commands
// npm init -y                    // Create package.json
// npm install express            // Install package
// npm install -D nodemon         // Install dev dependency
// npm run dev                    // Run custom script
// npm update                     // Update packages`,
        exercise: "Create a Node.js project with package.json, install some popular packages like express and lodash, and create scripts for development and production."
      }, {
        title: "File System Operations in Node.js",
        content: "Node.js provides built-in modules for working with the file system, allowing you to read, write, create, and delete files and directories. Understanding both synchronous and asynchronous file operations is important for building robust server applications.",
        keyPoints: [
          "fs module provides file system functionality",
          "Async operations are preferred for better performance",
          "Path module helps work with file paths correctly",
          "Stream API for handling large files efficiently",
          "Always handle errors in file operations"
        ],
        codeExample: `const fs = require('fs');
const path = require('path');

// Reading files asynchronously
fs.readFile('data.txt', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }
  console.log('File content:', data);
});

// Writing files asynchronously
const content = 'Hello, this is new content!';
fs.writeFile('output.txt', content, 'utf8', (err) => {
  if (err) {
    console.error('Error writing file:', err);
    return;
  }
  console.log('File written successfully!');
});

// Working with directories
fs.readdir('./', (err, files) => {
  if (err) {
    console.error('Error reading directory:', err);
    return;
  }
  console.log('Files in directory:', files);
});

// Using promises (modern approach)
const fsPromises = require('fs').promises;

async function processFile() {
  try {
    const data = await fsPromises.readFile('input.txt', 'utf8');
    const processedData = data.toUpperCase();
    await fsPromises.writeFile('processed.txt', processedData);
    console.log('File processed successfully!');
  } catch (error) {
    console.error('Error processing file:', error);
  }
}

// Working with paths
const filePath = path.join(__dirname, 'data', 'users.json');
const fileName = path.basename(filePath);
const fileExt = path.extname(filePath);
console.log('File name:', fileName); // users.json
console.log('Extension:', fileExt);  // .json`,
        exercise: "Create a file manager program that can create directories, read file contents, copy files, and list directory contents. Use async/await for all operations."
      }]
    },
    {
      id: "typescript-intro",
      name: "TypeScript",
      level: "Introduction",
      icon: <Code className="h-8 w-8" />,
      color: "from-blue-500 to-blue-600",
      description: "JavaScript with static typing",
      slides: [{
        title: "What is TypeScript?",
        content: "TypeScript is a strongly typed programming language that builds on JavaScript by adding static type definitions. It helps catch errors early and makes code more maintainable.",
        keyPoints: ["Superset of JavaScript", "Static typing", "Better IDE support", "Catches errors at compile time"],
        codeExample: "interface User {\n    name: string;\n    age: number;\n    email?: string;\n}\n\nfunction greetUser(user: User): string {\n    return `Hello, ${user.name}!`;\n}",
        exercise: "Install TypeScript and convert a JavaScript file to TypeScript."
      }]
    },
    {
      id: "cpp-intro", 
      name: "C++",
      level: "Introduction",
      icon: <Cpu className="h-8 w-8" />,
      color: "from-purple-400 to-purple-500",
      description: "Systems programming with C++",
      slides: [{
        title: "What is C++?",
        content: "C++ is a general-purpose programming language that supports both procedural and object-oriented programming. It's widely used for system software, game development, and performance-critical applications.",
        keyPoints: ["Low-level control", "Object-oriented", "High performance", "Used in games and systems"],
        codeExample: "#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << \"Hello, C++!\" << endl;\n    return 0;\n}",
        exercise: "Install a C++ compiler and compile your first C++ program."
      }]
    },
    {
      id: "csharp-intro",
      name: "C#",
      level: "Introduction", 
      icon: <Cpu className="h-8 w-8" />,
      color: "from-indigo-400 to-indigo-500",
      description: "Modern programming with C#",
      slides: [{
        title: "What is C#?",
        content: "C# is a modern, object-oriented programming language developed by Microsoft. It's part of the .NET ecosystem and is used for web applications, desktop apps, games, and more.",
        keyPoints: ["Modern and object-oriented", "Part of .NET ecosystem", "Strong typing", "Cross-platform with .NET Core"],
        codeExample: "using System;\n\nclass Program {\n    static void Main() {\n        Console.WriteLine(\"Hello, C#!\");\n    }\n}",
        exercise: "Install .NET SDK and create your first C# console application."
      }]
    },
    {
      id: "flutter-intro",
      name: "Flutter",
      level: "Introduction",
      icon: <Smartphone className="h-8 w-8" />,
      color: "from-cyan-400 to-cyan-500",
      description: "Cross-platform mobile development",
      slides: [{
        title: "What is Flutter?",
        content: "Flutter is Google's UI toolkit for building natively compiled applications for mobile, web, and desktop from a single codebase. It uses the Dart programming language.",
        keyPoints: ["Cross-platform development", "Single codebase", "Uses Dart language", "Fast development cycle"],
        codeExample: "import 'package:flutter/material.dart';\n\nvoid main() => runApp(MyApp());\n\nclass MyApp extends StatelessWidget {\n  Widget build(BuildContext context) {\n    return MaterialApp(\n      home: Text('Hello Flutter!'),\n    );\n  }\n}",
        exercise: "Install Flutter SDK and create your first Flutter app."
      }]
    },
    {
      id: "swift-intro",
      name: "Swift",
      level: "Introduction",
      icon: <Smartphone className="h-8 w-8" />,
      color: "from-orange-500 to-red-500",
      description: "iOS development with Swift",
      slides: [{
        title: "What is Swift?",
        content: "Swift is a powerful programming language developed by Apple for iOS, macOS, watchOS, and tvOS development. It's designed to be fast, safe, and expressive.",
        keyPoints: ["Apple's modern language", "Safe and fast", "Used for iOS development", "Expressive syntax"],
        codeExample: "import Foundation\n\nprint(\"Hello, Swift!\")\n\nlet greeting = \"Welcome to Swift\"\nvar count = 0\n\nfunc greetUser(name: String) -> String {\n    return \"Hello, \\(name)!\"\n}",
        exercise: "Install Xcode and create your first Swift playground."
      }]
    },
    {
      id: "sql-intro",
      name: "SQL",
      level: "Introduction",
      icon: <Database className="h-8 w-8" />,
      color: "from-emerald-400 to-emerald-500",
      description: "Database queries with SQL",
      slides: [{
        title: "What is SQL?",
        content: "SQL (Structured Query Language) is a standard language for managing and manipulating relational databases. It's essential for data storage, retrieval, and analysis.",
        keyPoints: ["Standard database language", "CRUD operations", "Data analysis", "Used across all databases"],
        codeExample: "-- Create a table\nCREATE TABLE users (\n    id INT PRIMARY KEY,\n    name VARCHAR(100),\n    email VARCHAR(100)\n);\n\n-- Insert data\nINSERT INTO users VALUES (1, 'John', 'john@email.com');\n\n-- Query data\nSELECT * FROM users WHERE name = 'John';",
        exercise: "Install a database system like SQLite and practice basic queries."
      }]
    },
    {
      id: "git-intro",
      name: "Git",
      level: "Introduction",
      icon: <Code className="h-8 w-8" />,
      color: "from-gray-600 to-gray-700",
      description: "Version control with Git",
      slides: [{
        title: "What is Git?",
        content: "Git is a distributed version control system that tracks changes in source code during software development. It's essential for collaboration and code management.",
        keyPoints: ["Version control system", "Track code changes", "Collaboration tool", "Industry standard"],
        codeExample: "# Initialize a git repository\ngit init\n\n# Add files to staging\ngit add .\n\n# Commit changes\ngit commit -m \"Initial commit\"\n\n# Check status\ngit status",
        exercise: "Install Git and initialize your first repository with a simple project."
      }]
    },
    {
      id: "go-intro",
      name: "Go",
      level: "Introduction", 
      icon: <Cpu className="h-8 w-8" />,
      color: "from-teal-400 to-teal-500",
      description: "Modern systems programming with Go",
      slides: [{
        title: "What is Go?",
        content: "Go is an open-source programming language developed by Google. It's designed for simplicity, efficiency, and excellent support for concurrent programming.",
        keyPoints: ["Developed by Google", "Simple and efficient", "Great for concurrent programming", "Fast compilation"],
        codeExample: "package main\n\nimport \"fmt\"\n\nfunc main() {\n    fmt.Println(\"Hello, Go!\")\n    \n    // Variables\n    var message string = \"Learning Go\"\n    count := 42\n    \n    fmt.Println(message, count)\n}",
        exercise: "Install Go and create your first Go program with variables and functions."
      }]
    },
    {
      id: "rust-intro",
      name: "Rust", 
      level: "Introduction",
      icon: <Cpu className="h-8 w-8" />,
      color: "from-amber-600 to-orange-600",
      description: "Systems programming with memory safety",
      slides: [{
        title: "What is Rust?",
        content: "Rust is a systems programming language focused on safety, speed, and concurrency. It prevents common bugs like null pointer dereferences and buffer overflows.",
        keyPoints: ["Memory safety", "Zero-cost abstractions", "Concurrency support", "Growing ecosystem"],
        codeExample: "fn main() {\n    println!(\"Hello, Rust!\");\n    \n    let mut count = 0;\n    let message = \"Learning Rust\";\n    \n    count += 1;\n    println!(\"{}: {}\", message, count);\n}",
        exercise: "Install Rust and create your first Rust program using Cargo."
      }]
    },
    {
      id: "php-intro",
      name: "PHP",
      level: "Introduction",
      icon: <Globe className="h-8 w-8" />,
      color: "from-violet-500 to-purple-600",
      description: "Server-side web development with PHP",
      slides: [{
        title: "What is PHP?",
        content: "PHP is a popular server-side scripting language designed for web development. It's embedded in HTML and powers many websites including WordPress and Facebook.",
        keyPoints: ["Server-side scripting", "Embedded in HTML", "Popular for web development", "Large community"],
        codeExample: "<?php\n// PHP code starts with <?php\necho \"Hello, PHP!\";\n\n// Variables start with $\n$name = \"World\";\n$age = 25;\n\necho \"Hello, $name! You are $age years old.\";\n?>",
        exercise: "Install a local server (XAMPP/WAMP) and create your first PHP script."
      }]
    },
    // Frontend Technologies
    {
      id: "vue-intro",
      name: "Vue.js",
      level: "Introduction",
      icon: <Globe className="h-8 w-8" />,
      color: "from-green-300 to-green-400",
      description: "Progressive JavaScript framework",
      slides: [{
        title: "What is Vue.js?",
        content: "Vue.js is a progressive JavaScript framework for building user interfaces. It's designed to be incrementally adoptable and focuses on the view layer, making it easy to integrate with other libraries.",
        keyPoints: ["Progressive framework", "Component-based", "Template syntax", "Easy learning curve"],
        codeExample: "const { createApp } = Vue;\n\ncreateApp({\n  data() {\n    return {\n      message: 'Hello Vue!'\n    }\n  }\n}).mount('#app')",
        exercise: "Create a simple Vue.js application with data binding and event handling."
      }]
    },
    {
      id: "angular-intro", 
      name: "Angular",
      level: "Introduction",
      icon: <Globe className="h-8 w-8" />,
      color: "from-red-500 to-red-600",
      description: "Full-featured frontend framework",
      slides: [{
        title: "What is Angular?",
        content: "Angular is a platform and framework for building single-page client applications using HTML and TypeScript. It provides a comprehensive solution with routing, forms, HTTP client, and more.",
        keyPoints: ["Full framework", "TypeScript by default", "Dependency injection", "Two-way data binding"],
        codeExample: "import { Component } from '@angular/core';\n\n@Component({\n  selector: 'app-hello',\n  template: '<h1>{{title}}</h1>'\n})\nexport class HelloComponent {\n  title = 'Hello Angular!';\n}",
        exercise: "Install Angular CLI and create your first Angular application."
      }]
    },
    {
      id: "tailwind-intro",
      name: "Tailwind CSS",
      level: "Introduction", 
      icon: <Globe className="h-8 w-8" />,
      color: "from-teal-400 to-teal-500",
      description: "Utility-first CSS framework",
      slides: [{
        title: "What is Tailwind CSS?",
        content: "Tailwind CSS is a utility-first CSS framework that provides low-level utility classes to build custom designs directly in your markup without writing custom CSS.",
        keyPoints: ["Utility-first approach", "Highly customizable", "Responsive design", "Component-friendly"],
        codeExample: "<!-- Tailwind CSS example -->\n<div class=\"bg-blue-500 text-white p-4 rounded-lg shadow-lg\">\n  <h2 class=\"text-2xl font-bold mb-2\">Card Title</h2>\n  <p class=\"text-blue-100\">This is a card built with Tailwind CSS utilities.</p>\n</div>",
        exercise: "Install Tailwind CSS and create a responsive card component using utility classes."
      }]
    },
    {
      id: "sass-intro",
      name: "Sass/SCSS",
      level: "Introduction",
      icon: <Globe className="h-8 w-8" />,
      color: "from-pink-400 to-pink-500",
      description: "CSS preprocessing",
      slides: [{
        title: "What is Sass?",
        content: "Sass (Syntactically Awesome StyleSheets) is a CSS preprocessor that adds features like variables, nesting, mixins, and functions to CSS, making stylesheets more maintainable and powerful.",
        keyPoints: ["Variables and nesting", "Mixins and functions", "Modular CSS", "Compiles to CSS"],
        codeExample: "$primary-color: #3498db;\n$margin: 16px;\n\n.card {\n  background-color: $primary-color;\n  margin: $margin;\n  \n  &:hover {\n    transform: scale(1.05);\n  }\n  \n  .title {\n    font-weight: bold;\n  }\n}",
        exercise: "Install Sass and create a stylesheet with variables, nesting, and mixins."
      }]
    },
    // Backend Technologies
    {
      id: "express-intro",
      name: "Express.js",
      level: "Introduction",
      icon: <Database className="h-8 w-8" />,
      color: "from-gray-600 to-gray-700",
      description: "Fast Node.js web framework",
      slides: [{
        title: "What is Express.js?",
        content: "Express.js is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications. It's the de facto standard server framework for Node.js.",
        keyPoints: ["Minimal and fast", "Middleware support", "Routing", "Template engines"],
        codeExample: "const express = require('express');\nconst app = express();\n\napp.get('/', (req, res) => {\n  res.send('Hello Express!');\n});\n\napp.listen(3000, () => {\n  console.log('Server running on port 3000');\n});",
        exercise: "Create an Express server with multiple routes and middleware."
      }]
    },
    {
      id: "django-intro",
      name: "Django",
      level: "Introduction",
      icon: <Database className="h-8 w-8" />,
      color: "from-green-600 to-green-700",
      description: "Python web framework",
      slides: [{
        title: "What is Django?",
        content: "Django is a high-level Python web framework that encourages rapid development and clean, pragmatic design. It follows the 'batteries included' philosophy with built-in admin, ORM, and security features.",
        keyPoints: ["Batteries included", "ORM built-in", "Admin interface", "Security focused"],
        codeExample: "# views.py\nfrom django.http import HttpResponse\n\ndef hello_world(request):\n    return HttpResponse('Hello Django!')\n\n# urls.py\nfrom django.urls import path\nfrom . import views\n\nurlpatterns = [\n    path('', views.hello_world, name='hello'),\n]",
        exercise: "Install Django and create your first Django project with a simple view."
      }]
    },
    {
      id: "flask-intro",
      name: "Flask",
      level: "Introduction",
      icon: <Database className="h-8 w-8" />,
      color: "from-blue-600 to-blue-700",
      description: "Lightweight Python web framework",
      slides: [{
        title: "What is Flask?",
        content: "Flask is a lightweight and flexible Python web framework that provides the basic tools needed to build web applications. It's minimalist by design and gives developers freedom to structure their applications.",
        keyPoints: ["Lightweight and flexible", "Minimalist design", "Easy to get started", "Extensible with plugins"],
        codeExample: "from flask import Flask\n\napp = Flask(__name__)\n\n@app.route('/')\ndef hello_world():\n    return 'Hello, Flask!'\n\n@app.route('/user/<name>')\ndef show_user(name):\n    return f'Hello, {name}!'\n\nif __name__ == '__main__':\n    app.run(debug=True)",
        exercise: "Install Flask and create a simple web application with multiple routes."
      }]
    },
    {
      id: "mongodb-intro",
      name: "MongoDB",
      level: "Introduction",
      icon: <Database className="h-8 w-8" />,
      color: "from-green-500 to-green-600",
      description: "NoSQL document database",
      slides: [{
        title: "What is MongoDB?",
        content: "MongoDB is a NoSQL document database that stores data in flexible, JSON-like documents. It's designed for scalability and developer productivity, making it popular for modern web applications.",
        keyPoints: ["Document-based", "Schema-less", "Scalable", "JSON-like documents"],
        codeExample: "// MongoDB query examples\ndb.users.insertOne({\n  name: \"John Doe\",\n  email: \"john@example.com\",\n  age: 30\n});\n\ndb.users.find({ age: { $gte: 18 } });",
        exercise: "Install MongoDB and practice basic CRUD operations using the MongoDB shell."
      }]
    },
    {
      id: "postgresql-intro",
      name: "PostgreSQL",
      level: "Introduction",
      icon: <Database className="h-8 w-8" />,
      color: "from-blue-500 to-indigo-600",
      description: "Advanced SQL database",
      slides: [{
        title: "What is PostgreSQL?",
        content: "PostgreSQL is a powerful, open-source relational database system with advanced features like JSON support, full-text search, and custom data types. It's known for its reliability and standards compliance.",
        keyPoints: ["ACID compliant", "Advanced SQL features", "JSON support", "Extensible"],
        codeExample: "-- Create a table\nCREATE TABLE users (\n    id SERIAL PRIMARY KEY,\n    name VARCHAR(100) NOT NULL,\n    email VARCHAR(100) UNIQUE,\n    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP\n);\n\n-- Insert data\nINSERT INTO users (name, email) VALUES ('John Doe', 'john@example.com');\n\n-- Query data\nSELECT * FROM users WHERE name LIKE 'John%';",
        exercise: "Install PostgreSQL and create your first database with tables and relationships."
      }]
    },
    // Data Analysis
    {
      id: "pandas-intro",
      name: "Pandas",
      level: "Introduction",
      icon: <BookOpen className="h-8 w-8" />,
      color: "from-blue-600 to-purple-600",
      description: "Data manipulation and analysis",
      slides: [{
        title: "What is Pandas?",
        content: "Pandas is a powerful Python library for data manipulation and analysis. It provides data structures like DataFrame and Series, along with tools for reading, writing, and transforming data from various sources.",
        keyPoints: ["Data manipulation", "DataFrame and Series", "File I/O support", "Data cleaning tools"],
        codeExample: "import pandas as pd\n\n# Create a DataFrame\ndf = pd.DataFrame({\n    'Name': ['Alice', 'Bob', 'Charlie'],\n    'Age': [25, 30, 35],\n    'City': ['New York', 'London', 'Tokyo']\n})\n\n# Basic operations\nprint(df.head())\nprint(df.describe())",
        exercise: "Install pandas and create a DataFrame from a CSV file, then perform basic data exploration."
      }]
    },
    {
      id: "numpy-intro",
      name: "NumPy",
      level: "Introduction", 
      icon: <BookOpen className="h-8 w-8" />,
      color: "from-blue-500 to-blue-700",
      description: "Numerical computing with Python",
      slides: [{
        title: "What is NumPy?",
        content: "NumPy is the fundamental package for scientific computing in Python. It provides support for large, multi-dimensional arrays and matrices, along with mathematical functions to operate on them efficiently.",
        keyPoints: ["N-dimensional arrays", "Mathematical functions", "Broadcasting", "Foundation for other libraries"],
        codeExample: "import numpy as np\n\n# Create arrays\narr = np.array([1, 2, 3, 4, 5])\nmatrix = np.array([[1, 2], [3, 4]])\n\n# Mathematical operations\nprint(arr * 2)\nprint(np.mean(arr))\nprint(np.dot(matrix, matrix))",
        exercise: "Create NumPy arrays and perform mathematical operations like matrix multiplication."
      }]
    },
    {
      id: "matplotlib-intro",
      name: "Matplotlib",
      level: "Introduction",
      icon: <BookOpen className="h-8 w-8" />,
      color: "from-red-400 to-pink-500",
      description: "Data visualization with Python",
      slides: [{
        title: "What is Matplotlib?",
        content: "Matplotlib is a comprehensive library for creating static, animated, and interactive visualizations in Python. It provides a MATLAB-like interface for plotting and is highly customizable.",
        keyPoints: ["2D plotting library", "MATLAB-like interface", "Highly customizable", "Multiple output formats"],
        codeExample: "import matplotlib.pyplot as plt\nimport numpy as np\n\n# Create sample data\nx = np.linspace(0, 10, 100)\ny = np.sin(x)\n\n# Create plot\nplt.plot(x, y)\nplt.title('Sine Wave')\nplt.xlabel('X values')\nplt.ylabel('Y values')\nplt.show()",
        exercise: "Create different types of plots: line plot, bar chart, and histogram using matplotlib."
      }]
    },
    {
      id: "seaborn-intro",
      name: "Seaborn",
      level: "Introduction",
      icon: <BookOpen className="h-8 w-8" />,
      color: "from-purple-400 to-purple-600",
      description: "Statistical data visualization",
      slides: [{
        title: "What is Seaborn?",
        content: "Seaborn is a Python data visualization library based on matplotlib that provides a high-level interface for drawing attractive and informative statistical graphics with simple commands.",
        keyPoints: ["Built on matplotlib", "Statistical visualizations", "Beautiful default themes", "Easy to use"],
        codeExample: "import seaborn as sns\nimport matplotlib.pyplot as plt\n\n# Load built-in dataset\ntips = sns.load_dataset('tips')\n\n# Create visualizations\nsns.boxplot(data=tips, x='day', y='total_bill')\nplt.title('Total Bill by Day')\nplt.show()\n\n# Correlation heatmap\nsns.heatmap(tips.corr(), annot=True)",
        exercise: "Install seaborn and create different statistical plots using built-in datasets."
      }]
    },
    // Data Structures and Algorithms
    {
      id: "dsa-intro",
      name: "Data Structures",
      level: "Introduction",
      icon: <Cpu className="h-8 w-8" />,
      color: "from-indigo-500 to-purple-600",
      description: "Fundamental data structures",
      slides: [{
        title: "What are Data Structures?",
        content: "Data structures are ways of organizing and storing data so that it can be accessed and modified efficiently. Different data structures excel in different scenarios, making the choice of structure crucial for performance.",
        keyPoints: ["Arrays and Lists", "Stacks and Queues", "Trees and Graphs", "Hash Tables"],
        codeExample: "# Array/List example\nnumbers = [1, 2, 3, 4, 5]\nnumbers.append(6)  # O(1)\nprint(numbers[0])   # O(1)\n\n# Stack example using list\nstack = []\nstack.append(1)     # push\nstack.append(2)\ntop = stack.pop()   # pop\n\n# Queue example\nfrom collections import deque\nqueue = deque()\nqueue.append(1)     # enqueue\nfirst = queue.popleft()  # dequeue",
        exercise: "Implement basic operations for array, stack, and queue data structures."
      }]
    },
    {
      id: "algorithms-intro",
      name: "Algorithms",
      level: "Introduction",
      icon: <Cpu className="h-8 w-8" />,
      color: "from-purple-500 to-pink-600", 
      description: "Problem-solving algorithms",
      slides: [{
        title: "What are Algorithms?",
        content: "Algorithms are step-by-step procedures for solving problems or performing tasks. Understanding algorithms helps you write efficient code and solve complex problems systematically.",
        keyPoints: ["Sorting algorithms", "Searching algorithms", "Time complexity (Big O)", "Space complexity"],
        codeExample: "# Binary Search Algorithm\ndef binary_search(arr, target):\n    left, right = 0, len(arr) - 1\n    \n    while left <= right:\n        mid = (left + right) // 2\n        if arr[mid] == target:\n            return mid\n        elif arr[mid] < target:\n            left = mid + 1\n        else:\n            right = mid - 1\n    return -1\n\n# Usage\nsorted_array = [1, 3, 5, 7, 9, 11]\nresult = binary_search(sorted_array, 7)",
        exercise: "Implement bubble sort and linear search algorithms, then compare their performance."
      }]
    },
    {
      id: "trees-intro",
      name: "Trees & Graphs",
      level: "Introduction",
      icon: <Cpu className="h-8 w-8" />,
      color: "from-green-500 to-teal-600",
      description: "Tree and graph data structures",
      slides: [{
        title: "What are Trees and Graphs?",
        content: "Trees are hierarchical data structures with nodes connected by edges, while graphs are more general structures that can have cycles. Both are fundamental for solving complex problems in computer science.",
        keyPoints: ["Binary trees", "Tree traversal", "Graph representation", "Graph algorithms"],
        codeExample: "# Simple binary tree node\nclass TreeNode:\n    def __init__(self, val=0):\n        self.val = val\n        self.left = None\n        self.right = None\n\n# Tree traversal (inorder)\ndef inorder_traversal(root):\n    if root:\n        inorder_traversal(root.left)\n        print(root.val)\n        inorder_traversal(root.right)\n\n# Graph representation using adjacency list\ngraph = {\n    'A': ['B', 'C'],\n    'B': ['D', 'E'],\n    'C': ['F']\n}",
        exercise: "Implement a binary tree and perform different traversal methods (inorder, preorder, postorder)."
      }]
    },
    // Machine Learning and AI
    {
      id: "ml-intro", 
      name: "Machine Learning",
      level: "Introduction",
      icon: <Cpu className="h-8 w-8" />,
      color: "from-emerald-500 to-teal-600",
      description: "Introduction to machine learning",
      slides: [{
        title: "What is Machine Learning?",
        content: "Machine Learning is a subset of artificial intelligence that enables computers to learn and make decisions from data without being explicitly programmed. It's used in recommendation systems, image recognition, and predictive analytics.",
        keyPoints: ["Supervised learning", "Unsupervised learning", "Feature engineering", "Model evaluation"],
        codeExample: "# Simple linear regression example\nfrom sklearn.linear_model import LinearRegression\nimport numpy as np\n\n# Sample data\nX = np.array([[1], [2], [3], [4], [5]])\ny = np.array([2, 4, 6, 8, 10])\n\n# Create and train model\nmodel = LinearRegression()\nmodel.fit(X, y)\n\n# Make prediction\nprediction = model.predict([[6]])\nprint(f'Predicted value: {prediction[0]}')",
        exercise: "Install scikit-learn and create a simple linear regression model with sample data."
      }]
    },
    {
      id: "tensorflow-intro",
      name: "TensorFlow",
      level: "Introduction", 
      icon: <Cpu className="h-8 w-8" />,
      color: "from-orange-400 to-red-500",
      description: "Deep learning with TensorFlow",
      slides: [{
        title: "What is TensorFlow?",
        content: "TensorFlow is an open-source machine learning framework developed by Google. It's designed for building and training neural networks for deep learning applications like image recognition and natural language processing.",
        keyPoints: ["Neural networks", "Deep learning", "GPU acceleration", "Production deployment"],
        codeExample: "import tensorflow as tf\n\n# Create a simple neural network\nmodel = tf.keras.Sequential([\n    tf.keras.layers.Dense(128, activation='relu'),\n    tf.keras.layers.Dense(10, activation='softmax')\n])\n\n# Compile the model\nmodel.compile(\n    optimizer='adam',\n    loss='sparse_categorical_crossentropy',\n    metrics=['accuracy']\n)",
        exercise: "Install TensorFlow and create a simple neural network for classification."
      }]
    },
    {
      id: "pytorch-intro",
      name: "PyTorch",
      level: "Introduction",
      icon: <Cpu className="h-8 w-8" />,
      color: "from-red-500 to-orange-500",
      description: "Dynamic neural networks",
      slides: [{
        title: "What is PyTorch?",
        content: "PyTorch is an open-source machine learning library developed by Meta that provides a flexible and intuitive way to build neural networks. It's popular in research due to its dynamic computation graphs.",
        keyPoints: ["Dynamic computation graphs", "Research-friendly", "Pythonic interface", "Strong community"],
        codeExample: "import torch\nimport torch.nn as nn\n\n# Simple neural network\nclass SimpleNet(nn.Module):\n    def __init__(self):\n        super(SimpleNet, self).__init__()\n        self.fc1 = nn.Linear(784, 128)\n        self.fc2 = nn.Linear(128, 10)\n        self.relu = nn.ReLU()\n    \n    def forward(self, x):\n        x = self.relu(self.fc1(x))\n        x = self.fc2(x)\n        return x\n\nmodel = SimpleNet()",
        exercise: "Install PyTorch and create a simple neural network model."
      }]
    },
    // Data Science and AI  
    {
      id: "datascience-intro",
      name: "Data Science",
      level: "Introduction",
      icon: <BookOpen className="h-8 w-8" />,
      color: "from-cyan-500 to-blue-600",
      description: "Data science fundamentals",
      slides: [{
        title: "What is Data Science?",
        content: "Data Science is an interdisciplinary field that combines statistics, programming, and domain expertise to extract insights from data. It involves collecting, cleaning, analyzing, and visualizing data to inform decision-making.",
        keyPoints: ["Data collection and cleaning", "Statistical analysis", "Data visualization", "Predictive modeling"],
        codeExample: "import pandas as pd\nimport matplotlib.pyplot as plt\nimport seaborn as sns\n\n# Load and explore data\ndf = pd.read_csv('data.csv')\nprint(df.info())\nprint(df.describe())\n\n# Create visualizations\nplt.figure(figsize=(10, 6))\nsns.histplot(df['column_name'])\nplt.title('Distribution of Data')\nplt.show()",
        exercise: "Load a dataset, perform exploratory data analysis, and create visualizations."
      }]
    },
    {
      id: "jupyter-intro",
      name: "Jupyter Notebooks", 
      level: "Introduction",
      icon: <BookOpen className="h-8 w-8" />,
      color: "from-yellow-500 to-orange-500",
      description: "Interactive data science environment",
      slides: [{
        title: "What are Jupyter Notebooks?",
        content: "Jupyter Notebooks are interactive computing environments that allow you to combine code, text, equations, and visualizations in a single document. They're essential tools for data science, research, and prototyping.",
        keyPoints: ["Interactive computing", "Mix code and documentation", "Data visualization", "Easy sharing"],
        codeExample: "# In a Jupyter cell\nimport pandas as pd\nimport numpy as np\n\n# Create sample data\ndata = {\n    'name': ['Alice', 'Bob', 'Charlie'],\n    'score': [85, 92, 78]\n}\ndf = pd.DataFrame(data)\n\n# Display the DataFrame\ndf.head()",
        exercise: "Install Jupyter and create your first notebook with code, markdown, and visualizations."
      }]
    },
    {
      id: "sklearn-intro",
      name: "Scikit-Learn",
      level: "Introduction",
      icon: <Cpu className="h-8 w-8" />,
      color: "from-orange-400 to-yellow-500",
      description: "Machine learning in Python",
      slides: [{
        title: "What is Scikit-Learn?",
        content: "Scikit-Learn is a comprehensive machine learning library for Python that provides simple and efficient tools for data mining and analysis. It's built on NumPy, SciPy, and matplotlib.",
        keyPoints: ["Classification algorithms", "Regression models", "Clustering methods", "Model evaluation tools"],
        codeExample: "from sklearn.datasets import load_iris\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.ensemble import RandomForestClassifier\nfrom sklearn.metrics import accuracy_score\n\n# Load data\niris = load_iris()\nX_train, X_test, y_train, y_test = train_test_split(\n    iris.data, iris.target, test_size=0.2\n)\n\n# Train model\nmodel = RandomForestClassifier()\nmodel.fit(X_train, y_train)\n\n# Evaluate\naccuracy = accuracy_score(y_test, model.predict(X_test))",
        exercise: "Use scikit-learn to build and evaluate a classification model on the iris dataset."
      }]
    },
    {
      id: "web-development-fullstack",
      name: "Full-Stack Development",
      level: "Intermediate",
      icon: <Globe className="h-8 w-8" />,
      color: "from-purple-500 to-pink-500",
      description: "Building complete web applications",
      slides: [{
        title: "Understanding Full-Stack Development",
        content: "Full-stack development involves working with both frontend (client-side) and backend (server-side) technologies to build complete web applications. A full-stack developer understands how all parts of a web application work together, from user interface to database.",
        keyPoints: [
          "Frontend handles user interface and user experience",
          "Backend manages data, business logic, and APIs",
          "Database stores and retrieves application data",
          "APIs connect frontend and backend systems",
          "DevOps handles deployment and infrastructure"
        ],
        codeExample: `// Full-stack architecture overview
// Frontend (React component)
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    // API call to backend
    fetch(\`/api/users/\${userId}\`)
      .then(response => response.json())
      .then(userData => setUser(userData));
  }, [userId]);
  
  return (
    <div>
      {user && (
        <div>
          <h2>{user.name}</h2>
          <p>Email: {user.email}</p>
        </div>
      )}
    </div>
  );
}

// Backend (Express.js API)
app.get('/api/users/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'User not found' });
  }
});

// Database schema (MongoDB/Mongoose)
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now }
});`,
        exercise: "Design a simple full-stack application architecture. Choose your frontend framework, backend technology, and database, then plan how they will communicate."
      }, {
        title: "RESTful API Design and Implementation",
        content: "REST (Representational State Transfer) is an architectural style for designing web APIs that are scalable, stateless, and use standard HTTP methods. Understanding RESTful principles is essential for creating APIs that are intuitive and maintainable.",
        keyPoints: [
          "Uses HTTP methods: GET, POST, PUT, DELETE",
          "Resources are identified by URLs",
          "Stateless communication between client and server",
          "Consistent response formats (usually JSON)",
          "Status codes indicate operation results"
        ],
        codeExample: `// RESTful API endpoints example
const express = require('express');
const app = express();

// Middleware
app.use(express.json());

// GET /api/users - Get all users
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json({
      success: true,
      data: users,
      count: users.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch users'
    });
  }
});

// POST /api/users - Create new user
app.post('/api/users', async (req, res) => {
  try {
    const { name, email } = req.body;
    const newUser = new User({ name, email });
    await newUser.save();
    res.status(201).json({
      success: true,
      data: newUser
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: 'Invalid user data'
    });
  }
});

// PUT /api/users/:id - Update user
app.put('/api/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    res.json({ success: true, data: user });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: 'Update failed'
    });
  }
});`,
        exercise: "Create a RESTful API for a blog application with endpoints for posts and comments. Include proper error handling and status codes."
      }, {
        title: "Database Integration and Data Modeling",
        content: "Integrating databases with your web application involves understanding data modeling, relationships between entities, and how to efficiently store and retrieve data. Whether using SQL or NoSQL databases, proper data design is crucial for application performance.",
        keyPoints: [
          "Choose between SQL (relational) and NoSQL (document) databases",
          "Design schemas that reflect your application's data needs",
          "Understand relationships: one-to-one, one-to-many, many-to-many",
          "Use database queries and aggregations effectively",
          "Implement data validation and constraints"
        ],
        codeExample: `// MongoDB/Mongoose data modeling example
const mongoose = require('mongoose');

// User schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
    minlength: 3,
    maxlength: 20
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    match: [/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/, 'Invalid email format']
  },
  posts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Post schema with relationships
const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    maxlength: 100
  },
  content: {
    type: String,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  tags: [String],
  comments: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    text: String,
    createdAt: {
      type: Date,
      default: Date.now
    }
  }]
});`,
        exercise: "Design a database schema for an e-commerce application including users, products, orders, and reviews. Implement the models and basic CRUD operations."
      }]
    }
  ];

  const filteredLanguages = languages.filter(language => 
    language.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    language.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    language.level.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const groupedLanguages = filteredLanguages.reduce((acc, language) => {
    if (!acc[language.name]) {
      acc[language.name] = [];
    }
    acc[language.name].push(language);
    return acc;
  }, {} as Record<string, Language[]>);

  const selectedLang = languages.find(lang => lang.id === selectedLanguage);

  const nextSlide = () => {
    if (selectedLang && currentSlide < selectedLang.slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const goBackToLanguages = () => {
    setSelectedLanguage(null);
    setCurrentSlide(0);
  };

  const markLanguageCompleted = () => {
    if (selectedLang && currentSlide === selectedLang.slides.length - 1) {
      setCompletedLanguages(prev => new Set([...prev, selectedLang.id]));
    }
  };

  const goToQuiz = () => {
    if (selectedLang) {
      markLanguageCompleted();
      navigate('/quiz');
    }
  };

  if (selectedLang) {
    return (
      <div className="min-h-screen bg-background text-foreground py-8 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Back Button */}
          <Button variant="ghost" onClick={goBackToLanguages} className="mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Courses
          </Button>

          {/* Course Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              {selectedLang.name} - {selectedLang.level}
            </h1>
            <p className="text-muted-foreground">{selectedLang.description}</p>
          </div>

          <Card className="bg-card border-2 border-border min-h-[700px] shadow-2xl">
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-4xl font-bold text-foreground mb-4">
                {selectedLang.slides[currentSlide].title}
              </CardTitle>
              <Badge variant="outline" className="text-lg px-4 py-2">
                Lesson {currentSlide + 1} of {selectedLang.slides.length}
              </Badge>
            </CardHeader>
            <CardContent className="space-y-8 px-8 pb-8">
              {/* Main Content */}
              <div className="prose prose-lg max-w-none">
                <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                  {selectedLang.slides[currentSlide].content}
                </p>
              </div>

              {/* Key Points Section */}
              {selectedLang.slides[currentSlide].keyPoints && (
                <div className="bg-muted border border-border rounded-xl p-6">
                  <h4 className="text-2xl font-semibold mb-6 text-blue-400 flex items-center">
                    🎯 Key Learning Points
                  </h4>
                  <ul className="space-y-4">
                    {selectedLang.slides[currentSlide].keyPoints!.map((point, index) => (
                      <li key={index} className="flex items-start space-x-4">
                        <div className="w-3 h-3 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-lg text-muted-foreground">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Code Example Section */}
              {selectedLang.slides[currentSlide].codeExample && (
                <div className="bg-muted border-2 border-border rounded-xl overflow-hidden">
                  <div className="bg-muted/50 px-6 py-3 border-b border-border">
                    <h4 className="text-xl font-semibold text-foreground flex items-center">
                      💻 Code Example
                    </h4>
                  </div>
                  <div className="p-6">
                    <pre className="text-sm overflow-x-auto bg-background p-4 rounded-lg border border-border">
                      <code className="text-green-400 whitespace-pre-wrap">
                        {selectedLang.slides[currentSlide].codeExample}
                      </code>
                    </pre>
                  </div>
                </div>
              )}

              {/* Exercise Section */}
              {selectedLang.slides[currentSlide].exercise && (
                <div className="bg-muted border-2 border-border rounded-xl p-6">
                  <h4 className="text-xl font-semibold mb-4 text-green-400 flex items-center">
                    💡 Try It Yourself
                  </h4>
                  <p className="text-lg text-muted-foreground">
                    {selectedLang.slides[currentSlide].exercise}
                  </p>
                </div>
              )}
              
              {/* Navigation Controls */}
              <div className="flex justify-between items-center pt-8 border-t border-border">
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={prevSlide} 
                  disabled={currentSlide === 0}
                  className="text-lg px-2 md:px-6 py-3"
                >
                  <ChevronLeft className="h-5 w-5 md:mr-2" />
                  <span className="hidden md:inline">Previous Lesson</span>
                </Button>
                
                {/* Progress Indicator */}
                <div className="flex items-center">
                  <span className="text-sm text-muted-foreground">
                    {currentSlide + 1}/{selectedLang.slides.length}
                  </span>
                </div>

                {currentSlide === selectedLang.slides.length - 1 ? (
                  <Button 
                    onClick={goToQuiz} 
                    size="lg"
                    className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-lg px-6 py-3"
                  >
                    🎯 Take Quiz
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Button>
                ) : (
                  <Button 
                    onClick={nextSlide}
                    size="lg"
                    className="text-lg px-2 md:px-6 py-3"
                  >
                    <span className="hidden md:inline">Next Lesson</span>
                    <ChevronRight className="h-5 w-5 md:ml-2" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
        <AIAssistant />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Home Button */}
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="mb-4"
        >
          <Home className="h-4 w-4 mr-2" />
          Home
        </Button>
        
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <BookOpen className="h-12 w-12 text-foreground mr-3" />
            <h1 className="text-4xl font-bold text-foreground">Learn Programming</h1>
          </div>
          <p className="text-xl text-muted-foreground mb-8">
            Master programming languages with our comprehensive, interactive courses
          </p>
          
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search languages or levels..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="space-y-12">
          {Object.entries(groupedLanguages).map(([techName, courses]) => (
            <div key={techName}>
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center">
                <span className="text-foreground">{courses[0].icon}</span>
                <span className="ml-3">{techName}</span>
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {courses
                  .filter(course => 
                    course.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                    course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    course.level.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map((course) => (
                     <Card 
                       key={course.id}
                       className="group hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2 bg-card border-2 border-border hover:border-border/80"
                       onClick={() => setSelectedLanguage(course.id)}
                     >
                       <CardHeader className="text-center p-4">
                         <div className={`w-12 h-12 mx-auto bg-gradient-to-r ${course.color} rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                           {course.icon}
                         </div>
                         <CardTitle className="text-lg text-foreground">
                           {course.level}
                         </CardTitle>
                         <CardDescription className="text-muted-foreground text-sm">
                           {course.description}
                         </CardDescription>
                       </CardHeader>
                       <CardContent className="text-center p-4 pt-0">
                         <Badge 
                           variant="secondary" 
                           className="mb-2 text-xs px-2 py-1"
                         >
                           {course.slides.length} Lessons
                         </Badge>
                         {completedLanguages.has(course.id) && (
                           <Badge variant="default" className="ml-2 bg-green-500 text-xs">
                             ✅ Done
                           </Badge>
                         )}
                       </CardContent>
                     </Card>
                  ))}
              </div>
            </div>
          ))}
        </div>

        {filteredLanguages.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              No courses found matching your search.
            </p>
          </div>
        )}
      </div>
      <AIAssistant />
    </div>
  );
};

export default Learn;
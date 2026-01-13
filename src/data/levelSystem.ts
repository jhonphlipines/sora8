export interface Level {
  id: string;
  level: number;
  name: string;
  description: string;
  requiredScore: number;
  timeLimit: number; // in seconds
  questions: string[]; // question IDs from the main quiz data
  badge: {
    name: string;
    icon: string;
    color: string;
  };
  prerequisites?: string[]; // previous level IDs required
}

export interface LevelCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  levels: Level[];
}

export interface UserProgress {
  completedLevels: string[];
  badges: string[];
  scores: Record<string, number>;
  attempts: Record<string, number>;
}

// JavaScript Level System
const javascriptLevels: Level[] = [
  {
    id: "js-level-1",
    level: 1,
    name: "Beginner Basics",
    description: "Variables, data types, and basic operators",
    requiredScore: 70,
    timeLimit: 300, // 5 minutes
    questions: ["js1", "js2", "js3", "js4", "js5"],
    badge: {
      name: "JS Starter",
      icon: "🌱",
      color: "from-green-400 to-emerald-500"
    }
  },
  {
    id: "js-level-2",
    level: 2,
    name: "Control Flow",
    description: "Conditional statements and loops",
    requiredScore: 70,
    timeLimit: 420, // 7 minutes
    questions: ["js6", "js7", "js8", "js9", "js10", "js11", "js12"],
    badge: {
      name: "Flow Master",
      icon: "🌊",
      color: "from-blue-400 to-cyan-500"
    },
    prerequisites: ["js-level-1"]
  },
  {
    id: "js-level-3",
    level: 3,
    name: "Functions & Scope",
    description: "Function declarations, expressions, and scope",
    requiredScore: 75,
    timeLimit: 480, // 8 minutes
    questions: ["js13", "js14", "js15", "js16", "js17", "js18"],
    badge: {
      name: "Function Expert",
      icon: "⚡",
      color: "from-yellow-400 to-orange-500"
    },
    prerequisites: ["js-level-2"]
  },
  {
    id: "js-level-4",
    level: 4,
    name: "Arrays & Objects",
    description: "Working with arrays and objects",
    requiredScore: 75,
    timeLimit: 540, // 9 minutes
    questions: ["js19", "js20", "js21", "js22", "js23", "js24", "js25"],
    badge: {
      name: "Data Structures Pro",
      icon: "📚",
      color: "from-purple-400 to-pink-500"
    },
    prerequisites: ["js-level-3"]
  },
  {
    id: "js-level-5",
    level: 5,
    name: "DOM Manipulation",
    description: "Document Object Model and events",
    requiredScore: 80,
    timeLimit: 600, // 10 minutes
    questions: ["js26", "js27", "js28", "js29", "js30", "js31"],
    badge: {
      name: "DOM Wizard",
      icon: "🎭",
      color: "from-indigo-400 to-purple-500"
    },
    prerequisites: ["js-level-4"]
  },
  {
    id: "js-level-6",
    level: 6,
    name: "ES6+ Features",
    description: "Modern JavaScript features",
    requiredScore: 80,
    timeLimit: 660, // 11 minutes
    questions: ["js32", "js33", "js34", "js35", "js36", "js37", "js38"],
    badge: {
      name: "Modern JS Expert",
      icon: "🚀",
      color: "from-red-400 to-pink-500"
    },
    prerequisites: ["js-level-5"]
  },
  {
    id: "js-level-7",
    level: 7,
    name: "Async Programming",
    description: "Promises, async/await, and callbacks",
    requiredScore: 85,
    timeLimit: 720, // 12 minutes
    questions: ["js39", "js40", "js41", "js42", "js43", "js44"],
    badge: {
      name: "Async Master",
      icon: "⏳",
      color: "from-teal-400 to-blue-500"
    },
    prerequisites: ["js-level-6"]
  },
  {
    id: "js-level-8",
    level: 8,
    name: "Error Handling",
    description: "Try-catch blocks and error management",
    requiredScore: 85,
    timeLimit: 540, // 9 minutes
    questions: ["js45", "js46", "js47", "js48", "js49"],
    badge: {
      name: "Error Handler",
      icon: "🛡️",
      color: "from-orange-400 to-red-500"
    },
    prerequisites: ["js-level-7"]
  },
  {
    id: "js-level-9",
    level: 9,
    name: "Classes & OOP",
    description: "Object-oriented programming in JavaScript",
    requiredScore: 85,
    timeLimit: 780, // 13 minutes
    questions: ["js50", "js51", "js52", "js53", "js54", "js55", "js56"],
    badge: {
      name: "OOP Champion",
      icon: "🏛️",
      color: "from-violet-400 to-purple-500"
    },
    prerequisites: ["js-level-8"]
  },
  {
    id: "js-level-10",
    level: 10,
    name: "Advanced Concepts",
    description: "Closures, prototypes, and advanced patterns",
    requiredScore: 90,
    timeLimit: 900, // 15 minutes
    questions: ["js57", "js58", "js59", "js60", "js61", "js62", "js63", "js64"],
    badge: {
      name: "JS Grandmaster",
      icon: "👑",
      color: "from-amber-400 to-yellow-500"
    },
    prerequisites: ["js-level-9"]
  },
  {
    id: "js-level-11",
    level: 11,
    name: "Modules & Import/Export",
    description: "ES6 modules, CommonJS, and module bundling",
    requiredScore: 90,
    timeLimit: 780, // 13 minutes
    questions: ["js65", "js66", "js67", "js68", "js69", "js70"],
    badge: {
      name: "Module Master",
      icon: "📦",
      color: "from-cyan-400 to-blue-500"
    },
    prerequisites: ["js-level-10"]
  },
  {
    id: "js-level-12",
    level: 12,
    name: "Regular Expressions",
    description: "Pattern matching and text processing with regex",
    requiredScore: 85,
    timeLimit: 660, // 11 minutes
    questions: ["js71", "js72", "js73", "js74", "js75"],
    badge: {
      name: "Regex Expert",
      icon: "🔍",
      color: "from-emerald-400 to-teal-500"
    },
    prerequisites: ["js-level-11"]
  },
  {
    id: "js-level-13",
    level: 13,
    name: "Browser APIs",
    description: "Web APIs, localStorage, fetch, and more",
    requiredScore: 85,
    timeLimit: 720, // 12 minutes
    questions: ["js76", "js77", "js78", "js79", "js80", "js81"],
    badge: {
      name: "API Navigator",
      icon: "🌐",
      color: "from-indigo-400 to-purple-500"
    },
    prerequisites: ["js-level-12"]
  },
  {
    id: "js-level-14",
    level: 14,
    name: "Performance & Optimization",
    description: "Code optimization and performance best practices",
    requiredScore: 90,
    timeLimit: 840, // 14 minutes
    questions: ["js82", "js83", "js84", "js85", "js86", "js87"],
    badge: {
      name: "Speed Demon",
      icon: "⚡",
      color: "from-yellow-400 to-orange-500"
    },
    prerequisites: ["js-level-13"]
  },
  {
    id: "js-level-15",
    level: 15,
    name: "Testing & Debugging",
    description: "Unit testing, debugging techniques, and tools",
    requiredScore: 90,
    timeLimit: 780, // 13 minutes
    questions: ["js88", "js89", "js90", "js91", "js92"],
    badge: {
      name: "Bug Hunter",
      icon: "🐛",
      color: "from-red-400 to-pink-500"
    },
    prerequisites: ["js-level-14"]
  },
  {
    id: "js-level-16",
    level: 16,
    name: "Node.js Fundamentals",
    description: "Server-side JavaScript with Node.js",
    requiredScore: 85,
    timeLimit: 900, // 15 minutes
    questions: ["js93", "js94", "js95", "js96", "js97", "js98"],
    badge: {
      name: "Node Ninja",
      icon: "🟢",
      color: "from-green-400 to-emerald-500"
    },
    prerequisites: ["js-level-15"]
  },
  {
    id: "js-level-17",
    level: 17,
    name: "Package Management",
    description: "npm, package.json, and dependency management",
    requiredScore: 85,
    timeLimit: 660, // 11 minutes
    questions: ["js99", "js100", "js101", "js102", "js103"],
    badge: {
      name: "Package Pro",
      icon: "📦",
      color: "from-blue-400 to-cyan-500"
    },
    prerequisites: ["js-level-16"]
  },
  {
    id: "js-level-18",
    level: 18,
    name: "Design Patterns",
    description: "Common JavaScript design patterns and architectures",
    requiredScore: 90,
    timeLimit: 960, // 16 minutes
    questions: ["js104", "js105", "js106", "js107", "js108", "js109"],
    badge: {
      name: "Pattern Master",
      icon: "🎨",
      color: "from-purple-400 to-pink-500"
    },
    prerequisites: ["js-level-17"]
  },
  {
    id: "js-level-19",
    level: 19,
    name: "Security & Best Practices",
    description: "JavaScript security, XSS prevention, and best practices",
    requiredScore: 90,
    timeLimit: 840, // 14 minutes
    questions: ["js110", "js111", "js112", "js113", "js114"],
    badge: {
      name: "Security Guardian",
      icon: "🛡️",
      color: "from-orange-400 to-red-500"
    },
    prerequisites: ["js-level-18"]
  },
  {
    id: "js-level-20",
    level: 20,
    name: "Framework Mastery",
    description: "Advanced concepts for modern JS frameworks",
    requiredScore: 95,
    timeLimit: 1080, // 18 minutes
    questions: ["js115", "js116", "js117", "js118", "js119", "js120"],
    badge: {
      name: "JS Architect",
      icon: "🏆",
      color: "from-amber-400 to-yellow-500"
    },
    prerequisites: ["js-level-19"]
  }
];

// Python Level System
const pythonLevels: Level[] = [
  {
    id: "py-level-1",
    level: 1,
    name: "Python Basics",
    description: "Variables, print, and basic syntax",
    requiredScore: 70,
    timeLimit: 300,
    questions: ["py1", "py2", "py3", "py4", "py5"],
    badge: {
      name: "Python Rookie",
      icon: "🐍",
      color: "from-green-400 to-emerald-500"
    }
  },
  {
    id: "py-level-2",
    level: 2,
    name: "Data Types",
    description: "Lists, tuples, dictionaries, and sets",
    requiredScore: 70,
    timeLimit: 420,
    questions: ["py6", "py7", "py8", "py9", "py10", "py11", "py12"],
    badge: {
      name: "Data Type Master",
      icon: "📊",
      color: "from-blue-400 to-cyan-500"
    },
    prerequisites: ["py-level-1"]
  },
  {
    id: "py-level-3",
    level: 3,
    name: "Control Structures",
    description: "Loops, conditionals, and flow control",
    requiredScore: 75,
    timeLimit: 480,
    questions: ["py13", "py14", "py15", "py16", "py17", "py18"],
    badge: {
      name: "Control Expert",
      icon: "🎮",
      color: "from-purple-400 to-pink-500"
    },
    prerequisites: ["py-level-2"]
  },
  {
    id: "py-level-4",
    level: 4,
    name: "Functions",
    description: "Function definition and scope",
    requiredScore: 75,
    timeLimit: 540,
    questions: ["py19", "py20", "py21", "py22", "py23", "py24", "py25"],
    badge: {
      name: "Function Guru",
      icon: "⚙️",
      color: "from-orange-400 to-red-500"
    },
    prerequisites: ["py-level-3"]
  },
  {
    id: "py-level-5",
    level: 5,
    name: "String Operations",
    description: "String methods and manipulation",
    requiredScore: 80,
    timeLimit: 600,
    questions: ["py26", "py27", "py28", "py29", "py30", "py31"],
    badge: {
      name: "String Wizard",
      icon: "🔤",
      color: "from-teal-400 to-blue-500"
    },
    prerequisites: ["py-level-4"]
  },
  {
    id: "py-level-6",
    level: 6,
    name: "Error Handling",
    description: "Exception handling and debugging",
    requiredScore: 80,
    timeLimit: 660,
    questions: ["py32", "py33", "py34", "py35", "py36", "py37", "py38"],
    badge: {
      name: "Debug Master",
      icon: "🔧",
      color: "from-red-400 to-pink-500"
    },
    prerequisites: ["py-level-5"]
  },
  {
    id: "py-level-7",
    level: 7,
    name: "File Operations",
    description: "Reading and writing files",
    requiredScore: 85,
    timeLimit: 720,
    questions: ["py39", "py40", "py41", "py42", "py43", "py44"],
    badge: {
      name: "File Handler",
      icon: "📁",
      color: "from-indigo-400 to-purple-500"
    },
    prerequisites: ["py-level-6"]
  },
  {
    id: "py-level-8",
    level: 8,
    name: "Object-Oriented",
    description: "Classes and object-oriented programming",
    requiredScore: 85,
    timeLimit: 780,
    questions: ["py45", "py46", "py47", "py48", "py49", "py50", "py51"],
    badge: {
      name: "OOP Master",
      icon: "🏗️",
      color: "from-violet-400 to-purple-500"
    },
    prerequisites: ["py-level-7"]
  },
  {
    id: "py-level-9",
    level: 9,
    name: "Advanced Topics",
    description: "Decorators, generators, and advanced concepts",
    requiredScore: 90,
    timeLimit: 840,
    questions: ["py52", "py53", "py54", "py55", "py56", "py57", "py58"],
    badge: {
      name: "Python Expert",
      icon: "🎯",
      color: "from-amber-400 to-yellow-500"
    },
    prerequisites: ["py-level-8"]
  },
  {
    id: "py-level-10",
    level: 10,
    name: "Python Mastery",
    description: "Complex algorithms and optimization",
    requiredScore: 95,
    timeLimit: 900,
    questions: ["py59", "py60", "py61", "py62", "py63", "py64", "py65"],
    badge: {
      name: "Python Grandmaster",
      icon: "👑",
      color: "from-yellow-400 to-orange-500"
    },
    prerequisites: ["py-level-9"]
  },
  {
    id: "py-level-11",
    level: 11,
    name: "Modules & Packages",
    description: "Import systems, packages, and module creation",
    requiredScore: 90,
    timeLimit: 780,
    questions: ["py66", "py67", "py68", "py69", "py70", "py71"],
    badge: {
      name: "Module Master",
      icon: "📦",
      color: "from-cyan-400 to-blue-500"
    },
    prerequisites: ["py-level-10"]
  },
  {
    id: "py-level-12",
    level: 12,
    name: "Regular Expressions",
    description: "Pattern matching and text processing with regex",
    requiredScore: 85,
    timeLimit: 660,
    questions: ["py72", "py73", "py74", "py75", "py76"],
    badge: {
      name: "Regex Expert",
      icon: "🔍",
      color: "from-emerald-400 to-teal-500"
    },
    prerequisites: ["py-level-11"]
  },
  {
    id: "py-level-13",
    level: 13,
    name: "Web Development",
    description: "Flask, Django basics, and web frameworks",
    requiredScore: 85,
    timeLimit: 720,
    questions: ["py77", "py78", "py79", "py80", "py81", "py82"],
    badge: {
      name: "Web Developer",
      icon: "🌐",
      color: "from-indigo-400 to-purple-500"
    },
    prerequisites: ["py-level-12"]
  },
  {
    id: "py-level-14",
    level: 14,
    name: "Data Science Basics",
    description: "NumPy, Pandas, and data manipulation",
    requiredScore: 90,
    timeLimit: 840,
    questions: ["py83", "py84", "py85", "py86", "py87", "py88"],
    badge: {
      name: "Data Scientist",
      icon: "📊",
      color: "from-yellow-400 to-orange-500"
    },
    prerequisites: ["py-level-13"]
  },
  {
    id: "py-level-15",
    level: 15,
    name: "Testing & Debugging",
    description: "Unit testing, pytest, and debugging techniques",
    requiredScore: 90,
    timeLimit: 780,
    questions: ["py89", "py90", "py91", "py92", "py93"],
    badge: {
      name: "Test Master",
      icon: "🧪",
      color: "from-red-400 to-pink-500"
    },
    prerequisites: ["py-level-14"]
  },
  {
    id: "py-level-16",
    level: 16,
    name: "Database Integration",
    description: "SQLite, ORM, and database operations",
    requiredScore: 85,
    timeLimit: 900,
    questions: ["py94", "py95", "py96", "py97", "py98", "py99"],
    badge: {
      name: "Database Pro",
      icon: "🗄️",
      color: "from-green-400 to-emerald-500"
    },
    prerequisites: ["py-level-15"]
  },
  {
    id: "py-level-17",
    level: 17,
    name: "API Development",
    description: "REST APIs, JSON handling, and web services",
    requiredScore: 85,
    timeLimit: 660,
    questions: ["py100", "py101", "py102", "py103", "py104"],
    badge: {
      name: "API Architect",
      icon: "🔗",
      color: "from-blue-400 to-cyan-500"
    },
    prerequisites: ["py-level-16"]
  },
  {
    id: "py-level-18",
    level: 18,
    name: "Machine Learning",
    description: "Scikit-learn, ML algorithms, and model building",
    requiredScore: 90,
    timeLimit: 960,
    questions: ["py105", "py106", "py107", "py108", "py109", "py110"],
    badge: {
      name: "ML Engineer",
      icon: "🤖",
      color: "from-purple-400 to-pink-500"
    },
    prerequisites: ["py-level-17"]
  },
  {
    id: "py-level-19",
    level: 19,
    name: "Performance & Security",
    description: "Code optimization, security, and best practices",
    requiredScore: 90,
    timeLimit: 840,
    questions: ["py111", "py112", "py113", "py114", "py115"],
    badge: {
      name: "Security Expert",
      icon: "🛡️",
      color: "from-orange-400 to-red-500"
    },
    prerequisites: ["py-level-18"]
  },
  {
    id: "py-level-20",
    level: 20,
    name: "Python Architect",
    description: "Advanced patterns, concurrency, and system design",
    requiredScore: 95,
    timeLimit: 1080,
    questions: ["py116", "py117", "py118", "py119", "py120", "py121"],
    badge: {
      name: "Python Architect",
      icon: "🏆",
      color: "from-amber-400 to-yellow-500"
    },
    prerequisites: ["py-level-19"]
  }
];

// React Level System
const reactLevels: Level[] = [
  {
    id: "react-level-1",
    level: 1,
    name: "React Basics",
    description: "Components and JSX fundamentals",
    requiredScore: 70,
    timeLimit: 300,
    questions: ["react1", "react2", "react3", "react4", "react5"],
    badge: {
      name: "React Newbie",
      icon: "⚛️",
      color: "from-cyan-400 to-blue-500"
    }
  },
  {
    id: "react-level-2",
    level: 2,
    name: "Props & State",
    description: "Component props and state management",
    requiredScore: 75,
    timeLimit: 420,
    questions: ["react6", "react7", "react8", "react9", "react10", "react11"],
    badge: {
      name: "State Manager",
      icon: "🔄",
      color: "from-blue-400 to-indigo-500"
    },
    prerequisites: ["react-level-1"]
  },
  {
    id: "react-level-3",
    level: 3,
    name: "Event Handling",
    description: "User interactions and event handling",
    requiredScore: 75,
    timeLimit: 480,
    questions: ["react12", "react13", "react14", "react15", "react16"],
    badge: {
      name: "Event Master",
      icon: "👆",
      color: "from-purple-400 to-pink-500"
    },
    prerequisites: ["react-level-2"]
  },
  {
    id: "react-level-4",
    level: 4,
    name: "Lifecycle Methods",
    description: "Component lifecycle and useEffect",
    requiredScore: 80,
    timeLimit: 540,
    questions: ["react17", "react18", "react19", "react20", "react21", "react22"],
    badge: {
      name: "Lifecycle Expert",
      icon: "🔄",
      color: "from-green-400 to-teal-500"
    },
    prerequisites: ["react-level-3"]
  },
  {
    id: "react-level-5",
    level: 5,
    name: "Hooks Mastery",
    description: "useState, useEffect, and custom hooks",
    requiredScore: 85,
    timeLimit: 600,
    questions: ["react23", "react24", "react25", "react26", "react27"],
    badge: {
      name: "Hooks Master",
      icon: "🪝",
      color: "from-orange-400 to-red-500"
    },
    prerequisites: ["react-level-4"]
  },
  {
    id: "react-level-6",
    level: 6,
    name: "Forms & Controlled Components",
    description: "Form handling, validation, and controlled inputs",
    requiredScore: 85,
    timeLimit: 660,
    questions: ["react28", "react29", "react30", "react31", "react32", "react33"],
    badge: {
      name: "Form Master",
      icon: "📝",
      color: "from-yellow-400 to-orange-500"
    },
    prerequisites: ["react-level-5"]
  },
  {
    id: "react-level-7",
    level: 7,
    name: "Context API & State Management",
    description: "React Context, state lifting, and component communication",
    requiredScore: 85,
    timeLimit: 720,
    questions: ["react34", "react35", "react36", "react37", "react38"],
    badge: {
      name: "Context Expert",
      icon: "🌐",
      color: "from-emerald-400 to-green-500"
    },
    prerequisites: ["react-level-6"]
  },
  {
    id: "react-level-8",
    level: 8,
    name: "React Router",
    description: "Client-side routing and navigation",
    requiredScore: 90,
    timeLimit: 780,
    questions: ["react39", "react40", "react41", "react42", "react43", "react44"],
    badge: {
      name: "Router Pro",
      icon: "🧭",
      color: "from-indigo-400 to-purple-500"
    },
    prerequisites: ["react-level-7"]
  },
  {
    id: "react-level-9",
    level: 9,
    name: "Performance Optimization",
    description: "React.memo, useMemo, useCallback, and optimization techniques",
    requiredScore: 90,
    timeLimit: 840,
    questions: ["react45", "react46", "react47", "react48", "react49"],
    badge: {
      name: "Performance Guru",
      icon: "⚡",
      color: "from-cyan-400 to-blue-500"
    },
    prerequisites: ["react-level-8"]
  },
  {
    id: "react-level-10",
    level: 10,
    name: "Advanced Hooks",
    description: "useReducer, useRef, useLayoutEffect, and custom hook patterns",
    requiredScore: 90,
    timeLimit: 900,
    questions: ["react50", "react51", "react52", "react53", "react54", "react55"],
    badge: {
      name: "Hook Architect",
      icon: "🏗️",
      color: "from-violet-400 to-purple-500"
    },
    prerequisites: ["react-level-9"]
  },
  {
    id: "react-level-11",
    level: 11,
    name: "Testing React Components",
    description: "Jest, React Testing Library, and component testing strategies",
    requiredScore: 85,
    timeLimit: 840,
    questions: ["react56", "react57", "react58", "react59", "react60"],
    badge: {
      name: "Test Engineer",
      icon: "🧪",
      color: "from-lime-400 to-green-500"
    },
    prerequisites: ["react-level-10"]
  },
  {
    id: "react-level-12",
    level: 12,
    name: "Error Boundaries & Error Handling",
    description: "Error boundaries, error handling patterns, and debugging",
    requiredScore: 85,
    timeLimit: 720,
    questions: ["react61", "react62", "react63", "react64", "react65"],
    badge: {
      name: "Error Handler",
      icon: "🛠️",
      color: "from-red-400 to-pink-500"
    },
    prerequisites: ["react-level-11"]
  },
  {
    id: "react-level-13",
    level: 13,
    name: "Server-Side Rendering (SSR)",
    description: "SSR concepts, hydration, and Next.js fundamentals",
    requiredScore: 90,
    timeLimit: 960,
    questions: ["react66", "react67", "react68", "react69", "react70", "react71"],
    badge: {
      name: "SSR Specialist",
      icon: "🖥️",
      color: "from-slate-400 to-gray-600"
    },
    prerequisites: ["react-level-12"]
  },
  {
    id: "react-level-14",
    level: 14,
    name: "State Management Libraries",
    description: "Redux, Zustand, and external state management solutions",
    requiredScore: 90,
    timeLimit: 1020,
    questions: ["react72", "react73", "react74", "react75", "react76"],
    badge: {
      name: "State Architect",
      icon: "🏛️",
      color: "from-purple-400 to-indigo-500"
    },
    prerequisites: ["react-level-13"]
  },
  {
    id: "react-level-15",
    level: 15,
    name: "React Patterns & Architecture",
    description: "Design patterns, component composition, and architectural best practices",
    requiredScore: 95,
    timeLimit: 1080,
    questions: ["react77", "react78", "react79", "react80", "react81", "react82"],
    badge: {
      name: "React Master",
      icon: "🏆",
      color: "from-amber-400 to-yellow-500"
    },
    prerequisites: ["react-level-14"]
  }
];

// Java Level System
const javaLevels: Level[] = [
  {
    id: "java-level-1",
    level: 1,
    name: "Java Fundamentals",
    description: "Variables, data types, and basic syntax",
    requiredScore: 70,
    timeLimit: 300,
    questions: ["java1", "java2", "java3", "java4", "java5"],
    badge: {
      name: "Java Beginner",
      icon: "☕",
      color: "from-orange-400 to-red-500"
    }
  },
  {
    id: "java-level-2",
    level: 2,
    name: "Control Flow",
    description: "Conditional statements and loops",
    requiredScore: 70,
    timeLimit: 420,
    questions: ["java6", "java7", "java8", "java9", "java10"],
    badge: {
      name: "Control Master",
      icon: "🔄",
      color: "from-red-400 to-pink-500"
    },
    prerequisites: ["java-level-1"]
  },
  {
    id: "java-level-3",
    level: 3,
    name: "Object-Oriented Programming",
    description: "Classes, objects, and inheritance",
    requiredScore: 75,
    timeLimit: 540,
    questions: ["java11", "java12", "java13", "java14", "java15"],
    badge: {
      name: "OOP Expert",
      icon: "🏗️",
      color: "from-blue-400 to-indigo-500"
    },
    prerequisites: ["java-level-2"]
  },
  {
    id: "java-level-4",
    level: 4,
    name: "Advanced OOP",
    description: "Polymorphism, encapsulation, and interfaces",
    requiredScore: 80,
    timeLimit: 600,
    questions: ["java16", "java17", "java18", "java19", "java20"],
    badge: {
      name: "Java Architect",
      icon: "🏛️",
      color: "from-purple-400 to-pink-500"
    },
    prerequisites: ["java-level-3"]
  },
  {
    id: "java-level-5",
    level: 5,
    name: "Collections & Generics",
    description: "ArrayList, HashMap, and generic programming",
    requiredScore: 85,
    timeLimit: 720,
    questions: ["java21", "java22", "java23", "java24", "java25"],
    badge: {
      name: "Collections Master",
      icon: "📚",
      color: "from-green-400 to-teal-500"
    },
    prerequisites: ["java-level-4"]
  }
];

// TypeScript Level System
const typescriptLevels: Level[] = [
  {
    id: "ts-level-1",
    level: 1,
    name: "TypeScript Basics",
    description: "Basic types and type annotations",
    requiredScore: 70,
    timeLimit: 300,
    questions: ["ts1", "ts2", "ts3", "ts4", "ts5"],
    badge: {
      name: "TS Beginner",
      icon: "🔷",
      color: "from-blue-400 to-cyan-500"
    }
  },
  {
    id: "ts-level-2",
    level: 2,
    name: "Interfaces & Types",
    description: "Custom types and interfaces",
    requiredScore: 75,
    timeLimit: 420,
    questions: ["ts6", "ts7", "ts8", "ts9", "ts10"],
    badge: {
      name: "Type Designer",
      icon: "🎨",
      color: "from-cyan-400 to-blue-500"
    },
    prerequisites: ["ts-level-1"]
  },
  {
    id: "ts-level-3",
    level: 3,
    name: "Generics & Utilities",
    description: "Generic types and utility types",
    requiredScore: 80,
    timeLimit: 540,
    questions: ["ts11", "ts12", "ts13", "ts14", "ts15"],
    badge: {
      name: "Generic Master",
      icon: "⚡",
      color: "from-indigo-400 to-purple-500"
    },
    prerequisites: ["ts-level-2"]
  },
  {
    id: "ts-level-4",
    level: 4,
    name: "Advanced Types",
    description: "Conditional types and mapped types",
    requiredScore: 85,
    timeLimit: 600,
    questions: ["ts16", "ts17", "ts18", "ts19", "ts20"],
    badge: {
      name: "Type Wizard",
      icon: "🧙‍♂️",
      color: "from-purple-400 to-pink-500"
    },
    prerequisites: ["ts-level-3"]
  }
];

// Go Level System
const goLevels: Level[] = [
  {
    id: "go-level-1",
    level: 1,
    name: "Go Fundamentals",
    description: "Variables, functions, and basic syntax",
    requiredScore: 70,
    timeLimit: 300,
    questions: ["go1", "go2", "go3", "go4", "go5"],
    badge: {
      name: "Go Gopher",
      icon: "🐹",
      color: "from-cyan-400 to-blue-500"
    }
  },
  {
    id: "go-level-2",
    level: 2,
    name: "Structs & Methods",
    description: "Custom types and methods",
    requiredScore: 75,
    timeLimit: 420,
    questions: ["go6", "go7", "go8", "go9", "go10"],
    badge: {
      name: "Struct Builder",
      icon: "🏗️",
      color: "from-blue-400 to-indigo-500"
    },
    prerequisites: ["go-level-1"]
  },
  {
    id: "go-level-3",
    level: 3,
    name: "Concurrency Basics",
    description: "Goroutines and channels fundamentals",
    requiredScore: 80,
    timeLimit: 540,
    questions: ["go11", "go12", "go13", "go14", "go15"],
    badge: {
      name: "Concurrency Starter",
      icon: "🔀",
      color: "from-green-400 to-teal-500"
    },
    prerequisites: ["go-level-2"]
  },
  {
    id: "go-level-4",
    level: 4,
    name: "Interfaces",
    description: "Interface design and implementation",
    requiredScore: 80,
    timeLimit: 600,
    questions: ["go16", "go17", "go18", "go19", "go20"],
    badge: {
      name: "Interface Master",
      icon: "🔌",
      color: "from-purple-400 to-pink-500"
    },
    prerequisites: ["go-level-3"]
  },
  {
    id: "go-level-5",
    level: 5,
    name: "Error Handling",
    description: "Errors, panics, and recovery",
    requiredScore: 85,
    timeLimit: 600,
    questions: ["go21", "go22", "go23", "go24", "go25"],
    badge: {
      name: "Error Handler",
      icon: "🛡️",
      color: "from-red-400 to-orange-500"
    },
    prerequisites: ["go-level-4"]
  },
  {
    id: "go-level-6",
    level: 6,
    name: "Packages & Modules",
    description: "Module management and package design",
    requiredScore: 85,
    timeLimit: 660,
    questions: ["go26", "go27", "go28", "go29", "go30"],
    badge: {
      name: "Package Pro",
      icon: "📦",
      color: "from-yellow-400 to-orange-500"
    },
    prerequisites: ["go-level-5"]
  },
  {
    id: "go-level-7",
    level: 7,
    name: "Advanced Concurrency",
    description: "Select, sync, and concurrent patterns",
    requiredScore: 85,
    timeLimit: 720,
    questions: ["go31", "go32", "go33", "go34", "go35"],
    badge: {
      name: "Concurrency Expert",
      icon: "⚡",
      color: "from-indigo-400 to-purple-500"
    },
    prerequisites: ["go-level-6"]
  },
  {
    id: "go-level-8",
    level: 8,
    name: "Testing & Benchmarking",
    description: "Unit tests, benchmarks, and profiling",
    requiredScore: 85,
    timeLimit: 720,
    questions: ["go36", "go37", "go38", "go39", "go40"],
    badge: {
      name: "Test Master",
      icon: "🧪",
      color: "from-teal-400 to-cyan-500"
    },
    prerequisites: ["go-level-7"]
  },
  {
    id: "go-level-9",
    level: 9,
    name: "Web Development",
    description: "HTTP servers, routing, and middleware",
    requiredScore: 90,
    timeLimit: 780,
    questions: ["go41", "go42", "go43", "go44", "go45"],
    badge: {
      name: "Web Gopher",
      icon: "🌐",
      color: "from-blue-400 to-cyan-500"
    },
    prerequisites: ["go-level-8"]
  },
  {
    id: "go-level-10",
    level: 10,
    name: "Go Mastery",
    description: "Advanced patterns and best practices",
    requiredScore: 95,
    timeLimit: 900,
    questions: ["go46", "go47", "go48", "go49", "go50"],
    badge: {
      name: "Go Grandmaster",
      icon: "👑",
      color: "from-amber-400 to-yellow-500"
    },
    prerequisites: ["go-level-9"]
  }
];

// Swift Level System
const swiftLevels: Level[] = [
  {
    id: "swift-level-1",
    level: 1,
    name: "Swift Basics",
    description: "Variables, constants, and basic syntax",
    requiredScore: 70,
    timeLimit: 300,
    questions: ["swift1", "swift2", "swift3", "swift4", "swift5"],
    badge: {
      name: "Swift Starter",
      icon: "🦉",
      color: "from-orange-400 to-red-500"
    }
  },
  {
    id: "swift-level-2",
    level: 2,
    name: "Optionals & Safety",
    description: "Optional values and safe programming",
    requiredScore: 75,
    timeLimit: 420,
    questions: ["swift6", "swift7", "swift8", "swift9", "swift10"],
    badge: {
      name: "Safety Expert",
      icon: "🛡️",
      color: "from-red-400 to-pink-500"
    },
    prerequisites: ["swift-level-1"]
  },
  {
    id: "swift-level-3",
    level: 3,
    name: "Collections",
    description: "Arrays, dictionaries, and sets",
    requiredScore: 75,
    timeLimit: 480,
    questions: ["swift11", "swift12", "swift13", "swift14", "swift15"],
    badge: {
      name: "Collection Master",
      icon: "📚",
      color: "from-blue-400 to-cyan-500"
    },
    prerequisites: ["swift-level-2"]
  },
  {
    id: "swift-level-4",
    level: 4,
    name: "Functions & Closures",
    description: "Function syntax and closures",
    requiredScore: 80,
    timeLimit: 540,
    questions: ["swift16", "swift17", "swift18", "swift19", "swift20"],
    badge: {
      name: "Closure Expert",
      icon: "⚡",
      color: "from-yellow-400 to-orange-500"
    },
    prerequisites: ["swift-level-3"]
  },
  {
    id: "swift-level-5",
    level: 5,
    name: "Classes & Structs",
    description: "Object-oriented programming in Swift",
    requiredScore: 80,
    timeLimit: 600,
    questions: ["swift21", "swift22", "swift23", "swift24", "swift25"],
    badge: {
      name: "OOP Master",
      icon: "🏗️",
      color: "from-purple-400 to-pink-500"
    },
    prerequisites: ["swift-level-4"]
  },
  {
    id: "swift-level-6",
    level: 6,
    name: "Protocols & Extensions",
    description: "Protocol-oriented programming",
    requiredScore: 85,
    timeLimit: 660,
    questions: ["swift26", "swift27", "swift28", "swift29", "swift30"],
    badge: {
      name: "Protocol Pro",
      icon: "📋",
      color: "from-indigo-400 to-purple-500"
    },
    prerequisites: ["swift-level-5"]
  },
  {
    id: "swift-level-7",
    level: 7,
    name: "Error Handling",
    description: "Throwing, catching, and propagating errors",
    requiredScore: 85,
    timeLimit: 660,
    questions: ["swift31", "swift32", "swift33", "swift34", "swift35"],
    badge: {
      name: "Error Handler",
      icon: "🔧",
      color: "from-red-400 to-orange-500"
    },
    prerequisites: ["swift-level-6"]
  },
  {
    id: "swift-level-8",
    level: 8,
    name: "Generics",
    description: "Generic functions, types, and constraints",
    requiredScore: 85,
    timeLimit: 720,
    questions: ["swift36", "swift37", "swift38", "swift39", "swift40"],
    badge: {
      name: "Generic Guru",
      icon: "🎯",
      color: "from-teal-400 to-blue-500"
    },
    prerequisites: ["swift-level-7"]
  },
  {
    id: "swift-level-9",
    level: 9,
    name: "Concurrency",
    description: "Async/await and structured concurrency",
    requiredScore: 90,
    timeLimit: 780,
    questions: ["swift41", "swift42", "swift43", "swift44", "swift45"],
    badge: {
      name: "Async Master",
      icon: "⏳",
      color: "from-cyan-400 to-blue-500"
    },
    prerequisites: ["swift-level-8"]
  },
  {
    id: "swift-level-10",
    level: 10,
    name: "Swift Mastery",
    description: "Advanced patterns and iOS development",
    requiredScore: 95,
    timeLimit: 900,
    questions: ["swift46", "swift47", "swift48", "swift49", "swift50"],
    badge: {
      name: "Swift Grandmaster",
      icon: "👑",
      color: "from-amber-400 to-yellow-500"
    },
    prerequisites: ["swift-level-9"]
  }
];

// C++ Level System
const cppLevels: Level[] = [
  {
    id: "cpp-level-1",
    level: 1,
    name: "C++ Fundamentals",
    description: "Variables, data types, and basic I/O",
    requiredScore: 70,
    timeLimit: 300,
    questions: ["cpp1", "cpp2", "cpp3", "cpp4", "cpp5"],
    badge: {
      name: "C++ Beginner",
      icon: "⚙️",
      color: "from-gray-400 to-blue-500"
    }
  },
  {
    id: "cpp-level-2",
    level: 2,
    name: "Control Structures",
    description: "Loops, conditionals, and flow control",
    requiredScore: 75,
    timeLimit: 420,
    questions: ["cpp6", "cpp7", "cpp8", "cpp9", "cpp10"],
    badge: {
      name: "Control Expert",
      icon: "🎮",
      color: "from-blue-400 to-cyan-500"
    },
    prerequisites: ["cpp-level-1"]
  },
  {
    id: "cpp-level-3",
    level: 3,
    name: "Functions",
    description: "Function overloading and recursion",
    requiredScore: 75,
    timeLimit: 480,
    questions: ["cpp11", "cpp12", "cpp13", "cpp14", "cpp15"],
    badge: {
      name: "Function Pro",
      icon: "⚡",
      color: "from-yellow-400 to-orange-500"
    },
    prerequisites: ["cpp-level-2"]
  },
  {
    id: "cpp-level-4",
    level: 4,
    name: "Pointers & References",
    description: "Memory addresses and references",
    requiredScore: 80,
    timeLimit: 540,
    questions: ["cpp16", "cpp17", "cpp18", "cpp19", "cpp20"],
    badge: {
      name: "Pointer Master",
      icon: "🎯",
      color: "from-purple-400 to-pink-500"
    },
    prerequisites: ["cpp-level-3"]
  },
  {
    id: "cpp-level-5",
    level: 5,
    name: "Dynamic Memory",
    description: "Heap allocation and memory management",
    requiredScore: 80,
    timeLimit: 600,
    questions: ["cpp21", "cpp22", "cpp23", "cpp24", "cpp25"],
    badge: {
      name: "Memory Manager",
      icon: "🧠",
      color: "from-blue-400 to-indigo-500"
    },
    prerequisites: ["cpp-level-4"]
  },
  {
    id: "cpp-level-6",
    level: 6,
    name: "OOP Basics",
    description: "Classes, objects, and encapsulation",
    requiredScore: 85,
    timeLimit: 660,
    questions: ["cpp26", "cpp27", "cpp28", "cpp29", "cpp30"],
    badge: {
      name: "OOP Starter",
      icon: "🏗️",
      color: "from-green-400 to-teal-500"
    },
    prerequisites: ["cpp-level-5"]
  },
  {
    id: "cpp-level-7",
    level: 7,
    name: "Inheritance & Polymorphism",
    description: "Class hierarchies and virtual functions",
    requiredScore: 85,
    timeLimit: 720,
    questions: ["cpp31", "cpp32", "cpp33", "cpp34", "cpp35"],
    badge: {
      name: "OOP Master",
      icon: "🏛️",
      color: "from-indigo-400 to-purple-500"
    },
    prerequisites: ["cpp-level-6"]
  },
  {
    id: "cpp-level-8",
    level: 8,
    name: "Templates",
    description: "Generic programming with templates",
    requiredScore: 85,
    timeLimit: 720,
    questions: ["cpp36", "cpp37", "cpp38", "cpp39", "cpp40"],
    badge: {
      name: "Template Guru",
      icon: "📐",
      color: "from-cyan-400 to-blue-500"
    },
    prerequisites: ["cpp-level-7"]
  },
  {
    id: "cpp-level-9",
    level: 9,
    name: "STL & Containers",
    description: "Standard Template Library and containers",
    requiredScore: 90,
    timeLimit: 780,
    questions: ["cpp41", "cpp42", "cpp43", "cpp44", "cpp45"],
    badge: {
      name: "STL Expert",
      icon: "📚",
      color: "from-orange-400 to-red-500"
    },
    prerequisites: ["cpp-level-8"]
  },
  {
    id: "cpp-level-10",
    level: 10,
    name: "C++ Mastery",
    description: "Modern C++ and advanced patterns",
    requiredScore: 95,
    timeLimit: 900,
    questions: ["cpp46", "cpp47", "cpp48", "cpp49", "cpp50"],
    badge: {
      name: "C++ Grandmaster",
      icon: "👑",
      color: "from-amber-400 to-yellow-500"
    },
    prerequisites: ["cpp-level-9"]
  }
];

// Rust Level System
const rustLevels: Level[] = [
  {
    id: "rust-level-1",
    level: 1,
    name: "Rust Basics",
    description: "Variables, functions, and ownership basics",
    requiredScore: 70,
    timeLimit: 360,
    questions: ["rust1", "rust2", "rust3", "rust4", "rust5"],
    badge: {
      name: "Rust Rookie",
      icon: "🦀",
      color: "from-orange-400 to-red-500"
    }
  },
  {
    id: "rust-level-2",
    level: 2,
    name: "Ownership & Borrowing",
    description: "Memory safety and borrowing rules",
    requiredScore: 75,
    timeLimit: 480,
    questions: ["rust6", "rust7", "rust8", "rust9", "rust10"],
    badge: {
      name: "Ownership Expert",
      icon: "🔒",
      color: "from-red-400 to-pink-500"
    },
    prerequisites: ["rust-level-1"]
  },
  {
    id: "rust-level-3",
    level: 3,
    name: "Structs & Enums",
    description: "Custom data types and pattern matching",
    requiredScore: 80,
    timeLimit: 540,
    questions: ["rust11", "rust12", "rust13", "rust14", "rust15"],
    badge: {
      name: "Type Master",
      icon: "🎯",
      color: "from-purple-400 to-pink-500"
    },
    prerequisites: ["rust-level-2"]
  },
  {
    id: "rust-level-4",
    level: 4,
    name: "Error Handling",
    description: "Result, Option, and panic handling",
    requiredScore: 80,
    timeLimit: 600,
    questions: ["rust16", "rust17", "rust18", "rust19", "rust20"],
    badge: {
      name: "Error Handler",
      icon: "🛡️",
      color: "from-yellow-400 to-orange-500"
    },
    prerequisites: ["rust-level-3"]
  },
  {
    id: "rust-level-5",
    level: 5,
    name: "Collections",
    description: "Vectors, HashMaps, and iterators",
    requiredScore: 80,
    timeLimit: 600,
    questions: ["rust21", "rust22", "rust23", "rust24", "rust25"],
    badge: {
      name: "Collection Pro",
      icon: "📚",
      color: "from-blue-400 to-cyan-500"
    },
    prerequisites: ["rust-level-4"]
  },
  {
    id: "rust-level-6",
    level: 6,
    name: "Traits & Generics",
    description: "Trait definitions and generic types",
    requiredScore: 85,
    timeLimit: 660,
    questions: ["rust26", "rust27", "rust28", "rust29", "rust30"],
    badge: {
      name: "Trait Master",
      icon: "⚡",
      color: "from-indigo-400 to-purple-500"
    },
    prerequisites: ["rust-level-5"]
  },
  {
    id: "rust-level-7",
    level: 7,
    name: "Lifetimes",
    description: "Lifetime annotations and references",
    requiredScore: 85,
    timeLimit: 720,
    questions: ["rust31", "rust32", "rust33", "rust34", "rust35"],
    badge: {
      name: "Lifetime Guru",
      icon: "⏳",
      color: "from-teal-400 to-blue-500"
    },
    prerequisites: ["rust-level-6"]
  },
  {
    id: "rust-level-8",
    level: 8,
    name: "Concurrency",
    description: "Threads, channels, and shared state",
    requiredScore: 85,
    timeLimit: 720,
    questions: ["rust36", "rust37", "rust38", "rust39", "rust40"],
    badge: {
      name: "Concurrency Expert",
      icon: "🔀",
      color: "from-green-400 to-teal-500"
    },
    prerequisites: ["rust-level-7"]
  },
  {
    id: "rust-level-9",
    level: 9,
    name: "Async Rust",
    description: "Async/await and futures",
    requiredScore: 90,
    timeLimit: 780,
    questions: ["rust41", "rust42", "rust43", "rust44", "rust45"],
    badge: {
      name: "Async Master",
      icon: "🚀",
      color: "from-cyan-400 to-blue-500"
    },
    prerequisites: ["rust-level-8"]
  },
  {
    id: "rust-level-10",
    level: 10,
    name: "Rust Mastery",
    description: "Unsafe Rust and advanced patterns",
    requiredScore: 95,
    timeLimit: 900,
    questions: ["rust46", "rust47", "rust48", "rust49", "rust50"],
    badge: {
      name: "Rust Grandmaster",
      icon: "👑",
      color: "from-amber-400 to-yellow-500"
    },
    prerequisites: ["rust-level-9"]
  }
];

// SVG Logo components for level categories
export const levelCategoryLogos: Record<string, string> = {
  javascript: `<svg viewBox="0 0 128 128"><path fill="#F0DB4F" d="M1.408 1.408h125.184v125.185H1.408z"/><path fill="#323330" d="M116.347 96.736c-.917-5.711-4.641-10.508-15.672-14.981-3.832-1.761-8.104-3.022-9.377-5.926-.452-1.69-.512-2.642-.226-3.665.821-3.32 4.784-4.355 7.925-3.403 2.023.678 3.938 2.237 5.093 4.724 5.402-3.498 5.391-3.475 9.163-5.879-1.381-2.141-2.118-3.129-3.022-4.045-3.249-3.629-7.676-5.498-14.756-5.355l-3.688.477c-3.534.893-6.902 2.748-8.877 5.235-5.926 6.724-4.236 18.492 2.975 23.335 7.104 5.332 17.54 6.545 18.873 11.531 1.297 6.104-4.486 8.08-10.234 7.378-4.236-.881-6.592-3.034-9.139-6.949-4.688 2.713-4.688 2.713-9.508 5.485 1.143 2.499 2.344 3.63 4.26 5.795 9.068 9.198 31.76 8.746 35.83-5.176.165-.478 1.261-3.666.38-8.581zM69.462 58.943H57.753l-.048 30.272c0 6.438.333 12.34-.714 14.149-1.713 3.558-6.152 3.117-8.175 2.427-2.059-1.012-3.106-2.451-4.319-4.485-.333-.584-.583-1.036-.667-1.071l-9.52 5.83c1.583 3.249 3.915 6.069 6.902 7.901 4.462 2.678 10.459 3.499 16.731 2.059 4.082-1.189 7.604-3.652 9.448-7.401 2.666-4.915 2.094-10.864 2.07-17.444.06-10.735.001-21.468.001-32.237z"/></svg>`,
  python: `<svg viewBox="0 0 128 128"><linearGradient id="python-original-a" gradientUnits="userSpaceOnUse" x1="70.252" y1="1237.476" x2="170.659" y2="1151.089" gradientTransform="matrix(.563 0 0 -.568 -29.215 707.817)"><stop offset="0" stop-color="#5A9FD4"/><stop offset="1" stop-color="#306998"/></linearGradient><linearGradient id="python-original-b" gradientUnits="userSpaceOnUse" x1="209.474" y1="1098.811" x2="173.62" y2="1149.537" gradientTransform="matrix(.563 0 0 -.568 -29.215 707.817)"><stop offset="0" stop-color="#FFD43B"/><stop offset="1" stop-color="#FFE873"/></linearGradient><path fill="url(#python-original-a)" d="M63.391 1.988c-4.222.02-8.252.379-11.8 1.007-10.45 1.846-12.346 5.71-12.346 12.837v9.411h24.693v3.137H29.977c-7.176 0-13.46 4.313-15.426 12.521-2.268 9.405-2.368 15.275 0 25.096 1.755 7.311 5.947 12.519 13.124 12.519h8.491V67.234c0-8.151 7.051-15.34 15.426-15.34h24.665c6.866 0 12.346-5.654 12.346-12.548V15.833c0-6.693-5.646-11.72-12.346-12.837-4.244-.706-8.645-1.027-12.866-1.008zM50.037 9.557c2.55 0 4.634 2.117 4.634 4.721 0 2.593-2.083 4.69-4.634 4.69-2.56 0-4.633-2.097-4.633-4.69-.001-2.604 2.073-4.721 4.633-4.721z" transform="translate(0 10.26)"/><path fill="url(#python-original-b)" d="M91.682 28.38v10.966c0 8.5-7.208 15.655-15.426 15.655H51.591c-6.756 0-12.346 5.783-12.346 12.549v23.515c0 6.691 5.818 10.628 12.346 12.547 7.816 2.297 15.312 2.713 24.665 0 6.216-1.801 12.346-5.423 12.346-12.547v-9.412H63.938v-3.138h37.012c7.176 0 9.852-5.005 12.348-12.519 2.578-7.735 2.467-15.174 0-25.096-1.774-7.145-5.161-12.521-12.348-12.521h-9.268zM77.809 87.927c2.561 0 4.634 2.097 4.634 4.692 0 2.602-2.074 4.719-4.634 4.719-2.55 0-4.633-2.117-4.633-4.719 0-2.595 2.083-4.692 4.633-4.692z" transform="translate(0 10.26)"/></svg>`,
  react: `<svg viewBox="0 0 128 128"><g fill="#61DAFB"><circle cx="64" cy="64" r="11.4"/><path d="M107.3 45.2c-2.2-.8-4.5-1.6-6.9-2.3.6-2.4 1.1-4.8 1.5-7.1 2.1-13.2-.2-22.5-6.6-26.1-1.9-1.1-4-1.6-6.4-1.6-7 0-15.9 5.2-24.9 13.9-9-8.7-17.9-13.9-24.9-13.9-2.4 0-4.5.5-6.4 1.6-6.4 3.7-8.7 13-6.6 26.1.4 2.3.9 4.7 1.5 7.1-2.4.7-4.7 1.4-6.9 2.3C8.2 50 1.4 56.6 1.4 64s6.9 14 19.3 18.8c2.2.8 4.5 1.6 6.9 2.3-.6 2.4-1.1 4.8-1.5 7.1-2.1 13.2.2 22.5 6.6 26.1 1.9 1.1 4 1.6 6.4 1.6 7.1 0 16-5.2 24.9-13.9 9 8.7 17.9 13.9 24.9 13.9 2.4 0 4.5-.5 6.4-1.6 6.4-3.7 8.7-13 6.6-26.1-.4-2.3-.9-4.7-1.5-7.1 2.4-.7 4.7-1.4 6.9-2.3 12.5-4.8 19.3-11.4 19.3-18.8s-6.8-14-19.3-18.8zM92.5 14.7c4.1 2.4 5.5 9.8 3.8 20.3-.3 2.1-.8 4.3-1.4 6.6-5.2-1.2-10.7-2-16.5-2.5-3.4-4.8-6.9-9.1-10.4-13 7.4-7.3 14.9-12.3 21-12.3 1.3 0 2.5.3 3.5.9zM81.3 74c-1.8 3.2-3.9 6.4-6.1 9.6-3.7.3-7.4.4-11.2.4-3.9 0-7.6-.1-11.2-.4-2.2-3.2-4.2-6.4-6-9.6-1.9-3.3-3.7-6.7-5.3-10 1.6-3.3 3.4-6.7 5.3-10 1.8-3.2 3.9-6.4 6.1-9.6 3.7-.3 7.4-.4 11.2-.4 3.9 0 7.6.1 11.2.4 2.2 3.2 4.2 6.4 6 9.6 1.9 3.3 3.7 6.7 5.3 10-1.7 3.3-3.4 6.6-5.3 10zm8.3-3.3c1.5 3.5 2.7 6.9 3.8 10.3-3.4.8-7 1.4-10.8 1.9 1.2-1.9 2.5-3.9 3.6-6 1.2-2.1 2.3-4.2 3.4-6.2zM64 97.8c-2.4-2.6-4.7-5.4-6.9-8.3 2.3.1 4.6.2 6.9.2 2.3 0 4.6-.1 6.9-.2-2.2 2.9-4.5 5.7-6.9 8.3zm-18.6-15c-3.8-.5-7.4-1.1-10.8-1.9 1.1-3.3 2.3-6.8 3.8-10.3 1.1 2 2.2 4.1 3.4 6.1 1.2 2.2 2.4 4.1 3.6 6.1zm-7-25.5c-1.5-3.5-2.7-6.9-3.8-10.3 3.4-.8 7-1.4 10.8-1.9-1.2 1.9-2.5 3.9-3.6 6-1.2 2.1-2.3 4.2-3.4 6.2zM64 30.2c2.4 2.6 4.7 5.4 6.9 8.3-2.3-.1-4.6-.2-6.9-.2-2.3 0-4.6.1-6.9.2 2.2-2.9 4.5-5.7 6.9-8.3zm22.2 21l-3.6-6c3.8.5 7.4 1.1 10.8 1.9-1.1 3.3-2.3 6.8-3.8 10.3-1.1-2.1-2.2-4.2-3.4-6.2zM31.7 35c-1.7-10.5-.3-17.9 3.8-20.3 1-.6 2.2-.9 3.5-.9 6 0 13.5 4.9 21 12.3-3.5 3.8-7 8.2-10.4 13-5.8.5-11.3 1.4-16.5 2.5-.6-2.3-1-4.5-1.4-6.6zM7 64c0-4.7 5.7-9.7 15.7-13.4 2-.8 4.2-1.5 6.4-2.1 1.6 5 3.6 10.3 6 15.6-2.4 5.3-4.5 10.5-6 15.5C15.3 75.6 7 69.6 7 64zm28.5 49.3c-4.1-2.4-5.5-9.8-3.8-20.3.3-2.1.8-4.3 1.4-6.6 5.2 1.2 10.7 2 16.5 2.5 3.4 4.8 6.9 9.1 10.4 13-7.4 7.3-14.9 12.3-21 12.3-1.3 0-2.5-.3-3.5-.9zM96.3 93c1.7 10.5.3 17.9-3.8 20.3-1 .6-2.2.9-3.5.9-6 0-13.5-4.9-21-12.3 3.5-3.8 7-8.2 10.4-13 5.8-.5 11.3-1.4 16.5-2.5.6 2.3 1 4.5 1.4 6.6zm9-15.6c-2 .8-4.2 1.5-6.4 2.1-1.6-5-3.6-10.3-6-15.6 2.4-5.3 4.5-10.5 6-15.5 13.8 4 22.1 10 22.1 15.6 0 4.7-5.8 9.7-15.7 13.4z"/></g></svg>`,
  java: `<svg viewBox="0 0 128 128"><path fill="#0074BD" d="M47.617 98.12s-4.767 2.774 3.397 3.71c9.892 1.13 14.947.968 25.845-1.092 0 0 2.871 1.795 6.873 3.351-24.439 10.47-55.308-.607-36.115-5.969zm-2.988-13.665s-5.348 3.959 2.823 4.805c10.567 1.091 18.91 1.18 33.354-1.6 0 0 1.993 2.025 5.132 3.131-29.542 8.64-62.446.68-41.309-6.336z"/><path fill="#EA2D2E" d="M69.802 61.271c6.025 6.935-1.58 13.17-1.58 13.17s15.289-7.891 8.269-17.777c-6.559-9.215-11.587-13.792 15.635-29.58 0 .001-42.731 10.67-22.324 34.187z"/><path fill="#0074BD" d="M102.123 108.229s3.529 2.91-3.888 5.159c-14.102 4.272-58.706 5.56-71.094.171-4.451-1.938 3.899-4.625 6.526-5.192 2.739-.593 4.303-.485 4.303-.485-4.953-3.487-32.013 6.85-13.743 9.815 49.821 8.076 90.817-3.637 77.896-9.468zM49.912 70.294s-22.686 5.389-8.033 7.348c6.188.828 18.518.638 30.011-.326 9.39-.789 18.813-2.474 18.813-2.474s-3.308 1.419-5.704 3.053c-23.042 6.061-67.544 3.238-54.731-2.958 10.832-5.239 19.644-4.643 19.644-4.643zm40.697 22.747c23.421-12.167 12.591-23.86 5.032-22.285-1.848.385-2.677.72-2.677.72s.688-1.079 2-1.543c14.953-5.255 26.451 15.503-4.823 23.725 0-.002.359-.327.468-.617z"/><path fill="#EA2D2E" d="M76.491 1.587S89.459 14.563 64.188 34.51c-20.266 16.006-4.621 25.13-.007 35.559-11.831-10.673-20.509-20.07-14.688-28.815C58.041 28.42 81.722 22.195 76.491 1.587z"/><path fill="#0074BD" d="M52.214 126.021c22.476 1.437 57-.8 57.817-11.436 0 0-1.571 4.032-18.577 7.231-19.186 3.612-42.854 3.191-56.887.874 0 .001 2.875 2.381 17.647 3.331z"/></svg>`,
  typescript: `<svg viewBox="0 0 128 128"><path fill="#007acc" d="M2 63.91v62.5h125v-125H2zm100.73-5a15.56 15.56 0 017.82 4.5 20.58 20.58 0 013 4c0 .16-5.4 3.81-8.69 5.85-.12.08-.6-.44-1.13-1.23a7.09 7.09 0 00-5.87-3.53c-3.79-.26-6.23 1.73-6.21 5a4.58 4.58 0 00.54 2.34c.83 1.73 2.38 2.76 7.24 4.86 8.95 3.85 12.78 6.39 15.16 10 2.66 4 3.25 10.46 1.45 15.24-2 5.2-6.9 8.73-13.83 9.9a38.32 38.32 0 01-9.52-.1A23 23 0 0180 109.19c-1.15-1.27-3.39-4.58-3.25-4.82a9.34 9.34 0 011.15-.73l4.6-2.64 3.59-2.08.75 1.11a16.78 16.78 0 004.74 4.54c4 2.1 9.46 1.81 12.16-.62a5.43 5.43 0 00.69-6.92c-1-1.39-3-2.56-8.59-5-6.45-2.78-9.23-4.5-11.77-7.24a16.48 16.48 0 01-3.43-6.25 25 25 0 01-.22-8c1.33-6.23 6-10.58 12.82-11.87a31.66 31.66 0 019.49.26zm-29.34 5.24v5.12H57.16v46.23H45.65V69.26H29.38v-5a49.19 49.19 0 01.14-5.16c.06-.08 10-.12 22-.1h21.81z"/></svg>`,
  go: `<svg viewBox="0 0 128 128"><path fill="#F6D2A2" d="M27.4 69.7c-.2 0-.4-.1-.5-.2-.2-.2-.2-.4-.1-.6l1.2-3c.1-.2.3-.4.5-.4l25.6-.1c.2 0 .4.1.5.2.2.2.2.4.1.6l-1 2.9c-.1.2-.3.4-.5.4l-25.8.2zM18.6 76.2c-.2 0-.4-.1-.5-.2-.2-.2-.2-.4-.1-.6l1.2-3c.1-.2.3-.4.5-.4l32.7-.1c.2 0 .4.1.5.3.1.2.1.4 0 .6l-.9 2.7c-.1.2-.3.4-.6.4l-32.8.3zM35.8 82.8c-.2 0-.4-.1-.5-.2-.1-.2-.1-.5 0-.6l.8-2.8c.1-.2.3-.4.5-.4l14.5-.1c.2 0 .4.1.5.3.1.2.1.4 0 .5l-.7 2.7c-.1.2-.3.4-.5.4l-14.6.2zM82.3 68.8c-4.9 1.3-8.2 2.2-13 3.5-.6.2-1.6.5-1.8.6-.2.1-.9.7 0 .7.7 0 5.6 0 6.1-.1.2 0 .3.1.3.3-.1.5-.4 1.2-.6 1.7-.2.3-.4.3-.7.3l-9.1.1c-.8 0-1.5-.2-2.2-.5-.9-.4-1.4-1.4-1.4-2.5s.5-2.4 1.6-3c1.6-.8 3.1-1.4 4.8-1.9 1.2-.4 5.6-1.5 7.5-1.8.4-.1.6-.3.5-.7l-.3-1c-.1-.4-.4-.6-.8-.6H61.5c-.3 0-.6-.2-.6-.5-.1-.8.1-1.5.2-2.3.1-.4.3-.5.7-.5h20.9c.3 0 .6.1.7.3.4.5.5 1.1.5 1.8v.7c0 2.8-1.6 5.3-4.3 6.3-.2.1-.4 0-.5-.2-.1-.3-.1-.6 0-.8.4-1 .4-1.9-.1-2.6-1-.5-2.4-.3-3.6.3l.9-.2zM105.6 68.4c.2-.4.4-.8.6-1.2 0-.1.1-.2.2-.2.2-.1.5.1.5.3 0 .2 0 .5-.1.7l-1.4 4.8c-.2.8-.6 1.6-1.1 2.2-.6.7-1.4 1.2-2.3 1.3-1.7.2-3.2.2-4.7.2-1.6 0-2.8.1-3.7-.3-.9-.4-1.2-1-1.6-2.1-.5-1.4-.6-2.8-.2-4.3l.9-3.5c.1-.3.3-.5.6-.5l3.1-.1c.3 0 .6.2.6.5v.4c0 .3 0 .5-.1.8l-.9 3c-.2.5-.2 1 .1 1.5.3.5.8.8 1.3.9 1 .1 2 .1 3 0 .5-.1 1-.4 1.2-.8.5-.7.8-1.4 1-2.2l1.3-5c.1-.4.4-.7.8-.7l2.7-.1c.3 0 .6.2.6.5l-.3 2.9z"/><path fill="#01ADD7" d="M61.2 50.5c.4-1.5 1.3-2.7 2.6-3.5 2.4-1.4 5.2-2.1 8-2h8.1c3.5 0 6.5 1.3 8.3 4.4 1.2 2.1 1.5 4.5.9 6.8l-.1.5c-.1.3-.3.5-.6.5l-3 .1c-.3 0-.7-.3-.6-.6 0-.3.1-.7.2-1 .1-.9 0-1.8-.3-2.7-.5-1.6-1.8-2.5-3.5-2.7-.9-.1-7.8.1-9.2.1-1.7.1-3.2.6-4.4 1.8-.6.6-.9 1.3-1.1 2.1l-2.2 8c-.4 1.4-.2 2.7.8 3.8 1 1.1 2.3 1.5 3.7 1.6h5.8c1.7 0 3.3-.4 4.5-1.7.4-.5.7-1 .9-1.6.1-.4.1-.7 0-1-.1-.5-.5-.9-1-.9l-6.1.1c-.4 0-.6-.3-.6-.6l.4-2.7c.1-.3.3-.5.6-.5l10.4-.1c.8 0 1.6.4 2.1 1 .5.6.8 1.5.7 2.3v1c0 1.6-.3 3.1-.8 4.6-.8 2.4-2.4 4.3-4.7 5.5-1.8 1-3.8 1.4-5.8 1.4h-6.5c-2.2 0-4.2-.5-6-1.7-1.9-1.3-3.2-3.2-3.4-5.5-.1-.8 0-1.7.2-2.5l2.6-9.4c.1-.4.1-.6.3-1.3.3-.9.5-1.8.8-2.7v-.1zM119.1 72c-.3 0-.5.1-.6.4l-.6 2c-.1.4.1.7.5.8.1 0 .2 0 .3 0l4.9-.1c.4 0 .6-.3.6-.6l.5-2c.1-.3-.1-.6-.5-.6l-5.1.1zm-1.9 6.9l-2 7.4c-.1.3.1.6.4.7.1 0 .2 0 .2 0h2.9c.3 0 .5-.2.6-.5l2-7.3c.1-.3-.1-.6-.5-.7-.1 0-.1 0-.2 0h-2.9c-.2 0-.4.2-.5.4z"/></svg>`,
  swift: `<svg viewBox="0 0 128 128"><linearGradient id="swift-a" gradientUnits="userSpaceOnUse" x1="64" y1="0" x2="64" y2="128"><stop offset="0" stop-color="#F88A36"/><stop offset="1" stop-color="#FD2020"/></linearGradient><path fill="url(#swift-a)" d="M126.33 97.21c0 .016-.004.031-.006.047l-.003.02.006-.02c-.073-2.453-.6-4.908-1.3-7.3-.858-2.95-2.074-5.9-3.626-8.79a55.876 55.876 0 00-5.08-7.92c-2.166-2.9-4.8-5.57-7.7-8.06-11.25-10.51-29.53-22.18-54.16-32.02 0 0 35.12 22.54 43.98 43.93-7.12-5.79-28.3-21.54-56.52-39.26 0 0 30.84 21.71 45.7 37.13-7.07-2.98-25.79-13.91-44.8-25.99 26.5 21.94 47.46 47.66 47.46 47.66-.51.56-1.08 1.03-1.62 1.56a48.94 48.94 0 01-13.05 8.85c-19.47 9.73-40.93 7.67-52.91-2.57-15.59-11.9-38.71-18.1-38.71-18.1 15.23 9.94 21.91 12.9 30.24 17.52-11.04-1.62-27.47-8.42-42.42-16.36 10.03 9.85 23.65 16.36 23.65 16.36-12.35-1.56-26.31-9.21-36.59-16.59C-2.72 99.55-3.97 118.7 9.27 123.95c18.61 7.99 37.76 3.4 37.76 3.4-11.8 3.75-28.63 2.08-43.01-2.14 13.21 8.36 33.36 6.87 48.58 3.08-9.14 5.18-13.61 5.97-34.07 6.75 12.22 4.23 23.05 4.16 23.05 4.16s-12.65 6.12-11.64 5.99c16.58 4.47 50.99-3.99 70.59-24.21 0 0 2.98 4.78 4.19 9.63.97 3.87 1.12 8.52 1.36 11.29h14.62c.74-4.58 1.35-9.16 1.36-12.22.01-3.01.16-6.35.66-9.74.5-3.43 1.24-6.87 2.34-10.16.98-2.91 2.25-5.72 3.91-8.28.48-.75 1.02-1.45 1.55-2.16.39-.52.8-1.03 1.26-1.49.45-.44.95-.85 1.48-1.18.58-.37 1.2-.67 1.85-.9.68-.23 1.38-.37 2.1-.47a11.8 11.8 0 012.28-.04c.8.06 1.59.2 2.35.45a9.25 9.25 0 012.18 1c.33.2.64.44.96.68.3.23.58.48.85.75.57.54 1.07 1.15 1.53 1.78.93 1.26 1.71 2.63 2.39 4.05.68 1.41 1.28 2.88 1.81 4.39.44 1.26.84 2.54 1.2 3.84v.01c-.002-.016.004-.031.006-.047z"/></svg>`,
  cpp: `<svg viewBox="0 0 128 128"><path fill="#659AD3" d="M115.4 30.7L67.1 2.9c-.8-.5-1.9-.7-3.1-.7-1.2 0-2.3.3-3.1.7l-48 27.9c-1.7 1-2.9 3.5-2.9 5.4v55.7c0 1.1.2 2.4 1 3.5l106.8-62c-.6-1.2-1.5-2.1-2.4-2.7z"/><path fill="#03599C" d="M10.7 95.3c.5.8 1.2 1.5 1.9 1.9l48.2 27.9c.8.5 1.9.7 3.1.7 1.2 0 2.3-.3 3.1-.7l48-27.9c1.7-1 2.9-3.5 2.9-5.4V36.1c0-.9-.1-1.9-.6-2.8l-106.6 62z"/><path fill="#fff" d="M85.3 76.1C81.1 83.5 73.1 88.5 64 88.5c-13.5 0-24.5-11-24.5-24.5s11-24.5 24.5-24.5c9.1 0 17.1 5 21.3 12.5l13-7.5c-6.8-11.9-19.6-20-34.3-20-21.8 0-39.5 17.7-39.5 39.5s17.7 39.5 39.5 39.5c14.6 0 27.4-8 34.2-19.8l-12.9-7.6z"/><path fill="#fff" d="M82.1 61.8h5v5h-5v5h-5v-5h-5v-5h5v-5h5zm15 0h5v5h-5v5h-5v-5h-5v-5h5v-5h5z"/></svg>`,
  rust: `<svg viewBox="0 0 128 128"><path d="M62.271 1.605a3.622 3.622 0 013.456 0l54.978 29.77A3.57 3.57 0 01122.5 34.5v59a3.57 3.57 0 01-1.795 3.125l-54.978 29.77a3.622 3.622 0 01-3.456 0l-54.978-29.77A3.57 3.57 0 015.5 93.5v-59a3.57 3.57 0 011.795-3.125z" fill="#000"/><path d="M40.77 88.96h10.146c.224 0 .406-.182.406-.405v-4.906c0-.222-.182-.404-.406-.404H44.61v-5.23h4.878c.224 0 .406-.181.406-.404V72.7c0-.222-.182-.403-.406-.403h-4.877v-4.39h6.306c.224 0 .406-.181.406-.403v-4.91c0-.222-.182-.403-.406-.403H40.77a.405.405 0 00-.405.403v25.959c0 .223.181.405.406.405zm25.04-16.2l-1.87-1.867a.402.402 0 00-.569 0l-5.5 5.487a.401.401 0 01-.57 0l-5.5-5.487a.402.402 0 00-.568 0l-1.87 1.867a.399.399 0 000 .567l5.5 5.491a.401.401 0 010 .568l-5.5 5.487a.399.399 0 000 .567l1.87 1.87a.402.402 0 00.569 0l5.5-5.49a.401.401 0 01.569 0l5.5 5.49a.402.402 0 00.57 0l1.869-1.87a.4.4 0 000-.567l-5.5-5.487a.401.401 0 010-.568l5.5-5.491a.399.399 0 000-.567zm6.073 16.2h10.146c.223 0 .406-.182.406-.405v-4.906c0-.222-.183-.404-.406-.404h-6.307v-5.23h4.877c.224 0 .406-.181.406-.404V72.7c0-.222-.182-.403-.406-.403h-4.877v-4.39h6.307c.223 0 .406-.181.406-.403v-4.91c0-.222-.183-.403-.406-.403H71.883a.405.405 0 00-.406.403v25.959c0 .223.182.405.406.405zm20.09-26.772h-5.26a.406.406 0 00-.406.405v17.92a.406.406 0 01-.405.405h-2.645a.406.406 0 01-.406-.406V62.594a.406.406 0 00-.405-.405h-5.261a.406.406 0 00-.406.405v26.366a.406.406 0 00.406.405h14.788a.406.406 0 00.406-.405V62.594a.406.406 0 00-.406-.405z" fill="#fff"/><path d="M64 21.538c-23.444 0-42.462 19.018-42.462 42.461 0 23.444 19.018 42.462 42.462 42.462 23.443 0 42.461-19.018 42.461-42.462 0-23.443-19.018-42.461-42.461-42.461zm0 80.584c-21.04 0-38.123-17.082-38.123-38.123S42.961 25.877 64 25.877c21.039 0 38.122 17.082 38.122 38.122S85.04 102.122 64 102.122z" fill="#fff"/><circle cx="64" cy="64" r="3.833" fill="#fff"/></svg>`
};

export const levelCategories: LevelCategory[] = [
  {
    id: "javascript-levels",
    name: "JavaScript Mastery Path",
    description: "Master JavaScript from basics to advanced concepts",
    icon: "javascript",
    color: "from-yellow-400 to-orange-500",
    levels: javascriptLevels
  },
  {
    id: "python-levels",
    name: "Python Mastery Path",
    description: "Become a Python expert through progressive challenges",
    icon: "python",
    color: "from-blue-400 to-green-500",
    levels: pythonLevels
  },
  {
    id: "react-levels",
    name: "React Mastery Path",
    description: "Build modern web applications with React",
    icon: "react",
    color: "from-cyan-400 to-blue-500",
    levels: reactLevels
  },
  {
    id: "java-levels",
    name: "Java Mastery Path",
    description: "Master enterprise-grade Java programming",
    icon: "java",
    color: "from-orange-400 to-red-500",
    levels: javaLevels
  },
  {
    id: "typescript-levels",
    name: "TypeScript Mastery Path",
    description: "Add type safety to your JavaScript skills",
    icon: "typescript",
    color: "from-blue-400 to-cyan-500",
    levels: typescriptLevels
  },
  {
    id: "go-levels",
    name: "Go Mastery Path",
    description: "Learn Google's efficient programming language",
    icon: "go",
    color: "from-cyan-400 to-blue-500",
    levels: goLevels
  },
  {
    id: "swift-levels",
    name: "Swift Mastery Path",
    description: "Build iOS apps with Apple's Swift language",
    icon: "swift",
    color: "from-orange-400 to-red-500",
    levels: swiftLevels
  },
  {
    id: "cpp-levels",
    name: "C++ Mastery Path",
    description: "Master system programming with C++",
    icon: "cpp",
    color: "from-gray-400 to-blue-500",
    levels: cppLevels
  },
  {
    id: "rust-levels",
    name: "Rust Mastery Path",
    description: "Safe systems programming with Rust",
    icon: "rust",
    color: "from-orange-400 to-red-500",
    levels: rustLevels
  }
];

// Helper functions for level progression
export const isLevelUnlocked = (level: Level, completedLevels: string[]): boolean => {
  if (!level.prerequisites || level.prerequisites.length === 0) {
    return true;
  }
  return level.prerequisites.every(prereq => completedLevels.includes(prereq));
};

export const getNextLevel = (categoryId: string, completedLevels: string[]): Level | null => {
  const category = levelCategories.find(cat => cat.id === categoryId);
  if (!category) return null;
  
  return category.levels.find(level => 
    !completedLevels.includes(level.id) && isLevelUnlocked(level, completedLevels)
  ) || null;
};

export const getCategoryProgress = (categoryId: string, completedLevels: string[]): {
  completed: number;
  total: number;
  percentage: number;
} => {
  const category = levelCategories.find(cat => cat.id === categoryId);
  if (!category) return { completed: 0, total: 0, percentage: 0 };
  
  const completed = category.levels.filter(level => completedLevels.includes(level.id)).length;
  const total = category.levels.length;
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
  
  return { completed, total, percentage };
};
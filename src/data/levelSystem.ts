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
    name: "Concurrency",
    description: "Goroutines and channels",
    requiredScore: 80,
    timeLimit: 540,
    questions: ["go11", "go12", "go13", "go14", "go15"],
    badge: {
      name: "Concurrency Master",
      icon: "🔀",
      color: "from-green-400 to-teal-500"
    },
    prerequisites: ["go-level-2"]
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
    name: "Classes & Protocols",
    description: "Object-oriented programming in Swift",
    requiredScore: 80,
    timeLimit: 540,
    questions: ["swift11", "swift12", "swift13", "swift14", "swift15"],
    badge: {
      name: "Protocol Master",
      icon: "📋",
      color: "from-purple-400 to-pink-500"
    },
    prerequisites: ["swift-level-2"]
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
    name: "Pointers & Memory",
    description: "Memory management and pointers",
    requiredScore: 75,
    timeLimit: 480,
    questions: ["cpp6", "cpp7", "cpp8", "cpp9", "cpp10"],
    badge: {
      name: "Memory Manager",
      icon: "🧠",
      color: "from-blue-400 to-indigo-500"
    },
    prerequisites: ["cpp-level-1"]
  },
  {
    id: "cpp-level-3",
    level: 3,
    name: "Object-Oriented C++",
    description: "Classes, inheritance, and polymorphism",
    requiredScore: 80,
    timeLimit: 600,
    questions: ["cpp11", "cpp12", "cpp13", "cpp14", "cpp15"],
    badge: {
      name: "OOP Master",
      icon: "🏛️",
      color: "from-indigo-400 to-purple-500"
    },
    prerequisites: ["cpp-level-2"]
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
  }
];

export const levelCategories: LevelCategory[] = [
  {
    id: "javascript-levels",
    name: "JavaScript Mastery Path",
    description: "Master JavaScript from basics to advanced concepts",
    icon: "🟨",
    color: "from-yellow-400 to-orange-500",
    levels: javascriptLevels
  },
  {
    id: "python-levels",
    name: "Python Mastery Path",
    description: "Become a Python expert through progressive challenges",
    icon: "🐍",
    color: "from-blue-400 to-green-500",
    levels: pythonLevels
  },
  {
    id: "react-levels",
    name: "React Mastery Path",
    description: "Build modern web applications with React",
    icon: "⚛️",
    color: "from-cyan-400 to-blue-500",
    levels: reactLevels
  },
  {
    id: "java-levels",
    name: "Java Mastery Path",
    description: "Master enterprise-grade Java programming",
    icon: "☕",
    color: "from-orange-400 to-red-500",
    levels: javaLevels
  },
  {
    id: "typescript-levels",
    name: "TypeScript Mastery Path",
    description: "Add type safety to your JavaScript skills",
    icon: "🔷",
    color: "from-blue-400 to-cyan-500",
    levels: typescriptLevels
  },
  {
    id: "go-levels",
    name: "Go Mastery Path",
    description: "Learn Google's efficient programming language",
    icon: "🐹",
    color: "from-cyan-400 to-blue-500",
    levels: goLevels
  },
  {
    id: "swift-levels",
    name: "Swift Mastery Path",
    description: "Build iOS apps with Apple's Swift language",
    icon: "🦉",
    color: "from-orange-400 to-red-500",
    levels: swiftLevels
  },
  {
    id: "cpp-levels",
    name: "C++ Mastery Path",
    description: "Master system programming with C++",
    icon: "⚙️",
    color: "from-gray-400 to-blue-500",
    levels: cppLevels
  },
  {
    id: "rust-levels",
    name: "Rust Mastery Path",
    description: "Safe systems programming with Rust",
    icon: "🦀",
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
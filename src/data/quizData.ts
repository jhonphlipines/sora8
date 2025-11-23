export interface QuizOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: QuizOption[];
  explanation?: string;
}

export interface TestCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  questions: QuizQuestion[];
}

// Python Test Questions
const pythonQuestions: QuizQuestion[] = [
  {
    id: "py1",
    question: "Which of the following is the correct way to create a list in Python?",
    options: [
      { id: "a", text: "list = (1, 2, 3)", isCorrect: false },
      { id: "b", text: "list = [1, 2, 3]", isCorrect: true },
      { id: "c", text: "list = {1, 2, 3}", isCorrect: false },
      { id: "d", text: "list = <1, 2, 3>", isCorrect: false }
    ],
    explanation: "Lists in Python are created using square brackets []. Parentheses create tuples, curly braces create sets or dictionaries."
  },
  {
    id: "py2",
    question: "What is the output of: print(3 ** 2)?",
    options: [
      { id: "a", text: "6", isCorrect: false },
      { id: "b", text: "9", isCorrect: true },
      { id: "c", text: "32", isCorrect: false },
      { id: "d", text: "Error", isCorrect: false }
    ],
    explanation: "The ** operator in Python performs exponentiation. 3 ** 2 means 3 raised to the power of 2, which equals 9."
  },
  {
    id: "py3",
    question: "Which method is used to add an element at the end of a list?",
    options: [
      { id: "a", text: "add()", isCorrect: false },
      { id: "b", text: "append()", isCorrect: true },
      { id: "c", text: "insert()", isCorrect: false },
      { id: "d", text: "push()", isCorrect: false }
    ],
    explanation: "The append() method adds a single element to the end of a list. insert() adds at a specific position, add() is for sets."
  },
  {
    id: "py4",
    question: "What is the correct way to create a dictionary in Python?",
    options: [
      { id: "a", text: "dict = [key: value]", isCorrect: false },
      { id: "b", text: "dict = {key: value}", isCorrect: true },
      { id: "c", text: "dict = (key: value)", isCorrect: false },
      { id: "d", text: "dict = <key: value>", isCorrect: false }
    ],
    explanation: "Dictionaries in Python are created using curly braces {} with key: value pairs."
  },
  {
    id: "py5",
    question: "Which of the following is NOT a valid variable name in Python?",
    options: [
      { id: "a", text: "_variable", isCorrect: false },
      { id: "b", text: "variable2", isCorrect: false },
      { id: "c", text: "2variable", isCorrect: true },
      { id: "d", text: "my_variable", isCorrect: false }
    ],
    explanation: "Variable names in Python cannot start with a number. They must start with a letter or underscore."
  },
  {
    id: "py6",
    question: "What does the len() function return for a string?",
    options: [
      { id: "a", text: "Number of words", isCorrect: false },
      { id: "b", text: "Number of characters", isCorrect: true },
      { id: "c", text: "Number of lines", isCorrect: false },
      { id: "d", text: "Memory size", isCorrect: false }
    ],
    explanation: "The len() function returns the number of characters in a string, including spaces and special characters."
  },
  {
    id: "py7",
    question: "Which operator is used for floor division in Python?",
    options: [
      { id: "a", text: "/", isCorrect: false },
      { id: "b", text: "//", isCorrect: true },
      { id: "c", text: "%", isCorrect: false },
      { id: "d", text: "**", isCorrect: false }
    ],
    explanation: "The // operator performs floor division, returning the largest integer less than or equal to the division result."
  },
  {
    id: "py8",
    question: "What is the output of: print(type([1, 2, 3]))?",
    options: [
      { id: "a", text: "<class 'tuple'>", isCorrect: false },
      { id: "b", text: "<class 'list'>", isCorrect: true },
      { id: "c", text: "<class 'array'>", isCorrect: false },
      { id: "d", text: "<class 'set'>", isCorrect: false }
    ],
    explanation: "The type() function returns the data type of an object. [1, 2, 3] is a list, so it returns <class 'list'>."
  },
  {
    id: "py9",
    question: "Which method converts a string to lowercase?",
    options: [
      { id: "a", text: "toLower()", isCorrect: false },
      { id: "b", text: "lower()", isCorrect: true },
      { id: "c", text: "lowercase()", isCorrect: false },
      { id: "d", text: "downcase()", isCorrect: false }
    ],
    explanation: "The lower() method returns a string with all characters converted to lowercase."
  },
  {
    id: "py10",
    question: "What is the correct syntax for a for loop in Python?",
    options: [
      { id: "a", text: "for i in range(5):", isCorrect: true },
      { id: "b", text: "for (i in range(5)):", isCorrect: false },
      { id: "c", text: "for i = 0 to 5:", isCorrect: false },
      { id: "d", text: "for (i = 0; i < 5; i++):", isCorrect: false }
    ],
    explanation: "Python uses 'for item in iterable:' syntax. The colon is required at the end."
  },
  {
    id: "py11",
    question: "Which of the following creates a tuple in Python?",
    options: [
      { id: "a", text: "(1, 2, 3)", isCorrect: true },
      { id: "b", text: "[1, 2, 3]", isCorrect: false },
      { id: "c", text: "{1, 2, 3}", isCorrect: false },
      { id: "d", text: "tuple[1, 2, 3]", isCorrect: false }
    ],
    explanation: "Tuples are created using parentheses (). They are immutable sequences."
  },
  {
    id: "py12",
    question: "What does the 'break' statement do in a loop?",
    options: [
      { id: "a", text: "Skips the current iteration", isCorrect: false },
      { id: "b", text: "Exits the loop completely", isCorrect: true },
      { id: "c", text: "Restarts the loop", isCorrect: false },
      { id: "d", text: "Pauses the loop", isCorrect: false }
    ],
    explanation: "The 'break' statement terminates the loop and transfers control to the statement after the loop."
  },
  {
    id: "py13",
    question: "Which function is used to get input from the user?",
    options: [
      { id: "a", text: "get()", isCorrect: false },
      { id: "b", text: "input()", isCorrect: true },
      { id: "c", text: "read()", isCorrect: false },
      { id: "d", text: "scan()", isCorrect: false }
    ],
    explanation: "The input() function reads a line from input, converts it to a string (stripping a trailing newline), and returns that."
  },
  {
    id: "py14",
    question: "What is the result of: bool(0)?",
    options: [
      { id: "a", text: "True", isCorrect: false },
      { id: "b", text: "False", isCorrect: true },
      { id: "c", text: "0", isCorrect: false },
      { id: "d", text: "Error", isCorrect: false }
    ],
    explanation: "In Python, 0 is considered falsy, so bool(0) returns False."
  },
  {
    id: "py15",
    question: "Which method removes the last element from a list?",
    options: [
      { id: "a", text: "remove()", isCorrect: false },
      { id: "b", text: "delete()", isCorrect: false },
      { id: "c", text: "pop()", isCorrect: true },
      { id: "d", text: "drop()", isCorrect: false }
    ],
    explanation: "The pop() method removes and returns the last element from a list. pop(index) can remove from a specific position."
  },
  {
    id: "py16",
    question: "What is the output of: print('Hello' + 'World')?",
    options: [
      { id: "a", text: "Hello World", isCorrect: false },
      { id: "b", text: "HelloWorld", isCorrect: true },
      { id: "c", text: "Hello+World", isCorrect: false },
      { id: "d", text: "Error", isCorrect: false }
    ],
    explanation: "String concatenation with + joins strings without adding spaces."
  },
  {
    id: "py17",
    question: "Which keyword is used to define a function in Python?",
    options: [
      { id: "a", text: "function", isCorrect: false },
      { id: "b", text: "def", isCorrect: true },
      { id: "c", text: "define", isCorrect: false },
      { id: "d", text: "func", isCorrect: false }
    ],
    explanation: "The 'def' keyword is used to define functions in Python."
  },
  {
    id: "py18",
    question: "What does the 'continue' statement do?",
    options: [
      { id: "a", text: "Exits the loop", isCorrect: false },
      { id: "b", text: "Skips to the next iteration", isCorrect: true },
      { id: "c", text: "Restarts the loop", isCorrect: false },
      { id: "d", text: "Ends the program", isCorrect: false }
    ],
    explanation: "The 'continue' statement skips the rest of the current iteration and moves to the next iteration of the loop."
  },
  {
    id: "py19",
    question: "Which of the following is a mutable data type?",
    options: [
      { id: "a", text: "tuple", isCorrect: false },
      { id: "b", text: "string", isCorrect: false },
      { id: "c", text: "list", isCorrect: true },
      { id: "d", text: "int", isCorrect: false }
    ],
    explanation: "Lists are mutable in Python, meaning their contents can be changed after creation."
  },
  {
    id: "py20",
    question: "What is the correct way to comment in Python?",
    options: [
      { id: "a", text: "// This is a comment", isCorrect: false },
      { id: "b", text: "# This is a comment", isCorrect: true },
      { id: "c", text: "/* This is a comment */", isCorrect: false },
      { id: "d", text: "<!-- This is a comment -->", isCorrect: false }
    ],
    explanation: "Python uses # for single-line comments and triple quotes for multi-line comments."
  },
  {
    id: "py21",
    question: "What is the result of: 5 % 2?",
    options: [
      { id: "a", text: "2.5", isCorrect: false },
      { id: "b", text: "2", isCorrect: false },
      { id: "c", text: "1", isCorrect: true },
      { id: "d", text: "0", isCorrect: false }
    ],
    explanation: "The % operator returns the remainder of division. 5 divided by 2 gives remainder 1."
  },
  {
    id: "py22",
    question: "Which method splits a string into a list?",
    options: [
      { id: "a", text: "separate()", isCorrect: false },
      { id: "b", text: "split()", isCorrect: true },
      { id: "c", text: "divide()", isCorrect: false },
      { id: "d", text: "break()", isCorrect: false }
    ],
    explanation: "The split() method splits a string into a list based on a delimiter (space by default)."
  },
  {
    id: "py23",
    question: "What is the correct syntax for an if statement?",
    options: [
      { id: "a", text: "if (x == 5):", isCorrect: false },
      { id: "b", text: "if x == 5:", isCorrect: true },
      { id: "c", text: "if x = 5:", isCorrect: false },
      { id: "d", text: "if x == 5 then:", isCorrect: false }
    ],
    explanation: "Python if statements use 'if condition:' syntax without parentheses and with a colon."
  },
  {
    id: "py24",
    question: "Which function converts a string to an integer?",
    options: [
      { id: "a", text: "str()", isCorrect: false },
      { id: "b", text: "int()", isCorrect: true },
      { id: "c", text: "float()", isCorrect: false },
      { id: "d", text: "num()", isCorrect: false }
    ],
    explanation: "The int() function converts a string or number to an integer."
  },
  {
    id: "py25",
    question: "What does 'None' represent in Python?",
    options: [
      { id: "a", text: "Zero", isCorrect: false },
      { id: "b", text: "Empty string", isCorrect: false },
      { id: "c", text: "Null value", isCorrect: true },
      { id: "d", text: "False", isCorrect: false }
    ],
    explanation: "None is Python's null value, representing the absence of a value."
  },
  {
    id: "py26",
    question: "Which method joins elements of a list into a string?",
    options: [
      { id: "a", text: "join()", isCorrect: true },
      { id: "b", text: "combine()", isCorrect: false },
      { id: "c", text: "merge()", isCorrect: false },
      { id: "d", text: "concat()", isCorrect: false }
    ],
    explanation: "The join() method is called on a string separator and takes a list as argument: ','.join(['a', 'b', 'c'])."
  },
  {
    id: "py27",
    question: "What is the output of: print(bool([]))?",
    options: [
      { id: "a", text: "True", isCorrect: false },
      { id: "b", text: "False", isCorrect: true },
      { id: "c", text: "[]", isCorrect: false },
      { id: "d", text: "Error", isCorrect: false }
    ],
    explanation: "Empty collections (lists, tuples, sets, dictionaries) are falsy in Python."
  },
  {
    id: "py28",
    question: "Which operator checks if two objects are the same?",
    options: [
      { id: "a", text: "==", isCorrect: false },
      { id: "b", text: "is", isCorrect: true },
      { id: "c", text: "===", isCorrect: false },
      { id: "d", text: "equals", isCorrect: false }
    ],
    explanation: "The 'is' operator checks object identity, while '==' checks value equality."
  },
  {
    id: "py29",
    question: "What is the correct way to create a set?",
    options: [
      { id: "a", text: "{1, 2, 3}", isCorrect: true },
      { id: "b", text: "[1, 2, 3]", isCorrect: false },
      { id: "c", text: "(1, 2, 3)", isCorrect: false },
      { id: "d", text: "set[1, 2, 3]", isCorrect: false }
    ],
    explanation: "Sets are created using curly braces {} with comma-separated values, or set() function."
  },
  {
    id: "py30",
    question: "Which method removes all elements from a list?",
    options: [
      { id: "a", text: "delete()", isCorrect: false },
      { id: "b", text: "clear()", isCorrect: true },
      { id: "c", text: "empty()", isCorrect: false },
      { id: "d", text: "removeAll()", isCorrect: false }
    ],
    explanation: "The clear() method removes all elements from a list, making it empty."
  },
  {
    id: "py31",
    question: "What is the result of: 'abc' * 3?",
    options: [
      { id: "a", text: "abc3", isCorrect: false },
      { id: "b", text: "abcabcabc", isCorrect: true },
      { id: "c", text: "Error", isCorrect: false },
      { id: "d", text: "aaa", isCorrect: false }
    ],
    explanation: "String multiplication repeats the string the specified number of times."
  },
  {
    id: "py32",
    question: "Which keyword is used for exception handling?",
    options: [
      { id: "a", text: "catch", isCorrect: false },
      { id: "b", text: "try", isCorrect: true },
      { id: "c", text: "handle", isCorrect: false },
      { id: "d", text: "error", isCorrect: false }
    ],
    explanation: "Python uses try/except blocks for exception handling, not try/catch."
  },
  {
    id: "py33",
    question: "What does the range(5) function generate?",
    options: [
      { id: "a", text: "1, 2, 3, 4, 5", isCorrect: false },
      { id: "b", text: "0, 1, 2, 3, 4", isCorrect: true },
      { id: "c", text: "0, 1, 2, 3, 4, 5", isCorrect: false },
      { id: "d", text: "1, 2, 3, 4", isCorrect: false }
    ],
    explanation: "range(n) generates numbers from 0 to n-1. range(5) produces 0, 1, 2, 3, 4."
  },
  {
    id: "py34",
    question: "Which method checks if a string starts with a specific substring?",
    options: [
      { id: "a", text: "begins()", isCorrect: false },
      { id: "b", text: "startswith()", isCorrect: true },
      { id: "c", text: "starts()", isCorrect: false },
      { id: "d", text: "prefix()", isCorrect: false }
    ],
    explanation: "The startswith() method returns True if the string starts with the specified substring."
  },
  {
    id: "py35",
    question: "What is the correct syntax for a while loop?",
    options: [
      { id: "a", text: "while (condition):", isCorrect: false },
      { id: "b", text: "while condition:", isCorrect: true },
      { id: "c", text: "while condition do:", isCorrect: false },
      { id: "d", text: "while (condition) do:", isCorrect: false }
    ],
    explanation: "Python while loops use 'while condition:' syntax without parentheses."
  },
  {
    id: "py36",
    question: "Which function returns the absolute value of a number?",
    options: [
      { id: "a", text: "absolute()", isCorrect: false },
      { id: "b", text: "abs()", isCorrect: true },
      { id: "c", text: "math.abs()", isCorrect: false },
      { id: "d", text: "positive()", isCorrect: false }
    ],
    explanation: "The abs() function returns the absolute value of a number."
  },
  {
    id: "py37",
    question: "What does the 'pass' statement do?",
    options: [
      { id: "a", text: "Skips the next line", isCorrect: false },
      { id: "b", text: "Does nothing (placeholder)", isCorrect: true },
      { id: "c", text: "Exits the function", isCorrect: false },
      { id: "d", text: "Continues to next iteration", isCorrect: false }
    ],
    explanation: "The 'pass' statement is a null operation - it does nothing and serves as a placeholder."
  },
  {
    id: "py38",
    question: "Which method converts all characters in a string to uppercase?",
    options: [
      { id: "a", text: "upper()", isCorrect: true },
      { id: "b", text: "uppercase()", isCorrect: false },
      { id: "c", text: "toUpper()", isCorrect: false },
      { id: "d", text: "caps()", isCorrect: false }
    ],
    explanation: "The upper() method returns a string with all characters converted to uppercase."
  },
  {
    id: "py39",
    question: "What is the result of: list('abc')?",
    options: [
      { id: "a", text: "['abc']", isCorrect: false },
      { id: "b", text: "['a', 'b', 'c']", isCorrect: true },
      { id: "c", text: "[a, b, c]", isCorrect: false },
      { id: "d", text: "Error", isCorrect: false }
    ],
    explanation: "The list() function converts an iterable (like a string) into a list of its elements."
  },
  {
    id: "py40",
    question: "Which operator is used for exponentiation?",
    options: [
      { id: "a", text: "^", isCorrect: false },
      { id: "b", text: "**", isCorrect: true },
      { id: "c", text: "pow", isCorrect: false },
      { id: "d", text: "exp", isCorrect: false }
    ],
    explanation: "The ** operator performs exponentiation in Python. ^ is the XOR operator."
  },
  {
    id: "py41",
    question: "What does the enumerate() function return?",
    options: [
      { id: "a", text: "Just the values", isCorrect: false },
      { id: "b", text: "Index-value pairs", isCorrect: true },
      { id: "c", text: "Just the indices", isCorrect: false },
      { id: "d", text: "A dictionary", isCorrect: false }
    ],
    explanation: "enumerate() returns an iterator of tuples containing index-value pairs."
  },
  {
    id: "py42",
    question: "Which method finds the index of an element in a list?",
    options: [
      { id: "a", text: "find()", isCorrect: false },
      { id: "b", text: "index()", isCorrect: true },
      { id: "c", text: "search()", isCorrect: false },
      { id: "d", text: "locate()", isCorrect: false }
    ],
    explanation: "The index() method returns the index of the first occurrence of an element in a list."
  },
  {
    id: "py43",
    question: "What is the output of: print(3 == 3.0)?",
    options: [
      { id: "a", text: "True", isCorrect: true },
      { id: "b", text: "False", isCorrect: false },
      { id: "c", text: "Error", isCorrect: false },
      { id: "d", text: "None", isCorrect: false }
    ],
    explanation: "Python considers 3 and 3.0 equal in value, even though they're different types."
  },
  {
    id: "py44",
    question: "Which function returns the length of an object?",
    options: [
      { id: "a", text: "length()", isCorrect: false },
      { id: "b", text: "len()", isCorrect: true },
      { id: "c", text: "size()", isCorrect: false },
      { id: "d", text: "count()", isCorrect: false }
    ],
    explanation: "The len() function returns the number of items in an object."
  },
  {
    id: "py45",
    question: "What is a lambda function in Python?",
    options: [
      { id: "a", text: "A named function", isCorrect: false },
      { id: "b", text: "An anonymous function", isCorrect: true },
      { id: "c", text: "A class method", isCorrect: false },
      { id: "d", text: "A built-in function", isCorrect: false }
    ],
    explanation: "Lambda functions are anonymous functions defined using the lambda keyword."
  },
  {
    id: "py46",
    question: "Which method removes whitespace from both ends of a string?",
    options: [
      { id: "a", text: "trim()", isCorrect: false },
      { id: "b", text: "strip()", isCorrect: true },
      { id: "c", text: "clean()", isCorrect: false },
      { id: "d", text: "remove()", isCorrect: false }
    ],
    explanation: "The strip() method removes whitespace from the beginning and end of a string."
  },
  {
    id: "py47",
    question: "What does the zip() function do?",
    options: [
      { id: "a", text: "Compresses files", isCorrect: false },
      { id: "b", text: "Combines iterables element-wise", isCorrect: true },
      { id: "c", text: "Sorts lists", isCorrect: false },
      { id: "d", text: "Removes duplicates", isCorrect: false }
    ],
    explanation: "zip() takes multiple iterables and returns an iterator of tuples with corresponding elements."
  },
  {
    id: "py48",
    question: "Which keyword creates a class in Python?",
    options: [
      { id: "a", text: "class", isCorrect: true },
      { id: "b", text: "Class", isCorrect: false },
      { id: "c", text: "define", isCorrect: false },
      { id: "d", text: "object", isCorrect: false }
    ],
    explanation: "The 'class' keyword is used to define a class in Python."
  },
  {
    id: "py49",
    question: "What is the result of: 'Hello'[1]?",
    options: [
      { id: "a", text: "H", isCorrect: false },
      { id: "b", text: "e", isCorrect: true },
      { id: "c", text: "l", isCorrect: false },
      { id: "d", text: "Error", isCorrect: false }
    ],
    explanation: "String indexing starts at 0. 'Hello'[1] returns the character at index 1, which is 'e'."
  },
  {
    id: "py50",
    question: "Which method returns a copy of a list?",
    options: [
      { id: "a", text: "duplicate()", isCorrect: false },
      { id: "b", text: "copy()", isCorrect: true },
      { id: "c", text: "clone()", isCorrect: false },
      { id: "d", text: "backup()", isCorrect: false }
    ],
    explanation: "The copy() method creates a shallow copy of a list."
  },
  {
    id: "py51",
    question: "What does the 'global' keyword do?",
    options: [
      { id: "a", text: "Creates a global variable", isCorrect: false },
      { id: "b", text: "Accesses a global variable inside a function", isCorrect: true },
      { id: "c", text: "Deletes a variable", isCorrect: false },
      { id: "d", text: "Makes a variable constant", isCorrect: false }
    ],
    explanation: "The 'global' keyword allows modification of global variables inside a function."
  },
  {
    id: "py52",
    question: "Which function converts a number to a string?",
    options: [
      { id: "a", text: "string()", isCorrect: false },
      { id: "b", text: "str()", isCorrect: true },
      { id: "c", text: "text()", isCorrect: false },
      { id: "d", text: "char()", isCorrect: false }
    ],
    explanation: "The str() function converts a value to a string representation."
  },
  {
    id: "py53",
    question: "What is the result of: [1, 2, 3] + [4, 5]?",
    options: [
      { id: "a", text: "[1, 2, 3, 4, 5]", isCorrect: true },
      { id: "b", text: "[5, 7, 3]", isCorrect: false },
      { id: "c", text: "Error", isCorrect: false },
      { id: "d", text: "15", isCorrect: false }
    ],
    explanation: "List concatenation with + joins two lists into a single list."
  },
  {
    id: "py54",
    question: "Which method sorts a list in place?",
    options: [
      { id: "a", text: "sorted()", isCorrect: false },
      { id: "b", text: "sort()", isCorrect: true },
      { id: "c", text: "order()", isCorrect: false },
      { id: "d", text: "arrange()", isCorrect: false }
    ],
    explanation: "The sort() method sorts a list in place. sorted() returns a new sorted list."
  },
  {
    id: "py55",
    question: "What does 'self' refer to in a class method?",
    options: [
      { id: "a", text: "The class itself", isCorrect: false },
      { id: "b", text: "The instance of the class", isCorrect: true },
      { id: "c", text: "The parent class", isCorrect: false },
      { id: "d", text: "Nothing specific", isCorrect: false }
    ],
    explanation: "'self' refers to the instance of the class and is used to access instance variables and methods."
  },
  {
    id: "py56",
    question: "Which function returns the maximum value from a sequence?",
    options: [
      { id: "a", text: "maximum()", isCorrect: false },
      { id: "b", text: "max()", isCorrect: true },
      { id: "c", text: "largest()", isCorrect: false },
      { id: "d", text: "biggest()", isCorrect: false }
    ],
    explanation: "The max() function returns the largest item in an iterable or the largest of two or more arguments."
  },
  {
    id: "py57",
    question: "What is the output of: print(bool('False'))?",
    options: [
      { id: "a", text: "False", isCorrect: false },
      { id: "b", text: "True", isCorrect: true },
      { id: "c", text: "Error", isCorrect: false },
      { id: "d", text: "None", isCorrect: false }
    ],
    explanation: "Any non-empty string is truthy in Python, even the string 'False'."
  },
  {
    id: "py58",
    question: "Which method reverses a list in place?",
    options: [
      { id: "a", text: "reversed()", isCorrect: false },
      { id: "b", text: "reverse()", isCorrect: true },
      { id: "c", text: "backward()", isCorrect: false },
      { id: "d", text: "flip()", isCorrect: false }
    ],
    explanation: "The reverse() method reverses a list in place. reversed() returns an iterator."
  },
  {
    id: "py59",
    question: "What does the 'in' operator do?",
    options: [
      { id: "a", text: "Assigns a value", isCorrect: false },
      { id: "b", text: "Checks membership", isCorrect: true },
      { id: "c", text: "Imports a module", isCorrect: false },
      { id: "d", text: "Defines a variable", isCorrect: false }
    ],
    explanation: "The 'in' operator checks if a value exists in a sequence (list, tuple, string, etc.)."
  },
  {
    id: "py60",
    question: "Which function returns the minimum value from a sequence?",
    options: [
      { id: "a", text: "minimum()", isCorrect: false },
      { id: "b", text: "min()", isCorrect: true },
      { id: "c", text: "smallest()", isCorrect: false },
      { id: "d", text: "least()", isCorrect: false }
    ],
    explanation: "The min() function returns the smallest item in an iterable or the smallest of two or more arguments."
  },
  {
    id: "py61",
    question: "What is the correct way to import a module?",
    options: [
      { id: "a", text: "include module", isCorrect: false },
      { id: "b", text: "import module", isCorrect: true },
      { id: "c", text: "require module", isCorrect: false },
      { id: "d", text: "use module", isCorrect: false }
    ],
    explanation: "The 'import' statement is used to include modules in Python."
  },
  {
    id: "py62",
    question: "Which method counts occurrences of an element in a list?",
    options: [
      { id: "a", text: "count()", isCorrect: true },
      { id: "b", text: "occurrences()", isCorrect: false },
      { id: "c", text: "frequency()", isCorrect: false },
      { id: "d", text: "times()", isCorrect: false }
    ],
    explanation: "The count() method returns the number of times an element appears in a list."
  },
  {
    id: "py63",
    question: "What is the result of: 10 / 3 in Python 3?",
    options: [
      { id: "a", text: "3", isCorrect: false },
      { id: "b", text: "3.333...", isCorrect: true },
      { id: "c", text: "3.0", isCorrect: false },
      { id: "d", text: "Error", isCorrect: false }
    ],
    explanation: "In Python 3, the / operator performs true division, returning a float result."
  },
  {
    id: "py64",
    question: "Which keyword is used to create an alias for a module?",
    options: [
      { id: "a", text: "alias", isCorrect: false },
      { id: "b", text: "as", isCorrect: true },
      { id: "c", text: "name", isCorrect: false },
      { id: "d", text: "call", isCorrect: false }
    ],
    explanation: "The 'as' keyword creates an alias: import numpy as np."
  },
  {
    id: "py65",
    question: "What does the round() function do?",
    options: [
      { id: "a", text: "Always rounds up", isCorrect: false },
      { id: "b", text: "Rounds to nearest integer", isCorrect: true },
      { id: "c", text: "Always rounds down", isCorrect: false },
      { id: "d", text: "Truncates decimal", isCorrect: false }
    ],
    explanation: "The round() function rounds a number to the nearest integer or to a specified number of decimal places."
  },
  {
    id: "py66",
    question: "Which method inserts an element at a specific position in a list?",
    options: [
      { id: "a", text: "add()", isCorrect: false },
      { id: "b", text: "insert()", isCorrect: true },
      { id: "c", text: "place()", isCorrect: false },
      { id: "d", text: "put()", isCorrect: false }
    ],
    explanation: "The insert() method inserts an element at a specified index: list.insert(index, element)."
  },
  {
    id: "py67",
    question: "What is the output of: print(type(5.0))?",
    options: [
      { id: "a", text: "<class 'int'>", isCorrect: false },
      { id: "b", text: "<class 'float'>", isCorrect: true },
      { id: "c", text: "<class 'double'>", isCorrect: false },
      { id: "d", text: "<class 'decimal'>", isCorrect: false }
    ],
    explanation: "5.0 is a floating-point number, so type() returns <class 'float'>."
  },
  {
    id: "py68",
    question: "Which operator is used for integer division?",
    options: [
      { id: "a", text: "/", isCorrect: false },
      { id: "b", text: "//", isCorrect: true },
      { id: "c", text: "div", isCorrect: false },
      { id: "d", text: "int/", isCorrect: false }
    ],
    explanation: "The // operator performs floor division, returning an integer result."
  },
  {
    id: "py69",
    question: "What does the any() function return?",
    options: [
      { id: "a", text: "True if all elements are True", isCorrect: false },
      { id: "b", text: "True if any element is True", isCorrect: true },
      { id: "c", text: "False always", isCorrect: false },
      { id: "d", text: "The first True element", isCorrect: false }
    ],
    explanation: "any() returns True if at least one element in the iterable is True."
  },
  {
    id: "py70",
    question: "Which method replaces occurrences of a substring?",
    options: [
      { id: "a", text: "substitute()", isCorrect: false },
      { id: "b", text: "replace()", isCorrect: true },
      { id: "c", text: "change()", isCorrect: false },
      { id: "d", text: "swap()", isCorrect: false }
    ],
    explanation: "The replace() method returns a string with occurrences of a substring replaced."
  },
  {
    id: "py71",
    question: "What is a list comprehension?",
    options: [
      { id: "a", text: "A way to understand lists", isCorrect: false },
      { id: "b", text: "A concise way to create lists", isCorrect: true },
      { id: "c", text: "A list method", isCorrect: false },
      { id: "d", text: "A type of loop", isCorrect: false }
    ],
    explanation: "List comprehensions provide a concise way to create lists: [x*2 for x in range(5)]."
  },
  {
    id: "py72",
    question: "Which function checks if all elements in an iterable are True?",
    options: [
      { id: "a", text: "every()", isCorrect: false },
      { id: "b", text: "all()", isCorrect: true },
      { id: "c", text: "each()", isCorrect: false },
      { id: "d", text: "complete()", isCorrect: false }
    ],
    explanation: "all() returns True if all elements in the iterable are True (or if the iterable is empty)."
  },
  {
    id: "py73",
    question: "What does the isinstance() function check?",
    options: [
      { id: "a", text: "If a variable exists", isCorrect: false },
      { id: "b", text: "If an object is an instance of a class", isCorrect: true },
      { id: "c", text: "If a class exists", isCorrect: false },
      { id: "d", text: "If a method exists", isCorrect: false }
    ],
    explanation: "isinstance() checks if an object is an instance of a particular class or classes."
  },
  {
    id: "py74",
    question: "Which method extends a list with elements from another iterable?",
    options: [
      { id: "a", text: "add()", isCorrect: false },
      { id: "b", text: "extend()", isCorrect: true },
      { id: "c", text: "merge()", isCorrect: false },
      { id: "d", text: "combine()", isCorrect: false }
    ],
    explanation: "The extend() method adds all elements from an iterable to the end of a list."
  },
  {
    id: "py75",
    question: "What is the output of: print('a' in 'banana')?",
    options: [
      { id: "a", text: "True", isCorrect: true },
      { id: "b", text: "False", isCorrect: false },
      { id: "c", text: "3", isCorrect: false },
      { id: "d", text: "Error", isCorrect: false }
    ],
    explanation: "The 'in' operator returns True because 'a' is found in the string 'banana'."
  },
  {
    id: "py76",
    question: "Which method finds the position of a substring in a string?",
    options: [
      { id: "a", text: "position()", isCorrect: false },
      { id: "b", text: "find()", isCorrect: true },
      { id: "c", text: "locate()", isCorrect: false },
      { id: "d", text: "search()", isCorrect: false }
    ],
    explanation: "The find() method returns the index of the first occurrence of a substring, or -1 if not found."
  },
  {
    id: "py77",
    question: "What does the sum() function do?",
    options: [
      { id: "a", text: "Counts elements", isCorrect: false },
      { id: "b", text: "Adds all numbers in an iterable", isCorrect: true },
      { id: "c", text: "Finds the average", isCorrect: false },
      { id: "d", text: "Multiplies numbers", isCorrect: false }
    ],
    explanation: "sum() returns the sum of all numeric values in an iterable."
  },
  {
    id: "py78",
    question: "Which keyword is used to define a generator function?",
    options: [
      { id: "a", text: "generator", isCorrect: false },
      { id: "b", text: "yield", isCorrect: true },
      { id: "c", text: "return", isCorrect: false },
      { id: "d", text: "generate", isCorrect: false }
    ],
    explanation: "The 'yield' keyword is used in functions to create generators."
  },
  {
    id: "py79",
    question: "What is the result of: 'hello'.capitalize()?",
    options: [
      { id: "a", text: "HELLO", isCorrect: false },
      { id: "b", text: "Hello", isCorrect: true },
      { id: "c", text: "hello", isCorrect: false },
      { id: "d", text: "HeLLo", isCorrect: false }
    ],
    explanation: "capitalize() returns a string with the first character uppercase and the rest lowercase."
  },
  {
    id: "py80",
    question: "Which method removes a specific element from a list?",
    options: [
      { id: "a", text: "delete()", isCorrect: false },
      { id: "b", text: "remove()", isCorrect: true },
      { id: "c", text: "discard()", isCorrect: false },
      { id: "d", text: "erase()", isCorrect: false }
    ],
    explanation: "The remove() method removes the first occurrence of a specified element from a list."
  },
  {
    id: "py81",
    question: "What does the ord() function return?",
    options: [
      { id: "a", text: "ASCII value of a character", isCorrect: true },
      { id: "b", text: "Order of elements", isCorrect: false },
      { id: "c", text: "Ordinal number", isCorrect: false },
      { id: "d", text: "Original value", isCorrect: false }
    ],
    explanation: "ord() returns the Unicode code point (ASCII value) of a character."
  },
  {
    id: "py82",
    question: "Which function converts an ASCII value to a character?",
    options: [
      { id: "a", text: "char()", isCorrect: false },
      { id: "b", text: "chr()", isCorrect: true },
      { id: "c", text: "character()", isCorrect: false },
      { id: "d", text: "ascii()", isCorrect: false }
    ],
    explanation: "chr() returns the character corresponding to a Unicode code point."
  },
  {
    id: "py83",
    question: "What is the purpose of the __init__ method?",
    options: [
      { id: "a", text: "To delete an object", isCorrect: false },
      { id: "b", text: "To initialize an object", isCorrect: true },
      { id: "c", text: "To copy an object", isCorrect: false },
      { id: "d", text: "To print an object", isCorrect: false }
    ],
    explanation: "__init__ is the constructor method that initializes new instances of a class."
  },
  {
    id: "py84",
    question: "Which operator checks if a value is NOT in a sequence?",
    options: [
      { id: "a", text: "not in", isCorrect: true },
      { id: "b", text: "!in", isCorrect: false },
      { id: "c", text: "not_in", isCorrect: false },
      { id: "d", text: "notin", isCorrect: false }
    ],
    explanation: "'not in' is the operator to check if a value is not present in a sequence."
  },
  {
    id: "py85",
    question: "What does the filter() function do?",
    options: [
      { id: "a", text: "Sorts elements", isCorrect: false },
      { id: "b", text: "Filters elements based on a condition", isCorrect: true },
      { id: "c", text: "Removes duplicates", isCorrect: false },
      { id: "d", text: "Changes element types", isCorrect: false }
    ],
    explanation: "filter() creates an iterator from elements of an iterable for which a function returns True."
  },
  {
    id: "py86",
    question: "Which method returns True if a string ends with a specific suffix?",
    options: [
      { id: "a", text: "ends()", isCorrect: false },
      { id: "b", text: "endswith()", isCorrect: true },
      { id: "c", text: "suffix()", isCorrect: false },
      { id: "d", text: "finishes()", isCorrect: false }
    ],
    explanation: "endswith() returns True if the string ends with the specified suffix."
  },
  {
    id: "py87",
    question: "What is the result of: pow(2, 3)?",
    options: [
      { id: "a", text: "5", isCorrect: false },
      { id: "b", text: "6", isCorrect: false },
      { id: "c", text: "8", isCorrect: true },
      { id: "d", text: "9", isCorrect: false }
    ],
    explanation: "pow(2, 3) calculates 2 to the power of 3, which equals 8."
  },
  {
    id: "py88",
    question: "Which function applies a function to all items in an iterable?",
    options: [
      { id: "a", text: "apply()", isCorrect: false },
      { id: "b", text: "map()", isCorrect: true },
      { id: "c", text: "each()", isCorrect: false },
      { id: "d", text: "iterate()", isCorrect: false }
    ],
    explanation: "map() applies a function to every item in an iterable and returns an iterator."
  },
  {
    id: "py89",
    question: "What does the hasattr() function check?",
    options: [
      { id: "a", text: "If an object has a specific attribute", isCorrect: true },
      { id: "b", text: "If an attribute exists globally", isCorrect: false },
      { id: "c", text: "If an attribute is public", isCorrect: false },
      { id: "d", text: "If an attribute is callable", isCorrect: false }
    ],
    explanation: "hasattr() returns True if an object has the specified attribute."
  },
  {
    id: "py90",
    question: "Which method converts a string to title case?",
    options: [
      { id: "a", text: "title()", isCorrect: true },
      { id: "b", text: "titlecase()", isCorrect: false },
      { id: "c", text: "proper()", isCorrect: false },
      { id: "d", text: "heading()", isCorrect: false }
    ],
    explanation: "title() returns a string with the first character of each word capitalized."
  },
  {
    id: "py91",
    question: "What is the output of: print(bool([0]))?",
    options: [
      { id: "a", text: "False", isCorrect: false },
      { id: "b", text: "True", isCorrect: true },
      { id: "c", text: "0", isCorrect: false },
      { id: "d", text: "Error", isCorrect: false }
    ],
    explanation: "A list containing one element (even if that element is 0) is truthy because the list is not empty."
  },
  {
    id: "py92",
    question: "Which function returns a sorted list from an iterable?",
    options: [
      { id: "a", text: "sort()", isCorrect: false },
      { id: "b", text: "sorted()", isCorrect: true },
      { id: "c", text: "order()", isCorrect: false },
      { id: "d", text: "arrange()", isCorrect: false }
    ],
    explanation: "sorted() returns a new sorted list from an iterable. sort() sorts a list in place."
  },
  {
    id: "py93",
    question: "What does the getattr() function do?",
    options: [
      { id: "a", text: "Gets all attributes", isCorrect: false },
      { id: "b", text: "Gets a specific attribute value", isCorrect: true },
      { id: "c", text: "Gets attribute names", isCorrect: false },
      { id: "d", text: "Gets attribute types", isCorrect: false }
    ],
    explanation: "getattr() returns the value of a named attribute of an object."
  },
  {
    id: "py94",
    question: "Which method checks if all characters in a string are alphabetic?",
    options: [
      { id: "a", text: "isalpha()", isCorrect: true },
      { id: "b", text: "istext()", isCorrect: false },
      { id: "c", text: "isletter()", isCorrect: false },
      { id: "d", text: "isword()", isCorrect: false }
    ],
    explanation: "isalpha() returns True if all characters in the string are alphabetic."
  },
  {
    id: "py95",
    question: "What is the result of: divmod(10, 3)?",
    options: [
      { id: "a", text: "(3, 1)", isCorrect: true },
      { id: "b", text: "(1, 3)", isCorrect: false },
      { id: "c", text: "3.33", isCorrect: false },
      { id: "d", text: "Error", isCorrect: false }
    ],
    explanation: "divmod() returns a tuple containing the quotient and remainder: (quotient, remainder)."
  },
  {
    id: "py96",
    question: "Which method checks if all characters in a string are digits?",
    options: [
      { id: "a", text: "isnumber()", isCorrect: false },
      { id: "b", text: "isdigit()", isCorrect: true },
      { id: "c", text: "isnumeric()", isCorrect: false },
      { id: "d", text: "isint()", isCorrect: false }
    ],
    explanation: "isdigit() returns True if all characters in the string are digits."
  },
  {
    id: "py97",
    question: "What does the vars() function return?",
    options: [
      { id: "a", text: "Variable names", isCorrect: false },
      { id: "b", text: "Dictionary of attributes", isCorrect: true },
      { id: "c", text: "Variable types", isCorrect: false },
      { id: "d", text: "Variable values", isCorrect: false }
    ],
    explanation: "vars() returns the __dict__ attribute of an object, containing its attributes as a dictionary."
  },
  {
    id: "py98",
    question: "Which method checks if a string contains only whitespace?",
    options: [
      { id: "a", text: "iswhite()", isCorrect: false },
      { id: "b", text: "isspace()", isCorrect: true },
      { id: "c", text: "isblank()", isCorrect: false },
      { id: "d", text: "isempty()", isCorrect: false }
    ],
    explanation: "isspace() returns True if the string contains only whitespace characters."
  },
  {
    id: "py99",
    question: "What is the purpose of the __str__ method?",
    options: [
      { id: "a", text: "To convert to integer", isCorrect: false },
      { id: "b", text: "To provide string representation", isCorrect: true },
      { id: "c", text: "To compare strings", isCorrect: false },
      { id: "d", text: "To validate strings", isCorrect: false }
    ],
    explanation: "__str__ defines the string representation of an object when str() or print() is called."
  },
  {
    id: "py100",
    question: "Which function evaluates a string as Python code?",
    options: [
      { id: "a", text: "execute()", isCorrect: false },
      { id: "b", text: "eval()", isCorrect: true },
      { id: "c", text: "run()", isCorrect: false },
      { id: "d", text: "parse()", isCorrect: false }
    ],
    explanation: "eval() evaluates a string containing a Python expression and returns the result."
  },
  {
    id: "py101",
    question: "What does the id() function return?",
    options: [
      { id: "a", text: "Object name", isCorrect: false },
      { id: "b", text: "Memory address", isCorrect: true },
      { id: "c", text: "Object type", isCorrect: false },
      { id: "d", text: "Object size", isCorrect: false }
    ],
    explanation: "id() returns the unique identifier (memory address) of an object."
  },
  {
    id: "py102",
    question: "Which method checks if a string is alphanumeric?",
    options: [
      { id: "a", text: "isalnum()", isCorrect: true },
      { id: "b", text: "isalphanumeric()", isCorrect: false },
      { id: "c", text: "ischarnum()", isCorrect: false },
      { id: "d", text: "istextnum()", isCorrect: false }
    ],
    explanation: "isalnum() returns True if all characters are alphanumeric (letters or digits)."
  },
  {
    id: "py103",
    question: "What is the result of: float('inf') > 1000000?",
    options: [
      { id: "a", text: "False", isCorrect: false },
      { id: "b", text: "True", isCorrect: true },
      { id: "c", text: "Error", isCorrect: false },
      { id: "d", text: "None", isCorrect: false }
    ],
    explanation: "float('inf') represents positive infinity, which is greater than any finite number."
  },
  {
    id: "py104",
    question: "Which operator performs bitwise AND?",
    options: [
      { id: "a", text: "and", isCorrect: false },
      { id: "b", text: "&", isCorrect: true },
      { id: "c", text: "&&", isCorrect: false },
      { id: "d", text: "AND", isCorrect: false }
    ],
    explanation: "The & operator performs bitwise AND operation on integers."
  },
  {
    id: "py105",
    question: "What does the exec() function do?",
    options: [
      { id: "a", text: "Executes a file", isCorrect: false },
      { id: "b", text: "Executes Python code dynamically", isCorrect: true },
      { id: "c", text: "Exits the program", isCorrect: false },
      { id: "d", text: "Executes a function", isCorrect: false }
    ],
    explanation: "exec() executes Python code dynamically from a string or code object."
  },
  {
    id: "py106",
    question: "Which method returns the index of the maximum value in a list?",
    options: [
      { id: "a", text: "max_index()", isCorrect: false },
      { id: "b", text: "argmax()", isCorrect: false },
      { id: "c", text: "index(max(list))", isCorrect: true },
      { id: "d", text: "maxindex()", isCorrect: false }
    ],
    explanation: "To find the index of the maximum value, use list.index(max(list))."
  },
  {
    id: "py107",
    question: "What is the result of: 'abc'.zfill(5)?",
    options: [
      { id: "a", text: "abc00", isCorrect: false },
      { id: "b", text: "00abc", isCorrect: true },
      { id: "c", text: "0abc0", isCorrect: false },
      { id: "d", text: "Error", isCorrect: false }
    ],
    explanation: "zfill() pads a string with zeros on the left to reach the specified width."
  },
  {
    id: "py108",
    question: "Which operator performs bitwise OR?",
    options: [
      { id: "a", text: "or", isCorrect: false },
      { id: "b", text: "|", isCorrect: true },
      { id: "c", text: "||", isCorrect: false },
      { id: "d", text: "OR", isCorrect: false }
    ],
    explanation: "The | operator performs bitwise OR operation on integers."
  },
  {
    id: "py109",
    question: "What does the callable() function check?",
    options: [
      { id: "a", text: "If an object can be called like a function", isCorrect: true },
      { id: "b", text: "If an object exists", isCorrect: false },
      { id: "c", text: "If an object is a function", isCorrect: false },
      { id: "d", text: "If an object is callable by name", isCorrect: false }
    ],
    explanation: "callable() returns True if an object can be called (like functions, methods, classes)."
  },
  {
    id: "py110",
    question: "Which method centers a string in a field of given width?",
    options: [
      { id: "a", text: "center()", isCorrect: true },
      { id: "b", text: "middle()", isCorrect: false },
      { id: "c", text: "align()", isCorrect: false },
      { id: "d", text: "justify()", isCorrect: false }
    ],
    explanation: "center() returns a string centered in a field of specified width."
  },
  {
    id: "py111",
    question: "What is the result of: bin(10)?",
    options: [
      { id: "a", text: "1010", isCorrect: false },
      { id: "b", text: "0b1010", isCorrect: true },
      { id: "c", text: "10", isCorrect: false },
      { id: "d", text: "Error", isCorrect: false }
    ],
    explanation: "bin() returns the binary representation of an integer with '0b' prefix."
  },
  {
    id: "py112",
    question: "Which operator performs bitwise XOR?",
    options: [
      { id: "a", text: "xor", isCorrect: false },
      { id: "b", text: "^", isCorrect: true },
      { id: "c", text: "^^", isCorrect: false },
      { id: "d", text: "XOR", isCorrect: false }
    ],
    explanation: "The ^ operator performs bitwise XOR (exclusive OR) operation."
  },
  {
    id: "py113",
    question: "What does the format() method do for strings?",
    options: [
      { id: "a", text: "Changes string format", isCorrect: false },
      { id: "b", text: "Substitutes placeholders with values", isCorrect: true },
      { id: "c", text: "Formats file strings", isCorrect: false },
      { id: "d", text: "Validates string format", isCorrect: false }
    ],
    explanation: "format() replaces placeholders {} in a string with specified values."
  },
  {
    id: "py114",
    question: "What is the result of: hex(255)?",
    options: [
      { id: "a", text: "FF", isCorrect: false },
      { id: "b", text: "0xff", isCorrect: true },
      { id: "c", text: "ff", isCorrect: false },
      { id: "d", text: "255", isCorrect: false }
    ],
    explanation: "hex() returns the hexadecimal representation of an integer with '0x' prefix."
  },
  {
    id: "py115",
    question: "Which method returns the number of non-overlapping occurrences of a substring?",
    options: [
      { id: "a", text: "occurrences()", isCorrect: false },
      { id: "b", text: "count()", isCorrect: true },
      { id: "c", text: "frequency()", isCorrect: false },
      { id: "d", text: "matches()", isCorrect: false }
    ],
    explanation: "The count() method returns the number of non-overlapping occurrences of a substring."
  },
  {
    id: "py116",
    question: "What does the reduce() function do?",
    options: [
      { id: "a", text: "Reduces list size", isCorrect: false },
      { id: "b", text: "Applies a function cumulatively to items", isCorrect: true },
      { id: "c", text: "Removes duplicates", isCorrect: false },
      { id: "d", text: "Simplifies expressions", isCorrect: false }
    ],
    explanation: "reduce() applies a function cumulatively to items in an iterable to reduce it to a single value."
  },
  {
    id: "py117",
    question: "Which method checks if a string contains only lowercase characters?",
    options: [
      { id: "a", text: "islower()", isCorrect: true },
      { id: "b", text: "islow()", isCorrect: false },
      { id: "c", text: "islowercase()", isCorrect: false },
      { id: "d", text: "issmall()", isCorrect: false }
    ],
    explanation: "islower() returns True if all cased characters in the string are lowercase."
  },
  {
    id: "py118",
    question: "What is the result of: oct(8)?",
    options: [
      { id: "a", text: "8", isCorrect: false },
      { id: "b", text: "0o10", isCorrect: true },
      { id: "c", text: "10", isCorrect: false },
      { id: "d", text: "0x8", isCorrect: false }
    ],
    explanation: "oct() returns the octal representation of an integer with '0o' prefix."
  },
  {
    id: "py119",
    question: "Which method checks if a string contains only uppercase characters?",
    options: [
      { id: "a", text: "isupper()", isCorrect: true },
      { id: "b", text: "isup()", isCorrect: false },
      { id: "c", text: "isuppercase()", isCorrect: false },
      { id: "d", text: "isbig()", isCorrect: false }
    ],
    explanation: "isupper() returns True if all cased characters in the string are uppercase."
  },
  {
    id: "py120",
    question: "What does the dir() function return?",
    options: [
      { id: "a", text: "Directory contents", isCorrect: false },
      { id: "b", text: "List of object attributes", isCorrect: true },
      { id: "c", text: "File directory", isCorrect: false },
      { id: "d", text: "Object direction", isCorrect: false }
    ],
    explanation: "dir() returns a list of valid attributes for an object."
  },
  {
    id: "py121",
    question: "Which method left-justifies a string in a field of given width?",
    options: [
      { id: "a", text: "ljust()", isCorrect: true },
      { id: "b", text: "left()", isCorrect: false },
      { id: "c", text: "alignleft()", isCorrect: false },
      { id: "d", text: "leftjustify()", isCorrect: false }
    ],
    explanation: "ljust() returns a left-justified string in a field of specified width."
  },
  {
    id: "py122",
    question: "What is the result of: complex(2, 3)?",
    options: [
      { id: "a", text: "2+3", isCorrect: false },
      { id: "b", text: "(2+3j)", isCorrect: true },
      { id: "c", text: "5", isCorrect: false },
      { id: "d", text: "Error", isCorrect: false }
    ],
    explanation: "complex() creates a complex number with real part 2 and imaginary part 3."
  },
  {
    id: "py123",
    question: "Which method right-justifies a string in a field of given width?",
    options: [
      { id: "a", text: "rjust()", isCorrect: true },
      { id: "b", text: "right()", isCorrect: false },
      { id: "c", text: "alignright()", isCorrect: false },
      { id: "d", text: "rightjustify()", isCorrect: false }
    ],
    explanation: "rjust() returns a right-justified string in a field of specified width."
  },
  {
    id: "py124",
    question: "What does the next() function do?",
    options: [
      { id: "a", text: "Gets the next line", isCorrect: false },
      { id: "b", text: "Gets the next item from an iterator", isCorrect: true },
      { id: "c", text: "Moves to next function", isCorrect: false },
      { id: "d", text: "Goes to next page", isCorrect: false }
    ],
    explanation: "next() retrieves the next item from an iterator."
  },
  {
    id: "py125",
    question: "Which method expands tabs in a string to spaces?",
    options: [
      { id: "a", text: "expandtabs()", isCorrect: true },
      { id: "b", text: "tabs2spaces()", isCorrect: false },
      { id: "c", text: "detab()", isCorrect: false },
      { id: "d", text: "spacetabs()", isCorrect: false }
    ],
    explanation: "expandtabs() returns a copy of the string with tab characters expanded to spaces."
  },
  {
    id: "py126",
    question: "What is the result of: bool(' ')?",
    options: [
      { id: "a", text: "False", isCorrect: false },
      { id: "b", text: "True", isCorrect: true },
      { id: "c", text: "Error", isCorrect: false },
      { id: "d", text: "None", isCorrect: false }
    ],
    explanation: "A string containing a space is not empty, so it evaluates to True."
  },
  {
    id: "py127",
    question: "Which function returns an iterator of enumerated pairs?",
    options: [
      { id: "a", text: "enumerate()", isCorrect: true },
      { id: "b", text: "pairs()", isCorrect: false },
      { id: "c", text: "indexed()", isCorrect: false },
      { id: "d", text: "numbered()", isCorrect: false }
    ],
    explanation: "enumerate() returns an iterator that produces tuples of (index, value) pairs."
  },
  {
    id: "py128",
    question: "What does the property() function create?",
    options: [
      { id: "a", text: "Class properties", isCorrect: false },
      { id: "b", text: "Property descriptor", isCorrect: true },
      { id: "c", text: "Object properties", isCorrect: false },
      { id: "d", text: "Property values", isCorrect: false }
    ],
    explanation: "property() creates a property descriptor that can be used as a decorator for getter/setter methods."
  },
  {
    id: "py129",
    question: "Which method swaps the case of characters in a string?",
    options: [
      { id: "a", text: "swapcase()", isCorrect: true },
      { id: "b", text: "switchcase()", isCorrect: false },
      { id: "c", text: "togglecase()", isCorrect: false },
      { id: "d", text: "flipcase()", isCorrect: false }
    ],
    explanation: "swapcase() returns a string with uppercase characters converted to lowercase and vice versa."
  },
  {
    id: "py130",
    question: "What is the result of: frozenset([1, 2, 2, 3])?",
    options: [
      { id: "a", text: "frozenset({1, 2, 2, 3})", isCorrect: false },
      { id: "b", text: "frozenset({1, 2, 3})", isCorrect: true },
      { id: "c", text: "[1, 2, 3]", isCorrect: false },
      { id: "d", text: "Error", isCorrect: false }
    ],
    explanation: "frozenset() creates an immutable set, automatically removing duplicates."
  },
  {
    id: "py131",
    question: "Which function creates a memory view object?",
    options: [
      { id: "a", text: "memory()", isCorrect: false },
      { id: "b", text: "memoryview()", isCorrect: true },
      { id: "c", text: "view()", isCorrect: false },
      { id: "d", text: "buffer()", isCorrect: false }
    ],
    explanation: "memoryview() creates a memory view object that exposes the buffer protocol."
  },
  {
    id: "py132",
    question: "What does the staticmethod() decorator do?",
    options: [
      { id: "a", text: "Makes a method static", isCorrect: true },
      { id: "b", text: "Makes a method constant", isCorrect: false },
      { id: "c", text: "Makes a method immutable", isCorrect: false },
      { id: "d", text: "Makes a method private", isCorrect: false }
    ],
    explanation: "staticmethod() creates a static method that doesn't receive self or cls as first argument."
  },
  {
    id: "py133",
    question: "Which method removes leading whitespace from a string?",
    options: [
      { id: "a", text: "lstrip()", isCorrect: true },
      { id: "b", text: "leftstrip()", isCorrect: false },
      { id: "c", text: "ltrim()", isCorrect: false },
      { id: "d", text: "stripl()", isCorrect: false }
    ],
    explanation: "lstrip() removes whitespace characters from the left (beginning) of a string."
  },
  {
    id: "py134",
    question: "What does the classmethod() decorator do?",
    options: [
      { id: "a", text: "Creates a class method", isCorrect: true },
      { id: "b", text: "Creates a class variable", isCorrect: false },
      { id: "c", text: "Creates a class property", isCorrect: false },
      { id: "d", text: "Creates a class instance", isCorrect: false }
    ],
    explanation: "classmethod() creates a class method that receives the class as first argument (cls)."
  },
  {
    id: "py135",
    question: "Which method removes trailing whitespace from a string?",
    options: [
      { id: "a", text: "rstrip()", isCorrect: true },
      { id: "b", text: "rightstrip()", isCorrect: false },
      { id: "c", text: "rtrim()", isCorrect: false },
      { id: "d", text: "stripr()", isCorrect: false }
    ],
    explanation: "rstrip() removes whitespace characters from the right (end) of a string."
  },
  {
    id: "py136",
    question: "What is the result of: slice(1, 5, 2)?",
    options: [
      { id: "a", text: "A slice object", isCorrect: true },
      { id: "b", text: "[1, 3]", isCorrect: false },
      { id: "c", text: "slice(1, 5, 2)", isCorrect: false },
      { id: "d", text: "Error", isCorrect: false }
    ],
    explanation: "slice() creates a slice object that can be used for slicing sequences."
  },
  {
    id: "py137",
    question: "Which method partitions a string around a separator?",
    options: [
      { id: "a", text: "partition()", isCorrect: true },
      { id: "b", text: "separate()", isCorrect: false },
      { id: "c", text: "divide()", isCorrect: false },
      { id: "d", text: "split3()", isCorrect: false }
    ],
    explanation: "partition() splits a string into three parts: before separator, separator, after separator."
  },
  {
    id: "py138",
    question: "What does the super() function do?",
    options: [
      { id: "a", text: "Creates a superclass", isCorrect: false },
      { id: "b", text: "Accesses parent class methods", isCorrect: true },
      { id: "c", text: "Makes a class superior", isCorrect: false },
      { id: "d", text: "Creates super variables", isCorrect: false }
    ],
    explanation: "super() provides access to methods in a parent class from a child class."
  },
  {
    id: "py139",
    question: "Which method right-partitions a string around a separator?",
    options: [
      { id: "a", text: "rpartition()", isCorrect: true },
      { id: "b", text: "rightpartition()", isCorrect: false },
      { id: "c", text: "splitr()", isCorrect: false },
      { id: "d", text: "rseparate()", isCorrect: false }
    ],
    explanation: "rpartition() splits a string into three parts using the rightmost occurrence of separator."
  },
  {
    id: "py140",
    question: "What is the result of: set() & set()?",
    options: [
      { id: "a", text: "set()", isCorrect: true },
      { id: "b", text: "Error", isCorrect: false },
      { id: "c", text: "None", isCorrect: false },
      { id: "d", text: "False", isCorrect: false }
    ],
    explanation: "The intersection (&) of two empty sets is an empty set."
  },
  {
    id: "py141",
    question: "Which method splits a string from the right?",
    options: [
      { id: "a", text: "rsplit()", isCorrect: true },
      { id: "b", text: "rightsplit()", isCorrect: false },
      { id: "c", text: "splitright()", isCorrect: false },
      { id: "d", text: "splitr()", isCorrect: false }
    ],
    explanation: "rsplit() splits a string from the right side, useful when limiting the number of splits."
  },
  {
    id: "py142",
    question: "What does the bytes() function create?",
    options: [
      { id: "a", text: "Byte array", isCorrect: false },
      { id: "b", text: "Bytes object", isCorrect: true },
      { id: "c", text: "Binary data", isCorrect: false },
      { id: "d", text: "Byte string", isCorrect: false }
    ],
    explanation: "bytes() creates an immutable bytes object from various sources."
  },
  {
    id: "py143",
    question: "Which method removes specified characters from string ends?",
    options: [
      { id: "a", text: "trim()", isCorrect: false },
      { id: "b", text: "strip()", isCorrect: true },
      { id: "c", text: "remove()", isCorrect: false },
      { id: "d", text: "clean()", isCorrect: false }
    ],
    explanation: "strip() can remove specified characters from both ends of a string, not just whitespace."
  },
  {
    id: "py144",
    question: "What does the bytearray() function create?",
    options: [
      { id: "a", text: "Immutable byte sequence", isCorrect: false },
      { id: "b", text: "Mutable byte sequence", isCorrect: true },
      { id: "c", text: "Byte string", isCorrect: false },
      { id: "d", text: "Array of bytes", isCorrect: false }
    ],
    explanation: "bytearray() creates a mutable sequence of bytes, unlike the immutable bytes type."
  },
  {
    id: "py145",
    question: "Which method translates characters in a string?",
    options: [
      { id: "a", text: "translate()", isCorrect: true },
      { id: "b", text: "transform()", isCorrect: false },
      { id: "c", text: "convert()", isCorrect: false },
      { id: "d", text: "change()", isCorrect: false }
    ],
    explanation: "translate() uses a translation table to replace characters in a string."
  },
  {
    id: "py146",
    question: "What is the result of: range(0)?",
    options: [
      { id: "a", text: "Empty range", isCorrect: true },
      { id: "b", text: "[0]", isCorrect: false },
      { id: "c", text: "Error", isCorrect: false },
      { id: "d", text: "None", isCorrect: false }
    ],
    explanation: "range(0) creates an empty range object with no elements."
  },
  {
    id: "py147",
    question: "Which method creates a translation table for strings?",
    options: [
      { id: "a", text: "maketrans()", isCorrect: true },
      { id: "b", text: "translation()", isCorrect: false },
      { id: "c", text: "transtable()", isCorrect: false },
      { id: "d", text: "chartable()", isCorrect: false }
    ],
    explanation: "str.maketrans() creates a translation table for use with the translate() method."
  },
  {
    id: "py148",
    question: "What does the repr() function return?",
    options: [
      { id: "a", text: "String representation", isCorrect: false },
      { id: "b", text: "Official string representation", isCorrect: true },
      { id: "c", text: "Readable format", isCorrect: false },
      { id: "d", text: "Report of object", isCorrect: false }
    ],
    explanation: "repr() returns the official string representation of an object, ideally evaluable Python code."
  },
  {
    id: "py149",
    question: "Which method checks if a string is a valid identifier?",
    options: [
      { id: "a", text: "isidentifier()", isCorrect: true },
      { id: "b", text: "isvalid()", isCorrect: false },
      { id: "c", text: "isname()", isCorrect: false },
      { id: "d", text: "isvariable()", isCorrect: false }
    ],
    explanation: "isidentifier() returns True if the string is a valid Python identifier."
  },
  {
    id: "py150",
    question: "What is the result of: tuple('abc')?",
    options: [
      { id: "a", text: "('abc',)", isCorrect: false },
      { id: "b", text: "('a', 'b', 'c')", isCorrect: true },
      { id: "c", text: "(a, b, c)", isCorrect: false },
      { id: "d", text: "Error", isCorrect: false }
    ],
    explanation: "tuple() converts an iterable (like a string) into a tuple of its elements."
  },
  {
    id: "py151",
    question: "Which method checks if a string is printable?",
    options: [
      { id: "a", text: "isprintable()", isCorrect: true },
      { id: "b", text: "isprint()", isCorrect: false },
      { id: "c", text: "isvisible()", isCorrect: false },
      { id: "d", text: "istext()", isCorrect: false }
    ],
    explanation: "isprintable() returns True if all characters in the string are printable."
  },
  {
    id: "py152",
    question: "What does the hash() function return?",
    options: [
      { id: "a", text: "Hash table", isCorrect: false },
      { id: "b", text: "Hash value", isCorrect: true },
      { id: "c", text: "Hash code", isCorrect: false },
      { id: "d", text: "Hash object", isCorrect: false }
    ],
    explanation: "hash() returns the hash value of an object (if it has one)."
  },
  {
    id: "py153",
    question: "Which method checks if string follows title case rules?",
    options: [
      { id: "a", text: "istitle()", isCorrect: true },
      { id: "b", text: "istitlecase()", isCorrect: false },
      { id: "c", text: "isproper()", isCorrect: false },
      { id: "d", text: "isheading()", isCorrect: false }
    ],
    explanation: "istitle() returns True if the string follows title case rules (words start with uppercase)."
  },
  {
    id: "py154",
    question: "What is the purpose of the __len__ method?",
    options: [
      { id: "a", text: "To get object length", isCorrect: true },
      { id: "b", text: "To set object length", isCorrect: false },
      { id: "c", text: "To check if object is long", isCorrect: false },
      { id: "d", text: "To create long objects", isCorrect: false }
    ],
    explanation: "__len__ defines the behavior of the len() function for custom objects."
  },
  {
    id: "py155",
    question: "Which function returns the Unicode category of a character?",
    options: [
      { id: "a", text: "category()", isCorrect: false },
      { id: "b", text: "unicodedata.category()", isCorrect: true },
      { id: "c", text: "char.category()", isCorrect: false },
      { id: "d", text: "unicode.type()", isCorrect: false }
    ],
    explanation: "unicodedata.category() returns the Unicode category of a character."
  },
  {
    id: "py156",
    question: "What does the setattr() function do?",
    options: [
      { id: "a", text: "Sets all attributes", isCorrect: false },
      { id: "b", text: "Sets a specific attribute", isCorrect: true },
      { id: "c", text: "Sets attribute types", isCorrect: false },
      { id: "d", text: "Sets attribute permissions", isCorrect: false }
    ],
    explanation: "setattr() sets the value of a named attribute of an object."
  },
  {
    id: "py157",
    question: "Which method formats a string using named placeholders?",
    options: [
      { id: "a", text: "format_map()", isCorrect: true },
      { id: "b", text: "format_dict()", isCorrect: false },
      { id: "c", text: "map_format()", isCorrect: false },
      { id: "d", text: "dict_format()", isCorrect: false }
    ],
    explanation: "format_map() is similar to format() but takes a mapping (like dict) as argument."
  },
  {
    id: "py158",
    question: "What does the delattr() function do?",
    options: [
      { id: "a", text: "Deletes all attributes", isCorrect: false },
      { id: "b", text: "Deletes a specific attribute", isCorrect: true },
      { id: "c", text: "Deletes attribute types", isCorrect: false },
      { id: "d", text: "Deletes the object", isCorrect: false }
    ],
    explanation: "delattr() deletes a named attribute from an object."
  },
  {
    id: "py159",
    question: "Which method encodes a string to bytes?",
    options: [
      { id: "a", text: "encode()", isCorrect: true },
      { id: "b", text: "tobytes()", isCorrect: false },
      { id: "c", text: "convert()", isCorrect: false },
      { id: "d", text: "bytes()", isCorrect: false }
    ],
    explanation: "encode() converts a string to bytes using a specified encoding (UTF-8 by default)."
  },
  {
    id: "py160",
    question: "What is the result of: pow(2, 3, 5)?",
    options: [
      { id: "a", text: "8", isCorrect: false },
      { id: "b", text: "3", isCorrect: true },
      { id: "c", text: "13", isCorrect: false },
      { id: "d", text: "Error", isCorrect: false }
    ],
    explanation: "pow(2, 3, 5) calculates (2^3) % 5 = 8 % 5 = 3."
  },
  {
    id: "py161",
    question: "Which method decodes bytes to a string?",
    options: [
      { id: "a", text: "decode()", isCorrect: true },
      { id: "b", text: "tostring()", isCorrect: false },
      { id: "c", text: "convert()", isCorrect: false },
      { id: "d", text: "str()", isCorrect: false }
    ],
    explanation: "decode() converts bytes to a string using a specified encoding."
  },
  {
    id: "py162",
    question: "What does the locals() function return?",
    options: [
      { id: "a", text: "Local variables", isCorrect: false },
      { id: "b", text: "Local namespace as dict", isCorrect: true },
      { id: "c", text: "Local functions", isCorrect: false },
      { id: "d", text: "Local classes", isCorrect: false }
    ],
    explanation: "locals() returns a dictionary containing the current local symbol table."
  },
  {
    id: "py163",
    question: "Which method joins strings with the string as separator?",
    options: [
      { id: "a", text: "join()", isCorrect: true },
      { id: "b", text: "combine()", isCorrect: false },
      { id: "c", text: "merge()", isCorrect: false },
      { id: "d", text: "concat()", isCorrect: false }
    ],
    explanation: "join() uses the string as a separator to join elements of an iterable into a single string."
  },
  {
    id: "py164",
    question: "What does the globals() function return?",
    options: [
      { id: "a", text: "Global variables", isCorrect: false },
      { id: "b", text: "Global namespace as dict", isCorrect: true },
      { id: "c", text: "Global functions", isCorrect: false },
      { id: "d", text: "Global classes", isCorrect: false }
    ],
    explanation: "globals() returns a dictionary containing the current global symbol table."
  },
  {
    id: "py165",
    question: "Which operator creates a set difference?",
    options: [
      { id: "a", text: "-", isCorrect: true },
      { id: "b", text: "diff", isCorrect: false },
      { id: "c", text: "\\", isCorrect: false },
      { id: "d", text: "minus", isCorrect: false }
    ],
    explanation: "The - operator or difference() method finds elements in one set but not another."
  },
  {
    id: "py166",
    question: "What is the result of: {1, 2} | {2, 3}?",
    options: [
      { id: "a", text: "{1, 2, 3}", isCorrect: true },
      { id: "b", text: "{2}", isCorrect: false },
      { id: "c", text: "{1, 3}", isCorrect: false },
      { id: "d", text: "Error", isCorrect: false }
    ],
    explanation: "The | operator performs set union, combining elements from both sets."
  },
  {
    id: "py167",
    question: "Which method adds an element to a set?",
    options: [
      { id: "a", text: "append()", isCorrect: false },
      { id: "b", text: "add()", isCorrect: true },
      { id: "c", text: "insert()", isCorrect: false },
      { id: "d", text: "put()", isCorrect: false }
    ],
    explanation: "add() adds a single element to a set (if not already present)."
  },
  {
    id: "py168",
    question: "What is the result of: {1, 2} & {2, 3}?",
    options: [
      { id: "a", text: "{1, 2, 3}", isCorrect: false },
      { id: "b", text: "{2}", isCorrect: true },
      { id: "c", text: "{1, 3}", isCorrect: false },
      { id: "d", text: "set()", isCorrect: false }
    ],
    explanation: "The & operator performs set intersection, returning common elements."
  },
  {
    id: "py169",
    question: "Which method removes an element from a set?",
    options: [
      { id: "a", text: "remove()", isCorrect: true },
      { id: "b", text: "delete()", isCorrect: false },
      { id: "c", text: "pop()", isCorrect: false },
      { id: "d", text: "drop()", isCorrect: false }
    ],
    explanation: "remove() removes an element from a set, raising KeyError if not found. discard() doesn't raise error."
  },
  {
    id: "py170",
    question: "What is the result of: {1, 2} ^ {2, 3}?",
    options: [
      { id: "a", text: "{1, 2, 3}", isCorrect: false },
      { id: "b", text: "{2}", isCorrect: false },
      { id: "c", text: "{1, 3}", isCorrect: true },
      { id: "d", text: "set()", isCorrect: false }
    ],
    explanation: "The ^ operator performs symmetric difference, returning elements in either set but not both."
  },
  {
    id: "py171",
    question: "Which method updates a set with elements from another iterable?",
    options: [
      { id: "a", text: "add_all()", isCorrect: false },
      { id: "b", text: "update()", isCorrect: true },
      { id: "c", text: "extend()", isCorrect: false },
      { id: "d", text: "merge()", isCorrect: false }
    ],
    explanation: "update() adds all elements from an iterable to the set."
  },
  {
    id: "py172",
    question: "What does the issubset() method check?",
    options: [
      { id: "a", text: "If set is a subset of another", isCorrect: true },
      { id: "b", text: "If set has subsets", isCorrect: false },
      { id: "c", text: "If set is empty", isCorrect: false },
      { id: "d", text: "If set is valid", isCorrect: false }
    ],
    explanation: "issubset() returns True if all elements of the set are in another set."
  },
  {
    id: "py173",
    question: "Which method removes and returns an arbitrary element from a set?",
    options: [
      { id: "a", text: "remove()", isCorrect: false },
      { id: "b", text: "pop()", isCorrect: true },
      { id: "c", text: "get()", isCorrect: false },
      { id: "d", text: "take()", isCorrect: false }
    ],
    explanation: "pop() removes and returns an arbitrary element from a set, raising KeyError if empty."
  },
  {
    id: "py174",
    question: "What does the issuperset() method check?",
    options: [
      { id: "a", text: "If set is a superset of another", isCorrect: true },
      { id: "b", text: "If set has supersets", isCorrect: false },
      { id: "c", text: "If set is large", isCorrect: false },
      { id: "d", text: "If set is complete", isCorrect: false }
    ],
    explanation: "issuperset() returns True if the set contains all elements of another set."
  },
  {
    id: "py175",
    question: "Which method safely removes an element from a set?",
    options: [
      { id: "a", text: "remove()", isCorrect: false },
      { id: "b", text: "discard()", isCorrect: true },
      { id: "c", text: "delete()", isCorrect: false },
      { id: "d", text: "safe_remove()", isCorrect: false }
    ],
    explanation: "discard() removes an element if present, without raising an error if not found."
  },
  {
    id: "py176",
    question: "What does the isdisjoint() method check?",
    options: [
      { id: "a", text: "If sets share no common elements", isCorrect: true },
      { id: "b", text: "If sets are separated", isCorrect: false },
      { id: "c", text: "If sets are different", isCorrect: false },
      { id: "d", text: "If sets are disconnected", isCorrect: false }
    ],
    explanation: "isdisjoint() returns True if two sets have no elements in common."
  },
  {
    id: "py177",
    question: "Which method returns dictionary keys?",
    options: [
      { id: "a", text: "keys()", isCorrect: true },
      { id: "b", text: "getkeys()", isCorrect: false },
      { id: "c", text: "keylist()", isCorrect: false },
      { id: "d", text: "allkeys()", isCorrect: false }
    ],
    explanation: "keys() returns a view object containing the dictionary's keys."
  },
  {
    id: "py178",
    question: "What is the result of: dict.fromkeys(['a', 'b'], 0)?",
    options: [
      { id: "a", text: "{'a': 0, 'b': 0}", isCorrect: true },
      { id: "b", text: "{'a': ['a'], 'b': ['b']}", isCorrect: false },
      { id: "c", text: "Error", isCorrect: false },
      { id: "d", text: "{0: ['a', 'b']}", isCorrect: false }
    ],
    explanation: "dict.fromkeys() creates a dictionary with specified keys and the same value for all."
  },
  {
    id: "py179",
    question: "Which method returns dictionary values?",
    options: [
      { id: "a", text: "values()", isCorrect: true },
      { id: "b", text: "getvalues()", isCorrect: false },
      { id: "c", text: "valuelist()", isCorrect: false },
      { id: "d", text: "allvalues()", isCorrect: false }
    ],
    explanation: "values() returns a view object containing the dictionary's values."
  },
  {
    id: "py180",
    question: "What does the get() method do for dictionaries?",
    options: [
      { id: "a", text: "Gets all key-value pairs", isCorrect: false },
      { id: "b", text: "Gets value for a key with optional default", isCorrect: true },
      { id: "c", text: "Gets only keys", isCorrect: false },
      { id: "d", text: "Gets dictionary size", isCorrect: false }
    ],
    explanation: "get() returns the value for a key, or a default value if the key doesn't exist."
  },
  {
    id: "py181",
    question: "Which method returns dictionary key-value pairs?",
    options: [
      { id: "a", text: "items()", isCorrect: true },
      { id: "b", text: "pairs()", isCorrect: false },
      { id: "c", text: "entries()", isCorrect: false },
      { id: "d", text: "elements()", isCorrect: false }
    ],
    explanation: "items() returns a view object containing the dictionary's key-value pairs as tuples."
  },
  {
    id: "py182",
    question: "What does the setdefault() method do?",
    options: [
      { id: "a", text: "Sets all values to default", isCorrect: false },
      { id: "b", text: "Gets value or sets default if key missing", isCorrect: true },
      { id: "c", text: "Sets default dictionary", isCorrect: false },
      { id: "d", text: "Resets dictionary", isCorrect: false }
    ],
    explanation: "setdefault() returns the value of a key, or sets and returns a default if key doesn't exist."
  },
  {
    id: "py183",
    question: "Which method removes a key-value pair from a dictionary?",
    options: [
      { id: "a", text: "remove()", isCorrect: false },
      { id: "b", text: "pop()", isCorrect: true },
      { id: "c", text: "delete()", isCorrect: false },
      { id: "d", text: "discard()", isCorrect: false }
    ],
    explanation: "pop() removes a key and returns its value, with optional default if key not found."
  },
  {
    id: "py184",
    question: "What does the popitem() method do?",
    options: [
      { id: "a", text: "Removes a specific item", isCorrect: false },
      { id: "b", text: "Removes and returns an arbitrary key-value pair", isCorrect: true },
      { id: "c", text: "Pops all items", isCorrect: false },
      { id: "d", text: "Returns last item", isCorrect: false }
    ],
    explanation: "popitem() removes and returns an arbitrary (key, value) pair from the dictionary."
  },
  {
    id: "py185",
    question: "Which method updates a dictionary with another dictionary?",
    options: [
      { id: "a", text: "merge()", isCorrect: false },
      { id: "b", text: "update()", isCorrect: true },
      { id: "c", text: "combine()", isCorrect: false },
      { id: "d", text: "join()", isCorrect: false }
    ],
    explanation: "update() updates the dictionary with key-value pairs from another dictionary or iterable."
  },
  {
    id: "py186",
    question: "What is the result of: dict(zip(['a', 'b'], [1, 2]))?",
    options: [
      { id: "a", text: "{'a': 1, 'b': 2}", isCorrect: true },
      { id: "b", text: "{1: 'a', 2: 'b'}", isCorrect: false },
      { id: "c", text: "Error", isCorrect: false },
      { id: "d", text: "[('a', 1), ('b', 2)]", isCorrect: false }
    ],
    explanation: "dict() can create a dictionary from an iterable of key-value pairs, like from zip()."
  },
  {
    id: "py187",
    question: "Which method creates a shallow copy of a dictionary?",
    options: [
      { id: "a", text: "duplicate()", isCorrect: false },
      { id: "b", text: "copy()", isCorrect: true },
      { id: "c", text: "clone()", isCorrect: false },
      { id: "d", text: "backup()", isCorrect: false }
    ],
    explanation: "copy() creates a shallow copy of the dictionary."
  },
  {
    id: "py188",
    question: "What does the clear() method do for dictionaries?",
    options: [
      { id: "a", text: "Clears screen", isCorrect: false },
      { id: "b", text: "Removes all items", isCorrect: true },
      { id: "c", text: "Clears values only", isCorrect: false },
      { id: "d", text: "Clears keys only", isCorrect: false }
    ],
    explanation: "clear() removes all items from the dictionary, making it empty."
  },
  {
    id: "py189",
    question: "Which operator checks if a key exists in a dictionary?",
    options: [
      { id: "a", text: "exists", isCorrect: false },
      { id: "b", text: "in", isCorrect: true },
      { id: "c", text: "has", isCorrect: false },
      { id: "d", text: "contains", isCorrect: false }
    ],
    explanation: "The 'in' operator checks if a key exists in a dictionary."
  },
  {
    id: "py190",
    question: "What is a dictionary comprehension?",
    options: [
      { id: "a", text: "Understanding dictionaries", isCorrect: false },
      { id: "b", text: "Concise way to create dictionaries", isCorrect: true },
      { id: "c", text: "Dictionary documentation", isCorrect: false },
      { id: "d", text: "Dictionary method", isCorrect: false }
    ],
    explanation: "Dictionary comprehensions provide a concise way to create dictionaries: {k: v for k, v in items}."
  },
  {
    id: "py191",
    question: "Which module provides high-performance array operations?",
    options: [
      { id: "a", text: "array", isCorrect: false },
      { id: "b", text: "numpy", isCorrect: true },
      { id: "c", text: "arrays", isCorrect: false },
      { id: "d", text: "matrix", isCorrect: false }
    ],
    explanation: "NumPy provides efficient array operations and is the foundation for scientific computing in Python."
  },
  {
    id: "py192",
    question: "What does the random.choice() function do?",
    options: [
      { id: "a", text: "Makes a choice", isCorrect: false },
      { id: "b", text: "Returns random element from sequence", isCorrect: true },
      { id: "c", text: "Chooses random number", isCorrect: false },
      { id: "d", text: "Selects random option", isCorrect: false }
    ],
    explanation: "random.choice() returns a random element from a non-empty sequence."
  },
  {
    id: "py193",
    question: "Which module is used for regular expressions?",
    options: [
      { id: "a", text: "regex", isCorrect: false },
      { id: "b", text: "re", isCorrect: true },
      { id: "c", text: "regexp", isCorrect: false },
      { id: "d", text: "pattern", isCorrect: false }
    ],
    explanation: "The 're' module provides regular expression matching operations."
  },
  {
    id: "py194",
    question: "What does the os.path.join() function do?",
    options: [
      { id: "a", text: "Joins processes", isCorrect: false },
      { id: "b", text: "Joins file paths", isCorrect: true },
      { id: "c", text: "Joins strings", isCorrect: false },
      { id: "d", text: "Joins networks", isCorrect: false }
    ],
    explanation: "os.path.join() intelligently joins one or more path components using the appropriate separator."
  },
  {
    id: "py195",
    question: "Which function opens a file in Python?",
    options: [
      { id: "a", text: "file()", isCorrect: false },
      { id: "b", text: "open()", isCorrect: true },
      { id: "c", text: "read()", isCorrect: false },
      { id: "d", text: "load()", isCorrect: false }
    ],
    explanation: "open() is the built-in function used to open files in Python."
  },
  {
    id: "py196",
    question: "What does the json.loads() function do?",
    options: [
      { id: "a", text: "Loads JSON file", isCorrect: false },
      { id: "b", text: "Parses JSON string to Python object", isCorrect: true },
      { id: "c", text: "Loads multiple JSONs", isCorrect: false },
      { id: "d", text: "Loads JSON from URL", isCorrect: false }
    ],
    explanation: "json.loads() parses a JSON string and returns the corresponding Python object."
  },
  {
    id: "py197",
    question: "Which method writes to a file?",
    options: [
      { id: "a", text: "put()", isCorrect: false },
      { id: "b", text: "write()", isCorrect: true },
      { id: "c", text: "save()", isCorrect: false },
      { id: "d", text: "output()", isCorrect: false }
    ],
    explanation: "write() method writes a string to a file."
  },
  {
    id: "py198",
    question: "What does the datetime.now() function return?",
    options: [
      { id: "a", text: "Current date only", isCorrect: false },
      { id: "b", text: "Current date and time", isCorrect: true },
      { id: "c", text: "Current time only", isCorrect: false },
      { id: "d", text: "Current year", isCorrect: false }
    ],
    explanation: "datetime.now() returns the current local date and time."
  },
  {
    id: "py199",
    question: "Which module is used for copying objects?",
    options: [
      { id: "a", text: "copy", isCorrect: true },
      { id: "b", text: "clone", isCorrect: false },
      { id: "c", text: "duplicate", isCorrect: false },
      { id: "d", text: "backup", isCorrect: false }
    ],
    explanation: "The 'copy' module provides functions for shallow and deep copying of objects."
  },
  {
    id: "py200",
    question: "What does the math.sqrt() function do?",
    options: [
      { id: "a", text: "Calculates square", isCorrect: false },
      { id: "b", text: "Calculates square root", isCorrect: true },
      { id: "c", text: "Calculates power", isCorrect: false },
      { id: "d", text: "Calculates factorial", isCorrect: false }
    ],
    explanation: "math.sqrt() returns the square root of a number."
  },
  {
    id: "py201",
    question: "Which exception is raised when dividing by zero?",
    options: [
      { id: "a", text: "ValueError", isCorrect: false },
      { id: "b", text: "ZeroDivisionError", isCorrect: true },
      { id: "c", text: "ArithmeticError", isCorrect: false },
      { id: "d", text: "MathError", isCorrect: false }
    ],
    explanation: "ZeroDivisionError is raised when attempting to divide by zero."
  },
  {
    id: "py202",
    question: "What does the sys.argv contain?",
    options: [
      { id: "a", text: "System arguments", isCorrect: false },
      { id: "b", text: "Command line arguments", isCorrect: true },
      { id: "c", text: "Function arguments", isCorrect: false },
      { id: "d", text: "Variable arguments", isCorrect: false }
    ],
    explanation: "sys.argv is a list containing the command-line arguments passed to a Python script."
  },
  {
    id: "py203",
    question: "Which keyword raises an exception?",
    options: [
      { id: "a", text: "throw", isCorrect: false },
      { id: "b", text: "raise", isCorrect: true },
      { id: "c", text: "error", isCorrect: false },
      { id: "d", text: "exception", isCorrect: false }
    ],
    explanation: "The 'raise' keyword is used to raise exceptions in Python."
  },
  
  // Advanced Python - Data Structures & Algorithms
  {
    id: "py201",
    question: "What is the time complexity of accessing an element in a Python dictionary?",
    options: [
      { id: "a", text: "O(1) average case", isCorrect: true },
      { id: "b", text: "O(n)", isCorrect: false },
      { id: "c", text: "O(log n)", isCorrect: false },
      { id: "d", text: "O(n²)", isCorrect: false }
    ],
    explanation: "Python dictionaries use hash tables, providing O(1) average case time complexity for access, insertion, and deletion operations."
  },
  
  {
    id: "py202",
    question: "Which Python data structure is best for implementing a queue?",
    options: [
      { id: "a", text: "list", isCorrect: false },
      { id: "b", text: "collections.deque", isCorrect: true },
      { id: "c", text: "tuple", isCorrect: false },
      { id: "d", text: "set", isCorrect: false }
    ],
    explanation: "collections.deque (double-ended queue) is optimized for fast appends and pops from both ends, making it ideal for implementing queues."
  },
  
  {
    id: "py203",
    question: "What does the following list comprehension do: [x**2 for x in range(10) if x % 2 == 0]?",
    options: [
      { id: "a", text: "Squares of all numbers from 0 to 9", isCorrect: false },
      { id: "b", text: "Squares of even numbers from 0 to 9", isCorrect: true },
      { id: "c", text: "Even numbers from 0 to 9", isCorrect: false },
      { id: "d", text: "Squares of odd numbers from 0 to 9", isCorrect: false }
    ],
    explanation: "This list comprehension creates squares of even numbers (0, 2, 4, 6, 8) from the range 0 to 9, resulting in [0, 4, 16, 36, 64]."
  },
  
  // Python - Object-Oriented Programming
  {
    id: "py204",
    question: "What is the purpose of the __init__ method in a Python class?",
    options: [
      { id: "a", text: "To destroy objects", isCorrect: false },
      { id: "b", text: "To initialize object attributes", isCorrect: true },
      { id: "c", text: "To define class methods", isCorrect: false },
      { id: "d", text: "To create static methods", isCorrect: false }
    ],
    explanation: "The __init__ method is a constructor that initializes object attributes when an instance of the class is created."
  },
  
  {
    id: "py205",
    question: "Which decorator is used to create a static method in Python?",
    options: [
      { id: "a", text: "@classmethod", isCorrect: false },
      { id: "b", text: "@staticmethod", isCorrect: true },
      { id: "c", text: "@property", isCorrect: false },
      { id: "d", text: "@method", isCorrect: false }
    ],
    explanation: "@staticmethod decorator creates a method that doesn't receive self or cls as the first argument and can be called without creating an instance."
  },
  
  {
    id: "py206",
    question: "What is method resolution order (MRO) in Python?",
    options: [
      { id: "a", text: "Order of method execution", isCorrect: false },
      { id: "b", text: "Order in which Python searches for methods in inheritance hierarchy", isCorrect: true },
      { id: "c", text: "Order of importing modules", isCorrect: false },
      { id: "d", text: "Order of defining methods in a class", isCorrect: false }
    ],
    explanation: "MRO determines the order in which Python searches for methods in a class hierarchy, following the C3 linearization algorithm."
  },
  
  // Python - Functional Programming
  {
    id: "py207",
    question: "What does the map() function do in Python?",
    options: [
      { id: "a", text: "Creates a dictionary", isCorrect: false },
      { id: "b", text: "Applies a function to each item in an iterable", isCorrect: true },
      { id: "c", text: "Filters items from a list", isCorrect: false },
      { id: "d", text: "Sorts a list", isCorrect: false }
    ],
    explanation: "map() applies a given function to each item of an iterable and returns a map object (iterator) with the results."
  },
  
  {
    id: "py208",
    question: "Which of the following is a lambda function in Python?",
    options: [
      { id: "a", text: "def func(x): return x * 2", isCorrect: false },
      { id: "b", text: "lambda x: x * 2", isCorrect: true },
      { id: "c", text: "function(x) { return x * 2; }", isCorrect: false },
      { id: "d", text: "x => x * 2", isCorrect: false }
    ],
    explanation: "Lambda functions are anonymous functions defined using the 'lambda' keyword, useful for short, simple functions."
  },
  
  {
    id: "py209",
    question: "What is the result of: list(filter(lambda x: x > 5, [1, 3, 7, 9, 2, 8]))?",
    options: [
      { id: "a", text: "[7, 9, 8]", isCorrect: true },
      { id: "b", text: "[1, 3, 2]", isCorrect: false },
      { id: "c", text: "[1, 3, 7, 9, 2, 8]", isCorrect: false },
      { id: "d", text: "[]", isCorrect: false }
    ],
    explanation: "filter() returns elements that satisfy the condition (x > 5), so it returns [7, 9, 8] from the given list."
  },
  
  // Python - Decorators & Advanced Features
  {
    id: "py210",
    question: "What is a decorator in Python?",
    options: [
      { id: "a", text: "A design pattern", isCorrect: false },
      { id: "b", text: "A function that modifies or extends another function", isCorrect: true },
      { id: "c", text: "A type of loop", isCorrect: false },
      { id: "d", text: "A data structure", isCorrect: false }
    ],
    explanation: "A decorator is a function that takes another function as argument and extends its behavior without explicitly modifying it."
  },
  
  {
    id: "py211",
    question: "What does *args allow in a Python function?",
    options: [
      { id: "a", text: "Multiple keyword arguments", isCorrect: false },
      { id: "b", text: "Variable number of positional arguments", isCorrect: true },
      { id: "c", text: "Optional arguments", isCorrect: false },
      { id: "d", text: "Default arguments", isCorrect: false }
    ],
    explanation: "*args allows a function to accept any number of positional arguments, which are collected into a tuple."
  },
  
  {
    id: "py212",
    question: "What does **kwargs allow in a Python function?",
    options: [
      { id: "a", text: "Variable number of positional arguments", isCorrect: false },
      { id: "b", text: "Variable number of keyword arguments", isCorrect: true },
      { id: "c", text: "Multiple return values", isCorrect: false },
      { id: "d", text: "Nested functions", isCorrect: false }
    ],
    explanation: "**kwargs allows a function to accept any number of keyword arguments, which are collected into a dictionary."
  },
  
  // Python - Generators & Iterators
  {
    id: "py213",
    question: "What keyword is used to create a generator function in Python?",
    options: [
      { id: "a", text: "return", isCorrect: false },
      { id: "b", text: "yield", isCorrect: true },
      { id: "c", text: "generate", isCorrect: false },
      { id: "d", text: "iterator", isCorrect: false }
    ],
    explanation: "The 'yield' keyword is used to create generator functions, which return a generator object that can be iterated over."
  },
  
  {
    id: "py214",
    question: "What is the main advantage of generators over lists?",
    options: [
      { id: "a", text: "Faster execution", isCorrect: false },
      { id: "b", text: "Memory efficiency", isCorrect: true },
      { id: "c", text: "Better syntax", isCorrect: false },
      { id: "d", text: "Type safety", isCorrect: false }
    ],
    explanation: "Generators are memory efficient because they generate values on-demand rather than storing all values in memory like lists."
  },
  
  {
    id: "py215",
    question: "What is the difference between __iter__ and __next__ methods?",
    options: [
      { id: "a", text: "__iter__ returns the iterator object, __next__ returns the next value", isCorrect: true },
      { id: "b", text: "They are the same", isCorrect: false },
      { id: "c", text: "__iter__ returns next value, __next__ returns iterator", isCorrect: false },
      { id: "d", text: "Both return iterator objects", isCorrect: false }
    ],
    explanation: "__iter__ returns the iterator object itself, while __next__ returns the next value in the iteration sequence."
  },
  
  // Python - Context Managers
  {
    id: "py216",
    question: "What is the purpose of the 'with' statement in Python?",
    options: [
      { id: "a", text: "Creating loops", isCorrect: false },
      { id: "b", text: "Context management and resource cleanup", isCorrect: true },
      { id: "c", text: "Exception handling", isCorrect: false },
      { id: "d", text: "Function definition", isCorrect: false }
    ],
    explanation: "The 'with' statement provides context management, ensuring proper resource cleanup (like closing files) even if errors occur."
  },
  
  {
    id: "py217",
    question: "Which methods must a class implement to be used as a context manager?",
    options: [
      { id: "a", text: "__init__ and __del__", isCorrect: false },
      { id: "b", text: "__enter__ and __exit__", isCorrect: true },
      { id: "c", text: "__start__ and __stop__", isCorrect: false },
      { id: "d", text: "__open__ and __close__", isCorrect: false }
    ],
    explanation: "A context manager must implement __enter__ (called when entering the with block) and __exit__ (called when leaving the block)."
  },
  
  // Python - Metaclasses & Advanced OOP
  {
    id: "py218",
    question: "What is a metaclass in Python?",
    options: [
      { id: "a", text: "A class inside another class", isCorrect: false },
      { id: "b", text: "A class that creates classes", isCorrect: true },
      { id: "c", text: "A parent class", isCorrect: false },
      { id: "d", text: "An abstract class", isCorrect: false }
    ],
    explanation: "A metaclass is a class whose instances are classes. It defines how classes are created and can customize class creation behavior."
  },
  
  {
    id: "py219",
    question: "What does the super() function do?",
    options: [
      { id: "a", text: "Creates a superclass", isCorrect: false },
      { id: "b", text: "Gives access to methods in a parent class", isCorrect: true },
      { id: "c", text: "Makes a class superior", isCorrect: false },
      { id: "d", text: "Creates multiple inheritance", isCorrect: false }
    ],
    explanation: "super() returns a proxy object that allows access to methods in a parent or sibling class, commonly used in inheritance."
  },
  
  {
    id: "py220",
    question: "What is the difference between @property and @classmethod?",
    options: [
      { id: "a", text: "@property creates class variables, @classmethod creates instance methods", isCorrect: false },
      { id: "b", text: "@property creates getter/setter methods, @classmethod creates methods that receive cls", isCorrect: true },
      { id: "c", text: "They are the same", isCorrect: false },
      { id: "d", text: "@property is for inheritance, @classmethod is for polymorphism", isCorrect: false }
    ],
    explanation: "@property creates getter/setter methods for attributes, while @classmethod creates methods that receive the class (cls) as first argument."
  },
  
  // Python - Concurrency & Threading
  {
    id: "py221",
    question: "What is the Global Interpreter Lock (GIL) in Python?",
    options: [
      { id: "a", text: "A security feature", isCorrect: false },
      { id: "b", text: "A mutex that protects access to Python objects", isCorrect: true },
      { id: "c", text: "A type of error", isCorrect: false },
      { id: "d", text: "A debugging tool", isCorrect: false }
    ],
    explanation: "The GIL is a mutex that protects access to Python objects, preventing multiple threads from executing Python bytecode simultaneously."
  },
  
  {
    id: "py222",
    question: "Which module is used for asynchronous programming in Python?",
    options: [
      { id: "a", text: "threading", isCorrect: false },
      { id: "b", text: "asyncio", isCorrect: true },
      { id: "c", text: "multiprocessing", isCorrect: false },
      { id: "d", text: "concurrent", isCorrect: false }
    ],
    explanation: "The asyncio module provides support for asynchronous programming using async/await syntax and event loops."
  },
  
  {
    id: "py223",
    question: "What keyword is used to define an asynchronous function?",
    options: [
      { id: "a", text: "async def", isCorrect: true },
      { id: "b", text: "await def", isCorrect: false },
      { id: "c", text: "asyncio def", isCorrect: false },
      { id: "d", text: "thread def", isCorrect: false }
    ],
    explanation: "The 'async def' keywords are used together to define asynchronous functions (coroutines) in Python."
  },
  
  // Python - Memory Management & Performance
  {
    id: "py224",
    question: "What is the purpose of the __slots__ attribute in Python classes?",
    options: [
      { id: "a", text: "To define method order", isCorrect: false },
      { id: "b", text: "To restrict attribute creation and save memory", isCorrect: true },
      { id: "c", text: "To create private methods", isCorrect: false },
      { id: "d", text: "To enable multiple inheritance", isCorrect: false }
    ],
    explanation: "__slots__ restricts the attributes that can be created for instances and can significantly reduce memory usage."
  },
  
  {
    id: "py225",
    question: "Which built-in function can be used to check the memory usage of an object?",
    options: [
      { id: "a", text: "sizeof()", isCorrect: false },
      { id: "b", text: "sys.getsizeof()", isCorrect: true },
      { id: "c", text: "memory.size()", isCorrect: false },
      { id: "d", text: "len()", isCorrect: false }
    ],
    explanation: "sys.getsizeof() returns the size of an object in bytes, useful for memory profiling and optimization."
  },
  
  // Python - Advanced Data Manipulation
  {
    id: "py226",
    question: "What does the collections.Counter class do?",
    options: [
      { id: "a", text: "Counts lines in a file", isCorrect: false },
      { id: "b", text: "Counts occurrences of elements in an iterable", isCorrect: true },
      { id: "c", text: "Counts function calls", isCorrect: false },
      { id: "d", text: "Counts memory usage", isCorrect: false }
    ],
    explanation: "collections.Counter is a dict subclass for counting hashable objects, making it easy to count element occurrences."
  },
  
  {
    id: "py227",
    question: "What is the purpose of collections.defaultdict?",
    options: [
      { id: "a", text: "Creates a dictionary with default values", isCorrect: true },
      { id: "b", text: "Creates an empty dictionary", isCorrect: false },
      { id: "c", text: "Creates a sorted dictionary", isCorrect: false },
      { id: "d", text: "Creates a read-only dictionary", isCorrect: false }
    ],
    explanation: "defaultdict automatically creates missing values using a default factory function, eliminating KeyError exceptions."
  },
  
  {
    id: "py228",
    question: "What does the zip() function do?",
    options: [
      { id: "a", text: "Compresses files", isCorrect: false },
      { id: "b", text: "Combines multiple iterables element-wise", isCorrect: true },
      { id: "c", text: "Sorts lists", isCorrect: false },
      { id: "d", text: "Reverses lists", isCorrect: false }
    ],
    explanation: "zip() takes multiple iterables and returns an iterator of tuples, where each tuple contains elements from all iterables at the same position."
  },
  
  // Python - Regular Expressions
  {
    id: "py229",
    question: "Which module is used for regular expressions in Python?",
    options: [
      { id: "a", text: "regex", isCorrect: false },
      { id: "b", text: "re", isCorrect: true },
      { id: "c", text: "regexp", isCorrect: false },
      { id: "d", text: "pattern", isCorrect: false }
    ],
    explanation: "The 're' module provides regular expression operations in Python for pattern matching and text processing."
  },
  
  {
    id: "py230",
    question: "What does the re.search() function return if no match is found?",
    options: [
      { id: "a", text: "Empty string", isCorrect: false },
      { id: "b", text: "None", isCorrect: true },
      { id: "c", text: "False", isCorrect: false },
      { id: "d", text: "Empty list", isCorrect: false }
    ],
    explanation: "re.search() returns None when no match is found, which is why it's common to check for None before accessing match results."
  },
  
  // Python - File Handling & I/O
  {
    id: "py231",
    question: "What is the advantage of using 'with open()' over just 'open()'?",
    options: [
      { id: "a", text: "Faster file reading", isCorrect: false },
      { id: "b", text: "Automatic file closing", isCorrect: true },
      { id: "c", text: "Better error messages", isCorrect: false },
      { id: "d", text: "More file formats supported", isCorrect: false }
    ],
    explanation: "'with open()' automatically closes the file when exiting the block, even if an exception occurs, ensuring proper resource management."
  },
  
  {
    id: "py232",
    question: "Which file mode opens a file for both reading and writing?",
    options: [
      { id: "a", text: "'rw'", isCorrect: false },
      { id: "b", text: "'r+'", isCorrect: true },
      { id: "c", text: "'w+'", isCorrect: false },
      { id: "d", text: "'a+'", isCorrect: false }
    ],
    explanation: "'r+' opens a file for both reading and writing, positioning the pointer at the beginning of the file."
  },
  
  // Python - Testing & Debugging
  {
    id: "py233",
    question: "Which module is commonly used for unit testing in Python?",
    options: [
      { id: "a", text: "pytest", isCorrect: false },
      { id: "b", text: "unittest", isCorrect: true },
      { id: "c", text: "test", isCorrect: false },
      { id: "d", text: "testing", isCorrect: false }
    ],
    explanation: "The unittest module is Python's built-in testing framework, though pytest is also widely used as a third-party alternative."
  },
  
  {
    id: "py234",
    question: "What does the assert statement do?",
    options: [
      { id: "a", text: "Declares a variable", isCorrect: false },
      { id: "b", text: "Tests if a condition is true, raises AssertionError if false", isCorrect: true },
      { id: "c", text: "Prints debug information", isCorrect: false },
      { id: "d", text: "Handles exceptions", isCorrect: false }
    ],
    explanation: "assert tests if a condition is true and raises an AssertionError with an optional message if the condition is false."
  },
  
  // Python - Modules & Packages
  {
    id: "py235",
    question: "What is the difference between import and from...import?",
    options: [
      { id: "a", text: "No difference", isCorrect: false },
      { id: "b", text: "import loads entire module, from...import loads specific items", isCorrect: true },
      { id: "c", text: "import is faster", isCorrect: false },
      { id: "d", text: "from...import is deprecated", isCorrect: false }
    ],
    explanation: "'import' loads the entire module namespace, while 'from...import' loads only specific functions/classes into the current namespace."
  },
  
  {
    id: "py236",
    question: "What is the purpose of __init__.py file?",
    options: [
      { id: "a", text: "Initializes variables", isCorrect: false },
      { id: "b", text: "Marks a directory as a Python package", isCorrect: true },
      { id: "c", text: "Contains main function", isCorrect: false },
      { id: "d", text: "Stores configuration", isCorrect: false }
    ],
    explanation: "__init__.py marks a directory as a Python package and can contain initialization code that runs when the package is imported."
  },
  
  // Python - Advanced String Operations
  {
    id: "py237",
    question: "What is the difference between str.format() and f-strings?",
    options: [
      { id: "a", text: "No difference", isCorrect: false },
      { id: "b", text: "f-strings are faster and more readable", isCorrect: true },
      { id: "c", text: "str.format() is newer", isCorrect: false },
      { id: "d", text: "f-strings only work with numbers", isCorrect: false }
    ],
    explanation: "f-strings (formatted string literals) are generally faster and more readable than str.format(), introduced in Python 3.6."
  },
  
  {
    id: "py238",
    question: "What does the string method .join() do?",
    options: [
      { id: "a", text: "Connects to a network", isCorrect: false },
      { id: "b", text: "Joins elements of an iterable with a separator", isCorrect: true },
      { id: "c", text: "Merges two strings", isCorrect: false },
      { id: "d", text: "Splits a string", isCorrect: false }
    ],
    explanation: ".join() takes an iterable of strings and joins them using the string as a separator, returning a single string."
  },
  
  // Python - Error Handling Advanced
  {
    id: "py239",
    question: "What is the purpose of the finally block in exception handling?",
    options: [
      { id: "a", text: "Runs only if no exception occurs", isCorrect: false },
      { id: "b", text: "Runs regardless of whether an exception occurs", isCorrect: true },
      { id: "c", text: "Runs only if an exception occurs", isCorrect: false },
      { id: "d", text: "Terminates the program", isCorrect: false }
    ],
    explanation: "The finally block always executes, whether an exception occurred or not, making it useful for cleanup operations."
  },
  
  {
    id: "py240",
    question: "What is the difference between BaseException and Exception?",
    options: [
      { id: "a", text: "No difference", isCorrect: false },
      { id: "b", text: "BaseException is the parent class of all exceptions including system-exiting ones", isCorrect: true },
      { id: "c", text: "Exception is more general", isCorrect: false },
      { id: "d", text: "BaseException is deprecated", isCorrect: false }
    ],
    explanation: "BaseException is the base class for all exceptions, including SystemExit and KeyboardInterrupt, while Exception excludes system-exiting exceptions."
  }
];

// JavaScript Test Questions
const javascriptQuestions: QuizQuestion[] = [
  {
    id: "js1",
    question: "What is the correct way to declare a variable in modern JavaScript?",
    options: [
      { id: "a", text: "var name = 'John'", isCorrect: false },
      { id: "b", text: "let name = 'John'", isCorrect: true },
      { id: "c", text: "variable name = 'John'", isCorrect: false },
      { id: "d", text: "string name = 'John'", isCorrect: false }
    ],
    explanation: "In modern JavaScript (ES6+), 'let' and 'const' are preferred over 'var' for variable declaration due to block scoping."
  },
  {
    id: "js2",
    question: "What does '===' operator do in JavaScript?",
    options: [
      { id: "a", text: "Checks only value equality", isCorrect: false },
      { id: "b", text: "Checks both value and type equality", isCorrect: true },
      { id: "c", text: "Assigns a value", isCorrect: false },
      { id: "d", text: "Performs type conversion", isCorrect: false }
    ],
    explanation: "The '===' operator performs strict equality comparison, checking both value and type without type coercion."
  },
  {
    id: "js3",
    question: "Which method is used to add elements to the end of an array?",
    options: [
      { id: "a", text: "append()", isCorrect: false },
      { id: "b", text: "add()", isCorrect: false },
      { id: "c", text: "push()", isCorrect: true },
      { id: "d", text: "insert()", isCorrect: false }
    ],
    explanation: "The push() method adds one or more elements to the end of an array and returns the new length."
  },
  {
    id: "js4",
    question: "What is the difference between null and undefined in JavaScript?",
    options: [
      { id: "a", text: "They are exactly the same", isCorrect: false },
      { id: "b", text: "null is assigned, undefined is unassigned", isCorrect: true },
      { id: "c", text: "undefined is assigned, null is unassigned", isCorrect: false },
      { id: "d", text: "null is a string, undefined is a number", isCorrect: false }
    ],
    explanation: "null is an assigned value representing no value, while undefined means a variable has been declared but not assigned a value."
  },
  {
    id: "js5",
    question: "Which method removes the last element from an array?",
    options: [
      { id: "a", text: "pop()", isCorrect: true },
      { id: "b", text: "remove()", isCorrect: false },
      { id: "c", text: "delete()", isCorrect: false },
      { id: "d", text: "splice()", isCorrect: false }
    ],
    explanation: "The pop() method removes and returns the last element from an array."
  },
  {
    id: "js6",
    question: "What does the typeof operator return for an array?",
    options: [
      { id: "a", text: "array", isCorrect: false },
      { id: "b", text: "object", isCorrect: true },
      { id: "c", text: "list", isCorrect: false },
      { id: "d", text: "collection", isCorrect: false }
    ],
    explanation: "Arrays in JavaScript are a type of object, so typeof returns 'object' for arrays."
  },
  {
    id: "js7",
    question: "Which keyword is used to define a constant in JavaScript?",
    options: [
      { id: "a", text: "constant", isCorrect: false },
      { id: "b", text: "const", isCorrect: true },
      { id: "c", text: "final", isCorrect: false },
      { id: "d", text: "static", isCorrect: false }
    ],
    explanation: "The 'const' keyword declares a constant variable that cannot be reassigned."
  },
  {
    id: "js8",
    question: "What is the output of: console.log(0.1 + 0.2 === 0.3)?",
    options: [
      { id: "a", text: "true", isCorrect: false },
      { id: "b", text: "false", isCorrect: true },
      { id: "c", text: "undefined", isCorrect: false },
      { id: "d", text: "Error", isCorrect: false }
    ],
    explanation: "Due to floating-point arithmetic precision issues, 0.1 + 0.2 equals 0.30000000000000004, not exactly 0.3."
  },
  {
    id: "js9",
    question: "Which method converts a string to uppercase?",
    options: [
      { id: "a", text: "toUpper()", isCorrect: false },
      { id: "b", text: "toUpperCase()", isCorrect: true },
      { id: "c", text: "upper()", isCorrect: false },
      { id: "d", text: "uppercase()", isCorrect: false }
    ],
    explanation: "The toUpperCase() method returns a new string with all characters converted to uppercase."
  },
  {
    id: "js10",
    question: "What does the isNaN() function check?",
    options: [
      { id: "a", text: "If a value is null", isCorrect: false },
      { id: "b", text: "If a value is not a number", isCorrect: true },
      { id: "c", text: "If a value is negative", isCorrect: false },
      { id: "d", text: "If a value is zero", isCorrect: false }
    ],
    explanation: "isNaN() returns true if the value is NaN (Not a Number) or cannot be converted to a number."
  },
  {
    id: "js11",
    question: "Which method adds elements to the beginning of an array?",
    options: [
      { id: "a", text: "unshift()", isCorrect: true },
      { id: "b", text: "prepend()", isCorrect: false },
      { id: "c", text: "addFirst()", isCorrect: false },
      { id: "d", text: "insert()", isCorrect: false }
    ],
    explanation: "The unshift() method adds one or more elements to the beginning of an array."
  },
  {
    id: "js12",
    question: "What is a closure in JavaScript?",
    options: [
      { id: "a", text: "A way to close the browser", isCorrect: false },
      { id: "b", text: "A function with access to outer scope variables", isCorrect: true },
      { id: "c", text: "A closed loop", isCorrect: false },
      { id: "d", text: "A sealed object", isCorrect: false }
    ],
    explanation: "A closure is a function that has access to variables in its outer (enclosing) scope even after the outer function has returned."
  },
  {
    id: "js13",
    question: "Which operator is used for string concatenation?",
    options: [
      { id: "a", text: "&", isCorrect: false },
      { id: "b", text: "+", isCorrect: true },
      { id: "c", text: ".", isCorrect: false },
      { id: "d", text: "concat", isCorrect: false }
    ],
    explanation: "The + operator can be used for both arithmetic addition and string concatenation in JavaScript."
  },
  {
    id: "js14",
    question: "What does JSON.parse() do?",
    options: [
      { id: "a", text: "Converts object to JSON string", isCorrect: false },
      { id: "b", text: "Converts JSON string to object", isCorrect: true },
      { id: "c", text: "Validates JSON format", isCorrect: false },
      { id: "d", text: "Minifies JSON", isCorrect: false }
    ],
    explanation: "JSON.parse() parses a JSON string and returns the corresponding JavaScript object."
  },
  {
    id: "js15",
    question: "Which method removes elements from an array at a specific index?",
    options: [
      { id: "a", text: "delete()", isCorrect: false },
      { id: "b", text: "remove()", isCorrect: false },
      { id: "c", text: "splice()", isCorrect: true },
      { id: "d", text: "cut()", isCorrect: false }
    ],
    explanation: "The splice() method changes an array by removing or replacing existing elements and/or adding new elements."
  },
  {
    id: "js16",
    question: "What is the scope of a variable declared with 'var'?",
    options: [
      { id: "a", text: "Block scope", isCorrect: false },
      { id: "b", text: "Function scope", isCorrect: true },
      { id: "c", text: "Global scope only", isCorrect: false },
      { id: "d", text: "Module scope", isCorrect: false }
    ],
    explanation: "Variables declared with 'var' have function scope, meaning they are accessible throughout the entire function."
  },
  {
    id: "js17",
    question: "Which method finds the index of an element in an array?",
    options: [
      { id: "a", text: "find()", isCorrect: false },
      { id: "b", text: "indexOf()", isCorrect: true },
      { id: "c", text: "search()", isCorrect: false },
      { id: "d", text: "locate()", isCorrect: false }
    ],
    explanation: "The indexOf() method returns the first index at which a given element can be found in the array."
  },
  {
    id: "js18",
    question: "What does the 'this' keyword refer to in a regular function?",
    options: [
      { id: "a", text: "The function itself", isCorrect: false },
      { id: "b", text: "The calling object", isCorrect: true },
      { id: "c", text: "The global object", isCorrect: false },
      { id: "d", text: "undefined", isCorrect: false }
    ],
    explanation: "In a regular function, 'this' refers to the object that called the function."
  },
  {
    id: "js19",
    question: "Which method creates a new array with results of calling a function for every element?",
    options: [
      { id: "a", text: "forEach()", isCorrect: false },
      { id: "b", text: "map()", isCorrect: true },
      { id: "c", text: "filter()", isCorrect: false },
      { id: "d", text: "reduce()", isCorrect: false }
    ],
    explanation: "The map() method creates a new array populated with the results of calling a provided function on every element."
  },
  {
    id: "js20",
    question: "What is the correct syntax for an arrow function?",
    options: [
      { id: "a", text: "function => (x) { return x * 2; }", isCorrect: false },
      { id: "b", text: "(x) => { return x * 2; }", isCorrect: true },
      { id: "c", text: "(x) -> { return x * 2; }", isCorrect: false },
      { id: "d", text: "x => return x * 2;", isCorrect: false }
    ],
    explanation: "Arrow functions use the => syntax: (parameters) => { function body }"
  },
  {
    id: "js21",
    question: "Which method tests whether at least one element passes a test?",
    options: [
      { id: "a", text: "some()", isCorrect: true },
      { id: "b", text: "every()", isCorrect: false },
      { id: "c", text: "find()", isCorrect: false },
      { id: "d", text: "includes()", isCorrect: false }
    ],
    explanation: "The some() method tests whether at least one element in the array passes the test implemented by the provided function."
  },
  {
    id: "js22",
    question: "What does Object.keys() return?",
    options: [
      { id: "a", text: "Object values", isCorrect: false },
      { id: "b", text: "Object keys as array", isCorrect: true },
      { id: "c", text: "Object length", isCorrect: false },
      { id: "d", text: "Object type", isCorrect: false }
    ],
    explanation: "Object.keys() returns an array of a given object's own enumerable property names."
  },
  {
    id: "js23",
    question: "Which method removes the first element from an array?",
    options: [
      { id: "a", text: "shift()", isCorrect: true },
      { id: "b", text: "unshift()", isCorrect: false },
      { id: "c", text: "pop()", isCorrect: false },
      { id: "d", text: "slice()", isCorrect: false }
    ],
    explanation: "The shift() method removes and returns the first element from an array."
  },
  {
    id: "js24",
    question: "What is the result of: Boolean('')?",
    options: [
      { id: "a", text: "true", isCorrect: false },
      { id: "b", text: "false", isCorrect: true },
      { id: "c", text: "undefined", isCorrect: false },
      { id: "d", text: "Error", isCorrect: false }
    ],
    explanation: "An empty string is falsy in JavaScript, so Boolean('') returns false."
  },
  {
    id: "js25",
    question: "Which method joins array elements into a string?",
    options: [
      { id: "a", text: "combine()", isCorrect: false },
      { id: "b", text: "merge()", isCorrect: false },
      { id: "c", text: "join()", isCorrect: true },
      { id: "d", text: "concat()", isCorrect: false }
    ],
    explanation: "The join() method creates and returns a new string by concatenating all elements in an array."
  },
  {
    id: "js26",
    question: "What does the filter() method do?",
    options: [
      { id: "a", text: "Modifies original array", isCorrect: false },
      { id: "b", text: "Creates new array with filtered elements", isCorrect: true },
      { id: "c", text: "Sorts array elements", isCorrect: false },
      { id: "d", text: "Removes all elements", isCorrect: false }
    ],
    explanation: "The filter() method creates a new array with all elements that pass the test implemented by the provided function."
  },
  {
    id: "js27",
    question: "Which keyword is used to handle exceptions in JavaScript?",
    options: [
      { id: "a", text: "catch", isCorrect: false },
      { id: "b", text: "try...catch", isCorrect: true },
      { id: "c", text: "handle", isCorrect: false },
      { id: "d", text: "exception", isCorrect: false }
    ],
    explanation: "The try...catch statement is used to handle exceptions in JavaScript."
  },
  {
    id: "js28",
    question: "What is the output of: typeof null?",
    options: [
      { id: "a", text: "null", isCorrect: false },
      { id: "b", text: "object", isCorrect: true },
      { id: "c", text: "undefined", isCorrect: false },
      { id: "d", text: "boolean", isCorrect: false }
    ],
    explanation: "This is a known quirk in JavaScript - typeof null returns 'object', not 'null'."
  },
  {
    id: "js29",
    question: "Which method creates a shallow copy of an array?",
    options: [
      { id: "a", text: "copy()", isCorrect: false },
      { id: "b", text: "slice()", isCorrect: true },
      { id: "c", text: "clone()", isCorrect: false },
      { id: "d", text: "duplicate()", isCorrect: false }
    ],
    explanation: "The slice() method with no arguments creates a shallow copy of the array."
  },
  {
    id: "js30",
    question: "What does the reduce() method do?",
    options: [
      { id: "a", text: "Reduces array size", isCorrect: false },
      { id: "b", text: "Executes reducer function on each element", isCorrect: true },
      { id: "c", text: "Removes duplicate elements", isCorrect: false },
      { id: "d", text: "Sorts array in descending order", isCorrect: false }
    ],
    explanation: "The reduce() method executes a reducer function on each element of the array, resulting in a single output value."
  },
  {
    id: "js31",
    question: "Which symbol is used for template literals?",
    options: [
      { id: "a", text: "Single quotes (')", isCorrect: false },
      { id: "b", text: "Double quotes (\")", isCorrect: false },
      { id: "c", text: "Backticks (`)", isCorrect: true },
      { id: "d", text: "Forward slashes (/)", isCorrect: false }
    ],
    explanation: "Template literals are enclosed by backticks (`) and allow embedded expressions using ${}."
  },
  {
    id: "js32",
    question: "What is hoisting in JavaScript?",
    options: [
      { id: "a", text: "Moving code to the top", isCorrect: false },
      { id: "b", text: "Variable and function declarations moved to top of scope", isCorrect: true },
      { id: "c", text: "Lifting heavy objects", isCorrect: false },
      { id: "d", text: "Raising errors", isCorrect: false }
    ],
    explanation: "Hoisting is JavaScript's behavior of moving declarations to the top of their containing scope during compilation."
  },
  {
    id: "js33",
    question: "Which method checks if an array includes a certain element?",
    options: [
      { id: "a", text: "contains()", isCorrect: false },
      { id: "b", text: "includes()", isCorrect: true },
      { id: "c", text: "has()", isCorrect: false },
      { id: "d", text: "exists()", isCorrect: false }
    ],
    explanation: "The includes() method determines whether an array includes a certain value among its entries."
  },
  {
    id: "js34",
    question: "What is the difference between '==' and '==='?",
    options: [
      { id: "a", text: "No difference", isCorrect: false },
      { id: "b", text: "== allows type coercion, === does not", isCorrect: true },
      { id: "c", text: "=== allows type coercion, == does not", isCorrect: false },
      { id: "d", text: "== is for numbers, === is for strings", isCorrect: false }
    ],
    explanation: "== performs type coercion before comparison, while === requires both value and type to be the same."
  },
  {
    id: "js35",
    question: "Which method sorts the elements of an array?",
    options: [
      { id: "a", text: "order()", isCorrect: false },
      { id: "b", text: "sort()", isCorrect: true },
      { id: "c", text: "arrange()", isCorrect: false },
      { id: "d", text: "organize()", isCorrect: false }
    ],
    explanation: "The sort() method sorts the elements of an array in place and returns the sorted array."
  },
  {
    id: "js36",
    question: "What does the every() method test?",
    options: [
      { id: "a", text: "If some elements pass a test", isCorrect: false },
      { id: "b", text: "If all elements pass a test", isCorrect: true },
      { id: "c", text: "If no elements pass a test", isCorrect: false },
      { id: "d", text: "If array is empty", isCorrect: false }
    ],
    explanation: "The every() method tests whether all elements in the array pass the test implemented by the provided function."
  },
  {
    id: "js37",
    question: "Which keyword creates a new object instance?",
    options: [
      { id: "a", text: "create", isCorrect: false },
      { id: "b", text: "new", isCorrect: true },
      { id: "c", text: "make", isCorrect: false },
      { id: "d", text: "instance", isCorrect: false }
    ],
    explanation: "The 'new' keyword creates a new instance of an object type."
  },
  {
    id: "js38",
    question: "What is the output of: console.log(1 + '1')?",
    options: [
      { id: "a", text: "2", isCorrect: false },
      { id: "b", text: "11", isCorrect: true },
      { id: "c", text: "Error", isCorrect: false },
      { id: "d", text: "undefined", isCorrect: false }
    ],
    explanation: "JavaScript performs string concatenation when one operand is a string, so 1 + '1' becomes '11'."
  },
  {
    id: "js39",
    question: "Which method finds the first element that satisfies a testing function?",
    options: [
      { id: "a", text: "find()", isCorrect: true },
      { id: "b", text: "search()", isCorrect: false },
      { id: "c", text: "locate()", isCorrect: false },
      { id: "d", text: "seek()", isCorrect: false }
    ],
    explanation: "The find() method returns the first element in the array that satisfies the provided testing function."
  },
  {
    id: "js40",
    question: "What does JSON.stringify() do?",
    options: [
      { id: "a", text: "Converts JSON string to object", isCorrect: false },
      { id: "b", text: "Converts object to JSON string", isCorrect: true },
      { id: "c", text: "Validates JSON format", isCorrect: false },
      { id: "d", text: "Compresses JSON", isCorrect: false }
    ],
    explanation: "JSON.stringify() converts a JavaScript object or value to a JSON string."
  },
  // Advanced JavaScript Questions for Levels 11-20
  {
    id: "js41",
    question: "What is the purpose of async/await in JavaScript?",
    options: [
      { id: "a", text: "To make code run faster", isCorrect: false },
      { id: "b", text: "To handle asynchronous operations more easily", isCorrect: true },
      { id: "c", text: "To create multiple threads", isCorrect: false },
      { id: "d", text: "To compress code", isCorrect: false }
    ],
    explanation: "async/await provides a more readable way to work with Promises and asynchronous operations."
  },
  {
    id: "js42",
    question: "What is a Promise in JavaScript?",
    options: [
      { id: "a", text: "A guarantee that code will work", isCorrect: false },
      { id: "b", text: "An object representing eventual completion or failure of an async operation", isCorrect: true },
      { id: "c", text: "A type of loop", isCorrect: false },
      { id: "d", text: "A built-in debugging tool", isCorrect: false }
    ],
    explanation: "A Promise is an object that represents the eventual completion (or failure) of an asynchronous operation and its resulting value."
  },
  {
    id: "js43",
    question: "Which method is used to handle Promise rejections?",
    options: [
      { id: "a", text: ".then()", isCorrect: false },
      { id: "b", text: ".catch()", isCorrect: true },
      { id: "c", text: ".finally()", isCorrect: false },
      { id: "d", text: ".error()", isCorrect: false }
    ],
    explanation: "The .catch() method is used to handle Promise rejections and errors."
  },
  {
    id: "js44",
    question: "What does the spread operator (...) do?",
    options: [
      { id: "a", text: "Spreads elements of an iterable", isCorrect: true },
      { id: "b", text: "Creates a new function", isCorrect: false },
      { id: "c", text: "Performs multiplication", isCorrect: false },
      { id: "d", text: "Comments out code", isCorrect: false }
    ],
    explanation: "The spread operator (...) allows an iterable to be expanded in places where zero or more arguments or elements are expected."
  },
  {
    id: "js45",
    question: "What is destructuring in JavaScript?",
    options: [
      { id: "a", text: "Breaking code into pieces", isCorrect: false },
      { id: "b", text: "Extracting values from arrays or objects", isCorrect: true },
      { id: "c", text: "Deleting variables", isCorrect: false },
      { id: "d", text: "Creating loops", isCorrect: false }
    ],
    explanation: "Destructuring allows you to extract values from arrays or properties from objects into distinct variables."
  },
  {
    id: "js46",
    question: "Which keyword is used to create a generator function?",
    options: [
      { id: "a", text: "generator", isCorrect: false },
      { id: "b", text: "function*", isCorrect: true },
      { id: "c", text: "async", isCorrect: false },
      { id: "d", text: "yield", isCorrect: false }
    ],
    explanation: "Generator functions are declared using function* syntax and can pause and resume execution."
  },
  {
    id: "js47",
    question: "What does the Set data structure store?",
    options: [
      { id: "a", text: "Key-value pairs", isCorrect: false },
      { id: "b", text: "Unique values only", isCorrect: true },
      { id: "c", text: "Ordered lists", isCorrect: false },
      { id: "d", text: "Functions only", isCorrect: false }
    ],
    explanation: "Set is a collection of unique values - each value can only occur once in a Set."
  },
  {
    id: "js48",
    question: "Which method adds a property to an object with a descriptor?",
    options: [
      { id: "a", text: "Object.assign()", isCorrect: false },
      { id: "b", text: "Object.defineProperty()", isCorrect: true },
      { id: "c", text: "Object.create()", isCorrect: false },
      { id: "d", text: "Object.setProperty()", isCorrect: false }
    ],
    explanation: "Object.defineProperty() allows you to define a property with specific descriptors like writable, enumerable, and configurable."
  },
  {
    id: "js49",
    question: "What is the difference between Map and Object?",
    options: [
      { id: "a", text: "No difference", isCorrect: false },
      { id: "b", text: "Map can have any type of keys, Object keys are strings", isCorrect: true },
      { id: "c", text: "Object is faster", isCorrect: false },
      { id: "d", text: "Map stores only numbers", isCorrect: false }
    ],
    explanation: "Map allows keys of any type, while Object keys are converted to strings. Map also maintains insertion order."
  },
  {
    id: "js50",
    question: "What does Symbol.iterator define?",
    options: [
      { id: "a", text: "A loop counter", isCorrect: false },
      { id: "b", text: "The default iterator for an object", isCorrect: true },
      { id: "c", text: "A unique identifier", isCorrect: false },
      { id: "d", text: "A mathematical symbol", isCorrect: false }
    ],
    explanation: "Symbol.iterator defines the default iterator for an object, making it iterable in for...of loops."
  },
  {
    id: "js51",
    question: "Which method creates a new Promise?",
    options: [
      { id: "a", text: "new Promise()", isCorrect: true },
      { id: "b", text: "Promise.create()", isCorrect: false },
      { id: "c", text: "Promise.new()", isCorrect: false },
      { id: "d", text: "createPromise()", isCorrect: false }
    ],
    explanation: "Promises are created using the Promise constructor: new Promise((resolve, reject) => {})"
  },
  {
    id: "js52",
    question: "What is a WeakMap in JavaScript?",
    options: [
      { id: "a", text: "A Map with limited functionality", isCorrect: false },
      { id: "b", text: "A Map with object keys only and weak references", isCorrect: true },
      { id: "c", text: "A deprecated Map", isCorrect: false },
      { id: "d", text: "A Map for small data", isCorrect: false }
    ],
    explanation: "WeakMap holds weak references to object keys, allowing garbage collection when no other references exist."
  },
  {
    id: "js53",
    question: "Which operator checks if a property exists in an object?",
    options: [
      { id: "a", text: "hasOwnProperty", isCorrect: false },
      { id: "b", text: "in", isCorrect: true },
      { id: "c", text: "exists", isCorrect: false },
      { id: "d", text: "contains", isCorrect: false }
    ],
    explanation: "The 'in' operator returns true if the specified property exists in the object or its prototype chain."
  },
  {
    id: "js54",
    question: "What does Object.freeze() do?",
    options: [
      { id: "a", text: "Stops code execution", isCorrect: false },
      { id: "b", text: "Makes an object immutable", isCorrect: true },
      { id: "c", text: "Converts object to JSON", isCorrect: false },
      { id: "d", text: "Copies an object", isCorrect: false }
    ],
    explanation: "Object.freeze() prevents modification of existing properties and addition of new properties to an object."
  },
  {
    id: "js55",
    question: "Which method executes a function once for each array element?",
    options: [
      { id: "a", text: "forEach()", isCorrect: true },
      { id: "b", text: "map()", isCorrect: false },
      { id: "c", text: "filter()", isCorrect: false },
      { id: "d", text: "reduce()", isCorrect: false }
    ],
    explanation: "forEach() executes a provided function once for each array element, but doesn't return a new array."
  },
  {
    id: "js56",
    question: "What is the purpose of the Proxy object?",
    options: [
      { id: "a", text: "Network communication", isCorrect: false },
      { id: "b", text: "Intercept and customize operations on objects", isCorrect: true },
      { id: "c", text: "Proxy servers", isCorrect: false },
      { id: "d", text: "Data encryption", isCorrect: false }
    ],
    explanation: "Proxy allows you to define custom behavior for fundamental operations like property access, assignment, function invocation, etc."
  },
  {
    id: "js57",
    question: "Which method combines arrays without modifying original arrays?",
    options: [
      { id: "a", text: "push()", isCorrect: false },
      { id: "b", text: "concat()", isCorrect: true },
      { id: "c", text: "merge()", isCorrect: false },
      { id: "d", text: "append()", isCorrect: false }
    ],
    explanation: "concat() returns a new array that combines elements from the original arrays without modifying them."
  },
  {
    id: "js58",
    question: "What does the 'use strict' directive do?",
    options: [
      { id: "a", text: "Makes code run faster", isCorrect: false },
      { id: "b", text: "Enables strict mode with stricter parsing and error handling", isCorrect: true },
      { id: "c", text: "Compresses code", isCorrect: false },
      { id: "d", text: "Enables debugging", isCorrect: false }
    ],
    explanation: "'use strict' enables strict mode, which catches common coding mistakes and prevents certain actions."
  },
  {
    id: "js59",
    question: "Which method returns a new array with a portion of the original array?",
    options: [
      { id: "a", text: "slice()", isCorrect: true },
      { id: "b", text: "splice()", isCorrect: false },
      { id: "c", text: "cut()", isCorrect: false },
      { id: "d", text: "extract()", isCorrect: false }
    ],
    explanation: "slice() returns a shallow copy of a portion of an array without modifying the original array."
  },
  {
    id: "js60",
    question: "What is the temporal dead zone?",
    options: [
      { id: "a", text: "A debugging tool", isCorrect: false },
      { id: "b", text: "Time between variable declaration and initialization with let/const", isCorrect: true },
      { id: "c", text: "A type of error", isCorrect: false },
      { id: "d", text: "Memory management", isCorrect: false }
    ],
    explanation: "The temporal dead zone is the time between entering scope and variable initialization for let and const declarations."
  },
  {
    id: "js61",
    question: "Which method creates an object with a specified prototype?",
    options: [
      { id: "a", text: "Object.create()", isCorrect: true },
      { id: "b", text: "new Object()", isCorrect: false },
      { id: "c", text: "Object.assign()", isCorrect: false },
      { id: "d", text: "Object.prototype()", isCorrect: false }
    ],
    explanation: "Object.create() creates a new object with the specified prototype object and properties."
  },
  {
    id: "js62",
    question: "What does Promise.all() do?",
    options: [
      { id: "a", text: "Waits for all promises to resolve", isCorrect: true },
      { id: "b", text: "Resolves with the first promise", isCorrect: false },
      { id: "c", text: "Creates multiple promises", isCorrect: false },
      { id: "d", text: "Cancels all promises", isCorrect: false }
    ],
    explanation: "Promise.all() waits for all input promises to resolve and returns a promise that resolves with an array of results."
  },
  {
    id: "js63",
    question: "Which method copies properties from source objects to target object?",
    options: [
      { id: "a", text: "Object.copy()", isCorrect: false },
      { id: "b", text: "Object.assign()", isCorrect: true },
      { id: "c", text: "Object.merge()", isCorrect: false },
      { id: "d", text: "Object.extend()", isCorrect: false }
    ],
    explanation: "Object.assign() copies all enumerable own properties from one or more source objects to a target object."
  },
  {
    id: "js64",
    question: "What is the difference between for...in and for...of loops?",
    options: [
      { id: "a", text: "No difference", isCorrect: false },
      { id: "b", text: "for...in iterates over keys, for...of iterates over values", isCorrect: true },
      { id: "c", text: "for...of is faster", isCorrect: false },
      { id: "d", text: "for...in is deprecated", isCorrect: false }
    ],
    explanation: "for...in iterates over enumerable properties (keys), while for...of iterates over iterable objects' values."
  },
  // Level 11: Modules & Import/Export
  {
    id: "js65",
    question: "Which statement is used to export a default value from a module?",
    options: [
      { id: "a", text: "export default", isCorrect: true },
      { id: "b", text: "module.exports", isCorrect: false },
      { id: "c", text: "export main", isCorrect: false },
      { id: "d", text: "default export", isCorrect: false }
    ],
    explanation: "export default allows you to export a single value as the default export from a module."
  },
  {
    id: "js66",
    question: "How do you import a default export?",
    options: [
      { id: "a", text: "import { default } from 'module'", isCorrect: false },
      { id: "b", text: "import name from 'module'", isCorrect: true },
      { id: "c", text: "import * from 'module'", isCorrect: false },
      { id: "d", text: "require('module')", isCorrect: false }
    ],
    explanation: "Default exports can be imported using any name: import myName from 'module'"
  },
  {
    id: "js67",
    question: "What is the CommonJS syntax for exporting?",
    options: [
      { id: "a", text: "export default", isCorrect: false },
      { id: "b", text: "module.exports", isCorrect: true },
      { id: "c", text: "exports =", isCorrect: false },
      { id: "d", text: "return", isCorrect: false }
    ],
    explanation: "CommonJS uses module.exports to export values from a module."
  },
  {
    id: "js68",
    question: "How do you import named exports?",
    options: [
      { id: "a", text: "import { name } from 'module'", isCorrect: true },
      { id: "b", text: "import name from 'module'", isCorrect: false },
      { id: "c", text: "import * as name from 'module'", isCorrect: false },
      { id: "d", text: "const { name } = require('module')", isCorrect: false }
    ],
    explanation: "Named exports are imported using destructuring syntax: import { name } from 'module'"
  },
  {
    id: "js69",
    question: "What does 'import * as name' do?",
    options: [
      { id: "a", text: "Imports default export", isCorrect: false },
      { id: "b", text: "Imports all exports as a namespace object", isCorrect: true },
      { id: "c", text: "Imports nothing", isCorrect: false },
      { id: "d", text: "Causes an error", isCorrect: false }
    ],
    explanation: "import * as name imports all exports from a module and creates a namespace object."
  },
  {
    id: "js70",
    question: "Which keyword is used for dynamic imports?",
    options: [
      { id: "a", text: "import()", isCorrect: true },
      { id: "b", text: "require()", isCorrect: false },
      { id: "c", text: "load()", isCorrect: false },
      { id: "d", text: "fetch()", isCorrect: false }
    ],
    explanation: "Dynamic imports use import() as a function, which returns a Promise."
  },
  // Level 12: Regular Expressions
  {
    id: "js71",
    question: "How do you create a regular expression in JavaScript?",
    options: [
      { id: "a", text: "/pattern/flags", isCorrect: true },
      { id: "b", text: "regex('pattern')", isCorrect: false },
      { id: "c", text: "pattern.regex()", isCorrect: false },
      { id: "d", text: "RegExp.create('pattern')", isCorrect: false }
    ],
    explanation: "Regular expressions can be created using literal notation /pattern/flags or new RegExp('pattern', 'flags')"
  },
  {
    id: "js72",
    question: "What does the 'g' flag do in regular expressions?",
    options: [
      { id: "a", text: "Global search", isCorrect: true },
      { id: "b", text: "Greedy matching", isCorrect: false },
      { id: "c", text: "Group matching", isCorrect: false },
      { id: "d", text: "Get all", isCorrect: false }
    ],
    explanation: "The 'g' flag enables global searching, finding all matches rather than stopping after the first match."
  },
  {
    id: "js73",
    question: "Which method tests if a string matches a regex pattern?",
    options: [
      { id: "a", text: "match()", isCorrect: false },
      { id: "b", text: "test()", isCorrect: true },
      { id: "c", text: "check()", isCorrect: false },
      { id: "d", text: "validate()", isCorrect: false }
    ],
    explanation: "The test() method returns true if the pattern matches the string, false otherwise."
  },
  {
    id: "js74",
    question: "What does \\d represent in regex?",
    options: [
      { id: "a", text: "Any character", isCorrect: false },
      { id: "b", text: "Any digit", isCorrect: true },
      { id: "c", text: "Any letter", isCorrect: false },
      { id: "d", text: "Whitespace", isCorrect: false }
    ],
    explanation: "\\d matches any digit character (0-9) in regular expressions."
  },
  {
    id: "js75",
    question: "What does the '+' quantifier mean in regex?",
    options: [
      { id: "a", text: "One or more", isCorrect: true },
      { id: "b", text: "Zero or more", isCorrect: false },
      { id: "c", text: "Exactly one", isCorrect: false },
      { id: "d", text: "Addition operator", isCorrect: false }
    ],
    explanation: "The '+' quantifier matches one or more occurrences of the preceding element."
  },
  // Level 13: Browser APIs
  {
    id: "js76",
    question: "Which API is used for storing data locally in the browser?",
    options: [
      { id: "a", text: "localStorage", isCorrect: true },
      { id: "b", text: "cookieStorage", isCorrect: false },
      { id: "c", text: "browserStorage", isCorrect: false },
      { id: "d", text: "webStorage", isCorrect: false }
    ],
    explanation: "localStorage provides a way to store data locally within the user's browser with no expiration time."
  },
  {
    id: "js77",
    question: "What does fetch() return?",
    options: [
      { id: "a", text: "Response data", isCorrect: false },
      { id: "b", text: "Promise", isCorrect: true },
      { id: "c", text: "JSON object", isCorrect: false },
      { id: "d", text: "String", isCorrect: false }
    ],
    explanation: "fetch() returns a Promise that resolves to a Response object representing the response to the request."
  },
  {
    id: "js78",
    question: "Which method adds an event listener to an element?",
    options: [
      { id: "a", text: "addEvent()", isCorrect: false },
      { id: "b", text: "addEventListener()", isCorrect: true },
      { id: "c", text: "on()", isCorrect: false },
      { id: "d", text: "listen()", isCorrect: false }
    ],
    explanation: "addEventListener() method attaches an event handler to an element without overwriting existing event handlers."
  },
  {
    id: "js79",
    question: "What does sessionStorage store?",
    options: [
      { id: "a", text: "Data for the page session", isCorrect: true },
      { id: "b", text: "Permanent data", isCorrect: false },
      { id: "c", text: "Server data", isCorrect: false },
      { id: "d", text: "User credentials", isCorrect: false }
    ],
    explanation: "sessionStorage stores data for the duration of the page session, cleared when the tab is closed."
  },
  {
    id: "js80",
    question: "Which API provides location information?",
    options: [
      { id: "a", text: "navigator.location", isCorrect: false },
      { id: "b", text: "navigator.geolocation", isCorrect: true },
      { id: "c", text: "window.location", isCorrect: false },
      { id: "d", text: "document.location", isCorrect: false }
    ],
    explanation: "navigator.geolocation provides access to the device's location information."
  },
  {
    id: "js81",
    question: "What does the Intersection Observer API do?",
    options: [
      { id: "a", text: "Observes DOM changes", isCorrect: false },
      { id: "b", text: "Observes element visibility in viewport", isCorrect: true },
      { id: "c", text: "Observes mouse movements", isCorrect: false },
      { id: "d", text: "Observes network requests", isCorrect: false }
    ],
    explanation: "Intersection Observer API provides a way to asynchronously observe changes in intersection of a target element with viewport."
  },
  // Level 14: Performance & Optimization
  {
    id: "js82",
    question: "What is the purpose of requestAnimationFrame()?",
    options: [
      { id: "a", text: "Create animations", isCorrect: false },
      { id: "b", text: "Optimize animation performance by syncing with browser refresh rate", isCorrect: true },
      { id: "c", text: "Request server data", isCorrect: false },
      { id: "d", text: "Load images", isCorrect: false }
    ],
    explanation: "requestAnimationFrame() schedules a function to run before the next repaint, optimizing animation performance."
  },
  {
    id: "js83",
    question: "Which technique prevents blocking the main thread?",
    options: [
      { id: "a", text: "Web Workers", isCorrect: true },
      { id: "b", text: "Sync functions", isCorrect: false },
      { id: "c", text: "Blocking calls", isCorrect: false },
      { id: "d", text: "Alert dialogs", isCorrect: false }
    ],
    explanation: "Web Workers allow you to run JavaScript in background threads, preventing blocking of the main UI thread."
  },
  {
    id: "js84",
    question: "What is lazy loading?",
    options: [
      { id: "a", text: "Loading all resources at once", isCorrect: false },
      { id: "b", text: "Loading resources only when needed", isCorrect: true },
      { id: "c", text: "Slow loading", isCorrect: false },
      { id: "d", text: "Loading errors", isCorrect: false }
    ],
    explanation: "Lazy loading defers loading of resources until they are actually needed, improving initial page load performance."
  },
  {
    id: "js85",
    question: "Which method measures code execution time?",
    options: [
      { id: "a", text: "performance.now()", isCorrect: true },
      { id: "b", text: "Date.now()", isCorrect: false },
      { id: "c", text: "timer.now()", isCorrect: false },
      { id: "d", text: "clock.now()", isCorrect: false }
    ],
    explanation: "performance.now() returns a high-resolution timestamp, useful for measuring code execution time."
  },
  {
    id: "js86",
    question: "What is debouncing in JavaScript?",
    options: [
      { id: "a", text: "Error handling", isCorrect: false },
      { id: "b", text: "Delaying function execution until after delay period", isCorrect: true },
      { id: "c", text: "Function optimization", isCorrect: false },
      { id: "d", text: "Memory cleanup", isCorrect: false }
    ],
    explanation: "Debouncing delays function execution until after a specified delay period has passed since the last invocation."
  },
  {
    id: "js87",
    question: "What is throttling?",
    options: [
      { id: "a", text: "Limiting function calls to once per time period", isCorrect: true },
      { id: "b", text: "Speeding up functions", isCorrect: false },
      { id: "c", text: "Breaking functions", isCorrect: false },
      { id: "d", text: "Caching results", isCorrect: false }
    ],
    explanation: "Throttling limits function execution to at most once per specified time period."
  },
  // Level 15: Testing & Debugging
  {
    id: "js88",
    question: "What is unit testing?",
    options: [
      { id: "a", text: "Testing individual components in isolation", isCorrect: true },
      { id: "b", text: "Testing the entire application", isCorrect: false },
      { id: "c", text: "Testing user interface", isCorrect: false },
      { id: "d", text: "Testing server performance", isCorrect: false }
    ],
    explanation: "Unit testing involves testing individual units or components of code in isolation from the rest of the application."
  },
  {
    id: "js89",
    question: "Which method is commonly used for assertions in testing?",
    options: [
      { id: "a", text: "expect()", isCorrect: true },
      { id: "b", text: "assert()", isCorrect: false },
      { id: "c", text: "check()", isCorrect: false },
      { id: "d", text: "verify()", isCorrect: false }
    ],
    explanation: "expect() is commonly used in modern testing frameworks like Jest for making assertions."
  },
  {
    id: "js90",
    question: "What does TDD stand for?",
    options: [
      { id: "a", text: "Test Driven Development", isCorrect: true },
      { id: "b", text: "Time Driven Design", isCorrect: false },
      { id: "c", text: "Technical Design Document", isCorrect: false },
      { id: "d", text: "Type Definition Declaration", isCorrect: false }
    ],
    explanation: "TDD (Test Driven Development) is a development approach where tests are written before the actual code."
  },
  {
    id: "js91",
    question: "Which tool helps debug JavaScript in the browser?",
    options: [
      { id: "a", text: "Console", isCorrect: false },
      { id: "b", text: "DevTools", isCorrect: true },
      { id: "c", text: "Compiler", isCorrect: false },
      { id: "d", text: "Linter", isCorrect: false }
    ],
    explanation: "Browser DevTools provide comprehensive debugging capabilities including console, debugger, network monitoring, and more."
  },
  {
    id: "js92",
    question: "What is a mock in testing?",
    options: [
      { id: "a", text: "Fake implementation of a dependency", isCorrect: true },
      { id: "b", text: "Error in code", isCorrect: false },
      { id: "c", text: "Test framework", isCorrect: false },
      { id: "d", text: "Debugging tool", isCorrect: false }
    ],
    explanation: "A mock is a fake implementation used in testing to replace actual dependencies and control their behavior."
  },
  // Level 16: Node.js Fundamentals
  {
    id: "js93",
    question: "What is Node.js?",
    options: [
      { id: "a", text: "JavaScript framework", isCorrect: false },
      { id: "b", text: "JavaScript runtime for server-side", isCorrect: true },
      { id: "c", text: "JavaScript compiler", isCorrect: false },
      { id: "d", text: "JavaScript library", isCorrect: false }
    ],
    explanation: "Node.js is a JavaScript runtime built on Chrome's V8 engine that allows JavaScript to run on the server-side."
  },
  {
    id: "js94",
    question: "Which object provides information about the current Node.js process?",
    options: [
      { id: "a", text: "global", isCorrect: false },
      { id: "b", text: "process", isCorrect: true },
      { id: "c", text: "node", isCorrect: false },
      { id: "d", text: "system", isCorrect: false }
    ],
    explanation: "The process object provides information and control over the current Node.js process."
  },
  {
    id: "js95",
    question: "How do you read a file asynchronously in Node.js?",
    options: [
      { id: "a", text: "fs.readFile()", isCorrect: true },
      { id: "b", text: "fs.read()", isCorrect: false },
      { id: "c", text: "file.read()", isCorrect: false },
      { id: "d", text: "readFile()", isCorrect: false }
    ],
    explanation: "fs.readFile() reads a file asynchronously in Node.js, taking a callback or returning a Promise with promisify."
  },
  {
    id: "js96",
    question: "What is the Event Loop in Node.js?",
    options: [
      { id: "a", text: "Handles asynchronous operations", isCorrect: true },
      { id: "b", text: "Creates loops in code", isCorrect: false },
      { id: "c", text: "Handles events only", isCorrect: false },
      { id: "d", text: "Manages memory", isCorrect: false }
    ],
    explanation: "The Event Loop handles asynchronous operations in Node.js, allowing non-blocking I/O operations."
  },
  {
    id: "js97",
    question: "Which module is used for creating HTTP servers in Node.js?",
    options: [
      { id: "a", text: "server", isCorrect: false },
      { id: "b", text: "http", isCorrect: true },
      { id: "c", text: "web", isCorrect: false },
      { id: "d", text: "express", isCorrect: false }
    ],
    explanation: "The built-in 'http' module provides functionality to create HTTP servers and clients in Node.js."
  },
  {
    id: "js98",
    question: "What does Buffer represent in Node.js?",
    options: [
      { id: "a", text: "Text data", isCorrect: false },
      { id: "b", text: "Binary data", isCorrect: true },
      { id: "c", text: "Network requests", isCorrect: false },
      { id: "d", text: "File paths", isCorrect: false }
    ],
    explanation: "Buffer is a global class that provides a way to work with binary data directly in Node.js."
  },
  // Level 17: Package Management
  {
    id: "js99",
    question: "What is npm?",
    options: [
      { id: "a", text: "Node Package Manager", isCorrect: true },
      { id: "b", text: "Network Protocol Manager", isCorrect: false },
      { id: "c", text: "New Programming Method", isCorrect: false },
      { id: "d", text: "Node Performance Monitor", isCorrect: false }
    ],
    explanation: "npm is the Node Package Manager, the default package manager for Node.js."
  },
  {
    id: "js100",
    question: "Which file contains project dependencies?",
    options: [
      { id: "a", text: "dependencies.json", isCorrect: false },
      { id: "b", text: "package.json", isCorrect: true },
      { id: "c", text: "node.json", isCorrect: false },
      { id: "d", text: "modules.json", isCorrect: false }
    ],
    explanation: "package.json contains metadata about the project including its dependencies, scripts, and configuration."
  },
  {
    id: "js101",
    question: "What is the difference between dependencies and devDependencies?",
    options: [
      { id: "a", text: "No difference", isCorrect: false },
      { id: "b", text: "dependencies for production, devDependencies for development", isCorrect: true },
      { id: "c", text: "devDependencies are faster", isCorrect: false },
      { id: "d", text: "dependencies are newer", isCorrect: false }
    ],
    explanation: "dependencies are needed in production, while devDependencies are only needed during development."
  },
  {
    id: "js102",
    question: "Which command installs a package globally?",
    options: [
      { id: "a", text: "npm install -g", isCorrect: true },
      { id: "b", text: "npm install --global", isCorrect: false },
      { id: "c", text: "npm global install", isCorrect: false },
      { id: "d", text: "npm install -world", isCorrect: false }
    ],
    explanation: "npm install -g installs a package globally, making it available system-wide."
  },
  {
    id: "js103",
    question: "What does package-lock.json do?",
    options: [
      { id: "a", text: "Locks package installation", isCorrect: false },
      { id: "b", text: "Records exact versions of installed packages", isCorrect: true },
      { id: "c", text: "Prevents package updates", isCorrect: false },
      { id: "d", text: "Encrypts package data", isCorrect: false }
    ],
    explanation: "package-lock.json records the exact versions of all installed packages to ensure consistent installations."
  },
  // Level 18: Design Patterns
  {
    id: "js104",
    question: "What is the Singleton pattern?",
    options: [
      { id: "a", text: "Creates multiple instances", isCorrect: false },
      { id: "b", text: "Ensures a class has only one instance", isCorrect: true },
      { id: "c", text: "Creates arrays", isCorrect: false },
      { id: "d", text: "Handles events", isCorrect: false }
    ],
    explanation: "The Singleton pattern ensures a class has only one instance and provides global access to it."
  },
  {
    id: "js105",
    question: "What is the Observer pattern?",
    options: [
      { id: "a", text: "Watches files", isCorrect: false },
      { id: "b", text: "Notifies multiple objects about state changes", isCorrect: true },
      { id: "c", text: "Observes user input", isCorrect: false },
      { id: "d", text: "Monitors network traffic", isCorrect: false }
    ],
    explanation: "The Observer pattern defines a one-to-many dependency between objects so that when one object changes state, all dependents are notified."
  },
  {
    id: "js106",
    question: "What is the Module pattern?",
    options: [
      { id: "a", text: "Organizes code into modules", isCorrect: true },
      { id: "b", text: "Creates HTML modules", isCorrect: false },
      { id: "c", text: "Imports libraries", isCorrect: false },
      { id: "d", text: "Splits files", isCorrect: false }
    ],
    explanation: "The Module pattern encapsulates code into modules with private and public methods, providing organization and encapsulation."
  },
  {
    id: "js107",
    question: "What is the Factory pattern?",
    options: [
      { id: "a", text: "Creates objects without specifying exact class", isCorrect: true },
      { id: "b", text: "Manufactures products", isCorrect: false },
      { id: "c", text: "Builds factories", isCorrect: false },
      { id: "d", text: "Processes data", isCorrect: false }
    ],
    explanation: "The Factory pattern creates objects without specifying the exact class of object that will be created."
  },
  {
    id: "js108",
    question: "What is the Decorator pattern?",
    options: [
      { id: "a", text: "Adds CSS styling", isCorrect: false },
      { id: "b", text: "Adds behavior to objects dynamically", isCorrect: true },
      { id: "c", text: "Decorates HTML", isCorrect: false },
      { id: "d", text: "Beautifies code", isCorrect: false }
    ],
    explanation: "The Decorator pattern allows behavior to be added to objects dynamically without altering their structure."
  },
  {
    id: "js109",
    question: "What is the MVC pattern?",
    options: [
      { id: "a", text: "Model-View-Controller architecture", isCorrect: true },
      { id: "b", text: "Multiple-Value-Container", isCorrect: false },
      { id: "c", text: "Main-View-Content", isCorrect: false },
      { id: "d", text: "Memory-Variable-Cache", isCorrect: false }
    ],
    explanation: "MVC (Model-View-Controller) is an architectural pattern that separates application logic into three interconnected components."
  },
  // Level 19: Security & Best Practices
  {
    id: "js110",
    question: "What is XSS (Cross-Site Scripting)?",
    options: [
      { id: "a", text: "Cross-server synchronization", isCorrect: false },
      { id: "b", text: "Injection of malicious scripts into web pages", isCorrect: true },
      { id: "c", text: "XML style sheets", isCorrect: false },
      { id: "d", text: "Cross-platform scripting", isCorrect: false }
    ],
    explanation: "XSS is a security vulnerability where malicious scripts are injected into trusted websites."
  },
  {
    id: "js111",
    question: "How can you prevent XSS attacks?",
    options: [
      { id: "a", text: "Use HTTPS only", isCorrect: false },
      { id: "b", text: "Sanitize and validate user input", isCorrect: true },
      { id: "c", text: "Use strong passwords", isCorrect: false },
      { id: "d", text: "Update browsers", isCorrect: false }
    ],
    explanation: "XSS can be prevented by properly sanitizing and validating user input, encoding output, and using Content Security Policy."
  },
  {
    id: "js112",
    question: "What is CSRF (Cross-Site Request Forgery)?",
    options: [
      { id: "a", text: "Cross-site resource failure", isCorrect: false },
      { id: "b", text: "Unauthorized commands transmitted from trusted user", isCorrect: true },
      { id: "c", text: "Cross-server request format", isCorrect: false },
      { id: "d", text: "Client-side request failure", isCorrect: false }
    ],
    explanation: "CSRF tricks users into executing unwanted actions on a web application where they're authenticated."
  },
  {
    id: "js113",
    question: "What is Content Security Policy (CSP)?",
    options: [
      { id: "a", text: "Content storage policy", isCorrect: false },
      { id: "b", text: "Security layer to detect and mitigate XSS attacks", isCorrect: true },
      { id: "c", text: "Customer service protocol", isCorrect: false },
      { id: "d", text: "Code style policy", isCorrect: false }
    ],
    explanation: "CSP is a security standard that helps prevent XSS attacks by specifying which dynamic resources are allowed to load."
  },
  {
    id: "js114",
    question: "Which practice helps prevent injection attacks?",
    options: [
      { id: "a", text: "Input validation and sanitization", isCorrect: true },
      { id: "b", text: "Using var instead of let", isCorrect: false },
      { id: "c", text: "Minifying code", isCorrect: false },
      { id: "d", text: "Using jQuery", isCorrect: false }
    ],
    explanation: "Proper input validation, sanitization, and parameterized queries help prevent injection attacks."
  },
  // Level 20: Framework Mastery
  {
    id: "js115",
    question: "What is a Virtual DOM?",
    options: [
      { id: "a", text: "A fake DOM", isCorrect: false },
      { id: "b", text: "In-memory representation of DOM for performance optimization", isCorrect: true },
      { id: "c", text: "A DOM in virtual reality", isCorrect: false },
      { id: "d", text: "A deprecated DOM method", isCorrect: false }
    ],
    explanation: "Virtual DOM is an in-memory representation of the real DOM that enables efficient updates and rendering."
  },
  {
    id: "js116",
    question: "What is component-based architecture?",
    options: [
      { id: "a", text: "Building UI as a tree of reusable components", isCorrect: true },
      { id: "b", text: "Using only JavaScript components", isCorrect: false },
      { id: "c", text: "Computer component design", isCorrect: false },
      { id: "d", text: "Database component structure", isCorrect: false }
    ],
    explanation: "Component-based architecture structures applications as a tree of reusable, self-contained components."
  },
  {
    id: "js117",
    question: "What is state management in frameworks?",
    options: [
      { id: "a", text: "Managing application state across components", isCorrect: true },
      { id: "b", text: "Managing server state", isCorrect: false },
      { id: "c", text: "Managing file states", isCorrect: false },
      { id: "d", text: "Managing network states", isCorrect: false }
    ],
    explanation: "State management involves handling and sharing application state across different components efficiently."
  },
  {
    id: "js118",
    question: "What is server-side rendering (SSR)?",
    options: [
      { id: "a", text: "Rendering graphics on server", isCorrect: false },
      { id: "b", text: "Generating HTML on server before sending to client", isCorrect: true },
      { id: "c", text: "Server-side graphics", isCorrect: false },
      { id: "d", text: "Rendering databases", isCorrect: false }
    ],
    explanation: "SSR generates the HTML on the server before sending it to the client, improving initial load time and SEO."
  },
  {
    id: "js119",
    question: "What is code splitting?",
    options: [
      { id: "a", text: "Dividing code into multiple files for lazy loading", isCorrect: true },
      { id: "b", text: "Breaking code functionality", isCorrect: false },
      { id: "c", text: "Splitting team code", isCorrect: false },
      { id: "d", text: "Code version control", isCorrect: false }
    ],
    explanation: "Code splitting divides application code into smaller chunks that can be loaded on demand, improving performance."
  },
  {
    id: "js120",
    question: "What is progressive enhancement?",
    options: [
      { id: "a", text: "Adding features progressively as browser capabilities allow", isCorrect: true },
      { id: "b", text: "Progressive web apps", isCorrect: false },
      { id: "c", text: "Gradual performance improvements", isCorrect: false },
      { id: "d", text: "Progressive downloading", isCorrect: false }
    ],
    explanation: "Progressive enhancement starts with basic functionality and adds enhanced features based on browser capabilities."
  }
];

// HTML Test Questions
const htmlQuestions: QuizQuestion[] = [
  {
    id: "html1",
    question: "Which HTML tag is used to create a hyperlink?",
    options: [
      { id: "a", text: "<link>", isCorrect: false },
      { id: "b", text: "<a>", isCorrect: true },
      { id: "c", text: "<href>", isCorrect: false },
      { id: "d", text: "<url>", isCorrect: false }
    ],
    explanation: "The <a> (anchor) tag is used to create hyperlinks in HTML. The href attribute specifies the URL."
  },
  {
    id: "html2",
    question: "Which attribute specifies the URL of a hyperlink?",
    options: [
      { id: "a", text: "src", isCorrect: false },
      { id: "b", text: "href", isCorrect: true },
      { id: "c", text: "link", isCorrect: false },
      { id: "d", text: "url", isCorrect: false }
    ],
    explanation: "The href attribute in the <a> tag specifies the URL of the page the link goes to."
  },
  {
    id: "html3",
    question: "Which HTML element represents the main content of a document?",
    options: [
      { id: "a", text: "<content>", isCorrect: false },
      { id: "b", text: "<main>", isCorrect: true },
      { id: "c", text: "<section>", isCorrect: false },
      { id: "d", text: "<article>", isCorrect: false }
    ],
    explanation: "The <main> element represents the dominant content of the body of a document."
  }
];

// Java Test Questions
const javaQuestions: QuizQuestion[] = [
  {
    id: "java1",
    question: "Which keyword is used to create a class in Java?",
    options: [
      { id: "a", text: "class", isCorrect: true },
      { id: "b", text: "Class", isCorrect: false },
      { id: "c", text: "create", isCorrect: false },
      { id: "d", text: "new", isCorrect: false }
    ],
    explanation: "The 'class' keyword is used to declare a class in Java. Java is case-sensitive, so 'Class' would be incorrect."
  },
  {
    id: "java2",
    question: "Which method is the entry point of a Java application?",
    options: [
      { id: "a", text: "start()", isCorrect: false },
      { id: "b", text: "main()", isCorrect: true },
      { id: "c", text: "run()", isCorrect: false },
      { id: "d", text: "execute()", isCorrect: false }
    ],
    explanation: "The main() method with signature 'public static void main(String[] args)' is the entry point of Java applications."
  },
  {
    id: "java3",
    question: "Which access modifier makes a member accessible from anywhere?",
    options: [
      { id: "a", text: "private", isCorrect: false },
      { id: "b", text: "protected", isCorrect: false },
      { id: "c", text: "public", isCorrect: true },
      { id: "d", text: "default", isCorrect: false }
    ],
    explanation: "The 'public' access modifier makes class members accessible from any other class."
  }
  {
    "id": "java4",
    "question": "Which of the following is NOT a primitive data type in Java?",
    "options": [
      { "id": "a", "text": "int", "isCorrect": false },
      { "id": "b", "text": "String", "isCorrect": true },
      { "id": "c", "text": "boolean", "isCorrect": false },
      { "id": "d", "text": "char", "isCorrect": false }
    ],
    "explanation": "The primitive data types in Java are `byte`, `short`, `int`, `long`, `float`, `double`, `boolean`, and `char`. **String** is a class (an object type) in Java, not a primitive data type."
  },
  {
    "id": "java5",
    "question": "What is the size of an 'int' variable in Java?",
    "options": [
      { "id": "a", "text": "8 bits", "isCorrect": false },
      { "id": "b", "text": "16 bits", "isCorrect": false },
      { "id": "c", "text": "32 bits", "isCorrect": true },
      { "id": "d", "text": "64 bits", "isCorrect": false }
    ],
    "explanation": "An **int** data type is a 32-bit signed two's complement integer. This is a common fundamental question in Java."
  },
  {
    "id": "java6",
    "question": "Which keyword is used to prevent a class from being inherited?",
    "options": [
      { "id": "a", "text": "static", "isCorrect": false },
      { "id": "b", "text": "abstract", "isCorrect": false },
      { "id": "c", "text": "final", "isCorrect": true },
      { "id": "d", "text": "private", "isCorrect": false }
    ],
    "explanation": "The **final** keyword, when applied to a class, prevents it from being subclassed (inherited). When applied to a method, it prevents overriding, and when applied to a variable, it makes it a constant."
  },
  {
    "id": "java7",
    "question": "How do you correctly declare and initialize an array of 5 integers in Java?",
    "options": [
      { "id": "a", "text": "int[] arr = new int(5);", "isCorrect": false },
      { "id": "b", "text": "int arr[] = new int[5];", "isCorrect": true },
      { "id": "c", "text": "int arr[5];", "isCorrect": false },
      { "id": "d", "text": "array int[5];", "isCorrect": false }
    ],
    "explanation": "The correct syntax to declare and instantiate an array in Java is `dataType[] arrayName = new dataType[size];`. Option B uses the valid alternative notation `dataType arrayName[]`."
  }
  {
    "id": "java8",
    "question": "Which of these is used for multi-line comments in Java?",
    "options": [
      { "id": "a", "text": "// comment", "isCorrect": false },
      { "id": "b", "text": "/* comment */", "isCorrect": true },
      { "id": "c", "text": "# comment", "isCorrect": false },
      { "id": "d", "text": "", "isCorrect": false }
    ],
    "explanation": "Multi-line comments in Java are enclosed between **/* and */**. The `//` is used for single-line comments."
  },
  {
    "id": "java9",
    "question": "What is method overloading in Java?",
    "options": [
      { "id": "a", "text": "Defining a subclass method with the same name and arguments as a superclass method.", "isCorrect": false },
      { "id": "b", "text": "Defining two or more methods in the same class with the same name but different parameters.", "isCorrect": true },
      { "id": "c", "text": "Defining methods in an interface.", "isCorrect": false },
      { "id": "d", "text": "Using the 'final' keyword on a method.", "isCorrect": false }
    ],
    "explanation": "**Method Overloading** is a feature that allows a class to have more than one method with the same name, provided their parameter lists (argument types or number of arguments) are different. This is a form of **Polymorphism**."
  },
  {
    "id": "java10",
    "question": "Which operator is used to check if two object references are equal (point to the same object)?",
    "options": [
      { "id": "a", "text": ".equals()", "isCorrect": false },
      { "id": "b", "text": "==", "isCorrect": true },
      { "id": "c", "text": ".compare()", "isCorrect": false },
      { "id": "d", "text": "!==", "isCorrect": false }
    ],
    "explanation": "The **==** operator compares the **references** for objects. The `.equals()` method is used to compare the **content** of the objects (though it must be properly overridden for custom classes)."
  },
  {
    "id": "java11",
    "question": "Which statement is used to execute a block of code at least once, then repeatedly as long as a condition is true?",
    "options": [
      { "id": "a", "text": "while loop", "isCorrect": false },
      { "id": "b", "text": "for loop", "isCorrect": false },
      { "id": "c", "text": "do-while loop", "isCorrect": true },
      { "id": "d", "text": "if-else statement", "isCorrect": false }
    ],
    "explanation": "The **do-while loop** is an exit-controlled loop. It executes the body once before checking the condition, guaranteeing at least one execution."
  },
  {
    "id": "java12",
    "question": "What is the base class for all classes in Java?",
    "options": [
      { "id": "a", "text": "Main", "isCorrect": false },
      { "id": "b", "text": "System", "isCorrect": false },
      { "id": "c", "text": "Object", "isCorrect": true },
      { "id": "d", "text": "Class", "isCorrect": false }
    ],
    "explanation": "The **java.lang.Object** class is the root of the class hierarchy. Every class has `Object` as a superclass. All objects, including arrays, implement the methods of this class."
  },
  {
    "id": "java13",
    "question": "Which keyword is used to explicitly call a constructor of the superclass?",
    "options": [
      { "id": "a", "text": "this", "isCorrect": false },
      { "id": "b", "text": "super", "isCorrect": true },
      { "id": "c", "text": "parent", "isCorrect": false },
      { "id": "d", "text": "new", "isCorrect": false }
    ],
    "explanation": "The **super** keyword is used to refer to immediate superclass members, including calling a superclass's constructor (e.g., `super(args);`) which must be the first statement in the subclass constructor."
  },
  {
    "id": "java14",
    "question": "Which block is *always* executed regardless of whether an exception is thrown or caught?",
    "options": [
      { "id": "a", "text": "try", "isCorrect": false },
      { "id": "b", "text": "catch", "isCorrect": false },
      { "id": "c", "text": "throws", "isCorrect": false },
      { "id": "d", "text": "finally", "isCorrect": true }
    ],
    "explanation": "The **finally** block is executed after the `try` block and any associated `catch` blocks have finished, whether or not an exception was thrown."
  },
  {
    "id": "java15",
    "question": "What is the default value of a local variable of type 'int'?",
    "options": [
      { "id": "a", "text": "0", "isCorrect": false },
      { "id": "b", "text": "null", "isCorrect": false },
      { "id": "c", "text": "undefined", "isCorrect": true },
      { "id": "d", "text": "Java automatically initializes it to 0", "isCorrect": false }
    ],
    "explanation": "Unlike instance variables, **local variables** are not automatically initialized by Java. The compiler will report an error if you attempt to use an uninitialized local variable. Therefore, its default value is considered **undefined** or unassigned."
  },
  {
    "id": "java16",
    "question": "In Java, objects are created using the 'new' keyword. Where is the memory for the object allocated?",
    "options": [
      { "id": "a", "text": "Stack", "isCorrect": false },
      { "id": "b", "text": "Heap", "isCorrect": true },
      { "id": "c", "text": "Permanent Generation (PermGen)", "isCorrect": false },
      { "id": "d", "text": "Registers", "isCorrect": false }
    ],
    "explanation": "In Java, all objects and arrays are allocated on the **Heap** memory. Primitive data types and object references are typically stored on the **Stack**."
  },
  {
    "id": "java17",
    "question": "Which interface must be implemented by a class whose objects are intended to be executed by a thread?",
    "options": [
      { "id": "a", "text": "Startable", "isCorrect": false },
      { "id": "b", "text": "Runnable", "isCorrect": true },
      { "id": "c", "d": "Threadable", "isCorrect": false },
      { "id": "d", "text": "Serializable", "isCorrect": false }
    ],
    "explanation": "The **Runnable** interface defines a single method, `run()`, which contains the code executed by the thread. This is one of the two primary ways to create a thread (the other being subclassing `Thread`)."
  },
  {
    "id": "java18",
    "question": "What is **Encapsulation** in Object-Oriented Programming?",
    "options": [
      { "id": "a", "text": "The ability of an object to take on many forms.", "isCorrect": false },
      { "id": "b", "text": "The mechanism of creating new classes from existing classes.", "isCorrect": false },
      { "id": "c", "text": "Binding data (variables) and code (methods) together into a single unit and hiding the internal details.", "isCorrect": true },
      { "id": "d", "text": "Defining two methods with the same name but different parameters.", "isCorrect": false }
    ],
    "explanation": "**Encapsulation** involves wrapping the data and the methods that operate on the data into a single unit (a class). It is often achieved by making variables `private` and providing public getter/setter methods."
  },
  {
    "id": "java19",
    "question": "Which of the following classes is thread-safe for string manipulation?",
    "options": [
      { "id": "a", "text": "String", "isCorrect": false },
      { "id": "b", "text": "StringBuilder", "isCorrect": false },
      { "id": "c", "text": "StringBuffer", "isCorrect": true },
      { "id": "d", "text": "CharBuffer", "isCorrect": false }
    ],
    "explanation": "**StringBuffer** is synchronized (thread-safe) and ensures sequential access in a multi-threaded environment. **StringBuilder** is faster but not thread-safe."
  },
  {
    "id": "java20",
    "question": "A class that is declared with the `abstract` keyword and may have abstract methods is called an:",
    "options": [
      { "id": "a", "text": "Interface", "isCorrect": false },
      { "id": "b", "text": "Concrete Class", "isCorrect": false },
      { "id": "c", "text": "Abstract Class", "isCorrect": true },
      { "id": "d", "text": "Final Class", "isCorrect": false }
    ],
    "explanation": "An **Abstract Class** cannot be instantiated and may contain both concrete (implemented) and abstract (unimplemented) methods. Subclasses must implement all abstract methods to become concrete."
  },
  {
    "id": "java21",
    "question": "What is the purpose of the `break` statement inside a loop?",
    "options": [
      { "id": "a", "text": "To skip the current iteration and proceed to the next.", "isCorrect": false },
      { "id": "b", "text": "To terminate the loop and transfer execution to the statement immediately following the loop.", "isCorrect": true },
      { "id": "c", "text": "To stop the program execution.", "isCorrect": false },
      { "id": "d", "text": "To return a value from the loop.", "isCorrect": false }
    ],
    "explanation": "The **break** statement is used to exit the nearest encompassing loop (for, while, do-while) or switch statement, regardless of the loop's condition."
  },
  {
    "id": "java22",
    "question": "Which concept allows a child class to provide a specific implementation for a method that is already provided by its parent class?",
    "options": [
      { "id": "a", "text": "Method Overloading", "isCorrect": false },
      { "id": "b", "text": "Method Hiding", "isCorrect": false },
      { "id": "c", "text": "Method Overriding", "isCorrect": true },
      { "id": "d", "text": "Abstraction", "isCorrect": false }
    ],
    "explanation": "**Method Overriding** occurs when a subclass defines a method with the exact same name, return type, and parameter list as a method defined in its superclass. This is a key aspect of **Polymorphism**."
  }
];

// Git Test Questions
const gitQuestions: QuizQuestion[] = [
  {
    id: "git1",
    question: "Which command is used to initialize a new Git repository?",
    options: [
      { id: "a", text: "git start", isCorrect: false },
      { id: "b", text: "git init", isCorrect: true },
      { id: "c", text: "git create", isCorrect: false },
      { id: "d", text: "git new", isCorrect: false }
    ],
    explanation: "The 'git init' command creates a new Git repository in the current directory."
  },
  {
    id: "git2",
    question: "Which command shows the current status of the working directory?",
    options: [
      { id: "a", text: "git status", isCorrect: true },
      { id: "b", text: "git state", isCorrect: false },
      { id: "c", text: "git info", isCorrect: false },
      { id: "d", text: "git check", isCorrect: false }
    ],
    explanation: "The 'git status' command displays the state of the working directory and staging area."
  },
  {
    id: "git3",
    question: "Which command is used to create and switch to a new branch?",
    options: [
      { id: "a", text: "git branch -new", isCorrect: false },
      { id: "b", text: "git checkout -b", isCorrect: true },
      { id: "c", text: "git create branch", isCorrect: false },
      { id: "d", text: "git switch -new", isCorrect: false }
    ],
    explanation: "The 'git checkout -b <branch-name>' command creates a new branch and switches to it in one step."
  }
];

// Additional shorter question sets for other technologies
const cQuestions: QuizQuestion[] = [
  {
    id: "c1",
    question: "Which symbol is used to declare a pointer in C?",
    options: [
      { id: "a", text: "&", isCorrect: false },
      { id: "b", text: "*", isCorrect: true },
      { id: "c", text: "#", isCorrect: false },
      { id: "d", text: "%", isCorrect: false }
    ],
    explanation: "The asterisk (*) symbol is used to declare pointer variables in C."
  }
];

const cppQuestions: QuizQuestion[] = [
  {
    id: "cpp1",
    question: "Which header file is required for input/output operations in C++?",
    options: [
      { id: "a", text: "<stdio.h>", isCorrect: false },
      { id: "b", text: "<iostream>", isCorrect: true },
      { id: "c", text: "<io.h>", isCorrect: false },
      { id: "d", text: "<input.h>", isCorrect: false }
    ],
    explanation: "The <iostream> header provides input/output stream objects like cout and cin in C++."
  }
];

const nodeQuestions: QuizQuestion[] = [
  {
    id: "node1",
    question: "Which command is used to initialize a new Node.js project?",
    options: [
      { id: "a", text: "node init", isCorrect: false },
      { id: "b", text: "npm init", isCorrect: true },
      { id: "c", text: "npm start", isCorrect: false },
      { id: "d", text: "node create", isCorrect: false }
    ],
    explanation: "The 'npm init' command creates a package.json file to initialize a new Node.js project."
  }
];

const flutterQuestions: QuizQuestion[] = [
  {
    id: "flutter1",
    question: "Which programming language is primarily used for Flutter development?",
    options: [
      { id: "a", text: "Java", isCorrect: false },
      { id: "b", text: "Dart", isCorrect: true },
      { id: "c", text: "Kotlin", isCorrect: false },
      { id: "d", text: "Swift", isCorrect: false }
    ],
    explanation: "Flutter uses Dart as its primary programming language for building cross-platform applications."
  }
];

const swiftQuestions: QuizQuestion[] = [
  {
    id: "swift1",
    question: "Which keyword is used to declare a constant in Swift?",
    options: [
      { id: "a", text: "var", isCorrect: false },
      { id: "b", text: "let", isCorrect: true },
      { id: "c", text: "const", isCorrect: false },
      { id: "d", text: "final", isCorrect: false }
    ],
    explanation: "In Swift, 'let' is used to declare constants while 'var' is used for variables."
  }
];

const nextjsQuestions: QuizQuestion[] = [
  {
    id: "next1",
    question: "What is the default file-based routing in Next.js based on?",
    options: [
      { id: "a", text: "src folder structure", isCorrect: false },
      { id: "b", text: "pages folder structure", isCorrect: true },
      { id: "c", text: "components folder structure", isCorrect: false },
      { id: "d", text: "routes folder structure", isCorrect: false }
    ],
    explanation: "Next.js uses file-based routing where the pages folder structure determines the application routes."
  }
];

// React Test Questions
const reactQuestions: QuizQuestion[] = [
  {
    id: "react1",
    question: "What is JSX in React?",
    options: [
      { id: "a", text: "A JavaScript library", isCorrect: false },
      { id: "b", text: "A syntax extension for JavaScript", isCorrect: true },
      { id: "c", text: "A CSS framework", isCorrect: false },
      { id: "d", text: "A database query language", isCorrect: false }
    ],
    explanation: "JSX is a syntax extension for JavaScript that allows you to write HTML-like code in JavaScript files."
  },
  {
    id: "react2",
    question: "Which method is used to create React components?",
    options: [
      { id: "a", text: "React.createComponent()", isCorrect: false },
      { id: "b", text: "function or class", isCorrect: true },
      { id: "c", text: "React.newComponent()", isCorrect: false },
      { id: "d", text: "React.makeComponent()", isCorrect: false }
    ],
    explanation: "React components can be created using function components or class components."
  },
  {
    id: "react3",
    question: "What is the correct way to render an element in React?",
    options: [
      { id: "a", text: "ReactDOM.render()", isCorrect: true },
      { id: "b", text: "React.render()", isCorrect: false },
      { id: "c", text: "document.render()", isCorrect: false },
      { id: "d", text: "render()", isCorrect: false }
    ],
    explanation: "ReactDOM.render() is used to render React elements into the DOM."
  },
  {
    id: "react4",
    question: "What are props in React?",
    options: [
      { id: "a", text: "Properties passed to components", isCorrect: true },
      { id: "b", text: "CSS properties", isCorrect: false },
      { id: "c", text: "JavaScript methods", isCorrect: false },
      { id: "d", text: "HTML attributes", isCorrect: false }
    ],
    explanation: "Props are properties passed from parent components to child components in React."
  },
  {
    id: "react5",
    question: "What is state in React?",
    options: [
      { id: "a", text: "External API data", isCorrect: false },
      { id: "b", text: "Component's internal data", isCorrect: true },
      { id: "c", text: "Global variables", isCorrect: false },
      { id: "d", text: "CSS styles", isCorrect: false }
    ],
    explanation: "State is a component's internal data that can change over time and trigger re-renders."
  }
];

export const testCategories: TestCategory[] = [
  {
    id: "python",
    name: "Python",
    description: "Test your Python programming knowledge including syntax, data structures, and core concepts",
    icon: "🐍",
    color: "from-blue-500 to-green-500",
    questions: pythonQuestions
  },
  {
    id: "javascript",
    name: "JavaScript",
    description: "Evaluate your JavaScript skills covering ES6+, DOM manipulation, and modern features",
    icon: "⚡",
    color: "from-yellow-500 to-orange-500",
    questions: javascriptQuestions
  },
  {
    id: "react",
    name: "React",
    description: "Test your React knowledge including components, JSX, props, and state management",
    icon: "⚛️",
    color: "from-blue-400 to-cyan-500",
    questions: reactQuestions
  },
  {
    id: "html",
    name: "HTML",
    description: "Test your HTML knowledge including semantic elements, forms, and best practices",
    icon: "🌐",
    color: "from-orange-500 to-red-500",
    questions: htmlQuestions
  },
  {
    id: "java",
    name: "Java",
    description: "Assess your Java programming skills including OOP concepts and core libraries",
    icon: "☕",
    color: "from-red-500 to-pink-500",
    questions: javaQuestions
  },
  {
    id: "c",
    name: "C",
    description: "Test your C programming fundamentals including pointers, memory management",
    icon: "⚙️",
    color: "from-gray-500 to-blue-500",
    questions: cQuestions
  },
  {
    id: "cpp",
    name: "C++",
    description: "Evaluate your C++ knowledge including OOP, STL, and advanced features",
    icon: "🔧",
    color: "from-blue-500 to-purple-500",
    questions: cppQuestions
  },
  {
    id: "nodejs",
    name: "Node.js",
    description: "Test your Node.js skills including npm, modules, and server-side development",
    icon: "🚀",
    color: "from-green-500 to-teal-500",
    questions: nodeQuestions
  },
  {
    id: "git",
    name: "Git",
    description: "Assess your Git version control knowledge including branching and collaboration",
    icon: "📚",
    color: "from-purple-500 to-indigo-500",
    questions: gitQuestions
  },
  {
    id: "flutter",
    name: "Flutter",
    description: "Test your Flutter development skills for cross-platform mobile applications",
    icon: "📱",
    color: "from-cyan-500 to-blue-500",
    questions: flutterQuestions
  },
  {
    id: "swift",
    name: "Swift",
    description: "Evaluate your Swift programming knowledge for iOS development",
    icon: "🍎",
    color: "from-indigo-500 to-purple-500",
    questions: swiftQuestions
  },
  {
    id: "nextjs",
    name: "Next.js",
    description: "Test your Next.js framework knowledge including SSR, routing, and optimization",
    icon: "⚛️",
    color: "from-gray-700 to-gray-900",
    questions: nextjsQuestions
  }
];

// Keep the original general programming quiz for backward compatibility
export const programmingQuiz: QuizQuestion[] = [
  {
    id: "1",
    question: "Which of the following is NOT a primitive data type in JavaScript?",
    options: [
      { id: "a", text: "string", isCorrect: false },
      { id: "b", text: "boolean", isCorrect: false },
      { id: "c", text: "array", isCorrect: true },
      { id: "d", text: "number", isCorrect: false }
    ],
    explanation: "Arrays are objects in JavaScript, not primitive data types. The primitive data types in JavaScript are: string, number, boolean, undefined, null, symbol, and bigint."
  },
  {
    id: "2",
    question: "What does the 'virtual DOM' in React provide?",
    options: [
      { id: "a", text: "Direct manipulation of browser DOM", isCorrect: false },
      { id: "b", text: "A JavaScript representation of the real DOM", isCorrect: true },
      { id: "c", text: "Server-side rendering capabilities", isCorrect: false },
      { id: "d", text: "Database connectivity", isCorrect: false }
    ],
    explanation: "The virtual DOM is a JavaScript representation of the real DOM kept in memory. React uses it to optimize rendering by comparing (diffing) the virtual DOM trees and updating only the changed parts in the real DOM."
  },
  {
    id: "3",
    question: "In Python, which method is used to add an element to the end of a list?",
    options: [
      { id: "a", text: "add()", isCorrect: false },
      { id: "b", text: "insert()", isCorrect: false },
      { id: "c", text: "append()", isCorrect: true },
      { id: "d", text: "push()", isCorrect: false }
    ],
    explanation: "The append() method adds a single element to the end of a list. The insert() method can add an element at a specific position, while add() is used for sets, and push() is used in other languages like JavaScript."
  },
  {
    id: "4",
    question: "What is the time complexity of binary search algorithm?",
    options: [
      { id: "a", text: "O(n)", isCorrect: false },
      { id: "b", text: "O(log n)", isCorrect: true },
      { id: "c", text: "O(n²)", isCorrect: false },
      { id: "d", text: "O(1)", isCorrect: false }
    ],
    explanation: "Binary search has O(log n) time complexity because it eliminates half of the remaining elements in each step, making it very efficient for searching in sorted arrays."
  },
  {
    id: "5",
    question: "Which SQL command is used to remove a table from a database?",
    options: [
      { id: "a", text: "DELETE TABLE", isCorrect: false },
      { id: "b", text: "REMOVE TABLE", isCorrect: false },
      { id: "c", text: "DROP TABLE", isCorrect: true },
      { id: "d", text: "CLEAR TABLE", isCorrect: false }
    ],
    explanation: "DROP TABLE completely removes a table and all its data from the database. DELETE removes rows from a table but keeps the table structure, while the other options are not valid SQL commands."
  },
  {
    id: "6",
    question: "In object-oriented programming, what does 'encapsulation' mean?",
    options: [
      { id: "a", text: "Creating multiple instances of a class", isCorrect: false },
      { id: "b", text: "Hiding internal implementation details", isCorrect: true },
      { id: "c", text: "Inheriting from parent classes", isCorrect: false },
      { id: "d", text: "Overriding parent class methods", isCorrect: false }
    ],
    explanation: "Encapsulation is the principle of hiding internal implementation details and exposing only necessary interfaces. It helps in data protection and reduces complexity by bundling data and methods together."
  },
  {
    id: "7",
    question: "Which of the following is a correct way to declare a constant in JavaScript (ES6+)?",
    options: [
      { id: "a", text: "constant PI = 3.14", isCorrect: false },
      { id: "b", text: "const PI = 3.14", isCorrect: true },
      { id: "c", text: "final PI = 3.14", isCorrect: false },
      { id: "d", text: "readonly PI = 3.14", isCorrect: false }
    ],
    explanation: "In ES6+, 'const' is used to declare constants. Unlike 'var' and 'let', variables declared with 'const' cannot be reassigned after initialization and must be initialized at declaration."
  },
  {
    id: "8",
    question: "What is the purpose of CSS Grid?",
    options: [
      { id: "a", text: "Adding animations to web pages", isCorrect: false },
      { id: "b", text: "Creating two-dimensional layouts", isCorrect: true },
      { id: "c", text: "Styling text and fonts", isCorrect: false },
      { id: "d", text: "Managing responsive images", isCorrect: false }
    ],
    explanation: "CSS Grid is a powerful layout system that allows you to create complex two-dimensional layouts with rows and columns. It provides precise control over both horizontal and vertical alignment of elements."
  },
  {
    id: "9",
    question: "In Git, which command is used to create a new branch?",
    options: [
      { id: "a", text: "git new branch-name", isCorrect: false },
      { id: "b", text: "git branch branch-name", isCorrect: true },
      { id: "c", text: "git create branch-name", isCorrect: false },
      { id: "d", text: "git make branch-name", isCorrect: false }
    ],
    explanation: "The 'git branch branch-name' command creates a new branch. You can also use 'git checkout -b branch-name' to create and switch to the new branch in one command."
  },
  {
    id: "10",
    question: "What does API stand for?",
    options: [
      { id: "a", text: "Advanced Programming Interface", isCorrect: false },
      { id: "b", text: "Application Programming Interface", isCorrect: true },
      { id: "c", text: "Automated Program Integration", isCorrect: false },
      { id: "d", text: "Applied Programming Instructions", isCorrect: false }
    ],
    explanation: "API stands for Application Programming Interface. It's a set of protocols, routines, and tools that allows different software applications to communicate with each other."
  }
];

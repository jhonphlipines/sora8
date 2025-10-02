export interface CodingProblem {
  id: number;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  description: string;
  examples: {
    input: string;
    output: string;
    explanation?: string;
  }[];
  constraints: string[];
  topics: string[];
  companies: string[];
  startingCode: Record<string, string>;
  testCases: {
    input: string;
    expected: string;
  }[];
  hints?: string[];
}

export const supportedLanguages = [
  { value: 'javascript', label: 'JavaScript', monaco: 'javascript' },
  { value: 'typescript', label: 'TypeScript', monaco: 'typescript' },
  { value: 'python', label: 'Python', monaco: 'python' },
  { value: 'python3', label: 'Python3', monaco: 'python' },
  { value: 'java', label: 'Java', monaco: 'java' },
  { value: 'cpp', label: 'C++', monaco: 'cpp' },
  { value: 'c', label: 'C', monaco: 'c' },
  { value: 'csharp', label: 'C#', monaco: 'csharp' },
  { value: 'go', label: 'Go', monaco: 'go' },
  { value: 'rust', label: 'Rust', monaco: 'rust' },
  { value: 'kotlin', label: 'Kotlin', monaco: 'kotlin' },
  { value: 'swift', label: 'Swift', monaco: 'swift' },
  { value: 'ruby', label: 'Ruby', monaco: 'ruby' },
  { value: 'php', label: 'PHP', monaco: 'php' },
  { value: 'dart', label: 'Dart', monaco: 'dart' },
  { value: 'scala', label: 'Scala', monaco: 'scala' },
];

export const codingProblems: CodingProblem[] = [
  {
    id: 1,
    title: "Two Sum",
    difficulty: "Easy",
    description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.\n\nYou can return the answer in any order.",
    examples: [
      {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]",
        explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]."
      },
      {
        input: "nums = [3,2,4], target = 6",
        output: "[1,2]"
      },
      {
        input: "nums = [3,3], target = 6",
        output: "[0,1]"
      }
    ],
    constraints: [
      "2 <= nums.length <= 10^4",
      "-10^9 <= nums[i] <= 10^9",
      "-10^9 <= target <= 10^9",
      "Only one valid answer exists."
    ],
    topics: ["Array", "Hash Table"],
    companies: ["Amazon", "Google", "Microsoft"],
    startingCode: {
      javascript: `/**\n * @param {number[]} nums\n * @param {number} target\n * @return {number[]}\n */\nvar twoSum = function(nums, target) {\n    \n};`,
      typescript: `function twoSum(nums: number[], target: number): number[] {\n    \n};`,
      python: `def twoSum(nums: List[int], target: int) -> List[int]:\n    `,
      python3: `def twoSum(nums: List[int], target: int) -> List[int]:\n    `,
      java: `class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        \n    }\n};`,
      c: `int* twoSum(int* nums, int numsSize, int target, int* returnSize) {\n    \n}`,
      csharp: `public class Solution {\n    public int[] TwoSum(int[] nums, int target) {\n        \n    }\n}`,
      go: `func twoSum(nums []int, target int) []int {\n    \n}`,
      rust: `impl Solution {\n    pub fn two_sum(nums: Vec<i32>, target: i32) -> Vec<i32> {\n        \n    }\n}`,
      kotlin: `class Solution {\n    fun twoSum(nums: IntArray, target: Int): IntArray {\n        \n    }\n}`,
      swift: `class Solution {\n    func twoSum(_ nums: [Int], _ target: Int) -> [Int] {\n        \n    }\n}`,
      ruby: `def two_sum(nums, target)\n    \nend`,
      php: `class Solution {\n    function twoSum($nums, $target) {\n        \n    }\n}`,
      dart: `class Solution {\n  List<int> twoSum(List<int> nums, int target) {\n    \n  }\n}`,
      scala: `object Solution {\n    def twoSum(nums: Array[Int], target: Int): Array[Int] = {\n        \n    }\n}`,
    },
    testCases: [
      { input: "[2,7,11,15], 9", expected: "[0,1]" },
      { input: "[3,2,4], 6", expected: "[1,2]" },
      { input: "[3,3], 6", expected: "[0,1]" }
    ],
    hints: [
      "A really brute force way would be to search for all possible pairs of numbers but that would be too slow. Again, it's best to try out brute force solutions for just for completeness. It is from these brute force solutions that you can come up with optimizations.",
      "So, if we fix one of the numbers, say x, we have to scan the entire array to find the next number y which is value - x where value is the input parameter. Can we change our array somehow so that this search becomes faster?",
      "The second train of thought is, without changing the array, can we use additional space somehow? Like maybe a hash map to speed up the search?"
    ]
  },
  {
    id: 2,
    title: "Add Two Numbers",
    difficulty: "Medium",
    description: "You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.\n\nYou may assume the two numbers do not contain any leading zero, except the number 0 itself.",
    examples: [
      {
        input: "l1 = [2,4,3], l2 = [5,6,4]",
        output: "[7,0,8]",
        explanation: "342 + 465 = 807."
      },
      {
        input: "l1 = [0], l2 = [0]",
        output: "[0]"
      },
      {
        input: "l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]",
        output: "[8,9,9,9,0,0,0,1]"
      }
    ],
    constraints: [
      "The number of nodes in each linked list is in the range [1, 100].",
      "0 <= Node.val <= 9",
      "It is guaranteed that the list represents a number that does not have leading zeros."
    ],
    topics: ["Linked List", "Math", "Recursion"],
    companies: ["Amazon", "Microsoft", "Adobe"],
    startingCode: {
      javascript: `/**\n * Definition for singly-linked list.\n * function ListNode(val, next) {\n *     this.val = (val===undefined ? 0 : val)\n *     this.next = (next===undefined ? null : next)\n * }\n */\n/**\n * @param {ListNode} l1\n * @param {ListNode} l2\n * @return {ListNode}\n */\nvar addTwoNumbers = function(l1, l2) {\n    \n};`,
      typescript: `class ListNode {\n    val: number\n    next: ListNode | null\n    constructor(val?: number, next?: ListNode | null) {\n        this.val = (val===undefined ? 0 : val)\n        this.next = (next===undefined ? null : next)\n    }\n}\n\nfunction addTwoNumbers(l1: ListNode | null, l2: ListNode | null): ListNode | null {\n    \n}`,
      python: `# Definition for singly-linked list.\n# class ListNode:\n#     def __init__(self, val=0, next=None):\n#         self.val = val\n#         self.next = next\nclass Solution:\n    def addTwoNumbers(self, l1: Optional[ListNode], l2: Optional[ListNode]) -> Optional[ListNode]:\n        `,
      python3: `# Definition for singly-linked list.\n# class ListNode:\n#     def __init__(self, val=0, next=None):\n#         self.val = val\n#         self.next = next\nclass Solution:\n    def addTwoNumbers(self, l1: Optional[ListNode], l2: Optional[ListNode]) -> Optional[ListNode]:\n        `,
      java: `class Solution {\n    public ListNode addTwoNumbers(ListNode l1, ListNode l2) {\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {\n        \n    }\n};`,
      c: `struct ListNode* addTwoNumbers(struct ListNode* l1, struct ListNode* l2) {\n    \n}`,
      csharp: `public class Solution {\n    public ListNode AddTwoNumbers(ListNode l1, ListNode l2) {\n        \n    }\n}`,
      go: `func addTwoNumbers(l1 *ListNode, l2 *ListNode) *ListNode {\n    \n}`,
      rust: `impl Solution {\n    pub fn add_two_numbers(l1: Option<Box<ListNode>>, l2: Option<Box<ListNode>>) -> Option<Box<ListNode>> {\n        \n    }\n}`,
      kotlin: `class Solution {\n    fun addTwoNumbers(l1: ListNode?, l2: ListNode?): ListNode? {\n        \n    }\n}`,
      swift: `class Solution {\n    func addTwoNumbers(_ l1: ListNode?, _ l2: ListNode?) -> ListNode? {\n        \n    }\n}`,
      ruby: `def add_two_numbers(l1, l2)\n    \nend`,
      php: `class Solution {\n    function addTwoNumbers($l1, $l2) {\n        \n    }\n}`,
      dart: `class Solution {\n  ListNode? addTwoNumbers(ListNode? l1, ListNode? l2) {\n    \n  }\n}`,
      scala: `object Solution {\n    def addTwoNumbers(l1: ListNode, l2: ListNode): ListNode = {\n        \n    }\n}`,
    },
    testCases: [
      { input: "[2,4,3], [5,6,4]", expected: "[7,0,8]" },
      { input: "[0], [0]", expected: "[0]" },
      { input: "[9,9,9,9,9,9,9], [9,9,9,9]", expected: "[8,9,9,9,0,0,0,1]" }
    ]
  },
  {
    id: 3,
    title: "Longest Substring Without Repeating Characters",
    difficulty: "Medium",
    description: "Given a string s, find the length of the longest substring without repeating characters.",
    examples: [
      {
        input: 's = "abcabcbb"',
        output: "3",
        explanation: 'The answer is "abc", with the length of 3.'
      },
      {
        input: 's = "bbbbb"',
        output: "1",
        explanation: 'The answer is "b", with the length of 1.'
      },
      {
        input: 's = "pwwkew"',
        output: "3",
        explanation: 'The answer is "wke", with the length of 3. Notice that the answer must be a substring, "pwke" is a subsequence and not a substring.'
      }
    ],
    constraints: [
      "0 <= s.length <= 5 * 10^4",
      "s consists of English letters, digits, symbols and spaces."
    ],
    topics: ["Hash Table", "String", "Sliding Window"],
    companies: ["Amazon", "Bloomberg", "Adobe"],
    startingCode: {
      javascript: `/**\n * @param {string} s\n * @return {number}\n */\nvar lengthOfLongestSubstring = function(s) {\n    \n};`,
      typescript: `function lengthOfLongestSubstring(s: string): number {\n    \n}`,
      python: `class Solution:\n    def lengthOfLongestSubstring(self, s: str) -> int:\n        `,
      python3: `class Solution:\n    def lengthOfLongestSubstring(self, s: str) -> int:\n        `,
      java: `class Solution {\n    public int lengthOfLongestSubstring(String s) {\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    int lengthOfLongestSubstring(string s) {\n        \n    }\n};`,
      c: `int lengthOfLongestSubstring(char* s) {\n    \n}`,
      csharp: `public class Solution {\n    public int LengthOfLongestSubstring(string s) {\n        \n    }\n}`,
      go: `func lengthOfLongestSubstring(s string) int {\n    \n}`,
      rust: `impl Solution {\n    pub fn length_of_longest_substring(s: String) -> i32 {\n        \n    }\n}`,
      kotlin: `class Solution {\n    fun lengthOfLongestSubstring(s: String): Int {\n        \n    }\n}`,
      swift: `class Solution {\n    func lengthOfLongestSubstring(_ s: String) -> Int {\n        \n    }\n}`,
      ruby: `def length_of_longest_substring(s)\n    \nend`,
      php: `class Solution {\n    function lengthOfLongestSubstring($s) {\n        \n    }\n}`,
      dart: `class Solution {\n  int lengthOfLongestSubstring(String s) {\n    \n  }\n}`,
      scala: `object Solution {\n    def lengthOfLongestSubstring(s: String): Int = {\n        \n    }\n}`,
    },
    testCases: [
      { input: '"abcabcbb"', expected: "3" },
      { input: '"bbbbb"', expected: "1" },
      { input: '"pwwkew"', expected: "3" }
    ]
  },
  {
    id: 4,
    title: "Median of Two Sorted Arrays",
    difficulty: "Hard",
    description: "Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.\n\nThe overall run time complexity should be O(log (m+n)).",
    examples: [
      {
        input: "nums1 = [1,3], nums2 = [2]",
        output: "2.00000",
        explanation: "merged array = [1,2,3] and median is 2."
      },
      {
        input: "nums1 = [1,2], nums2 = [3,4]",
        output: "2.50000",
        explanation: "merged array = [1,2,3,4] and median is (2 + 3) / 2 = 2.5."
      }
    ],
    constraints: [
      "nums1.length == m",
      "nums2.length == n",
      "0 <= m <= 1000",
      "0 <= n <= 1000",
      "1 <= m + n <= 2000",
      "-10^6 <= nums1[i], nums2[i] <= 10^6"
    ],
    topics: ["Array", "Binary Search", "Divide and Conquer"],
    companies: ["Google", "Amazon", "Microsoft"],
    startingCode: {
      javascript: `/**\n * @param {number[]} nums1\n * @param {number[]} nums2\n * @return {number}\n */\nvar findMedianSortedArrays = function(nums1, nums2) {\n    \n};`,
      typescript: `function findMedianSortedArrays(nums1: number[], nums2: number[]): number {\n    \n}`,
      python: `class Solution:\n    def findMedianSortedArrays(self, nums1: List[int], nums2: List[int]) -> float:\n        `,
      python3: `class Solution:\n    def findMedianSortedArrays(self, nums1: List[int], nums2: List[int]) -> float:\n        `,
      java: `class Solution {\n    public double findMedianSortedArrays(int[] nums1, int[] nums2) {\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {\n        \n    }\n};`,
      c: `double findMedianSortedArrays(int* nums1, int nums1Size, int* nums2, int nums2Size) {\n    \n}`,
      csharp: `public class Solution {\n    public double FindMedianSortedArrays(int[] nums1, int[] nums2) {\n        \n    }\n}`,
      go: `func findMedianSortedArrays(nums1 []int, nums2 []int) float64 {\n    \n}`,
      rust: `impl Solution {\n    pub fn find_median_sorted_arrays(nums1: Vec<i32>, nums2: Vec<i32>) -> f64 {\n        \n    }\n}`,
      kotlin: `class Solution {\n    fun findMedianSortedArrays(nums1: IntArray, nums2: IntArray): Double {\n        \n    }\n}`,
      swift: `class Solution {\n    func findMedianSortedArrays(_ nums1: [Int], _ nums2: [Int]) -> Double {\n        \n    }\n}`,
      ruby: `def find_median_sorted_arrays(nums1, nums2)\n    \nend`,
      php: `class Solution {\n    function findMedianSortedArrays($nums1, $nums2) {\n        \n    }\n}`,
      dart: `class Solution {\n  double findMedianSortedArrays(List<int> nums1, List<int> nums2) {\n    \n  }\n}`,
      scala: `object Solution {\n    def findMedianSortedArrays(nums1: Array[Int], nums2: Array[Int]): Double = {\n        \n    }\n}`,
    },
    testCases: [
      { input: "[1,3], [2]", expected: "2.00000" },
      { input: "[1,2], [3,4]", expected: "2.50000" }
    ]
  },
  {
    id: 5,
    title: "Longest Palindromic Substring",
    difficulty: "Medium",
    description: "Given a string s, return the longest palindromic substring in s.",
    examples: [
      {
        input: 's = "babad"',
        output: '"bab"',
        explanation: '"aba" is also a valid answer.'
      },
      {
        input: 's = "cbbd"',
        output: '"bb"'
      }
    ],
    constraints: [
      "1 <= s.length <= 1000",
      "s consist of only digits and English letters."
    ],
    topics: ["String", "Dynamic Programming"],
    companies: ["Amazon", "Microsoft", "Adobe"],
    startingCode: {
      javascript: `/**\n * @param {string} s\n * @return {string}\n */\nvar longestPalindrome = function(s) {\n    \n};`,
      typescript: `function longestPalindrome(s: string): string {\n    \n}`,
      python: `class Solution:\n    def longestPalindrome(self, s: str) -> str:\n        `,
      python3: `class Solution:\n    def longestPalindrome(self, s: str) -> str:\n        `,
      java: `class Solution {\n    public String longestPalindrome(String s) {\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    string longestPalindrome(string s) {\n        \n    }\n};`,
      c: `char* longestPalindrome(char* s) {\n    \n}`,
      csharp: `public class Solution {\n    public string LongestPalindrome(string s) {\n        \n    }\n}`,
      go: `func longestPalindrome(s string) string {\n    \n}`,
      rust: `impl Solution {\n    pub fn longest_palindrome(s: String) -> String {\n        \n    }\n}`,
      kotlin: `class Solution {\n    fun longestPalindrome(s: String): String {\n        \n    }\n}`,
      swift: `class Solution {\n    func longestPalindrome(_ s: String) -> String {\n        \n    }\n}`,
      ruby: `def longest_palindrome(s)\n    \nend`,
      php: `class Solution {\n    function longestPalindrome($s) {\n        \n    }\n}`,
      dart: `class Solution {\n  String longestPalindrome(String s) {\n    \n  }\n}`,
      scala: `object Solution {\n    def longestPalindrome(s: String): String = {\n        \n    }\n}`,
    },
    testCases: [
      { input: '"babad"', expected: '"bab"' },
      { input: '"cbbd"', expected: '"bb"' }
    ]
  },
  {
    id: 6,
    title: "Zigzag Conversion",
    difficulty: "Medium",
    description: 'The string "PAYPALISHIRING" is written in a zigzag pattern on a given number of rows like this: (you may want to display this pattern in a fixed font for better legibility)\n\nP   A   H   N\nA P L S I I G\nY   I   R\n\nAnd then read line by line: "PAHNAPLSIIGYIR"\n\nWrite the code that will take a string and make this conversion given a number of rows.',
    examples: [
      {
        input: 's = "PAYPALISHIRING", numRows = 3',
        output: '"PAHNAPLSIIGYIR"'
      },
      {
        input: 's = "PAYPALISHIRING", numRows = 4',
        output: '"PINALSIGYAHRPI"',
        explanation: 'P     I    N\nA   L S  I G\nY A   H R\nP     I'
      },
      {
        input: 's = "A", numRows = 1',
        output: '"A"'
      }
    ],
    constraints: [
      "1 <= s.length <= 1000",
      "s consists of English letters (lower-case and upper-case), ',' and '.'.",
      "1 <= numRows <= 1000"
    ],
    topics: ["String"],
    companies: ["Amazon", "Microsoft"],
    startingCode: {
      javascript: `/**\n * @param {string} s\n * @param {number} numRows\n * @return {string}\n */\nvar convert = function(s, numRows) {\n    \n};`,
      typescript: `function convert(s: string, numRows: number): string {\n    \n}`,
      python: `class Solution:\n    def convert(self, s: str, numRows: int) -> str:\n        `,
      python3: `class Solution:\n    def convert(self, s: str, numRows: int) -> str:\n        `,
      java: `class Solution {\n    public String convert(String s, int numRows) {\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    string convert(string s, int numRows) {\n        \n    }\n};`,
      c: `char* convert(char* s, int numRows) {\n    \n}`,
      csharp: `public class Solution {\n    public string Convert(string s, int numRows) {\n        \n    }\n}`,
      go: `func convert(s string, numRows int) string {\n    \n}`,
      rust: `impl Solution {\n    pub fn convert(s: String, num_rows: i32) -> String {\n        \n    }\n}`,
      kotlin: `class Solution {\n    fun convert(s: String, numRows: Int): String {\n        \n    }\n}`,
      swift: `class Solution {\n    func convert(_ s: String, _ numRows: Int) -> String {\n        \n    }\n}`,
      ruby: `def convert(s, num_rows)\n    \nend`,
      php: `class Solution {\n    function convert($s, $numRows) {\n        \n    }\n}`,
      dart: `class Solution {\n  String convert(String s, int numRows) {\n    \n  }\n}`,
      scala: `object Solution {\n    def convert(s: String, numRows: Int): String = {\n        \n    }\n}`,
    },
    testCases: [
      { input: '"PAYPALISHIRING", 3', expected: '"PAHNAPLSIIGYIR"' },
      { input: '"PAYPALISHIRING", 4', expected: '"PINALSIGYAHRPI"' },
      { input: '"A", 1', expected: '"A"' }
    ]
  },
  {
    id: 7,
    title: "Reverse Integer",
    difficulty: "Medium",
    description: "Given a signed 32-bit integer x, return x with its digits reversed. If reversing x causes the value to go outside the signed 32-bit integer range [-2^31, 2^31 - 1], then return 0.\n\nAssume the environment does not allow you to store 64-bit integers (signed or unsigned).",
    examples: [
      {
        input: "x = 123",
        output: "321"
      },
      {
        input: "x = -123",
        output: "-321"
      },
      {
        input: "x = 120",
        output: "21"
      }
    ],
    constraints: [
      "-2^31 <= x <= 2^31 - 1"
    ],
    topics: ["Math"],
    companies: ["Bloomberg", "Apple"],
    startingCode: {
      javascript: `/**\n * @param {number} x\n * @return {number}\n */\nvar reverse = function(x) {\n    \n};`,
      typescript: `function reverse(x: number): number {\n    \n}`,
      python: `class Solution:\n    def reverse(self, x: int) -> int:\n        `,
      python3: `class Solution:\n    def reverse(self, x: int) -> int:\n        `,
      java: `class Solution {\n    public int reverse(int x) {\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    int reverse(int x) {\n        \n    }\n};`,
      c: `int reverse(int x) {\n    \n}`,
      csharp: `public class Solution {\n    public int Reverse(int x) {\n        \n    }\n}`,
      go: `func reverse(x int) int {\n    \n}`,
      rust: `impl Solution {\n    pub fn reverse(x: i32) -> i32 {\n        \n    }\n}`,
      kotlin: `class Solution {\n    fun reverse(x: Int): Int {\n        \n    }\n}`,
      swift: `class Solution {\n    func reverse(_ x: Int) -> Int {\n        \n    }\n}`,
      ruby: `def reverse(x)\n    \nend`,
      php: `class Solution {\n    function reverse($x) {\n        \n    }\n}`,
      dart: `class Solution {\n  int reverse(int x) {\n    \n  }\n}`,
      scala: `object Solution {\n    def reverse(x: Int): Int = {\n        \n    }\n}`,
    },
    testCases: [
      { input: "123", expected: "321" },
      { input: "-123", expected: "-321" },
      { input: "120", expected: "21" }
    ]
  },
  {
    id: 8,
    title: "String to Integer (atoi)",
    difficulty: "Medium",
    description: "Implement the myAtoi(string s) function, which converts a string to a 32-bit signed integer (similar to C/C++'s atoi function).\n\nThe algorithm for myAtoi(string s) is as follows:\n\n1. Read in and ignore any leading whitespace.\n2. Check if the next character (if not already at the end of the string) is '-' or '+'. Read this character in if it is either. This determines if the final result is negative or positive respectively. Assume the result is positive if neither is present.\n3. Read in next the characters until the next non-digit character or the end of the input is reached. The rest of the string is ignored.\n4. Convert these digits into an integer (i.e. \"123\" -> 123, \"0032\" -> 32). If no digits were read, then the integer is 0. Change the sign as necessary (from step 2).\n5. If the integer is out of the 32-bit signed integer range [-2^31, 2^31 - 1], then clamp the integer so that it remains in the range. Specifically, integers less than -2^31 should be clamped to -2^31, and integers greater than 2^31 - 1 should be clamped to 2^31 - 1.\n6. Return the integer as the final result.",
    examples: [
      {
        input: 's = "42"',
        output: "42"
      },
      {
        input: 's = "   -42"',
        output: "-42"
      },
      {
        input: 's = "4193 with words"',
        output: "4193"
      }
    ],
    constraints: [
      "0 <= s.length <= 200",
      "s consists of English letters (lower-case and upper-case), digits (0-9), ' ', '+', '-', and '.'."
    ],
    topics: ["String"],
    companies: ["Microsoft", "Amazon", "Bloomberg"],
    startingCode: {
      javascript: `/**\n * @param {string} s\n * @return {number}\n */\nvar myAtoi = function(s) {\n    \n};`,
      typescript: `function myAtoi(s: string): number {\n    \n}`,
      python: `class Solution:\n    def myAtoi(self, s: str) -> int:\n        `,
      python3: `class Solution:\n    def myAtoi(self, s: str) -> int:\n        `,
      java: `class Solution {\n    public int myAtoi(String s) {\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    int myAtoi(string s) {\n        \n    }\n};`,
      c: `int myAtoi(char* s) {\n    \n}`,
      csharp: `public class Solution {\n    public int MyAtoi(string s) {\n        \n    }\n}`,
      go: `func myAtoi(s string) int {\n    \n}`,
      rust: `impl Solution {\n    pub fn my_atoi(s: String) -> i32 {\n        \n    }\n}`,
      kotlin: `class Solution {\n    fun myAtoi(s: String): Int {\n        \n    }\n}`,
      swift: `class Solution {\n    func myAtoi(_ s: String) -> Int {\n        \n    }\n}`,
      ruby: `def my_atoi(s)\n    \nend`,
      php: `class Solution {\n    function myAtoi($s) {\n        \n    }\n}`,
      dart: `class Solution {\n  int myAtoi(String s) {\n    \n  }\n}`,
      scala: `object Solution {\n    def myAtoi(s: String): Int = {\n        \n    }\n}`,
    },
    testCases: [
      { input: '"42"', expected: "42" },
      { input: '"   -42"', expected: "-42" },
      { input: '"4193 with words"', expected: "4193" }
    ]
  },
  {
    id: 9,
    title: "Palindrome Number",
    difficulty: "Easy",
    description: "Given an integer x, return true if x is a palindrome, and false otherwise.",
    examples: [
      {
        input: "x = 121",
        output: "true",
        explanation: "121 reads as 121 from left to right and from right to left."
      },
      {
        input: "x = -121",
        output: "false",
        explanation: "From left to right, it reads -121. From right to left, it becomes 121-. Therefore it is not a palindrome."
      },
      {
        input: "x = 10",
        output: "false",
        explanation: "Reads 01 from right to left. Therefore it is not a palindrome."
      }
    ],
    constraints: [
      "-2^31 <= x <= 2^31 - 1"
    ],
    topics: ["Math"],
    companies: ["Amazon", "Adobe", "Apple"],
    startingCode: {
      javascript: `/**\n * @param {number} x\n * @return {boolean}\n */\nvar isPalindrome = function(x) {\n    \n};`,
      typescript: `function isPalindrome(x: number): boolean {\n    \n}`,
      python: `class Solution:\n    def isPalindrome(self, x: int) -> bool:\n        `,
      python3: `class Solution:\n    def isPalindrome(self, x: int) -> bool:\n        `,
      java: `class Solution {\n    public boolean isPalindrome(int x) {\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    bool isPalindrome(int x) {\n        \n    }\n};`,
      c: `bool isPalindrome(int x) {\n    \n}`,
      csharp: `public class Solution {\n    public bool IsPalindrome(int x) {\n        \n    }\n}`,
      go: `func isPalindrome(x int) bool {\n    \n}`,
      rust: `impl Solution {\n    pub fn is_palindrome(x: i32) -> bool {\n        \n    }\n}`,
      kotlin: `class Solution {\n    fun isPalindrome(x: Int): Boolean {\n        \n    }\n}`,
      swift: `class Solution {\n    func isPalindrome(_ x: Int) -> Bool {\n        \n    }\n}`,
      ruby: `def is_palindrome(x)\n    \nend`,
      php: `class Solution {\n    function isPalindrome($x) {\n        \n    }\n}`,
      dart: `class Solution {\n  bool isPalindrome(int x) {\n    \n  }\n}`,
      scala: `object Solution {\n    def isPalindrome(x: Int): Boolean = {\n        \n    }\n}`,
    },
    testCases: [
      { input: "121", expected: "true" },
      { input: "-121", expected: "false" },
      { input: "10", expected: "false" }
    ]
  },
  {
    id: 10,
    title: "Regular Expression Matching",
    difficulty: "Hard",
    description: "Given an input string s and a pattern p, implement regular expression matching with support for '.' and '*' where:\n\n'.' Matches any single character.\n'*' Matches zero or more of the preceding element.\n\nThe matching should cover the entire input string (not partial).",
    examples: [
      {
        input: 's = "aa", p = "a"',
        output: "false",
        explanation: '"a" does not match the entire string "aa".'
      },
      {
        input: 's = "aa", p = "a*"',
        output: "true",
        explanation: '\'*\' means zero or more of the preceding element, \'a\'. Therefore, by repeating \'a\' once, it becomes "aa".'
      },
      {
        input: 's = "ab", p = ".*"',
        output: "true",
        explanation: '".*" means "zero or more (*) of any character (.)".'
      }
    ],
    constraints: [
      "1 <= s.length <= 20",
      "1 <= p.length <= 20",
      "s contains only lowercase English letters.",
      "p contains only lowercase English letters, '.', and '*'.",
      "It is guaranteed for each appearance of the character '*', there will be a previous valid character to match."
    ],
    topics: ["String", "Dynamic Programming", "Recursion"],
    companies: ["Facebook", "Google", "Uber"],
    startingCode: {
      javascript: `/**\n * @param {string} s\n * @param {string} p\n * @return {boolean}\n */\nvar isMatch = function(s, p) {\n    \n};`,
      typescript: `function isMatch(s: string, p: string): boolean {\n    \n}`,
      python: `class Solution:\n    def isMatch(self, s: str, p: str) -> bool:\n        `,
      python3: `class Solution:\n    def isMatch(self, s: str, p: str) -> bool:\n        `,
      java: `class Solution {\n    public boolean isMatch(String s, String p) {\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    bool isMatch(string s, string p) {\n        \n    }\n};`,
      c: `bool isMatch(char* s, char* p) {\n    \n}`,
      csharp: `public class Solution {\n    public bool IsMatch(string s, string p) {\n        \n    }\n}`,
      go: `func isMatch(s string, p string) bool {\n    \n}`,
      rust: `impl Solution {\n    pub fn is_match(s: String, p: String) -> bool {\n        \n    }\n}`,
      kotlin: `class Solution {\n    fun isMatch(s: String, p: String): Boolean {\n        \n    }\n}`,
      swift: `class Solution {\n    func isMatch(_ s: String, _ p: String) -> Bool {\n        \n    }\n}`,
      ruby: `def is_match(s, p)\n    \nend`,
      php: `class Solution {\n    function isMatch($s, $p) {\n        \n    }\n}`,
      dart: `class Solution {\n  bool isMatch(String s, String p) {\n    \n  }\n}`,
      scala: `object Solution {\n    def isMatch(s: String, p: String): Boolean = {\n        \n    }\n}`,
    },
    testCases: [
      { input: '"aa", "a"', expected: "false" },
      { input: '"aa", "a*"', expected: "true" },
      { input: '"ab", ".*"', expected: "true" }
    ]
  }
];

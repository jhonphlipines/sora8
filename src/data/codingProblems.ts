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
  language: string;
  startingCode: string;
  testCases: {
    input: string;
    expected: string;
  }[];
  hints?: string[];
}

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
    language: "javascript",
    startingCode: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    
};`,
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
    language: "javascript",
    startingCode: `/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function(l1, l2) {
    
};`,
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
    language: "javascript",
    startingCode: `/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
    
};`,
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
    language: "javascript",
    startingCode: `/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function(nums1, nums2) {
    
};`,
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
    language: "javascript",
    startingCode: `/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function(s) {
    
};`,
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
    language: "javascript",
    startingCode: `/**
 * @param {string} s
 * @param {number} numRows
 * @return {string}
 */
var convert = function(s, numRows) {
    
};`,
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
    language: "javascript",
    startingCode: `/**
 * @param {number} x
 * @return {number}
 */
var reverse = function(x) {
    
};`,
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
    language: "javascript",
    startingCode: `/**
 * @param {string} s
 * @return {number}
 */
var myAtoi = function(s) {
    
};`,
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
    language: "javascript",
    startingCode: `/**
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function(x) {
    
};`,
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
    language: "javascript",
    startingCode: `/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
var isMatch = function(s, p) {
    
};`,
    testCases: [
      { input: '"aa", "a"', expected: "false" },
      { input: '"aa", "a*"', expected: "true" },
      { input: '"ab", ".*"', expected: "true" }
    ]
  }
];

export interface Flashcard {
  id: string;
  question: string;
  answer: string;
  category: string;
  mastery: number; // 0-5
}

export const defaultCategories = [
  "Web Development",
  "JavaScript",
  "React",
  "CSS",
  "Data Structures",
  "Python",
  "General Knowledge",
];

export const defaultFlashcards: Flashcard[] = [
  { id: "1", question: "What does HTML stand for?", answer: "HyperText Markup Language", category: "Web Development", mastery: 0 },
  { id: "2", question: "What does CSS stand for?", answer: "Cascading Style Sheets", category: "CSS", mastery: 0 },
  { id: "3", question: "What is a closure in JavaScript?", answer: "A closure is a function that has access to its own scope, the outer function's scope, and the global scope.", category: "JavaScript", mastery: 0 },
  { id: "4", question: "What is the Virtual DOM?", answer: "A lightweight copy of the actual DOM that React uses to optimize rendering performance.", category: "React", mastery: 0 },
  { id: "5", question: "What is the box model in CSS?", answer: "The CSS box model describes the rectangular boxes generated for elements: content, padding, border, and margin.", category: "CSS", mastery: 0 },
  { id: "6", question: "What is useState in React?", answer: "A Hook that lets you add state to functional components. Returns a stateful value and a function to update it.", category: "React", mastery: 0 },
  { id: "7", question: "What is a Promise in JavaScript?", answer: "An object representing the eventual completion or failure of an asynchronous operation.", category: "JavaScript", mastery: 0 },
  { id: "8", question: "What is flexbox?", answer: "A CSS layout model that allows responsive elements within a container to be automatically arranged depending on screen size.", category: "CSS", mastery: 0 },
  { id: "9", question: "What is HTTP?", answer: "HyperText Transfer Protocol – the foundation of data communication on the World Wide Web.", category: "Web Development", mastery: 0 },
  { id: "10", question: "What is a linked list?", answer: "A linear data structure where each element is a separate object (node) containing data and a reference to the next node.", category: "Data Structures", mastery: 0 },
  { id: "11", question: "What is useEffect?", answer: "A React Hook that lets you synchronize a component with an external system (side effects).", category: "React", mastery: 0 },
  { id: "12", question: "What is event delegation?", answer: "A technique of handling events on a parent element rather than individual child elements, leveraging event bubbling.", category: "JavaScript", mastery: 0 },
  { id: "13", question: "What is REST API?", answer: "Representational State Transfer – an architectural style for designing networked applications using HTTP methods.", category: "Web Development", mastery: 0 },
  { id: "14", question: "What is a stack?", answer: "A linear data structure that follows LIFO (Last In, First Out) principle.", category: "Data Structures", mastery: 0 },
  { id: "15", question: "What is a queue?", answer: "A linear data structure that follows FIFO (First In, First Out) principle.", category: "Data Structures", mastery: 0 },
  { id: "16", question: "What is Python's GIL?", answer: "Global Interpreter Lock – a mutex that protects access to Python objects, preventing multiple threads from executing Python bytecode at once.", category: "Python", mastery: 0 },
  { id: "17", question: "What is CSS Grid?", answer: "A two-dimensional CSS layout system for creating complex responsive web design layouts.", category: "CSS", mastery: 0 },
  { id: "18", question: "What is JSX?", answer: "A syntax extension for JavaScript that lets you write HTML-like markup inside a JavaScript file.", category: "React", mastery: 0 },
  { id: "19", question: "What is hoisting in JavaScript?", answer: "JavaScript's behavior of moving declarations to the top of the current scope during compilation.", category: "JavaScript", mastery: 0 },
  { id: "20", question: "What is a binary tree?", answer: "A tree data structure where each node has at most two children, referred to as left and right child.", category: "Data Structures", mastery: 0 },
  { id: "21", question: "What is DNS?", answer: "Domain Name System – translates domain names to IP addresses.", category: "Web Development", mastery: 0 },
  { id: "22", question: "What is a decorator in Python?", answer: "A function that takes another function as argument and extends its behavior without modifying it.", category: "Python", mastery: 0 },
  { id: "23", question: "What are React keys?", answer: "Special string attributes that help React identify which items in a list have changed, been added, or removed.", category: "React", mastery: 0 },
  { id: "24", question: "What is the 'this' keyword in JavaScript?", answer: "A keyword that refers to the object it belongs to, with its value determined by how a function is called.", category: "JavaScript", mastery: 0 },
  { id: "25", question: "What is specificity in CSS?", answer: "The algorithm browsers use to determine which CSS property values are most relevant to an element.", category: "CSS", mastery: 0 },
  { id: "26", question: "What is a hash table?", answer: "A data structure that maps keys to values using a hash function for fast lookups.", category: "Data Structures", mastery: 0 },
  { id: "27", question: "What is CORS?", answer: "Cross-Origin Resource Sharing – a security feature that restricts HTTP requests from other domains.", category: "Web Development", mastery: 0 },
  { id: "28", question: "What is a list comprehension in Python?", answer: "A concise way to create lists using a single line: [expression for item in iterable if condition].", category: "Python", mastery: 0 },
  { id: "29", question: "What is useContext?", answer: "A React Hook that lets you read and subscribe to context from your component.", category: "React", mastery: 0 },
  { id: "30", question: "What is async/await?", answer: "Syntactic sugar for working with Promises, making asynchronous code look synchronous.", category: "JavaScript", mastery: 0 },
  { id: "31", question: "What is a media query?", answer: "A CSS technique to apply styles based on device characteristics like screen width.", category: "CSS", mastery: 0 },
  { id: "32", question: "What is WebSocket?", answer: "A protocol providing full-duplex communication channels over a single TCP connection.", category: "Web Development", mastery: 0 },
  { id: "33", question: "What is a graph data structure?", answer: "A non-linear structure consisting of vertices (nodes) and edges connecting them.", category: "Data Structures", mastery: 0 },
  { id: "34", question: "What are Python generators?", answer: "Functions that return an iterator using yield, generating values lazily one at a time.", category: "Python", mastery: 0 },
  { id: "35", question: "What is React Router?", answer: "A standard library for routing in React, enabling navigation between views.", category: "React", mastery: 0 },
  { id: "36", question: "What is the event loop?", answer: "A mechanism that handles asynchronous callbacks in JavaScript's single-threaded environment.", category: "JavaScript", mastery: 0 },
  { id: "37", question: "What is z-index?", answer: "A CSS property that specifies the stack order of positioned elements.", category: "CSS", mastery: 0 },
  { id: "38", question: "What is TCP vs UDP?", answer: "TCP is connection-oriented and reliable; UDP is connectionless and faster but unreliable.", category: "Web Development", mastery: 0 },
  { id: "39", question: "What is Big O notation?", answer: "A mathematical notation describing the upper bound of an algorithm's time or space complexity.", category: "Data Structures", mastery: 0 },
  { id: "40", question: "What is pip in Python?", answer: "The package installer for Python, used to install and manage software packages.", category: "Python", mastery: 0 },
];

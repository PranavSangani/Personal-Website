// Shared text and links used by both the XP desktop and the plain view, so the
// two never drift apart. Edit here to update both.
import resume_pdf from './assets/Pranav_Sangani_Resume.pdf';

export const PROFILE = {
    name: 'Pranav Sangani',
    tagline: 'Computer Science @ Purdue · Class of 2028',
    seeking: 'Looking for Summer 2027 software engineering and AI internships',
};

export const EMAIL = 'pranavsai.sangani@gmail.com';

export const LINKS = {
    resume: resume_pdf,
    github: 'https://github.com/PranavSangani',
    linkedin: 'https://www.linkedin.com/in/pranavsangani/',
    email: `mailto:${EMAIL}`,
    sortingVisualizer: 'https://pranavsangani.github.io/SortingAlgorithmVisualizer/',
};

// Hash route for the plain (non-XP) one-page view.
export const PLAIN_VIEW_HASH = '#plain';

export const ABOUT = [
    "Hi, I'm Pranav! I'm a junior at Purdue University studying Computer Science and pursuing a Certificate in Entrepreneurship and Innovation.",
    "I'm currently interning at Axcellion, and I spent this past summer interning at Aavalar Consulting.",
    'I love building things, learning something new every day, and meeting new people. Thanks for stopping by, and feel free to look around!',
];

// Coursework window / plain-view section, in the order I want recruiters to
// see them. Optional fields: `built` (a project from the course) and
// `inProgress`. Entrepreneurship courses are grouped as one entry.
export const COURSEWORK = [
    {
        name: 'Data Structures and Algorithms',
        code: 'CS 25100',
        inProgress: true,
        summary: 'Designing efficient programs: picking the right data structure for the job and proving how fast it runs.',
        topics: 'Big-O analysis, hash tables, trees and heaps, graph algorithms (BFS/DFS, shortest paths, minimum spanning trees), sorting and searching',
    },
    {
        name: 'Computer Architecture',
        code: 'CS 25000',
        inProgress: true,
        summary: 'How software actually runs on hardware, from logic gates up to a working processor.',
        topics: 'Digital logic, assembly language, how the CPU executes instructions, caches and the memory hierarchy',
    },
    {
        name: 'Python Programming',
        code: 'CS 38003',
        summary: 'Writing clean, practical Python for scripting and working with data.',
        topics: 'Core Python and its data structures, file handling and data processing, modules and libraries',
    },
    {
        name: 'Programming in C',
        code: 'CS 24000',
        summary: 'Low-level systems programming with direct control over memory.',
        topics: 'Pointers and manual memory management, linked data structures, file I/O, debugging and memory-leak checking, Makefiles',
    },
    {
        name: 'Problem Solving and Object-Oriented Programming',
        code: 'CS 18000',
        summary: 'Structuring larger programs as clean, reusable objects in Java.',
        built: 'A chat application in Java (team project)',
        topics: 'Inheritance, polymorphism and interfaces, exception handling, and an introduction to multithreading, client-server networking, and GUIs',
    },
    {
        name: 'Foundations of Computer Science',
        code: 'CS 18200',
        summary: 'The math behind computer science: writing proofs and reasoning precisely about programs.',
        topics: 'Logic and proofs, induction and recursion, sets, relations and functions, counting, graph theory',
    },
    {
        name: 'Tools (Unix, Git)',
        code: 'CS 19300',
        summary: 'The everyday toolkit of working engineers.',
        topics: 'Unix command line and shell scripting, Git branching, merging and collaboration, build tools',
    },
];

export const ENTREPRENEURSHIP = {
    name: 'Certificate in Entrepreneurship and Innovation',
    code: 'ENTR',
    inProgress: true,
    courses: 'Introduction to Entrepreneurship and Innovation (ENTR 20000) · Marketing and Management for New Ventures (ENTR 31000) · Internship and Career Preparation Seminar (ENTR 46000)',
    summary: 'Taking an idea from problem to product: finding real customer needs, testing ideas quickly, and building a business around them.',
    topics: 'Customer discovery and idea validation, business models, marketing and go-to-market, managing early-stage ventures, professional development',
};

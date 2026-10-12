// Shared text and links used by both the XP desktop and the plain view, so the
// two never drift apart. Edit here to update both.
import resume_pdf from './assets/Pranav_Sangani_Resume.pdf';

export const PROFILE = {
    name: 'Pranav Sangani',
    tagline: 'Computer Science @ Purdue · Class of 2028',
    seeking: 'Looking for Summer 2027 software engineering and AI internships',
};

export const LINKS = {
    resume: resume_pdf,
    github: 'https://github.com/PranavSangani',
    linkedin: 'https://www.linkedin.com/in/pranavsangani/',
    email: 'mailto:pranavsai.sangani@gmail.com',
    sortingVisualizer: 'https://pranavsangani.github.io/SortingAlgorithmVisualizer/',
};

// Hash route for the plain (non-XP) one-page view.
export const PLAIN_VIEW_HASH = '#plain';

export const ABOUT = [
    "Hi, I’m Pranav! I'm a junior at Purdue University studying Computer Science, with a Certificate in Entrepreneurship and Innovation.",
    "I'm currently interning at Axcellion, and I spent this past summer interning at Aavalar Consulting.",
    'I love building things, learning something new every day, and meeting new people. Thanks for stopping by, and feel free to look around!',
];

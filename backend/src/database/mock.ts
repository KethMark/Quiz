interface TextQuestion {
  id: number;
  type: 'text';
  question: string;
  correctText: string;
}

interface RadioQuestion {
  id: number;
  type: 'radio';
  question: string;
  choices: string[];
  correctIndex: number;
}

interface CheckboxQuestion {
  id: number;
  type: 'checkbox';
  question: string;
  choices: string[];
  correctIndexes: number[];
}

export type Question = TextQuestion | RadioQuestion | CheckboxQuestion;

const mockQuestions: Question[] = [
  {
    id: 1,
    type: 'text',
    question: 'What is the capital of France?',
    correctText: 'Paris',
  },
  {
    id: 2,
    type: 'radio',
    question: 'Which planet is known as the Red Planet?',
    choices: ['Venus', 'Mars', 'Jupiter', 'Saturn'],
    correctIndex: 1,
  },
  {
    id: 3,
    type: 'checkbox',
    question: 'Which of these are programming languages?',
    choices: ['Python', 'HTML', 'Java', 'CSS'],
    correctIndexes: [0, 2],
  },
  {
    id: 4,
    type: 'radio',
    question: 'What is 2 + 2?',
    choices: ['3', '4', '5', '6'],
    correctIndex: 1,
  },
  {
    id: 5,
    type: 'text',
    question: 'What is the largest mammal?',
    correctText: 'Blue Whale',
  },
  {
    id: 6,
    type: 'checkbox',
    question: 'Which of these are continents?',
    choices: ['Australia', 'Florida', 'Antarctica', 'Greenland'],
    correctIndexes: [0, 2],
  },
  {
    id: 7,
    type: 'radio',
    question: 'What gas do plants absorb from the atmosphere?',
    choices: ['Oxygen', 'Nitrogen', 'Carbon Dioxide', 'Helium'],
    correctIndex: 2,
  },
  {
    id: 8,
    type: 'text',
    question: 'Who wrote "Pride and Prejudice"?',
    correctText: 'Jane Austen',
  },
  {
    id: 9,
    type: 'radio',
    question: 'What is the chemical symbol for water?',
    choices: ['H2O', 'CO2', 'O2', 'N2'],
    correctIndex: 0,
  },
  {
    id: 10,
    type: 'checkbox',
    question: 'Which of these are prime numbers?',
    choices: ['4', '7', '9', '11'],
    correctIndexes: [1, 3],
  },
  {
    id: 11,
    type: 'text',
    question: 'What is the longest river in the world?',
    correctText: 'Nile',
  },
  {
    id: 12,
    type: 'radio',
    question: 'Which country hosted the 2020 Summer Olympics?',
    choices: ['Brazil', 'Japan', 'China', 'France'],
    correctIndex: 1,
  },
];

export default mockQuestions;
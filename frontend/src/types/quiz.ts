export interface Question {
  id: number;
  type: "text" | "radio" | "checkbox";
  question: string;
  choices?: string[];
  correctText?: string;
  correctIndex?: number;
  correctIndexes?: number[];
}

export interface AnswerPayload {
  id: number;
  value: string | number | number[];
}

export interface GradeResponse {
  score: number;
  total: number;
  results: { id: number; correct: boolean }[];
}
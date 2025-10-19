import type { Context } from "hono";
import type { Question } from "../database/mock.ts";
import mockQuestions from "../database/mock.ts";

function validateAnswer(answer: { id: string | number; value: string | number | number[] }, question: Question): boolean {
  if (!answer.id || !('value' in answer)) {
    return false;
  }
  if (answer.id !== question.id) {
    return false;
  }
  switch (question.type) {
    case 'text':
      return typeof answer.value === 'string';
    case 'radio':
      return Number.isInteger(answer.value) && (answer.value as number) >= 0 && (answer.value as number) < question.choices.length;
    case 'checkbox':
      return (
        Array.isArray(answer.value) &&
        (answer.value as number[]).every(idx => Number.isInteger(idx) && idx >= 0 && idx < question.choices.length)
      );
    default:
      return false;
  }
}

function gradeAnswer(answer: { id: string | number; value: string | number | number[] }, question: Question): boolean {
  switch (question.type) {
    case 'text':
      return (answer.value as string).toLowerCase().trim() === question.correctText.toLowerCase().trim();
    case 'radio':
      return answer.value === question.correctIndex;
    case 'checkbox':
      const userIndexes = (answer.value as number[]).sort();
      const correctIndexes = question.correctIndexes.sort();
      return userIndexes.length === correctIndexes.length && userIndexes.every((val, idx) => val === correctIndexes[idx]);
    default:
      return false;
  }
}

export async function gradeQuizAnswers(c: Context) {
  try {
    if (!mockQuestions || mockQuestions.length === 0) {
      return c.json({ error: 'No questions available' }, 500);
    }

    const body = await c.req.json();
    if (!body || !Array.isArray(body.answers) || body.answers.length === 0) {
      return c.json({ error: 'Invalid payload: answers array required' }, 400);
    }

    const answers: { id: string | number; value: string | number | number[] }[] = body.answers;
    const results: { id: string | number; correct: boolean }[] = [];
    let score = 0;

    for (const answer of answers) {
      const question = mockQuestions.find(q => q.id === answer.id);
      if (!question) {
        return c.json({ error: `Invalid question ID: ${answer.id}` }, 400);
      }

      if (!validateAnswer(answer, question)) {
        return c.json({ error: `Invalid answer format for question ID: ${answer.id}` }, 400);
      }

      const isCorrect = gradeAnswer(answer, question);
      results.push({ id: answer.id, correct: isCorrect });
      if (isCorrect) score++;
    }

    return c.json(
      {
        score,
        total: answers.length,
        results,
      },
      200
    );
  } catch (error) {
    console.error('Unexpected error:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
}
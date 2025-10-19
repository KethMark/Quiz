import type { Context } from 'hono';
import mockQuestions from '../database/mock.ts';

export async function getAllQuizQuestion(c: Context) {
  try {
    if(!mockQuestions || mockQuestions.length === 0) {
      return c.json({ error: 'No questions available' }, 500);
    }
    return c.json(mockQuestions, 200);
  } catch (error) {
    console.error('Unexpected error:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
}
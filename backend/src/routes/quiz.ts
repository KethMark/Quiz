import { Hono } from 'hono'
import { getAllQuizQuestion } from '../controllers/quiz.ts';

const quiz = new Hono()

quiz.get('/', getAllQuizQuestion);

export default quiz

import { Hono } from 'hono'
import { gradeQuizAnswers } from '../controllers/grade.ts';

const grade = new Hono()

grade.post('/', gradeQuizAnswers);

export default grade
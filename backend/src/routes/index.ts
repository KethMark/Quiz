import { Hono } from 'hono'
import grade from './grade.ts'
import quiz from './quiz.ts'

const routes = new Hono()

routes.route('/quiz', quiz)
routes.route('/grade', grade)

export default routes
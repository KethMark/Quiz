import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import routes from './routes/index.ts'
import { cors } from 'hono/cors'

const app = new Hono()

app.use('/api/*', cors())

app.route('/api', routes)

serve({
  fetch: app.fetch,
  port: 5151
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})

Installation 🎯

  Clone the repo through https://github.com/KethMark/Quiz.git

  Run this command after cloning using cd Quiz

  And open VsCode using this command code .

  Open 2 terminal and navigate each one using this command cd frontend and cd backend

  And run both npm install 

  After that you can run both using npm run dev for frontend and backend 

  You're successfull completed the installation 🎉

Architecture Notes 🏗️

   Backend
   Framework: Hono.js  
   Runtime: Node.js  
      The backend uses Hono.js running on the Node.js runtime.  
    Node was chosen for full compatibility with TypeScript, npm libraries, and server-side operations such as API handling and database communication.  
    Although Hono can run on Edge environments (Cloudflare Workers, Vercel Edge), Node provides a more flexible and stable backend base for this project.

   Frontend
   Framework: Next.js 15 (App Router)  
      The frontend uses the App Router to implement server components and nested layouts.  
    This modern architecture improves data fetching, reduces client bundle size, and ensures better performance compared to the older Pages Router.

Validation Approach ✅

  Backend
      The backend uses simple conditional checks to validate incoming data before processing requests.
    When invalid or missing fields are detected, the server responds with a JSON error message.
    This lightweight approach avoids unnecessary dependencies while keeping validation easy to maintain.

  Frontend
      On the frontend, form validation is handled using React Hook Form combined with Zod.
    This allows for schema-based validation and instant feedback to users before data is sent to the backend.

Libraries Used and Rationale 📚

  Backend 
    Hono 
      - Chosen for its fast performance, minimal boilerplate, and Edge compatibility. It’s ideal for small REST APIs and works well with modern deployment platforms like Cloudflare Workers or Vercel Edge Functions.

  Frontend
    Nextjs
      - Provides server-side rendering (SSR) and API routes, making it easy to build a fast, SEO-friendly web app with integrated backend logic.
    React Hook Form
      - Lightweight and performant form library that minimizes re-renders and works perfectly with schema validation tools like Zod.
    Zod
      - Ensures type-safe form validation with clear, developer-friendly error messages.
    Axios
      - Simpler syntax for API calls than fetch(), supports interceptors and better error handling.
    Shadcn UI
      - Allows for fast, responsive UI development with minimal custom CSS.
    TanStack Query
      - Simplifies async state management and automatically handles re-fetching and caching.

Trade-offs and Shortcuts Taken ⚖️

  Used mock data for backend instead of a real database.
  
  Minimal validation logic (simple condition checks).
  
  Client-side validation only with React Hook Form + Zod.
  
  Used ShadCN UI for quick, consistent styling.
  
  Relied on TanStack Query for API state — no global store.
  
  Limited loading/error states for simplicity.
  
  Focused on core quiz functionality rather than production features.️


Honest Time Spent ⏱️

  The Backend Time Completed around 12hours
  The Frontend Time Completed around 20hours
    

     

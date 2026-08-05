# Pixell River Financial — Fullstack Labs

## Lab 5.2 — TanStack Query Integration

### 1. What change was made
The application previously used React's `useEffect` hook combined with raw `fetch` calls to load and update data from the backend. 
This approach required manually managing loading states, error handling, and data synchronization after mutations. TanStack Query also known as React Query was integrated
 to replace this pattern. The `useQuery` hook now handles all GET requests for departments and organization members, while `useMutation` handles POST requests for creating 
 new employees and roles.

### 2. What tools were used
TanStack Query v4 (`@tanstack/react-query`) was installed in the frontend application. A QueryClient was created and provided to the entire app through
 QueryClientProvider in main.tsx. The useQuery hook was used in both Main.tsx and Organization.tsx to fetch data, and the useMutation hook was used to handle form submissions.
  The useQueryClient hook was used to invalidate cached queries after a successful mutation, which triggers an automatic refetch.

### 3. How this affects the user experience
Users now see a "Loading..." message while data is being fetched instead of an empty page. After adding a new employee or role, the list updates automatically 
without requiring a manual page refresh, because TanStack Query invalidates the cache and refetches the data in the background. If the user navigates away and comes 
back, the cached data is shown immediately while a background refetch happens silently, making the app feel faster and more responsive.

### 4. How this affects understanding of the app
Integrating TanStack Query changed how the app is conceptualized at a fundamental level. Previously, data fetching was treated as a side effect managed inside components.
 Now it is treated as server state — data that lives on the server and needs to be synchronized with the client. This distinction is important in production applications 
 because server state can change at any time. TanStack Query provides a structured way to manage this synchronization, making the codebase easier to maintain and reason about 
 as the application grows.
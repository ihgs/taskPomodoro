import './App.css'
import { createHashRouter, RouterProvider } from 'react-router-dom'
import TaskList, { listTaskLoader } from './pages/TaskList'
import { StyledEngineProvider } from '@mui/material'
import Timer, { taskLoader } from './pages/Timer'

function App() {
  const router = createHashRouter([
    {
      path: '/',
      element: <TaskList />,
      loader: listTaskLoader
    },
    {
      path: '/timer/:id',
      element: <Timer />,
      loader: taskLoader
    }
  ])

  return (
    <StyledEngineProvider injectFirst>
      <RouterProvider router={router} />
    </StyledEngineProvider>
  )
}

export default App

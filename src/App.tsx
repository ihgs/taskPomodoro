import './App.css'
import { createHashRouter, RouterProvider } from 'react-router-dom'
import TaskList, { listTaskLoader } from './pages/TaskList'
import { StyledEngineProvider } from '@mui/material'
import Timer from './pages/Timer'

export const APP_VERSION = "1.0.0"

function App() {
  const router = createHashRouter([
    {
      path: '/',
      element: <TaskList />,
      loader: listTaskLoader
    },
    {
      path: '/timer/',
      element: <Timer />
    }
  ])

  return (
    <StyledEngineProvider injectFirst>
      <RouterProvider router={router} />
    </StyledEngineProvider>
  )
}

export default App

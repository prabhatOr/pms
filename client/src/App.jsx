import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import LoginPage from './pages/LoginPage'
import { Toaster } from 'sonner'
import ProtectedRoute from './components/ProtectedRoute'
import DashboardPage from './pages/DashboardPage'
import UsersPage from './pages/UsersPage'
import ProfilePage from './pages/ProfilePage'
import ProjectListPage from './pages/ProjectListPage'
import TaskListPage from './pages/TaskListPage'

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path='/' element={<LoginPage />} />

          {/* Protected routes */}
          <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
          <Route path='/users' element={<ProtectedRoute><UsersPage /></ProtectedRoute>} />
          <Route path='/profile' element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
          <Route path='/projects' element={<ProtectedRoute><ProjectListPage /></ProtectedRoute>} />

          <Route path='/tasks' element={<ProtectedRoute><TaskListPage /></ProtectedRoute>} />
        </Routes>

      </BrowserRouter>

      <Toaster />
    </>
  )
}
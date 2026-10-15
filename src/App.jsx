import { Navigate, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './routes/ProtectedRoute'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import PropertyListPage from './pages/PropertyListPage'

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route
          path="/properties"
          element={
            <ProtectedRoute>
              <PropertyListPage />
            </ProtectedRoute>
          }
        />
        {/* 未定義のパスは物件一覧へ、未ログインならログイン画面へリダイレクトされる */}
        <Route path="*" element={<Navigate to="/properties" replace />} />
      </Routes>
    </AuthProvider>
  )
}

export default App

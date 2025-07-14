import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import LandingPage from './components/landing-page/LandingPage';
import SignupScreen from './components/auth/SignupScreen';
import ForgotPasswordScreen from './components/auth/ForgotPasswordScreen';
import Dashboard from './components/Dashboard';
import BrainDumpDetails from './components/BrainDumpDetails';
import EditBrainDump from './components/EditBrainDump';
import WeeklyReview from './components/WeeklyReview';
import ProfileSettings from './components/ProfileSettings';
import Header from './components/landing-page/Header';
import LoginScreen from './components/auth/LoginScreen';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignupScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/forgot-password" element={<ForgotPasswordScreen />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/weekly-review" element={<ProtectedRoute><WeeklyReview /></ProtectedRoute>} />
          <Route path="/brain-dump/:id" element={<ProtectedRoute><BrainDumpDetails /></ProtectedRoute>} />
          <Route path="/brain-dump/:id/edit" element={<ProtectedRoute><EditBrainDump /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><ProfileSettings /></ProtectedRoute>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
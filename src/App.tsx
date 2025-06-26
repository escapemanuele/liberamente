import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/landing-page/LandingPage';
import SignupScreen from './components/auth/SignupScreen';
import ForgotPasswordScreen from './components/auth/ForgotPasswordScreen';
import Dashboard from './components/Dashboard';
import BrainDumpDetails from './components/BrainDumpDetails';
import EditBrainDump from './components/EditBrainDump';
import WeeklyReview from './components/WeeklyReview';
import ProfileSettings from './components/ProfileSettings';
import Header from './components/landing-page/Header';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignupScreen />} />
        <Route path="/forgot-password" element={<ForgotPasswordScreen />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/weekly-review" element={<WeeklyReview />} />
        <Route path="/brain-dump/:id" element={<BrainDumpDetails />} />
        <Route path="/brain-dump/:id/edit" element={<EditBrainDump />} />
        <Route path="/profile" element={<ProfileSettings />} />
      </Routes>
    </Router>
  );
}

export default App;
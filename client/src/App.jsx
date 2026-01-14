import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Portfolio from './pages/Portfolio';
import SuccessStories from './pages/SuccessStories';
import Mentors from './pages/Mentors';
import JoinMentor from './pages/JoinMentor';
import ProgramDetails from './pages/ProgramDetails';
import Blog from './pages/Blog';
import Impact from './pages/Impact';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Apply from './pages/Apply';
import FounderDashboard from './pages/dashboard/FounderDashboard';
import AdminDashboard from './pages/dashboard/AdminDashboard';
import StartupProfile from './pages/dashboard/StartupProfile';
import ApplicationsList from './pages/dashboard/ApplicationsList';
import ProtectedRoute from './components/layout/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/portfolio/success-stories" element={<SuccessStories />} />
        <Route path="/mentors" element={<Mentors />} />
        <Route path="/mentors/join" element={<JoinMentor />} />
        <Route path="/programs/:id" element={<ProgramDetails />} />
        <Route path="/resources/blog" element={<Blog />} />
        <Route path="/resources/impact" element={<Impact />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/apply" element={<Apply />} />

        {/* Dashboard Routes */}
        <Route element={<ProtectedRoute allowedRoles={['founder']} />}>
          <Route path="/dashboard/founder" element={<FounderDashboard />} />
          <Route path="/dashboard/founder/startup" element={<StartupProfile />} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
          <Route path="/dashboard/admin" element={<AdminDashboard />} />
          <Route path="/dashboard/admin/applications" element={<ApplicationsList />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

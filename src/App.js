import { BrowserRouter as Router, Routes, Route, Outlet} from 'react-router-dom';
// webpage layout 
import Header from "./components/layout/header";
import Footer from './components/layout/footer';
//pages
import HomePage from './pages/home'; 
import LoginPage from './pages/auth/login';
import RegisterPage from './pages/auth/signup';
import AboutPage from './pages/about';
import CreatorPage from './pages/creator';
import EducationPage from './pages/education';
import PosterPage from './pages/poster';
import WebsitePage from './pages/website';
import './App.css';
import RequireAuth from './components/route/RequireAuth';
// admin layout 
import AdminHeader from './components/layout/admin/header';
// page 
import Dashboard from './pages/admin/dashboard';
function MainLayout() {
  return (
    <>
      <Header />
      <Outlet /> 
      <Footer />
    </>
  );
}

function AdminLayout() {
  return (
    <div className="admin-shell">
      <AdminHeader />
      <main className="admin-page">
        <Outlet />
      </main>
    </div>
  );
}

function RoutePage() {
  return (
    <Routes>
      {/* webpage */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path='/about' element={<AboutPage />} />
        <Route path='/creator' element={<CreatorPage />} />
        <Route path='/education' element={<EducationPage />} />
        <Route path='/poster' element={<PosterPage />} />
        <Route path='/website' element={<WebsitePage />} />
      </Route>
      {/* register */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      {/* admin */}
      <Route element={<RequireAuth><AdminLayout /></RequireAuth>}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>

    </Routes>
  );
}

function App() {
  return (
    <Router>
      <RoutePage />
    </Router>
  );
}

export default App;

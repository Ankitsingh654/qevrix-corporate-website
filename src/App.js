import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// ?? General Components
import LandingPage from "./pages/LandingPage";
import ProductsPage from "./pages/ProductsPage";
import PrepIQPage from "./pages/PrepIQPage";
import EngineeringProgramPage from "./pages/EngineeringProgramPage";
import SignupPage from "./components/SignupPage";
import LoginPage from "./components/LoginPage";
import ForgotPassword from "./components/Dashboard/ForgotPassword";
import SplashScreen from "./components/landing/SplashScreen";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsConditions from "./pages/TermsConditions";
import Disclaimer from "./pages/Disclaimer";
import ITSoftwareService from "./pages/ITSoftwareService";
import WorkforceService from "./pages/WorkforceService";
import CivilConstructionService from "./pages/CivilConstructionService";


// 🎓 Student Onboarding
import StudentOnboardingPage from "./features/onboarding/pages/StudentOnboardingPage";

// 👔 Company Info
import FoundersPage from "./pages/FoundersPage";

// ?? Internship Dashboard + Modules
import InternshipDashboard from "./components/Dashboard/InternshipDashboard";
import Profile from "./components/Dashboard/Profile";
import Progress from "./components/Dashboard/Progress";
import Tasks from "./components/Dashboard/Tasks";
import Resources from "./components/Dashboard/Resources";
import Certificates from "./components/Dashboard/Certificates";
import Notifications from "./components/Dashboard/Notifications";
import DashboardHome from "./components/Dashboard/DashboardHome";
import Settings from "./components/Dashboard/Settings";

// 🧑‍💼 Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import Overview from "./pages/admin/Overview";
import Users from "./pages/admin/Users";
import Projects from "./pages/admin/Projects";
import Payments from "./pages/admin/Payments";
import Analytics from "./pages/admin/Analytics";
import AdminNotificationSettings from "./pages/admin/AdminNotificationSettings";
import AdminLogin from "./pages/admin/AdminLogin";
import AssignTask from "./pages/admin/AssignTask";

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <>
      {showSplash ? (
        <SplashScreen onComplete={() => setShowSplash(false)} />
      ) : (
        <Router>
          <div className="flex flex-col min-h-screen">
            <Routes>
              {/* 🏠 Home Page */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-and-conditions" element={<TermsConditions />} />
              <Route path="/disclaimer" element={<Disclaimer />} />
              <Route path="/services/it-software" element={<ITSoftwareService />} />
              <Route path="/services/workforce" element={<WorkforceService />} />
              <Route path="/services/civil-construction" element={<CivilConstructionService />} />
              
              {/* 🛍️ Product Pages */}
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/products/prepiq" element={<PrepIQPage />} />
              <Route path="/engineering" element={<EngineeringProgramPage />} />
              <Route path="/products/workforce" element={<div className="pt-32 text-center min-h-screen text-white">WorkforceOS - Coming Soon</div>} />
              <Route path="/products/freelanz" element={<div className="pt-32 text-center min-h-screen text-white">Freelanz - Coming Soon</div>} />

              {/* 🏢 Company Pages */}
              <Route path="/founders" element={<FoundersPage />} />

              {/* 🔑 Auth Pages */}
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />

              {/* 🎓 Student Modules */}
              <Route path="/student/onboarding" element={<StudentOnboardingPage />} />

              {/* ?? Internship Dashboard */}
              <Route path="/internship-dashboard" element={<InternshipDashboard />}>
                <Route index element={<DashboardHome />} />
                <Route path="home" element={<DashboardHome />} />
                <Route path="profile" element={<Profile />} />
                <Route path="progress" element={<Progress />} />
                <Route path="tasks" element={<Tasks />} />
                <Route path="resources" element={<Resources />} />
                <Route path="certificates" element={<Certificates />} />
                <Route path="notifications" element={<Notifications />} />
                <Route path="settings" element={<Settings />} />
              </Route>

              {/* ????? Admin Dashboard */}
              <Route path="/admin" element={<AdminDashboard />}>
                <Route index element={<Overview />} />
                <Route path="overview" element={<Overview />} />
                <Route path="users" element={<Users />} />
                <Route path="projects" element={<Projects />} />
                <Route path="payments" element={<Payments />} />
                <Route path="analytics" element={<Analytics />} />
                <Route path="assign-task" element={<AssignTask />} />
                <Route path="settings" element={<AdminNotificationSettings />} />
              </Route>
              
              {/* Admin Login */}
              <Route path="/admin-login" element={<AdminLogin />} />
            </Routes>
          </div>
        </Router>
      )}
    </>
  );
}

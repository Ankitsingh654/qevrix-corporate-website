import React from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import PageTransition from './PageTransition';

// 🏠 General Components
import LandingPage from "../../pages/LandingPage";
import ProductsPage from "../../pages/ProductsPage";
import PrepIQPage from "../../pages/PrepIQPage";
import EngineeringProgramPage from "../../pages/EngineeringProgramPage";
import SignupPage from "../SignupPage";
import LoginPage from "../LoginPage";
import ForgotPassword from "../Dashboard/ForgotPassword";
import PrivacyPolicy from "../../pages/PrivacyPolicy";
import TermsConditions from "../../pages/TermsConditions";
import Disclaimer from "../../pages/Disclaimer";
import ITSoftwareService from "../../pages/ITSoftwareService";
import WorkforceService from "../../pages/WorkforceService";
import CivilConstructionService from "../../pages/CivilConstructionService";
import BrandingDesignService from "../../pages/BrandingDesignService";
import PricingPage from "../../pages/PricingPage";
import ServicePortfolioPage from "../../pages/ServicePortfolioPage";
import CrmPage from "../../pages/CrmPage";
import FollowUpsPage from "../../pages/FollowUpsPage";
import QuotationsPage from "../../pages/QuotationsPage";
import CrmLogin from "../../pages/CrmLogin";
import CrmSettingsPage from "../../pages/CrmSettingsPage";

// 🛡️ Protected Route
import CrmProtectedRoute from "../crm/CrmProtectedRoute";

// 🎓 Student Onboarding
import StudentOnboardingPage from "../../features/onboarding/pages/StudentOnboardingPage";

// 👔 Company Info
import FoundersPage from "../../pages/FoundersPage";
import OurTeamPage from "../../pages/OurTeamPage";
import CareersPage from "../../pages/CareersPage";
import CareerApplicationPage from "../../pages/CareerApplicationPage";

// 🏢 Internship Dashboard
import InternshipDashboard from "../Dashboard/InternshipDashboard";
import Profile from "../Dashboard/Profile";
import Progress from "../Dashboard/Progress";
import Tasks from "../Dashboard/Tasks";
import Resources from "../Dashboard/Resources";
import Certificates from "../Dashboard/Certificates";
import Notifications from "../Dashboard/Notifications";
import DashboardHome from "../Dashboard/DashboardHome";
import Settings from "../Dashboard/Settings";

// 🧑‍💼 Admin Pages
import AdminDashboard from "../../pages/admin/AdminDashboard";
import Overview from "../../pages/admin/Overview";
import Users from "../../pages/admin/Users";
import Projects from "../../pages/admin/Projects";
import Payments from "../../pages/admin/Payments";
import Analytics from "../../pages/admin/Analytics";
import AdminNotificationSettings from "../../pages/admin/AdminNotificationSettings";
import AdminLogin from "../../pages/admin/AdminLogin";
import AssignTask from "../../pages/admin/AssignTask";

// A wrapper to apply PageTransition to each element easily
const withTransition = (Component) => (
  <PageTransition>
    {Component}
  </PageTransition>
);

export default function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* 🏠 Home Page */}
        <Route path="/" element={withTransition(<LandingPage />)} />
        <Route path="/pricing" element={withTransition(<PricingPage />)} />
        <Route path="/privacy-policy" element={withTransition(<PrivacyPolicy />)} />
        <Route path="/terms-and-conditions" element={withTransition(<TermsConditions />)} />
        <Route path="/disclaimer" element={withTransition(<Disclaimer />)} />
        <Route path="/services/it-software" element={withTransition(<ITSoftwareService />)} />
        <Route path="/services/workforce" element={withTransition(<WorkforceService />)} />
        <Route path="/services/civil-construction" element={withTransition(<CivilConstructionService />)} />
        <Route path="/services/branding-design" element={withTransition(<BrandingDesignService />)} />
        
        {/* Portfolio Route */}
        <Route path="/portfolio/:serviceId" element={withTransition(<ServicePortfolioPage />)} />

        {/* CRM Route */}
        <Route path="/crm/login" element={withTransition(<CrmLogin />)} />
        <Route path="/crm" element={withTransition(<CrmProtectedRoute><CrmPage /></CrmProtectedRoute>)} />
        <Route path="/crm/follow-ups" element={withTransition(<CrmProtectedRoute><FollowUpsPage /></CrmProtectedRoute>)} />
        <Route path="/crm/quotations" element={withTransition(<CrmProtectedRoute><QuotationsPage /></CrmProtectedRoute>)} />
        <Route path="/crm/settings" element={withTransition(<CrmProtectedRoute><CrmSettingsPage /></CrmProtectedRoute>)} />
        <Route path="/crm/*" element={withTransition(<CrmProtectedRoute><Navigate to="/crm" replace /></CrmProtectedRoute>)} />

        
        {/* 🛍️ Product Pages */}
        <Route path="/products" element={withTransition(<ProductsPage />)} />
        <Route path="/products/prepiq" element={withTransition(<PrepIQPage />)} />
        <Route path="/engineering" element={withTransition(<EngineeringProgramPage />)} />
        <Route path="/products/workforce" element={withTransition(<div className="pt-32 text-center min-h-screen text-white">WorkforceOS - Coming Soon</div>)} />
        <Route path="/products/freelanz" element={withTransition(<div className="pt-32 text-center min-h-screen text-white">Freelanz - Coming Soon</div>)} />

        {/* 🏢 Company Pages */}
        <Route path="/founders" element={withTransition(<FoundersPage />)} />
        <Route path="/our-team" element={withTransition(<OurTeamPage />)} />
        <Route path="/careers" element={withTransition(<CareersPage />)} />
        <Route path="/careers/apply" element={withTransition(<CareerApplicationPage />)} />

        {/* 🔑 Auth Pages */}
        <Route path="/signup" element={withTransition(<SignupPage />)} />
        <Route path="/login" element={withTransition(<LoginPage />)} />
        <Route path="/forgot-password" element={withTransition(<ForgotPassword />)} />

        {/* 🎓 Student Modules */}
        <Route path="/student/onboarding" element={withTransition(<StudentOnboardingPage />)} />

        {/* 👔 Internship Dashboard */}
        <Route path="/internship-dashboard" element={withTransition(<InternshipDashboard />)}>
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

        {/* 🧑‍💼 Admin Dashboard */}
        <Route path="/admin" element={withTransition(<AdminDashboard />)}>
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
        <Route path="/admin-login" element={withTransition(<AdminLogin />)} />
      </Routes>
    </AnimatePresence>
  );
}

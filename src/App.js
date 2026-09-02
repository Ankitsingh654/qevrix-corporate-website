import React, { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Toaster } from 'react-hot-toast';

// Context
import { ContactModalProvider } from './context/ContactModalContext';
import { LeadProvider } from './context/LeadContext';

// Components
import SplashScreen from "./components/landing/SplashScreen";
import GlobalContactModal from './components/GlobalContactModal';
import AnimatedRoutes from './components/ui/AnimatedRoutes';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <LeadProvider>
      <ContactModalProvider>
        {showSplash ? (
          <SplashScreen onComplete={() => setShowSplash(false)} />
        ) : (
          <Router>
            <GlobalContactModal />
            <Toaster 
              position="bottom-center"
              toastOptions={{
                style: {
                  background: '#111827',
                  color: '#fff',
                  border: '1px solid rgba(255, 90, 0, 0.2)',
                },
                success: {
                  iconTheme: {
                    primary: '#FF5A00',
                    secondary: '#fff',
                  },
                },
              }}
            />
            <div className="flex flex-col min-h-screen">
              <AnimatedRoutes />
            </div>
          </Router>
        )}
      </ContactModalProvider>
    </LeadProvider>
  );
}

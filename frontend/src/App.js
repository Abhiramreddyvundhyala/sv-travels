import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Public Pages
import Home from './pages/public/Home';
import About from './pages/public/About';
import Services from './pages/public/Services';
import Fleet from './pages/public/Fleet';
import Booking from './pages/public/Booking';
import Contact from './pages/public/Contact';

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import VehicleManagement from './pages/admin/VehicleManagement';
import EnquiryManagement from './pages/admin/EnquiryManagement';
import AdminSettings from './pages/admin/AdminSettings';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import PrivateRoute from './components/PrivateRoute';

// Context
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router basename="/sv-travels">
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/fleet" element={<Fleet />} />
              <Route path="/booking" element={<Booking />} />
              <Route path="/contact" element={<Contact />} />

              {/* Admin Routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={<PrivateRoute><AdminDashboard /></PrivateRoute>} />
              <Route path="/admin/vehicles" element={<PrivateRoute><VehicleManagement /></PrivateRoute>} />
              <Route path="/admin/enquiries" element={<PrivateRoute><EnquiryManagement /></PrivateRoute>} />
              <Route path="/admin/settings" element={<PrivateRoute><AdminSettings /></PrivateRoute>} />
            </Routes>
          </main>
          <Footer />
          <WhatsAppButton />
        </div>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </Router>
    </AuthProvider>
  );
}

export default App;

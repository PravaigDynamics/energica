import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import Layout from './components/layout/Layout';
import ProtectedRoute from './components/auth/ProtectedRoute';
import LoadingSpinner from './components/common/LoadingSpinner';
import ErrorBoundary from './components/common/ErrorBoundary';

// Lazy load components for better performance
const Dashboard = lazy(() => import('./components/dashboard/Dashboard'));
const Login = lazy(() => import('./components/auth/Login'));
const Register = lazy(() => import('./components/auth/Register'));
const Garage = lazy(() => import('./components/dashboard/Garage'));
const Shop = lazy(() => import('./components/shop/Shop'));
const Service = lazy(() => import('./components/service/Service'));
const AdminPanel = lazy(() => import('./components/admin/AdminPanel'));
const Profile = lazy(() => import('./components/user/Profile'));
const NotFound = lazy(() => import('./components/common/NotFound'));

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <Router>
          <Suspense fallback={<LoadingSpinner fullScreen />}>
            <Routes>
              {/* Public routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Protected routes */}
              <Route element={<Layout />}>
                <Route path="/" element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } />
                <Route path="/garage" element={
                  <ProtectedRoute>
                    <Garage />
                  </ProtectedRoute>
                } />
                <Route path="/shop" element={
                  <ProtectedRoute>
                    <Shop />
                  </ProtectedRoute>
                } />
                <Route path="/service" element={
                  <ProtectedRoute>
                    <Service />
                  </ProtectedRoute>
                } />
                <Route path="/profile" element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                } />

                {/* Admin routes */}
                <Route path="/admin/*" element={
                  <ProtectedRoute requireAdmin>
                    <AdminPanel />
                  </ProtectedRoute>
                } />
              </Route>

              {/* 404 route */}
              <Route path="/404" element={<NotFound />} />
              <Route path="*" element={<Navigate to="/404" replace />} />
            </Routes>
          </Suspense>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#18181b',
                color: '#e4e4e7',
                border: '1px solid #27272a'
              }
            }}
          />
        </Router>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;

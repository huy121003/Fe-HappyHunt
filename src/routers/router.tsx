import { createBrowserRouter, Outlet } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import LRoleProtectedRoute from '@/layouts/LRoleProtectedRoute';
import { CLoadingPage, CNotFoundPage } from '@/components';

// Lazy load các trang
const CategoryCreatepage = lazy(
  () => import('@/pages/AdminPages/CategoryCreatePage/CategoryCreatepage')
);
const HomePage = lazy(() => import('@/pages/UserPages/HomePage/HomePage'));
const LoginPage = lazy(() => import('@/pages/AuthPages/LoginPage'));
const RegisterPage = lazy(() => import('@/pages/AuthPages/RegisterPage'));
const ForgotPasswordPage = lazy(
  () => import('@/pages/AuthPages/ForgotPasswordPage')
);
const LAdminLayout = lazy(() => import('@/layouts/LAdminLayout'));
const DashBoardPage = lazy(() => import('@/pages/AdminPages/DashBoardPage'));
const CategoryPage = lazy(() => import('@/pages/AdminPages/CategoryPage'));
const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '*',
    element: <CNotFoundPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: (
      <Suspense fallback={<CLoadingPage />}>
        <RegisterPage />
      </Suspense>
    ),
  },
  {
    path: '/forgot-password',
    element: <ForgotPasswordPage />,
  },
  {
    path: '/admin',
    element: (
      <LRoleProtectedRoute requiredRole="Super Admin">
        <LAdminLayout />
      </LRoleProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <LRoleProtectedRoute requiredRole="Super Admin">
            <DashBoardPage />
          </LRoleProtectedRoute>
        ),
      },
      {
        path: 'dashboard',
        element: (
          <LRoleProtectedRoute requiredRole="Super Admin">
            <DashBoardPage />
          </LRoleProtectedRoute>
        ),
      },
      {
        path: 'categories',
        element: <Outlet />,
        children: [
          {
            index: true,
            element: <CategoryPage />,
          },
          { path: 'create', element: <CategoryCreatepage /> },
          {
            path: 'edit/:id',
            element: <CategoryCreatepage />,
          },
        ],
      },
    ],
  },
]);

export default router;

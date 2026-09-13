import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AdminAuthProvider } from './context/AdminAuthContext';
import { CartProvider } from './context/CartContext';
import { ProtectedRoute } from './components/admin/ProtectedRoute';
import { CustomerHome } from './pages/CustomerHome';
import { NotFound } from './pages/NotFound';

// Code-split admin components to keep the customer-facing bundle fast & lightweight
const AdminLogin = lazy(() =>
  import('./pages/admin/AdminLogin').then((m) => ({ default: m.AdminLogin }))
);
const AdminLayout = lazy(() =>
  import('./components/admin/AdminLayout').then((m) => ({ default: m.AdminLayout }))
);
const AdminDashboard = lazy(() =>
  import('./pages/admin/AdminDashboard').then((m) => ({ default: m.AdminDashboard }))
);
const AdminProductsList = lazy(() =>
  import('./pages/admin/AdminProductsList').then((m) => ({ default: m.AdminProductsList }))
);
const AdminProductForm = lazy(() =>
  import('./pages/admin/AdminProductForm').then((m) => ({ default: m.AdminProductForm }))
);
const AdminCategories = lazy(() =>
  import('./pages/admin/AdminCategories').then((m) => ({ default: m.AdminCategories }))
);

const AdminLoadingFallback = () => (
  <div className="min-h-screen bg-[#071A36] text-white flex flex-col items-center justify-center p-4">
    <div className="w-10 h-10 border-2 border-[#C99A3E]/20 border-t-[#C99A3E] rounded-full animate-spin mb-3" />
    <span className="text-xs font-semibold uppercase tracking-widest text-[#C99A3E]">
      Loading Store Management...
    </span>
  </div>
);

export function App() {
  return (
    <AdminAuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            {/* 1. Public Customer Storefront (Instant direct bundle) */}
            <Route path="/" element={<CustomerHome />} />

            {/* 2. Admin Authentication (Code-split on demand) */}
            <Route
              path="/admin/login"
              element={
                <Suspense fallback={<AdminLoadingFallback />}>
                  <AdminLogin />
                </Suspense>
              }
            />

            {/* 3. Protected Admin Panel (Code-split on demand) */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <Suspense fallback={<AdminLoadingFallback />}>
                    <AdminLayout />
                  </Suspense>
                </ProtectedRoute>
              }
            >
              {/* Dashboard Home */}
              <Route index element={<AdminDashboard />} />

              {/* Product Management */}
              <Route path="products" element={<AdminProductsList />} />
              <Route path="products/new" element={<AdminProductForm mode="create" />} />
              <Route path="products/edit/:id" element={<AdminProductForm mode="edit" />} />

              {/* Category & Subcategory Management */}
              <Route path="categories" element={<AdminCategories />} />

              {/* Fallback inside admin */}
              <Route path="*" element={<Navigate to="/admin" replace />} />
            </Route>

            {/* 4. Customer-Friendly 404 Not Found Handling */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </AdminAuthProvider>
  );
}

export default App;

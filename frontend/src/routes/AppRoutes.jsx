import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';
import AuthLayout from '../layouts/AuthLayout';
import DashboardLayout from '../layouts/DashboardLayout';

import LoginPage from '../pages/auth/LoginPage';
import RegisterPage from '../pages/auth/RegisterPage';
import DashboardPage from '../pages/DashboardPage';
import CategoriesPage from '../pages/CategoriesPage';

import ProductsPage from '../pages/product/ProductsPage';
import CreateProductPage from '../pages/product/CreateProductPage';
import UpdateProductPage from '../pages/product/UpdateProductPage';

export default function AppRoutes() {
    return (
        <Routes>

            <Route element={<AuthLayout />}>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
            </Route>

            <Route element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/categories" element={<CategoriesPage />} />

                <Route path="/products" element={<ProductsPage />} />
                <Route path="/products/create" element={<CreateProductPage />} />
                <Route path="/products/edit/:id" element={<UpdateProductPage />} />
            </Route>

            <Route path="*" element={<Navigate to="/login" />} />

        </Routes>
    );
}
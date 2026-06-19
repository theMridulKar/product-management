import { Outlet } from 'react-router-dom';

import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

export default function DashboardLayout() {
    return (
        <div className="d-flex min-vh-100">
            <Sidebar />
            <div className="flex-grow-1">
                <Navbar />
                <div className="bg-light p-4">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}
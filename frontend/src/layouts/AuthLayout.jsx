import { Outlet } from 'react-router-dom';

export default function AuthLayout() {
    return (
        <div className="min-vh-100 bg-light d-flex align-items-center justify-content-center">
            <div className="bg-white shadow-sm rounded-4 p-4" style={{width: '100%', maxWidth: '500px'}}>
                <Outlet />
            </div>
        </div>
    );
}
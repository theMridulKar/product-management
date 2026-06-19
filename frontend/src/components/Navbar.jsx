import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import AuthRepository from '../repositories/AuthRepository';

export default function Navbar() {

    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

    const handleLogout = async () => {
        try {
            await AuthRepository.logout();
        } catch (error) {
            console.log(error);
        } finally {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            toast.success('Logged out successfully');
            navigate('/login');
        }
    };

    return (
        <nav className="navbar bg-white border-bottom px-4 shadow-sm">

            <p className="mb-0">
                Welcome back <span className="fw-semibold">{user?.name || 'User'}</span> !
            </p>

            <div className="ms-auto">
                <div className="ms-auto dropdown">
                    <button className="btn btn-light dropdown-toggle" type="button" data-bs-toggle="dropdown">{user?.name || 'User'}</button>
                    <ul className="dropdown-menu dropdown-menu-end">
                        <li>
                            <button className="dropdown-item text-danger" onClick={handleLogout}>Logout</button>
                        </li>
                    </ul>
                </div>
            </div>

        </nav>
    );
}
import { Link } from 'react-router-dom';

export default function Sidebar() {
    return (
        <div className="bg-dark text-white p-3" style={{width: '250px', minHeight: 'calc(100vh - 56px)'}}>
            <div className="p-4 border-bottom border-secondary">
                <h4 className="text-white fw-bold mb-1">PMS</h4>
                <small className="text-secondary">Product Management</small>
            </div>

            <li>
                <Link to="/dashboard" className="d-block py-2 px-3 rounded text-white text-decoration-none">Dashboard</Link>
            </li>

            <li>
                <Link to="/categories" className="d-block py-2 px-3 rounded text-white text-decoration-none">Categories</Link>
            </li>

            <li>
                <Link to="/products" className="d-block py-2 px-3 rounded text-white text-decoration-none">Products</Link>
            </li>
        </div>
    );
}
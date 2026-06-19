import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import AuthRepository from '../../repositories/AuthRepository';
import toast from 'react-hot-toast';

export default function LoginPage() {

    const [formData, setFormData] = useState({email: '', password: ''});

    const navigate = useNavigate();
    
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        
        e.preventDefault();
        try {
            setLoading(true);

            const response = await AuthRepository.login(formData);
            localStorage.setItem('token', response.data.data.token);

            const profile = await AuthRepository.profile();
            localStorage.setItem('user', JSON.stringify(profile.data.data));

            toast.success(response.data.message);
            navigate('/dashboard');
        
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="text-center mb-4">
                <h2>Welcome Back</h2>
                <p className="text-muted"> Login to your account</p>
            </div>

            <form onSubmit={handleSubmit}>

                <div className="mb-3">
                    <input type="email" name="email" className="form-control" placeholder="Enter your email" value={formData.email} onChange={handleChange} />
                </div>

                <div className="mb-3">
                    <input type="password" name="password" className="form-control" placeholder="Enter your password" value={formData.password} onChange={handleChange} />
                </div>

                <button type="submit" disabled={loading} className="btn btn-primary w-100">{loading ? 'Logging in...' : 'Login'}</button>

            </form>

            <div className="text-center mt-3"> Don't have an account?{' '}<Link to="/register" className="text-decoration-none text-primary"> Register </Link> </div>
        </>
    );
}
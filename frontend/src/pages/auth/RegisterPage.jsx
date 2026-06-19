import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import toast from 'react-hot-toast';
import AuthRepository from '../../repositories/AuthRepository';

export default function RegisterPage() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({name: '', email: '', password: '', password_confirmation: ''});

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (formData.password !== formData.password_confirmation) {
            toast.error('Password confirmation does not match');
            return;
        }

        try {
            setLoading(true);
            const payload = {
                name: formData.name,
                email: formData.email,
                password: formData.password,
                password_confirmation: formData.password_confirmation
            };
            const response = await AuthRepository.register(payload);
            toast.success(response.data.message);
            setFormData({name: '', email: '', password: '', password_confirmation: ''});
            setTimeout(() => {
                navigate('/login');
            }, 1500);

        } catch (error) {
            toast.error(error?.response?.data?.message || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="text-center mb-4">
                <h2>Create Account</h2>

                <p className="text-muted">Register to continue</p>
            </div>

            <form onSubmit={handleSubmit}>

                <div className="mb-3">
                    <input type="text" name="name" className="form-control" placeholder="Enter your full name" value={formData.name} onChange={handleChange} />
                </div>

                <div className="mb-3">
                    <input type="email" name="email" className="form-control" placeholder="Enter your email address" value={formData.email} onChange={handleChange} />
                </div>

                <div className="mb-3">
                    <input type="password" name="password" className="form-control" placeholder="Enter your password" value={formData.password} onChange={handleChange} />
                </div>

                <div className="mb-3">
                    <input type="password" name="password_confirmation" className="form-control" placeholder="Confirm your password" value={formData.password_confirmation} onChange={handleChange} />
                </div>

                <button type="submit" disabled={loading} className="btn btn-success w-100">{loading ? 'Registering...' : 'Register'}</button>

            </form>

            <div className="text-center mt-3">Already have an account?{' '} <Link to="/login" className="text-decoration-none text-success">Login</Link> </div>
        </>
    );
}
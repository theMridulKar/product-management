import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import ProductRepository from '../../repositories/ProductRepository';
import CategoryRepository from '../../repositories/CategoryRepository';

export default function CreateProductPage() {

    const navigate = useNavigate();

    const [categories, setCategories] = useState([]);

    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        category_id: '',
        name: '',
        price: '',
        description: ''
    });

    useEffect(() => {
        loadCategories();
    }, []);

    const loadCategories = async () => {
        try {
            const response = await CategoryRepository.getAll(1, 1000, '');
            setCategories(response.data.data.data);
        } catch (error) {
            toast.error('Failed to load categories');
        }
    };

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        
        e.preventDefault();

        try {
            setLoading(true);
            const response = await ProductRepository.create(formData);
            toast.success(response.data.message);
            navigate('/products');
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Failed to create product');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="mb-0">Create Product</h2>
            </div>

            <div className="card border-0 shadow-sm">
                <div className="card-body">
                    <form onSubmit={handleSubmit}>

                        <div className="mb-3">
                            <label className="form-label">Category</label>
                            <select className="form-select" name="category_id" value={formData.category_id} onChange={handleChange} required>
                                <option value="">Select Category</option>
                                {categories.map(
                                    (category) => (
                                        <option key={category.id} value={category.id}>{category.name}</option>
                                    )
                                )}
                            </select>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Product Name</label>
                            <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} placeholder="Enter product name" required/>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Price</label>
                            <input type="number" className="form-control" name="price" value={formData.price} onChange={handleChange} placeholder="Enter product price" required/>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Description</label>
                            <textarea rows="4" className="form-control" name="description" value={formData.description} onChange={handleChange} placeholder="Enter product description"/>
                        </div>

                        <div className="d-flex gap-2">
                            <button type="submit" className="btn btn-dark" disabled={loading}>{loading ? 'Saving...' : 'Create Product'}</button>
                            <button type="button" className="btn btn-secondary" onClick={() => navigate('/products')}>Cancel</button>
                        </div>

                    </form>

                </div>

            </div>

        </div>
    );
}
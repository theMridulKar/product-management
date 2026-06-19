
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

import ProductRepository from '../../repositories/ProductRepository';
import CategoryRepository from '../../repositories/CategoryRepository';

export default function UpdateProductPage() {

    const navigate = useNavigate();
    const { id } = useParams();

    const [loading, setLoading] = useState(false);

    const [categories, setCategories] = useState([]);

    const [formData, setFormData] = useState({
        category_id: '',
        name: '',
        price: '',
        description: ''
    });

    useEffect(() => {
        loadCategories();
        loadProduct();
    }, []);

    const loadCategories = async () => {
        try {
            const response = await CategoryRepository.getAll(1, 1000, '');
            setCategories(response.data.data.data);
        } catch (error) {
            toast.error('Failed to load categories');
        }
    };

    const loadProduct = async () => {
        try {
            const response = await ProductRepository.find(id);
            const product = response.data.data;

            setFormData({
                category_id: product.category_id,
                name: product.name,
                price: product.price,
                description: product.description || ''
            });
        } catch (error) {
            toast.error('Failed to load product');
            navigate('/products');
        }
    };

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {
            setLoading(true);
            const response = await ProductRepository.update(id, formData);
            toast.success(response.data.message);
            navigate('/products');
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Failed to update product');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="mb-0">Update Product</h2>
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
                            <button type="submit" className="btn btn-dark" disabled={loading}> {loading ? 'Updating...' : 'Update Product'}</button>
                            <button type="button" className="btn btn-secondary" onClick={() => navigate('/products')}>Cancel</button>
                        </div>

                    </form>

                </div>

            </div>

        </div>
    );
}
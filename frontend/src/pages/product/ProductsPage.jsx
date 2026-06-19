import { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

import ProductRepository from '../../repositories/ProductRepository';
import ProductViewModal from '../../components/ProductViewModal';

export default function ProductsPage() {

    const [products, setProducts] = useState([]);

    const [search, setSearch] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');

    const [perPage, setPerPage] = useState(10);

    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);

    const [selectedProduct, setSelectedProduct] = useState(null);

    const loadProducts = useCallback(async () => {

        try {

            const response =
                await ProductRepository.getAll(
                    page,
                    perPage,
                    debouncedSearch
                );

            setProducts(response.data.data.data);
            setLastPage(response.data.data.last_page);

        } catch (error) {
            toast.error('Failed to load products');
        }

    }, [page, perPage, debouncedSearch]);

    useEffect(() => {
        loadProducts();
    }, [loadProducts]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search);
        }, 500);
        return () => clearTimeout(timer);
    }, [search]);

    const handleDelete = async (id) => {

        const confirmed = window.confirm(
            'Are you sure you want to delete this product?'
        );

        if (!confirmed) return;

        try {
            const response = await ProductRepository.delete(id);
            toast.success(response.data.message);
            loadProducts();
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Delete failed');
        }
    };

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="mb-0">Products</h2>
                <Link to="/products/create" className="btn btn-dark">Create Product</Link>
            </div>

            <div className="card border-0 shadow-sm">
                <div className="card-body">

                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <div>
                            <select className="form-select" style={{ width: '120px' }} value={perPage} onChange={(e) => {setPerPage(Number(e.target.value)); setPage(1);}}>
                                <option value="10">10</option>
                                <option value="25">25</option>
                                <option value="50">50</option>
                                <option value="100">100</option>
                            </select>
                        </div>

                        <div>
                            <input type="text" className="form-control" placeholder="Search product..." value={search} onChange={(e) => {setSearch(e.target.value); setPage(1); }}/>
                        </div>
                    </div>

                    <table className="table table-striped table-hover align-middle">
                        <thead>
                            <tr>
                                <th>SL</th>
                                <th>Category</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Description</th>
                                <th width="220">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product, index) => (

                                    <tr key={product.id}>
                                        <td>{(page - 1) * perPage + index + 1}</td>
                                        <td>{product.category?.name}</td>
                                        <td>{product.name}</td>
                                        <td>৳ {product.price}</td>
                                        <td>{product.description?.length > 40 ? product.description.substring(0, 40) + '...' : product.description}</td>
                                        <td>
                                            <Link to={`/products/edit/${product.id}`} className="btn btn-sm btn-primary me-2">Edit</Link>
                                            <button className="btn btn-sm btn-info me-2" onClick={() => setSelectedProduct(product)}>View</button>
                                            <button className="btn btn-sm btn-danger" onClick={() => handleDelete(product.id)}>Delete</button>
                                        </td>
                                    </tr>
                                )
                            )}

                            {products.length === 0 && (
                                <tr>
                                    <td colSpan="6" className="text-center">No products found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                    <nav>
                        <ul className="pagination justify-content-end mb-0">
                            <li className={`page-item ${page === 1 ? 'disabled' : '' }`}>
                                <button className="page-link" onClick={() => setPage(page - 1)}>Previous</button>
                            </li>

                            {[...Array(lastPage)].map((_, index) => (
                                <li key={index} className={`page-item ${page === index + 1 ? 'active' : ''}`}>
                                    <button className="page-link" onClick={() => setPage(index + 1)}>{index + 1}</button>
                                </li>
                            ))}

                            <li className={`page-item ${page === lastPage ? 'disabled' : '' }`}>
                                <button className="page-link" onClick={() => setPage(page + 1)}>Next</button>
                            </li>
                        </ul>
                    </nav>

                    <ProductViewModal product={selectedProduct} onClose={() => setSelectedProduct(null)}/>

                </div>

            </div>

        </div>
    );
}
import { useEffect, useState, useCallback } from 'react';
import toast from 'react-hot-toast';

import CategoryRepository from '../repositories/CategoryRepository';

export default function CategoriesPage() {

    const [categories, setCategories] = useState([]);
    const [name, setName] = useState('');
    const [editingId, setEditingId] = useState(null);

    const [search, setSearch] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');
    const [perPage, setPerPage] = useState(10);

    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);

    const loadCategories = useCallback(async () => {
        
        try {
            const response = await CategoryRepository.getAll(page, perPage, debouncedSearch);

            setCategories(response.data.data.data);
            setLastPage(response.data.data.last_page);

        } catch (error) {

             console.log(error);
                console.log(error.response);
                console.log(error.response?.data);

                toast.error('Failed to load categories');
                
            toast.error('Failed to load categories');
        }

    }, [page, perPage, debouncedSearch]);


    useEffect(() => {
        loadCategories();
    }, [loadCategories]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search);
        }, 500);
        return () => clearTimeout(timer);
    }, [search]);

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {
            if (editingId) {
                const response = await CategoryRepository.update(editingId, { name });
                toast.success(response.data.message);
            } else {
                const response =await CategoryRepository.create({name});
                toast.success(response.data.message);
            }

            setName('');
            setEditingId(null);
            loadCategories();

        } catch (error) {
            toast.error(error?.response?.data?.message || 'Something went wrong');
        }
    };

    const handleEdit = (category) => {
        setEditingId(category.id);
        setName(category.name);
    };

    const handleDelete = async (id) => {

        const confirmed =
            window.confirm(
                'Are you sure you want to delete this category?'
            );

        if (!confirmed) return;

        try {
            const response = await CategoryRepository.delete(id);
            toast.success(response.data.message);
            loadCategories();
        } catch (error) {
            toast.error( error?.response?.data?.message || 'Delete failed');
        }
    };

    return (
        <div>

            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="mb-0">Categories</h2>
            </div>

            <div className="card border-0 shadow-sm mb-4">
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-md-10">
                                <input type="text" className="form-control" placeholder="Category Name" value={name} onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div className="col-md-2">
                                <button type="submit" className="btn btn-dark w-100">{editingId ? 'Update' : 'Create'}</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            <div className="card border-0 shadow-sm">
                <div className="card-body">

                    <div className="d-flex justify-content-between align-items-center mb-3">

                        <div>
                            <select className="form-select" style={{ width: '120px' }} value={perPage} onChange={(e) => {setPerPage(Number(e.target.value)); setPage(1);}}>
                                <option>10</option>
                                <option>25</option>
                                <option>50</option>
                                <option>100</option>
                            </select>
                        </div>

                        <div>
                            <input type="text" className="form-control" placeholder="Search category..." value={search} onChange={(e) => {setSearch(e.target.value); setPage(1);}} />
                        </div>

                    </div>

                    <table className="table table-striped table-hover align-middle">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th width="180">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.map(
                                (category, index) => (
                                    <tr key={category.id} >
                                        <td>{(page - 1) * perPage + index + 1}</td>
                                        <td>{category.name}</td>
                                        <td><button className="btn btn-sm btn-primary me-2" onClick={() => handleEdit(category)}>Edit</button>
                                            <button className="btn btn-sm btn-danger"onClick={() => handleDelete(category.id)}>Delete</button>
                                        </td>
                                    </tr>
                                )
                            )}

                            {categories.length === 0 && (
                                <tr>
                                    <td colSpan="3" className="text-center">No categories found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                    {/* pagination buttons */}
                    <nav>
                        <ul className="pagination justify-content-end mb-0">

                            <li className={`page-item ${page === 1 ? 'disabled' : ''}`} >
                                <button className="page-link" onClick={() => setPage(page - 1)} >Previous</button>
                            </li>

                            {[...Array(lastPage)].map((_, index) => (

                                <li key={index} className={`page-item ${page === index + 1 ? 'active' : ''}`} >
                                    <button className="page-link" onClick={() => setPage(index + 1)} >{index + 1}</button>
                                </li>

                            ))}

                            <li className={`page-item ${page === lastPage ? 'disabled' : '' }`} >
                                <button className="page-link" onClick={() => setPage(page + 1)}>Next</button>
                            </li>

                        </ul>
                    </nav>
                </div>
            </div>

        </div>
    );
}
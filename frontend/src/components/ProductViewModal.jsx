export default function ProductViewModal({product, onClose}) {

    if (!product) return null;

    return (

        <>
            <div className="position-fixed top-0 start-0 w-100 h-100 bg-dark" style={{opacity: 0.5, zIndex: 1040}}/>
            <div className="modal fade show d-block" tabIndex="-1" style={{zIndex: 1050}}>
                <div className="modal-dialog">
                    <div className="modal-content">

                        <div className="modal-header">
                            <h5 className="modal-title">Product Details</h5>
                            <button className="btn-close" onClick={onClose}/>
                        </div>

                        <div className="modal-body">
                            <p><strong>Name:</strong>{' '}{product.name}</p>
                            <p><strong>Category:</strong>{' '}{product.category?.name}</p>
                            <p><strong>Price:</strong>{' '}৳{product.price}</p>
                            <p><strong>Description:</strong>
                                <br />
                                {product.description}
                            </p>
                        </div>
                        
                    </div>
                </div>
            </div>
        </>
    );
}
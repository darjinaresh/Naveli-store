import { useContext, useRef } from "react";
import Modal from "../UI/Modal";
import "./AddProducts.css";
import AppContext from "../../store/app-context";

function AddProduct() {
  const { showAddProduct, closeAddProduct, handleAddProduct } =
    useContext(AppContext);
  const nameRef = useRef();

  function handleSubmit(event) {
    event.preventDefault();
    const nameValue = nameRef.current.value;
    handleAddProduct(nameValue);
  }
  return (
    <Modal show={showAddProduct} onClose={closeAddProduct}>
      <div className="add-product-container">
        <div className="add-product-heading">Add Product</div>
        <form onSubmit={handleSubmit} className="add-product-form">
          <div className="form-label">Enter Product Name</div>
          <input ref={nameRef} className="form-input" />
          <button type="submit" className="yellow-button submit-button">
            Add Product
          </button>
        </form>
      </div>
    </Modal>
  );
}

export default AddProduct;

import { useState } from "react";
import PropTypes from "prop-types";
import { createProd } from "./crud-ops";

// eslint-disable-next-line react/prop-types
const ProductForm = ({ addproduct }) => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [qty, setQty] = useState(0);
  const [price, setPrice] = useState(0);

  const addApiProduct = async (data) => {
    const obj = await createProd(data);
    addproduct(obj);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addApiProduct({ title, image, qty, price });

    setTitle("");
    setImage("");
    setQty(0);
    setPrice(0);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />
      </div>
      <div>
        <input
          type="text"
          id="image"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          placeholder="Image URL"
        />
      </div>
      <div>
        <input
          type="number"
          id="qty"
          value={qty}
          onChange={(e) => setQty(Number(e.target.value))}
          placeholder="Quantity"
        />
      </div>
      <div>
        <input
          type="number"
          id="price"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          placeholder="Price"
        />
      </div>
      <button style={{ marginTop: 16 }} type="submit">
        Add Product
      </button>
    </form>
  );
};

ProductForm.propTypes = {
  addProduct: PropTypes.func.isRequired,
};

export default ProductForm;

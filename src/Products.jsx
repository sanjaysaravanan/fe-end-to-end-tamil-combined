/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import Product from "./components/Product";
import { readAllData, deleteProduct } from "./crud-ops";
import ProductForm from "./ProductForm";
import "./App.css";

// type success | failure | warning
const AlertMsg = ({ msg = "Sample Test Msg", type = "success" }) => {
  if (type === "failure") {
    return <div className="alertMsg bgRed">{msg}</div>;
  }

  return <div className="alertMsg">{msg}</div>;
};

// eslint-disable-next-line react/prop-types
const PopUp = ({ handlePop, addproduct }) => {
  return (
    <div className="pop-up-overlay">
      <div className="pop-up">
        <button onClick={handlePop} style={{ float: "right" }}>
          Close
        </button>
        <ProductForm
          addproduct={(data) => {
            addproduct(data);
            handlePop();
          }}
        />
      </div>
    </div>
  );
};

const initialAlert = {
  msg: "",
  type: "success",
};

const Products = () => {
  const [prods, setProds] = useState([]);

  const [open, setOpen] = useState(false);

  const [alertState, setAlertState] = useState(initialAlert);

  const loadMsg = (msg, type) => {
    setAlertState({
      ...alertState,
      msg,
      type,
    });
    setTimeout(() => {
      setAlertState(initialAlert);
    }, 5000);
  };

  const loadProducts = async () => {
    try {
      const data = await readAllData();
      setProds(data);
      loadMsg("Data loaded successfully", "success");
    } catch (err) {
      loadMsg(err.message, "failure");
    }
  };

  const removeProduct = async (prodId) => {
    await deleteProduct(prodId);
    setProds(prods.filter((product) => product.id !== prodId));
  };

  const addproduct = (data) => {
    setProds([...prods, data]);
  };

  const handlePop = () => {
    setOpen(!open);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <>
      <h1>List Of Products</h1>
      {open && <PopUp handlePop={handlePop} addproduct={addproduct} />}
      {alertState.msg && <AlertMsg {...alertState} />}
      <button
        onClick={handlePop}
        style={{
          fontSize: 24,
          float: "right",
          position: "absolute",
          right: 0,
          top: 0,
          backgroundColor: "#ccc",
        }}
      >
        +
      </button>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {prods.map((product) => (
          <Product
            {...product}
            key={product.id}
            removeProduct={removeProduct}
          />
        ))}
      </div>
    </>
  );
};

export default Products;

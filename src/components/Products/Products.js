// import productsData from "../../data/products.json";
import AppContext from "../../store/app-context";
import Loader from "../UI/Loader";
import "./Products.css";

// import Image from "../../assets/black_tshirt.png"; - for 1 static image
// seperate function for Products
import { useContext } from "react";
function Product({ id, name, image }) {
  const { handleAddToCart } = useContext(AppContext);
  return (
    <div key={id} className="product">
      <img src={require(`../../assets/${image}`)} alt={name} />
      <div className="product-name"> {name}</div>
      <button
        className="yellow-button"
        onClick={() => handleAddToCart(id, name, image)}
      >
        Add to Cart
      </button>
    </div>
  );
}

function Products() {
  const { products, isloading } = useContext(AppContext);

  if (isloading) return <Loader />;

  return (
    <div className="products-container">
      {Object.keys(products).map((k) => (
        <Product
          key={k}
          id={products[k].id}
          name={products[k].name}
          image={products[k].image}
        />
      ))}
    </div>
  );
}

export default Products;

import { useEffect, useState } from "react";
import AppContext from "./app-context";

const AppContextProvider = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const openCart = () => setShowCart(true);
  const closeCart = () => setShowCart(false);

  const [showAddProduct, setShowAddProduct] = useState(false);
  const [products, setProducts] = useState([]);

  const openAddProduct = () => setShowAddProduct(true);
  const closeAddProduct = () => setShowAddProduct(false);

  const [isloading, setIsloading] = useState(false);

  const handleAddToCart = (productId, productName, productImage) => {
    const productInCartIndex = cartItems.findIndex(
      (item) => item.id === productId
    );

    if (productInCartIndex === -1) {
      const cartItem = {
        id: productId,
        name: productName,
        image: productImage,
        quantity: 1,
      };
      setCartItems((state) => [...state, cartItem]);
    } else {
      const updatedCartItems = [...cartItems];
      updatedCartItems[productInCartIndex].quantity += 1;
      setCartItems(updatedCartItems);
    }
    // This is too long and it's not a good approach , i think i can do it in a onther way using spread operator.
    // let updatedCartItems = cartItems;
    // updatedCartItems = updatedCartItems.concat({
    //   id : productId,
    //   name : productName,
    //   image : productImage,
    //   quantity : 1,
    // });
    // setCartItems(updatedCartItems);
  };

  const handleIncreaseQuantity = (productId) => {
    const productInCartIndex = cartItems.findIndex(
      (item) => item.id === productId
    );
    const updatedCartItems = [...cartItems];
    updatedCartItems[productInCartIndex].quantity += 1;
    setCartItems(updatedCartItems);
  };

  const handleDecreaseQuantity = (productId) => {
    const productInCartIndex = cartItems.findIndex(
      (item) => item.id === productId
    );
    const qty = cartItems[productInCartIndex].quantity;
    let updatedCartItems = [...cartItems];

    if (qty === 1) {
      updatedCartItems = updatedCartItems.filter(
        (item, index) => index !== productInCartIndex
      );
    } else {
      updatedCartItems[productInCartIndex].quantity -= 1;
    }
    setCartItems(updatedCartItems);
  };

  const handleAddProduct = (productName) => {
    const product = {
      id: products.length + 1,
      name: productName,
      image: "default_product.png",
    };
    sendAddProduct(product);
    setProducts((state) => {
      return { ...state, [Object.keys(state).length + 1]: product };
    });
    closeAddProduct(false);
  };

  const sendAddProduct = async (product) => {
    const response = await fetch(
      "https://bookwala-8f60d-default-rtdb.firebaseio.com/products.json",
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(product),
      }
    );
    const data = await response.json();
    console.log(data); //for check whether data is show or not in console area..
  };

  const appContextValue = {
    showCart,
    showAddProduct,
    products,
    cartItems,
    isloading,
    openCart,
    closeCart,
    openAddProduct,
    closeAddProduct,
    handleAddProduct,
    handleAddToCart,
    handleIncreaseQuantity,
    handleDecreaseQuantity,
  };

  const fetchData = async () => {
    setIsloading(true);
    try {
      const response = await fetch(
        "https://bookwala-8f60d-default-rtdb.firebaseio.com/products.json",
        {
          method: "GET",
        }
      );

      const data = await response.json();
      console.log(data);
      setProducts(data);
      setIsloading(false);
    } catch (err) {
      console.log(err);
      setIsloading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <AppContext.Provider value={appContextValue}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;

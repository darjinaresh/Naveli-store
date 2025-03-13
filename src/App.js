import React from "react";
import Header from "./components/Header/Header";
import Products from "./components/Products/Products";
import Cart from "./components/Cart/Cart";
import AddProduct from "./components/AddProduct/AddProducts";

import AppContextProvider from "./store/AppContextProvider";

function App() {
  return (
    <AppContextProvider>
      <Header />
      <Products />
      <Cart />
      <AddProduct />
    </AppContextProvider>
  );
}

export default App;

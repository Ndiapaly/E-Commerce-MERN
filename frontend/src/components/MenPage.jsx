import React, { useState } from "react";
import Cart from "../components/Cart";
import ProductList from "../components/ProductListMen";
import "./men.css";


// Adjust the path as necessary

const MenPage = () => {
  const [cart, setCart] = useState([]);

  // Fonction pour ajouter un produit au panier
  const addToCart = (product) => {
    const productInCart = cart.find((item) => item.id === product.id);
    if (productInCart) {
      // Si le produit existe déjà dans le panier, on augmente la quantité
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      // Sinon, on ajoute le produit avec une quantité de 1
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  // Fonction pour modifier la quantité
  const updateQuantity = (productId, quantity) => {
    setCart(
      cart.map((item) =>
        item.id === productId
          ? { ...item, quantity: Math.max(quantity, 1) }
          : item
      )
    );
  };

  // Fonction pour supprimer un produit du panier
  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  // Fonction pour valider la commande
  const handleCheckout = () => {
    alert("Commande validée !");
    setCart([]); // Vider le panier après validation
  };

  return (
    <div>
      
      <ProductList addToCart={addToCart} />
      <Cart
        cart={cart}
        updateQuantity={updateQuantity}
        removeFromCart={removeFromCart}
        onCheckout={handleCheckout}
      />

      <br />
    </div>
  );
};

export default MenPage;

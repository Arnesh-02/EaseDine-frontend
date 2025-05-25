import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { FiX, FiTrash2, FiPlusCircle, FiMinusCircle } from 'react-icons/fi';
import { addItemToCart, removeItemFromCart, clearCart } from '../../store/cartSlice'; // Assuming clearCart exists
import { toggleCartSidebar } from '../../store/uiSlice';
import './CartSidebar.css';

const CartSidebar = () => {
  const dispatch = useDispatch();
  const { items: cartItems, totalAmount, totalQuantity } = useSelector((state) => state.cart);
  const { isCartSidebarOpen } = useSelector((state) => state.ui);

  const handleCloseCart = () => {
    dispatch(toggleCartSidebar());
  };

  const handleIncreaseQuantity = (item) => {
    // addItemToCart will handle incrementing if item already exists
    dispatch(addItemToCart({ id: item.id, name: item.name, price: item.price, image: item.image }));
  };

  const handleDecreaseQuantity = (itemId) => {
    dispatch(removeItemFromCart(itemId)); // removeItemFromCart handles decrementing or removing
  };

  const handleClearCart = () => {
    if(window.confirm("Are you sure you want to clear your cart?")) {
        dispatch(clearCart());
    }
  };

  if (!isCartSidebarOpen) {
    return null;
  }

  return (
    <>
      <div className="cart-sidebar-overlay" onClick={handleCloseCart}></div>
      <aside className={`cart-sidebar ${isCartSidebarOpen ? 'open' : ''}`}>
        <div className="cart-sidebar-header">
          <h3>Your Cart ({totalQuantity} items)</h3>
          <button onClick={handleCloseCart} className="close-cart-btn" aria-label="Close cart">
            <FiX />
          </button>
        </div>

        {cartItems.length === 0 ? (
          <div className="cart-empty-message">
            <p>Your cart is currently empty.</p>
            <Link to="/dashboard" onClick={handleCloseCart} className="btn-primary">Start Shopping</Link>
          </div>
        ) : (
          <>
            <div className="cart-items-list">
              {cartItems.map(item => (
                <div className="cart-item" key={item.id}>
                  <img src={item.image || 'https://via.placeholder.com/80x80.png?text=Food'} alt={item.name} className="cart-item-image" />
                  <div className="cart-item-details">
                    <p className="cart-item-name">{item.name}</p>
                    <p className="cart-item-price">${item.price.toFixed(2)}</p>
                    <div className="cart-item-quantity-controls">
                      <button onClick={() => handleDecreaseQuantity(item.id)} aria-label="Decrease quantity">
                        <FiMinusCircle />
                      </button>
                      <span>{item.quantity}</span>
                      <button onClick={() => handleIncreaseQuantity(item)} aria-label="Increase quantity">
                        <FiPlusCircle />
                      </button>
                    </div>
                  </div>
                  <p className="cart-item-total-price">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>

            <div className="cart-sidebar-footer">
              <div className="cart-summary">
                <p>Subtotal:</p>
                <p className="cart-total-amount">${totalAmount.toFixed(2)}</p>
              </div>
              <Link to="/checkout" onClick={handleCloseCart} className="btn-primary checkout-btn">
                Proceed to Checkout
              </Link>
              <button onClick={handleClearCart} className="clear-cart-btn">
                <FiTrash2 /> Clear Cart
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  );
};

export default CartSidebar;
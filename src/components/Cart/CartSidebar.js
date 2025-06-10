import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { FiX, FiTrash2, FiPlus, FiMinus } from 'react-icons/fi';
import { toggleCartSidebar, setToast } from '../../store/uiSlice';
import { addItemToCart, removeItemFromCart, clearCart } from '../../store/cartSlice';
import './CartSidebar.css';

const CartSidebar = () => {
  const dispatch = useDispatch();
  const { items, totalQuantity, totalAmount } = useSelector((state) => state.cart);

  const handleCloseCart = () => {
    dispatch(toggleCartSidebar());
  };

  const handleAddItem = (item) => {
    dispatch(addItemToCart({ id: item.id, name: item.name, price: item.price, image: item.image }));
    dispatch(setToast({ message: `Added one ${item.name} to cart`, type: 'success' }));
  };

  const handleRemoveItem = (itemId) => {
    const item = items.find(i => i.id === itemId);
    dispatch(removeItemFromCart(itemId));
    if (item && item.quantity === 1) {
      dispatch(setToast({ message: `Removed ${item.name} from cart`, type: 'success' }));
    }
  };

  const handleClearCart = () => {
    dispatch(clearCart());
    dispatch(setToast({ message: 'Cart cleared!', type: 'success' }));
  };

  return (
    <div className="cart-sidebar-overlay">
      <div className="cart-sidebar">
        <div className="cart-header">
          <h3>Your Cart ({totalQuantity})</h3>
          <button className="close-cart-btn" onClick={handleCloseCart}>
            <FiX />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="empty-cart">
            <div className="empty-cart-icon">🛒</div>
            <p>Your cart is empty</p>
            <button className="browse-btn" onClick={handleCloseCart}>
              Browse Food
            </button>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {items.map((item) => (
                <div className="cart-item" key={item.id}>
                  <div className="cart-item-image">
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div className="cart-item-details">
                    <h4>{item.name}</h4>
                    <div className="cart-item-price">${item.price.toFixed(2)}</div>
                    <div className="cart-item-actions">
                      <div className="quantity-controls">
                        <button 
                          className="quantity-btn" 
                          onClick={() => handleRemoveItem(item.id)}
                          aria-label="Decrease quantity"
                        >
                          <FiMinus />
                        </button>
                        <span className="quantity">{item.quantity}</span>
                        <button 
                          className="quantity-btn" 
                          onClick={() => handleAddItem(item)}
                          aria-label="Increase quantity"
                        >
                          <FiPlus />
                        </button>
                      </div>
                      <button 
                        className="remove-item-btn" 
                        onClick={() => {
                          // Remove all quantities of this item
                          for (let i = 0; i < item.quantity; i++) {
                            handleRemoveItem(item.id);
                          }
                        }}
                        aria-label="Remove item"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <div className="cart-total">
                <span>Total:</span>
                <span>${totalAmount.toFixed(2)}</span>
              </div>
              <div className="cart-actions">
                <button className="clear-cart-btn" onClick={handleClearCart}>
                  Clear Cart
                </button>
                <Link to="/checkout" className="checkout-btn" onClick={handleCloseCart}>
                  Checkout
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartSidebar;
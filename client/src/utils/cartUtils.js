import { fetchCart, addToCartAPI, updateCartItemAPI, removeFromCartAPI, clearCartAPI } from "../api/cartAPI";

/**
 * 🛒 Cart Utilities
 * Manages cart state using localStorage
 */

// Get cart items (API)
export const getCart = async () => {
    try {
        return await fetchCart();
    } catch (err) {
        console.error("Error fetching cart", err);
        return [];
    }
};

// Add item to cart
export const addToCart = async (product) => {
    try {
        await addToCartAPI(product.prod_id, 1);
        window.dispatchEvent(new Event("cartUpdated"));
    } catch (err) {
        console.error("Error adding to cart", err);
        alert("Failed to add to cart. Ensure you are logged in.");
    }
};

// Update item quantity
export const updateQuantity = async (productId, amount) => {
    // This function signature is kept for compatibility but components should use API directly if possible.
    // However, since we don't have the current qty here, this helper is less useful for atomic updates without fetching first.
    // For now, we will leave it as a placeholder or warn.
    // Ideally, the component calls updateCartItemAPI directly with the calculated NEW quantity.
    console.warn("updateQuantity util is deprecated. Use updateCartItemAPI directly.");
};

export const removeFromCart = async (productId) => {
    try {
        await removeFromCartAPI(productId);
        window.dispatchEvent(new Event("cartUpdated"));
    } catch (err) {
        console.error("Error removing item", err);
    }
};

export const clearCart = async () => {
    try {
        await clearCartAPI();
        window.dispatchEvent(new Event("cartUpdated"));
    } catch (err) {
        console.error("Error clearing cart", err);
    }
};

// Create Order (Client-side) - DEPRECATED via API
export const createOrder = async (cartItems, totalAmount) => {
    console.warn("createOrder util is deprecated. Use placeOrderAPI.");
};

export const isInCart = (productId) => {
    // Cannot check synchronously anymore
    return false;
};

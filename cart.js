// Display cart items
function displayCartItems() {
    const cartItems = document.getElementById('cart-items');
    const subtotalElement = document.getElementById('subtotal');
    const totalElement = document.getElementById('total');
    
    if (cartItems) {
        cartItems.innerHTML = '';
        let subtotal = 0;
        
        if (cart.length === 0) {
            cartItems.innerHTML = '<p>Your cart is empty</p>';
        } else {
            cart.forEach(item => {
                const itemTotal = item.price * item.quantity;
                subtotal += itemTotal;
                
                const itemHTML = `
                    <div class="card mb-3">
                        <div class="card-body">
                            <div class="d-flex justify-content-between align-items-center">
                                <h5 class="card-title">${item.name}</h5>
                                <div class="quantity-controls">
                                    <button class="btn btn-sm btn-secondary" onclick="updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                                    <span class="mx-2">${item.quantity}</span>
                                    <button class="btn btn-sm btn-secondary" onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                                </div>
                            </div>
                            <p class="card-text">Price: $${item.price}</p>
                            <p class="card-text">Total: $${itemTotal.toFixed(2)}</p>
                            <button class="btn btn-danger btn-sm" onclick="removeItem(${item.id})">Remove</button>
                        </div>
                    </div>
                `;
                cartItems.innerHTML += itemHTML;
            });
        }
        
        subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
        totalElement.textContent = `$${(subtotal + 5).toFixed(2)}`;
    }
}

// Update item quantity
function updateQuantity(productId, newQuantity) {
    if (newQuantity < 1) {
        removeItem(productId);
        return;
    }
    
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = newQuantity;
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCartItems();
        updateCartCount();
    }
}

// Remove item from cart
function removeItem(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCartItems();
    updateCartCount();
}

// Show checkout form
function showCheckoutForm() {
    const modal = new bootstrap.Modal(document.getElementById('checkoutModal'));
    modal.show();
}

// Handle checkout form submission
document.getElementById('checkout-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Order placed successfully! (This is a demo)');
    cart = [];
    localStorage.removeItem('cart');
    displayCartItems();
    updateCartCount();
    const modal = bootstrap.Modal.getInstance(document.getElementById('checkoutModal'));
    modal.hide();
});

// Initialize cart page
document.addEventListener('DOMContentLoaded', () => {
    displayCartItems();
    updateCartCount();
});
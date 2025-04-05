// Display all products
function displayProducts(filteredProducts = products) {
    const productsGrid = document.getElementById('products-grid');
    if (productsGrid) {
        productsGrid.innerHTML = '';
        filteredProducts.forEach(product => {
            const productHTML = `
                <div class="col-md-4">
                    <div class="product-card">
                        <img src="${product.image}" alt="${product.name}">
                        <h3>${product.name}</h3>
                        <p>$${product.price}</p>
                        <button onclick="addToCart(${product.id})" class="btn btn-primary">Add to Cart</button>
                    </div>
                </div>
            `;
            productsGrid.innerHTML += productHTML;
        });
    }
}

// Filter products
function filterProducts() {
    const checkedPetTypes = Array.from(document.querySelectorAll('input[type="checkbox"]:checked'))
        .map(checkbox => checkbox.value);
    
    const priceRange = document.getElementById('priceRange').value;
    
    let filteredProducts = products;
    
    if (checkedPetTypes.length > 0) {
        filteredProducts = filteredProducts.filter(product => 
            checkedPetTypes.includes(product.category)
        );
    }
    
    filteredProducts = filteredProducts.filter(product => 
        product.price <= priceRange
    );
    
    displayProducts(filteredProducts);
}

// Initialize shop page
document.addEventListener('DOMContentLoaded', () => {
    displayProducts();
    updateCartCount();
    
    // Add event listeners for filters
    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', filterProducts);
    });
    
    document.getElementById('priceRange').addEventListener('input', filterProducts);
});
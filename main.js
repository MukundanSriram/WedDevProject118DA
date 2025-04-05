// Sample product data
const products = [
    {
        id: 1,
        name: "Premium Dog Food",
        price: 29.99,
        image: "img/dgf.webp",
        category: "dogs",
        description: "High-quality dog food for all breeds"
    },
    {
        id: 2,
        name: "Cat Scratching Post",
        price: 39.99,
        image: "img/csp.jpg",
        category: "cats",
        description: "Durable cat scratching post with platforms"
    },
    {
        id: 3,
        name: "Bird Cage",
        price: 49.99,
        image: "img/bcage.jpg",
        category: "birds",
        description: "Spacious, but a simple bird cage with plenty of room"
    },
    {
        id: 4,
        name: "Fish Tank Filter",
        price: 19.99,
        image: "img/fisht.jpeg",
        category: "fish",
        description: "Efficient aquarium filter system"
    }
];

// Cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
    }
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1
        });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

// Search functionality
function handleSearch(event) {
    const searchTerm = event.target.value.toLowerCase();
    const searchResults = document.getElementById('searchResults');
    
    if (searchTerm.length < 2) {
        searchResults.classList.remove('active');
        return;
    }

    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm)
    );

    searchResults.innerHTML = '';
    filteredProducts.forEach(product => {
        const resultItem = document.createElement('div');
        resultItem.className = 'search-result-item';
        resultItem.innerHTML = `
            <h6>${product.name}</h6>
            <p>$${product.price}</p>
        `;
        resultItem.addEventListener('click', () => {
            window.location.href = `shop.html#product-${product.id}`;
        });
        searchResults.appendChild(resultItem);
    });

    searchResults.classList.add('active');
}

// Close search results when clicking outside
document.addEventListener('click', (event) => {
    const searchResults = document.getElementById('searchResults');
    const searchInput = document.getElementById('searchInput');
    
    if (!searchInput?.contains(event.target)) {
        searchResults?.classList.remove('active');
    }
});

// Display featured products
function displayFeaturedProducts() {
    const featuredProducts = document.getElementById('featured-products');
    if (featuredProducts) {
        products.forEach(product => {
            const productHTML = `
                <div class="col-md-3">
                    <div class="product-card">
                        <img src="${product.image}" alt="${product.name}" class="img-fluid">
                        <h5>${product.name}</h5>
                        <p>$${product.price}</p>
                        <p class="text-muted">${product.description}</p>
                        <button onclick="addToCart(${product.id})" class="btn btn-primary">Add to Cart</button>
                    </div>
                </div>
            `;
            featuredProducts.innerHTML += productHTML;
        });
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    displayFeaturedProducts();
    updateCartCount();
    
    // Setup search functionality
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', handleSearch);
    }
});
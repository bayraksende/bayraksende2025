function createProductCard(product) {
    return `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="flex justify-between items-center mt-4">
                    <span class="product-price">$${product.price.toFixed(2)}</span>
                    <button onclick="addToCart(${product.id})" class="btn-primary">Add to Cart</button>
                </div>
            </div>
        </div>
    `;
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.addItem(product);
        alert('Product added to cart!');
    }
}

function renderProducts() {
    const productsContainer = document.getElementById('products');
    productsContainer.innerHTML = products.map(createProductCard).join('');
}

renderProducts();
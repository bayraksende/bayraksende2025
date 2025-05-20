

function createProductCard(product) {
    return `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="flex justify-between items-center mt-4">
                    <span class="product-price">${product.price.toFixed(2)}&#8378;</span>
                    <button onclick="addToCart(${product.id})" class="btn-primary">Add to Cart</button>
                </div>
            </div>
        </div>
    `;
}

function loadProducts() {
    fetch('/products.json')
    .then(response => response.json())
    .then(data => {
        window.products = data.products;
        renderProducts(window.products);
    })
    .catch(error => console.error('Error:', error))
}

function renderProducts(items) {
    const productsContainer = document.getElementById('products');
    productsContainer.innerHTML = items.map(createProductCard).join('');
}

function addToCart(productId) {
    fetch('/cart/add', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ productId })
    }).then(response => {
        if(response.status == 401){
            window.location.href = '/auth/login';
        } else {
            return response.json();
        }
    }).then(json => {
        if(json.error){
            Toastify({
                text: json.error,
                class: 'error',
                duration: 3000
                }).showToast();
        }
        else if(json.message){
            Toastify({
                text: json.message,
                class: 'success',
                duration: 3000
                }).showToast();
        }
    })
    
}

document.addEventListener('DOMContentLoaded', loadProducts);
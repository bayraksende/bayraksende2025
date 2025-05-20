const summaryElement = document.getElementById('cart-summary');


async function createCartItem(item) {
    return `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-info">
                <h3>${item.name}</h3>
                <p>${item.price.toFixed(2)}&#8378;</p>
            </div>
            <div class="cart-item-quantity">
                <button onclick="updateQuantity(${item.id}, ${item.quantity - 1})" class="btn-secondary">-</button>
                <span>${item.quantity}</span>
                <button onclick="updateQuantity(${item.id}, ${item.quantity + 1})" class="btn-secondary">+</button>
                <button onclick="removeItem(${item.id})" class="btn-primary">Remove</button>
            </div>
        </div>
    `;
}


function loadProducts() {
    fetch('/products.json')
        .then(response => response.json())
        .then(data => {
            window.products = data.products;
            getCart();
        })
        .catch(error => console.error('Error:', error))
       
}


function getCart() {
    fetch('/cart/getCart')
        .then(response => response.json())
        .then(data => {
            if (!window.products || !Array.isArray(window.products)) {
                console.error("window.products is not available or is not an array");
                return;
            }

            let totalPrice = 0; 
            if(data.cart.length === 0) {
                document.getElementById('cart-items').innerHTML = '<h3>Sepetinizde ürün bulunmamaktadır.</h3>';
                return;
            }
            data.cart.forEach(element => {

                const { productId, quantity } = element;
                const product = window.products.find(p => p.id === productId);

                if (!product) {
                    console.warn(`Product with ID ${productId} not found.`);
                    return;
                }

                const itemTotal = product.price * quantity; 
                totalPrice += itemTotal;

                createCartItem({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.image,
                    quantity: quantity
                }).then(html => {
                    document.getElementById('cart-items').innerHTML += html;
                });
            });


            const h3 = document.createElement('h3');
            h3.innerText = 'Fiyat Özeti';
            const p1 = document.createElement('p');
            p1.innerHTML = `Toplam Fiyat: <strong>${data.subTotal.toFixed(2)}&#8378;</strong>`;
            const p2 = document.createElement('p');
            p2.innerHTML = `Kupon: <strong>${data.discount.toFixed(2)}&#8378;</strong>`;
            const p3 = document.createElement('p');
            p3.innerHTML = `Ödenecek Tutar: <strong>${data.totalPrice.toFixed(2)}&#8378;</strong>`;
            summaryElement.appendChild(h3);
            summaryElement.appendChild(p1);
            summaryElement.appendChild(p2);
            summaryElement.appendChild(p3);

        })}


function updateQuantity(id, quantity) {
    fetch('/cart/update', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ productId: id, quantity })
    }).then(response => response.json()
    ).then(data => {
        showToast('Ürün miktarı güncellendi.')
        setTimeout(() => {
            window.location.reload()
        }, 3000)
    }).catch(error => {
        console.error('Error:', error)
    })
}

function removeItem(id) {
    fetch('cart/remove/' + id,
        {
            method: 'DELETE',
            credentials: 'include'
        }).then(response => response.json()
        ).then(data => {
            showToast('Ürün Silindi.')
            setTimeout(() => {
                window.location.reload()
            }, 3000)
        }).catch(error => {
            console.error('Error:', error)
        })
}


function showToast(message) {
    // Get the snackbar DIV
    var x = document.getElementById("snackbar");
  
    // Add the "show" class to DIV
    x.innerText = message
    x.className = "show";
    
  
    // After 3 seconds, remove the show class from DIV
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
  }

document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
})

document.getElementById('apply-coupon').addEventListener('click', () => {
    const couponCode = document.getElementById('coupon-code').value.trim();

    if (!couponCode) {
        showToast("Lütfen bir kupon kodu giriniz.");
        return;
    }

    fetch('/cart/coupon', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ coupon: couponCode }),
    })
        .then(response => {
            if (response.ok) {
                // Başarılı ise sayfayı yenile
                window.location.reload();
            } else {
                response.json().then(data => {
                    showToast(data.message || data.error || "Kupon uygulanamadı.");
                });
            }
        })
        .catch(error => {
            console.error('Hata:', error);
            showToast("Bir hata oluştu. Lütfen daha sonra tekrar deneyiniz.");
        });
});

document.getElementById('checkout').addEventListener('click', () => {
    fetch('/cart/checkout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    }).then(response => response.json())
        .then(response => {
            if (response.message) {
                Swal.fire({
                    title: "Ödeme Başarılı!",
                    text: "Siparişiniz işleme alınmıştır, önümüzdeki günlerde sizinle iletişime geçeceğiz!",
                    icon: "success"
                  }); 
            } else if (response.error) {
                showToast(response.error || "Ödeme işlemi gerçekleştirilemedi.");
            }
        })
        .catch(error => {
            console.error('Hata:', error);
            showToast("Bir hata oluştu. Lütfen daha sonra tekrar deneyiniz.");
        });
});



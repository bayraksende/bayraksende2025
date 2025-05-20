    class Cart {
    constructor() {
        this.items = JSON.parse(localStorage.getItem('cart')) || [];
    }

    addItem(product) {
        const existingItem = this.items.find(item => item.id === product.id);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.items.push({ ...product, quantity: 1 });
        }
        this.save();
    }

    updateQuantity(id, quantity) {
        const item = this.items.find(item => item.id === id);
        if (item) {
            item.quantity = quantity;
            if (item.quantity <= 0) {
                this.removeItem(id);
            } else {
                this.save();
            }
        }
    }

    removeItem(id) {
        this.items = this.items.filter(item => item.id !== id);
        this.save();
    }

    getTotal() {
        return this.items.reduce((total, item) => total + item.price * item.quantity, 0);
    }

    save() {
        localStorage.setItem('cart', JSON.stringify(this.items));
    }
}

const cart = new Cart();
const express = require('express')
const router = express.Router()
const path = require('path')
const fs = require('fs')

router.get('/', (req, res) => {
    if (!req.session.username) {
        res.redirect('/auth/login')
    } else {
        res.render('cart.ejs', { flag: req.session.flag || ' ' })
    }
})

router.get('/getCart', (req, res) => {
    if (!req.session.username) {
        res.redirect('/auth/login')
        return
    }

    if (!req.session.cart) {
        req.session.cart = []
    }

    const cart = req.session.cart || [];
    const discount = req.session.discount || [];
    let subTotal = 0;

    cart.forEach(item => {
        const productsFile = fs.readFileSync('public/products.json');
        const productData = JSON.parse(productsFile);
        const products = productData.products;
        const { productId, quantity } = item;
        const product = products.find(p => p.id === productId);

        const itemTotal = product.price * quantity; 
        subTotal += itemTotal;
    });
    subTotal = Math.floor(subTotal % 65535)    ;
    
    const disc = discount && discount[0] && discount[0].discount ? discount[0].discount : 0;
    const totalPrice = subTotal > 65535 ? ((subTotal  % 65535) - disc) : Math.round(subTotal - disc);
    const cartSummary = {
        subTotal: Math.floor(subTotal),
        totalPrice: Math.max(0, totalPrice),
        discount: disc,
    };
    console.log({
        disc,
        subTotal: Math.floor(subTotal),
        totalPrice: Math.max(0, totalPrice),
    })
    res.json({ cart, discount, ...cartSummary });
});

router.post('/add', (req, res) => {
    const { productId } = req.body;

    if(!req.session.username) {
        return res.status(401).json({ error: 'Oturum açmanız gerekmektedir.' });
    }
    
    if (!productId) {
        return res.status(400).json({ error: 'Ürün productId belirtilmelidir.' });
    }

    if (!req.session.cart) {
        req.session.cart = [];
    }

    const existingItem = req.session.cart.find(item => item.productId === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        req.session.cart.push({ productId, quantity: 1 });
    }

    res.json({ message: 'Ürün sepete eklendi.'});
});

router.delete('/remove/:productId', (req, res) => {
    const { productId } = req.params;

    if (!req.session.cart || !Array.isArray(req.session.cart)) {
        return res.status(400).json({ error: 'Sepet geçersiz.' });
    }

    const initialLength = req.session.cart.length;

    req.session.cart = req.session.cart.filter(item => item.productId !== Number(productId));

    if (req.session.cart.length === initialLength) {
        return res.status(404).json({ error: 'Ürün sepetinizde bulunamadı.' });
    }

    res.json({ message: 'Ürün sepetten çıkarıldı.', cart: req.session.cart });
});

router.post('/update', (req, res) => {
    const { productId, quantity } = req.body;

    if (!productId || quantity == null) {
        return res.status(400).json({ error: 'Ürün productId ve miktar belirtilmelidir.' });
    }

    if (!req.session.cart) {
        return res.status(400).json({ error: 'Sepet boş.' });
    }

    const itemIndex = req.session.cart.findIndex(item => item.productId === productId);

    if (itemIndex !== -1) {
        if (quantity <= 0) {
            req.session.cart.splice(itemIndex, 1);
            res.json({ message: 'Ürün sepetten kaldırıldı.', cart: req.session.cart });
        } else {
            req.session.cart[itemIndex].quantity = quantity;
            res.json({ message: 'Ürün miktarı güncellendi.', cart: req.session.cart });
        }
    } else {
        res.status(404).json({ error: 'Ürün bulunamadı.' });
    }
});

router.post('/coupon', (req, res) => {
    if (!req.session.username) {
        return res.status(401).json({ error: 'Oturum açmanız gerekmektedir.' });
    }

    const { coupon } = req.body;

    if (!req.session.discount) {
        req.session.discount = [];
    }

    if (coupon === 'hosgeldin1000') {
        if(req.session.discount.find(item => item.name === 'hosgeldin1000')) {
            return res.status(400).json({ message: 'Bu kupon zaten ekli.' });
        }
        req.session.discount.push({ name: 'hosgeldin1000', discount: 1000 });
        res.json({ message: 'hosgeldin1000 kuponu eklendi.', discount: req.session.discount });
    } else {
        res.status(400).json({ error: 'Geçersiz kupon.' });
    }
});

const getProducts = () => {
    const rawData = fs.readFileSync('public/products.json');
    const data = JSON.parse(rawData);
    return data.products;
};

router.post('/checkout', (req, res) => {
    if (!req.session.username) {
        return res.status(401).json({ error: 'Oturum açmanız gerekmektedir.' });
    }

    if (!req.session.cart || !Array.isArray(req.session.cart) || req.session.cart.length === 0) {
        return res.status(400).json({ error: 'Sepetinizde ürün bulunmamaktadır.' });
    }

    if (!req.session.discount) {
        req.session.discount = [];
    }

    const cart = req.session.cart;
    const discount = req.session.discount[0]?.discount || 0;

    const products = getProducts();
    let totalPrice = 0;
    let productList = []
    cart.forEach(item => {
        const product = products.find(p => p.id === item.productId);
        productList.push(item.productId)
        if (product) {
            totalPrice += product.price * item.quantity;
        }
    });
    console.log(productList)
    totalPrice = totalPrice % 65535

    if (totalPrice <= 0) {
        return res.status(400).json({ error: "Ödeme Başarısız! Toplam fiyat 0 veya daha küçük olamaz." });
    }

    if (discount > 0 && totalPrice > discount) {
        return res.status(400).json({ error: 'Ödeme Başarısız! Toplam fiyat kupon indirimini aşıyor.' });
    }

    if (discount == 0 && totalPrice > 0) {
        return res.status(400).json({ error: 'Ödeme Başarısız! Ödeme yapmak için kupon eklemelisiniz.' });
    }

    if (discount < 0) {
        return res.status(400).json({ error: 'Ödeme Başarısız! İndirim miktarı negatif olamaz.' });
    }

    if (discount > 0 && totalPrice <= discount) {
        req.session.cart = [];
        req.session.discount = [];
        if(productList.includes(5)) {
            req.session.flag = 'BayrakBende{B4rd4g1_T4s1r4n_S0n_D4ml4}'
        }
        return res.status(200).json({ message: 'Ödeme Başarılı!' });
    }
});

router.prefix = "/cart/"
module.exports = router
document.addEventListener('DOMContentLoaded', () => {
    const productForm = document.getElementById('product-form');
    const productNameInput = document.getElementById('product-name');
    const productPriceInput = document.getElementById('product-price');
    const productImageInput = document.getElementById('product-image');
    const productList = document.getElementById('product-list');

    const loadProducts = () => {
        productList.innerHTML = '';
        const products = JSON.parse(localStorage.getItem('products')) || [];
        products.forEach((product, index) => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>${product.price}</p>
                <button onclick="removeProduct(${index})">Eliminar</button>
            `;
            productList.appendChild(productCard);
        });
    };

    const saveProduct = (product) => {
        const products = JSON.parse(localStorage.getItem('products')) || [];
        products.push(product);
        localStorage.setItem('products', JSON.stringify(products));
        loadProducts();
    };

    window.removeProduct = (index) => {
        let products = JSON.parse(localStorage.getItem('products')) || [];
        products.splice(index, 1);
        localStorage.setItem('products', JSON.stringify(products));
        loadProducts();
    };

    productForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const productName = productNameInput.value.trim();
        const productPrice = productPriceInput.value.trim();
        const productImage = productImageInput.value.trim();
        if (productName && productImage && productPrice) {
            saveProduct({ name: productName, image: productImage, price: productPrice });
            productNameInput.value = '';
            productImageInput.value = '';
            productPriceInput.value = '';
        }
    });

    loadProducts();
});
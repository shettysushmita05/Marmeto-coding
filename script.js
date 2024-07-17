const productContainer = document.getElementById('product-container');
let productsData = [];

fetch('https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json')
    .then(response => response.json())
    .then(data => {
        console.log('Fetched Data:', data); 
        if (data && data.categories) {
            productsData = data.categories;
            showCategory('Men'); 
        } else {
            console.error('Unexpected data structure:', data);
        }
    })
    .catch(error => console.error('Error fetching product data:', error));

function showCategory(category) {
    console.log('Products Data:', productsData);

    if (!productsData || productsData.length === 0) {
        console.error('No product data available');
        return;
    }

    productContainer.innerHTML = '';
    document.querySelectorAll('.tab-button').forEach(button => button.classList.remove('active'));
    document.querySelector(`.tab-button[onclick="showCategory('${category}')"]`).classList.add('active');

    const categoryData = productsData.find(cat => cat.category_name === category);
    console.log('Category Data:', categoryData); 

    if (!categoryData || !categoryData.category_products || categoryData.category_products.length === 0) {
        productContainer.innerHTML = '<p>No products available for this category.</p>';
        return;
    }

    const filteredProducts = categoryData.category_products;
    console.log('Filtered Products for Category:', category, filteredProducts); 

    filteredProducts.forEach(product => {
        const discount = Math.round(((product.compare_at_price - product.price) / product.compare_at_price) * 100);

        const productCard = `
            <div class="product-card">
                <img src="${product.image}" alt="${product.title}">
                ${product.badge_text ? `<div class="badge">${product.badge_text}</div>` : ''}
                <div class="title-vendor-container">
                    <div class="title">${product.title}</div>
                    <div class="vendor">${product.vendor}</div>
                </div>
                <div class="price-container">
                    <div class="price">$${product.price}</div>
                    <div class="compare-price">$${product.compare_at_price}</div>
                    <div class="discount">${discount}% off</div>
                </div>
                <button class="add-to-cart">Add to Cart</button>
            </div>
        `;
        productContainer.innerHTML += productCard;
    });
}

let allProducts = [];

fetch('https://fakestoreapi.com/products')
    .then(response => response.json())
    .then(data => {
        allProducts = data;
        displayProducts(allProducts);
        document.getElementById('loading').style.display = 'none';
    });

// Display products
function displayProducts(products) {
    const productsGrid = document.getElementById('productsGrid');
    productsGrid.innerHTML = ''; // Clear previous content

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';

        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.title}" class="product-image">
            <div class="product-info">
                <div class="product-category">${product.category}</div>
                <h3 class="product-title">${product.title}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-price">$${product.price}</div>
                <div class="product-rating">Rating: ${product.rating.rate}/5 (${product.rating.count} reviews)</div>
                <button class="view-button">Add To Cart</button>
            </div>
        `;

        productsGrid.appendChild(productCard);
    });
}

// Sorting handler
document.getElementById('sort').addEventListener('change', (e) => {
    const sortValue = e.target.value;
    let sortedProducts = [...allProducts];

    if (sortValue === 'price-low-high') {
        sortedProducts.sort((a, b) => a.price - b.price);
    } else if (sortValue === 'price-high-low') {
        sortedProducts.sort((a, b) => b.price - a.price);
    } else if (sortValue === 'rating-high-low') {
        sortedProducts.sort((a, b) => b.rating.rate - a.rating.rate);
    }

    displayProducts(sortedProducts);
});

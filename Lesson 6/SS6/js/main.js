const fetchData = () =>{
    fetch('./data.json')
    .then(response => response.json())
    .then(data => {
        const productGrid = document.querySelector(".product-grid");
        productGrid.innerHTML = "";
        // console.log(data)
        productGrid.innerHTML = data.map(product => {
            return `
            <div class="product-card">
                <div class="product-image">
                    <img src="${product.image}" alt="T${product.name}">
                    <div class="product-tag">${product.popular}</div>
                </div>
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p class="product-description">${product.short_description}</p>
                    <div class="product-bottom">
                    <span class="price">${product.price}đ</span>
                    <a href="../chitiet/chitietsanpham.html?id=${product.id}" class="add-to-cart">
                        <i class="fa-solid fa-cart-plus"></i>
                        Thêm vào giỏ
                    </a>
                    </div>
                </div>
            </div>
            
            `
        }).join("")
    })
}

fetchData();
 // Xử lý sự kiện click cho các size
 document.querySelectorAll('.size-item').forEach(item => {
    item.addEventListener('click', function() {
        document.querySelectorAll('.size-item').forEach(i => {
            i.classList.remove('selected');
        });
        this.classList.add('selected');
    });
});
// Xử lý sự kiện click cho nút thêm vào giỏ hàng
document.querySelector('.add-to-cart-btn').addEventListener('click', function() {
    const selectedSize = document.querySelector('.size-item.selected');
    const selectedToppings = document.querySelectorAll('.topping-item.selected');
    
    const product = {
        name: document.querySelector('.product-title').textContent,
        size: selectedSize.querySelector('.size-name').textContent,
        price: selectedSize.querySelector('.size-price').textContent,
        toppings: Array.from(selectedToppings).map(item => 
            item.querySelector('label').textContent
        )
    };

    console.log('Thêm vào giỏ hàng:', product);
    alert('Đã thêm vào giỏ hàng!');
});


const fetchData = () =>{
    let url = new URLSearchParams(window.location.search);
    let productId = url.get('id');

    // console.log(productId)

    fetch('../SS6/data.json')
    .then(res => res.json())
    .then(data => {
        // console.log(data)

        const product = data.find(item => item.id.toString() === productId);
        // console.log(product)
        document.querySelector(".product-image-large").src = `../SS6/${product.image}`;
        document.querySelector(".product-title").innerHTML = product.name;
        document.querySelector(".product-price").innerHTML= `${product.price}đ`;
        document.querySelector(".product-description").innerHTML = product.Ingredient;
        document.querySelector(".size-price-M").innerHTML= `${product.size.M}đ`;
        document.querySelector('.size-price-L').innerHTML=`${product.size.L}đ`;

        document.querySelector(".ingredients").innerHTML = product.Ingredient.map(item => {
            return `
                 <li>${item}</li>
            `
        }).join("")


    })
}

fetchData()
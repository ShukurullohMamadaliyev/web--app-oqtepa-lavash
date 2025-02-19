 
    document.querySelector(".nav-links").addEventListener("wheel", function(e) {
        this.scrollLeft += e.deltaY;
    });
    
    document.addEventListener("DOMContentLoaded", function() {
        const buttons = document.querySelectorAll(".add-to-cart");
    
        buttons.forEach(button => {
            button.addEventListener("click", function() {
                const productName = this.previousElementSibling.previousElementSibling.textContent;
                console.log(`${productName} savatchaga qo'shildi!`);
            });
        });
    });
 
    

    document.addEventListener("DOMContentLoaded", function() {
        const modal = document.getElementById("modal");
        const closeModal = document.querySelector(".close");
        const quantityEl = document.getElementById("quantity");
        const cartNotification = document.getElementById("cart-notification");
        let quantity = 1;
    
        // Barcha "Qo'shish" tugmalarini olaylik
        document.querySelectorAll(".add-to-cart").forEach(button => {
            button.addEventListener("click", function() {
                const card = button.closest(".card");
                const productName = card.querySelector("p").textContent;
                const productPrice = card.querySelector("span").textContent;
    
                document.getElementById("product-name").textContent = productName;
                document.getElementById("product-price").textContent = "Narx: " + productPrice;
    
                modal.style.display = "flex";
            });
        });
    
        closeModal.addEventListener("click", function() {
            modal.style.display = "none";
        });
    
        document.getElementById("increase").addEventListener("click", function() {
            quantity++;
            quantityEl.textContent = quantity;
        });
    
        document.getElementById("decrease").addEventListener("click", function() {
            if (quantity > 1) {
                quantity--;
                quantityEl.textContent = quantity;
            }
        });
    
        // Savatchaga qo‘shish tugmasi
        document.getElementById("add-to-cart").addEventListener("click", function() {
            modal.style.display = "none";
    
            // Bildirish oynasini ko‘rsatish
            cartNotification.classList.add("show");
    
            // 3 soniyadan keyin o‘chirib tashlash
            setTimeout(() => {
                cartNotification.classList.remove("show");
            }, 3000);
        });
    });

    // Modal oynani ochish/yopish
function toggleCart() {
    document.getElementById("cartModal").classList.toggle("active");
}

// Savatga mahsulot qo‘shish
function addToCart(productName, price) {
    let cartItems = document.getElementById("cartItems");
    let totalPrice = document.getElementById("totalPrice");

    // Yangi element yaratish
    let item = document.createElement("div");
    item.innerHTML = `<p>${productName} - <strong>${price} so'm</strong></p>`;
    
    // Savatga qo‘shish
    cartItems.appendChild(item);
    
    // Jami narxni yangilash
    let currentTotal = parseInt(totalPrice.innerText) || 0;
    totalPrice.innerText = (currentTotal + price) + " so'm";
}

    
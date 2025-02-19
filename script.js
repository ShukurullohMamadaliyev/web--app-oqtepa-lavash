 
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
        let quantity = 1;
    
        // Qo'shish tugmalarini topish
        document.querySelectorAll(".add-to-cart").forEach(button => {
            button.addEventListener("click", function() {
                const productCard = this.parentElement;
                const productName = productCard.querySelector("p").textContent;
                const productPrice = productCard.querySelector("span").textContent;
    
                // Modal oynaga mahsulot nomi va narxini joylash
                document.getElementById("product-name").textContent = productName;
                document.getElementById("product-price").textContent = "Narx: " + productPrice;
                
                // Modal oynani ochish
                modal.style.display = "flex";
            });
        });
    
        // Modal oynani yopish
        closeModal.addEventListener("click", function() {
            modal.style.display = "none";
        });
    
        // Miqdorni oshirish va kamaytirish
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
    
        // Savatchaga qo'shish tugmasi
        document.getElementById("add-to-cart").addEventListener("click", function() {
            alert("Mahsulot savatchaga qo'shildi!");
            modal.style.display = "none";
        });
    });
    
 
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
        let selectedProduct = {};
    
        // "Qo'shish" tugmalarini tanlash
        document.querySelectorAll(".add-to-cart").forEach(button => {
            button.addEventListener("click", function() {
                const card = button.closest(".card");
                const productName = card.querySelector("p").textContent;
                const productPrice = parseInt(card.querySelector("span").textContent.replace(" so'm", ""));
    
                // Modal oynaga mahsulot ma'lumotlarini joylash
                document.getElementById("product-name").textContent = productName;
                document.getElementById("product-price").textContent = `Narx: ${productPrice} so'm`;
    
                selectedProduct = { name: productName, price: productPrice, quantity: 1 };
                quantityEl.textContent = selectedProduct.quantity;
    
                modal.style.display = "flex";
            });
        });
    
        closeModal.addEventListener("click", function() {
            modal.style.display = "none";
        });
    
        // Narxni yangilash funksiyasi
        function updatePrice() {
            const newPrice = selectedProduct.price * selectedProduct.quantity;
            document.getElementById("product-price").textContent = `Narx: ${newPrice} so'm`;
        }
    
        // Sonni oshirish
        document.getElementById("increase").addEventListener("click", function() {
            selectedProduct.quantity++;
            quantityEl.textContent = selectedProduct.quantity;
            updatePrice();
        });
    
        // Sonni kamaytirish
        document.getElementById("decrease").addEventListener("click", function() {
            if (selectedProduct.quantity > 1) {
                selectedProduct.quantity--;
                quantityEl.textContent = selectedProduct.quantity;
                updatePrice();
            }
        });
    
        // Savatchaga qo‘shish
        document.getElementById("add-to-cart").addEventListener("click", function() {
            modal.style.display = "none";
            addToCart(selectedProduct.name, selectedProduct.price, selectedProduct.quantity);
    
            // Bildirish oynasini ko‘rsatish
            cartNotification.classList.add("show");
            setTimeout(() => cartNotification.classList.remove("show"), 3000);
        });
    });
    
    // Savat modal oynasini ochish/yopish
    function toggleCart() {
        document.getElementById("cartModal").classList.toggle("active");
    }
    
    // Savatga mahsulot qo‘shish
    function addToCart(productName, price, quantity) {
        let cartItems = document.getElementById("cartItems");
        let totalPrice = document.getElementById("totalPrice");
    
        // Yangi element yaratish
        let item = document.createElement("div");
        item.innerHTML = `<p>${productName} (x${quantity}) - <strong>${price * quantity} so'm</strong></p>`;
    
        // Savatga qo‘shish
        cartItems.appendChild(item);
    
        // Jami narxni yangilash
        let currentTotal = parseInt(totalPrice.innerText.replace(" so'm", "")) || 0;
        totalPrice.innerText = (currentTotal + price * quantity) + " so'm";
    }
    
    document.getElementById("clear-cart").addEventListener("click", function() {
        let cartItems = document.getElementById("cartItems");
        let totalPrice = document.getElementById("totalPrice");
    
        // Savatchadagi barcha mahsulotlarni o‘chirish
        cartItems.innerHTML = "";
    
        // Jami narxni 0 so'm qilish
        totalPrice.innerText = "0 so'm";
    }); 





    function sendCartToTelegram() {
        let botToken = "7889586011:AAEfawk-CC14Z7q_zRlNNl5VabSpOc4ds9A"; // O'z tokeningiz
        let chatId = "5521343193"; // O'zingizning Telegram ID
        let cartItems = document.getElementById("cartItems").children;
        let totalPrice = document.getElementById("totalPrice").innerText;
    
        if (cartItems.length === 0) {
            alert("Savat bo‘sh! ❌");
            return;
        }
    
        // Raqamni kiritish oynasi
        let phoneNumber = prompt("📞 Iltimos, telefon raqamingizni kiriting:");
        if (!phoneNumber || phoneNumber.trim() === "") {
            alert("❌ Raqam kiritilmadi!");
            return;
        }
    
        // Mahsulotlarni ro‘yxatga aylantirish
        let message = `📞 *Telefon raqami:* ${phoneNumber}\n\n🛒 *Sizning buyurtmangiz:*\n\n`;
        for (let item of cartItems) {
            message += `📌 ${item.innerText}\n`;
        }
        message += `\n💰 *Jami narx:* ${totalPrice}`;
    
        // Telegramga jo‘natish
        fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                chat_id: chatId,
                text: message,
                parse_mode: "Markdown"
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log("✅ Buyurtma yuborildi:", data);
            alert("✅ Buyurtma qabul qilindi! Operatorlarimiz tez orada bog‘lanadi.");
        })
        .catch(error => {
            console.error("❌ Xatolik:", error);
            alert("❌ Xatolik yuz berdi, qayta urinib ko‘ring.");
        });
    }
    
    // "Buyurtma berish" tugmasiga event qo‘shish
    document.querySelector(".order-button").addEventListener("click", sendCartToTelegram);
    
    
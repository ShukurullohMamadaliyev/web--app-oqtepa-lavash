 
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
document.querySelector(".nav-links").addEventListener("wheel", function(e) {
    this.scrollLeft += e.deltaY;
});

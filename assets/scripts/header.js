$(document).ready(function () {
    function updateCartDisplay() {
        var cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        var total = 0;
        for (var i = 0; i < cartItems.length; i++) {
            total += cartItems[i].quantity;
        }
        $(".count").text(total);
    }

    updateCartDisplay();
});
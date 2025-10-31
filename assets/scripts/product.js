$.urlParam = function (name) {
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    return results[1] || 0;
}

var currentObjectID = decodeURIComponent($.urlParam('id'))
var allProductList = [];

$(document).ready(function () {
    $.get("/data/products.json", function (data) {
        allProductList = data;
        findItem(allProductList, currentObjectID)
    });

    // Événements du bouton "ajouter au panier"
    $(".product-form").submit(function (event) {
        event.preventDefault();
        
        // Quantité à ajouter: valeur du input
        var productQuantity = parseInt($("#product-quantity").val());
    
        
        let activeProduct;
        for (let i = 0; i < allProductList.length; i++) {
            var product = allProductList[i];
            var productId = product.id;
    
            if (productId == currentObjectID) {
                activeProduct = product;
                break;
            }
        }
        var productName = activeProduct.name;
        var productPrice = activeProduct.price;
        var cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    
        var existingCartItemIndex = cartItems.findIndex(item => item.name === productName);
    
        // Si déjà présent dans le panier
        if (existingCartItemIndex !== -1) {
            cartItems[existingCartItemIndex].quantity += productQuantity;
        } else {
            var newItem = {
                name: productName,
                price: productPrice,
                quantity: productQuantity
            };
            cartItems.push(newItem);
        }
        localStorage.setItem("cartItems", JSON.stringify(cartItems));

        $("#dialog").removeClass("hidden").fadeIn();

        // Cacher la boîte de dialogue après cinq secondes
        setTimeout(function() {
          $("#dialog").fadeOut();
        }, 5000);

        updateCartDisplay();
    });
    
});

// Trouver l'item en fonction de l'id passé en URL
function findItem(products, currentObjectID) {
    let activeProduct;
    for (let i = 0; i < products.length; i++) {
        var product = products[i];
        var productId = product.id;
        if (productId == currentObjectID) {
            activeProduct = product;
        }
    }
    displayItem(activeProduct);
}

// Modifier les displays HTML pour celles de l'objet demandé
function displayItem(product) {
    if (product) {
        $("#product-name").html(product.name)
        $("#product-image").attr("src", "./assets/img/" + product.image);
        $("#product-desc").html(product.description)
        $("#product-price").html(product.price + " $")

        // Ajouter les features
        var features = product.features;
        var featuresList = $("#product-features");
        featuresList.empty();
        for (let i = 0; i < features.length; i++) {
            $("<li>").text(features[i]).appendTo(featuresList);
        }
    } else {
        $("main").html("<h1>Page introuvable.</h1>")
    }
}

function updateCartDisplay(){
    var cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    var total = 0;
    for (var i = 0; i < cartItems.length; i++){
        total += cartItems[i].quantity;
    }
    $(".count").text(total);
}
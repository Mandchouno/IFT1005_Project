var allProductList = [];
var currentProductList = [];

function displayProductList(productList) {
  $("#products-list").empty();
  productList.forEach(function (product) {
    var html =
      '<a href="./product.html?id=' +
      product.id +
      '" title="En savoir plus...">' +
      "<h2>" +
      product.name +
      "</h2>" +
      '<img alt="' +
      product.name +
      '" src="./assets/img/' +
      product.image +
      '" />' +
      "<p><small>Prix</small> " +
      product.price +
      "&thinsp;$</p>" +
      "</a>";
    $("#products-list").append(html);
  });
  $("#products-count").text(productList.length + " produit(s)");
}

function sortFunction(criteria) {
  return function (a, b) {
    if (criteria === "price-asc") {
      return a.price - b.price;
    } else if (criteria === "price-desc") {
      return b.price - a.price;
    } else if (criteria === "name-asc") {
      return a.name.localeCompare(b.name);
    } else if (criteria === "name-desc") {
      return b.name.localeCompare(a.name);
    }
  };
}

function setProductCriteria(criteria) {
  $("#product-criteria > button").removeClass("selected");
  $("#" + criteria).addClass("selected");
  currentProductList = currentProductList.sort(sortFunction(criteria));
  allProductList = allProductList.sort(sortFunction(criteria));
  displayProductList(currentProductList);
}

function setProductCategories(category) {
  $("#product-categories > button").removeClass("selected");
  $("#" + category).addClass("selected");
  currentProductList = allProductList.filter(function (product) {
    if (category === "all") return true;
    return product.category === category;
  });
  displayProductList(currentProductList);
}

$(document).ready(function () {
  var productCriteria = "price-asc";

  $.get("/data/products.json", function (data) {
    allProductList = data;
    currentProductList = data;
    setProductCriteria(productCriteria);
  });

  $("#product-criteria > button").on("click", function () {
    var criteria = $(this).attr("id");
    setProductCriteria(criteria);
  });

  $("#product-categories > button").on("click", function () {
    var category = $(this).attr("id");
    setProductCategories(category);
  });
});

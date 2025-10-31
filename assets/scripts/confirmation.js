$(document).ready(function() {
  var orderNumber = localStorage.getItem('numConfirmation');
  var lastName = localStorage.getItem('last-name');
  var firstName = localStorage.getItem('first-name');

  document.getElementById("h1").innerHTML = "Votre commande est confirmée " + firstName + " " + lastName + " !"

  document.getElementById("p").innerHTML = "Votre numéro de confirmation est le 000" + orderNumber

});
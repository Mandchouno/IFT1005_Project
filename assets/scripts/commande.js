$(document).ready(function() {
    $("#order-form").validate({
        rules: {
            firstName: {
                required: true,
                minlength: 2
            },
            lastName: {
                required: true,
                minlength: 2
            },
            email: {
                required: true,
                email: true
            },
            phone: {
                required: true,
                phoneUS: true
            },
            creditCard: {
                required: true,
                creditcard: true 
            },
            creditCardExpiry: {
                required: true,
                creditcardexpiry: true 
            }
        },
        messages: {
            firstName: {
                required: "Ce champ est obligatoire",
                minlength: "Veuillez fournir au moins 2 caractères"
            },
            lastName: {
                required: "Ce champ est obligatoire",
                minlength: "Veuillez fournir au moins 2 caractères"
            },
            email: {
                required: "Ce champ est obligatoire",
                email: "L'adresse email est invalide"
            },
            phone: {
                required: "Ce champ est obligatoire",
                phoneUS: "Le numéro de téléphone est invalide"
            },
            creditCard: {
                required: "Ce champ est obligatoire",
                creditcard: "Le numéro de la carte de crédit est invalide"
            },
            creditCardExpiry: {
                required: "Ce champ est obligatoire",
                creditcardexpiry: "La date d'expiration de la carte de crédit est invalide"
            }
        }
    });
    jQuery.validator.addMethod("visa", function(value, element) {
        value = value.replace(/[-\s]+/g, ''); // Nettoyez l'entrée
        return this.optional(element) || (value.length === 16 && value.match(/^4[0-9]{12}(?:[0-9]{3})?$/));
    }, "Le numéro de la carte de crédit est invalide");    

    jQuery.validator.addMethod("creditcardexpiry", function(value, element) {
        return this.optional(element) || /^(0[1-9]|1[0-2])\/([0-9]{2})$/.test(value);
    }, "La date d'expiration de la carte de crédit est invalide");
    jQuery.validator.addMethod('phoneUS', function(phone_number, element) {
        phone_number = phone_number.replace(/\s+/g, ''); 
        return this.optional(element) || phone_number.length > 9 &&
            phone_number.match(/^(1-?)?(\([2-9]\d{2}\)|[2-9]\d{2})-?[2-9]\d{2}-?\d{4}$/);
    }, 'Le numéro de téléphone est invalide.');
    

    var numConfirmation = 1; 

    function stocker() {
        
        console.log("test")
        var prenom = document.getElementById("first-name").value
        var nom = document.getElementById("last-name").value

        localStorage.setItem("last-name", nom)
        localStorage.setItem("first-name", prenom)
        localStorage.setItem("numConfirmation", numConfirmation)
        numConfirmation += 1
        window.location = "/confirmation.html"
    }
});


var form = document.querySelector("form");

form.onsubmit = function (event) {
    event.preventDefault();

    var flowerType = document.getElementById("flower-type").value;
    var quantity = document.getElementById("quantity").value;
    var wrapColor = document.getElementById("wrap-color").value;
    var cardText = document.getElementById("card-text").value.trim();
    var deliveryDate = document.getElementById("delivery-date").value;

    if (flowerType == "") {
        alert("Please choose flower type");
        return false;
    }

    if (quantity == "" || quantity < 10 || quantity > 100 || isNaN(quantity)) {
        alert("Quantity must be between 10 and 100");
        return false;
    }

    if (cardText.length > 50) {
        alert("Card text must be less than 50 characters");
        return false;
    }

    if (deliveryDate == "") {
        alert("Please choose delivery date and time");
        return false;
    }

    var price = 0;

    if (flowerType == "jouri") {
        price = quantity * 8;
    } else if (flowerType == "tulip") {
        price = quantity * 10;
    } else if (flowerType == "lily") {
        price = quantity * 12;
    } else if (flowerType == "orchid") {
        price = quantity * 15;
    }

    var orderData = {
        flowerType: flowerType,
        quantity: quantity,
        wrapColor: wrapColor,
        cardText: cardText,
        deliveryDate: deliveryDate,
        totalPrice: price
    };

    fetch("http://localhost:3000/orders", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(orderData)
    })
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        alert(data.message + " Total price is " + price + " SAR");

        if (data.success == true) {
            form.reset();
        }
    })
    .catch(function () {
        alert("Cannot connect to server");
    });
};

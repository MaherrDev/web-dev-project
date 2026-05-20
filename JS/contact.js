var form = document.querySelector("form");

form.onsubmit = function (event) {
    event.preventDefault();

    var firstName = document.getElementById("fname").value.trim();
    var lastName = document.getElementById("lname").value.trim();
    var phone = document.getElementById("phone").value.trim();
    var dob = document.getElementById("dob").value;
    var email = document.getElementById("email").value.trim();
    var language = document.getElementById("lang").value;
    var message = document.getElementById("msg").value.trim();
    var gender = document.querySelector("input[name='gender']:checked");

    if (firstName == "" || lastName == "" || phone == "" || dob == "" || email == "" || language == "" || message == "") {
        alert("Please fill all fields");
        return false;
    }

    if (gender == null) {
        alert("Please choose gender");
        return false;
    }

    if (phone.length != 10 || phone.substring(0, 2) != "05" || isNaN(phone)) {
        alert("Phone number must start with 05 and contain 10 numbers");
        return false;
    }

    if (email.indexOf("@") == -1 || email.indexOf(".") == -1) {
        alert("Please enter a correct email");
        return false;
    }

    if (message.length < 10) {
        alert("Message must be at least 10 characters");
        return false;
    }

    var contactData = {
    firstname: firstName,
    lastname: lastName,
    gender: gender.value,
    mobile: phone,
    birthdate: dob,
    email: email,
    language: language,
    message: message
};

    fetch("http://localhost:3000/contact", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(contactData)
    })
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        alert(data.message);

        if (data.success == true) {
            form.reset();
        }
    })
    .catch(function () {
        alert("Cannot connect to server");
    });
};

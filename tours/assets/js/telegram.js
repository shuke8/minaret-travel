document.querySelector(".proceed-link button").addEventListener("click", function(event) {
    console.log("Button clicked");
    event.preventDefault(); // Prevent the default form submission

    // Serialize all form data into an object
    const formData = {};
    const formElements = document.querySelectorAll(".site-form form input, .site-form form select");

    formElements.forEach(function(element) {
        if (element.type !== "checkbox" || element.checked) {
            formData[element.name] = element.value;
        }
    });

    // Get the selected payment method using the value attribute
    const paymentMethodSelect = document.querySelector(".site-form form select[name='payment-method']");
    const selectedPaymentMethod = paymentMethodSelect.value;

    // Your Telegram Bot Token (Replace with your actual Bot Token)
    const botToken = "6413722833:AAEIFbmhmEmfU9gtP-fQ0lt-IpmzGORZNAY";

    // Your Telegram Chat ID (Replace with your actual Chat ID)
    const chatId = "-4070419751";

    // Create a message with all the form data and selected payment method
    let message = "New booking:\n";
    for (const key in formData) {
        message += `${key}: ${formData[key]}\n`;
    }

    message += `Payment Method: ${selectedPaymentMethod}`;



    // Send the message to Telegram
    fetch(`https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(message)}`)
        .then((response) => response.json())
        .then((data) => {
            if (data.ok) {
                // Check for the selected payment method
                if (selectedPaymentMethod === "payme") {

                    var amountElement = document.querySelector("body > div.page-wrapper > div.dsp-container.tour-single > div > div > div.sidebar-side.col-xl-4.col-lg-8.col-md-12.col-sm-12 > div > div > div > div.t-book-header > span.amount").textContent.replace(/[^0-9]/g, '');
                    var paymeNormalizeSum = parseFloat(amountElement) * 100;
                    var userTourElement = document.querySelector("body > div.page-wrapper > div.dsp-container.tour-single > div > div > div.content-side.col-xl-8.col-lg-12.col-md-12.col-sm-12 > div > div.sp-header > div.loc-rat.clearfix > div").textContent;
                    var userNameElement = document.querySelector("body > div.page-wrapper > div.dsp-container.tour-single > div > div > div.sidebar-side.col-xl-4.col-lg-8.col-md-12.col-sm-12 > div > div > div > div.lower-box > div > form > div.fields > div:nth-child(1) > div.field-inner > input[type=text]").value;
                    var userPhoneElement = document.querySelector("body > div.page-wrapper > div.dsp-container.tour-single > div > div > div.sidebar-side.col-xl-4.col-lg-8.col-md-12.col-sm-12 > div > div > div > div.lower-box > div > form > div.fields > div:nth-child(2) > div.field-inner > input[type=tel]").value;
                    // Create a form element
                    var form = document.createElement('form');
                    form.method = 'POST';
                    form.action = 'https://checkout.paycom.uz';
                    form.target = '_blank';

                    // Create input elements and set their values
                    var merchantInput = document.createElement('input');
                    merchantInput.type = 'hidden';
                    merchantInput.name = 'merchant';
                    merchantInput.value = '65320c6b3ad464cc74d2e6ae';
                    form.appendChild(merchantInput);

                    var amountInput = document.createElement('input');
                    amountInput.type = 'hidden';
                    amountInput.name = 'amount';
                    amountInput.value = paymeNormalizeSum;
                    form.appendChild(amountInput);

                    var invoiceInput = document.createElement('input');
                    invoiceInput.type = 'hidden';
                    invoiceInput.name = 'account[username]';
                    invoiceInput.value = userNameElement;
                    form.appendChild(invoiceInput);

                    var invoiceInput = document.createElement('input');
                    invoiceInput.type = 'hidden';
                    invoiceInput.name = 'account[userphone]';
                    invoiceInput.value = userPhoneElement;
                    form.appendChild(invoiceInput);

                    var invoiceInput = document.createElement('input');
                    invoiceInput.type = 'hidden';
                    invoiceInput.name = 'account[usertour]';
                    invoiceInput.value = userTourElement;
                    form.appendChild(invoiceInput);

                    var callbackInput = document.createElement('input');
                    callbackInput.type = 'hidden';
                    callbackInput.name = 'callback';
                    callbackInput.value = '/';
                    form.appendChild(callbackInput);

                    // Create a submit button
                    var submitButton = document.createElement('input');
                    submitButton.type = 'submit';
                    form.appendChild(submitButton);

                    // Append the form to the document body
                    document.body.appendChild(form);

                    // Submit the form
                    form.submit();

                } else if (selectedPaymentMethod === "cash") {
                    window.location.href = "https://minaret-travel.vercel.app/";
                } else {
                    alert("Booking submitted successfully!");
                }
            } else {
                alert("Booking submission failed.");
            }
        })
        .catch((error) => {
            console.error("Error: " + error);
        });
});
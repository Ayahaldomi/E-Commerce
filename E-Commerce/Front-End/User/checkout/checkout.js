const baseUrl = "https://localhost:7000";



    // Retrieve the stored data from localStorage
    const storedData = localStorage.getItem("userID");

    // Parse the string to convert it back into an object
    const parsedData = JSON.parse(storedData);
    
    // Access the userId
    const userID = JSON.parse(storedData);

async function GetCartItems(userId) {
    const url = `${baseUrl}/api/Cart/GetAllCartItemsByUserId/${userId}`; 

    const request = await fetch(url);
    const response = await request.json();

    const cartItemsContainer = document.getElementById("CartItemsContainer");
    cartItemsContainer.innerHTML = ""; // Clear existing entries

    let orderTotal = 0;

    response.forEach(element => {
        const subtotal = element.prodcutDTO.price * element.quantity;
        orderTotal += subtotal;
        const row = `
            <tr>
                <td>${element.prodcutDTO.name} <strong>× ${element.quantity}</strong></td>
                <td>$${subtotal.toFixed(2)}</td>
            </tr>`;
        cartItemsContainer.innerHTML += row; // Append new rows to the table
    });

    // Set fixed shipping and VAT for demonstration
    const shippingCost = 15.00;
    const vatCost = 0.00; // Assume 0% VAT for simplicity, update as needed

    document.getElementById("shippingCost").textContent = `$${shippingCost.toFixed(2)}`;
    document.getElementById("vatCost").textContent = `$${vatCost.toFixed(2)}`;

    // Calculate final order total including shipping and VAT
    orderTotal += shippingCost + vatCost;
    
    // Update order total in the designated row
    document.getElementById("orderTotal").textContent = `$${orderTotal.toFixed(2)}`;
    document.getElementById("orderTotalHidden").value = `${orderTotal.toFixed(2)}`;
}

GetCartItems(userID);



async function FillAutomatic() {
    
    const url = `${baseUrl}/api/UserFillAutomatic/GetUserById/1`;
    const request = await fetch(url);
    const data = await request.json();

    
    nameInput = document.getElementById("name");
    nameInput.value = data.name;

    phoneNumberInput = document.getElementById("phoneNumber");
    phoneNumberInput.value = data.phoneNumber;

    addressInput = document.getElementById("address");
    addressInput.value = data.address;
    
}


// async function PaypalPayment() {
//     const url = "https://localhost:7000/api/Payment/create";
//     const request = await fetch(url);
//     const data = await request.json();

    
// }


async function AddOrders() {
   
    
    var coponId = document.getElementById('coupon-code').value; // Assuming you want the value of the input
    var totalAmount = document.getElementById("orderTotalHidden").value; // Assuming you want the value, not the element

    const formData = {
        userId: userID,
        amount: parseFloat(totalAmount), // Ensure it's treated as a float number
        coponId: parseInt(coponId, 10), // Assuming it's an integer, parse it to ensure it's sent as a number
        status: "Pending",
        transactionId: "123456789"
    };

    try {
        const response = await fetch("https://localhost:7000/api/Order/CreateOrder", {
            method: "POST",
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json' // Corrected header syntax
            }
        });

        if (!response.ok) {
            throw new Error('Network response was not ok: ' + response.statusText);
        }

        const data = await response.json(); // Assuming the server responds with JSON
        console.log(data); // Log or handle the response data as needed
        alert("Order successfully created!");
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        alert("Failed to create order!");
    }
}

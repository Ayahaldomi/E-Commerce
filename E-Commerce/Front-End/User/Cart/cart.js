const baseUrl = "https://localhost:7000"; 

// Function to simulate login and store a fake token in localStorage

// note: there should be a function in login logic to store the token


    // Retrieve the stored data from localStorage
const storedData = localStorage.getItem("userID");

// Parse the string to convert it back into an object
const parsedData = JSON.parse(storedData);

// Access the userId
const userID = JSON.parse(storedData);



// Check if the user is logged in by checking the presence of the token
function isUserLoggedIn() {
    return !!localStorage.getItem('userID'); // If token exists, return true
}

// // note: there should be a function in logout logic to remove the token
function logoutUser() {
    localStorage.removeItem('userID'); // Remove token from localStorage
}

// Function to load all cart items by user ID
async function GetCartItems(userId) {
    debugger;
    if(userId == null) {
        GetCartItemslocal();
        
    }
    const url = `${baseUrl}/api/Cart/GetAllCartItemsByUserId/${userId}`; 
    try {
        const request = await fetch(url);
        const response = await request.json();
        
        if (!response.length) {
            console.error("No cart items found.");
            alert("No cart items found.");

            return;
        }

        const cartItemsContainer = document.getElementById("cart-items-container");
        cartItemsContainer.innerHTML = ""; // Clear any existing content

        let cartSubtotal = 0;

        response.forEach((item) => {
            let itemPrice = item.prodcutDTO.price;
            let itemQuantity = item.quantity;
            let itemSubtotal = itemPrice * itemQuantity;

            cartSubtotal += itemSubtotal;

            let row = `
            <tr>
                <td class="cart-product-remove">
                    <button onclick="removeCartItem(${item.userId}, ${item.productId})">x</button>
                </td>
                <td class="cart-product-image">
                    <a href="product-details.html"><img src="${item.prodcutDTO.image}" alt="${item.prodcutDTO.name}"></a>
                </td>
                <td class="cart-product-info">
                    <h4><a href="product-details.html">${item.prodcutDTO.name}</a></h4>
                </td>
                <td class="cart-product-price">$${item.prodcutDTO.price.toFixed(2)}</td>
                <td class="cart-product-quantity">
                    <div class="cart-plus-minus">
                        <button class="dec qtybutton" onclick="changeQuantity(${item.userId}, ${item.productId}, ${item.quantity}, 'dec')">-</button>
                        <input type="number" value="${item.quantity}" name="qtybutton" class="cart-plus-minus-box" id="quantity-${item.cartItemId}">
                        <button class="inc qtybutton" onclick="changeQuantity(${item.userId}, ${item.productId}, ${item.quantity}, 'inc')">+</button>
                    </div>
                </td>
                <td class="cart-product-subtotal">$${itemSubtotal.toFixed(2)}</td>
            </tr>
            `;
            cartItemsContainer.innerHTML += row;
        });

        document.getElementById("cart-subtotal").innerText = `$${cartSubtotal.toFixed(2)}`;
        document.getElementById("order-total").innerText = `$${(cartSubtotal + 15).toFixed(2)}`; // Assuming $15 shipping fee

    } catch (error) {
        console.error("Error fetching cart items:", error);
    }
}

// Function to handle checkout, ensuring the user is logged in
function proceedToCheckout() {
    if (!isUserLoggedIn()) {
        window.location.href = '../Login/Register/login&register.html'; // Redirect to login if user isn't logged in
    } else {
        window.location.href = '../checkout/checkout.html'; // Proceed to checkout if logged in
    }
}

// Function to change quantity based on whether + or - is clicked
async function changeQuantity(userId, productId, currentQuantity, action) {
    let quantityChange = currentQuantity;

    if (action === 'inc') {
        quantityChange++;
    } else if (action === 'dec') {
        quantityChange--;
    }

    if (quantityChange === 0) {
        removeCartItem(userId, productId);
        return;
    }

    const url = `${baseUrl}/api/Cart/UpdateCartItem`;

    try {
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: userId,
                productId: productId,
                quantityChange: quantityChange - currentQuantity
            }),
        });

        if (response.ok) {
            console.log(`Quantity updated for product ${productId} to ${quantityChange}`);
            GetCartItems(userID); // Refresh cart
        } else {
            console.error(`Failed to update quantity for product ${productId}`);
        }
    } catch (error) {
        console.error("Error updating quantity:", error);
    }
}

// Function to remove a cart item
async function removeCartItem(userId, productId) {
    const url = `${baseUrl}/api/Cart/UpdateCartItem`;

    try {
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: userId,
                productId: productId,
                quantityChange: -1000 // Trigger removal
            }),
        });

        if (response.ok) {
            console.log(`Cart item for product ${productId} removed successfully`);
            GetCartItems(userId); // Refresh the cart
        } else {
            console.error(`Failed to remove cart item for product ${productId}`);
        }
    } catch (error) {
        console.error("Error removing cart item:", error);
    }
}

// Call the function to load the cart items (assuming a static userId, replace it dynamically)
GetCartItems(userID);  // Replace with dynamic userId if needed


function GetCartItemslocal(){
    var existingCart = localStorage.getItem("cart");
        var cart = JSON.parse(existingCart);

        const cartItemsContainer = document.getElementById("cart-items-container");
        cartItemsContainer.innerHTML = ""; // Clear any existing content

        let cartSubtotal = 0;

        cart.forEach(element => {
            let itemPrice = element.price;
            let itemQuantity = element.quantity;
            let itemSubtotal = itemPrice * itemQuantity;

            cartSubtotal += itemSubtotal;

            let row = `
            <tr>
                <td class="cart-product-remove">
                    <button onclick="removeCartItem( ${element.productId})">x</button>
                </td>
                <td class="cart-product-image">
                    <a href="product-details.html"><img src="${element.image}" alt="${element.name}"></a>
                </td>
                <td class="cart-product-info">
                    <h4><a href="product-details.html">${element.name}</a></h4>
                </td>
                <td class="cart-product-price">$${element.price}</td>
                <td class="cart-product-quantity">
                    <div class="cart-plus-minus">
                        <button class="dec qtybutton" onclick="changeQuantity(${element.productId}, ${element.quantity}, 'dec')">-</button>
                        <input type="number" value="${element.quantity}" name="qtybutton" class="cart-plus-minus-box" id="quantity-${element.cartItemId}">
                        <button class="inc qtybutton" onclick="changeQuantity( ${element.productId}, ${element.quantity}, 'inc')">+</button>
                    </div>
                </td>
                <td class="cart-product-subtotal">$${itemSubtotal.toFixed(2)}</td>
            </tr>
            `;
            cartItemsContainer.innerHTML += row;
        });

        document.getElementById("cart-subtotal").innerText = `$${cartSubtotal.toFixed(2)}`;
        document.getElementById("order-total").innerText = `$${(cartSubtotal + 15).toFixed(2)}`; // Assuming $15 shipping fee

       
} 

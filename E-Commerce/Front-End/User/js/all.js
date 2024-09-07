const storedData = localStorage.getItem("userID");

// Parse the string to convert it back into an object
const parsedData = JSON.parse(storedData);

// Access the userId
const userID = JSON.parse(storedData);

async function addToCart(id, name, price, image) {
    debugger;
    var q = document.getElementById("Quantity")
    if (q == null) {
       var  Quantity = 1;
    }else {
        var  Quantity = q.value; 
    }
    if (userID > 0 || userID != null) {
    var requist = await fetch('https://localhost:7000/api/Cart/CreateNewCartItem', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            productId: id,
            userId: 1,
            quantity: Quantity

        })
    });
}else{
    var storeInlocal = {
        "productId": id,
        "userId": 0,
        "quantity": Quantity,
        "name" : name,
        "price" : price,
        "image" : image

      }

    // Check if a cart exists in localStorage
  var existingCart = localStorage.getItem("cart");

  // If cart exists, parse it, else create an empty array
  var cart = existingCart ? JSON.parse(existingCart) : [];

  // Add the new item to the cart
  cart.push(storeInlocal);

  // Save the updated cart back to localStorage
  localStorage.setItem("cart", JSON.stringify(cart));
}
    
}
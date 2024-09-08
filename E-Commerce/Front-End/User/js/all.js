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

      // Check if the product already exists in the cart by productId
      const itemIndex = cart.findIndex(item => item.productId === storeInlocal.productId);

      if (itemIndex !== -1) {
        // If the product exists, update its quantity
        cart[itemIndex].quantity += storeInlocal.quantity;
    } else {
        // If the product doesn't exist, add it to the cart
        cart.push(storeInlocal);
    }

  // Save the updated cart back to localStorage
  localStorage.setItem("cart", JSON.stringify(cart));
}
showAddToCartModal(id, name, price, image)   
}

function showAddToCartModal(id, name, price, image) {
    // Update the product image
    document.getElementById("modal-product-img").src = image;
    document.getElementById("modal-product-img").alt = name;

    // Update the product name and link
    document.getElementById("modal-product-name").innerHTML = `<a href="product-details.html?id=${id}">${name}</a>`;

    // Open the modal using Bootstrap's modal method
    var myModal = new bootstrap.Modal(document.getElementById('add_to_cart_modal'), {
        keyboard: false
    });
    myModal.show();
}

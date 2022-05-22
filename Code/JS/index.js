function AddToCart(prodId) {
    var cart = JSON.parse(localStorage.getItem('cart')) // get cart data
    var price = document.getElementById(prodId).innerHTML.substring(1);// to remove the $ from the span tag value
    price = parseFloat(price); // convert from string to int

    if (cart) {  //if cart is not empty or null
        var product = cart.find(x => x.prodId == prodId) // find the particular product in the cart array
        if (!product) { // if the product is not in the array then....
            let qty = 1;
            product = { qty, price, prodId }
            cart.push(product) // add product to the cart array
        }
        else if (product) { // id the product is in the array then....
            product.qty++; // increment the qty by 1
            product.price = product.qty * price; // set the new price by multiplying the qty and the product price 
        }
    }
    else {
        cart = [] // set cart to an empty array
        var product = { prodId, qty: 1, price } // declaring the product object
        cart.push(product) // adding product to the cart
    }

    localStorage.setItem('cart', JSON.stringify(cart)) // storing the array in localstorage
}
SetCartItems()


function AddToCart(prodId) {
    var cart = JSON.parse(localStorage.getItem('cart')) // get cart data
    var price = document.getElementById(prodId).innerHTML.substring(1);// to remove the $ from the span tag value
    price = parseFloat(price); // convert from string to int

    if (cart) {  //if cart is not empty or null
        var product = cart.find(x => x.prodId == prodId) // find the particular product in the cart array
        if (!product) { // if the product is not in the array then....
            var qty = document.getElementsByName(`qty_${prodId}`)[0].value; // Get The Qty available on the screen
            qty = parseInt(qty);
            if (qty == 0) qty++;
            product = { qty, price: price * qty, prodId, mrp: price }
            cart.push(product) // add product to the cart array
        }
        else if (product) { // id the product is in the array then....
            var qty = document.getElementsByName(`qty_${prodId}`)[0].value; // Get The Qty available on the screen
            qty = parseInt(qty);
            if (qty == product.qty) qty++
            product.qty = qty;
            product.price = product.qty * price; // set the new price by multiplying the qty and the product price 
        }
    }
    else {
        cart = [] // set cart to an empty array
        var qty = document.getElementsByName(`qty_${prodId}`)[0].value; // Get The Qty available on the screen
        qty = parseInt(qty);
        if (qty == 0) qty++;
        var product = { prodId, qty, price: price * qty, mrp: price } // declaring the product object
        cart.push(product) // adding product to the cart
    }

    localStorage.setItem('cart', JSON.stringify(cart)) // storing the array in localstorage
    SetCartItems()
}

function Plus(name) {
    var input = document.getElementsByName(name)[0]
    var inp = input.value
    input.value = 0;
    if (inp) {
        inp = parseInt(inp);
        inp++;
        input.value = inp;
    }
}

function Minus(name) {
    var input = document.getElementsByName(name)[0]
    var inp = input.value
    if (inp) {
        inp = parseInt(inp);
        inp--;
        input.value = inp;
        var cart = JSON.parse(localStorage.getItem('cart'))
        var product = cart.find(x => x.prodId == name.substring(4))
        product.qty = inp;
        product.price -= product.mrp
        localStorage.setItem('cart', JSON.stringify(cart))
    }
}

function SetCartItems() {
    var cart = JSON.parse(localStorage.getItem('cart'))
    cart.forEach(x =>
        document.getElementsByName(`qty_${x.prodId}`)[0].value = x.qty
    );
}
let ArrProducts = [
    {
        id: 1,
        name: "Redmi Note 8",
        image: "1.png",
        price: "20000",
        rating: 5,
    },

    {
        id: 2,
        name: "Dell XPS 13-9350",
        image: "2.png",
        price: "55000",
        rating: 5,
    },

    {
        id: 3,
        name: "JBL Bar 5.1 Soundbar",
        image: "3.png",
        price: "65000",
        rating: 4,
    },

    {
        id: 4,
        name: "Office And Desk Chiars",
        image: "4.png",
        price: "10000",
        rating: 4,
    },

    {
        id: 5,
        name: "USB Battery Charger",
        image: "5.png",
        price: "20000",
        rating: 3,
    },

    {
        id: 6,
        name: "Computer Keyboard With Backlights",
        image: "6.png",
        price: "25000",
        rating: 4.5,
    },

    {
        id: 7,
        name: "Korg Electronic Piano Keyboard",
        image: "7.png",
        price: "30000",
        rating: 4,
    },

    {
        id: 8,
        name: "Intel Dell Acer Aspire",
        image: "8.png",
        price: "70000",
        rating: 4.5,
    },

    {
        id: 9,
        name: "Marshall Kilburn Loudspeaker Stereophonic sound Bluetooth",
        image: "9.png",
        price: "80000",
        rating: 4.5,
    },
];

const body = document.querySelector("body"),
    products = document.querySelector(".products"),
    shoppingBasket = document.querySelector(".shoppingBasket"),
    closeCart = document.querySelector(".close"),
    productList = document.querySelector(".productList"),
    quantity = document.querySelector(".quantity"),
    total = document.querySelector(".totalPrice");

let checkOutList = [];

shoppingBasket.onclick = () => {
    body.classList.add("active");
};

closeCart.onclick = () => {
    body.classList.remove("active");
};

function onInIt() {
    ArrProducts.forEach((item, key) => {
        let div = document.createElement("div");
        div.classList.add("item");
        
       let star = "";
       for(i=0; i <item.rating; i++) {
        star += `<i class = "fa fa-star"></i>`;
       }

        div.innerHTML = `
        <img src="images/${item.image}" />
        <div class="name">${item.name}</div>
        <div>${star}</div>
        <div class="price"> <small>₹</small> ${item.price}</div>
        <button onclick="addToCart(${key})"><i class="fa fa-cart-plus"></i> Add To Cart </button>
        `;

        products.appendChild(div);
    });
}
onInIt();

function addToCart(Id) {
    if (checkOutList[Id] == null) {
        checkOutList[Id] = ArrProducts[Id];
        checkOutList[Id].quantity = 1;
    }else{
       checkOutList[Id] .quantity += 1;
    }
    reloadCart();
}

function reloadCart() {
    productList.innerHTML = "";
    
    let count = 0;
    let totalPrice = 0;

    checkOutList.forEach((item, key) => {
        totalPrice += parseInt(item.price*item.quantity)
        count += item.quantity;

        let li = document.createElement("li");
        li.innerHTML = `
        <img src="images/${item.image}">
        <div>${item.name}</div>
        <div>${item.price}</div>
        <div> <button onclick="changeQuantity(${key}, ${item.quantity - 1})"> - </button>
        <div class="count"> ${item.quantity} </div>
        <button onclick="changeQuantity(${key}, ${item.quantity + 1})"> + </button> </div>
        `;

        productList.appendChild(li);
    });

    total.innerHTML = `<small>Subtotal (${count} items) ₹ </small>` + totalPrice;
    quantity.innerHTML = count;
}

function changeQuantity(key, quantity){
    if(quantity == 0){
        delete checkOutList[key];
    }
    else{
        checkOutList[key].quantity = quantity;
    }
    reloadCart();
}
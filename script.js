// @ts-nocheck
/* =========================================
   DATA MENU
========================================= */

const menuData = [

    {
        id: 1,
        name: "Cheese Burger",
        category: "makanan",
        price: 28000,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=700&q=80",
        description: "Burger dengan daging juicy, keju, selada, tomat, dan saus spesial."
    },

    {
        id: 2,
        name: "Crispy Chicken",
        category: "makanan",
        price: 25000,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1562967916-eb82221dfb92?auto=format&fit=crop&w=700&q=80",
        description: "Ayam crispy renyah dengan bumbu spesial yang gurih."
    },

    {
        id: 3,
        name: "Beef Steak",
        category: "makanan",
        price: 55000,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1546241072-48010ad2862c?auto=format&fit=crop&w=700&q=80",
        description: "Steak daging sapi lembut dengan saus spesial dan kentang."
    },

    {
        id: 4,
        name: "Spicy Ramen",
        category: "makanan",
        price: 32000,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=700&q=80",
        description: "Ramen kuah pedas dengan telur, sayuran, dan topping ayam."
    },

    {
        id: 5,
        name: "Iced Coffee",
        category: "minuman",
        price: 18000,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=700&q=80",
        description: "Kopi dingin creamy dengan rasa kopi yang kuat dan nikmat."
    },

    {
        id: 6,
        name: "Matcha Latte",
        category: "minuman",
        price: 22000,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1515823064-d6e0c04616a7?auto=format&fit=crop&w=700&q=80",
        description: "Matcha premium dengan susu creamy dan rasa yang lembut."
    },

    {
        id: 7,
        name: "Strawberry Milk",
        category: "minuman",
        price: 20000,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=700&q=80",
        description: "Susu segar dengan strawberry manis dan creamy."
    },

    {
        id: 8,
        name: "Chocolate Frappe",
        category: "minuman",
        price: 24000,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=700&q=80",
        description: "Minuman cokelat dingin dengan whipped cream."
    },

    {
        id: 9,
        name: "Choco Cake",
        category: "dessert",
        price: 23000,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=700&q=80",
        description: "Cake cokelat lembut dengan lapisan cokelat premium."
    },

    {
        id: 10,
        name: "Cheesecake",
        category: "dessert",
        price: 25000,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=700&q=80",
        description: "Cheesecake creamy dengan rasa keju yang lembut."
    },

    {
        id: 11,
        name: "French Fries",
        category: "snack",
        price: 15000,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=700&q=80",
        description: "Kentang goreng renyah dengan bumbu gurih."
    },

    {
        id: 12,
        name: "Chicken Wings",
        category: "snack",
        price: 27000,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1527477396000-e27163b481c2?auto=format&fit=crop&w=700&q=80",
        description: "Chicken wings renyah dengan saus pilihan."
    }

];


/* =========================================
   STATE
========================================= */

let cart = JSON.parse(localStorage.getItem("foodoraCart")) || [];

let favorites =
    JSON.parse(localStorage.getItem("foodoraFavorites")) || [];

let currentCategory = "all";


/* =========================================
   ELEMENT
========================================= */

const menuGrid = document.getElementById("menuGrid");
const favoriteGrid = document.getElementById("favoriteGrid");

const searchInput =
    document.getElementById("searchInput");

const cartSidebar =
    document.getElementById("cartSidebar");

const overlay =
    document.getElementById("overlay");

const cartItems =
    document.getElementById("cartItems");

const cartCount =
    document.getElementById("cartCount");

const subtotal =
    document.getElementById("subtotal");

const serviceFee =
    document.getElementById("serviceFee");

const totalPrice =
    document.getElementById("totalPrice");

const toast =
    document.getElementById("toast");

const toastMessage =
    document.getElementById("toastMessage");


/* =========================================
   FORMAT RUPIAH
========================================= */

function formatRupiah(number) {

    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0
    }).format(number);

}


/* =========================================
   RENDER MENU
========================================= */

function renderMenu() {

    const search =
        searchInput.value.toLowerCase().trim();

    const filtered = menuData.filter(item => {

        const categoryMatch =
            currentCategory === "all" ||
            item.category === currentCategory;

        const searchMatch =
            item.name.toLowerCase().includes(search) ||
            item.description.toLowerCase().includes(search);

        return categoryMatch && searchMatch;

    });

    menuGrid.innerHTML = "";

    if (filtered.length === 0) {

        menuGrid.innerHTML = `
            <div style="
                grid-column:1/-1;
                text-align:center;
                padding:50px;
                color:var(--muted);
            ">
                <i class="fa-solid fa-magnifying-glass"
                   style="font-size:35px;margin-bottom:15px">
                </i>

                <p>Menu tidak ditemukan.</p>
            </div>
        `;

        return;
    }

    filtered.forEach(item => {

        menuGrid.innerHTML += createCard(item);

    });

}


/* =========================================
   CREATE CARD
========================================= */

function createCard(item) {

    const isFavorite =
        favorites.includes(item.id);

    return `

        <div class="menu-card">

            <img
                class="menu-image"
                src="${item.image}"
                alt="${item.name}"
            >

            <button
                class="favorite-btn ${isFavorite ? "active" : ""}"
                onclick="toggleFavorite(${item.id})"
            >
                <i class="fa-${isFavorite ? "solid" : "regular"} fa-heart"></i>
            </button>

            <div class="card-content">

                <span class="card-category">
                    ${item.category}
                </span>

                <h3>${item.name}</h3>

                <p class="card-description">
                    ${item.description}
                </p>

                <div class="card-bottom">

                    <div>

                        <div class="price">
                            ${formatRupiah(item.price)}
                        </div>

                        <div class="rating">
                            ⭐ ${item.rating}
                        </div>

                    </div>

                    <div class="card-buttons">

                        <button
                            class="detail-btn"
                            onclick="showDetail(${item.id})"
                        >
                            <i class="fa-solid fa-eye"></i>
                        </button>

                        <button
                            class="add-btn"
                            onclick="addToCart(${item.id})"
                        >
                            <i class="fa-solid fa-plus"></i>
                        </button>

                    </div>

                </div>

            </div>

        </div>

    `;

}


/* =========================================
   CATEGORY
========================================= */

document.querySelectorAll(".category")
.forEach(button => {

    button.addEventListener("click", () => {

        document.querySelectorAll(".category")
        .forEach(btn =>
            btn.classList.remove("active")
        );

        button.classList.add("active");

        currentCategory =
            button.dataset.category;

        renderMenu();

    });

});


/* =========================================
   SEARCH
========================================= */

searchInput.addEventListener("input", renderMenu);


/* =========================================
   ADD CART
========================================= */

function addToCart(id) {

    const item =
        menuData.find(product => product.id === id);

    const existing =
        cart.find(product => product.id === id);

    if (existing) {

        existing.quantity++;

    } else {

        cart.push({
            id: item.id,
            quantity: 1
        });

    }

    saveCart();

    updateCart();

    showToast(
        `${item.name} ditambahkan ke keranjang`
    );

}


/* =========================================
   UPDATE CART
========================================= */

function updateCart() {

    cartItems.innerHTML = "";

    if (cart.length === 0) {

        cartItems.innerHTML = `

            <div class="empty-cart">

                <i class="fa-solid fa-cart-shopping"></i>

                <h3>Keranjang masih kosong</h3>

                <p>Yuk pilih menu favoritmu!</p>

            </div>

        `;

    }

    let subtotalValue = 0;

    let totalQuantity = 0;

    cart.forEach(cartItem => {

        const item =
            menuData.find(
                product => product.id === cartItem.id
            );

        const total =
            item.price * cartItem.quantity;

        subtotalValue += total;

        totalQuantity += cartItem.quantity;

        cartItems.innerHTML += `

            <div class="cart-item">

                <img
                    src="${item.image}"
                    alt="${item.name}"
                >

                <div class="cart-item-info">

                    <h4>${item.name}</h4>

                    <div class="cart-item-price">
                        ${formatRupiah(item.price)}
                    </div>

                    <div class="quantity">

                        <button
                            onclick="changeQuantity(${item.id}, -1)"
                        >
                            −
                        </button>

                        <span>
                            ${cartItem.quantity}
                        </span>

                        <button
                            onclick="changeQuantity(${item.id}, 1)"
                        >
                            +
                        </button>

                    </div>

                </div>

            </div>

        `;

    });


    const fee =
        cart.length > 0 ? 3000 : 0;

    const total =
        subtotalValue + fee;


    cartCount.textContent =
        totalQuantity;

    subtotal.textContent =
        formatRupiah(subtotalValue);

    serviceFee.textContent =
        formatRupiah(fee);

    totalPrice.textContent =
        formatRupiah(total);

}


/* =========================================
   CHANGE QUANTITY
========================================= */

function changeQuantity(id, amount) {

    const item =
        cart.find(product => product.id === id);

    if (!item) return;

    item.quantity += amount;

    if (item.quantity <= 0) {

        cart =
            cart.filter(product => product.id !== id);

    }

    saveCart();

    updateCart();

}


/* =========================================
   SAVE CART
========================================= */

function saveCart() {

    localStorage.setItem(
        "foodoraCart",
        JSON.stringify(cart)
    );

}


/* =========================================
   OPEN CART
========================================= */

document.getElementById("cartBtn")
.addEventListener("click", () => {

    cartSidebar.classList.add("active");

    overlay.classList.add("active");

});


/* =========================================
   CLOSE CART
========================================= */

function closeCart() {

    cartSidebar.classList.remove("active");

    overlay.classList.remove("active");

}

document.getElementById("closeCart")
.addEventListener("click", closeCart);

overlay.addEventListener("click", closeCart);


/* =========================================
   FAVORITE
========================================= */

function toggleFavorite(id) {

    if (favorites.includes(id)) {

        favorites =
            favorites.filter(item => item !== id);

        showToast("Dihapus dari favorit");

    } else {

        favorites.push(id);

        showToast("Ditambahkan ke favorit ❤️");

    }

    localStorage.setItem(
        "foodoraFavorites",
        JSON.stringify(favorites)
    );

    renderMenu();

    renderFavorites();

}


/* =========================================
   RENDER FAVORITES
========================================= */

function renderFavorites() {

    const favoriteItems =
        menuData.filter(item =>
            favorites.includes(item.id)
        );

    favoriteGrid.innerHTML = "";

    if (favoriteItems.length === 0) {

        favoriteGrid.innerHTML = `

            <div style="
                grid-column:1/-1;
                text-align:center;
                padding:40px;
                color:var(--muted);
            ">

                <i class="fa-regular fa-heart"
                   style="
                       font-size:40px;
                       margin-bottom:15px;
                   ">
                </i>

                <p>
                    Belum ada menu favorit.
                </p>

            </div>

        `;

        return;
    }

    favoriteItems.forEach(item => {

        favoriteGrid.innerHTML +=
            createCard(item);

    });

}


/* =========================================
   DETAIL MENU
========================================= */

function showDetail(id) {

    const item =
        menuData.find(product => product.id === id);

    document.getElementById("detailImage").src =
        item.image;

    document.getElementById("detailName").textContent =
        item.name;

    document.getElementById("detailCategory").textContent =
        item.category;

    document.getElementById("detailRating").textContent =
        item.rating;

    document.getElementById("detailDescription").textContent =
        item.description;

    document.getElementById("detailPrice").textContent =
        formatRupiah(item.price);

    document.getElementById("detailAddBtn")
        .onclick = () => {

            addToCart(item.id);

            closeDetail();

        };

    document.getElementById("detailModal")
        .classList.add("active");

}


function closeDetail() {

    document.getElementById("detailModal")
        .classList.remove("active");

}


/* =========================================
   RANDOM MENU
========================================= */

document.getElementById("randomBtn")
.addEventListener("click", () => {

    const random =
        menuData[
            Math.floor(
                Math.random() * menuData.length
            )
        ];

    document.getElementById("randomResult")
        .innerHTML = `

            <img
                src="${random.image}"
                style="
                    width:90px;
                    height:90px;
                    object-fit:cover;
                    border-radius:15px;
                    margin-bottom:10px;
                "
            >

            <strong>
                ${random.name}
            </strong>

            <small style="
                color:#aaa;
                margin:5px 0 10px;
            ">
                ⭐ ${random.rating}
                • ${formatRupiah(random.price)}
            </small>

            <button
                class="primary-btn"
                onclick="addToCart(${random.id})"
            >
                <i class="fa-solid fa-plus"></i>
                Tambahkan
            </button>

        `;

});


/* =========================================
   CHECKOUT
========================================= */

document.getElementById("checkoutBtn")
.addEventListener("click", () => {

    if (cart.length === 0) {

        showToast("Keranjang masih kosong!");

        return;

    }

    document.getElementById("successModal")
        .classList.add("active");

});


function closeSuccess() {

    document.getElementById("successModal")
        .classList.remove("active");

    cart = [];

    saveCart();

    updateCart();

    closeCart();

    showToast("Terima kasih sudah memesan! 🎉");

}


/* =========================================
   DARK MODE
========================================= */

const themeBtn =
    document.getElementById("themeBtn");

themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    const isDark =
        document.body.classList.contains("dark");

    localStorage.setItem(
        "foodoraDark",
        isDark
    );

    themeBtn.innerHTML = isDark
        ? '<i class="fa-solid fa-sun"></i>'
        : '<i class="fa-solid fa-moon"></i>';

});


/* =========================================
   LOAD DARK MODE
========================================= */

if (
    localStorage.getItem("foodoraDark") === "true"
) {

    document.body.classList.add("dark");

    themeBtn.innerHTML =
        '<i class="fa-solid fa-sun"></i>';

}


/* =========================================
   TOAST
========================================= */

function showToast(message) {

    toastMessage.textContent =
        message;

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    }, 2500);

}


/* =========================================
   SCROLL MENU
========================================= */

function scrollToMenu() {

    document.getElementById("menu")
        .scrollIntoView({
            behavior: "smooth"
        });

}


/* =========================================
   CLOSE MODAL WHEN CLICK OUTSIDE
========================================= */

document.getElementById("detailModal")
.addEventListener("click", function(e) {

    if (e.target === this) {

        closeDetail();

    }

});


document.getElementById("successModal")
.addEventListener("click", function(e) {

    if (e.target === this) {

        closeSuccess();

    }

});


/* =========================================
   INITIALIZE
========================================= */

renderMenu();

renderFavorites();

updateCart();

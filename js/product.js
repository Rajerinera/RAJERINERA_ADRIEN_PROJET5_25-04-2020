// Afin de récuperer les données de l'url

const params = new URLSearchParams(window.location.search)
const idProduit = params.get('id')

// localStorage qui est initialisé
let getProduct = localStorage.getItem("adrienR_p5")
let productData = JSON.parse(getProduct)

// récuperer les données selectionnées de l'url
fetch("http://localhost:3000/api/cameras/" + idProduit)
    .then(response => {
        response.json().then(produitChoose => {
            detailProduct(produitChoose);
            addCartProduct(produitChoose);
        })
})
// mettre en place la fonction pour un produit avec sa description et son objectif
function detailProduct(produitChoose) {

    document.getElementById("imgProduct").setAttribute("src", produitChoose.imageUrl);
    document.getElementById("nameProduct").innerHTML = produitChoose.name;
    document.getElementById("descriptionProduct").innerHTML = "Description du produit: " + produitChoose.description;
    document.getElementById("priceProduct").innerHTML = "Prix: " + produitChoose.price / 100 + " €";
    console.log(produitChoose._id)


    let lenses = produitChoose.lenses
    for (let i = 0; i < lenses.length; i++) {
        const selectLenses = document.getElementById('selectLenses');
        const optionLenses = document.createElement('option');
        optionLenses.value = lenses[i];
        optionLenses.innerText = lenses[i];
        selectLenses.appendChild(optionLenses);
    }
}

// Mettre en place le nombre de produit selectionné
function value() {
    const selectQuantite = document.getElementById('selectQuantite');
    for (let i = 1; i <= 20; i++) {
        const option = document.createElement('option');
        option.value = i
        option.innerText = i
        selectQuantite.appendChild(option)
    }
};
value();


function index_cart() {
    if (productData == null) {
        console.log("Panier vide")
    } else {
        let indexCart = document.getElementById("index_cart");
        indexCart.textContent = productData.length;
    }
}
index_cart()

function valueCart() {
    if (productData == null) {
        console.log("Panier vide")
    } else {
        let valueCart = document.getElementById("value_cart");
        console.log("le nombre de produit dans votre panier est de " + productData.length)
        valueCart.textContent = ": " + "(" + productData.length + ")";
    }
}
valueCart()

function addCartProduct(produitChoose){
const buy = document.getElementById("panier");
buy.addEventListener("click",  async function () {
    alert("Votre article a été correctement ajouté dans votre Panier");
    let cartStorage = localStorage.getItem("adrienR_p5")
    const cameraItem = await {
        _id: produitChoose._id,
        name: produitChoose.name,
        price: produitChoose.price,
        quantity: selectQuantite.value,
    }

    if (!cartStorage) {
        cartStorage = []

    } else {
        cartStorage = JSON.parse(cartStorage);
    }
    cartStorage.push(cameraItem)

    const panierStringified = JSON.stringify(cartStorage)
    localStorage.setItem("adrienR_p5", panierStringified)// renvoyer dans un localStorage les données selectionnées
})
}
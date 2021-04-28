
// récupérer les données du localStorage
const getProduct = localStorage.getItem("adrienR_p5")
let productData = JSON.parse(getProduct)


// Création du tableau pour l'apparition des prix
// tr = Celule du tableau 
// th = Entête du tableau 
// td = Contenu du tableau

function addCart() {
  if (productData.length > 0) {

    document.getElementById("cart_empty").remove();

    const table = document.getElementById('table')

    // création du tableau
    let tr = document.createElement('tr')
   
    // creation des entêtes
    let th_name = document.createElement('th') 
    let th_price = document.createElement('th')
    let th_quantity = document.createElement('th')
    let th_remove = document.createElement('th')

    // implémentation des différents éléments du tableau 
    table.appendChild(tr)
    tr.appendChild(th_name)
    tr.appendChild(th_price)
    tr.appendChild(th_quantity)
    tr.appendChild(th_remove)

    // implémentation du texte dans les entêtes
    th_name.textContent = "Votre produit"
    th_price.textContent = "Prix"
    th_quantity.textContent = "Quantité"
    th_remove.textContent = " "

    for (let i = 0; i < productData.length; i++) {

      // création des cellules
      let tr_container = document.createElement('tr')

      // création du cellules qui contiendront les données du tableau
      let td_name = document.createElement('td')
      let td_price = document.createElement('td')
      let td_quantity = document.createElement('td')
      let td_remove = document.createElement("td");
      let removeArticle = document.createElement("a");

      // Attribut du bouton "Supprimer"
      removeArticle.setAttribute("id", "remove" + [i])
      removeArticle.setAttribute("title", "Supprimer");
      removeArticle.setAttribute("class", "remove1")

      console.log(i);

      removeArticle.addEventListener("click", (event) => {this.annulerArticle(i);})

      // implémentation des cellules dans le tableau 
      table.appendChild(tr_container)
      tr_container.appendChild(td_name)
      tr_container.appendChild(td_price)
      tr_container.appendChild(td_quantity)
      tr_container.appendChild(td_remove)
      td_remove.appendChild(removeArticle);

      // implémentation des données qui seront dans les cellules du tableau
      td_name.innerHTML = productData[i].name
      td_price.innerHTML = productData[i].price / 100 + " €"
      td_quantity.innerHTML = productData[i].quantity
      console.log(productData[i].name);
    };

    // création d'un tableau qui montre le total des produits.
    let tr_container_total = document.createElement("tr")
    let th_total = document.createElement("th")
    let td_total = document.createElement("td")

    table.appendChild(tr_container_total);
    tr_container_total.appendChild(th_total);
    tr_container_total.appendChild(td_total)


    th_total.textContent = "Total :"
    td_total.setAttribute("id", "totalCartS")

    let totalPaid = 0

    for (let i = 0; i < productData.length; i++) {
      totalPaid += productData[i].price / 100 * productData[i].quantity
    }
    document.getElementById("totalCartS").textContent = totalPaid + " €"
    console.log("le total au sein du panier est de " + totalPaid)
  }
}
addCart()

//bouton pour supprimer tous les articles
annulerArticle = (i) => {
  productData.splice(i, 1);
   localStorage.clear();
   // Mise à jour du nouveau panier avec suppression de l'article
   localStorage.setItem("adrienR_p5", JSON.stringify(productData));
   //Mise à jour de la page pour affichage de la suppression au client
   window.location.reload();
 };  


// Bouton pour supprimer les articles dans le panier
const btn_remove = document.querySelector("#button_remove")
btn_remove.addEventListener("click", removeItem)
function removeItem() {
  localStorage.removeItem("adrienR_p5")
  productData = []

  table.innerHTML = ""
  let a_lien = document.createElement("a")
  a_lien.className = "button_remove1"
  a_lien.href = "../index.html"
  a_lien.textContent = "Revenir à vos achats!"
  table.appendChild(a_lien)

};

//---------------------------FORMULAIRE----------------//

//vérifie les inputs du formulaire
const checkInput = () => {
  //Controle Regex
  let checkNumber = /[0-9]/;
  let checkMail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  let checkSpecialCharacter = /[§!@#$%^&*().?":{}|<>]/;

  //message fin de controle
  let checkMessage = "";

  //Récupération des inputs

  let nom = document.getElementById("nom").value;
  let prenom = document.getElementById("prenom").value;
  let email = document.getElementById("email").value;
  let adresse = document.getElementById("adresse").value;
  let ville = document.getElementById("ville").value;

  //tests des différents input du formulaire
  //Test du nom
  if (
    checkNumber.test(nom) == true ||
    checkSpecialCharacter.test(nom) == true ||
    nom.trim().length == 0
  ) {
    checkMessage = "Veuillez vérifier les informations concernant votre nom. Les caractères spéciaux ou les chiffres ne sont pas autorisés";
  } else {
    console.log("Nom accepté");
  }
  //Test du prénom
  if (
    checkNumber.test(prenom) == true ||
    checkSpecialCharacter.test(prenom) == true ||
    prenom.trim().length == 0
  ) {
    checkMessage = checkMessage + "\n" + "Veuillez vérifier les informations concernant votre prénom. Les caractères spéciaux ou les chiffres ne sont pas autorisés";
  } else {
    console.log("Prénom accepté");
  }
  //Test du mail
  if (checkMail.test(email) == false) {
    checkMessage = checkMessage + "\n" + "Veuillez vérifier les informations concernant votre email. Les caractères spéciaux ne sont pas autorisés";
  } else {
    console.log("Adresse mail acceptée");
  }
  //Test de l'adresse
  if (checkSpecialCharacter.test(adresse) == true || adresse.trim().length == 0) {
    checkMessage = checkMessage + "\n" + "Veuillez vérifier les informations concernant votre adresse postale. Les caractères spéciaux ne sont pas autorisés";
  } else {
    console.log("Adresse postale acceptée");
  }
  //Test de la ville
  if (
    (checkSpecialCharacter.test(ville) == true ||
      checkNumber.test(ville) == true) ||
    ville.trim().length == 0
  ) {
    checkMessage = checkMessage + "\n" + "Veuillez vérifier les informations concernant votre ville. Les caractères spéciaux ou les chiffres ne sont pas autorisés";
  } else {
    console.log("Ville acceptée");
  }
  //Si un des champs n'est pas conforme
  if (checkMessage != "") {
    alert("Attention certaines données ne sont pas conformes :" + "\n" + checkMessage);
  }
  //Si le formulaire est validé le formulaire est ajouté dans la variable "contact"
  else {
    contact = {
      lastName: nom,
      firstName: prenom,
      address: adresse,
      city: ville,
      email: email,
    };
    return contact;
  }
};

//Vérification du panier
const checkPanier = () => {
  //Vérifier qu'il y ai au moins un produit dans le panier
  let productData = JSON.parse(localStorage.getItem("adrienR_p5"));
  //Si le panier est vide ou null
  if (productData.length < 1 || productData == null) {
    alert("Votre panier est vide");
    return false;
  } else {
    console.log("Le panier n'est pas vide");
    return true;
  }
};


//Tableau et objet demandé par l'API pour la commande
let contact;
let products = [];
let url = "http://localhost:3000/api/cameras/order";

// fonction pour l'envoi de l'API
const sendFormule = (sendForm, url) => {
  return new Promise((resolve) => {
    let request = new XMLHttpRequest();
    request.onreadystatechange = function () {
      if (this.readyState == XMLHttpRequest.DONE && this.status == 201) {
        sessionStorage.setItem("order", this.responseText);
        window.location = "./pagevalid.html"
        resolve(JSON.parse(this.responseText));
        console.log(sendForm);
      } else {
      }
    };
    request.open("POST", url);
    request.setRequestHeader("Content-Type", "application/json");
    request.send(sendForm);
    console.log(sendForm);
  });
};


// fonction pour la confirmation de la commande
confirmCommande = () => {
  let commander = document.getElementById("envoi");
  commander.addEventListener("submit", (event) => {
    event.preventDefault()
    //Si le panier n'est pas vide et que le formulaire est valide les données sont envoyé à l'api
    if (checkPanier() == true && checkInput() != null) {
      console.log("L'envoi peut etre fait");
      productData.forEach((produit) => {
        products.push(produit._id);
      });
      console.log("Ce tableau sera envoyé à l'API : " + products);

      //Création de l'objet à envoyer
      let commande = {
        contact,
        products,
      };

      let sendForm = JSON.stringify(commande); //stringifié l'objet pour le rendre visible par le serveur
      sendFormule(sendForm, url);
      console.log(commande);

      //Une fois la commande effectuée retour à l'état initial des tableaux/objet/localStorage
      contact = {};
      products = [];
      localStorage.clear();
    } else {
      console.log("ERROR");
    }
  });
};


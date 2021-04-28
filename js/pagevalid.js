// récupération de la session storage de la page précédente
const orderP5 = sessionStorage.getItem("order")
let order = JSON.parse(orderP5)

// création de la commande avec le nom et l'ID des produits selectionnés
orderResult = () => {
  if (orderP5 != null) {
    document.getElementById("firstName").innerHTML = order.contact.firstName;
    document.getElementById("orderId").innerHTML = order.orderId;
    console.log(order);
    sessionStorage.removeItem("order");
  }
  //Redirection vers l'accueil
  else {
    alert("Merci pour votre commande. A bientôt");
    window.location = "../index.html"
  }
};


// confirmation et rappel des produits selectionnées
confirmRecap = () => {
  let confirmCart = document.getElementById("confirmation-recap");

  //Création de la structure du tableau récapitulatif
  let recapCommand = document.createElement("table");
  let ligneConfirm = document.createElement("tr");
  let coloneConfirmName = document.createElement("th");
  let coloneConfirmPrice = document.createElement("th");
  let confirmTotal = document.createElement("tr");
  let coloneConfirmTotal = document.createElement("th");

  //Placement de la structure dans la page

  confirmCart.appendChild(recapCommand);
  recapCommand.appendChild(ligneConfirm);
  recapCommand.appendChild(confirmTotal);
  ligneConfirm.appendChild(coloneConfirmName);
  ligneConfirm.appendChild(coloneConfirmPrice);
  ligneConfirm.appendChild(coloneConfirmTotal);
  confirmTotal.appendChild(coloneConfirmTotal);


  //contenu des entetes
  coloneConfirmName.textContent = "Produits :";
  coloneConfirmName.setAttribute("class", "th_title")
  coloneConfirmPrice.textContent = "Prix :";
  coloneConfirmPrice.setAttribute("class", "th_title");
  coloneConfirmTotal.textContent = "Total :";
  coloneConfirmTotal.setAttribute("class", "th_title")

  for (let i = 0; i < order.products.length; i++) {
    td_nameCart = document.createElement("td")
    td_priceCart = document.createElement("td")


    coloneConfirmName.appendChild(td_nameCart)
    coloneConfirmPrice.appendChild(td_priceCart)


    td_nameCart.innerHTML = order.products[i].name
    td_priceCart.innerHTML = order.products[i].price / 100 + " €"
  }


  // total des produits affiché dans la page de confirmation
  let totalRecap = document.createElement("td")
  totalRecap.setAttribute("id", "recapTotal")
  coloneConfirmTotal.appendChild(totalRecap)
  let paidRecap = 0

  for (let i = 0; i < order.products.length; i++) {
    paidRecap += order.products[i].price / 100
    console.log("le total est: " + paidRecap)
  }

  document.getElementById("recapTotal").textContent = paidRecap + " €"
}
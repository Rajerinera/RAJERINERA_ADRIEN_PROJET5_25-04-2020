// récupération de l'ajax pour récuperer les données de l'api
fetch("http://localhost:3000/api/cameras")
.then(res => {
    console.log(res);
    if(res.ok){
        res.json().then(items => {
            itemsShow(items)
        })
    } else{
        console.log("Erreur stp")
    }
})

// la fonction pour montrer les items au sein de la page index.html
 async function itemsShow(items) {
    let ul = document.querySelector('#camera-items-1');

    for (let i = 0; i < items.length; i++) {
        let li = document.createElement('li');
        let a = document.createElement('a');
        a.href = "html/product.html?id=" + items[i]._id

        li.className = 'li_items';
        let items_name = document.createElement('h4');
        let items_price = document.createElement('p');
        let items_img = document.createElement('img');


        items_name.textContent = items[i].name; //nom du produit
        items_price.textContent = 'Prix: ' + items[i].price / 100 + ' €' //prix du produit
        items_img.src = items[i].imageUrl; //image du produit

        li.appendChild(a);
        a.appendChild(items_name);
        li.appendChild(items_price);
        a.appendChild(items_img);
        ul.appendChild(li);
    }
}
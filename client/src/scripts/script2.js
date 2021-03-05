import {Manga} from './class/manga.class.js';

let tmpId;
let tmpTitre = document.querySelector('#titreUpdate');
let tmpAuteur = document.querySelector('#auteurUpdate');
let tmpTomes = document.querySelector('#tomesUpdate');
let tmpParution = document.querySelector('#parutionUpdate');
let btn = document.querySelector('#btnUpdate');

let url = window.location;
let mangaId = url.hash.substring(1); // récupération de l'id du manga dans l'url

let myHeaders = new Headers();
let opt = {
  method: 'GET',
  headers: myHeaders,
  mode: 'cors',
  cache: 'default'
};

// on récupère les valeurs du manga d'id sélectionné et on les met dans les champs du formulaire
fetch(`/api/manga/${mangaId}`, opt)
  .then((res) => {
    return res.json();
  })
  .then((response) => {
        tmpId = response['id'];
        tmpTitre.value = response.titre;
        tmpAuteur.value = response.auteur;
        tmpTomes.value = response.tomes;
        tmpParution.value = response.parution;
  })
  .catch((err) => {
    console.log('Error : ' + err);
  })

  // ajout de l'évènement click de modification au bouton de modification
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    let tmp = {
        id: tmpId,
        titre: tmpTitre.value,
        auteur: tmpAuteur.value,
        tomes: tmpTomes.value,
        parution: tmpParution.value
    };
    
    let opt = {
      method: 'PUT',
      body: JSON.stringify(tmp),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }

    // on modifie les valeurs du manga à partir de celles saisies dans les champs de formulaire dédiés
    fetch(`/api/manga/${mangaId}`, opt)
      .then((res) => {
        return res.json();
      })
      .then((response) => {
        alert(`Le manga d'id ${response['id']} a été modifié.`);
        window.location.href = '/pages/liste.html';
      })
      .catch((res) => {
        console.log(res);
      })
  })
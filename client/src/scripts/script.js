import {Manga} from './class/manga.class.js';
import {newLine} from './functions.lib.js';

let myHeaders = new Headers();
let url = '/liste';
let options = {
    method: 'GET',
    headers: myHeaders,
    mode: 'cors',
    cache: 'default'
};

// récupération des mangas dans la liste
// puis création des lignes dans le tableau
fetch(url, options)
  .then((res) => {
    if(res.ok) {
      return res.json();
    }
  })
  .catch((err) => {
      console.log('Error: ', err);
  })
  .then((response) => {
    response.forEach(elt => {
        newLine(elt);
    });
  });

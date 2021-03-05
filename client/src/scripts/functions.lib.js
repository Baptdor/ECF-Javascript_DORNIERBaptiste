let maListe = document.querySelector('#maListe');
let btnAdd = document.querySelector('#btnAdd');

// ajout de l'event click d'ajout au bouton d'ajout
btnAdd.addEventListener('click', (e) => {
    e.preventDefault();
    addManga();
  });

/**
 * Ajoute un nouveau manga avec les infos saisies dans le formulaire dédié
 */
function addManga() {
  let titre = document.querySelector('#addTitre');
  let auteur = document.querySelector('#addAuteur');
  let tomes = document.querySelector('#addTomes');
  let parution = document.querySelector('#addParution');

  let tmp = {
    titre: titre.value,
    auteur: auteur.value,
    tomes: tomes.value,
    parution: parution.value
  };
  
  let opt = {
    method: 'POST',
    body: JSON.stringify(tmp),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }
  fetch('/api/manga', opt)
    .then((res) => {
      titre.value = '';
      auteur.value = '';
      tomes.value = 1;
      parution.value = '';
      return res.json();
    })
    .then((response) => {
      newLine(response);
    })
    .catch((res) => {
      console.log(res);
    });
  
  alert(`Le manga "${titre.value}" a été créé.`);
}

/**
 * Supprime le manga d'id spécifié en paramètre
 * @param {String} id id du manga à supprimer
 */
function deleteManga(id) {
  if (confirm(`Supprimer le manga d\'id ${id} ?`))
  {
    let myHeaders = new Headers();
    let opt = {
      method: 'DELETE',
      headers: myHeaders,
      mode: 'cors',
      cache: 'default'
    };

    fetch('/api/manga/' + id, opt)
      .then(() => {
        window.location.href = '/pages/liste.html';
      })
      .catch((err) => {
        console.log('Error ' + err);
      });
  }
}

/**
 * Ajoute une ligne au tableau de mangas par manga dans la liste spécifiée en paramètre
 * @param {Array.Object} data liste des mangas
 */
function newLine(data) {
  // création de la ligne
  let trManga = document.createElement('tr');
  // création des colonnes
  let tdId = document.createElement('td');
  let tdTitre = document.createElement('td');
  let tdAuteur = document.createElement('td');
  let tdTomes = document.createElement('td');
  let tdParution = document.createElement('td');
  let tdModifier = document.createElement('td');
  let tdSupprimer = document.createElement('td');

  // on met les valeurs dans les bonnes colonnes
  tdId.innerText = data['id'];
  tdTitre.innerText = data['titre'];
  tdAuteur.innerText = data['auteur'];
  tdTomes.innerText = data['tomes'];
  tdParution.innerText = data['parution'];
  // Boutons Modifier et Supprimer
  tdModifier.innerHTML = `<a href="details.html#${data['id']}">Modifier</a>`;
  tdSupprimer.innerHTML = `<button class="button" id="del${data['id']}">Supprimer</>`;

  // on ajoute les colonnes à la ligne
  trManga.appendChild(tdId);
  trManga.appendChild(tdTitre);
  trManga.appendChild(tdAuteur);
  trManga.appendChild(tdTomes);
  trManga.appendChild(tdParution);
  trManga.appendChild(tdModifier);
  trManga.appendChild(tdSupprimer);

  // on ajoute la ligne complète au tableau
  maListe.appendChild(trManga);

  // ajout de l'évènement click de suppression au bouton de suppression
  let btnSupr = document.querySelector(`#del${data['id']}`);
  btnSupr.addEventListener('click', () => {
    deleteManga(data['id']);
  });
}

export {newLine};
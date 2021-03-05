/**
 * Classe Manga
 * id : id du manga
 * titre : titre du manga
 * auteur : auteur du manga
 * tomes : nombre de tomes parus en France
 * parution : date de parution du premier chapitre au Japon
 */
class Manga {
    constructor(id, titre, auteur, tomes, parution) {
        this.id = id;
        this.titre = titre;
        this.auteur = auteur;
        this.tomes = tomes;
        this.parution = parution;
    }

    // getters et setters
    get Id() { return this.id; }
    set Id(id) { this.id = id; }

    get Titre() { return this.titre; }
    set Titre(titre) { this.titre = titre; }

    get Auteur() { return this.auteur; }
    set Auteur(auteur) { this.auteur = auteur; }

    get Tomes() { return this.tomes; }
    set Tomes(tomes) { this.tomes = tomes; }

    get Parution() { return this.parution; }
    set Parution(parution) { this.parution = parution; }
}

export {Manga};
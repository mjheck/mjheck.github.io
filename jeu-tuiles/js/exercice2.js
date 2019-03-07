/**
 * TP1 - Exercice2
 * Cours : Programmation interactive client-serveur
 * Par : Marie-Josée Heck
 * Date : 13 juin 2018
 */

window.addEventListener("load", function() {
    
    //Grandeur de la matrice de jeu
    const NB_LIGNES = 4;
    const NB_COLONNES = 4;

    //Initialisation du compteur pour le nombre de coups
    sessionStorage.setItem("compteur", 0);

    //Solution
    var solution = [
        [1,2,3,4],
        [5,6,7,8,],
        [9,10,11,12,],
        [13,14,15,""]];

    //Matrice de départ
    var matrice = [
        [1,2,3,4],
        [5,6,7,8,],
        [9,10,11,12,],
        [13,14,15,""]];
    
    //Mélanger le jeu
	matrice = shuffle(matrice);

    /**
     * Dessine la matrice de jeu et ajoute les évévements de déplacement sur les
     * boutons
     */
    function afficherJeu(){
        tableJeu = document.createElement("table");
        tableJeu.setAttribute("border", "1");
        tableJeu.setAttribute("class", "jeu");
        document.getElementById("conteneur").appendChild(tableJeu);
        
        for (i = 0; i < NB_LIGNES; i++){
            rangee = document.createElement("tr");
            tableJeu.appendChild(rangee);
            for (j = 0; j < NB_COLONNES; j++){
                cellule = document.createElement("td");
                nombre = document.createTextNode(matrice[i][j]);
                cellule.appendChild(nombre);
                rangee.appendChild(cellule);
                
                //Attribuer la classe correspondante à la valeur
                if (cellule.innerHTML == ""){
                    cellule.setAttribute("class", "sansValeur");
                }
                else{
                    cellule.setAttribute("class", "avecValeur");
                }
            }
        }
        cellules = document.querySelectorAll("table tr td");
        for(i = 0; i < cellules.length; i++){
            //Appel de la fonction jouer() lorsque clique un bouton
            cellules[i].addEventListener("click", jouer, false);
        }
        //Afficher le compteur
        compteur = document.querySelector(".boxCompteur");
        compteur.innerHTML = sessionStorage.getItem("compteur");
    }

    afficherJeu();

    /**
     * Affiche le meilleur score
     */
    function afficherScore(){
        var coups = document.getElementById("recordCoups");
        var nom = document.getElementById("recordNom");
        if(localStorage.getItem("vainqueur") != null){
            vainqueur = localStorage.getItem("vainqueur");
            vainqueur = JSON.parse(vainqueur);
            coups.innerHTML = vainqueur.score;
            nom.innerHTML = vainqueur.nom;
        }
        else{
            coups.innerHTML = "";
            nom.innerHTML = "<i>Sois le premier!</i>";
        }
    }
    afficherScore();

    /**
     * Obtient les coordonnées de la matrice associées à la valeur de la case 
     * cliquée et appelle les fonctions nécessaires au déroulement du jeu.
     */
    function jouer(event){
        //Obtenir les coordonnées de l'emplacement cliqué
        valeur =  event.target.innerHTML;
        for (i = 0; i < NB_LIGNES; i++){
            for (j = 0; j < NB_COLONNES; j++){
                if(valeur == matrice[i][j]){
                    var x = i;
                    var y = j;
                };
            }
        }
        deplacerTuiles(x,y)
        supprimerTable();
        afficherJeu();
        gameOver();
        finDePartie();
    }

    /**
     * Effectue les déplacements autorisés vers l'emplacement ne contenant aucune 
     * valeur et interchange les valeurs
     * @param x int représentant le premier indice de la matrice
     * @param y int représentant le second indice de la matrice
     */
    function deplacerTuiles(x,y){
        //Trouver la valeur à interchanger
        valeur = matrice[x][y];

        //Déplacement vers le bas
        if(x >= 0 && x < NB_LIGNES - 1 && matrice[x + 1][y] == ""){      
            matrice[x][y] = matrice[x + 1][y];
            matrice[x + 1][y] = valeur;
            incrementerCompteur();

        }

        //Déplacement vers le haut
        else if(x < NB_LIGNES && x > 0 && matrice[x - 1][y] == ""){
            matrice[x][y] = matrice[x - 1][y];
            matrice[x - 1][y] = valeur;
            incrementerCompteur();
        }

        //Déplacement vers la droite
        else if(y >= 0 && y < NB_COLONNES - 1 && matrice[x][y + 1] == ""){
            matrice[x][y] = matrice[x][y + 1];
            matrice[x][y + 1] = valeur;
            incrementerCompteur();
        }

        //Déplacement vers la gauche
        else if(y < NB_COLONNES && y > 0 && matrice[x][y - 1] == ""){
            matrice[x][y] = matrice[x][y - 1];
            matrice[x][y - 1] = valeur;
            incrementerCompteur();
        }
    }

    /**
     * Incrémente le compteur de nombres de coups
     */
    function incrementerCompteur(){
        var compteur = sessionStorage.getItem("compteur");
        compteur ++;
        sessionStorage.setItem("compteur", compteur);
    }

    /**
     * Vérifie si la matrice de jeu correspond à la solution et stocke le meilleur
     * score
     */
    function finDePartie(){
        verif = false;
        for(i = 0; i < NB_LIGNES; i++){
            for(j = 0; j < NB_COLONNES; j++){
                if(matrice[i][j] == solution[i][j]){
                    verif = true
                }
                else{
                    verif = false;
                    break;   
                }
            }
            if(verif === false){
                break;
            }
        }
        
        if (verif === true){
            nbCoups = sessionStorage.getItem("compteur");
            nbCoups = parseInt(nbCoups);
            alert("Bravo! Vous avez réussi le jeu en " + nbCoups + " coups.");
            
            if (localStorage.getItem("vainqueur") == null){
                var nomVainqueur = prompt("Entrez votre nom");
                stockerVainqueur(nomVainqueur, nbCoups);
            }

            if (localStorage.getItem("vainqueur") != null){
                scoreStocke = JSON.parse(localStorage.getItem("vainqueur"));
                scoreStocke = scoreStocke.score;
            }

            if(localStorage.getItem("vainqueur") != null && nbCoups < scoreStocke){
                var nomVainqueur = prompt("Vous avez battu le record. Entrez votre nom");
                stockerVainqueur(nomVainqueur, nbCoups);
            }
            location.reload();
        }
    }

    /**
     * Ajoute le meilleur score dans le stockage local
     * @param string nomVainqueur qui correspond au nom du vainqueur
     * @param int nbCoups qui correspond au nombre de coups pour terminer la partie
     */
    function stockerVainqueur(nomVainqueur, nbCoups){
        vainqueur = new Object;
        vainqueur.nom = nomVainqueur;
        vainqueur.score = nbCoups;
        localStorage.setItem("vainqueur", JSON.stringify(vainqueur));
    }

    /**
     * Efface la matrice de jeu
     */
    function supprimerTable(){
        table = document.getElementsByTagName("table");
        if(table[0].parentNode){
            table[0].parentNode.removeChild(table[0]);
        }
    }
    
    /**
     * mélange le tableau aléatoirement
     * @param array tableau à mélanger 
     * @return array le tableau mélangé
     */
    function shuffle(tableau) {
        var i, j, 
            k, l,
            tampon;
            for (i = NB_LIGNES - 1; i > 0; i--) {
                for(k = NB_COLONNES - 1; k > 0; k--) {
                    if(i != NB_LIGNES -1 || k != NB_COLONNES - 1){
                        j = Math.floor(Math.random() * (i + 1));
                        l = Math.floor(Math.random() * (k + 1));
                        if(j != NB_LIGNES -1 || l != NB_COLONNES - 1){
                            tampon = tableau[i][k];
                            tableau[i][k] = tableau[j][l];
                            tableau[j][l] = tampon;
                        }
                    }
                }
            }
        return tableau;
    }

    /**
     * Limite le nombre de coups d'une partie à 500
     */
    function gameOver(){
        nbCoups = sessionStorage.getItem("compteur");
        if (parseInt(nbCoups) === 500 ){
            document.getElementById("gameOver").classList.add("actif");
            document.getElementById("gameOver").classList.remove("inactif");
            tuiles = document.querySelectorAll(".avecValeur");
            for(var i = 0; i < tuiles.length; i++){
                tuiles[i].removeEventListener('click',jouer,false);
            }
        } 
    }

    /**
     * Recharge la page lorsque clique sur le bouton Reessayer
     */
    document.querySelector(".btnReessayer").addEventListener("click", function(){
        location.reload();
    });
});
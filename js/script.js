$('document').ready(function () {
ScrollReveal().reveal('.titre-fond',{ duration: 2000 })
    // afficher les projets à partir du fichier projets.json
    $.getJSON('ressources/projets.json', function(resultat) {
        var projets = resultat.projets;
        for(i = 0; i < projets.length; i++){
            // Affichage des thumbnails
            $('#realisations .conteneur-flex').append(afficherThumbnail(i, projets[i].thumbnail));
            // Affichage des modals
            $('#tous-modals').append(afficherModal(i, projets[i].titre, projets[i].sousTitre, projets[i].desc, projets[i].imgPages, projets[i].lienSite, projets[i].outils));
        }
        // Afficher le modal correspondant lorsque clique sur le thumbnail
        $('.thumbnail').click(function(){
            idModal = '#modal-' + $(this).attr('id');
            $(idModal).css("display","block");
            $('.caroussel').slick('refresh');
        });

        // Fermer le modal lorsque clique bouton close
        $('.close').click(function() {
            $('.modal').css("display","none");
            $('.caroussel').slick('slickGoTo', 0);
        });

        $('.caroussel').slick({
            initialSlide:0
        });
    } );

    var tousSpans = document.querySelectorAll('.barre-ext span');
    var toutesBarres = document.querySelectorAll('.barre-int');
    
    for(var i=0; i < tousSpans.length; i++){
        longueur = parseInt(toutesBarres[i].getAttribute("data-pourcentage"));
        tousSpans[i].style.width = longueur + 25 + "%";
        tousSpans[i].innerHTML = longueur + "%";
    }

    $('#competences .wrapper-tab').mouseover(function() {
        var barres = ($(this).find('.barre-int'));
        var spans = ($(this).find('span'));
        for(var i=0; i < barres.length; i++){
            pourcentage = barres[i].getAttribute("data-pourcentage");
            barres[i].style.width=pourcentage + "%";
            spans[i].style.opacity=1;
        }
    });
    $('#competences .wrapper-tab').mouseout(function() {
        var barres = ($(this).find('.barre-int'));
        var spans = ($(this).find('span'));
        for(var i=0; i < barres.length; i++){
            barres[i].style.width="20px";
            spans[i].style.opacity=0;
        }
    });

    //Animation apparition titre 
    $('.ml16').each(function(){
        $(this).html($(this).text().replace(/([^\x00-\x80]|\w|-)/g, "<span class='letter'>$&</span>"));
      });
      
      anime.timeline()
        .add({
          targets: '.ml16 .letter',
          translateX: [40,0],
          translateZ: 0,
          opacity: [0,1],
          easing: "easeOutExpo",
          duration: 2000,
          delay: function(el, i) {
            return 500 + 30 * i;
          }
        });
    
        $(window).scroll(function(){   
            if ($(this).scrollTop() > 300) {
                $('nav').fadeIn(1000);
            } else {
                $('nav').fadeOut(1000);
            }
        });
});

/**
 * Affiche le thumbnail d'un projet
 * @param {int} indice - représente l'id du thumbnail
 * @param {string} imgThumbnail - correspond au nom de l'image du thumbnail
 */
function afficherThumbnail(indice, imgThumbnail)
{
    var thumbnail = '<div class="wrapper-thumbnail">' + 
                        '<div id="' + indice + '" class="thumbnail">' + 
                            '<img class="dessus" src="images/projets/' + imgThumbnail + '"/>' +
                            '<div class="dessous">' + 
                                '<img id="myBtn" src="images/oeil2.png"/>' + 
                            '</div>' + 
                        '</div>' + 
                    '</div>';
    return thumbnail;
}

/**
 * Affiche la fenêtre modal associée à un projet, contenant un slider
 * @param {int} indice - représente l'id du modal
 * @param {string} description - correspond à la description du projet
 * @param {string} images - correspond au tableau contenant les images du slider
 */

function afficherModal(indice, titre, sousTitre, description, images, lien, outils)
{
    var modal ='<div id="modal-' + indice + '" class="modal">' + 
                    '<div class="modal-content">' +
                        '<div class="modal-header">' +
                            '<div class="caroussel">';
                                for(i = 0; i < images.length; i++ ){
                                    modal += '<img src="images/projets/' + images[i] + '"/>';
                                }
    modal +=               '</div>' +
                        '</div>' +
                        '<div class="modal-body">' +
                            '<h4>' + titre + '</h4>' +
                            '<h5>' + sousTitre + '</h5>' +
                            '<p>' + description  + '</p>' +
                            '<p class="outils">';
                                for(i = 0; i < outils.length; i++ ){
                                    if(i < outils.length-1){
                                        modal += outils[i] + ', ';
                                    }
                                    else{
                                        modal += outils[i];
                                    }
                                }
    modal+=                 '</p>' +
                            '<div class="modal-footer">';
                                if(lien != 0){
                                    modal += '<div class = "btn-site"><a href="' + lien + '" target="_blank">Visiter</a></div>';
                                }
                                else{
                                    modal += '<div></div>';
                                }
    modal +=                    '<div class="close"><img src="images/close.png" width="20"/></div>' +
                            '</div>' +
                        '</div>' +
                    '</div>' +
                '</div>';
    return modal;
}



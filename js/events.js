'use strict';

/***************************************************************************************/
/**************************** EVENEMENTS CARNET D'ADRESSES *****************************/
/***************************************************************************************/


function onClickAddContact()
{
    // Réinitialisation du formulaire (efface les champs texte, etc.).
    $('#contact-form').trigger('reset');
    $('#contact-details').hide();
    $('#address-book li.is-current').removeClass('is-current');

    // Basculement du formulaire en mode ajout puis affichage.
    $('#contact-form').data('mode', 'add').fadeIn('fast');
}


function onClickClearAddressBook()
{
    // Sauvegarde d'un carnet d'adresse vide, écrasant le carnet d'adresse existant.
    saveAddressBook(new Array());

    // Mise à jour de l'affichage
    $('#contact-details').hide();
    refreshAddressBook();
}


function onClickEditContact()
{
    
    const index = $(this).data('index');
    const addressBook = loadAddressBook();
    const contact     = addressBook[index];

    $('#firstName').val(contact.firstName);
    $('#lastName').val(contact.lastName);
    $('#phone').val(contact.phone);

    // Sélection de la bonne <option> HTML de la liste déroulante.
    switch(contact.title) {

        case 'Madame':
        $('#title').val(1);
        break;

        case 'Mademoiselle':
        $('#title').val(2);
        break;

        case 'Monsieur':
        $('#title').val(3);
        break;
    }

    $('#contact-details').hide();
    // Basculement du formulaire en mode édition puis affichage.
    $('#contact-form').data('mode', 'edit').fadeIn('slow');
}


function onClickSaveContact()
{
   
    let index;

    // Création d'un objet contact avec les données du formulaire.
    const contact = createContact
    (
        $('select[name=title]').val(),
        $('input[name=firstName]').val(),
        $('input[name=lastName]').val(),
        $('input[name=phone]').val()
    );

    const addressBook = loadAddressBook();

    // En mode "Ajout"
    if($('#contact-form').data('mode') == 'add') {

        // On ajoute simplement le contact au carnet d'adresses
        addressBook.push(contact);

      //On stocke l'indice du nouvel élément, c'est-à-dire le dernier indice du tableau
        index = addressBook.length - 1;
    }

    
    else {

        // On récupère l'indice du contact à modifier à partir de l'attribut data "index" du lien "Editer le contact"
        index = $('#contact-details a').data('index');

        // Mise à jour du contact correspndant à l'indice récupéré
        addressBook[index] = contact;
    }

    // Tri du carnet d'adresses par ordre alphabétique
    addressBook.sort(function(contactA, contactB){
        if(contactA.lastName > contactB.lastName)
            return 1;

        if(contactA.lastName < contactB.lastName)
            return -1;

        // Ici le nom de famille est identique pour les 2 contacts, on compare donc le prénom
        if(contactA.firstName > contactB.firstName)
            return 1;

        if(contactA.firstName < contactB.firstName)
            return -1;

        // Ici ce sont des homonymes parfaits (même nom et même prénom)
        return 0;
    });

    // Sauvegarde du carnet d'adresses dans le Local Storage
    saveAddressBook(addressBook);

    // Mise à jour de l'affichage des contacts
    $('#contact-form').fadeOut('slow');
    $('#contact-details').hide();
    refreshAddressBook();

  
    $('#address-book a').eq(index).trigger('click');
}


function onClickShowContactDetails()
{

     const index = $(this).data('index');

    // Chargement du carnet d'adresses puis récupération du contact sur lequel on a cliqué.
    const addressBook = loadAddressBook();
    const contact     = addressBook[index];

    
    $('#contact-details dt').text(contact.title + ' ' + contact.firstName + ' ' + contact.lastName);
    $('#contact-details dd').text('Tel : ' + contact.phone );
    $('#contact-details a').data('index',index);

    // Mise à jour de l'affichage
    $('#contact-form').fadeOut(0);
    $('#contact-details').show();

    // le contact affiché sur la zone détail doit être repérable sur la liste
    $('#address-book li.is-current').removeClass('is-current');
    $('#address-book li').eq(index).addClass('is-current');
}

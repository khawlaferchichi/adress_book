'use strict';

/***************************************************************************************/
/***************************** DONNEES CARNET D'ADRESSES *******************************/
/***************************************************************************************/

const DOM_STORAGE_ITEM_NAME = 'Address Book';


/***************************************************************************************/
/***************************** FONCTIONS CARNET D'ADRESSES *****************************/
/***************************************************************************************/

/**
 * Crée un nouveau contact
 * @param title - La civilité du contact
 * @param firstName - Le prénom du contact
 * @param lastName - Le nom du contact
 * @param phone - Le téléphone du contact
 * @returns {Object} - Objet contenant les informations du contact
 */
function createContact(title, firstName, lastName, phone)
{
    const contact           = new Object();
    contact.firstName = firstName;
    contact.lastName  = lastName.toUpperCase();
    contact.phone     = phone;

    switch(title) {

        case '1':
            contact.title = 'Madame';
            break;

        case '2':
            contact.title = 'Mademoiselle';
            break;

        case '3':
            contact.title = 'Monsieur';
            break;
    }

    return contact;
}

/**
 * Charge les données du carnet d'adresses du Local Storage
 * @returns {Array} Le tableau d'objets Contacts
 */
function loadAddressBook()
{
    // Chargement du carnet d'adresses depuis le DOM storage.
    let addressBook = loadDataFromDomStorage(DOM_STORAGE_ITEM_NAME);

    // Est-ce qu'il n'y avait aucune donnée dans le DOM storage ?
    if(addressBook == null) {

        // Oui, création d'un carnet d'adresses vide.
        addressBook = new Array();
    }

    return addressBook;
}


function refreshAddressBook()
{
    // Chargement des données du carnet d'adresses
    const addressBook = loadAddressBook();

    // Construction de la liste <ul> contenant le carnet d'adresses HTML.
    const addressBookList = $('<ul>').addClass('list-unstyled');

    
    addressBook.forEach(function(contact, index){

        // Construction de l'hyperlien <a> contenant le nom et prénom du contact.
        const hyperlink = $('<a>')
            .attr('href', '#contact-details')
            .data('index', index)
            .text(contact.firstName + ' ' + contact.lastName)
            .prepend($('<i>').addClass('far fa-user').attr('aria-hidden','true'));

     
        addressBookList.append($('<li>').append(hyperlink));
    });

    
    if( addressBook.length > 0 ) {
        // Insérer la ul dans la section de la page
        $('#address-book').html(addressBookList);
    }
    else {
        $('#address-book').html( $('<p>').text('Aucun contact enregistré') );
    }
}

/**
 * Enregistrement du carnet d'adresses dans le Local Storage
 * @param addressBook - Le tableau d'objets contenant les contacts du carnet d'adresses
 */
function saveAddressBook(addressBook)
{
    // Enregistrement du carnet d'adresses dans le DOM storage.
    saveDataToDomStorage(DOM_STORAGE_ITEM_NAME, addressBook);
}
const form = document.getElementById('hobbyForm');
const msg = document.getElementById('message');

// REMPLACE par l'URL de ton Google Apps Script après déploiement
const scriptURL = 'https://script.google.com/macros/s/AKfycbyqpj51Yl_723ne1pmfpoWZ71v9atVdFmBIB2kXGa6TCM0KFjrXe6Id6bk-aUpvpKN-/exec';

form.addEventListener('submit', e => {
    e.preventDefault();
    
    // On change le texte du bouton pendant l'envoi
    const btn = document.getElementById('submitBtn');
    btn.disabled = true;
    btn.innerText = "Envoi en cours...";

    fetch(scriptURL, { 
        method: 'POST', 
        body: new FormData(form)
    })
    .then(response => {
        msg.innerText = "Succès ! Vos données ont été enregistrées.";
        msg.style.color = "green";
        msg.classList.remove('hidden');
        form.reset(); // On vide le formulaire
    })
    .catch(error => {
        msg.innerText = "Erreur lors de l'envoi.";
        msg.style.color = "red";
        msg.classList.remove('hidden');
        console.error('Erreur!', error.message);
    })
    .finally(() => {
        btn.disabled = false;
        btn.innerText = "Envoyer les données";
    });
});
function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = e.parameter;
  // Ajoute les données dans l'ordre : Date, Nom, Age, Sexe, Hobby
  sheet.appendRow([new Date(), data.name, data.age, data.gender, data.hobby]);
  
  return ContentService.createTextOutput("OK").setMimeType(ContentService.MimeType.TEXT);
}

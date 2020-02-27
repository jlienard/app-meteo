let villeChoisie;

if("geolocation" in navigator) {
  navigator.geolocation.watchPosition((position) => {
    
    const url = 'https://api.openweathermap.org/data/2.5/weather?lat='
        + position.coords.latitude + '&lon='
        + position.coords.longitude + '&appid=9bf321811ebffd67430a904097dd75d4&units=metric';
    
    let requete = new XMLHttpRequest(); 
    requete.open('GET', url); 
    requete.responseType = 'json'; 
    requete.send(); 

    requete.onload = function() {
      if (requete.readyState === XMLHttpRequest.DONE) {
        if (requete.status === 200) {
          let reponse = requete.response;
          // console.log(reponse);
          let temperature = reponse.main.temp;
          let ville       = reponse.name;
          // console.log(temperature);
          document.querySelector('#temperature_label').textContent = temperature;
          document.querySelector('#ville').textContent = ville;
        }
        else {
          alert('Un problème est intervenu, merci de revenir plus tard.');
        }
      }
    }
  }, erreur, options);
  
  var options = {
    enableHighAccuracy: true
  }
}
else {
  villeChoisie = "Paris";
  recevoirTemperature(villeChoisie);
}

let changerDeVille = document.querySelector('#changer');
changerDeVille.addEventListener('click', () => {
  villeChoisie = prompt('Quelle ville souhaitez-vous voir ?');
  recevoirTemperature(villeChoisie);
});

function erreur() {
  villeChoisie = "Paris";
  recevoirTemperature(villeChoisie);
}

function recevoirTemperature(ville) {
  const url = 'https://api.openweathermap.org/data/2.5/weather?q=' + ville + '&appid=9bf321811ebffd67430a904097dd75d4&units=metric';

  let requete = new XMLHttpRequest(); 
  requete.open('GET', url); 
  requete.responseType = 'json'; 
  requete.send(); 

  requete.onload = function() {
    if (requete.readyState === XMLHttpRequest.DONE) {
      if (requete.status === 200) {
        let reponse = requete.response;
        // console.log(reponse);
        let temperature = reponse.main.temp;
        let ville       = reponse.name;
        // console.log(temperature);
        document.querySelector('#temperature_label').textContent = temperature;
        document.querySelector('#ville').textContent = ville;
      }
      else {
        alert('Un problème est intervenu, merci de revenir plus tard.');
      }
    }
  }
}
//Example fetch using pokemonapi.co
document.querySelector('#search-btn').addEventListener('click', getFetch)

function getFetch(){
  let spell = document.querySelector('input').value.toLowerCase();
  spell = spell.split(' ').join('-');
  const url = `https://www.dnd5eapi.co/api/spells/${spell}`

  fetch(url)
      .then(res => res.json())
      .then(data => {
        // log data
        console.log(data);
      })
      .catch(err => {
          console.log(`error ${err}`)
      });
}

// event listener for search button
document.querySelector('#search-btn').addEventListener('click', getFetch);

// also search by hitting enter key and it will automagically make that a  click event
document.querySelector('input').addEventListener('keypress', function(event) {
  if (event.key == 'Enter') {
      document.querySelector('#search-btn').click();
  }
});

// event listener for adding spell to deck
document.querySelector('#plus').addEventListener('click', addSpellToLocalStorage);

// API fetch request
function getFetch(){
  let spell = document.querySelector('input').value.toLowerCase();
  spell = spell.split(' ').join('-');
  const url = `https://www.dnd5eapi.co/api/spells/${spell}`;

  fetch(url)
      .then(res => res.json())
      .then(data => {
        // log data
        console.log(data);

        displayName(data);
        displaySpellInfo(data);
      })
      .catch(err => {
          console.log(`error ${err}`)
      });
}

const displayName = data => {
  return document.querySelector('#left-page h2').textContent = data.name;
};
const displaySpellInfo = data => {
  displayDuration(data);
  displayCastingTime(data);
  displaySchool(data);
  displayLevel(data);
  displayRange(data);
  displayClasses(data);
  displayDesc(data);
  displayComponents(data);
  displayDmgType(data);
  displayDmgAtCharLevel(data);
};
const displayDuration = data => {
  return document.querySelector('#duration').textContent = data.duration;
};
const displayCastingTime = data => {
  return document.querySelector('#c-time').textContent = data.casting_time;
};
const displaySchool = data => {
  return document.querySelector('#school').textContent = data.school.name;
};
const displayLevel = data => {
  return document.querySelector('#level').textContent = data.level;
};
const displayRange = data => {
  return document.querySelector('#range').textContent = data.range;
};
const displayClasses = data => {
  const classes = data.classes.map(e => e.name).join(', ')
  document.querySelector('#classes').textContent = classes;

  const subclasses = data.subclasses.map(e => e.name).join(', ')
  document.querySelector('#subclasses').textContent = subclasses;
};
const displayDesc = data => {
  return document.querySelector('#right-page p').textContent = data.desc[0];
}; 
const displayComponents = data => {
  const components = data.components.join(', ')
  document.querySelector('#components').textContent = components;
};
const displayDmgType = data => {
  const dmgType = document.querySelector('#dmg-type');
  if (data.damage) {
    const damage = data.damage.damage_type.name;
    dmgType.textContent = damage;
  } else {dmgType.textContent = 'None';};
};
const displayDmgAtCharLevel = data => {
  let dmgList = []
  if(data.damage) {
    if(data.damage.damage_at_character_level) {
      for (const [key, value] of Object.entries(data.damage.damage_at_character_level)) {
        dmgList.push(`${key}: ${value}`);
      };
    } else if(data.damage.damage_at_slot_level) {
      for (const [key, value] of Object.entries(data.damage.damage_at_slot_level)) {
        dmgList.push(`${key}: ${value}`);
      };
    }
    // insert damage list into DOM
    const dmgUL = document.querySelector('#dmgUL');
    // clear pre-existing list
    dmgUL.textContent = '';

    // loop through damage at character level list
    dmgList.forEach(e => {
      // create list item element
      let li = document.createElement('li');
      // insert each level into li
      li.appendChild(document.createTextNode(e));
      // add item to the UL
      dmgUL.appendChild(li);
    });


  } else {
    // remove damage at character level section from card
    dmgUL.textContent = 'N/A';
  };

  console.log(dmgList)
};

// key number so each spell has a unique number 
// ***TO DO: instead, need to get the key number from local storage and start from the last number
let keyNum = 1;

// ***TO DO: If spell is already in local storage, have it start as a check on that spell. otherwise, have it start as a plus

function addSpellToLocalStorage() {
  // save spellname to a variable
  const spellName = document.querySelector('#left-page h2').textContent
  
  // ***TO DO: if the spell is not already in local storage, then add the spell to it

  // add spell name to local storage
  localStorage.setItem(`spell${keyNum}`, spellName);
  keyNum += 1; // increment key number

  plusToCheck()
};

// variables to store plus and check symbols
const plusSymbol = document.querySelector('#plus .fa-plus');
const checkSymbol = document.querySelector('#plus .fa-check');

// When someone adds a spell to their deck or has it added, change the plus sign to a check so they know they already have it
function plusToCheck() {
  plusSymbol.classList.add('hidden');
  checkSymbol.classList.remove('hidden');
};

function checkToPlus() {
  plusSymbol.classList.remove('hidden');
  checkSymbol.classList.add('hidden');
};
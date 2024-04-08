// event listener for search button
document.querySelector('#search-btn').addEventListener('click', getFetch);

// also search by hitting enter key and it will automagically make that a  click event
document.querySelector('input').addEventListener('keypress', function(event) {
  if (event.key == 'Enter') {
      document.querySelector('#search-btn').click();
  }
});

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

// insert spell name into DOM
const displayName = data => document.querySelector('#left-page h2').textContent = data.name;

// call all the functions to display the spell info
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

// insert duration into DOM
const displayDuration = data =>  document.querySelector('#duration').textContent = data.duration;

// insert casting time
const displayCastingTime = data => document.querySelector('#c-time').textContent = data.casting_time;

// insert school
const displaySchool = data => document.querySelector('#school').textContent = data.school.name;

// insert level
const displayLevel = data => document.querySelector('#level').textContent = data.level;

// insert range
const displayRange = data => document.querySelector('#range').textContent = data.range;

// insert classes & subclasses
const displayClasses = data => {
  const classes = data.classes.map(e => e.name).join(', ')
  document.querySelector('#classes').textContent = classes;

  const subclasses = data.subclasses.map(e => e.name).join(', ')
  document.querySelector('#subclasses').textContent = subclasses;
};

// insert description
const displayDesc = data => document.querySelector('#right-page p').textContent = data.desc[0];

// insert components
const displayComponents = data => {
  const components = data.components.join(', ')
  document.querySelector('#components').textContent = components;
};

// insert damage type
const displayDmgType = data => {
  const dmgType = document.querySelector('#dmg-type');
  if (data.damage) {
    const damage = data.damage.damage_type.name;
    dmgType.textContent = damage;
  } else {dmgType.textContent = 'None';};
};

// insert dmg at character level
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
}
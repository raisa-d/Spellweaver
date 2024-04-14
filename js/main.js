class SpellDisplayer {
  constructor() {
    this.plusSymbol = document.querySelector('#plus .fa-plus');
    this.checkSymbol = document.querySelector('#plus .fa-check');
    this.spellName = document.querySelector('#left-page h2');
    this.components = document.querySelector('#components');
    this.classes = document.querySelector('#classes');
    this.subclasses = document.querySelector('#subclasses');
    this.dmgType = document.querySelector('#dmg-type');
    this.dmgUL = document.querySelector('#dmgUL');
    this.desc = document.querySelector('#right-page p');

    // Event Listeners
    // search button
    document.querySelector('#search-btn').addEventListener('click', this.getFetch.bind(this));
    
    // hitting enter key will also search
    document.querySelector('input').addEventListener('keypress', function(event) {
      if (event.key == 'Enter') {
        document.querySelector('#search-btn').click();
      }
    });

    document.querySelector('#plus').addEventListener('click', this.addSpellToLocalStorage.bind(this));

    // if local storage is empty
    if(localStorage.length === 0) {
      this.keyNum = 1; // start at 1
    } else {
      // start at where the last key left off
      const maxKey = Math.max(...Object.keys(localStorage).map(Number));
      this.keyNum = maxKey + 1;
    }
  }

  getFetch() {
    let spell = document.querySelector('input').value.toLowerCase().split(' ').join('-');
    const url = `https://www.dnd5eapi.co/api/spells/${spell}`;

    fetch(url)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (data.error || !data.name) {
          this.displayErrorMessage();
        } else {
          this.displaySpellInfo(data);
        };
      })
      .catch(err => {
        console.log(`Error: ${err}`);
      });
  }

  displayErrorMessage() {
    this.displayName('We couldn\'t find a spell by that name :( Try searching for another!');
    this.displayDuration('N/A');
    this.displayCastingTime('N/A');
    this.displaySchool('N/A');
    this.displayLevel('N/A');
    this.displayRange('N/A');
    this.subclasses.textContent = 'N/A';
    this.classes.textContent = 'N/A';
    this.components.textContent = 'N/A';
    this.dmgType.textContent = 'N/A';
    this.dmgUL.textContent ='N/A';
    this.desc.textContent = 'There is no description available for this spell. Try to search for another spell!'
  }
  displaySpellInfo(data) {
    // if spell is already in storage, show a check otherwise show a plus
    this.spellIsInLocalStorage(data.name) ? this.plusToCheck() : this.checkToPlus();
    this.displayName(data.name);
    this.displayDuration(data.duration);
    this.displayCastingTime(data.casting_time);
    this.displaySchool(data.school.name);
    this.displayLevel(data.level);
    this.displayRange(data.range);
    this.displayClasses(data.classes, data.subclasses);
    this.displayDesc(data);
    this.displayComponents(data);
    this.displayDmgType(data);
    this.displayDmgAtCharLevel(data);
  }
  displayName(name) {
    this.spellName.textContent = name;
  }
  displayDuration(duration) {
    document.querySelector('#duration').textContent = duration;
  }
  displayCastingTime(castingTime) {
    document.querySelector('#c-time').textContent = castingTime;
  }
  displaySchool(school) {
    document.querySelector('#school').textContent = school;
  }
  displayLevel(lvl) {
    document.querySelector('#level').textContent = lvl;
  }
  displayRange(range) {
    document.querySelector('#range').textContent = range;
  }
  displayClasses(cl, sc) {
    const classes = cl.map(e => e.name).join(', ');
    this.classes.textContent = classes;

    const subclasses = sc.map(e => e.name).join(', ');
    this.subclasses.textContent = subclasses;
  }
  displayDesc(data) {
    this.desc.textContent = data.desc[0];
  }
  displayComponents(data) {
    const components = data.components.join(', ');
    this.components.textContent = components;
  }
  displayDmgType(data) {
    this.dmgType.textContent = data.damage ? data.damage.damage_type.name : 'None';
  }
  displayDmgAtCharLevel(data) {
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

      // clear pre-existing list
      this.dmgUL.textContent = '';
  
      // loop through damage at character level list
      dmgList.forEach(e => {
        // create list item element
        let li = document.createElement('li');
        // insert each level into li
        li.appendChild(document.createTextNode(e));
        // add item to the UL
        this.dmgUL.appendChild(li);
      });
  
  
    } else {
      // remove damage at character level section from card
      this.dmgUL.textContent = 'N/A';
    };
  }
  addSpellToLocalStorage() {
    const spellName =this.spellName.textContent;
    
    // if the spell is not already in local storage
    if (!this.spellIsInLocalStorage(spellName)) {
      this.checkToPlus();
      // add it to local storage
      localStorage.setItem(`spell_${this.keyNum}`, spellName);
      this.keyNum++;
      this.plusToCheck(); // turn the plus to a check
    } else {
      console.log(`Spell '${spellName}' is already in local storage.`);
      this.plusToCheck();
    };
  }
  spellIsInLocalStorage(spellName) {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
    
      if (key.startsWith('spell_') && localStorage.getItem(key) === spellName) {
        return true;
      }
    }
    return false;
  }
  plusToCheck() {
    this.plusSymbol.classList.add('hidden');
    this.checkSymbol.classList.remove('hidden');
  }
  checkToPlus() {
    this.plusSymbol.classList.remove('hidden');
    this.checkSymbol.classList.add('hidden');
  }
};

// instantiate SpellDisplayer
const spellDisplayer = new SpellDisplayer();

// *** TO DO: figure out why the key is showing as spell_NaN
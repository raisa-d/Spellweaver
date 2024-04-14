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
    document.querySelector('#search-btn').addEventListener('click', this.fetchSpell.bind(this));
    
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

  fetchSpell() {
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
    
    // call methods to display the info
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

class Spellbook {
    constructor() {
        this.container = document.querySelector('#spells-container');
        this.savedSpells = this.getSavedSpells();

        // add event listener to the spells container. use bind(this) so this will refer to the instance of the Spellbook class and not to the spells container
        this.container.addEventListener('click', this.handleSpellSlotClick.bind(this));
    }

    handleSpellSlotClick(event) {
        const spellSlot = event.target.closest('.spell-slot');
        if(spellSlot) {
            // retrieve spell name
            const spellName = spellSlot.textContent.trim();

            // call method to handle what happens after a spell slot is clicked
            this.displaySpellDetails(spellName);
        }
    }

    displaySpellDetails(spellName) {
        console.log(`You clicked ${spellName}`);
    }

    // get an array of saved spells out of local storage
    getSavedSpells() {
        const savedSpells = [];
        // loop through local storage
        for(let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i); // store key as string
            
            // check if key starts with spell_
            if(key.startsWith('spell_')) {
                // extract spell name from key
                const spellName = localStorage.getItem(key)
                savedSpells.push(spellName);
            }
        }
        return savedSpells;
    }

    displaySpellNames() {
        if(this.savedSpells.length === 0) {
            this.displayEmptySpellbookScreen();
        } else {
            // for each spell name, create a spell slot and add the spellslot to the container
            this.savedSpells.forEach(spellName => {
                const spellSlot = this.createSpellSlot(spellName);
                this.container.appendChild(spellSlot);
            })
        }
    }

    createSpellSlot(spellName) {
        // create section with spell-slot class to append the name to
        const spellSlot = document.createElement('section');
        spellSlot.classList.add('spell-slot');

        // create paragraph, add spell-title class to it, change its content to the spell name
        const spellTitle = document.createElement('p');
        spellTitle.classList.add('spell-title');
        spellTitle.textContent = spellName;

        // append title to slot
        spellSlot.appendChild(spellTitle);
        return spellSlot;
    }

    displayEmptySpellbookScreen() {
        // clear container
        this.container.textContent = '';
        const message = document.createElement('p');
        message.classList.add('empty-msg');
        message.textContent = 'Your spellbook is empty. Go to the search page to add spells, then come back and check out your spellbook!';

        this.container.appendChild(message);
    }
};

// event listener
document.addEventListener('DOMContentLoaded', () => {
    const spellbook = new Spellbook();
    spellbook.displaySpellNames();
});

// ***TO DO: When you click a spell, it will expand to have all of the information.
// ***TO DO: Allow user to have multiple spellbooks for different characters
// ***TO DO: Give option to remove spell from deck
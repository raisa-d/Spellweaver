class Spellbook {
    constructor() {
        this.container = document.querySelector('#spells-container');
        this.savedSpells = this.getSavedSpells();
        this.spellDetailsContainer = document.querySelector('#spell-deets');
        this.goBackButton = document.querySelector('#go-back');
        this.spellInfo = document.querySelector('#spell-info');

        // add event listener to the spells container. use bind(this) so this will refer to the instance of the Spellbook class and not to the spells container
        this.container.addEventListener('click', this.handleSpellSlotClick.bind(this));
    }

    handleSpellSlotClick(event) {
        const spellSlot = event.target.closest('.spell-slot');
        if(spellSlot) {
            this.hideOtherSpellSlots(spellSlot);

            // retrieve spell name
            const spellName = spellSlot.textContent.trim();

            // call method to handle what happens after a spell slot is clicked
            this.displaySpellDetails(spellName);
        }
    }

    hideOtherSpellSlots(clickedSpellSlot) {
        const allSpellSlots = this.container.querySelectorAll('.spell-slot');
        
        // loop thru all spell slots
        allSpellSlots.forEach(spellSlot => {
            // if the current spell slot is not the clicked one, hide it
            if(spellSlot != clickedSpellSlot) {
                spellSlot.classList.add('hidden');
            }
        })

        // move the selected spell slot to flex start to give room for the description
        this.container.style.justifyContent = "flex-start";
    }

    // *** not sure why but when i use the properties i created (i.e., this.goBackButton) i got an error that those properties were null, so i had to write them out with query selectors
    goBack() {
        console.log('you hit the go back button')
        
        // hide the go back button
        document.querySelector('#go-back').classList.add('hidden');

         // show the rest of the spell slots
         document.querySelectorAll('.spell-slot').forEach(spell => spell.classList.remove('hidden'));

        //  hide spell details container
         document.querySelector('#spell-deets').classList.add('hidden');

        //  center spells-container again
         document.querySelector('#spells-container').style.justifyContent = "center";

    }

    displaySpellDetails(spellName) {
        // show the spell deets container
        this.spellDetailsContainer.classList.remove('hidden');
        
        // display the go back button
        this.goBackButton.classList.remove('hidden');

        // add event listener for when go back button is pressed
        this.goBackButton.addEventListener('click', this.goBack)
        
        // move the spell details container to the right of the spell
        this.spellDetailsContainer.style.order = "1";

        console.log(`You clicked ${spellName}`);

        this.fetchSpell(spellName);
    }

    // get spell information from fetch request
    fetchSpell(spellName) {
        // make spell name lowercase and any spaces into dashes
        spellName = spellName.toLowerCase().split(' ').join('-');
        const url = `https://www.dnd5eapi.co/api/spells/${spellName}`;
        
        // fetch request
        fetch(url)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                this.spellInfoIntoDOM(data);
            })
            .catch(err => {
                console.log(`Error: ${err}`);
            });
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

    spellInfoIntoDOM(data) {
        // remove any content inside spellInfo
        this.spellInfo.textContent = '';

        // Description
        const description = document.createElement('p');
        description.textContent = `${data.desc}`;
        description.style.fontStyle = 'italic';
        this.spellInfo.appendChild(description);

        // insert duration into DOM
        const duration = document.createElement('p');
        duration.textContent = `Duration: ${data.duration}`;
        this.spellInfo.appendChild(duration);

        // casting time into DOM
        const castingTime = document.createElement('p');
        castingTime.textContent = `Casting Time: ${data.casting_time}`;
        this.spellInfo.appendChild(castingTime);

        // school into DOM
        const school = document.createElement('p');
        school.textContent = `School: ${data.school.name}`;
        this.spellInfo.appendChild(school);

        // level
        const level = document.createElement('p');
        level.textContent = `Level: ${data.level}`;
        this.spellInfo.appendChild(level);

        // range
        const range = document.createElement('p');
        range.textContent = `Range: ${data.range}`;
        this.spellInfo.appendChild(range);

        // classes
        const classes = document.createElement('p');
        const classesArray = data.classes.map(c => c.name).join(', ');
        classes.textContent = `Classes: ${classesArray || 'N/A'}`;
        this.spellInfo.appendChild(classes);

        // subclasses
        const subclasses = document.createElement('p');
        const subclassesArray = data.subclasses.map(c => c.name).join(', ');
        subclasses.textContent = `Subclasses: ${subclassesArray || 'N/A'}`;
        this.spellInfo.appendChild(subclasses);

        // Components
        const components = document.createElement('p');
        const componentsArray = data.components.join(', ');
        components.textContent = `Components: ${componentsArray}`;
        this.spellInfo.appendChild(components);

        // Damage Type
        const damageType = document.createElement('p');
        damageType.textContent = `Damage Type: ${data.damage ? data.damage.damage_type.name : 'N/A'}`;
        this.spellInfo.appendChild(damageType);

        // Damage at Character Level
        const damageAtCharLvl = document.createElement('p');

        // storing damage at each level
        const dmgArray = [];

        // fill dmg Array
        if(data.damage) {
            if(data.damage.damage_at_slot_level) {
                for (const [key, value] of Object.entries(data.damage.damage_at_slot_level)) {
                    dmgArray.push(`Lvl ${key}: ${value}`);
                  };  
            } else if(data.damage.damage_at_character_level) {
                for (const [key, value] of Object.entries(data.damage.damage_at_character_level)) {
                    dmgArray.push(`Lvl ${key}: ${value}`);
                  };
            };

            damageAtCharLvl.textContent = `Damage At Character Level: `;

            // create UL, lis, and append
            let dmgUL = document.createElement('ul');
            dmgArray.forEach(e => {
                // create list item element
                let li = document.createElement('li');
                // insert each level into li
                li.appendChild(document.createTextNode(e));
                // add item to the UL
                dmgUL.appendChild(li);
            });
            this.spellInfo.appendChild(damageAtCharLvl);
            this.spellInfo.appendChild(dmgUL);
        } else {
            damageAtCharLvl.textContent = `Damage At Character Level: N/A`;
            this.spellInfo.appendChild(damageAtCharLvl);
        }
    }
};

// event listener. on page load, instantiate Spellbook
document.addEventListener('DOMContentLoaded', () => {
    const spellbook = new Spellbook();
    spellbook.displaySpellNames();
});

// ***TO DO: Allow user to have multiple spellbooks for different characters
// ***TO DO: Give option to remove spell from deck
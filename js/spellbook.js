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
class Spellbook {
    constructor() {
        this.container = document.querySelector('#spells-container');
        this.savedSpells = this.getSavedSpells();
    }

    // get an array of saved spells out of local storage
    getSavedSpells() {
        const savedSpells = [];
        // loop through local storage
        for(let i = 0; i < localStorage.length; i++) {
            const key = parseInt(localStorage.key(i)); // store key as number
            
            // add spell name to list
            if(!isNaN(key)) {
                savedSpells.push(localStorage.getItem(key))
            }
        }
        return savedSpells;
    }

    displaySpellNames() {
        // for each spell name, create a spell slot and add the spellslot to the container
        this.savedSpells.forEach(spellName => {
            const spellSlot = this.createSpellSlot(spellName);
            this.container.appendChild(spellSlot);
        })
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
}

// event listener
document.addEventListener('DOMContentLoaded', () => {
    const spellbook = new Spellbook();
    spellbook.displaySpellNames();
})


// ***TO DO: When you click a spell, it will expand to have all of the information.
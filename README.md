<h1 align="center">Spellweaver</h1>

https://github.com/raisa-d/Spellweaver/assets/144272001/dbe5c56b-a999-442f-83c3-02daeaaeafb5

<p>This repository holds the cold for Spellweaver, a web application designed to help Dungeons &amp; Dragons (D&D) players manage their spellbooks efficiently. Whether you're a player looking to organize your spells or a Dungeon Master (DM) preparing for an epic adventure, Spellweaver provides the tools you need to master the arcane arts. This web app is integrated with the RESTful API <a href="https://www.dnd5eapi.co/">dnd5e</a></p>

## Table of Contents
- [Technologies Used](#technologies-used)
- [Optimizations](#optimizations)
- [Development Stage](#development-stage)
- [Features](#features)
- [Lessons Learned](#lessons-learned)
- [Design](#design)
- [Contributing](#contributing)

## Technologies Used
<a href="https://www.figma.com/" target="_blank" rel="noreferrer"> 
    <img src="https://www.vectorlogo.zone/logos/figma/figma-icon.svg" alt="figma" width="40" height="40"/> 
</a> 
<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" rel="noreferrer"> 
    <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="javascript" width="40" height="40"/> 
</a> 
<a href="https://www.w3schools.com/css/" target="_blank" rel="noreferrer"> 
  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original-wordmark.svg" alt="css3" width="40" height="40"/> 
</a> 
<a href="https://www.w3.org/html/" target="_blank" rel="noreferrer"> 
  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original-wordmark.svg" alt="html5" width="40" height="40"/> 
</a> 
<a href="https://git-scm.com/" target="_blank" rel="noreferrer"> 
  <img src="https://www.vectorlogo.zone/logos/git-scm/git-scm-icon.svg" alt="git" width="40" height="40"/> 
</a>
<ul>
  <li>HTML5, CSS3, JavaScript</li>
  <li>Design: Figma</li>
  <li>Storage: Local Storage</li>
  <li>Version Control: Git</li>
  <li>RESTful API: <a href="https://www.dnd5eapi.co/" target="_blank">dnd5e API</a></li>
</ul>

## Optimizations
<p>The next iterations of this web app will include the following functionality:</p>
<ol>
  <li>The spell details will display once user has clicked on the individual spell in their spellbook.</li>
  <li>The switch between the spellbook screen and individual spell description screen will have a smooth animation.</li>
  <li>Users will be able to have multiple spellbooks for different characters.</li>
  <li>Users will have the option to edit their spellbooks and remove spells.</li>
  <li>On the search/home page, there will be a dropdown where the user can select which of their spellbooks they want to add the spell to.</li>
</ol>
<p>Future directions:</p>
<ul>
  <li>Integrating this web app with mongoDB instead of using local storage.</li>
  <li>Adding a login page and user authentication so the users can sync their spellbooks across devices.</li>
</ul>

## Development Stage
### 04.14.2024
BUG FIX & EXPLANATION: Originally, the spells were set in local storage with a numerical key. Then, I changed it so the number is prefixed by "spell_". When I did this, it created a bug where spells would be stored as "spell_NaN" and overwrite each other. To fix this bug, I had to switch from using parseInt (which was what caused it to be NaN) and instead check if key.startsWith('spell_') in both the main.js file and the spellbook.js file.

When users click on a spell in their spellbook, they will see the spell name side by side with the container in which the spell information will go (right now, an empty box). This was achieved using DOM manipulation in spellbook.js. I also added a go back button so when users are on this screen, they can go back to all the rest of their spells. In the future, I'd like to add a smooth animation between these two screens.

The priorities for the next updates are:
- Inserting the spell details into the DOM (perhaps extend the SpellDisplayer class to do this and utilize polymorphism)
- Animating the switch between the spellbook screen and the spell description screen
- Allow user to have multiple spellbooks for different characters
- Give user the option to remove a spell from their spellbook (add an edit button to trigger the ability to remove a spell)

### 04.11.2024
Now when users add spells to their deck, the spells will appear on the spellbook page!
The priority of the next updates are the following features:
- When user clicks a spell, it will expand to have all of the information. 
- Allow user to have multiple spellbooks for different characters
- Give user the option to remove a spell from their spellbook
- On the search page, add a dropdown so user can select which spellbook they are adding to

### 04.10.2024
The ability to add spells to local storage via hitting the plus button has been added. A user will not be able to add a spell twice if they try to. The plus symbol will turn to a check once the spell is added. The search page is also now responsive for all screen sizes. In the next update, the spells will actually be added to the "spellbook" page.

### 04.08.2024
Currently, we have implemented functionality & user interface for the spell search, allowing users to search for spells by name. Once a search query is made, the spell's information and statistics dynamically appear in the Document Object Model (DOM), providing users with detailed insights into each spell. The next focus will be on creating the user's deck and adding the ability to add spells to said deck, which will be saved using local storage.

### 04.05.2024
Began styling the spells that will be displayed on the search page & styled the search bar with vanilla CSS.

### 04.04.2024
We have designed an [initial concept](#design) in Figma & began to build the front-end. There is a header and a nav as of right now.

## Features
-  Intuitive Spell Management: Easily search, filter, and add spells to your spellbook, tailored to your character or campaign.
-  Customization Options: Create multiple spellbooks for different characters or campaigns, and mark spells as favorites for quick access.
-  Mobile Compatibility: Mobile-friendly interface, perfect for in-person gaming sessions.
- RESTful API Integration: Utilize the [D&D API](https://www.dnd5eapi.co/) to fetch information about spells from the official source. This ensures that your spellbook is always up-to-date with the latest rules and content additions.

## Lessons Learned
<p>In working on this project, I have learned a lot about local storage and RESTful API integration. Oftentimes, the data doesn't come back in the way you expected, so you have to dig deeper into the documentation or the data you do receive back in the console. I also am coding this using Object-Oriented Programming principles and this has helped solidify abstraction, encapsulation, inheritance, and polymorphism.</p>
<p>April 27, 2024: The current problem I am working on solving / lesson I am learning is how I can let two JavaScript files communicate with each other. I have a SpellDisplayer class in my main.js file which makes the API fetch & displays all of the spell information on the DOM on the search bar page. I currently have a separate js file for the Spellbook page which has a class of Spellbook. That class handles getting the spells in local storage and displaying them on the spellbook page. The next thing I need to do is display all of the information on this page. I want DRY (do not repeat yourself) code so I am figuring out if I can use inheritance and polymorphism by inheriting from the SpellDisplayer class and altering the methods so that the information is displayed in the right places on the DOM. Otherwise, I would have to have WET (write everything twice) code by essentially rewriting all the same methods and the API fetch on the Spellbook.js file.</p>

## Design
<p align="center">
The initial designs for the web app were created using Figma:
</p>
<p align="center">
  <img height="300" alt="Spellweaver Searchbar Design" src="https://github.com/raisa-d/Spellweaver/assets/144272001/26740ede-b299-4e2b-bab2-7205035c9687">
  <img height="300" alt="Spellweaver Spellbook Design" src="https://github.com/raisa-d/Spellweaver/assets/144272001/0926619a-311d-4e33-a9c6-87edfaa48f8d">
</p>
<p>Color Palette: <a href="https://www.colorhub.app/browse/duck-egg">Duck Egg</a></p>

## Contributing
We welcome contributions from the D&D community to make Spellweaver even better! Whether it's bug fixes, new features, or enhancements, feel free to fork our repository and submit pull requests. 

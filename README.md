<h1 align="center">Spellweaver</h1>
Spellweaver is a web application designed to help Dungeons &amp; Dragons (D&D) players manage their spellbooks efficiently. Whether you're a player looking to organize your spells or a Dungeon Master (DM) preparing for an epic adventure, Spellweaver provides the tools you need to master the arcane arts.

## Table of Contents
- [Video Demo](#video-demo)
- [Development Stage](#development-stage)
- [Design](#design)
- [Technologies Used](#technologies-used)
- [Features](#features)
- [Contributing](#contributing)

## Video Demo
https://github.com/raisa-d/Spellweaver/assets/144272001/dbe5c56b-a999-442f-83c3-02daeaaeafb5

## Development Stage
04.11.2024 //
Now when users add spells to their deck, the spells will appear on the spellbook page!
The priority of the next updates are the following features:
- When user clicks a spell, it will expand to have all of the information.
- Allow user to have multiple spellbooks for different characters
- Give user the option to remove a spell from their spellbook

04.10.2024 // 
The ability to add spells to local storage via hitting the plus button has been added. A user will not be able to add a spell twice if they try to. The plus symbol will turn to a check once the spell is added. The search page is also now responsive for all screen sizes. In the next update, the spells will actually be added to the "spellbook" page.

04.08.2024 // 
Currently, we have implemented functionality & user interface for the spell search, allowing users to search for spells by name. Once a search query is made, the spell's information and statistics dynamically appear in the Document Object Model (DOM), providing users with detailed insights into each spell. The next focus will be on creating the user's deck and adding the ability to add spells to said deck, which will be saved using local storage.

04.05.2024 //
Began styling the spells that will be displayed on the search page & styled the search bar with vanilla CSS.

04.04.2024 //
We have designed an [initial concept](#design) in Figma & began to build the front-end. There is a header and a nav as of right now.

## Design
<p align="center">
The initial designs for the web app were created using Figma:
</p>
<p align="center">
  <img height="300" alt="Spellweaver Searchbar Design" src="https://github.com/raisa-d/Spellweaver/assets/144272001/26740ede-b299-4e2b-bab2-7205035c9687">
  <img height="300" alt="Spellweaver Spellbook Design" src="https://github.com/raisa-d/Spellweaver/assets/144272001/0926619a-311d-4e33-a9c6-87edfaa48f8d">
</p>

## Technologies Used
- Design: [Figma](https://www.figma.com/)
- Front End: HTML5, CSS3, JavaScript
- Storage: Local Storage

## Features
-  Intuitive Spell Management: Easily search, filter, and add spells to your spellbook, tailored to your character or campaign.
-  Customization Options: Create multiple spellbooks for different characters or campaigns, and mark spells as favorites for quick access.
-  Mobile Compatibility: Mobile-friendly interface, perfect for in-person gaming sessions.
- API Integration: Utilize the [D&D API](https://www.dnd5eapi.co/) to fetch information about spells from the official source. This ensures that your spellbook is always up-to-date with the latest rules and content additions.

## Contributing
We welcome contributions from the D&D community to make Spellweaver even better! Whether it's bug fixes, new features, or enhancements, feel free to fork our repository and submit pull requests. 

Color Palette: [Duck Egg](https://www.colorhub.app/browse/duck-egg)

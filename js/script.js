/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing

document.addEventListener('DOMContentLoaded', () => {

   // Global variables
   const firstUl = document.querySelector('ul.student-list');
   firstUl.style.display = 'none';
   const ItemsCreated = firstUl.children;

   const div = createElement('div', firstUl.previousElementSibling, 'student-search');
   const searchInput = createElement('input', div, '');
         searchInput.placeholder = 'Search for students...';
   const searchButton = createElement('button', div, '');
         searchButton.textContent = 'Search';
   
   // Create an element HTML and append it to their parent
   function createElement(nameElement, parent, nameClasse) {
      const element = document.createElement(nameElement);
      element.className = nameClasse;
      parent.appendChild(element);
      return element;
   }

   // Create a new list of `numItems` Studens
   function addItemsToEachPage(numItems) {
      const ul = document.createElement('ul');
      ul.className = 'student-list';
      ul.style.display = 'none';

      for (let i = 0; i < numItems; i++) {
         if (ItemsCreated.length === 0) {
            break;
         }
         ul.appendChild(ItemsCreated[0]);
      }

      return ul;
   }

   // Changes the property of an element with a `chosenFeature` pattern
   function showElementActive(feature, chosenFeature, element, property, valueActive, valueInactive) {
      if (feature === chosenFeature) {
         element[property] = valueActive;
      }
      else {
         element[property] = valueInactive;
      }
   }

   // Create pages that contain a specific number of students each
   function createStudensPages(numItems, pageNumberToShow) {
      const pagesNumber = Math.ceil(ItemsCreated.length / numItems);
      const div = createElement('div', firstUl.parentNode, '');
      
      for (let i = 0; i < pagesNumber; i++) {
         const page = addItemsToEachPage(numItems)
         showElementActive(i, pageNumberToShow, page.style, 'display', 'block', 'none');
         div.appendChild(page);
      }
      // Return the `Pagination`
      return appendPageLinks(pagesNumber, pageNumberToShow);
   }

   //Create the buttons to navigate by the pages
   function appendPageLinks(numButtons, pageNumberToShow) {
      const ul = createElement('ul', firstUl.parentNode, 'pagination');
      for (let i = 0; i < numButtons; ) {
         const a = createElement('a', createElement('li', ul, ''), '');
         showElementActive(i, pageNumberToShow, a, 'className', 'active', '');
         a.textContent = ++i;
      }
      return ul;
   }

   // Display the page assigned to the button clicked
   function showPage(activeElement, button) {
      const studentsPages = firstUl.nextElementSibling.children;
      const buttons = button.parentNode.children;

      for(let i = 0; i < buttons.length; ) {
         const link = buttons[i].firstElementChild;
         const oneStudentsPage = studentsPages[i++];
         showElementActive(link, activeElement, link, 'className', 'active', '');
         showElementActive(link, activeElement, oneStudentsPage.style, 'display', 'block', 'none');
      }
      
   }

   // Programma start here
   const pagination = createStudensPages(5, 0); //(num of items per page , num of start page - 1)
   
   pagination.addEventListener('click', (event) => {
      if (event.target.tagName == 'A') {
         const element = event.target;
         showPage(element, element.parentNode);
      }
   });



});
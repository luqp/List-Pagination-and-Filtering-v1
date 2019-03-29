/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
document.addEventListener('DOMContentLoaded', () => {
   const data = {
      items: document.querySelector('ul.student-list').children,
      grandParent: document.querySelector('ul.student-list').parentNode,
      parentShearch: document.querySelector('div.page-header'),
      startPage: 1,
      itemsPerPage: 10
   };

   createPagination(data.grandParent, data.items, data.startPage, data.itemsPerPage);

   const searchElements = createElement(data.parentShearch, 'div', 'student-search');
   const searchInput = createElement(searchElements, 'input', '');
   const searchButton = createElement(searchElements, 'button', '');

   data.items[0].parentNode.style.display = 'none';
   searchInput.placeholder = 'Search for students...';
   searchButton.textContent = 'Search';

   searchInput.addEventListener('keyup', () => { searchItems(data, searchInput.value); });
   searchButton.addEventListener('click', () => { searchItems(data, searchInput.value); });
});

function createPagination(container, items, startPageNumber, itemsPerPage) {
   const pagesQuantity = Math.ceil(items.length / itemsPerPage);
   const pages = createPages(container, items, pagesQuantity, itemsPerPage);
   const paginationLinks = appendPageLinks(container, pagesQuantity);

   paginationLinks.addEventListener('click', (event) => { selectPage(event, pages.children, paginationLinks.children); });

   showPage(startPageNumber, pages.children, paginationLinks.children);
}
// Create an element HTML and append it to their parent
function createElement(parent, nameElement, nameClasse) {
   const element = document.createElement(nameElement);
   element.className = nameClasse;
   parent.appendChild(element);
   return element;
}
// Create all pages of students
function createPages(container, items, pagesQuantity, itemsPerPage) {
   const div = createElement(container, 'div', 'js');

   for (let i = 0; i < pagesQuantity; i++) {
      const itemsPage = addItemsToPage(items, itemsPerPage, itemsPerPage * i);
      div.appendChild(itemsPage);
   }

   return div;
}
// Create a new page of `itemsPerPage` Studens
function addItemsToPage(items, itemsPerPage, starNumber) {
   const ul = document.createElement('ul');
   ul.className = 'student-list';
   ul.style.display = 'none';

   for (let i = 0; i < itemsPerPage; i++) {
      let index = i + starNumber;
      if ((i + starNumber) < items.length) {
         ul.appendChild(items[index].cloneNode(true));
      }
   }

   return ul;
}
// Create the buttons to navigate by the pages
function appendPageLinks(container, pagesQuantity) {
   const ul = createElement(container, 'ul', 'pagination');

   for (let i = 0; i < pagesQuantity; i++) {
      const a = createElement(createElement(ul, 'li', ''), 'a', '');
      a.textContent = i + 1;
   }
   return ul;
}
// Display the page assigned to the button clicked
function showPage(pageNumber, pages, paginationLinks) {

   for (let i = 0; i < paginationLinks.length; i++) {
      const link = paginationLinks[i].firstElementChild;
      const currentPage = pages[i];
      const currentPageNumber = link.textContent;
      processToShowPage(currentPageNumber, () => { link.className = 'active'; }, () => { link.className = ''; });
      processToShowPage(currentPageNumber, () => { currentPage.style.display = 'block'; }, () => { currentPage.style.display = 'none'; });
   }

   function processToShowPage(currentPageNumber, activate, deactivate) {
      if (currentPageNumber == pageNumber) {
         activate();
      }
      else {
         deactivate();
      }
   }
}
// Point to the page of the selected button
function selectPage(event, pages, paginationLinks) {
   const link = event.target;
   if (link.tagName !== 'A') {
      return;
   }
   showPage(link.textContent, pages, paginationLinks);
}
// Verify if there are names that matching with the `searchParameter`
function addMatchingItems(items, searchParameter) {
   const paremeter = searchParameter.toLowerCase();
   const ul = document.createElement('ul');

   for (let j = 0; j < items.length; j++) {
      let nameStudent = items[j].querySelector('h3').textContent;
      nameStudent = nameStudent.toLowerCase();

      if (nameStudent.includes(paremeter)) {
         ul.appendChild(items[j].cloneNode(true));
      }
   }

   return ul;
}
// Init a new search 
function searchItems(data, searchParameter) {
   remove('.js-not-found');
   remove('div.js');
   remove('ul.pagination');
   const foundItems = addMatchingItems(data.items, searchParameter);

   if (foundItems.textContent === '') {
      notFound();
      return;
   }

   createPagination(data.grandParent, foundItems.children, data.startPage, data.itemsPerPage);

   function remove(nameElement) {
      const element = document.querySelectorAll(nameElement);
      let size = element.length;
      while (size > 0) {
         element[0].parentNode.removeChild(element[--size]);
      }
   }

   function notFound() {
      const container = createElement(data.grandParent, 'div', 'js-not-found');
      const question = createElement(container, 'h3', 'js-question');
      question.textContent = "A NEW SEARCH TRY?";
      const comunicate = createElement(container, 'h1', 'js-comunicate');
      comunicate.textContent = "Found No One Student With That Search Parameter";
   }
}
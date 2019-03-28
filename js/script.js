/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
document.addEventListener('DOMContentLoaded', createPagination(document.querySelector('ul.student-list').children, 1, 6));

const searchElements = createElement('div', document.querySelector('div.page-header'), 'student-search');
const searchInput = createElement('input', searchElements, '');
searchInput.placeholder = 'Search for students...';
const searchButton = createElement('button', searchElements, '');
searchButton.textContent = 'Search';

function createPagination(items, startPageNumber, itemsPerPage) {
   const pagesNumber = Math.ceil(items.length / itemsPerPage);
   const pages = createPages(items, pagesNumber, itemsPerPage);
   const paginationLinks = appendPageLinks(pages.parentNode, pagesNumber);
   paginationLinks.addEventListener('click', (event) => { selectPage(event, pages.children, paginationLinks.children); });

   showPage(startPageNumber, pages.children, paginationLinks.children);
}
// Create an element HTML and append it to their parent
function createElement(nameElement, parent, nameClasse) {
   const element = document.createElement(nameElement);
   element.className = nameClasse;
   parent.appendChild(element);
   return element;
}
// Create a new all pages of students
function createPages(items, pagesNumber, itemsPerPage) {
   const div = createElement('div', items[0].parentNode.parentNode, 'js');

   for (let i = 0; i < pagesNumber; i++) {
      const itemsPage = addItemsToEachPage(items, itemsPerPage);
      div.appendChild(itemsPage);
   }

   return div;
}
// Create a new list of n Studens
function addItemsToEachPage(items, itemsPerPage) {
   const ul = document.createElement('ul');
   ul.className = 'student-list';
   ul.style.display = 'none';

   for (let i = 0; i < itemsPerPage; i++) {
      if (items.length === 0) {
         break;
      }
      ul.appendChild(items[0]);
   }

   return ul;
}
// Create the buttons to navigate by the pages
function appendPageLinks(contain, numButtons) {//container
   const ul = createElement('ul', contain, 'pagination');

   for (let i = 0; i < numButtons;) {
      const a = createElement('a', createElement('li', ul, ''), '');
      a.textContent = ++i;
   }
   return ul;
}
// Display the page assigned to the button clicked
function showPage(pageNumber, pages, paginationLinks) {
   for (let i = 0; i < paginationLinks.length; i++) {
      const link = paginationLinks[i].firstElementChild;
      const currentPage = pages[i];
      const currentPageNumber = link.textContent;
      processPage(currentPageNumber, () => { link.className = 'active'; }, () => { link.className = ''; });
      processPage(currentPageNumber, () => { currentPage.style.display = 'block'; }, () => { currentPage.style.display = 'none'; });
   }

   function processPage(currentPageNumber, activate, deactivate) {
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
   const button = event.target;
   if (button.tagName !== 'A') {
      return;
   }
   showPage(button.textContent, pages, paginationLinks);
}

function addMatchingItems(emptyList, items, searchValue) {
   for (let i = 0; i < items.length; i++) {
      const pageItems = items[i].children;
      for (let j = 0; j < pageItems.length; j++) {
         const nameStudent = pageItems[j].querySelector('h3').textContent;

         if (nameStudent.includes(searchValue)) {
            emptyList.appendChild(pageItems[j].cloneNode(true));
         }
      }
   }
   return emptyList;
}

function searchItems() {
   const divs = document.querySelectorAll('div.js');
   const uls = document.querySelectorAll('ul.pagination');
   let num = divs.length;
   while (num > 1) {
      divs[0].parentNode.removeChild(divs[--num]);
      uls[0].parentNode.removeChild(uls[num]);
   }
   const ul = document.querySelector('ul.student-list');
   ul.style.display = 'none';
   const items = ul.nextElementSibling;
   items.style.display = 'none';
   const buttons = items.nextElementSibling;
   buttons.style.display = 'none';
   const value = searchInput.value;
   ul.textContent = '';
   addMatchingItems(ul, items.children, value);

   if (ul.children.length === 0) {
      return;
   }
   createPagination(ul.children, 1, items.children[0].children.length);

}

searchButton.addEventListener('click', searchItems);
searchInput.addEventListener('keyup', searchItems);
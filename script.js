console.log("page loaded");

const gifForm = document.querySelector("form");
const gifResults = document.querySelector("#gif-results");
const loadButton = document.querySelector(".hidden");
const searchInput = document.getElementById('search-input');
const apiKey = "ZzGHO6UA4jAo0fU6hInmEDLLEgejNi6k";
const limit = 9;
const rating = "g";
let currentPage = 0;
let offset = currentPage*limit;
var currentSearchTerm = '';

gifForm.addEventListener("submit", handleFormSubmit);
loadButton.addEventListener("click", showMore);


async function getResults(search_term) {
    const apiUrl = "http://api.giphy.com/v1/gifs/search?api_key=" + apiKey + "&q=" + search_term + "&limit=" + limit + "&offset=" + offset;

    // 2. On form submit, go to the gif API 
    const response = await fetch(apiUrl);
    const responseData = await response.json();
    const data = responseData.data
  
   data.forEach(element => displayResults(element));
   return data;

  }

  function displayResults(element) {
      gifResults.innerHTML+=`
      <img src="${element.images.original.url} "alt=${element.title}/>"
      `
  } 

  async function handleFormSubmit(event){
      event.preventDefault();
      gifResults.innerHTML =` `;
      currentSearchTerm = searchInput.value;
      const results = await getResults(currentSearchTerm);
      //displayResults(results);
      searchInput.value = '';
      currentPage++;
      loadButton.classList.remove('hidden');
  }

  async function showMore(event){
    const results = await getResults(currentSearchTerm);  
    //displayResults(results);
    currentPage++;
  }
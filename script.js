console.log("page loaded");

const gifForm = document.querySelector("form");
const gifResults = document.querySelector("#gif-results");
const apiKey = "ZzGHO6UA4jAo0fU6hInmEDLLEgejNi6k";
// const limit;
// const rating;
gifForm.addEventListener("submit", handleFormSubmit);

async function getResults(search_term) {
    const apiUrl = "http://api.giphy.com/v1/gifs/search?api_key=" + apiKey + "&q=" + search_term;
    //console.log(apiUrl);

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

  function handleFormSubmit(event){
      event.preventDefault();
      const gifInput = event.target.Gif;
      const gif = gifInput.value;
      gifResults.innerHTML =` `;
      getResults(gif);
  }
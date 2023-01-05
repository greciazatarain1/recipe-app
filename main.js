const searchForm = document.querySelector('form');
const searchResultDiv = document.querySelector('.search-result');
const container = document.querySelector('.container');
const hero = document.querySelector('.hero');
let searchQuery = '';
const APP_ID = '9cc8b6af';
const APP_key = '81ab870b65958d369b4ff78d11ddd641';


searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    searchQuery = e.target.querySelector('input').value;
    fetchAPI();
    hero.classList.add('small');
});

async function fetchAPI(){
    const baseURL = `https://api.edamam.com/search?q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_key}&to=20`;
    const response = await fetch(baseURL);
    const data = await response.json()
    generateHTML(data.hits)
    console.log(data);
}

function generateHTML(results){
    let generatedHTML = ''
    if(results.length > 0){
        results.map(result =>{
            generatedHTML +=
            `
            <li class="item">
            <img src="${result.recipe.image}" alt="${result.recipe.label}">
                <div class="flex-container">
                    <h2 class="title">${result.recipe.label}</h2>
                    <ul class="item-data"><li><i class="fa-regular fa-clock"></i> ${result.recipe.totalTime}m</li><li>${Math.trunc(result.recipe.calories)}kcal</li><li class="type"> ${
                        result.recipe.cuisineType.length > 0
                          ? result.recipe.cuisineType
                          : "No Data Found"
                      }</li>
                    </ul>
                    <a href="${result.recipe.url}" target="_blank" class="link"></a>
                </div>
            </li>
            `
        })
    } else {
        generatedHTML = 
        `
        <p class="not-found">
            0 results found for your search.</br>
            Please try another search term
        </p>
        `
    }
    searchResultDiv.innerHTML = generatedHTML;
}
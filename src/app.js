import { saveToLocalStorage, getLocalStorage, removeFromLocalStorage} from "./localStorage.js";

let normalImage = document.getElementById('normalImage');
let normalImageSmall = document.getElementById('normalImageSmall');
let shinyImage = document.getElementById('shinyImage');
let shinyImageSmall = document.getElementById('shinyImageSmall');
let pokeName = document.getElementById('pokeName');
let pokeId = document.getElementById('pokeId');
let pokeType = document.getElementById('pokeType');
let pokeLoc = document.getElementById('pokeLoc');
let pokeAbilities = document.getElementById('pokeAbilities');
let pokeEvolution = document.getElementById('pokeEvolution');
let pokeMoves = document.getElementById('pokeMoves');
let inputField = document.getElementById('inputField');
let randomPoke = document.getElementById('randomPoke');
let saveButton = document.getElementById('saveButton');
let favInject = document.getElementById('favInject');
const toggleButton = document.getElementById('toggle-nav');
const offcanvasNav = document.getElementById('offcanvas-nav');
const closeButton = document.getElementById('close-nav');
const mainContent = document.getElementById('main-content');

let pokeApi; 
let pokeApi2; 
let pokeApi3;
let pokeApi4;


// All the Buttons go Here
toggleButton.addEventListener('click', () => {
    let localStorageData = getLocalStorage();
    offcanvasNav.classList.toggle('hidden');
        favInject.innerHTML = ''
        CreateElements() 
  });
  closeButton.addEventListener('click', () => {
    offcanvasNav.classList.add('hidden');
    mainContent.classList.remove('hidden');
  });
  saveButton.addEventListener('click', () => {
    
    saveToLocalStorage(pokeApi.name);
})
randomPoke.addEventListener('click', () => {
    pokeFetch(rndmNum(649))
})
 
//  The one and only input field
inputField.addEventListener('keyup', (event) => {
    if (event.key === "Enter") {
        // Perform desired action here
        pokeFetch(inputField.value.toLowerCase())
        }
})

//  This is the main function that has all other functions neslted within it
async function pokeFetch(name){
    const promise = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const data = await promise.json();
    let urlNormal;
    let urlShiny;
    pokeApi = data; 
    if (pokeApi.id > 649)
    {
        alert("The Pokemon you selected is out of the range. Please select one generation 5 or before")
    }
    else
    {
        NormalImageGenerator(pokeApi.sprites.front_default);
        NormalImageGeneratorSmall(pokeApi.sprites.front_default)
        ShinyImageGenerator(pokeApi.sprites.front_shiny)
        ShinyImageGeneratorSmall(pokeApi.sprites.front_shiny)
        pokeFetchEncounters(pokeApi.location_area_encounters)
        GetTypes(pokeApi.types);
        GetAbilities(pokeApi.abilities);
        GetMoves(pokeApi.moves)
        GetSpecies(pokeApi.species.url)
        pokeName.innerHTML = `${pokeApi.name}`
        pokeId.innerHTML = `${pokeApi.order}`
    }
}

// Secondary Functions that Will be nested Starting with the async ones first
async function GetSpecies(url){
    const promise = await fetch(url);
    const data = await promise.json();
    pokeApi4 = data; 
    console.log(pokeApi4) 
    GetEvolutions(pokeApi4.evolution_chain.url);
}
async function GetEvolutions(url){
    const promise = await fetch(url);
    const data = await promise.json();
    pokeEvolution.innerHTML = ''
    pokeApi3 = data; 
    pokeApi3.chain.evolves_to.forEach(element => {
        pokeEvolution.innerHTML += `${element.species.name} `
    })
}
async function pokeFetchEncounters(url){
    const promise = await fetch(url);
    const data = await promise.json();
    pokeApi2 = data; 
    pokeLoc.innerHTML = ''
    pokeApi2.forEach(element => {
        pokeLoc.innerHTML = `${element.location_area.name}`
    });
}
function rndmNum(num){
    return Math.floor(Math.random() * num);
}
function NormalImageGenerator (url) {
    let icon = document.createElement("img");
    icon.src = url;
    normalImage.innerHTML = ""
    normalImage.appendChild(icon);
}
function NormalImageGeneratorSmall (url) {
    let icon = document.createElement("img");
    icon.src = url;
    normalImageSmall.innerHTML = ""
    normalImageSmall.appendChild(icon);
}
function ShinyImageGenerator (url2) {
    let icon = document.createElement("img");
    icon.className = ''
    icon.src = url2;
    shinyImage.innerHTML = ""
    shinyImage.appendChild(icon);
}
function ShinyImageGeneratorSmall (url2) {
    let icon = document.createElement("img");
    icon.className = ''
    icon.src = url2;
    shinyImageSmall.innerHTML = ""
    shinyImageSmall.appendChild(icon);
}
function GetTypes(input){
    pokeType.innerHTML = ''
    input.forEach(element => {
        pokeType.innerHTML += `${element.type.name}, `
    });
}
function GetAbilities(input){
    pokeAbilities.innerHTML = ''
    input.forEach(element => {
        pokeAbilities.innerHTML += `${element.ability.name}, `
    })
}
function GetMoves(input){
    pokeMoves.innerHTML = ''
    input.forEach(element => {
        pokeMoves.innerHTML += `${element.move.name}, `
    })
}

// this is the main function for creating local storage and the favorites list
function CreateElements(name){
    let favorites = getLocalStorage();
    
    favorites.map(pokemon => {
        // Creating pokemon name
        let p = document.createElement('p');
        p.className = 'w-4/6 sm:w-1/2 bg-red-500 text-black  font-bold py-1 px-2  rounded-t-full border-black border-2 text-center mt-2'
        p.textContent = pokemon;
        // Info Button
        let infoBtn = document.createElement('button')
        infoBtn.className = 'w-1/3 sm:w-1/4 bg-white text-black font-bold py-1 px-2 rounded-bl-full border-black border-2'
        infoBtn.type = 'buton'
        let questionImg = document.createElement('img');
        questionImg.src = '../assets/information.png';
        questionImg.alt = 'Delete';
        questionImg.classList = 'w-6 h-6 mx-4'
        infoBtn.appendChild(questionImg);
        // Delet Button
        let deleteBtn = document.createElement('button')
        deleteBtn.type = 'buton'
        deleteBtn.className = 'w-1/3 sm:w-1/4 bg-white text-black font-bold py-1 px-2 rounded-br-full border-black border-2'
        let deleteImg = document.createElement('img');
        deleteImg.src = '../assets/trash.png';
        deleteImg.alt = 'Delete';
        deleteImg.classList = 'w-6 h-6 mx-1'
        deleteBtn.appendChild(deleteImg);
        // Event Listeners 
        deleteBtn.addEventListener('click', function() {
            removeFromLocalStorage(pokemon);
            favInject.innerHTML = ""
            CreateElements()
        })
        infoBtn.addEventListener('click', () => {
            pokeFetch(pokemon)
        })
        // injects
        favInject.appendChild(p);
        favInject.appendChild(infoBtn)
        favInject.appendChild(deleteBtn)
    })
}
// Gotta cath em all
pokeFetch(1);
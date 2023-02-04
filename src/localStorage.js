
// Scotts Save to local storage function
function saveToLocalStorage (name) {
    let favorites = getLocalStorage();
    favorites.push(name);
    localStorage.setItem('Favorites', JSON.stringify(favorites))
}
// Scotts get local storage function
function getLocalStorage () {
    let localStorageData = localStorage.getItem('Favorites')
    if(localStorageData == null){
        return [];
    }
    return JSON.parse(localStorageData)
}
// Scotts remove from local storage function
function removeFromLocalStorage(name) {
    let favorites = getLocalStorage();
    let pokemonName = favorites.indexOf(name)
    favorites.splice(pokemonName, 1)
    localStorage.setItem('Favorites', JSON.stringify(favorites))
}
export{saveToLocalStorage, getLocalStorage, removeFromLocalStorage}
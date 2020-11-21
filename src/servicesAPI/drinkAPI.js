async function fetchDrink(searchFor, value) {
  const baseURL = 'https://www.thecocktaildb.com/api/json/v1/1/';
  const searchType = {
    ingredient: 'filter.php?i=',
    itemName: 'search.php?s=',
    firstLetter: 'search.php?f=',
    random: 'random.php',
  };
  const URL = `${baseURL}${searchType[searchFor]}${value}`;
  console.log(URL);
  const response = await fetch(URL);
  console.log(response);
  const responseJSON = await response.json();
  return responseJSON.drinks;
}

export default fetchDrink;

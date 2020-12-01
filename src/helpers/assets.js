export default function findMatchInKeys(string, object) {
  return Object
    .keys(object).find((key) => key.match(string));
}

export function filterMatchInKeys(string, object) {
  return Object
    .keys(object).filter((key) => key.match(string));
}

export const modifyResponse = (response, nameType, recipeType, changeCategory) => ({
  id: response[recipeType][0][`id${nameType}`],
  img: response[recipeType][0][`str${nameType}Thumb`],
  title: response[recipeType][0][`str${nameType}`],
  category: response[recipeType][0][changeCategory],
  instruction: response[recipeType][0].strInstructions,
});

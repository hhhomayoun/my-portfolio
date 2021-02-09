

const fetchMeals = async (url) => {
 try {
  const response = await fetch(url);
  const data = await response.json();
  return data
 } catch (error) {
  console.log(error);
 }
}
const presentFood = async () => {
 const id = localStorage.getItem('food');
 const meal = await fetchMeals(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
 const food = meal.meals[0];
 const { strMealThumb: image, strMeal: name, strInstructions: desc } = food;
 const list = [
  food.strIngredient1, food.strIngredient2, food.strIngredient3, food.strIngredient4, food.strIngredient5, food.strIngredient6, food.strIngredient7, food.strIngredient8, food.strIngredient9, food.strIngredient10, food.strIngredient11, food.strIngredient12, food.strIngredient13, food.strIngredient14, food.strIngredient15, food.strIngredient16, food.strIngredient17, food.strIngredient18, food.strIngredient19, food.strIngredient20
 ];
 const img = document.querySelector('.meal-img');
 const mealName = document.querySelector('.meal-name');
 const description = document.querySelector('.meal-desc');
 const ingredients = document.querySelector('.meal-ingredients');
 img.src = image;
 document.title = name;
 mealName.textContent = name;
 description.textContent = desc;
 ingredients.innerHTML = list
  .map((item) => {
   if (!item) return;
   return `<li><i class="far fa-check-square"></i>${item}</li>`;
  })
  .join('');

}
presentFood()


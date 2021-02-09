const URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=A';
const baseURL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
window.addEventListener('DOMContentLoaded', () => {


  showMeals(URL)

})

const showMeals = async (url) => {
  const data = await fetchMeals(url)
  const section = await displayMeals(data)
  if (section) {
    setMeals(section)
  }
}

const fetchMeals = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data
  } catch (error) {
    console.log(error);
  }
}

const displayMeals = async ({ meals }) => {

  const section = document.querySelector('.section-center');
  const title = document.querySelector('.title');
  if (!meals) {
    title.textContent = 'sorry no meals match your search';
    section.innerHTML = null;
    return;
  }
  const newFood = meals.map(function (meal) {
    const { idMeal: id, strMeal: name, strMealThumb: image } = meal;
    return `<a href="food.html">
          <article class="meals" data-id="${id}">
            <img src="${image}" alt="${name}" />
            <h3>${name}</h3>
          </article>
        </a>`;
  }).join('');
  title.textContent = '';
  section.innerHTML = newFood;
  return section;
}

const form = document.querySelector('.search-form');
const input = document.querySelector('[name="food"]')
form.addEventListener('keyup', function (e) {
  e.preventDefault();
  const value = input.value;
  showMeals(`${baseURL}${value}`)
})

const setMeals = (section) => {
  section.addEventListener('click', function (e) {
    // e.preventDefault();
    const id = e.target.parentElement.dataset.id;

    localStorage.setItem('food', id)
  })
}
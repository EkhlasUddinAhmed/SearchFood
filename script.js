const searchBtn = document.getElementById('search-btn');
const mealList = document.getElementById('meal');
const mealDetailsContent = document.querySelector('.meal-details-content');


const  findMeals = () => {
    let searchInputTxt = document.getElementById('search-input').value.trim();
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInputTxt}`)
    .then(Response => Response.json())
    .then(data => {
        let html = '';
        if (data.meals) {
            data.meals.forEach(meal => {
                html += `
                    <div class = "meal-item" data-id = "${meal.idMeal}">
                        <div class = "meal-img">
                            <img src = "${meal.strMealThumb}" alt = "food">
                        </div>
                        <div class = "meal-name">
                            <h3>${meal.strMeal}</h3>
                            <a href = "#" class = "recipe-btn">Ingredients</a>
                        </div>
                    </div>
                `;
            });
            mealList.classList.remove('notFound')
        }
        else {
            html = `<p>Sorry, <span>${searchInputTxt} is not available</span></p>`;
            mealList.classList.add('notFound');
        }

        mealList.innerHTML = html;
    });
}

//get ingredients of the meal
const  getMealIngredients = (e) => {
    e.preventDefault();
    if (e.target.classList.contains('recipe-btn')) {
        let mealItem = e.target.parentElement.parentElement;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
        .then(Response => Response.json())
        .then(data => mealDetails(data.meals));
    }
}

//show Pop-up about meal
const  mealDetails = (meal) => {
    meal = meal[0];
    let html = `
    <h2 class = "recipe-title">${meal.strMeal}</h2>
          <h3>Ingredients Of ${meal.strMeal}:</h3>
            <div class = "recipe-instruct">
                
                <div>
                    <ul>
                        <li>${meal.strIngredient1}</li>
                        <li>${meal.strIngredient2}</li>
                        <li>${meal.strIngredient3}</li>
                        <li>${meal.strIngredient4}</li>
                        <li>${meal.strIngredient5}</li>
                        <li>${meal.strIngredient6}</li>
                        <li>${meal.strIngredient7}</li>
                        <li>${meal.strIngredient8}</li>
                        <li>${meal.strIngredient9}</li>
                        <li>${meal.strIngredient10}</li>
                    </ul>
                </div>
                <div class = "recipe-meal-img">
                <img src = "${meal.strMealThumb}" alt = "">
                </div>
            </div>
            `;
    mealDetailsContent.innerHTML = html;
    mealDetailsContent.parentElement.classList.add('showRecipe');
}

//event listeners
searchBtn.addEventListener('click', findMeals);
mealList.addEventListener('click', getMealIngredients);
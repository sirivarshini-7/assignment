const buttonSearch = document.getElementById('search-btn');
const listMeals = document.getElementById('meal');
const contentMealDetails = document.querySelector('.meal-details-content');
const buttonCloseRecipe = document.getElementById('recipe-close-btn');

buttonSearch.addEventListener('click', fetchMealList);
listMeals.addEventListener('click', fetchMealRecipe);
buttonCloseRecipe.addEventListener('click', () => {
    contentMealDetails.parentElement.classList.remove('showRecipe');
});

function fetchMealList() {
    let inputSearchText = document.getElementById('search-input').value.trim();
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${inputSearchText}`)
        .then(response => response.json())
        .then(data => {
            let outputHtml = "";
            if (data.meals) {
                data.meals.forEach(meal => {
                    outputHtml += `
                        <div class="meal-item" data-id="${meal.idMeal}">
                            <div class="meal-img">
                                <img src="${meal.strMealThumb}" alt="food">
                            </div>
                            <div class="meal-name">
                                <h3>${meal.strMeal}</h3>
                                <a href="#" class="recipe-btn">Get Recipe</a>
                            </div>
                        </div>
                    `;
                });
                listMeals.classList.remove('notFound');
            } else {
                outputHtml = "Sorry, we didn't find any meal!";
                listMeals.classList.add('notFound');
            }

            listMeals.innerHTML = outputHtml;
        });
}

function fetchMealRecipe(event) {
    event.preventDefault();
    if (event.target.classList.contains('recipe-btn')) {
        let mealElement = event.target.parentElement.parentElement;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealElement.dataset.id}`)
            .then(response => response.json())
            .then(data => displayMealRecipeModal(data.meals));
    }
}

function displayMealRecipeModal(meal) {
    console.log(meal);
    meal = meal[0];
    let outputHtml = `
        <h2 class="recipe-title">${meal.strMeal}</h2>
        <p class="recipe-category">${meal.strCategory}</p>
        <div class="recipe-instruct">
            <h3>Instructions:</h3>
            <p>${meal.strInstructions}</p>
        </div>
        <div class="recipe-meal-img">
            <img src="${meal.strMealThumb}" alt="">
        </div>
        <div class="recipe-link">
            <a href="${meal.strYoutube}" target="_blank">Watch Video</a>
        </div>
    `;
    contentMealDetails.innerHTML = outputHtml;
    contentMealDetails.parentElement.classList.add('showRecipe');
}

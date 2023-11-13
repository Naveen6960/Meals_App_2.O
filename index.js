// DOM Elements
const search = document.getElementById('search');
const submit = document.getElementById('submit');
const randomBtn = document.getElementById('random');
const meals = document.getElementById('meals');
const singleMeal = document.getElementById('single-meal');
const resultHeading = document.querySelector('.result-heading');

// Function to fetch a random meal
function getRandomMeal() {
    // Clear previous results
    meals.innerHTML = '';
    resultHeading.innerHTML = '';

    fetch('https://www.themealdb.com/api/json/v1/1/random.php')
        .then((res) => res.json())
        .then((data) => {
            const meal = data.meals[0];
            addMealToDOM(meal);
        })
        .catch((error) => {
            console.error("Error fetching random meal:", error);
        });
}

// Event listener for the "Random Meal" button
randomBtn.addEventListener('click', getRandomMeal);

// Function to search for a meal by keyword
function searchMeal(e) {
    e.preventDefault(); // Prevent the default form submission behavior

    // Clear single meal container
    singleMeal.innerHTML = '';

    // Get the search term from the input field
    const term = search.value;

    if (term.trim()) {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
            .then((res) => res.json())
            .then((data) => {
                resultHeading.innerHTML = `<h2>Search results for '${term}':</h2>`;
                if (data.meals === null) {
                    resultHeading.innerHTML = `<p>No meals found for '${term}'. Try another search.</p>`;
                } else {
                    meals.innerHTML = data.meals.map((meal) => `
                        <div class="meal">
                            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                            <div class="meal-info" data-mealID="${meal.idMeal}">
                                <h3>${meal.strMeal}</h3>
                            </div>
                        </div>
                    `).join('');
                }
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
        // Clear search text
        search.value = '';
    } else {
        alert('Please enter a search term');
    }
}

// Event listener for the form submission
submit.addEventListener('submit', searchMeal);

// Event listener for the meals container to handle clicks on individual meals
meals.addEventListener('click', (e) => {
    const mealInfo = e.target.closest('.meal-info');
    if (mealInfo) {
        const mealId = mealInfo.getAttribute('data-mealID');
        getMealById(mealId);
    }
});

// Function to fetch and display detailed information for a meal by its ID
function getMealById(mealID) {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
        .then((res) => res.json())
        .then((data) => {
            const meal = data.meals[0];
            addMealToDOM(meal);
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
        });
}

// Function to add a meal to the single meal container
function addMealToDOM(meal) {
    const ingredients = [];

    // Get all ingredients and measures
    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients.push(
                `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
            );
        } else {
            break;
        }
    }

    singleMeal.innerHTML = `
        <div class="single-meal">
            <h1>${meal.strMeal}</h1>
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
            <div class="single-meal-info">
                ${meal.strCategory ? `<p>Category: ${meal.strCategory}</p>` : ''}
                ${meal.strArea ? `<p>Area: ${meal.strArea}</p>` : ''}
            </div>
            <div class="main">
                <p>${meal.strInstructions}</p>
                <h2>Ingredients:</h2>
                <ul>
                    ${ingredients.map((ingredient) => `<li>${ingredient}</li>`).join('')}
                </ul>
            </div>
        </div>
    `;
}

// Get elements by their IDs
const categoriesLink = document.getElementById("categories-link");
const categoriesDropdown = document.getElementById("categories-dropdown");

// Hide the dropdown initially
categoriesDropdown.style.display = "none";

// Add a click event listener to the "Categories" link
categoriesLink.addEventListener("click", function (event) {
    event.preventDefault(); // Prevent the default link behavior
    if (categoriesDropdown.style.display === "none") {
        categoriesDropdown.style.display = "block"; // Show the dropdown
    } else {
        categoriesDropdown.style.display = "none"; // Hide the dropdown
    }
});

// Add click event listeners for the "Veg" and "Non-Veg" options
const vegOption = document.getElementById("veg-option");
vegOption.addEventListener("click", function (event) {
    event.preventDefault();
    // Handle the click for "Veg" option
    // You can add your code here to handle the selection
});

const nonVegOption = document.getElementById("non-veg-option");
nonVegOption.addEventListener("click", function (event) {
    event.preventDefault();
    // Handle the click for "Non-Veg" option
    // You can add your code here to handle the selection
})


import RecipeFilter from "../components/RecipeFilter";
import RecipeCard from "../components/RecipeCard";
import RecipeRecommendationCard from "../components/RecipeRecommendationCard";
import { createResource } from "solid-js";
import { For } from "solid-js";
import { Switch, Match } from "solid-js";

import { createSignal } from "solid-js";

const fetchAllRecipes = async () => {

    

    const res = await fetch(
        'http://127.0.0.1:5000/api/recipe/all'
    )
    //console.log(res.json())
    return res.json();
}
const fetchPopularRecipes = async () => {

    const res = await fetch(
        'http://127.0.0.1:5000/api/recipe/popular'
    )
    //console.log(res.json())
    return res.json();
}
const fetchLatestRecipes = async () => {

    const res = await fetch(
        'http://127.0.0.1:5000/api/recipe/latest'
    )
    //console.log(res.json())
    return res.json();
}


function Home() {
    const [recipes] = createResource(fetchAllRecipes);
    const [latestRecipes] = createResource(fetchLatestRecipes);
    const [popularRecipes] = createResource(fetchPopularRecipes);
    const [selectedFilter, setSelectedFilter] = createSignal('All');

   

    return (
        <main class="dark:bg-gray-900">
            <div class="bg-cover bg-center bg-no-repeat" style={`background-image: url('/src/assets/food-background.jpg')`}>
                <div class="bg-gradient-to-l from-gray-950  dark:from-slate-900 to--900 opacity-90 bg-opacity-10 py-6 px-2 md:p-16 text-white rounded-lg shadow-md">
                    <div class="flex items-center justify-between">

                        {/* Left - Text Content */}
                        <div>
                            <h1 class="text-2xl font-bold  mb-2">AI-Powered Recipe & Grocery Tracker!</h1>
                            <p>Discover new recipes, plan meals, and automatically generate grocery lists with the power of AI.</p>
                        </div>

                        {/* Right - Icon/Graphic Representation */}
                        <div class="hidden md:block ml-6">
                            <svg
                                class="w-32 h-32"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-6a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>

                    </div>
                </div>
            </div>
            <div>
                {/* Latest Recipes */}
                <section class="mb-8">
                    <h2 class="text-xl font-bold mb-4 dark:text-white">Latest Recipes</h2>
                    <ul class="flex flex-grow justify-between gap-x-4 overflow-x-scroll">
                        {console.log(latestRecipes(), latestRecipes.loading)}
                        <Show when={latestRecipes()} fallback={<div>Loading...</div>}>

                            <For each={latestRecipes()} fallback={<div>Loading...</div>}>
                                {(recipe, index) => (
                                    <div class=""><RecipeRecommendationCard recipe={recipe} /></div>
                                )}
                            </For>
                        </Show>
                    </ul>
                </section>

                {/* Popular Recipes */}
                <section>
                    <h2 class="text-xl font-bold mb-4 dark:text-white">Popular Recipes</h2>
                    <ul class="flex  flex-grow justify-between gap-x-4  overflow-x-auto">
                        <For each={popularRecipes()} fallback={<div>Loading...</div>}>
                            {(recipe, index) => (
                                <div class=""><RecipeRecommendationCard recipe={recipe} /></div>
                            )}
                        </For>
                    </ul>
                </section>
            </div>
            <div class="flex-grow space-y-4 dark:bg-gray-900">
                {/* Sort/Filter */}
                <RecipeFilter selectedFilter={selectedFilter} setSelectedFilter={setSelectedFilter} />




                {/* Recipe Cards */}

                <Show when={recipes()} fallback={<div>Loading...</div>}>
                    <Switch fallback={<div>Not Found</div>}>

                        <Match when={selectedFilter() === 'All'}>

                            <For each={recipes()} fallback={<div>Loading...</div>}>

                                {(recipe) => <div class="transition-all ease-in-out duration-150"><RecipeCard recipe={recipe} image='src/assets/food-background.jpg' /></div>}

                            </For>

                        </Match>

                        <Match when={selectedFilter() == 'Breakfast'}>



                            <For each={recipes().filter((recipe)=>{
                                return recipe.category.title == 'Breakfast'
                            })} fallback={<div>Loading...</div>}>

                                {(recipe) => <div class="transition-all ease-in-out duration-150"><RecipeCard recipe={recipe} image='src/assets/food-background.jpg' /></div>}

                            </For>

                        </Match>
                        <Match when={selectedFilter() == 'Lunch'}>


                            <For each={recipes().filter((recipe) => {
                                return recipe.category.title == 'Lunch'
                            })} fallback={<div>Loading...</div>}>

                                {(recipe) => <div class="transition-all ease-in-out duration-150"><RecipeCard recipe={recipe} image='src/assets/food-background.jpg' /></div>}

                            </For>

                        </Match>
                        <Match when={selectedFilter() == 'Dinner'}>


                            <For each={recipes().filter((recipe) => {
                                return recipe.category.title == 'Dinner'
                            })} fallback={<div>Loading...</div>}>

                                {(recipe) => <div class="transition-all ease-in-out duration-150"><RecipeCard recipe={recipe} image='src/assets/food-background.jpg' /></div>}

                            </For>

                        </Match>

                    </Switch>

                </Show>





            </div>


        </main>
    )
}

export default Home;
import { createResource, Show, createSignal, Switch, Match, For, Index } from "solid-js";
import { useParams } from "@solidjs/router";
import BookmarkOutline from "../../components/svg/BookmarkOutline";
import { useUserContext } from "../../context/UserContext";
import BookmarkSolid from "../../components/svg/BookmarkSolid";



const fetchRecipe = async (id) => {

    const recipe = await fetch(`http://127.0.0.1:5000/api/recipe/single/${id}`, {
        method: 'GET',

    })
    const data = await recipe.json()

    return data

}

function Recipe() {
    const params = useParams();
    const [serving, setServing] = createSignal(1);
    const [activeTab, setActiveTab] = createSignal("ingredients");
    const [showModal,setShowModal] = createSignal(false)
    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };
    const [recipe] = createResource(() => params.id, fetchRecipe);

    const { user, setUser } = useUserContext()

   // const [isBookmarked, setIsBookmarked] = createSignal(user.bookmarkedRecipes.find(recipe => recipe.recipeId === Number(params.id)) ? true : false)


    // const bookmarkRecipe = async () => {



    //     const data = await fetch(`http://127.0.0.1:5000/api/recipe/user/${user.id}/bookmark/${params.id}`, {
    //         method: 'POST',
    //         headers: {
    //             Accept: 'application.json',
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({
    //             bookmarked: isBookmarked() ? true : false
    //         }),
    //     })

    //     const userData = await data.json()

    //     setUser(userData)

    //     setIsBookmarked(user.bookmarkedRecipes.find(recipe => recipe.recipeId === Number(params.id)) ? true : false)




    // }
    return (
        <div class=""> 
            <h1 className="text-center text-2xl dark:text-white mb-12 font-bold">Recipe</h1>
            <Show when={recipe()} fallback={<div>loading...</div>}>
                <div class="relative">
                    <img src={recipe().imageUrl} alt={recipe().title} class="w-full   h-full  my-auto object-fill rounded-lg mb-4" />
                    <div class="absolute right-0 top-0">
                        {/* <Show when={user}>
                            <Show when={!isBookmarked()}>
                                <BookmarkOutline onBookmark={bookmarkRecipe} />
                            </Show>
                            <Show when={isBookmarked()}>
                                <BookmarkSolid onBookmark={bookmarkRecipe} />

                            </Show>
                        </Show> */}

                    </div>
                    {console.log(user)}
                </div>
                <div class="flex flex-col mt-3 gap-y-1">
                    <div class="flex justify-between items-center">
                        <span class="dark:text-gray-300 font-extrabold text-lg">{recipe().title}</span>
                        <span class="dark:text-gray-300 text-sm font-bold">{recipe().rating == 0 ? 'N/A' : recipe().rating}</span>
                    </div>
                    <div class="flex justify-between items-center">
                        <span class="text-gray-100 whitespace-nowrap text-xs dark:text-gray-500 flex gap-1 items-center"><span class="dark:text-gray-300">By </span>{recipe().author.name}</span>
                        {/* <span class="text-gray-100 whitespace-nowrap text-xs dark:text-gray-300 flex gap-1 items-center">{`{${recipe().reviews.length} reviews}`}</span> */}

                    </div>
                    <div class="flex gap-2 mt-2">
                        <span class="text-gray-100 whitespace-nowrap text-xs dark:text-gray-400 ">@ {recipe().time_to_prepare} mins</span>
                        <span class="text-gray-100 whitespace-nowrap text-xs capitalize dark:text-gray-400 ">@ {recipe().difficulty} </span>
                    </div>
                    <div className="mt-3 dark:text-gray-300 text-sm text-start">{recipe().description}</div>
                    <div class="dark:text-white my-6 gap-2">
                        <span class="mr-2">Servings:</span>

                        <button onclick={() => setServing(prev => prev > 1 ? prev - 1 : prev)} class="border rounded-full dark:border-blue-500  px-1.5 text-center mx-1">-</button>
                        <span class="mx-2">{serving()}</span>
                        <button onclick={() => setServing(prev => prev + 1)} class="border rounded-full dark:border-blue-500  px-1.5 text-center mx-1">+</button>


                    </div>
                </div>

                <div class="mb-4">
                    {/* Navigation Tabs */}
                    <ul class="flex items-center justify-evenly space-x-4  px-auto  rounded-2xl dark:shadow-lg dark:border-gray-800 border p-1 ">
                        <li
                            class={`cursor-pointer ${activeTab() === "ingredients" ? "rounded-xl bg-blue-400 dark:bg-blue-500 text-white px-2 py-1 border-blue-600" : "px-2 py-1 dark:text-gray-500"
                                }`}
                            onClick={() => handleTabClick("ingredients")}
                        >
                            Ingredients
                        </li>
                        <li
                            class={`cursor-pointer ${activeTab() === "instructions" ? "rounded-xl bg-blue-400 dark:bg-blue-500 text-white px-2 py-1 border-blue-600" : "px-2 py-1 dark:text-gray-500"
                                }`}
                            onClick={() => handleTabClick("instructions")}
                        >
                            Instructions
                        </li>
                        <li
                            class={`cursor-pointer ${activeTab() === "reviews" ? "rounded-xl bg-blue-400 dark:bg-blue-500 text-white px-2 py-1 border-blue-600" : "px-2 py-1 dark:text-gray-500"
                                }`}
                            onClick={() => handleTabClick("reviews")}
                        >
                            Reviews
                        </li>
                    </ul>
                </div>

                <Switch fallback={<div>Not Found</div>}>

                    <Match when={activeTab() === "ingredients"}>
                        <ul class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            <For each={JSON.parse(recipe().ingredients)}>
                                {(ingredient) => (<li key={ingredient.id} class="bg-white dark:bg-gray-900 flex items-center justify-between shadow-md rounded-md p-4">
                                    <div class="flex items-center gap-4">
                                        <div class="">
                                            <img
                                                src={`https://www.themealdb.com/images/ingredients/${ingredient.ingredient}-small.png`}
                                                alt={ingredient.title}
                                                class="w-full h-8 object-cover rounded-md"
                                            />
                                        </div>
                                        <h3 class="text-md font-semibold capitalize dark:text-white">{ingredient.ingredient}</h3>
                                    </div>
                                    <p class="text-sm text-gray-600 dark:text-gray-300 flex gap-1">
                                        <span>{serving() * ingredient.quantity}</span>
                                        <span>{ingredient.measurement}</span>
                                    </p>
                                </li>)}
                            </For>

                        </ul>



                    </Match>

                    <Match when={activeTab() === "instructions"}>
                        <ul class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            <Index each={JSON.parse(recipe().instructions)}>
                                {(instruction, index) => (
                                    <li key={instruction.id} class="flex space-x-4">

                                        <div class="flex dark:text-white gap-x-2">
                                            <div class="text-md font-semibold">Step {index + 1} :</div>
                                            <p class="text-gray-600 dark:text-gray-300 first-letter:capitalize max-w-prose leading-tight">{instruction}</p>
                                        </div>
                                    </li>
                                )}
                            </Index>

                        </ul>

                    </Match>
                    <Match when={activeTab() === 'reviews'}>
                        <Show when={recipe().reviews.length > 0} fallback={<div class="dark:text-white text-center">No Reviews</div>}>



                        </Show>
                        <div class="flex justify-center my-3">
                            <button class="mx-auto w-1/3 rounded-md px-6 py-2 dark:bg-blue-500 dark:text-white">Make a Review</button>
                        </div>
                        <Show when={!showModal()}>
                          

                        </Show>
                      
                    </Match>

                </Switch>
                {/* <div style="background-color: rgba(0, 0, 0, 0.5);" class="fixed top-0 left-0 inset-0 w-screen h-full flex items-center justify-center">
                    <div class="bg-white dark:bg-gray-800 alert-dark p-4 rounded-md shadow-lg">

                        <p class="dark:text-white font-light text-lg">Review <span className="font-extrabold">{recipe().title}</span> </p>
                        <div class="mt-4 flex justify-end space-x-2"></div>
                    </div>
                </div> */}
            </Show>
            
        </div>
    )
}

export default Recipe;
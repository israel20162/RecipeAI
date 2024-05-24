import { createSignal, Index, createResource ,Show,For} from "solid-js";

const fetchRandomRecipe = async () => {

    const data = await fetch('http://127.0.0.1:5000/api/recipe/random')
    const recipeData = await data.json()
    return recipeData

}

function RandomRecipeGenerator() {
    const [recipe, setRecipe] = createSignal(null);
    const [isLoading, setIsLoading] = createSignal(false);
    const [randomRecipe, { mutate, refetch }] = createResource(fetchRandomRecipe);
    

    // Simulate recipe generation
    const generateRandomRecipe = async() => {
        setIsLoading(true);
        if (recipe() != null) {
            await refetch();
        } 
        // Simulate a delay to demonstrate loading (replace with your actual data fetching logic)
        setTimeout( () => {
                
            setRecipe(randomRecipe());
            setIsLoading(false);
        }, 3000);
    };

    const getYoutubeLink = ()=>{
      try {
          const url = recipe().youtube_link;

          // Use the URLSearchParams object to get the video ID
          const searchParams = new URLSearchParams(new URL(url).search);
          const videoId = searchParams.get("v");

          return videoId // Outputs "pKXACYjwMns"
      } catch (error) {
        
      }

    }

    return (
        <div class=" dark:bg-gray-900">
            <h1 class="text-2xl dark:text-gray-300 font-bold mb-4">Random Recipe Generator</h1>
            <button
                onClick={generateRandomRecipe}
                class="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 dark:bg-gray-700 dark:hover-bg-gray-600 dark:text-white"
                disabled={isLoading()}
            >
                {isLoading() ? "Generating..." : "Generate Random Recipe"}
            </button>

            <Show when={isLoading()}>
                <p class="text-gray-600 dark:text-gray-300 mt-4">Generating a random recipe...</p>
            </Show>


            <Show when={!isLoading()}>
                <Show when={recipe()}>
                    <div class="mt-4">
                        <h3 class="text-md font-semibold mt-4 mb-4 text-xl text-center dark:text-gray-300">{recipe().title}</h3>

                      
                        <img
                            src={recipe().imageUrl}
                            alt={recipe().title}
                            class="w-full h-64 md:h-96 object-cover rounded-md mb-4"
                        />
                        <h3 class="text-md font-semibold mb-2 text-xl text-center dark:text-gray-300">Ingredients</h3>
                        <ul class="list-disc pl-4">

                            <For each={recipe().ingredients}>
                                {(ingredient) => (
                                    <li  class="bg-white dark:bg-gray-900 flex items-center justify-between shadow-md rounded-md ">
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
                                            <span>{ingredient.quantity}</span>
                                            <span>{ingredient.measurement}</span>
                                        </p>
                                    </li>
                                )}
                            </For>
                         
                        </ul>
                        <h3 class="text-md font-semibold mt-4 mb-2 text-xl text-center dark:text-gray-300">Instructions</h3>
                        <div class="text-gray-600 streaming-effect">
                           
                            <Index each={recipe().instructions}>
                                {(instruction, index) => (
                                    <li class="flex space-x-4 my-3">

                                        <div class="flex items-start dark:text-white gap-x-2">
                                            <div class="text-md  font-semibold whitespace-nowrap">Step {index + 1} :</div>
                                            <p class="text-gray-600 dark:text-gray-300 first-letter:capitalize max-w-prose leading-snug">{instruction}</p>
                                        </div>
                                    </li>
                                )}
                            </Index>

                        </div>
                        <h3 class="text-md font-semibold mt-4 mb-2 text-xl text-center dark:text-gray-300">Youtube Video</h3>

                        <div class="video-container">
                            <iframe
                                width="560"
                                height="315"
                                src={`https://www.youtube.com/embed/${getYoutubeLink()}`}
                                title="YouTube video player"
                                frameborder="0"
                                allow=" "
                                allowfullscreen
                                
                            ></iframe>
                        </div>


                    </div>
                </Show>

            </Show>
           

            
        </div>
    );
}

export default RandomRecipeGenerator;

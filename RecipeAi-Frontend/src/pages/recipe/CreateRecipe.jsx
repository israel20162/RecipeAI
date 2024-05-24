import { createStore } from "solid-js/store";
import { createResource, For, createSignal, Index, Show } from "solid-js";


// const fetchIngredients = async () => {
//     const ingredients = await fetch('http://themealdb.com/api/json/v1/1/list.php?i=list'
//     )
//     console.log(ingredients)
//     return ingredients.json()
// }

function CreateRecipe() {
    const [recipe, setRecipe] = createStore({
        title: "",
        description: "",
        imageUrl: "",
        ingredients: [],
        instructions: [],
        youtube_link: '',
        time_to_prepare: 0,
        difficulty: "",
        categoryId: 1,
        authorId: 1
    });

    //const [ingredients] = createResource(fetchIngredients)

    const [newStep, setNewStep] = createSignal("");
    const [ingredients, setIngredients] = createStore([{
        id: 1,
        ingredient: '',
        quantity: '',
        measurement: ''
    }])
    const imperial = [
        'cups',
        'dash of',
        'ounces',
        'pinches',
        'tablespoons',
        'teaspoons',
        'pounds',
        'pieces of',
        'cups',
        'gallons',
        'ounces',
        'pints',
        'quarts',
    ]
    const metric = [
        'milligram(mg)',
        'gram(g)',
        'kilogram(Kg)',
        'milliter(ml)',
        'liter(l)',
        'kiloliter(Kl)'
    ]
    const [measurements, setMeasurements] = createSignal(imperial)


    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setRecipe('ingredients', ingredients)

        const response = await fetch('http://127.0.0.1:5000/api/recipe/create', {
            method: 'POST',
            headers: {
                Accept: 'application.json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(recipe),

        })
       const res = await response.json()
       console.log(res)
        

       // console.log(JSON.stringify(recipe));
    };
    const addStep = () => {
        setRecipe("instructions", [...recipe.instructions, newStep()]);
        setNewStep("");
    };
    const addIngredient = (index) => {
        setRecipe('ingredients', ingredients)
        setIngredients(index++, {
            id: index++,
            ingredient: '',
            quantity: '',
            measurement: ''
        },
        );

        console.log(recipe.ingredients)
    };

    const removeStep = (index) => {
        const updatedInstructions = [...recipe.instructions];
        updatedInstructions.splice(index, 1);
        setRecipe("instructions", updatedInstructions);
    };

    return (
        <div class="py-6 h-screen scroll-m-0   scrollbar-none    no-scrollbar" style={{ 'scrollbar-width': "0px" }}>
            <h1 class="text-3xl font-bold mb-4 dark:text-gray-200 text-center">Create a New Recipe</h1>
            <form onSubmit={handleFormSubmit} class="bg-white dark:bg-gray-800 p-6 rounded-md shadow-md dark:shadow-none">
                <div class="mb-4">
                    <label for="title" class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Title</label>
                    <input required type="text" id="title" class="w-full p-2 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-600 dark:text-white" oninput={(e) => setRecipe('title', e.target.value)} />
                </div>
              

                <div class="mb-4">
                    <label for="description" class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Description</label>
                    <textarea id="description" class="w-full p-2 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-600 dark:text-white" oninput={(e) => setRecipe('description', e.target.value)} />
                </div>
                <div class="mb-4 flex flex-col">
                    <label for="instructions" class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Instructions</label>
                    <ul class="list-inside  ">
                        <Index each={recipe.instructions} fallback={<div class="m-4 text-gray-300 capitalize">input each step of the recipe</div>}>
                            {(step, index) => (

                                <li class="mb-2  dark:text-gray-200 justify-between px-1 flex">

                                    <p><span class='font-bold text-gray-300'>Step {index + 1} : </span> {step}  </p>
                                    <button type="button" class="ml- text-red-500 text-sm font-bold dark:text-red-400" onClick={() => removeStep(index)}>
                                        x
                                    </button>
                                </li>

                            )}
                        </Index>

                    </ul>
                    <textarea
                        type="text"
                        
                        cols={4}
                        id="instructions"
                        class="w-full p-2 mb-2 rounded-md border border-gray-300 bg-white dark:bg-gray-600 dark:border-gray-600 dark:text-white"
                        placeholder="Add a step..."
                        value={newStep()}
                        oninput={(e) => setNewStep(e.target.value)}
                    />
                    <button type="button" class="bg-blue-600 w-1/3 md:w-1/6 ml-auto my-2 text-white p-2 rounded-md hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 dark:text-white" onClick={addStep}>
                        Add Step
                    </button>
                </div>

                <div class="mb-4">
                    <label for="category" class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Category</label>
                    <select id="category" class="w-full p-2 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-600 dark:text-white" oninput={(e) => setRecipe('categoryId', e.target.value)}>
                        <option value={1}>Breakfast</option>
                        <option value={2}>Lunch</option>
                        <option value={3}>Dinner</option>
                        {/* Add more categories as needed */}
                    </select>
                </div>
                <div class="mb-4 ">
                    <div class="mb-2">
                        <label for="category" class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Ingredients</label>
                        <div className="flex gap-4 dark:text-white">
                            <span> <input type="radio" checked name="measure" id="m-1" oninput={() => setMeasurements(imperial)} />
                                <label htmlFor="m-1" class="ml-1">Imperial</label></span>
                            <span>  <input type="radio" name="measure" id="m-2" oninput={() => setMeasurements(metric)} />
                                <label htmlFor="m-2" class="ml-1">Metric</label></span>
                        </div>
                    </div>

                    <table class=" min-w-full p-4  bg-white rounded ">
                        <thead class="bg-gray-50 rounded overflow-x-scroll dark:bg-gray-700 dark:text-white">
                            <tr>
                                <th class="px- py-3 md:text-left text-xs font-medium text-gray-500 dark:text-white uppercase tracking-wider">Qt</th>
                                <th class="md:text-left text-xs font-medium text-gray-500 dark:text-white uppercase tracking-wider">Measurement</th>
                                <th class="md:text-left text-xs font-medium text-gray-500 dark:text-white uppercase tracking-wider">Ingredient</th>
                            </tr>


                        </thead>
                        <tbody class="bg-white w-screen rounded p-4 overflow-x-scroll dark:bg-gray-700  ">
                            <Index each={ingredients}>
                                {(ingredient, index) => (
                                    <tr class="dark:bg-gray-700 mb-4">
                                        <td>
                                            <input required type="text" class=" w-12 mx-auto mb-4 md:w-1/4 dark:bg-gray-700 dark:text-white rounded dark:border-gray-300 border py-2 " oninput={(e) => setIngredients(index, 'quantity', e.target.value)} />
                                        </td>
                                        <td >
                                            <Show when={ingredients[index]?.measurement}>
                                                <select required name="" id="" value={ingredients[index].measurement} oninput={(e) => setIngredients(index, 'measurement', e.target.value)} class="mb-4  p-2 mx-1 md:mx-0 dark:bg-gray-700 capitalize dark:text-white shadow-sm border border-gray-300 rounded">
                                                    <option value="selected" selected disabled class="">Select</option>

                                                    {measurements().map((measurement) => {
                                                        return <option value={measurement} selected={measurement === ingredients[index].measurement} class="dark:text-white capitalize">{measurement}</option>
                                                    })}



                                                </select>
                                            </Show>
                                            <Show when={!ingredients[index]?.measurement}>
                                                <select name="" id="" oninput={(e) => setIngredients(index, 'measurement', e.target.value)} class="mb-4  p-2 mx-1 md:mx-0 dark:bg-gray-700 capitalize dark:text-white shadow-sm border border-gray-300 rounded">
                                                    <option value="selected" selected disabled class="">Select</option>
                                                    {measurements().map((measurement) => {
                                                        return <option value={measurement} selected={measurement === ingredients[index].measurement} class="dark:text-white capitalize">{measurement}</option>
                                                    })}

                                                </select>
                                            </Show>

                                        </td>
                                        <td>
                                            <input required oninput={(e) => setIngredients(index, 'ingredient', e.target.value)} value={ingredients[index].ingredient} type="text" class="mb-4  w-28 md:w-8/12 md:-mr-4 dark:bg-gray-700 dark:text-white rounded dark:border-gray-300 border py-2 " />
                                        </td>
                                    </tr>
                                )}
                            </Index>




                        </tbody>


                    </table>
                    <div class="mb-4 flex flex-col">
                        <button type="button" class="bg-blue-600 w-1/3 md:w-1/6 ml-auto my-2 text-white  rounded-md hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 dark:text-white text-sm whitespace-nowrap py-2" onClick={(e) => addIngredient(ingredients.length)}>
                            Add Ingredient
                        </button>
                    </div>



                </div>


                <div class="mb-4">
                    <label for="imageUrl" class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Image URL</label>
                    <input type="text" id="imageUrl" class="w-full p-2 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-600 dark:text-white" oninput={(e) => setRecipe('imageUrl', e.target.value)} value={recipe.imageUrl} />
                </div>
                <div class="mb-4">
                    <label for="imageUrl" class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Prep Time(in minutes)</label>
                    <input required type="number" id="imageUrl" class="w-full p-2 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-600 dark:text-white" oninput={(e) => setRecipe('time_to_prepare', e.target.value)} value={recipe.time_to_prepare} />
                </div>
                <div class="mb-4">
                    <label for="category" class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Difficulty</label>
                    <select id="category" class="w-full p-2 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-600 dark:text-white" oninput={(e) => setRecipe('difficulty', e.target.value)}>
                        <option value={'easy'}>Easy</option>
                        <option value={'intermediate'}>Intermediate</option>
                        <option value={'medium'}>Medium</option>
                        <option value={'hard'}>Hard</option>
                        <option value={'expert'}>Expert</option>
                        {/* Add more categories as needed */}
                    </select>
                </div>



                <div className="justify-end items-center flex mb-12 md:mb-16">
                    <button type="submit" class="bg-blue-600 md:w-1/6 text-white p-2 rounded-md hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-gray-600 dark:text-white">Create Recipe</button>
                </div>
            </form>












        </div>
    );
}

export default CreateRecipe;

import { A } from "@solidjs/router";
function RecipeRecommendationCard(props) {
    return (
        <div class="bg-cover bg-center relative  w-32 rounded-md bg-no-repeat" style={`background-image: url('/src/assets/food-background.jpg')`}>
            <span className="text-white bg-green-600 rounded-md p-0.5 absolute top-0 right-0">pasta</span>
            <div class="bg-gradient-to-t from-slate-900 opacity-90 bg-opacity-10  p-16 px-2 md:p-16 text-white rounded-lg shadow-md">
                <div class="flex items-baseline justify-between flex-col">
                    <div class="flex justify-end items-start">

                    </div>
                    {/* Left - Text Content */}
                    <div class="absolute bottom-0 flex flex-col my-2 justify-start ">
                        <A href={`/recipe/${props.recipe.id}`}><p class="text-sm font-bold my-2 cursor-pointer">{props.recipe.title}</p></A>  
                        <span class="text-gray-100 whitespace-nowrap text-xs dark:text-gray-200 flex gap-1 items-center"><span className="">By </span>{props.recipe.author.name}</span>
                        <p class="flex gap-2 mt-1 "><span class="text-xs font-light"> + 30 mins</span><span class="text-xs font-light"> @ Hard</span></p>
                    </div>


                </div>
            </div>
        </div>
    )
}

export default RecipeRecommendationCard;
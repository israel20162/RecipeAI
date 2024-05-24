import { A } from "@solidjs/router";
function RecipeCard(props) {
    // You can expand on this with interactions, e.g., handling upvotes, downvotes, etc.

    return (
        <div class="bg-white grid grid-cols-5 gap-x-3 rounded-lg shadow-md relative  dark:bg-gray-800 dark:text-white">
            <span className="dark:text-white text-xs bg-orange-600 text-gray-200 dark:bg-orange-400 rounded-br-md rounded-sm p-0.5 absolute top-0 right-0">{props.recipe.category.title}</span>
            {/* props.Recipe Image */}
            <img src={props.image} alt={props.recipe.title} class="w-full col-span-2 h-full  my-auto object-cover rounded-lg mb-4" />
            <div class="col-span-3">
                {/* props.Recipe Title */}
                <A href={`/recipe/${props.recipe.id}`}><h2 class=" font-bold mb-2">{props.recipe.title}</h2></A>  

                {/* Description */}
                <p class="text-gray-600 dark:text-gray-400 mb-4 truncate">{props.recipe.description}</p>

                {/* User Info */}
                <div class="flex items-center mb-4">
                    {/* <img src={props.recipe.author.profileImage} alt={props.recipe.author.name} class="w-8 h-8 rounded-full mr-2" /> */}
                    <span class="text-gray-500 dark:text-gray-100 flex gap-1 items-center text-sm"><span className="font-bold">By: </span>{props.recipe.author.name}</span>
                </div>

                {/* Interaction Icons */}
                <div class="flex flex-col justify-between">
                    <div>
                        <button class="mr-2 text-sm"> {props.recipe.upvotes}</button> {/* Upvote Icon/Button */}
                        <button class="mr-2 text-sm"> {props.recipe.downvotes}</button> {/* Downvote Icon/Button */}
                    </div>
                    <div>
                        {/* <button>{props.recipe.comments.length} 💬</button> Comments Icon/Button
                    Add more icons/buttons as needed */}
                    </div>
                    <p class="flex gap-2 my-2 dark:text-orange-400 text-orange-600 "><span class="text-xs font-light"> + 30 mins</span><span class="text-xs font-light"> @ Hard</span></p>
                </div>
            </div>


        </div>
    );
}

export default RecipeCard;

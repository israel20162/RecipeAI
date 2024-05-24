import { A } from "@solidjs/router";
function RecipeFilter(props) {

    const handleFilterClick = (filter) => {
        props.setSelectedFilter(filter);// Notify parent component or caller about the filter change
    }
    return (
        <div>
            <div class="flex justify-between dark:text-white my-2">
                <h2 class="text-xl font-bold mb-4">Category</h2>
                <A href='/' class='text-orange-500 dark:text-orange-400'>{'see more >'}</A>
            </div>
            <div class="grid grid-cols-5 items-center gap-1.5 w-full">
                <button class="rounded-3xl text-orange-500 dark:text-orange-400 hover:bg-orange-400 hover:text-white hover:dark:text-white px-1 py-2 text-sm  border-2 border-gray-200 dark:border-white bg-orange-500" onClick={() => handleFilterClick('All')} classList={{'bg-orange-500':props.selectedFilter == 'All'}}>All</button>
                <button class="rounded-3xl text-orange-500 dark:text-orange-400 hover:bg-orange-400 hover:text-white hover:dark:text-white py-2 text-sm  border-2 border-gray-200 dark:border-white" onClick={() => handleFilterClick('Breakfast')} classList={{'bg-orange-500':props.selectedFilter  === 'Breakfast'}}>Breakfast</button>
                <button class="rounded-3xl text-orange-500 dark:text-orange-400 hover:bg-orange-400 hover:text-white hover:dark:text-white py-2 text-sm  border-2 border-gray-200 dark:border-white" onClick={() => handleFilterClick('Lunch')} classList={{'bg-orange-500':props.selectedFilter  === 'Lunch'}}>Lunch</button>
                <button class="rounded-3xl text-orange-500 dark:text-orange-400 hover:bg-orange-400 hover:text-white hover:dark:text-white py-2 text-sm  border-2 border-gray-200 dark:border-white" onClick={() => handleFilterClick('Dinner')} classList={{'bg-orange-500':props.selectedFilter  === 'Dinner'}}>Dinner</button>
                <button class="rounded-3xl text-orange-500 dark:text-orange-400 hover:bg-orange-400 hover:text-white hover:dark:text-white py-2 text-sm  border-2 border-gray-200 dark:border-white">Filter</button></div>
        </div>
    )
}

export default RecipeFilter;
import { createSignal } from "solid-js";

function SearchBar() {
    const [query, setQuery] = createSignal("");

    return (
        <div class="dark:bg-gray-900  w-3/4 mx-auto rounded  shadow-md flex gap-2 py-2 items-center">
            {/* Input Field */}
            <input
                type="text"
                placeholder="Search Recipe..."
                class="dark:bg-gray-700  dark:text-gray-200 p-2 rounded-md w-full dark:focus:border-gray-500 focus:outline-none"
                value={query()}
                onInput={(e) => setQuery(e.target.value)}
            />
            {/* Search Icon */}
            <svg
                class="w-6 h-6 text-gray-400 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-6a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>

          
        </div>
    );
}

export default SearchBar;

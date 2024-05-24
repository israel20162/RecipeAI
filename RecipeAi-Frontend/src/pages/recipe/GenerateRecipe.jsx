import { createSignal } from "solid-js";
import RandomRecipeGenerator from "./RandomRecipeGenerator";
function AIGenerationPage() {
    const [generatedRecipe, setGeneratedRecipe] = createSignal(null);

    // Function to trigger AI recipe generation
    const generateRecipe = () => {
        // You would call your AI service here to generate a recipe
        // For now, let's simulate generating a random recipe
        const randomRecipe = {
            title: "AI-Generated Recipe",
            ingredients: ["Ingredient 1", "Ingredient 2", "Ingredient 3"],
            instructions: [
                "Step 1: Mix ingredients 1 and 2 in a bowl.",
                "Step 2: Add ingredient 3 and stir well.",
                "Step 3: Cook in an oven for 20 minutes.",
            ],
        };
        setGeneratedRecipe(randomRecipe);
    };

    return (
        <div class="p-4 max-h-screen no-scroll overflow-y-auto scroll- dark:bg-gray-900">
            <h1 class="text-3xl font-bold mb-4">AI Recipe Generation</h1>
           
            <RandomRecipeGenerator/>
        </div>
    );
}

export default AIGenerationPage;

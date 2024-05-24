import express from "express";
import bcrypt from "bcrypt"
import Jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";


const router = express.Router();
const prisma = new PrismaClient();
// Endpoint to create a recipe
router.post('/create', async (req, res) => {
    const { title, description, imageUrl, authorId, instructions, youtube_link, time_to_prepare, difficulty, categoryId, } = req.body;
    const steps = JSON.stringify(instructions)
    const ingredients = JSON.stringify(req.body.ingredients)
    try {
        console.log(req.body)
        const newRecipe = await prisma.recipe.create({
            data: {
                title,
                description,
                imageUrl,
                authorId: authorId,
                instructions: steps,
                youtube_link: youtube_link,
                time_to_prepare: Number(time_to_prepare),
                difficulty: difficulty,
                categoryId: Number(categoryId),
                ingredients: ingredients,
            },
        });

        res.status(201).json({ message: 'successfully' });
    } catch (error) {
        res.status(500).json({ error: "Failed to create recipe.", message: error });
    }
});

//gets one recipe
router.get('/single/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const recipe = await prisma.recipe.findUnique({
            where: {
                id: parseInt(id), // Parse the ID as an integer
            },
            include: {
                author: true,
                category: true,
                reviews: true,
                bookmarkedBy: true
            }
        });

        if (!recipe) {
            return res.status(404).json({ error: 'Recipe not found' });
        }

        res.json(recipe);
    } catch (error) {
        // console.error(error);
        res.status(500).json({ error: 'Failed to retrieve the recipe' });
    }
});

router.get('/random', async (req, res) => {

    const meal = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
    const mealData = await meal.json()
    // console.log(mealData['meals'][0].strIngredient1)
    const ingredients = [];

    for (let i = 1; i <= 20; i++) {
        const ingredient = mealData['meals'][0][`strIngredient${i}`]

        const measure = mealData['meals'][0][`strMeasure${i}`];

        if (ingredient && ingredient.trim() !== null && measure && measure.trim() !== "") {
            ingredients.push({
                id: i,
                ingredient: ingredient,
                quantity: measure,
                measurement: "", // You can set a default measurement here
            });
        }
    }
    const recipe = {
        title: mealData['meals'][0].strMeal,
        instructions: mealData.meals[0].strInstructions.split(/\r?\n/).filter(step => step.trim() !== ''),
        ingredients: ingredients,
        imageUrl: mealData.meals[0].strMealThumb,
        youtube_link: mealData.meals[0].strYoutube


    }
    res.status(200).json(recipe)


})


//bookmarks a recipe 
router.post('/user/:userId/bookmark/:recipeId', async (req, res) => {
    const { userId, recipeId } = req.params;
    const bookmarked = req.body.bookmarked
    var user

    if (bookmarked === true) {
        try {
            await prisma.recipeonUser.deleteMany({
                where: {
                    AND: [{ userId: Number(userId) }, { recipeId: Number(recipeId) }]
                }
            })
        } catch (error) {
            res.status(500).json({ message: 'failed to bookmark' })
        }

        user = await prisma.user.findFirst({
            where: {
                id: Number(userId)
            },
            include: {
                bookmarkedRecipes: true
            }
        })

        res.status(200).json(user)

    }

    if (bookmarked === false) {
        try {
            user = await prisma.user.update({
                where: { id: Number(userId) },
                data: {
                    bookmarkedRecipes: {
                        create: [
                            {
                                assignedBy: 'Bob',
                                assignedAt: new Date(),
                                recipe: {
                                    connect: {
                                        id: Number(recipeId)
                                    }
                                }
                            }
                        ]
                    },
                },
                include: {
                    bookmarkedRecipes: true,
                },
            });
        } catch (error) {
            res.status(500).json(error)

        }

        res.json(user);

    }
})

// comment on a recipe

router.post('/:recipeId/comment', async (req, res) => {
    const { recipeId } = req.params;
    const { userId, content } = req.body;

    const comment = await prisma.comment.create({
        data: {
            content,
            userId: Number(userId),
            recipeId: Number(recipeId),
        },
    })
    res.json(comment);
})

router.post('/:recipeId/rating', async (req, res) => {
    const { recipeId } = req.params;
    const { userId, value } = req.body;

    const rating = await prisma.rating.create({
        data: {
            value: Number(value),
            userId: Number(userId),
            recipeId: Number(recipeId),
        },
    });

    res.json(rating);
});

router.get('/all', async (req, res) => {
    try {
        const recipes = await prisma.recipe.findMany({
            include: {
                author: true,
                category: true
            }
        })
        res.status(200).json(recipes);
    } catch (error) {
        res.status(500).json({ error: "Failed to get recipes.", message: error.message });
    }

})


// Endpoint to get latest recipes
router.get('/latest', async (req, res) => {
    try {
        const latestRecipes = await prisma.recipe.findMany({
            orderBy: {
                createdAt: 'desc'
            },
            take: 5,
            include: {
                author: true,
                category: true
            }// For example, limit to 5 latest recipes. Adjust as needed.
        });

        res.status(200).json(latestRecipes);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch latest recipes." });
    }
});

// Endpoint to get popular recipes (based on upvotes for simplicity)
router.get('/popular', async (req, res) => {
    try {
        const popularRecipes = await prisma.recipe.findMany({
            include: {
                author: true,
                category: true
            },
            orderBy: {
                upvotes: 'desc'
            },
            take: 5 // For example, limit to 5 most popular recipes. Adjust as needed.
        });

        res.json(popularRecipes);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch popular recipes." });
    }
});




router.post('/delete-all-recipes', async (req, res) => {

    try {
        const recipes = await prisma.recipe.deleteMany();
        res.status(200).json({ message: 'recipes deleted successfully' })
    } catch (error) {
        res.status(500).json({ error: "Failed to delete recipes.", message: error.message });
    }

})

router.post('/create-category', async (req, res) => {
    const categories = [
        { title: 'Breakfast' },
        { title: 'Lunch' },
        { title: 'Dinner' }
    ]
    try {
        const recipes = categories.forEach(async (category) => {
            await prisma.category.create({
                data: category
            })
        });
        res.status(200).json({ message: 'category created successfully' })
    } catch (error) {
        res.status(500).json({ error: "Failed to delete recipes.", message: error.message });
    }

})

export default router;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Recipe" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "instructions" TEXT NOT NULL DEFAULT '',
    "youtube_link" TEXT NOT NULL DEFAULT '',
    "imageUrl" TEXT NOT NULL,
    "upvotes" INTEGER NOT NULL DEFAULT 0,
    "downvotes" INTEGER NOT NULL DEFAULT 0,
    "time_to_prepare" INTEGER NOT NULL DEFAULT 0,
    "difficulty" TEXT NOT NULL DEFAULT 'easy',
    "rating" DECIMAL NOT NULL DEFAULT 0.0,
    "is_featured" BOOLEAN NOT NULL DEFAULT false,
    "categoryId" INTEGER NOT NULL DEFAULT 1,
    "authorId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "ingredients" TEXT NOT NULL,
    CONSTRAINT "Recipe_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Recipe_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Recipe" ("authorId", "categoryId", "createdAt", "description", "difficulty", "downvotes", "id", "imageUrl", "ingredients", "instructions", "is_featured", "rating", "time_to_prepare", "title", "updatedAt", "upvotes", "youtube_link") SELECT "authorId", "categoryId", "createdAt", "description", "difficulty", "downvotes", "id", "imageUrl", "ingredients", "instructions", "is_featured", "rating", "time_to_prepare", "title", "updatedAt", "upvotes", "youtube_link" FROM "Recipe";
DROP TABLE "Recipe";
ALTER TABLE "new_Recipe" RENAME TO "Recipe";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

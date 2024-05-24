-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_RecipeonUser" (
    "userId" INTEGER NOT NULL,
    "recipeId" INTEGER NOT NULL,
    "assignedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "assignedBy" TEXT NOT NULL,

    PRIMARY KEY ("userId", "recipeId"),
    CONSTRAINT "RecipeonUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "RecipeonUser_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_RecipeonUser" ("assignedAt", "assignedBy", "recipeId", "userId") SELECT "assignedAt", "assignedBy", "recipeId", "userId" FROM "RecipeonUser";
DROP TABLE "RecipeonUser";
ALTER TABLE "new_RecipeonUser" RENAME TO "RecipeonUser";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

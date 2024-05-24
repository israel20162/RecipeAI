import express from "express";
import bcrypt from "bcrypt"
import Jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
//const bcrypt = require('bcrypt');

// const { PrismaClient } = require('@prisma/client');
const router = express.Router();

const prisma = new PrismaClient();
router.post("/register", async function (req, res) {
    try {
        const { email, name, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: {
                email,
                name,
                password: hashedPassword,
            },
            include: {
                bookmarkedRecipes: true,


            }
        });
        res.json({ user: { 'email': user.email, 'name': user.name, 'id': user.id }, message: 'user created successfully' });
    } catch (error) {
        res.status(400).json({ error: 'Registration failed' });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await prisma.user.findUnique({
            where: { email },
            include: {
                bookmarkedRecipes: true,
            }
        });

        if (!user) throw new Error();

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) throw new Error();

        const token = Jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token, user ,success:true});
    } catch (error) {
        res.status(401).json({ error: 'Login failed', message: error,success:false });
    }
});

export default router;
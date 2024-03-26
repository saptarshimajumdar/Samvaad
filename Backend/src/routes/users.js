import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { sign } from 'hono/jwt';

export const userRouter = new Hono();
userRouter.post('/signup', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const body = await c.req.json();
    
        const user = await prisma.user.create({
            data: {
                name: body.name,
                password: body.password,
                email: body.email
            }
        });
        const token = await sign({ id: user.id }, c.env.JWT_PASS);
        return c.json({ token })
    
});
userRouter.post('/signin', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const body = await c.req.json();
    const user = await prisma.user.findUnique({
        where: { email: body.email }
    });
    const password = user?.password;
    if (!user) {
        c.status(403);
        return c.json({ message: "User does not exist. Please sign up." });
    }
    if (body.password !== password) {
        c.status(401);
        return c.json({ message: "Incorrect password. Please try again." });
    }
    const token = await sign({ id: user.id }, c.env.JWT_PASS);
    return c.json({ token });
});

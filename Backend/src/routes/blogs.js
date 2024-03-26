import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { verify } from 'hono/jwt';
export const blogRouter = new Hono();
//middleware
blogRouter.use(async (c, next) => {
    const token = c.req.header('Authorization')?.split(' ')[1];
    if (!token) {
        c.status(401);
        return c.json({ message: "Authorization failed" });
    }
    const decoded = await verify(token, c.env.JWT_PASS);
    if (!decoded) {
        c.status(401);
        return c.json({ error: "unauthorized" });
    }
    c.set('userId', 'Hono is cool!!');
    await next();
});
blogRouter.post('/post', async (c) => {
    const userId = c.get('userId');
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());
    const body = await c.req.json();
    try {
        const post = await prisma.post.create({
            data: {
                title: body.title,
                body: body.body,
                authorId: userId
            }
        });
        return c.json({ id: post.id });
    }
    catch (err) {
        c.status(403);
        return c.json({ message: "Couldnot create post" });
    }
});
blogRouter.get('/:id?', async (c) => {
    const userId = c.get('userId');
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());
    const id = c.req.param('id');
    let posts;
});

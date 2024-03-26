import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { verify } from 'hono/jwt';
import authMiddleware from "../middlewares";

type Variables = {
    userId: string
}

export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_PASS: string;
    },
    Variables: Variables
}>();

//middleware
// blogRouter.use(async (c,next)=>{
//     const token = c.req.header('Authorization')?.split(' ')[1];
//     if(!token){
//         c.status(401);
//         return c.json({message : "Authorization failed"})
//     }
//     const decoded = await verify(token, c.env.JWT_PASS);
//     if (!decoded) {
// 		c.status(401);
// 		return c.json({ error: "unauthorized" });
// 	}
//     c.set('userId', decoded.id)
//     console.log("userId : "+decoded.id);
//     await next();
// })

blogRouter.post('/post',authMiddleware, async(c)=>{
    const userId = c.get('userId');
    const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());

    const body = await c.req.json();
    try{
        const post = await prisma.post.create({
            data :{
                title : body.title,
                body : body.body,
                authorId: userId
            }
        })
        return c.json({id : post.id})
    }catch(err){
        c.status(403);
        return c.json({message :"Couldnot create post" })
    }
})


blogRouter.get('/', async(c)=>{
    const search = c.req.query('search');
    const id = c.req.query('id');
    const blogId = c.req.query('blogId');

    const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate()); 

    let posts;
    if(blogId){
        posts = await prisma.post.findUnique({
            where:{
                id: blogId
            }
        })
    }else if (search) {
        if(id){
            posts = await prisma.post.findMany({
                where: {
                    authorId: id,
                    title: {
                    contains: search,
                    mode: 'insensitive',
                    },
                },
            })     
        }else{
            posts = await prisma.post.findMany({
                where: {
                    title: {
                    contains: search,
                    mode: 'insensitive',
                    },
                },
            }) 
        }
        
    } else {
        if(id){
            posts = await prisma.post.findMany({
                where: {
                    authorId : id,
                }
            });
        }else{
            posts = await prisma.post.findMany();
        }
        
    }
    return c.json({posts});

})

blogRouter.put('/',authMiddleware, async (c) => {
	const userId = c.get('userId');
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());

	const body = await c.req.json();
	prisma.post.update({
		where: {
			id: body.id,
			authorId: userId
		},
		data: {
			title: body.title,
			body: body.body
		}
	});

	return c.text('updated post');
});
import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate'
import { verify,sign } from 'hono/jwt';

type Variables = {
  userId: string
}
export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_PASS: string;
},
Variables: Variables
}>();

userRouter.post('/signup', async(c)=>{
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  const body = await c.req.json();

    const user = await prisma.user.create({
      data:{
        name : body.name,
        password : body.password,
        email : body.email
      }
    })
    const token = await sign({ id: user.id }, c.env.JWT_PASS)
  
    return c.json({token});
    
})

userRouter.post('/signin',async(c)=>{
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  const body = await c.req.json();

  const user = await prisma.user.findUnique({
    where : {email : body.email}
  })

  const password = user?.password;
  if(!user){
    c.status (403);
    return c.json({message :"User does not exist. Please sign up."})
  }
  if(body.password !== password){
    c.status(401);
    return c.json({ message: "Incorrect password. Please try again." });
  }

  const token : string = await sign({id: user.id}, c.env.JWT_PASS);
  return c.json({token});
})

userRouter.get('/info', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const token = c.req.header('Authorization')?.split(' ')[1];
    if(!token){
        c.status(401);
        return c.json({message : "Authorization failed"})
    }
    const decoded = await verify(token, c.env.JWT_PASS);
    if (!decoded) {
		c.status(401);
		return c.json({ error: "unauthorized" });
	}
    c.set('userId', decoded.id)
    console.log("userId : "+decoded.id);

  const userId = c.get('userId');
  if (!userId) {
    c.status(403);
    return c.json({ message: 'Unauthorized' });
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    c.status(404);
    return c.json({ message: 'User not found' });
  }

  const userData = {
    id: user.id,
    name: user.name,
    email: user.email,
  };

  return c.json({userData});
});

import { verify } from "hono/jwt";

const authMiddleware = async (c,next) =>{
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
    await next();
}

export default authMiddleware;
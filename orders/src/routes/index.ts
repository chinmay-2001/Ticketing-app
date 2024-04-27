import experss ,{Request, Response} from 'express';
const router = experss.Router();

router.get('/api/orders',async(req:Request,res:Response)=>{
    res.send({});
})

export {router as indexOrderRouter};
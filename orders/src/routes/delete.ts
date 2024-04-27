import experss ,{Request, Response} from 'express';
const router = experss.Router();

router.delete('/api/orders/:orderId',async(req:Request,res:Response)=>{
    res.send({});
})

export {router as deleteOrderRouter};
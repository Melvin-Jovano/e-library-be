import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

export const getOrderCountByUserId = async (req, res)=>{
    try {
        const {userId} = res.locals.payload;

        const orderCount = await prisma.order.count({
            where: {
                user_id: userId
            }
        });

        return res.status(200).send({
            message : "SUCCESS",
            data: orderCount
        });
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            message : "An Error Has Occured",
        });
    }
}
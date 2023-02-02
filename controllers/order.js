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
        return res.status(500).send({
            message : "An Error Has Occured",
        });
    }
}

export const getOrderUserIdAndBookId = async (req, res)=>{
    try {
        const {userId} = res.locals.payload;
        const {bookId} = req.params;

        const order = await prisma.order.findFirst({
            where: {
                user_id: userId,
                book_id: Number(bookId)
            }
        });

        return res.status(200).send({
            message : "SUCCESS",
            data: order
        });
    } catch (error) {
        return res.status(500).send({
            message : "An Error Has Occured",
        });
    }
}
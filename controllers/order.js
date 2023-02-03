import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

export const getOrderByUserId = async (req, res)=>{
    try {
        let {userId} = res.locals.payload;
        const {limit, last_id, user_id} = req.query;
        let [limitFilter, lastIdFilter] = [10, null];

        if(user_id !== undefined) {
            userId = Number(user_id);
        }

        if(limit !== undefined) {
            limitFilter = Number(limit);
        }

        if(last_id !== undefined) {
            lastIdFilter = {
                id: {
                    lte: Number(last_id)
                }
            }
        }

        const orders = await prisma.order.findMany({
            orderBy: [{id: 'desc'}],
            where: {
                user_id: userId,
                ...lastIdFilter
            },
            take: limitFilter+1,
            select: {
                id: true,
                book: {
                    select: {
                        id: true,
                        title: true,
                        cover: true,
                        author: {
                            select: {
                                name: true
                            }
                        }
                    }
                }
            }
        });

        let lastId = null;
        if(orders.length > limitFilter) {
            lastId = orders.pop().id;
        }

        return res.status(200).send({
            message : "SUCCESS",
            data: {
                data: orders,
                lastId
            }
        });
    } catch (error) {
        return res.status(500).send({
            message : "An Error Has Occured",
        });
    }
}

export const getOrderCountByUserId = async (req, res)=>{
    try {
        let {userId} = res.locals.payload;
        const {user_id} = req.query;

        if(user_id !== undefined) {
            userId = Number(user_id);
        }

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
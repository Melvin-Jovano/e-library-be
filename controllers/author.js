import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllAuthors = async (req,res)=>{
    try {
        const authors = await prisma.author.findMany()
        return res.status(200).send({
            message : "SUCCESS",
            data: authors
        });
    } catch (error) {
        return res.status(500).send({
            message : "An Error Has Occured",
        });
    }
}

export const createAuthor = async ()=>{
    try {
        const { authorName } = req.body
        const newAuthor = await prisma.author.create({
            data:{
                name: authorName
            },
            select:{
                id: true
            }
        })
        return res.status(200).send({
            message : "SUCCESS",
            data: newAuthor
        });
    } catch (error) {
        return res.status(500).send({
            message : "An Error Has Occured",
        });
    }
}
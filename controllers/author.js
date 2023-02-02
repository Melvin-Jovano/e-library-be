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

export const createAuthor = async (req, res)=>{
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
        console.log(error)
        return res.status(500).send({
            message : "An Error Has Occured",
        });
    }
}

export const updateAuthor = async (req,res)=>{
    try {
        const { authorId, authorName } = req.body
        const author = await prisma.author.update({
            where:{
                id : authorId
            },
            data:{
                name : authorName
            },
            select: {
                id: true,
                name: true,
            }
        })
        return res.status(200).send({
            message : "SUCCESS",
            data: author
        });
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            message : "An Error Has Occured",
        });
    }
}

export const deleteAuthor = async (req, res)=>{
    try {
        const { authorId } = req.body
        await prisma.author.deleteMany({
            where:{
                id : authorId
            }
        })
        return res.status(200).send({
            message : "SUCCESS"
        });
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            message : "An Error Has Occured",
        });
    }
}
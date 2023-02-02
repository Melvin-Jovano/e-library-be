import { PrismaClient } from '@prisma/client';
import path from "path";
import { v4 as uuidv4 } from 'uuid';
import multer from 'multer';

const prisma = new PrismaClient()

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, "public/images")
    },
    filename: function(req, file, cb){
        const extension = path.extname(file.originalname);
        const fileName = uuidv4() + extension;
        cb(null, fileName)
    }
})
export const upload = multer({
    storage,
    fileFilter: function(req, file, cb){
        const ext = path.extname(file.originalname)
        const allowedExt = ['.png', '.jpg', '.jpeg'];
        if(!allowedExt.includes(ext.toLowerCase())){
            return cb("message : Invalid Image")
        }
        else{
            cb(null, true)
        }
    }
})

const createAuthor = async (val)=>{
    const newAuthor = await prisma.author.create({
        data:{
            name: val.toLowerCase()
        },
        select:{
            id: true
        }
    })
    return newAuthor
}

export const inputBook = async (req, res)=>{
    try {
        const coverImg = req.file.filename
        const fileUrl = `/images/${coverImg}`;
        const {title, description, published, pages, authorName, stock} = req.body
        const author = await prisma.author.findFirst({
            where:{
                name : authorName.toLowerCase()
            },
            select:{
                id: true
            }
        })
        let authorId;
        if(author !== null){
            authorId = author.id
        }
        else{
            authorId = (await createAuthor(authorName)).id
        }
        const book = await prisma.book.create({
            data:{
                title : title,
                cover : fileUrl,
                description : description,
                published_at : parseInt(published),
                total_page : parseInt(pages),
                author_id : parseInt(authorId),
                stock : parseInt(stock)
            }
        })
        return res.status(200).send({
            message : "SUCCESS",
            data: book
        });
    } catch (error) {
        return res.status(500).send({
            message : "An Error Has Occured",
        });
    }
}

export const getAllBooks = async (req,res)=>{
    try {
        const { limit, last_id } = req.query;
        let [lastId, idFilter] = [null, {}];
        if(last_id !== undefined) {
            idFilter = {
                id: {
                    lte: Number(last_id)
                }
            };
        }

        const data = await prisma.book.findMany({
            orderBy: [{id: 'desc'}],
            take: Number(limit) + 1,
            where: {
                ...idFilter
            },
            select:{
                id : true,
                title : true,
                cover : true,
                description : true,
                published_at : true,
                total_page : true,
                stock : true,
                author : {
                    select : {
                        id : true,
                        name : true
                    }
                }
            }
        });

        if(data.length > limit) {
            lastId = data.pop().id;
        }
        
        return res.status(200).send({
            message : "SUCCESS",
            data: {
                data,
                lastId
            }
        });
    } catch (error) {
        return res.status(500).send({
            message : "An Error Has Occured",
        });
    }
}

export const getBookById = async (req, res)=>{
    try {
        const { bookId } = req.params
        const book = await prisma.book.findUnique({
            where:{
                id: parseInt(bookId)
            },
            select:{
                id : true,
                title : true,
                cover : true,
                description : true,
                published_at : true,
                total_page : true,
                stock : true,
                author : {
                    select : {
                        id : true,
                        name : true
                    }
                }
            }
        })
        return res.status(200).send({
            message : "SUCCESS",
            data: book
        });
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            message : "An Error Has Occured",
        });
    }
}

export const updateBook = async (req,res)=>{
    try {
        const { bookId, stock } = req.body
        const book = await prisma.book.update({
            where:{
                id : bookId
            },
            data:{
                stock : stock
            },
            select:{
                id : true,
                stock : true
            }
        })
        return res.status(200).send({
            message : "SUCCESS",
            data: book
        });
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            message : "An Error Has Occured",
        });
    }
}

export const deleteBook = async (req, res)=>{
    try {
        const { bookId } = req.body
        await prisma.book.delete({
            where:{
                id : bookId
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
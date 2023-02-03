import { PrismaClient } from '@prisma/client';
import path from "path";
import { v4 as uuidv4 } from 'uuid';
import multer from 'multer';
import sharp from 'sharp';
import config from '../config/app.js';
import fs from 'fs';

const prisma = new PrismaClient()

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, config.IMG_UPLOAD_DIR)
    },
    filename: function(req, file, cb){
        cb(null, uuidv4() + path.extname(file.originalname))
    }
});

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

export const inputBook = async (req, res)=>{
    try {
        let fileUrl = `/images/${req.file.filename}`;
        const {title, description, published, pages, authorId, stock} = req.body;

        if(req.file.size > config.IMG_LIMIT_SIZE) {
            const size = (await fs.promises.stat(req.file.path)
                .then((respond) => {
                    return respond.size;
                })
                .catch((error) => {
                    return -1;
                }));

            const sizeAcceptedInPercent = Math.floor((size - (size - (config.IMG_LIMIT_SIZE / 2))) / (size / 100));

            await sharp(req.file.path)
            .jpeg({quality : sizeAcceptedInPercent})
            .toFile(`${config.IMG_UPLOAD_DIR}/compress-${req.file.filename}`)
            .then((res) => {
                fileUrl = `/images/compress-${req.file.filename}`;
            })
            .catch((err) => {
                console.error(err);
            })
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
        console.error(error);
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
                id : parseInt(bookId)
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
        const bookId = req.params.id
        await prisma.book.delete({
            where:{
                id : parseInt(bookId)
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
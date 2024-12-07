import { Request, Response } from "express";
import PostModel from "../models/Post";
import { PostAttributes } from "../interfaces/types";

const createPost = async (req: Request, res: Response) : Promise<Response<any, Record<string, any>>> => {
  try {
    console.log("addPost:", req.body);

    const post : PostModel = await PostModel.create({
      ...req.body,
    });

    const formattedPost : PostAttributes = {
      id: post.id,
      title: post.title,
      subtitle: post.subtitle,
      content: post.content,
      userId: post.userId,
    };

    console.log("addPost:", formattedPost);
    return res.status(201).json(formattedPost);
  } catch (error) {
    console.error("Error when adding a post:", error);
    return res.status(500).send("Error when adding a post");
  }
};

// const getAllPost = async (req: Request, res: Response) {
//     try {
//     PostModel.findOne({
//         attributes: ['id', 'title', 'content', 'id'],
//     }).then((result) => {
//         return res.json(result);
//     }).catch((error) => {
//         console.log(error);
//         return res.json({});
//     });
// };
// } catch (error) {
//     console.error("Erreur lors de la récuperation du post :", error);
//     res.status(500).send("Erreur lors de la recuperation du post);
// }

const getPostById = async (req: Request, res:Response) : Promise<void> => {
    const postId : string = req.params.id;
    PostModel.findOne({
        attributes: ['id', 'title', 'subtitle', 'content', 'userId'],
        where: {
            id: postId
        }
    })
    .then((result) => {
        if (result) {
            return res.json(result);
        }
        return res.status(404).json({ message: "Item not found" });
    })
    .catch((error) => {
        console.log(error);
        return res.status(500).json({});
    });
};

const getAllPosts = async (req: Request, res: Response) : Promise<void> => {
    await PostModel.findAll({
        attributes: ["id", "title", "content"]
    }).then((result) => {
        return res.json(result);
    }).catch((error) => {
        console.log(error);
        return res.json({});
    });
};


const updatePost = async (req: Request, res: Response) : Promise<void> => {
    PostModel.update({
            title: "Updated Title Name!",
        }, {
            where: {
                id: 1,
            },
        })
        .then((result) => {
            return res.json(result);
        })
        .catch((error) => {
            console.log(error);
            return res.json({});
        });
};



const deletePost = async (req:Request, res: Response) : Promise<void> => {
    PostModel.destroy({
            where: {
                id: 1,
            },
        })
        .then((result) => {
            return res.json(result);
        })
        .catch((error) => {
            console.log(error);
            return res.json({});
        });
};

export default {
    createPost,
    // getLatestPost,
    getPostById,
    getAllPosts,
    updatePost,
    deletePost,
};
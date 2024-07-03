import { Request, Response } from "express";
import PostModel from "../models/Post";

const createPost = async (req: Request, res: Response) => {
  try {
    console.log("addPost:", req.body);

    const post = await PostModel.create({
      ...req.body,
    });

    const formattedPost = {
      id: post.id,
      title: post.title,
      subtitle: post.subtitle,
      content: post.content,
      userIDd: post.userId,
    };

    console.log("addPost:", formattedPost);
    res.status(201).json(formattedPost);
  } catch (error) {
    console.error("Erreur lors de l'ajout d'un post :", error);
    res.status(500).send("Erreur lors de l'ajout d'un post");
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

const getPostById = async (req: Request, res:Response) => {
    const postId = req.params.id; 

    
    PostModel.findOne({
        attributes: ['id', 'title', 'content'],
        where: {
            id: postId
        }
    })
    .then((result) => {
        if (result) {
            return res.json(result);
        } else {
            return res.status(404).json({ message: "Article non trouvé." });
        }
    })
    .catch((error) => {
        console.log(error);
        return res.status(500).json({});
    });
};

const getAllPosts = async (req: Request, res: Response) => {
    await PostModel.findAll({
        attributes: ["id", "title", "content"]
    }).then((result) => {
        return res.json(result);
    }).catch((error) => {
        console.log(error);
        return res.json({});
    });
};


const updatePost = async (req: Request, res: Response) => {
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



const deletePost = async (req:Request, res: Response) => {
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
import { Request, Response } from "express";
import PostModel from "../models/Post";
import { PostAttributes } from "../interfaces/types";
import Post from "../models/Post";

const createPost = async (
  req: Request,
  res: Response,
): Promise<Response<any, Record<string, any>>> => {
  try {
    console.log("addPost:", req.body);

    const post: PostModel = await PostModel.create({
      ...req.body,
    });

    const formattedPost: PostAttributes = {
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

const getPostById = async (req: Request, res: Response): Promise<void> => {
  const postId: string = req.params.id;
  PostModel.findOne({
    attributes: ["id", "title", "subtitle", "content", "userId"],
    where: {
      id: postId,
    },
  })
    .then((result) => {
      if (result) {
        return res.json(result);
      }
      return res.status(404).json({ message: "Post not found" });
    })
    .catch((error) => {
      console.log(error);
      return res.status(500).json({});
    });
};

const getAllPosts = async (req: Request, res: Response): Promise<void> => {
  await PostModel.findAll({
    attributes: ["id", "title", "content"],
  })
    .then((result) => {
      return res.json(result);
    })
    .catch((error) => {
      console.log(error);
      return res.json({});
    });
};

const updatePost = async (
  req: Request,
  res: Response,
): Promise<Response<any, Record<string, any>>> => {
  try {
    const postId: string = req.params.id;
    const content: string = req.body.content;
    const post = await Post.findByPk(postId);

    if (!post) {
      return res.status(404).json({ message: "The post don't exist." });
    }

    await post.update({ content });

    return res.status(200).json({ message: "Post is update." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error retrieving post." });
  }
};

const deletePost = async (
  req: Request,
  res: Response,
): Promise<Response<any, Record<string, any>>> => {
  try {
    const postId: string = req.params.id;
    const post = await Post.findByPk(postId);
    if (!post) {
      return res.status(404).json({ message: "The post don't exist." });
    }
    await post.destroy();
    return res.status(204).json({ message: "Post removed success." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error to remove commentary." });
  }
};

export default {
  createPost,
  getPostById,
  getAllPosts,
  updatePost,
  deletePost,
};

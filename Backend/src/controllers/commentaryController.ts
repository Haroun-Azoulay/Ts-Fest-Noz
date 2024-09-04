import { Request, Response } from 'express';
import Commentary from '../models/Commentary';
import Post from '../models/Post';
import { Commentaries, CommentariesByPost } from '../interfaces/types';

const createCommentary = async (req: Request, res: Response) : Promise<Response<any, Record<string, any>>> => {
  try {
    const postId : string = req.params.postId;

    const post = await Post.findByPk(postId);
    if (!post) {
      return res.status(404).json({ message: "The associated post does not exist" });
    }

    const commentary : Commentary = await Commentary.create({
      ...req.body,
      postId: postId,
    });

    return res.status(201).json({
      id: commentary.id,
      content: commentary.content,
      userId: commentary.userId
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error creating comment" });
  }
}

const getCommentariesByPost = async (req: Request, res: Response) : Promise<Response<any, Record<string, any>>> => {
  try {
    const postId : string = req.params.postId;

    const post : Post | null = await Post.findByPk(postId);
    if (!post) {
      return res.status(404).json({ message: "The associated post does not exist" });
    }

    const commentaries : Commentary[] = await Commentary.findAll({
      where: { postId },
      attributes: ["id", "content", "userId", "createdAt"]
    });

    /* const commentariesWithUserDetails : CommentariesByPost[] = await Promise.all(commentaries.map(async (commentary) => {
      return {
        id: commentary.id,
        content: commentary.content,
        userId: commentary.userId
      };
    }) */

    return res.json(commentaries);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error retrieving comments for the specified post" });
  }
}

const getAllCommentaries = async (req: Request, res: Response) : Promise<Response<any, Record<string, any>>> => {
  try {

    const commentaries : Commentary[] = await Commentary.findAll({
      attributes: ["id", "content",]
    });


    const commentariesWithUserDetails : Commentaries[] = await Promise.all(commentaries.map(async (commentary) => {
      return {
        id: commentary.id,
        content: commentary.content,
      };
    }));

    return res.json(commentariesWithUserDetails);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error retrieving comments" });
  }
};

const updateCommentary = async (req: Request, res: Response) : Promise<Response<any, Record<string, any>>> => {
  try {
    const commentaryId : string = req.params.commentaryId;
    const content : string = req.body.content;

    const commentary = await Commentary.findByPk(commentaryId);
    if (!commentary) {
      return res.status(404).json({ message: "Le commentaire n'existe pas." });
    }

    await commentary.update({ content });

    return res.status(200).json({ message: "Commentaire mis à jour avec succès." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erreur lors de la mise à jour du commentaire." });
  }
};

const deleteCommentary = async (req: Request, res: Response) : Promise<Response<any, Record<string, any>>> => {
  try {
    const commentaryId : string = req.params.commentaryId;

    const commentary = await Commentary.findByPk(commentaryId);
    if (!commentary) {
      return res.status(404).json({ message: "Le commentaire n'existe pas." });
    }

    await commentary.destroy();

    return res.status(200).json({ message: "Commentaire supprimé avec succès." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erreur lors de la suppression du commentaire." });
  }
};

export default {
  createCommentary,
  getCommentariesByPost,
  getAllCommentaries,
  updateCommentary,
  deleteCommentary,
};

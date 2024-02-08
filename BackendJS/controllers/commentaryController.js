const Commentary = require("../models/Commentary");
const Post = require("../models/Post");
const User = require("../models/User");
const verifyToken = require("../middlewares/verifyToken");


const createCommentary = async (req, res) => {
  try {
    const { postId } = req.params;
    const { content } = req.body;
    const userId = req.user.userId; // Récupération de l'ID utilisateur à partir du token

    // Vérifier si le post existe
    const post = await Post.findByPk(postId);
    if (!post) {
      return res.status(404).json({ message: "Le post associé n'existe pas." });
    }

    // Créer un nouveau commentaire en associant l'userID récupéré du token
    const commentary = await Commentary.create({ postId, content, userId });

    // Récupérer les détails de l'utilisateur, y compris le pseudo
    const user = await User.findByPk(userId);

    // Vérifier si aucun utilisateur n'est trouvé pour l'ID fourni
    if (!user) {
      return res.status(404).json({ message: "L'utilisateur associé au commentaire n'existe pas." });
    }

    // Renvoyer la réponse avec le commentaire créé et les détails de l'utilisateur
    return res.status(201).json({
      id: commentary.id,
      content: commentary.content,
      userId: commentary.userId,
      user: user ? { id: user.id, pseudo: user.pseudo } : null,
      createdAt: commentary.createdAt,
      updatedAt: commentary.updatedAt
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erreur lors de la création du commentaire." });
  }
};
// Get all commentaries for a specific post
const getCommentariesByPost = async (req, res) => {
  try {
    const { postId } = req.params;

    // Vérifier si le post existe
    const post = await Post.findByPk(postId);
    if (!post) {
      return res.status(404).json({ message: "Le post associé n'existe pas." });
    }

    // Récupérer tous les commentaires pour un seul post spécifique avec les détails de l'utilisateur
    const commentaries = await Commentary.findAll({
      where: { postId },
      attributes: ["id", "content", "userId", "createdAt", "updatedAt"]
    });

    // Pour chaque commentaire, récupérer les détails de l'utilisateur associé
    const commentariesWithUserDetails = await Promise.all(commentaries.map(async (commentary) => {
      const user = await User.findByPk(commentary.userId, { attributes: ["id", "pseudo"] });
      return {
        id: commentary.id,
        content: commentary.content,
        userId: commentary.userId,
        user: user ? { id: user.id, pseudo: user.pseudo } : null,
        createdAt: commentary.createdAt,
        updatedAt: commentary.updatedAt
      };
    }));

    return res.json(commentariesWithUserDetails);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erreur lors de la récupération des commentaires pour le post spécifié." });
  }
};
const getAllCommentaries = async (req, res) => {
  try {
    // Récupérer tous les commentaires avec certains attributs
    const commentaries = await Commentary.findAll({
      attributes: ["id", "content", "userId", "createdAt", "updatedAt"]
    });

    // Pour chaque commentaire, récupérer les détails de l'utilisateur associé
    const commentariesWithUserDetails = await Promise.all(commentaries.map(async (commentary) => {
      const user = await User.findByPk(commentary.userId, { attributes: ["id", "pseudo"] });
      return {
        id: commentary.id,
        content: commentary.content,
        userId: commentary.userId,
        user: user ? { id: user.id, pseudo: user.pseudo } : null,
        createdAt: commentary.createdAt,
        updatedAt: commentary.updatedAt
      };
    }));

    return res.json(commentariesWithUserDetails);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erreur lors de la récupération des commentaires." });
  }
};




// Update a commentary by ID
const updateCommentary = async (req, res) => {
  try {
    const { commentaryId } = req.params;
    const { content } = req.body;

    // Vérifier si le commentaire existe
    const commentary = await Commentary.findByPk(commentaryId);
    if (!commentary) {
      return res.status(404).json({ message: "Le commentaire n'existe pas." });
    }

    // Mettre à jour le contenu du commentaire
    await commentary.update({ content });

    return res.status(200).json({ message: "Commentaire mis à jour avec succès." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erreur lors de la mise à jour du commentaire." });
  }
};

// Delete a commentary by ID
const deleteCommentary = async (req, res) => {
  try {
    const { commentaryId } = req.params;

    // Vérifier si le commentaire existe
    const commentary = await Commentary.findByPk(commentaryId);
    if (!commentary) {
      return res.status(404).json({ message: "Le commentaire n'existe pas." });
    }

    // Supprimer le commentaire
    await commentary.destroy();

    return res.status(200).json({ message: "Commentaire supprimé avec succès." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erreur lors de la suppression du commentaire." });
  }
};

module.exports = {
  createCommentary,
  getCommentariesByPost,
  getAllCommentaries,
  updateCommentary,
  deleteCommentary,
};

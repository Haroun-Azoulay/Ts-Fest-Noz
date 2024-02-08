const Profil = require("../models/Profil");
const User = require("../models/User");

async function createProfil(req, res, next) {
    try {
        const userId = req.user.userId; // Récupérez l'ID de l'utilisateur authentifié
        const { music_style, groupe_name, town, country } = req.body;

        const user = await User.findByPk(userId);

        // Vérifier si aucun utilisateur n'est trouvé pour l'ID fourni
        if (!user) {
          return res.status(404).json({ message: "L'utilisateur associé n'existe pas." });
        }

        // Vérifier si l'utilisateur a déjà un profil
        const existingProfil = await Profil.findOne({ where: { userId } });

        if (existingProfil) {
          return res.status(400).json({ message: "L'utilisateur a déjà un profil." });
        }

        // Créer un nouveau profil en utilisant Sequelize
        const profil = await Profil.create({
            music_style,
            groupe_name,
            town,
            country,
            userId: userId, // Associez directement userId à la clé étrangère
        });

        console.log('req.user:', req.user);
        console.log('userId:', userId); 
        return res.status(201).json({
            id: profil.id,
            userId: profil.userId,
            music_style: profil.music_style,
            groupe_name: profil.groupe_name,
            town: profil.town,
            country: profil.country,
          });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Erreur lors de la création du profil." });
    }
}


function getMyProfil(req, res, next) {
    const userId = req.params.userId; // Get userId from URL parameters
    Profil.findOne({
        where: { userId }, // Filter by userId
        attributes: ["music_style", "groupe_name", "town", "country"]
    }).then((result) => {
        return res.json(result);
    }).catch((error) => {
        console.log(error);
        return res.json({});
    });
}

function updateProfil(req, res, next) {
    // Supposons que l'ID de l'utilisateur est passé dans la requête, 
    // ou récupéré de la session / token d'authentification
    const userId = req.params.userId; // ou req.user.id si vous utilisez l'authentification

    const { music_style, groupe_name, town, country } = req.body;

    Profil.update({
        music_style,
        groupe_name,
        town,
        country,
    }, {
        where: { UserId: userId }, // Utilisez l'ID utilisateur pour trouver le profil
    })
    .then((result) => {
        if (result[0] > 0) {
            return res.json({
                message: "Profil mis à jour avec succès!",
            });
        } else {
            return res.status(404).json({
                message: "Profil non trouvé.",
            });
        }
    })
    .catch((error) => {
        console.log(error);
        return res.status(500).json({
            message: "Erreur lors de la mise à jour du profil",
        });
    });
};



module.exports = {
    createProfil,
    getMyProfil,
    updateProfil,
  };
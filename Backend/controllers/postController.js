const PostModel = require("../models/Post");


function createPost(req, res, next)  {

    const { title, subtitle, content } = req.body;

    PostModel.create({
        title,
        subtitle,
        content,    
    })
    .then((result) => {
        return res.json({
            message: "Article créé avec succès!",
        });
    })
    .catch((error) => {
        console.log(error);
        return res.json({
            message: "Impossible de créer l'article!",
        });
    });
};

function getLatestPost (req, res, next) {
    PostModel.findOne({
        attributes: ['id', 'title', 'content', 'id'],
    }).then((result) => {
        return res.json(result);
    }).catch((error) => {
        console.log(error);
        return res.json({});
    });
};

function getPostById (req, res, next) {
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

function getAllPosts (req, res, next) {
    PostModel.findAll({
        attributes: ["id", "title", "content"]
    }).then((result) => {
        return res.json(result);
    }).catch((error) => {
        console.log(error);
        return res.json({});
    });
};


function updatePost (req, res, next) {
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



function deletePost (req, res, next) {
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

module.exports = {
    createPost,
    getLatestPost,
    getPostById,
    getAllPosts,
    updatePost,
    deletePost,
  };
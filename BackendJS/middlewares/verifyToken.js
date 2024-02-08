const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
        return res.status(401).json({ message: "L'authentification est requise." });
    }

    const token = authorizationHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: "L'authentification est requise." });
    }

    // Vérifiez le jeton ici en utilisant la bibliothèque jwt.verify
    jwt.verify(token, "RANDOM_SECRET_KEY", (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Token invalide." });
        }

        // Le jeton est valide, vous pouvez stocker des informations utiles dans req.user si nécessaire
        req.user = decoded;
        next();
    });
}

module.exports = verifyToken;

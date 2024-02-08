/**
 * Import express and store in a constant.
 */
const express = require("express");
const cors = require('cors');
const userRoutes = require('./routes/userRoutes'); 
const postRoutes = require('./routes/postRoutes');
const mapsRoutes = require('./routes/mapsRoutes');
const profilRoutes = require('./routes/profilRoutes');
const commentaryRoutes = require('./routes/commentaryRoutes');
const adminRoutes = require('./routes/adminRoutes');
const UserModel = require('./models/User');
const PostModel = require("./models/Post");
const OrganizerModel = require("./models/Post");
const EventModel = require("./models/Event");
const MapModel = require("./models/Map");
const Artist_profileModel = require('./models/Artist_profile');
const Artist_profile_eventModel = require('./models/Artist_profile_event');
const Music_categoryModel = require('./models/Music_category');
const Artist_profile_music_catModel = require('./models/Artist_profile_music_cat');
const CityModel = require('./models/City');
const CommentModel = require('./models/Comment');
const Organizer_profilModel = require('./models/Organizer_profil');
/**
 * Create an express application by running express as a function,
 * and store it to a constant.
 */

const app = express();
app.use(cors());
app.use(express.json());

app.use('/users', userRoutes);
app.use('/maps', mapsRoutes);
app.use('/posts', postRoutes);
app.use('/commentaries', commentaryRoutes);
app.use('/admin', adminRoutes);
app.use('/profil', profilRoutes);


/**
 * Define the port number that the express application should use.
 */
const port = 3000;

/**
 * Import the database connection file.
 */
const db = require("./config/database");



/**
 * Create a anonymous function to establish the database connection.
 * After the connection is established, start the server.
 */
const initApp = async () => {
    console.log("Testing the database connection..");
    /**
     * Test the connection.
     * You can use the .authenticate() function to test if the connection works.
     */
    try {
        await db.authenticate();
        console.log("Connection has been established successfully.");

        /**
         * Syncronize the Post model.
         */
         UserModel.sync({
            force: true,
        });
        OrganizerModel.sync({
            force: true,
        });
        PostModel.sync({
            force: true,
        });
        Artist_profileModel.sync({
            force: true,
        });
        Organizer_profilModel.sync({
            force: true,
        });
        MapModel.sync({
            force: true,
        });
        EventModel.sync({
            force: true,
        });
        CommentModel.sync({
            force: true,
        });
        Artist_profile_eventModel.sync({
            force: true,
        });
        Music_categoryModel.sync({
            force: true,
        });
        Artist_profile_music_catModel.sync({
            force: true,
        });
        CityModel.sync({
            force: true,
        });
        /**
         * Start the web server on the specified port.
         */
        app.listen(port, () => {
            console.log(`Server is up and running at: http://localhost:${port}`);
        });
    } catch (error) {
        console.error("Unable to connect to the database:", error.original);
    }
};

/**
 * Initialize the application.
 */
initApp();
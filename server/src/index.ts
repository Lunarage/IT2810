/**
 * @file The entry point for the application. This is the file npm tries to run when `npm start` is run.
 */
import { startServer } from "./Server";

//Set port number of the server
const port = 3000;

startServer(port)
    .then((server) => console.log("Running on port " + port))
    .catch((error) => {
        console.log(error);
    });

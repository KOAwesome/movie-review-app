import app from "./server.js";
import mongodb from "mongodb";
import ReviewsDAO from "./dao/reviewsDAO.js";

const MONGOClient = mongodb.MongoClient;

const uri = `mongodb+srv://mkssps42:luffy_02@cluster0.hj2bw1g.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
const port = 8000;

MONGOClient.connect(
    uri,
    {
        maxPoolSize: 50,
        wtimeoutMS: 2500,
        useNewUrlParser: true
    })
    .catch(err => {
        console.error(err.stack)
        process.exit(1)
    })
    .then(async client => {
        await ReviewsDAO.injectDB(client)
        app.listen(port, () => {
            console.log(`listening on port ${port}`)
        })
    })
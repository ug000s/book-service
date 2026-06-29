import dotenv from 'dotenv';
import express from 'express';
import bookRoutes from "./routes/book.routes.js";
import authorRoutes from "./routes/author.routes.js";
import publisherRoutes from "./routes/publisher.routes.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(bookRoutes);
app.use(authorRoutes);
app.use(publisherRoutes);

app.use((req, res) => res.status(404).json({message: 'Not Found'}));

const startServer = async () => {
    // TODO: Connect to DB
    app.listen(process.env.PORT || 8080, () => {
        console.log(`Server running on port ${process.env.PORT || 8080}`);
    })
}

startServer();
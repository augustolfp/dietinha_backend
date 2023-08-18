import dotenv from "dotenv";
import app from "./app";

dotenv.config();

app.listen(3001, () => {
    console.log(`Server running at port 3001`);
});

import { app } from "./App.js";
import { connectDB } from "./data/Database.js";

connectDB();
console.log()
app.listen(process.env.PORT,()=>{
    console.log("Server is working");
});
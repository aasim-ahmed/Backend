import express from "express";
import "dotenv/config";
import cors from "cors";
import bodyParser from "body-parser";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoute.js";
import questionRoutes from "./routes/questionRoute.js";
import testRoutes from "./routes/testRoute.js";
import questionTypeRoutes from "./routes/questionTypeRoute.js";
import assessmentRoutes from "./routes/assessmentRoute.js";
import testInvitationRoutes from "./routes/testInvitationRoute.js"
import candidateProfileRoutes from "./routes/candidateProfileRoute.js"



const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

connectDB();

app.get("/", (req, res) => {
    res.json("API is running");
})

app.use("/user", userRoutes);
app.use("/question", questionRoutes);
app.use("/questiontype", questionTypeRoutes);
app.use("/test", testRoutes);
app.use("/assessment", assessmentRoutes);
app.use('/invitations', testInvitationRoutes);
app.use("/candidate", candidateProfileRoutes);


app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});




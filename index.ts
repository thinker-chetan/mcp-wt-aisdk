import { generateText } from "ai"
import { google } from "@ai-sdk/google"
import {experimental_createMCPClient as createMCPClient} from "@ai-sdk/mcp"
import { configDotenv } from "dotenv"
import express from "express"
configDotenv();

const app = express()
app.use(express.json());

app.get("/", (req, res) => {
    res.json({ message: "Hello, World!" });
});
const {default: users} = (await import("./userPATStore.json", {
  with: { type: "json" }
}));


app.post("/chat", async (req, res) => {
    const { message }: { message: string } = req.body;
    const user = req.headers['x-user'] as string;

    if (!user) {
        return res.json({ error: "User header is required" }).status(400);
    }
    if (!message) {
        return res.json({ error: "Message is required" }).status(400);
    }
    const userPAT = users[user as keyof typeof users];
    "At not found"
    if (!userPAT) {
        return res.json({ error: "User not found" }).status(401);
    }

    const mcpClient = await createMCPClient({
        transport:{
            type: "http",
            url: process.env.GITHUB_MCP_URI as string,
            headers: {
                "Authorization": `Bearer ${userPAT}`
            }
        }
    });
    try{

        const tools = await mcpClient.tools()

        const response = await generateText({
            model: google("gemini-2.5-flash"),
            // messages: [{ role: "user", content: message }],
            prompt: message,
            tools
        });
        res.json({ response });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
    finally {
        await mcpClient.close();
    }
});

app.listen(8000, () => {
    console.log("Server is running at http://localhost:8000");
    });


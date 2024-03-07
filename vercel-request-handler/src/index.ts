import express from "express";
import { S3 } from "aws-sdk";

const s3 = new S3({
    accessKeyId: "f9e2295f04c27533516aa6f55dc05718",
    secretAccessKey: "d28ae97e62ef503748b30daaa43061928a29fce240dba4fdae8acac2eb756309",
    endpoint: "https://74066781ef07a8961e6311d60a4730aa.r2.cloudflarestorage.com"
})

const app = express();

app.get("/*", async (req, res) => {
    // id.100xdevs.com
    const host = req.hostname;

    const id = host.split(".")[0];
    const filePath = req.path;

    const contents = await s3.getObject({
        Bucket: "vercel",
        Key: `dist/${id}${filePath}`
    }).promise();
    
    const type = filePath.endsWith("html") ? "text/html" : filePath.endsWith("css") ? "text/css" : "application/javascript"
    res.set("Content-Type", type);

    res.send(contents.Body);
})

app.listen(3001);
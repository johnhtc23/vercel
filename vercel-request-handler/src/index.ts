import express from "express";
import { S3 } from "aws-sdk";

const s3 = new S3({
    accessKeyId: "you need to put your own accesskeyid from cloudflare r2 or aws s2",
    secretAccessKey: "you need to put your own secretAccessKey from cloudflare r2 or aws s2",
    endpoint: "you need to put your own endpoint from cloudflare r2 or aws s2"
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

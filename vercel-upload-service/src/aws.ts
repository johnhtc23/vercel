import { S3 } from "aws-sdk";
import fs from "fs";

const s3 = new S3({
    accessKeyId: "you need to put your own accesskeyid from cloudflare r2 or aws s2",
    secretAccessKey: "you need to put your own secretAccessKey from cloudflare r2 or aws s2",
    endpoint: "you need to put your own endpoint from cloudflare r2 or aws s2"
})

// fileName => output/12312/src/App.jsx
// filePath => /Users/harkiratsingh/vercel/dist/output/12312/src/App.jsx
export const uploadFile = async (fileName: string, localFilePath: string) => {
    const fileContent = fs.readFileSync(localFilePath);
    const response = await s3.upload({
        Body: fileContent,
        Bucket: "vercel",
        Key: fileName,
    }).promise();
    console.log(response);
}

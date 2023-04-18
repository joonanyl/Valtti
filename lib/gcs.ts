import { Storage } from "@google-cloud/storage"

const storage = new Storage({
  keyFilename: process.env.GCS_CREDENTIALS,
})

const bucket = storage.bucket(process.env.GCS_BUCKET as string)

export const uploadFile = async (file: any, fileName: string) => {
  const fileUpload = bucket.file(fileName)

  const stream = fileUpload.createWriteStream({
    metadata: {
      contentType: file.mimetype,
    },
  })

  stream.on("error", (err) => {
    console.log(err)
  })

  stream.on("finish", () => {
    console.log(`File uploaded to ${fileName}`)
  })

  stream.end(file.buffer)
}

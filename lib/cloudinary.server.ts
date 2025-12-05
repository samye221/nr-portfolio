import { v2 as cloudinarySDK } from 'cloudinary'

cloudinarySDK.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
})

export const cloudinary = cloudinarySDK

export const CLOUDINARY_FOLDERS = {
  projects: 'projects',
} as const

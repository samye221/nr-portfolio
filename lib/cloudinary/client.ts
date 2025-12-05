import { v2 as cloudinary } from 'cloudinary'
import { CLOUDINARY_CONFIG } from './config'

cloudinary.config({
  cloud_name: CLOUDINARY_CONFIG.cloudName,
  api_key: CLOUDINARY_CONFIG.apiKey,
  api_secret: CLOUDINARY_CONFIG.apiSecret,
})

export { cloudinary }

# Cloudinary Integration & Railway Deployment Guide

## ✅ Completed Steps

### 1. Cloudinary Integration
- ✅ Installed `cloudinary` package
- ✅ Added Cloudinary environment variables to `.env.local`
- ✅ Updated `next.config.js` to allow Cloudinary domain
- ✅ Created Cloudinary utility functions (`src/lib/cloudinary.ts`)
- ✅ Added image upload API route (`src/app/api/upload/route.ts`)
- ✅ Created reusable ImageUpload component (`src/components/ui/image-upload.tsx`)
- ✅ Committed and pushed changes to GitHub

### 2. Environment Variables Setup
```bash
CLOUDINARY_URL="cloudinary://717625194399347:hgl0d1SPnbpXu8tO_jHtmkFYBQc@dg4vugh1a"
CLOUDINARY_CLOUD_NAME="dg4vugh1a"
CLOUDINARY_API_KEY="717625194399347"
CLOUDINARY_API_SECRET="hgl0d1SPnbpXu8tO_jHtmkFYBQc"
```

## 🔄 Next Steps for Railway Deployment

### Manual Railway Login Required
Since Railway requires browser authentication, please complete these steps:

1. **Login to Railway**:
   ```bash
   railway login
   ```
   - This will open your browser
   - Authenticate with your Railway account

2. **Link to existing project or create new one**:
   ```bash
   railway link
   ```
   - Select your existing prostormat project if it exists
   - Or create a new project

3. **Set environment variables in Railway**:
   ```bash
   railway variables set CLOUDINARY_URL="cloudinary://717625194399347:hgl0d1SPnbpXu8tO_jHtmkFYBQc@dg4vugh1a"
   railway variables set CLOUDINARY_CLOUD_NAME="dg4vugh1a"
   railway variables set CLOUDINARY_API_KEY="717625194399347"
   railway variables set CLOUDINARY_API_SECRET="hgl0d1SPnbpXu8tO_jHtmkFYBQc"
   ```

4. **Deploy to Railway**:
   ```bash
   railway deploy
   ```

5. **Check deployment status**:
   ```bash
   railway status
   ```

6. **View logs if needed**:
   ```bash
   railway logs
   ```

## 🔍 Troubleshooting

### Common Issues:
1. **Build failures**: Check that all dependencies are properly installed
2. **Environment variables**: Ensure all Cloudinary variables are set in Railway
3. **Database issues**: Make sure DATABASE_URL is properly configured
4. **Image upload errors**: Verify Cloudinary credentials are correct

### Checking Deployment:
- Wait 2-3 minutes after deployment
- Check Railway dashboard for build status
- View logs for any error messages
- Test image upload functionality

## 🎯 Features Added

### Image Upload Component
The `ImageUpload` component provides:
- Drag & drop file upload
- Image preview
- File validation (type and size)
- Cloudinary integration
- Delete functionality
- Loading states

### API Endpoints
- `POST /api/upload` - Upload images to Cloudinary
- `DELETE /api/upload?publicId=...` - Delete images from Cloudinary

### Utility Functions
- `uploadImage()` - Upload with transformations
- `deleteImage()` - Remove from Cloudinary
- `getOptimizedImageUrl()` - Generate optimized URLs
- `getResponsiveImageUrls()` - Multiple sizes for responsive design

## 📝 Usage Example

```tsx
import { ImageUpload } from '@/components/ui/image-upload';

function LocationForm() {
  const [imageUrl, setImageUrl] = useState('');

  return (
    <ImageUpload
      value={imageUrl}
      onChange={setImageUrl}
      onRemove={() => setImageUrl('')}
      folder="locations"
    />
  );
}
```

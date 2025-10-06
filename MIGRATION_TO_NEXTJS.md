# Vite to Next.js Migration Guide

This project has been successfully migrated from Vite to Next.js 15 (App Router).

## What Changed

### File Structure
- **New**: `app/` directory with Next.js App Router structure
- **New**: `next.config.mjs` for Next.js configuration
- **Removed**: Old `src/App.tsx` and `src/main.tsx` (renamed to `.old`)
- **Modified**: All page components now have `'use client'` directive
- **Modified**: All routing uses Next.js navigation instead of React Router

### Scripts
```json
{
  "dev": "concurrently \"next dev\" \"node server.js\"",
  "build": "npm run prebuild && next build",
  "start": "next start",
  "preview": "next start"
}
```

### Key Differences from Vite

1. **Routing**: Uses Next.js App Router (file-system based) instead of React Router
   - Pages are in `app/` directory
   - Dynamic routes use `[param]` syntax
   - Client components need `'use client'` directive

2. **Development Server**: Runs on port 3000 by default (Vite was 8080)
   - Can be changed with `next dev -p 8080`

3. **Build Output**: Creates `.next/` directory instead of `dist/`

4. **Environment Variables**: 
   - ✅ All variable names preserved (no changes needed)
   - Work exactly the same as Vite
   - Accessible via `process.env`

## Running the Application

### Development
```bash
npm run dev
```
This starts both Next.js dev server (port 3000) and API server (port 3000).

### Production Build
```bash
npm run build
npm start
```

### Testing Locally
The API server runs alongside Next.js and handles:
- `/api/info`
- `/api/download`
- `/api/downloadThumbnail`
- `/api/generateTitles`
- `/api/uploadthing`

## Deployment

### Vercel (Recommended)
The project is already configured for Vercel with `vercel.json`:
```json
{
  "framework": "nextjs"
}
```

Just push to your repository and Vercel will automatically deploy.

### Other Platforms
Make sure to:
1. Run `npm run build`
2. Start with `npm start`
3. Ensure the API server runs alongside Next.js

## Environment Variables

All environment variable names remain the same:
- `OPENROUTER_API_KEY` - For AI title generation
- `UPLOADTHING_TOKEN` - For file uploads
- Any other variables you had before

## Important Notes

1. **Client-Side Rendering**: This app uses `dynamic = 'force-dynamic'` because it's heavily client-side with localStorage, authentication, etc.

2. **API Proxy**: The Next.js config includes rewrites to proxy `/api/*` requests to `localhost:3000` in development.

3. **React Helmet**: Still uses `react-helmet-async` for SEO. Consider migrating to Next.js Metadata API in the future for better performance.

4. **Static Assets**: All files in `/public` are accessible at the root URL.

## Troubleshooting

### Build Errors with SSR
If you see errors about `localStorage` or `window` during build:
- Make sure components using these have `'use client'` directive
- Check that the component isn't being imported in server components

### Module Resolution
If you see import errors:
- Check `tsconfig.json` has the correct `paths` configuration
- Ensure `@/*` points to `./src/*`

### API Routes Not Working
- Make sure `server.js` is running
- Check the proxy configuration in `next.config.mjs`
- Verify the API endpoint URLs match

## Migration Checklist

- [x] Next.js configuration created
- [x] App directory structure set up
- [x] All routes migrated
- [x] All components updated to use Next.js navigation
- [x] Environment variables tested
- [x] Build process verified
- [x] Development server tested
- [x] Deployment configuration updated

## Need Help?

- Next.js Documentation: https://nextjs.org/docs
- App Router Guide: https://nextjs.org/docs/app
- Migration from Vite: https://nextjs.org/docs/app/building-your-application/upgrading/from-vite

## Rollback Instructions

If you need to rollback to Vite:
1. Rename `.old` files back (remove `.old` suffix)
2. Delete `app/` directory
3. Delete `next.config.mjs`
4. Restore `package.json` scripts to use `vite` commands
5. Restore `vercel.json` to use `"framework": "vite"`

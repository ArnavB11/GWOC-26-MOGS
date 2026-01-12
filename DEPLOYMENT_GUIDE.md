# Deployment Guide - Rabuste Cafe Website

This guide will help you deploy your website to production using free hosting services.

## Prerequisites

- ✅ GitHub repository: https://github.com/ArnavB11/GWOC-26-MOGS.git
- ✅ All code changes completed (API URLs updated)
- ✅ Supabase database already configured

---

## Step 1: Deploy Backend to Render

### 1.1 Create Render Account
1. Go to https://render.com
2. Sign up with your GitHub account
3. Verify your email

### 1.2 Create New Web Service
1. Click **"New +"** → **"Web Service"**
2. Connect your GitHub repository: `ArnavB11/GWOC-26-MOGS`
3. Configure the service:
   - **Name**: `rabuste-backend`
   - **Region**: Choose closest to you (e.g., Singapore, Mumbai)
   - **Branch**: `main` (or your default branch)
   - **Root Directory**: `GWOC-26-MOGS/server`
   - **Runtime**: `Node`
   - **Build Command**: Leave empty (or `npm install`)
   - **Start Command**: `node index.js`
   - **Instance Type**: Free

### 1.3 Add Environment Variables
Click **"Advanced"** → **"Add Environment Variable"** and add:

```
SUPABASE_URL=https://rlgrdafxczxxiamuutqg.supabase.co
SUPABASE_ANON_KEY=sb_publishable_ZGs_jrmjgNlUiWneq2DC8w_Ni2e47x1
GROQ_API_KEY=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
RAZORPAY_KEY_ID=rzp_test_RximJDDvLewU8p
RAZORPAY_KEY_SECRET=qH3JqEnT9Dqzs2gfuO7zp5PO
NODE_ENV=production
PORT=5000
```

### 1.4 Deploy
1. Click **"Create Web Service"**
2. Wait 5-10 minutes for deployment
3. Once deployed, copy your backend URL (e.g., `https://rabuste-backend.onrender.com`)

**⚠️ Important**: Render free tier spins down after 15 minutes of inactivity. First request after spin-down takes ~30 seconds.

---

## Step 2: Update Frontend Config

After getting your backend URL from Render:

1. Update `src/config.ts`:
   - Replace `'https://rabuste-backend.onrender.com'` with your actual Render URL

2. Or set it via environment variable (recommended):
   - We'll add this in Vercel

---

## Step 3: Deploy Frontend to Vercel

### 3.1 Create Vercel Account
1. Go to https://vercel.com
2. Sign up with your GitHub account
3. Import your repository: `ArnavB11/GWOC-26-MOGS`

### 3.2 Configure Project
1. **Framework Preset**: Vite
2. **Root Directory**: `GWOC-26-MOGS`
3. **Build Command**: `npm run build`
4. **Output Directory**: `dist`
5. **Install Command**: `npm install`

### 3.3 Add Environment Variables
In Vercel project settings → **Environment Variables**, add:

```
VITE_API_URL=https://rabuste-backend.onrender.com
```
(Replace with your actual Render backend URL)

Also add all your VITE_ prefixed variables:
```
VITE_EMAILJS_SERVICE_ID=service_euocvfk
VITE_EMAILJS_TEMPLATE_ID_ONLINE=template_ppsswbj
VITE_EMAILJS_TEMPLATE_ID_COUNTER=template_yiva8nf
VITE_EMAILJS_PUBLIC_KEY=iBP44QtlbfrCwiHpe
VITE_RAZORPAY_KEY_ID=rzp_test_RximJDDvLewU8p
VITE_EMAILJS_HOST_SERVICE_ID=service_vp3wgpu
VITE_EMAILJS_HOST_TEMPLATE_ID=template_spewlmv
VITE_EMAILJS_HOST_PUBLIC_KEY=RdOVeBaL0yEbaDzRb
VITE_EMAILJS_WORKSHOP_RESERVE_SERVICE_ID=service_vp3wgpu
VITE_EMAILJS_WORKSHOP_RESERVE_TEMPLATE_ID=template_uhc1a4l
VITE_EMAILJS_WORKSHOP_RESERVE_PUBLIC_KEY=RdOVeBaL0yEbaDzRb
VITE_SUPABASE_URL=https://rlgrdafxczxxiamuutqg.supabase.co
VITE_SUPABASE_ANON_KEY=sb_publishable_ZGs_jrmjgNlUiWneq2DC8w_Ni2e47x1
```

### 3.4 Deploy
1. Click **"Deploy"**
2. Wait 2-3 minutes
3. Your site will be live at `https://your-project.vercel.app`

---

## Step 4: Update Backend CORS (if needed)

If you get CORS errors, update `server/index.js` CORS configuration to include your Vercel URL:

```javascript
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://your-project.vercel.app',  // Add your Vercel URL
    'https://*.vercel.app'
  ],
  credentials: true
}));
```

Then redeploy the backend.

---

## Step 5: Test Everything

1. ✅ Visit your Vercel URL
2. ✅ Test menu loading
3. ✅ Test cart functionality
4. ✅ Test chat widget
5. ✅ Test order placement
6. ✅ Test on mobile device

---

## Troubleshooting

### Backend not responding
- Check Render logs for errors
- Verify all environment variables are set
- Wait 30 seconds if it's the first request (Render spin-up)

### CORS errors
- Update CORS in `server/index.js` with your Vercel URL
- Redeploy backend

### API calls failing
- Verify `VITE_API_URL` is set correctly in Vercel
- Check browser console for errors
- Verify backend URL is accessible

### Database connection issues
- Verify Supabase credentials are correct
- Check Supabase dashboard for connection status

---

## Alternative: Railway (Backend)

If Render doesn't work, try Railway:

1. Go to https://railway.app
2. Sign up with GitHub
3. New Project → Deploy from GitHub
4. Select your repo
5. Set Root Directory: `GWOC-26-MOGS/server`
6. Add environment variables (same as Render)
7. Deploy

Railway gives you a URL like `https://your-app.railway.app`

---

## Next Steps

- [ ] Add custom domain (optional)
- [ ] Set up Razorpay webhooks with your backend URL
- [ ] Monitor logs for errors
- [ ] Set up error tracking (optional)

---

## Support

If you encounter issues:
1. Check Render/Vercel logs
2. Check browser console
3. Verify all environment variables are set
4. Test backend URL directly: `https://your-backend.onrender.com/api/menu`

Good luck! 🚀


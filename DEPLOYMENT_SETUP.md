# Firebase Auto-Deployment Setup Guide

This guide will help you set up automatic deployment from GitHub to Firebase Hosting.

## What This Does

Every time you push changes to the `master` branch on GitHub, it will:
1. Automatically build your project
2. Deploy the build to Firebase Hosting
3. Your live site will be updated within minutes

## Setup Steps

### Step 1: Generate Firebase Service Account Key

1. Go to Firebase Console: https://console.firebase.google.com/
2. Select your project: **energica-admin**
3. Click the gear icon (⚙️) next to "Project Overview" → Select "Project settings"
4. Go to the "Service accounts" tab
5. Click "Generate new private key"
6. Download the JSON file (keep it secure!)

### Step 2: Add GitHub Secret

1. Go to your GitHub repository: https://github.com/PravaigDynamics/energica
2. Click on "Settings" tab
3. In the left sidebar, click "Secrets and variables" → "Actions"
4. Click "New repository secret"
5. Name: `FIREBASE_SERVICE_ACCOUNT`
6. Value: Copy and paste the **entire contents** of the JSON file you downloaded
7. Click "Add secret"

### Step 3: Commit and Push the Workflow

The workflow file has been created at `.github/workflows/firebase-deploy.yml`

You need to commit and push it:

```bash
git add .github/workflows/firebase-deploy.yml
git commit -m "Add GitHub Actions workflow for Firebase auto-deployment"
git push origin master
```

### Step 4: Test It Out

1. Make any small change to your code
2. Commit and push to master
3. Go to GitHub → Your repo → "Actions" tab
4. You'll see the deployment running
5. Once it completes (green checkmark), your site is live!

## Alternative: Firebase CLI Auto-Deploy (Quick Setup)

If you prefer a simpler setup without service accounts:

```bash
firebase init hosting:github
```

This command will:
- Connect your GitHub repo
- Set up the workflow automatically
- Configure all necessary secrets

## Viewing Deployment Status

- GitHub Actions: https://github.com/PravaigDynamics/energica/actions
- Firebase Hosting: https://console.firebase.google.com/project/energica-admin/hosting

## How It Works

The workflow will trigger on:
- Every push to `master` branch (auto-deploys to production)
- Every pull request (creates preview deployment)

## Troubleshooting

If deployment fails:
1. Check the "Actions" tab on GitHub for error logs
2. Verify the FIREBASE_SERVICE_ACCOUNT secret is set correctly
3. Ensure your Firebase project ID is correct in `.firebaserc`
4. Make sure your build command works locally: `npm run build`

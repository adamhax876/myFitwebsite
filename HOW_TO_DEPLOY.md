# How to Deploy Your FitAI App for Free

This guide will walk you through deploying your application on Vercel. Since we have removed the database and user accounts, the process is now much simpler!

## You Will Need:
1.  A **GitHub** account.
2.  A **Vercel** account (you can sign up for free with your GitHub account).
3.  Your **Gemini API Key**.

---

## Step 1: Push Your Code to GitHub

If your project isn't already in a GitHub repository, create a new one and push your code to it. Vercel connects directly to GitHub to deploy your projects.

---

## Step 2: Deploy on Vercel

### 1. Sign up for Vercel
   - Go to [Vercel.com](https://vercel.com/) and sign up for a free "Hobby" account using your GitHub account.

### 2. Import and Deploy Your Project
   - On your Vercel dashboard, click "Add New... > Project".
   - Find your project's GitHub repository and click "Import".
   - Vercel will automatically detect that it's a Vite project. The default settings are usually correct.

### 3. Add Your API Key (CRITICAL STEP)
   - Before you click "Deploy", expand the "**Environment Variables**" section.
   - You must add your Gemini API key here so Vercel can use it.
   - In the **Name** field, type: `VITE_API_KEY`
   - In the **Value** field, paste your actual Gemini API key.
   - **Important:** The name must start with `VITE_` for the application to be able to access it.

### 4. Deploy!
   - Click the "**Deploy**" button.

Vercel will now build and deploy your application. In a minute or two, it will provide you with a public URL (like `your-project-name.vercel.app`).

**Congratulations! Your application is now live on the internet.**

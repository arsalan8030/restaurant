# Publishing Restaurant Website to GitHub

## ✅ What's Been Done

Your project has been initialized as a git repository with an initial commit containing all your project files.

## 📋 Next Steps to Publish to GitHub

### Step 1: Create a Repository on GitHub

1. Go to [GitHub.com](https://github.com)
2. Sign in to your account (create one if needed)
3. Click the **"+"** icon in the top right → Select **"New repository"**
4. Fill in the details:
   - **Repository name**: `restaurant`
   - **Description**: Restaurant Booking Website with Razorpay Payment Integration
   - **Visibility**: Choose "Public" (for open source) or "Private" (for personal use)
   - **DO NOT** initialize with README, .gitignore, or license (we already have these)
5. Click **"Create repository"**

### Step 2: Add Remote and Push to GitHub

After creating the repository, GitHub will show you commands. Run these in your terminal:

```powershell
cd c:\Users\gait\OneDrive\Desktop\Restaurant\restaurant

# Add the remote repository
git remote add origin https://github.com/arsalan8030/restaurant.git

# Rename branch to main (if needed)
git branch -M main

# Push your code to GitHub
git push -u origin main
```

**Replace `YOUR_USERNAME` with your actual GitHub username**

### Step 3: Verify on GitHub

1. Go to your repository URL: `https://github.com/YOUR_USERNAME/restaurant`
2. Verify all your files are there
3. Check the commits tab to see your initial commit

## 🔄 Regular Updates (After Making Changes)

Whenever you make changes to your code:

```powershell
# Stage changes
git add .

# Commit with a message
git commit -m "Describe your changes here"

# Push to GitHub
git push
```

## 📝 Example Commit Messages

```
git commit -m "Add payment page enhancements with tooltips"
git commit -m "Fix html2canvas import error"
git commit -m "Update Tailwind CSS configuration"
git commit -m "Add form validation feedback"
git commit -m "Improve UI/UX with animations"
```

## 🔐 Authentication

### If using HTTPS (Recommended for beginners):
- Use your GitHub username and a **Personal Access Token** as password
- Create token: GitHub Settings → Developer settings → Personal access tokens

### If using SSH (More secure):
```powershell
# Generate SSH key
ssh-keygen -t ed25519 -C "your-email@example.com"

# Add to SSH agent and GitHub account
```

## 📚 Useful Git Commands

```powershell
# Check status
git status

# View commit history
git log

# View changes
git diff

# Create a new branch for features
git checkout -b feature-name

# Switch branches
git checkout main

# Merge branches
git merge feature-name

# Delete branch
git branch -d feature-name
```

## 🚀 Optional: Set up GitHub Actions for CI/CD

Add `.github/workflows/deploy.yml` to auto-deploy when you push:

```yaml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
```

## 🎯 Key Files in Your Repository

- `app/` - Next.js application files
  - `payment/page.jsx` - Payment page with Razorpay integration
  - `book/page.jsx` - Booking page
  - `components/` - Reusable React components
- `lib/db.js` - Database configuration
- `models/Booking.js` - Booking model
- `package.json` - Project dependencies
- `next.config.ts` - Next.js configuration
- `tailwind.config.js` - Tailwind CSS configuration

## ⚠️ Important: Secure Your Secrets

**NEVER commit sensitive information!**

Make sure your `.gitignore` includes:
- `.env` - Environment variables with API keys
- `node_modules/` - Already included
- `.next/` - Build files

If you accidentally pushed secrets:
```powershell
git rm --cached .env
git commit -m "Remove .env file"
git push
```

## 📞 Support

For GitHub help: https://docs.github.com
For Git commands: https://git-scm.com/doc

---

You're all set! Your project is ready to be pushed to GitHub. 🎉

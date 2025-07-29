# Deployment Architecture

  * **Platform:** Vercel, integrated with a Git repository.
  * **CI/CD Pipeline:** Every `git push` creates a Preview Deployment. Pushing to `main` deploys to Production.
  * **Environments:** Development (localhost), Preview (automatic per-branch URLs), and Production (live URL).

-----

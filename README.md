# Project Documentation: Certificate Generation Tool

## 1. Overview

This document provides a comprehensive technical overview of the certificate generation tool. The project is a web application that allows users to generate personalized certificates, download them as PDFs, and order physical copies.

## 2. User Flow & Features

### User Journey

1.  **Landing Page:** Introduces the certificate generation tool.
2.  **Certificate Generation (`/generate`):** Users enter their full name and select a district to see a real-time certificate preview.
3.  **Download/Order:**
    *   **Download E-certificate:** Users can download a PDF of their certificate.
    *   **Order Hard Copy:** Users can order a physical copy.

### Key Features

*   **Dynamic Certificate Preview:** Real-time preview of the certificate.
*   **E-certificate Download:** Download a high-resolution PDF certificate.
*   **Hard Copy Ordering:** Order a physical copy of the certificate.
*   **Responsive Design:** Fully responsive for mobile, tablet, and desktop devices.

## 3. Architecture

The application is built with a modern, component-based architecture using Next.js, providing a scalable and serverless solution.

### 3.1. Frontend

*   **Framework:** React and Next.js
*   **UI Components:** shadcn/ui for accessible and composable components, with custom components for specific features.
*   **Styling:** Tailwind CSS with a token-based approach for consistency.
*   **State Management:** A mix of local state and a custom `useLocalStorageState` hook.
*   **Content:** Decoupled from UI components and managed in `src/data/content.json`.

### 3.2. Backend

*   **Services:** Built with Next.js API Routes and Server Actions.
    *   `POST /api/generate-pdf`: Generates a personalized, high-resolution PDF certificate.
    *   Server Actions: Handle certificate record creation and order submissions.
*   **Database:** Drizzle ORM for database management.
    *   **`users` table:** Stores user information and certificate details.
    *   **`orders` table:** Stores hard copy order information.

### 3.3. Testing

*   **Framework:** Jest and React Testing Library.
*   **Coverage:** Unit and integration tests for components, API routes, and server actions.

## 4. Project Structure

The project is organized into the following directories:

```
/
├── public/           # Static assets (images, fonts, etc.)
├── src/
│   ├── app/          # Next.js App Router
│   │   ├── api/      # API routes
│   │   ├── actions/  # Server actions
│   │   └── generate/ # Certificate generation page
│   ├── components/   # Reusable React components
│   │   └── ui/       # shadcn/ui components
│   ├── data/         # Application-specific data (content, districts)
│   ├── db/           # Drizzle ORM schema and configuration
│   ├── hooks/        # Custom React hooks
│   ├── lib/          # Utility functions
│   └── services/     # Business logic services
├── ...
```

## 5. Getting Started

### Prerequisites

*   Node.js
*   npm

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/your-username/your-repo.git
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```

### Running the Application

```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

## 6. Future Improvements

*   **State Management:** Adopt a more robust state management library like Zustand or Redux Toolkit.
*   **Component Abstraction:** Break down large components into smaller, more manageable ones.
*   **Styling:** Replace remaining inline styles with Tailwind CSS utility classes.
*   **Testing:** Implement comprehensive end-to-end tests using a tool like Playwright or Cypress.
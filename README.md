# Project Status Report

## 1. User Flow & Implemented Features

### User Journey

A user's journey through the application is as follows:

1.  **Landing Page:** The user arrives at a landing page that introduces the certificate generation tool.
2.  **Certificate Generation:** The user navigates to the `/generate` page, where they can enter their full name and select their district from a dropdown list. A real-time preview of the certificate is displayed as they type.
3.  **Download/Order:** Once the user is satisfied with the preview, they are presented with two options in a tabbed interface:
    *   **Download E-certificate:** The user can enter their phone number, accept the terms and conditions, and complete a reCAPTCHA verification to download a PDF of their certificate.
    *   **Order Hard Copy:** The user can fill out a form with their shipping address to order a physical copy of their certificate.

### Implemented Features

*   **Dynamic Certificate Preview:** A real-time preview of the certificate is generated as the user enters their details.
*   **E-certificate Download:** Users can download a high-resolution PDF of their certificate after verifying their phone number via a mock OTP service.
*   **Hard Copy Ordering:** Users can order a physical copy of their certificate by providing their shipping address.
*   **Responsive Design:** The application is designed to be fully responsive and accessible on mobile, tablet, and desktop devices.

## 2. Backend & Architecture

### Backend Services

The backend is built using Next.js API Routes and Server Actions, providing a serverless architecture that is both scalable and cost-effective. The following services have been implemented:

*   **`POST /api/generate-pdf`:** This endpoint generates a personalized, high-resolution PDF certificate. It takes the user's name and district as input, embeds them into a PDF template along with a unique certificate number, and returns the generated file.
*   **`POST /api/send-otp`:** A mock endpoint that simulates sending an OTP to a user's phone number for verification.
*   **`POST /api/verify-otp`:** A mock endpoint that verifies the OTP submitted by the user.
*   **`POST /api/create-order`:** This endpoint handles the creation of new orders for hard copies of certificates. It saves the user's shipping details to the database and triggers a notification for order fulfillment.
*   **Server Actions:** Server Actions are used to create certificate records and handle order submissions, providing a secure and efficient way to interact with the database.

### Database Schema

The database schema is managed using Drizzle ORM and is designed to support user registration and order management. The following tables are defined:

*   **`users`:** Stores user information, including their name, town, phone number, and a unique certificate number. It also includes a self-referencing relationship to track referrals.
*   **`orders`:** Stores information about hard copy orders, including the shipping address and a foreign key relationship to the `users` table.

## 3. Styling & Content

### UI Implementation

The UI is built with **React** and **Next.js**, using **shadcn/ui** for accessible and composable components. **Tailwind CSS** is used for styling, with a token-based approach to ensure consistency and maintainability.

The application's content is decoupled from the UI components and managed in a centralized `content.ts` file. This allows for easy updates and localization in the future. The styling is also centralized in `globals.css`, which defines a set of CSS variables that are used throughout the application.

### Architectural Patterns & Technical Debt

The application follows a modern, component-based architecture. The frontend is composed of reusable React components that are organized by feature. The backend is built with serverless functions, which provides a scalable and cost-effective solution.

There is some known technical debt that needs to be addressed:

*   The OTP verification service is currently mocked and needs to be replaced with a real implementation.
*   The order fulfillment process is manual and should be automated in the future.
*   The testing strategy needs to be improved to include more comprehensive end-to-end tests.

## Future Architectural Improvements

*   **State Management:** The current state management is handled with a mix of local state and a custom `useLocalStorageState` hook. As the application grows, it would be beneficial to adopt a more robust state management library like Zustand or Redux Toolkit to centralize and streamline state management across the application.
*   **Component Abstraction:** The `GeneratePage` component has grown quite large and could be broken down into smaller, more manageable components. This would improve readability, maintainability, and testability.
*   **Styling:** While the project has moved to a token-based styling approach, there are still some inline styles and hardcoded values that should be replaced with Tailwind CSS utility classes that use the defined design tokens.
*   **Testing:** The testing strategy should be improved to include more comprehensive end-to-end tests to ensure the entire user flow works as expected. This could be achieved using a tool like Playwright or Cypress.

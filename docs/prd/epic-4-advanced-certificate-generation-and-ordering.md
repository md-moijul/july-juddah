# Epic 4: Advanced Certificate Generation & Ordering

## 1. Introduction

This epic outlines the requirements for a comprehensive overhaul of the certificate generation and distribution flow. The goal is to move from a basic, static generator to a dynamic, multi-step process that includes user data capture, phone verification, and options for both digital and physical certificate delivery. This will enhance user experience, provide valuable user data, and open up a new channel for physical product orders.

## 2. Core Features

### 2.1. Revamped `/generate` Page UI & Flow
- The `/generate` page will be redesigned to a two-step user flow.
- **Step 1:** User inputs their name.
- **Step 2:** User selects their district from a dropdown list.
- The personalized certificate is generated and displayed on the page.
- Two CTA buttons are presented below the certificate: "Download E-certificate" and "Get a Hard Copy".

### 2.2. Enhanced PDF Generation
- The backend service will use a new PDF template (`template.pdf`).
- It will dynamically populate the user's name and selected district.
- A unique, sequential certificate number will be generated and added to each PDF.

### 2.3. E-Certificate Download with OTP Verification
- Clicking "Download E-certificate" will trigger a modal.
- The modal will require the user's phone number and agreement to Terms & Conditions.
- The phone number will be verified via an SMS OTP to ensure data quality.
- Upon successful verification, the PDF is downloaded.

### 2.4. Hard Copy Ordering Flow
- Clicking "Get a Hard Copy" will navigate the user to a new `/purchase` page.
- This page will collect the user's phone number and full shipping address.
- A "Confirm Order" button will finalize the request.

### 2.5. Backend Infrastructure
- A database (e.g., Vercel Postgres) will be provisioned to store user information (name, phone, address) and certificate details.
- The "Confirm Order" action will trigger a backend process, such as sending an order fulfillment email or calling a webhook.

## 3. Story Breakdown

This epic will be broken down into the following user stories:

- **Story 4.1:** Setup Backend for Advanced Certificate Generation
- **Story 4.2:** Redesign `/generate` Page for New User Flow
- **Story 4.3:** Update PDF Generation Service with Dynamic Data
- **Story 4.4:** Implement E-Certificate Download with OTP Verification
- **Story 4.5:** Build `/purchase` Page for Hard Copy Orders
- **Story 4.6:** Implement Backend Logic for Order Fulfillment

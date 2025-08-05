---
id: epic-5
title: "Epic 5: Tabbed Download & Order Flow"
status: "To Do"
---

## Description

This epic refactors the certificate generation and ordering process on the `/generate` page. The current modal-based OTP verification and download system will be replaced with an integrated tabbed interface, providing a smoother user experience.

## Core Requirements

### 1. High-Level UI Refactor
- **Remove `OtpVerificationModal`**: The `OtpVerificationModal` component and its usage in `GeneratePage` must be completely removed.
- **Integrate `CertificateDisplay`**: The `CertificateDisplay` component should be removed, and its logic for displaying the preview and action buttons should be integrated directly into the `GeneratePage`.
- **Tabbed Interface**: The existing buttons will be replaced with a tabbed interface (using `shadcn/ui` Tabs) with two options: "Download E-certificate" and "Order Hard Copy".

### 2. "Download E-certificate" Tab Flow
- **UI Components**: The tab panel will contain an input field for a phone number and a "Confirm & Download" button.
- **Button State**: The button will be enabled only when a valid phone number is entered.
- **Backend Integration**: On click, the button will trigger a new backend API endpoint.
- **Database Record**: The API endpoint will create a new record in the `users` database table with the `name`, `town`, `phone`, and a newly generated unique `certificateNumber`.
- **PDF Download**: After the database record is created successfully, the PDF download will be triggered automatically.

### 3. "Order Hard Copy" Tab Flow
- **UI Components**: The tab panel will contain a form with inputs for `phone number` and `shippingAddress`.
- **Data Pre-filling**: The `name`, `town`, and `phone number` fields will be pre-filled if the user has already entered them on the E-certificate tab or if they exist in local storage.
- **Backend Integration**: On click, the "Confirm Order" button will trigger a new API endpoint that creates a new record in the `orders` database table, linked to the user.

### 4. Component & State Management
- **Shared State**: The state for `fullName`, `selectedDistrict`, `phoneNumber`, and `shippingAddress` will be managed in the main `GeneratePage` component to be shared between the tabs.
- **New Components**: New, separate components will be created for the content of each tab panel (e.g., `EcertificateTab.tsx`, `HardCopyTab.tsx`) to keep the main page component clean.

## Stories

- **Story 5.1: UI Foundation Refactor**: Remove the old modal and buttons, and implement the new Tab component structure on the `GeneratePage`. Create the placeholder `EcertificateTab` and `HardCopyTab` components.
- **Story 5.2: Backend - Create User Record**: Create the new API endpoint that accepts user details, generates a user number, and saves a new record to the `users` table.
- **Story 5.3: E-Certificate Flow Integration**: Implement the UI and logic for the `EcertificateTab`. Connect the "Confirm & Download" button to the new API endpoint and trigger the PDF download on success.
- **Story 5.4: Hard Copy Flow**: Implement the UI and logic for the `HardCopyTab`, including pre-filling data. Create a new API endpoint to save the order to the `orders` table.

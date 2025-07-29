# July Smriti Certificate Portal Product Requirements Document (PRD)

| Date | Version | Description | Author |
| :--- | :--- | :--- | :--- |
| July 27, 2025 | 1.0 | Initial draft based on the new V1/V2 roadmap. | John, PM |

### Goals and Background Context

**Goals**

The primary goals for Version 1.0 of this project are:
* **User-Facing Goal:** To allow participants of the "July Student Revelation" event to easily and quickly generate a personalized, high-quality e-certificate to feel recognized for their involvement.
* **Business-Facing Goal:** To validate the core user flow and certificate design, providing a positive brand engagement that serves as a foundation for future lead generation and monetization features in V2.

**Background Context**

Event participants desire a formal acknowledgment of their involvement. A digital certificate provides instant gratification and a shareable asset. This portal aims to create a seamless and rewarding user experience where participants can instantly generate a beautiful, personalized e-certificate for free.

This initial version (V1.0) will focus exclusively on the certificate generation and download experience. The business objectives of lead generation (via OTP) and revenue generation (via upsells) are explicitly deferred to Version 2.0 to prioritize delivering immediate user value and a simplified initial launch.

---

### Requirements

#### Functional

* **FR1:** The landing page must display a clear headline and a single call-to-action (CTA) to begin the certificate generation process.
* **FR2:** The generation page must provide input fields for the user's "Full Name" and "Location" with basic validation to ensure they are not empty.
* **FR3:** The system must generate a low-resolution image preview of the certificate populated with the user's provided name and location.
* **FR4:** After previewing, the user must be able to trigger the final download of a high-resolution, non-editable PDF of the certificate.
* **FR5:** The PDF file must be named logically, incorporating the participant's name (e.g., `July_Revelation_Certificate_Jane_Doe.pdf`).

#### Non-Functional

* **NFR1:** **Performance:** All pages must load in under 3 seconds on a standard 4G connection. The certificate preview and final PDF generation should each take less than 5 seconds.
* **NFR2:** **Security:** The website must be served over HTTPS (SSL/TLS). All user-submitted data must be sanitized on the frontend to prevent basic injection attacks, even though no database is used in V1.
* **NFR3:** **Usability:** The website must be fully responsive and mobile-first, providing a seamless experience on smartphones, tablets, and desktops.
* **NFR4:** **Availability:** The website should maintain a 99.5% uptime during the post-event period.

---

### User Interface Design Goals

#### Overall UX Vision
The user experience should be clean, modern, and celebratory. It must be intuitive and fast, allowing a user to generate their certificate in under a minute with no friction. The design should feel rewarding and reinforce the positive memory of the "July Student Revelation" event.

#### Key Interaction Paradigms
The interface will function as a simple, linear, single-purpose application. Users will be guided through a clear step-by-step process (Enter Details -> Preview -> Download) without distractions. The flow should feel like a single, seamless experience, likely best achieved with a single-page application (SPA) approach.

#### Core Screens and Views
For V1.0, the necessary conceptual screens are:
* **Landing View:** The initial entry point with a single, clear call-to-action.
* **Generation & Preview View:** A single view containing the input fields and the certificate preview area.

#### Accessibility: WCAG AA
The application should adhere to Web Content Accessibility Guidelines (WCAG) 2.1 Level AA standards.

#### Branding
The design must prominently feature the official logos and branding of the "July Student Revelation" event. The overall aesthetic should align with any existing event marketing materials.

#### Target Device and Platforms: Web Responsive
The application must be designed with a mobile-first approach, ensuring a perfect experience on smartphones. The layout will then adapt seamlessly for tablet and desktop users.

---

### Technical Assumptions

#### Repository Structure: Monorepo
A **Monorepo** structure will be used to make it easier to add the backend service for OTP verification and the database in V2.0.

#### Service Architecture: Serverless
For reliable, high-quality PDF generation across all browsers, we will use a **Serverless Function** (e.g., AWS Lambda, Vercel Serverless Function). This is cost-effective and scales automatically.

#### Testing Requirements: Unit + Integration
The testing strategy will focus on Unit Tests for individual UI components and Integration Tests to validate the complete user flow.

#### Additional Technical Assumptions and Requests
* **Frontend Framework:** A modern framework like **Next.js** or **Vite + React** is recommended.
* **PDF Generation:** A library like `pdf-lib` or a headless browser service will be used to create the PDF.

---

### Epic List

* **Epic 1: Core Certificate Generation (V1.0)**
    * **Goal:** To establish the foundational frontend application and deliver the complete, non-gated visual certificate generation and download experience for event participants.

* **Epic 2: Lead Capture & Monetization (V2.0)**
    * **Goal:** To integrate mobile number verification via OTP to enable lead capture and to introduce an e-commerce upsell module to drive revenue. (Note: Stories for this epic will be detailed in a future planning session for V2.0).

---

### Epic 1: Core Certificate Generation (V1.0)

**Expanded Goal:** This epic focuses on creating the entire V1.0 application. The goal is to establish the project's foundational infrastructure, build the user-facing interface for generating a personalized certificate, and deliver the core functionality of a direct, high-quality PDF download. By the end of this epic, we will have a complete, deployable, and valuable product for event participants.

#### **Story 1.1: Project Initialization & Landing Page Shell**
**As a** new visitor, **I want** to see a clear landing page with a headline and a button, **so that** I immediately understand the site's purpose and how to start.

**Acceptance Criteria:**
1.  A new frontend project is initialized using a modern framework (e.g., Next.js or Vite+React).
2.  The project's basic dependencies are installed.
3.  A `LandingPage` component is created and displayed at the root URL (`/`).
4.  The page displays the main headline (e.g., "Commemorate Your Achievement: Get Your Free Certificate!").
5.  A single, clear Call-to-Action (CTA) button is visible on the page.
6.  The project can be run locally, and the landing page is accessible in a browser.

#### **Story 1.2: Certificate Generation Form & Preview**
**As a** participant, **I want** to enter my details and see a live preview of my certificate, **so that** I can verify its accuracy before downloading.

**Acceptance Criteria:**
1.  Clicking the landing page CTA navigates the user to the `/generate` page.
2.  The page contains input fields for "Full Name" and "Location".
3.  A `CertificatePreview` component is created and displayed on the page.
4.  The `CertificatePreview` component uses the official, pre-defined certificate design template.
5.  Any text typed into the "Full Name" and "Location" fields is reflected in the `CertificatePreview` component in real-time.
6.  A "Download PDF" button is visible but is not yet functional.

#### **Story 1.3: Serverless PDF Generation Endpoint**
**As a** system, **I want** to have a serverless endpoint that receives user details, **so that** I can generate a high-resolution, non-editable PDF certificate.

**Acceptance Criteria:**
1.  A new serverless function (e.g., `/api/generate-pdf`) is created.
2.  The function accepts a `fullName` and `location` in the request body.
3.  The function uses a PDF generation library and the official certificate template to create a high-resolution PDF.
4.  If the function is called successfully with valid data, it returns a `200 OK` status and the PDF file in the response.
5.  The returned PDF file is correctly populated with the `fullName` and `location` data.
6.  The function handles errors gracefully, returning an appropriate error code (e.g., `400 Bad Request` for missing data).

#### **Story 1.4: Finalize Download Integration**
**As a** participant, **I want** to click the download button and receive my finalized PDF certificate, **so that** I have a permanent digital memento of my achievement.

**Acceptance Criteria:**
1.  The "Download PDF" button on the `/generate` page is now functional.
2.  Clicking the button triggers a client-side call to the `/api/generate-pdf` serverless endpoint, passing the current "Full Name" and "Location" from the input fields.
3.  Upon a successful response from the API, the browser automatically initiates a download of the PDF file.
4.  The downloaded file is named logically using the participant's name (e.g., `July_Revelation_Certificate_John_Doe.pdf`).
5.  While the PDF is being generated, a loading indicator is displayed to the user.
6.  If the API call fails, a user-friendly error message is displayed.

---

### Next Steps

#### UX Expert Prompt
"The PRD for the July Smriti Certificate Portal (V1.0) is complete. Please review the `User Interface Design Goals` and the overall requirements to create a detailed UI/UX Specification using the `front-end-spec-tmpl` template. The primary goal is a simple, mobile-first, and celebratory user experience for generating a digital certificate."

#### Architect Prompt
"The PRD for the July Smriti Certificate Portal (V1.0) is complete. Please review it, along with the technical assumptions, to create a corresponding Architecture Document. The key constraints are a serverless approach for PDF generation and a monorepo structure to accommodate future V2.0 features."

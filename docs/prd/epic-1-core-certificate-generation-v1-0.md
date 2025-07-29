## Epic 1: Core Certificate Generation (V1.0)

**Expanded Goal:** This epic focuses on creating the entire V1.0 application. The goal is to establish the project's foundational infrastructure, build the user-facing interface for generating a personalized certificate, and deliver the core functionality of a direct, high-quality PDF download. By the end of this epic, we will have a complete, deployable, and valuable product for event participants.

### **Story 1.1: Project Initialization & Landing Page Shell**
**As a** new visitor, **I want** to see a clear landing page with a headline and a button, **so that** I immediately understand the site's purpose and how to start.

**Acceptance Criteria:**
1.  A new frontend project is initialized using a modern framework (e.g., Next.js or Vite+React).
2.  The project's basic dependencies are installed.
3.  A `LandingPage` component is created and displayed at the root URL (`/`).
4.  The page displays the main headline (e.g., "Commemorate Your Achievement: Get Your Free Certificate!").
5.  A single, clear Call-to-Action (CTA) button is visible on the page.
6.  The project can be run locally, and the landing page is accessible in a browser.

### **Story 1.2: Certificate Generation Form & Preview**
**As a** participant, **I want** to enter my details and see a live preview of my certificate, **so that** I can verify its accuracy before downloading.

**Acceptance Criteria:**
1.  Clicking the landing page CTA navigates the user to the `/generate` page.
2.  The page contains input fields for "Full Name" and "Location".
3.  A `CertificatePreview` component is created and displayed on the page.
4.  The `CertificatePreview` component uses the official, pre-defined certificate design template.
5.  Any text typed into the "Full Name" and "Location" fields is reflected in the `CertificatePreview` component in real-time.
6.  A "Download PDF" button is visible but is not yet functional.

### **Story 1.3: Serverless PDF Generation Endpoint**
**As a** system, **I want** to have a serverless endpoint that receives user details, **so that** I can generate a high-resolution, non-editable PDF certificate.

**Acceptance Criteria:**
1.  A new serverless function (e.g., `/api/generate-pdf`) is created.
2.  The function accepts a `fullName` and `location` in the request body.
3.  The function uses a PDF generation library and the official certificate template to create a high-resolution PDF.
4.  If the function is called successfully with valid data, it returns a `200 OK` status and the PDF file in the response.
5.  The returned PDF file is correctly populated with the `fullName` and `location` data.
6.  The function handles errors gracefully, returning an appropriate error code (e.g., `400 Bad Request` for missing data).

### **Story 1.4: Finalize Download Integration**
**As a** participant, **I want** to click the download button and receive my finalized PDF certificate, **so that** I have a permanent digital memento of my achievement.

**Acceptance Criteria:**
1.  The "Download PDF" button on the `/generate` page is now functional.
2.  Clicking the button triggers a client-side call to the `/api/generate-pdf` serverless endpoint, passing the current "Full Name" and "Location" from the input fields.
3.  Upon a successful response from the API, the browser automatically initiates a download of the PDF file.
4.  The downloaded file is named logically using the participant's name (e.g., `July_Revelation_Certificate_John_Doe.pdf`).
5.  While the PDF is being generated, a loading indicator is displayed to the user.
6.  If the API call fails, a user-friendly error message is displayed.


# Epic 8: Refactor User Data and State Management

**Objective:** Refactor the user data and state management on the `/generate` page to improve maintainability, create a cleaner data lifecycle, and align with modern React best practices.

## Key Architectural Changes:

1.  **Single Local Storage Key:** Only the `userId` will be stored in local storage. All other user data (name, town, phone) will be removed from local storage.
2.  **User Data Context:**
    *   A new React Context (`UserDataContext`) and provider (`UserDataProvider`) will be created.
    *   The context will hold the complete user object (`{ id, name, town, phone }`) and a loading state.
    *   A custom hook `useUser()` will provide easy access to the context data.
3.  **Data Fetching on Load:**
    *   On the `/generate` page, a `useEffect` hook will check local storage for a `userId`.
    *   If a `userId` is found, a new Server Action (`getUserById`) will be called to fetch the full user data from the database.
    *   The fetched data will be stored in the `UserDataContext`.
4.  **UI Pre-population:**
    *   All form inputs on the `/generate` page (name, town, phone) will be pre-populated with data from the `UserDataContext`.
5.  **User Creation Flow:**
    *   When the `createUser` Server Action successfully creates a new user, the new `userId` returned by the action will be saved to local storage.

## Story Breakdown:

### Story 1: Foundational UserDataContext
*   **Description:** Create the core components for the new state management system: `UserDataContext`, `UserDataProvider`, and the `useUser` custom hook.
*   **File:** `docs/stories/8.1.story.md`

### Story 2: Backend - Create `getUserById` Server Action
*   **Description:** Create a new, secure Server Action to fetch a user's complete data from the database using their `userId`.
*   **File:** `docs/stories/8.2.story.md`

### Story 3: Integrate UserDataContext on Generate Page
*   **Description:** Integrate the new context and data flow into the `/generate` page, refactoring form components and data fetching logic.
*   **File:** `docs/stories/8.3.story.md`

### Story 4: Refactor CertificateForm Component
*   **Description:** Simplify the `CertificateForm` to only handle name and district, removing all other logic.
*   **File:** `docs/stories/8.4.story.md`

### Story 5: Implement E-Certificate User Creation Flow
*   **Description:** Implement the full user creation and download logic for the "E-certificate" tab.
*   **File:** `docs/stories/8.5.story.md`

### Story 6: Backend - Create createOrder Server Action
*   **Description:** Create the backend Server Action to handle the hard copy order logic, including finding or creating a user.
*   **File:** `docs/stories/8.6.story.md`

### Story 7: Implement Hard Copy Order Flow
*   **Description:** Implement the UI and client-side logic for the "Order Hard Copy" tab.
*   **File:** `docs/stories/8.7.story.md`

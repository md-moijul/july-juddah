# Epic 7: Refactor User ID System to Sequential Number

**Business Objective:** To streamline the user identification system by replacing the legacy `certificateNumber` with a simpler, sequential `userId`. This change will simplify the data model, reduce confusion, and align the system with standard practices for user identifiers.

**Technical Goal:** Refactor the database schema, backend services, and frontend components to remove all dependencies on `certificateNumber` and implement a new sequential `userId` based on the primary `id` field.

---

## Stories

### Story 7.1: Database Schema Migration

**Title:** `feat`: Migrate `users` table to remove `certificateNumber`

**Description:** This story focuses exclusively on updating the database schema. The `certificateNumber` column will be removed from the `users` table defined in the Drizzle schema. The existing `id` column will serve as the primary public user identifier moving forward.

**Acceptance Criteria:**
- The `certificateNumber` column is removed from the `users` table definition in `apps/web/src/db/schema.ts`.
- A new database migration script is successfully generated using Drizzle Kit.
- The migration script is reviewed and confirmed to correctly drop the `certificateNumber` column without affecting other data.
- The migration is successfully applied to the development database.

**Tasks:**
- [ ] Modify `apps/web/src/db/schema.ts` to remove the `certificateNumber` field from the `users` table.
- [ ] Run the Drizzle Kit command to generate the migration script.
- [ ] Manually inspect the generated SQL migration script for correctness.
- [ ] Apply the migration to the local development environment.

---

### Story 7.2: Backend Logic & Naming Convention Refactor

**Title:** `refactor`: Update user creation logic and rename certificate-related assets

**Description:** This story involves refactoring the backend logic for creating new users. The server action responsible for user creation will be updated to generate a new sequential `userId`. This includes renaming files, functions, and variables from "certificate" to "user" to align with the new terminology.

**Acceptance Criteria:**
- The file `apps/web/src/lib/actions/certificate.ts` is renamed to `apps/web/src/lib/actions/user.ts`.
- All functions and variables within the renamed file are updated to use "user" naming conventions (e.g., `createUser` instead of `createCertificate`).
- The user creation logic is updated to:
    - Find the maximum `id` from the `users` table.
    - Generate the new `userId` as `max(id) + 1`.
    - If the `users` table is empty, the initial `userId` is `1000`.
- The server action now returns the new sequential `userId`.
- All internal references to the old action path and function names are updated.

**Tasks:**
- [ ] Rename `apps/web/src/lib/actions/certificate.ts` to `apps/web/src/lib/actions/user.ts`.
- [ ] In the new `user.ts` file, refactor function names (e.g., `createCertificate` -> `createUser`).
- [ ] Implement the sequential `userId` generation logic within the `createUser` action.
- [ ] Ensure the `createUser` action returns the newly generated `userId`.
- [ ] Update any other backend code that referenced the old `actions/certificate.ts` file.

---

### Story 7.3: Frontend Integration

**Title:** `feat`: Integrate sequential `userId` in the frontend

**Description:** This story focuses on updating the frontend components to adapt to the backend changes. All UI elements, data-fetching hooks, and client-side logic that previously used `certificateNumber` must be updated to use the new sequential `userId`.

**Acceptance Criteria:**
- All frontend components that previously displayed or used `certificateNumber` now use the `userId`.
- Client-side calls to the user creation server action are updated to point to the new `actions/user.ts` and its refactored functions.
- The application correctly handles the `userId` returned from the backend.
- The user creation flow is fully functional from the UI, and the new `userId` is correctly displayed or handled as required.

**Tasks:**
- [ ] Identify all frontend components that reference `certificateNumber`.
- [ ] Update these components to use the `userId` field instead.
- [ ] Modify the client-side code that calls the user creation action to use the new endpoint and function (`/actions/user`).
- [ ] Test the end-to-end user creation flow to ensure the frontend correctly receives and processes the new `userId`.

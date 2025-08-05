---
Epic: 6
Title: Testing Refactor and Standardization
Status: To Do
Author: Winston (Architect)
Date: 2025-08-05
---

## Description

This epic addresses the inconsistencies in the current test suite and establishes a unified testing standard for the entire project. The goal is to improve test reliability, maintainability, and ensure all new and existing code is tested effectively.

## Testing Standard

All tests in this project must adhere to the following standards:

### 1. File Location

- All test files MUST be co-located in the same folder as the source file they are testing.
- The root `__tests__` directory MUST be eliminated.

### 2. File Naming Convention

- All test files must follow the `*.test.tsx` (for React components) or `*.test.ts` (for plain TypeScript files) naming convention.

### 3. Test Structure (Arrange, Act, Assert)

All tests must be structured with the following three distinct sections for clarity and consistency:

- **Arrange:** Set up the test environment, including any necessary data, mocks, or component rendering.
- **Act:** Execute the function or user interaction being tested.
- **Assert:** Verify the outcome of the action, checking for expected results, UI changes, or mock calls.

### 4. Testing Philosophy

- Tests should be written from a user's perspective, focusing on the component's behavior as experienced by the user.
- Utilize the React Testing Library to interact with components as a user would (e.g., finding elements by text, role, or label).
- Avoid testing internal implementation details. Focus on the rendered output and component interactions.

### 5. Mocking Strategy

- Use `jest.fn()` for mocking server actions, API calls, and custom hooks to ensure consistent and predictable test behavior.
- Mocks should be clearly defined and reset between tests to prevent state leakage.

## Stories

- [6.1: Refactor Landing Page Tests](./stories/6.1.story.md)
- [6.2: Refactor Generate Page Tests](./stories/6.2.story.md)
- [6.3: Refactor Purchase Page Tests](./stories/6.3.story.md)
- [6.4: Refactor API Route Tests](./stories/6.4.story.md)
- [6.5: Refactor Server Action Tests](./stories/6.5.story.md)
- [6.6: Refactor Hooks Tests](./stories/6.6.story.md)
- [6.7: Refactor Service Tests](./stories/6.7.story.md)
- [6.8: Refactor Component Tests & Remove __tests__ directory](./stories/6.8.story.md)

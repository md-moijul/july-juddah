# Development Setup

This project is structured as a monorepo, with the primary web application located in `apps/web`. When working on the web application, most `npm` commands should be executed from within the `apps/web` directory.

## Getting Started

1.  **Navigate to the web application directory:**
    ```bash
    cd apps/web
    ```

2.  **Install Dependencies:**
    From within the `apps/web` directory, install the project dependencies:
    ```bash
    npm install
    ```

3.  **Run the Development Server:**
    To start the Next.js development server:
    ```bash
    npm run dev
    ```
    The application should now be accessible at `http://localhost:3000`.

## Common Commands

All the following commands should be run from within the `apps/web` directory.

### Linting

To check code quality and style:
```bash
npm run lint
```

### Building the Project

To build the project for production:
```bash
npm run build
```

### Running Tests

To execute the test suite:
```bash
npm run test
```
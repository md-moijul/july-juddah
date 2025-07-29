# Tech Stack

This table is the single source of truth for all technologies, libraries, and tools to be used.

| Category | Technology | Version | Purpose | Rationale |
| :--- | :--- | :--- | :--- | :--- |
| **Frontend Language** | TypeScript | 5.4.5 | For type-safe frontend code. | Industry standard for robust React/Next.js applications. |
| **Frontend Framework** | Next.js | 14.2.3 | The core React framework for the UI and serverless functions. | Provides a production-ready foundation with routing, SSR, and API routes. |
| **UI Component Library** | **shadcn/ui** | **0.8.0** | Provides accessible, composable components to build the UI. | **(Refined)** An excellent choice that builds on Radix UI and Tailwind CSS, accelerating development while allowing full customization to match the `style.json` design system. |
| **CSS Framework** | Tailwind CSS | 3.4.3 | A utility-first CSS framework for styling. | The most efficient way to implement the custom `style.json` design system. `shadcn/ui` is built with it. |
| **State Management** | React Hooks | 18.2.0 | For managing simple form state on the client. | V1.0's state is simple; `useState` is sufficient. Avoids over-engineering. |
| **Backend Language** | TypeScript | 5.4.5 | For the serverless PDF generation function. | Maintains language consistency across the entire stack. |
| **Backend Framework**| Next.js API Routes | 14.2.3 | To create the serverless function endpoint. | The native, zero-configuration way to build serverless functions in Next.js/Vercel. |
| **Database** | **N/A for V1.0** | - | - | V1.0 has no data persistence requirement. |
| **Authentication** | **N/A for V1.0** | - | - | V1.0 is a public, non-gated application. |
| **Frontend Testing** | Jest & React Testing Library | 29.7.0 | For unit and component testing. | The standard, recommended testing stack for the React/Next.js ecosystem. |
| **E2E Testing** | Playwright | 1.44.0 | For end-to-end testing of the user flow. | A modern and powerful tool for ensuring the complete flow works as expected. |
| **CI/CD** | Vercel | - | Continuous integration and deployment. | Natively integrated with our chosen platform for seamless, automatic deployments. |
| **Monitoring** | Vercel Analytics | - | To monitor traffic and performance. | The built-in, easy-to-use analytics solution on Vercel. |
| **Logging** | Vercel Log Drains| - | To inspect logs from our serverless function. | The native logging solution on our chosen platform. |

-----

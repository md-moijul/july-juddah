# Frontend Architecture

### Component Architecture

The `src/components/sections` directory will contain a dedicated component for each major section defined in `content.json`.

```text
/src
|-- /components
|   |-- /ui
|   |   |-- button.tsx      // Reusable Button from shadcn/ui
|   |
|   |-- /sections
|   |   |-- navigation.tsx
|   |   |-- hero-section.tsx
|   |   |-- counter-section.tsx
|   |   |-- features-section.tsx
|   |   |-- image-banner.tsx
|   |   |-- disclaimer-section.tsx
|   |   |-- premium-items.tsx
|   |   |-- final-cta-section.tsx
|   |   |-- footer.tsx
|   |
|   |-- certificate-preview.tsx
|
|-- /app
|   |-- page.tsx
|   |-- /generate
|   |   |-- page.tsx
```

### State Management Architecture

For V1.0, state will be managed locally within the `generator-view.tsx` component using the standard React `useState` hook to manage the form inputs. Global state management is not required.

### Routing Architecture

We will use the Next.js file-system-based App Router.

```text
/src
|-- /app
|   |-- layout.tsx      // The root layout
|   |-- page.tsx        // The Homepage, accessible at "/"
|   |-- /generate
|   |   |-- page.tsx    // The Generator page, accessible at "/generate"
```

### Frontend Services Layer

API calls will be abstracted into a service layer using the browser's `fetch` API.

```typescript
// src/services/certificateService.ts
export async function generateCertificatePdf(data: CertificateData): Promise<Blob> {
  const response = await fetch('/api/generate-pdf', { /* ... */ });
  if (!response.ok) {
    const errorPayload = await response.json();
    throw new Error(errorPayload.message || 'Failed to generate PDF.');
  }
  return response.blob();
}
```

-----

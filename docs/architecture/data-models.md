# Data Models

For V1.0, we have a single, transient data model.

### CertificateData

  * **Purpose:** To represent the user-provided information required to personalize and generate the certificate. This data exists only for the duration of a single API request.
  * **Key Attributes:**
      * `fullName`: `string` - The participant's full name as it should appear on the certificate.
      * `location`: `string` - The participant's location (e.g., "City, Country") as it should appear on the certificate.
  * **Relationships:** None. This is a standalone data model for V1.0.

#### TypeScript Interface

This interface will be defined in a shared package within our monorepo so both the frontend and the backend function can use it.

```typescript
export interface CertificateData {
  fullName: string;
  location: string;
}
```

-----

# Core Workflows

This sequence diagram illustrates the sequence of events for both a successful generation and a potential server-side error.

```mermaid
sequenceDiagram
    participant User
    participant Frontend App
    participant PDF Service (Serverless)

    User->>+Frontend App: Enters Name and Location
    User->>+Frontend App: Clicks "Confirm & Download PDF"
    Frontend App->>+PDF Service (Serverless): POST /api/generate-pdf with CertificateData

    alt Successful Generation
        PDF Service (Serverless)-->>-Frontend App: 200 OK (Returns PDF file)
        Frontend App->>-User: Initiates browser download of PDF
    else Server Error
        PDF Service (Serverless)-->>-Frontend App: 500 Error (Returns JSON error message)
        Frontend App->>-User: Displays "Error generating certificate" message
    end
```

-----

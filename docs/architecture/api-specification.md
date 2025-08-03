# API Specification

We will use the OpenAPI 3.0 standard to define our API.

```yaml
openapi: 3.0.0
info:
  title: "July Juddah Certificate Generation API"
  version: "1.0"
  description: "API for generating personalized PDF certificates for the July Student Revelation event."
servers:
  - url: "/api"
    description: "API Server"

paths:
  /generate-pdf:
    post:
      summary: "Generates a personalized PDF certificate."
      description: "Accepts a participant's name and location, and returns a high-resolution PDF file."
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/CertificateData'
      responses:
        '200':
          description: "Successful generation. The PDF file is returned in the response body."
          content:
            application/pdf:
              schema:
                type: string
                format: binary
        '400':
          description: "Bad Request. The request body is missing required fields."
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Error'
        '500':
          description: "Internal Server Error. PDF generation failed on the server."
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Error'

components:
  schemas:
    CertificateData:
      type: object
      required:
        - fullName
        - location
      properties:
        fullName:
          type: string
          example: "Jane Doe"
        location:
          type: string
          example: "London, UK"
    Error:
      type: object
      properties:
        message:
          type: string
          example: "An error occurred."
```

-----

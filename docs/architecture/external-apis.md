# External APIs

Our V1.0 application has only one external API dependency, which is required to load the custom fonts specified in the design system.

### Google Fonts API

  * **Purpose:** To load the 'Lora' and 'Inter' web fonts required by the design system for headings and body text.
  * **Documentation:** `https://fonts.google.com/`
  * **Base URL:** `https://fonts.googleapis.com`
  * **Authentication:** None required.
  * **Key Endpoints Used:** A specific `GET` endpoint URL will be used to request the required font families and weights.
  * **Integration Notes:** This will be integrated via a standard `<link>` tag in the application's main HTML document head for optimal font loading performance.

-----

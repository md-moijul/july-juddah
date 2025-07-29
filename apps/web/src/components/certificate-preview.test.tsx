import React from "react";
import { render, screen } from "@testing-library/react";
import { CertificatePreview } from "./certificate-preview";

describe("CertificatePreview", () => {
  it("displays full name and location", () => {
    render(<CertificatePreview fullName="Jane Doe" location="London" />);

    expect(screen.getByText("Jane Doe")).toBeInTheDocument();
    expect(screen.getByText("London")).toBeInTheDocument();
  });

  it("displays placeholders when no data is provided", () => {
    render(<CertificatePreview fullName="" location="" />);

    expect(screen.getByText("[Full Name]")).toBeInTheDocument();
    expect(screen.getByText("[Location]")).toBeInTheDocument();
  });
});
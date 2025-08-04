import React from "react";
import { render, screen } from "@testing-library/react";
import { CertificatePreview } from "./certificate-preview";

describe("CertificatePreview", () => {
  it("renders correctly with provided full name and location", () => {
    const testFullName = "John Doe";
    const testLocation = "Dhaka";
    render(<CertificatePreview fullName={testFullName} location={testLocation} />);

    // Check for full name
    expect(screen.getByText(testFullName)).toBeInTheDocument();

    // Check for parts of the descriptive text, including the location
    expect(screen.getByText(/This certificate acknowledges your outstanding/i)).toBeInTheDocument();
    expect(screen.getByText(/contribution and dedication during the July Student/i)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`Revelation in ${testLocation}. Your perticipation was`, 'i'))).toBeInTheDocument();
    expect(screen.getByText(/essential to its success./i)).toBeInTheDocument();

    // Check for the masked certificate number (it will always have two asterisks at the end)
    expect(screen.getByText(/\d{8}\*\*/)).toBeInTheDocument();
  });

  it("renders correctly with default placeholders", () => {
    render(<CertificatePreview fullName="" location="" />);

    // Check for full name placeholder
    expect(screen.getByText("[Your Name]")).toBeInTheDocument();

    // Check for parts of the descriptive text with placeholder location
    expect(screen.getByText(/This certificate acknowledges your outstanding/i)).toBeInTheDocument();
    expect(screen.getByText(/contribution and dedication during the July Student/i)).toBeInTheDocument();
    expect(screen.getByText(/Revelation in \[Your Town\]. Your perticipation was/i)).toBeInTheDocument();
    expect(screen.getByText(/essential to its success./i)).toBeInTheDocument();

    // Check for the masked certificate number
    expect(screen.getByText(/\d{8}\*\*/)).toBeInTheDocument();
  });
});
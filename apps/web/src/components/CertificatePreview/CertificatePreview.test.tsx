import React from "react";
import { render, screen } from "@testing-library/react";
import { CertificatePreview } from './index';

describe("CertificatePreview", () => {
  it("renders correctly with provided full name and location", () => {
    // Arrange
    const testFullName = "John Doe";
    const testLocation = "Dhaka";

    // Act
    render(<CertificatePreview fullName={testFullName} location={testLocation} userId="TEST_USER_ID" />);

    // Assert
    expect(screen.getByText(testFullName)).toBeInTheDocument();
    expect(screen.getByText(/This certificate acknowledges your outstanding/i)).toBeInTheDocument();
    expect(screen.getByText(/contribution and dedication during the July Student/i)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`Revelation in ${testLocation}. Your perticipation was`, 'i'))).toBeInTheDocument();
    expect(screen.getByText(/essential to its success./i)).toBeInTheDocument();
  });

  it("renders correctly with default placeholders", () => {
    // Arrange & Act
    render(<CertificatePreview fullName="" location="" userId="" />);

    // Assert
    expect(screen.getByText("[Your Name]")).toBeInTheDocument();
    expect(screen.getByText(/This certificate acknowledges your outstanding/i)).toBeInTheDocument();
    expect(screen.getByText(/contribution and dedication during the July Student/i)).toBeInTheDocument();
    expect(screen.getByText(/Revelation in \[Your Town\]. Your perticipation was/i)).toBeInTheDocument();
    expect(screen.getByText(/essential to its success./i)).toBeInTheDocument();
  });
});
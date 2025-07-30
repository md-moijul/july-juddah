// src/app/generate/page.test.tsx

import React from "react";
import { render, screen, fireEvent, waitFor, cleanup } from "@testing-library/react";
import GeneratePage from "../generate/page";
import * as CertificateService from "@/services/certificateService";

jest.mock("@/services/certificateService");

describe("GeneratePage", () => {
  afterEach(() => {
    cleanup();
    // Use restoreAllMocks to ensure spies are fully reset between tests
    jest.restoreAllMocks();
  });

  // No changes to the first two tests...
  it("renders input fields and download button", () => {
    render(<GeneratePage />);
    expect(screen.getByPlaceholderText("Full Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Location")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Download PDF/i })).toBeInTheDocument();
  });

  it("updates CertificatePreview with input values", () => {
    render(<GeneratePage />);
    const fullNameInput = screen.getByPlaceholderText("Full Name");
    const locationInput = screen.getByPlaceholderText("Location");
    fireEvent.change(fullNameInput, { target: { value: "John Doe" } });
    fireEvent.change(locationInput, { target: { value: "New York" } });
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("New York")).toBeInTheDocument();
  });

  it('should show loading indicator and trigger download on success', async () => {
    const mockBlob = new Blob(['test pdf content'], { type: 'application/pdf' });
    jest.spyOn(CertificateService, 'generateCertificatePdf').mockResolvedValue(mockBlob);

    // Mock URL methods
    global.URL.createObjectURL = jest.fn(() => 'blob:http://test/123');
    global.URL.revokeObjectURL = jest.fn();

    // ✅ **THE FIX:** Spy on the anchor element's click method directly
    // This allows the component to create a real element, preventing the 'Node' error,
    // while still letting us check if the click was triggered.
    const mockAnchorClick = jest.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => {});

    render(<GeneratePage />);

    // User actions
    fireEvent.change(screen.getByPlaceholderText('Full Name'), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByPlaceholderText('Location'), { target: { value: 'New York' } });
    fireEvent.click(screen.getByRole('button', { name: /Download PDF/i }));

    await waitFor(() => {
      // Assert that the download link was "clicked"
      expect(mockAnchorClick).toHaveBeenCalled();
    });

    // Final state assertions
    expect(CertificateService.generateCertificatePdf).toHaveBeenCalledWith({
      fullName: 'John Doe',
      location: 'New York',
    });
    expect(global.URL.createObjectURL).toHaveBeenCalledWith(mockBlob);
    expect(screen.getByRole('button', { name: /Download PDF/i })).toHaveTextContent('Download PDF');
  });

  it('should display error message on API failure', async () => {
    // This test should now pass without changes because mocks are properly restored.
    jest.spyOn(CertificateService, 'generateCertificatePdf').mockRejectedValueOnce(new Error('Network Error'));

    render(<GeneratePage />);

    fireEvent.change(screen.getByPlaceholderText('Full Name'), { target: { value: 'Jane Doe' } });
    fireEvent.change(screen.getByPlaceholderText('Location'), { target: { value: 'London' } });
    fireEvent.click(screen.getByRole('button', { name: /Download PDF/i }));

    await waitFor(() => {
      expect(screen.getByText('Network Error')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Download PDF/i })).toHaveTextContent('Download PDF');
    });
  });
});
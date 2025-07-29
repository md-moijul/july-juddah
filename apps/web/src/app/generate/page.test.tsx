import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import GeneratePage from "../generate/page";

describe("GeneratePage", () => {
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
});
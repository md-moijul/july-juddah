// src/app/generate/page.test.tsx

import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import GeneratePage from "./page";

// --- NECESSARY MOCKS ---

jest.mock("@/components/ui/select", () => {
  const districts = ["New York", "Los Angeles", "Chicago"];
  return {
    __esModule: true,
    Select: ({
      onValueChange,
      value,
    }: {
      onValueChange: (value: string) => void;
      value: string;
    }) => (
      <select
        onChange={(e) => onValueChange(e.target.value)}
        value={value}
        data-testid="district-select"
      >
        <option value="" disabled>Select a district</option>
        {districts.map(d => <option key={d} value={d}>{d}</option>)}
      </select>
    ),
  };
});

jest.mock("@/components/OtpVerificationModal", () => {
  return jest.fn(({ isOpen, onClose }) => {
    if (!isOpen) return null;
    return (
      <div data-testid="mock-otp-modal">
        <button onClick={onClose} data-testid="mock-otp-modal-close-button">Close</button>
      </div>
    );
  });
});

jest.mock("@/hooks/useCertificateDownload", () => ({
  useCertificateDownload: () => ({
    downloadCertificate: jest.fn(),
    isLoading: false,
    error: null,
  }),
}));

jest.mock("@/data/districts.json", () => ["New York", "Los Angeles", "Chicago"], { virtual: true });


describe("GeneratePage", () => {
  const user = userEvent.setup({
    advanceTimers: jest.advanceTimersByTime,
  });

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    cleanup();
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it("should render the main heading without crashing", () => {
    render(<GeneratePage />);
    expect(screen.getByRole('heading', { name: /Generate Your Certificate/i })).toBeInTheDocument();
  });

  it("should update the certificate preview when user types in the form", async () => {
    render(<GeneratePage />);
    await user.type(screen.getByLabelText(/What is your name?/i), "Jane Doe");
    await user.selectOptions(screen.getByTestId("district-select"), "New York");
    expect(screen.getByText("Jane Doe")).toBeInTheDocument();
    expect(screen.getByText(/Revelation in New York/i)).toBeInTheDocument();
  });

  it("should show the generated image and download buttons after generation", async () => {
    render(<GeneratePage />);
    await user.type(screen.getByLabelText(/What is your name?/i), "John Doe");
    await user.selectOptions(screen.getByTestId("district-select"), "New York");
    await user.click(screen.getByRole("button", { name: /Generate Certificate/i }));
    jest.runAllTimers();
    expect(await screen.findByAltText("Generated Certificate")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Download E-certificate/i })).toBeInTheDocument();
  });

  it("should open the OTP modal when the download button is clicked", async () => {
    render(<GeneratePage />);
    await user.type(screen.getByLabelText(/What is your name?/i), "John Doe");
    await user.selectOptions(screen.getByTestId("district-select"), "New York");
    await user.click(screen.getByRole("button", { name: /Generate Certificate/i }));
    jest.runAllTimers();

    const downloadButton = await screen.findByRole("button", { name: /Download E-certificate/i });
    await user.click(downloadButton);

    // This is the only assertion needed: it confirms the modal is visible to the user.
    expect(screen.getByTestId("mock-otp-modal")).toBeInTheDocument();
  });

  it("should close the OTP modal when the close action is triggered", async () => {
    render(<GeneratePage />);
    // Setup:
    await user.type(screen.getByLabelText(/What is your name?/i), "John Doe");
    await user.selectOptions(screen.getByTestId("district-select"), "New York");
    await user.click(screen.getByRole("button", { name: /Generate Certificate/i }));
    jest.runAllTimers();
    const downloadButton = await screen.findByRole("button", { name: /Download E-certificate/i });
    await user.click(downloadButton);
    expect(screen.getByTestId("mock-otp-modal")).toBeInTheDocument();

    // Action:
    await user.click(screen.getByTestId("mock-otp-modal-close-button"));

    // This is the only assertion needed: it confirms the modal is gone from the user's view.
    expect(screen.queryByTestId("mock-otp-modal")).not.toBeInTheDocument();
  });
});
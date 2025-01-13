import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import '@testing-library/jest-dom';
import SearchBar from "./SearchBar";

describe("SearchBar Component", () => {
  
  it("renders input and query text", () => {
    render(<SearchBar onEnterPress={() => {}} />);

    expect(screen.getByPlaceholderText("Search for movies...")).toBeInTheDocument();
    expect(screen.getByText("Query:")).toBeInTheDocument();
  });

  it("updates input value as user types", () => {
    render(<SearchBar onEnterPress={() => {}} />);

    const inputElement = screen.getByPlaceholderText("Search for movies...");

    fireEvent.change(inputElement, { target: { value: "Test Query" } });

    expect(inputElement).toHaveValue("Test Query");
  });

  it("calls onEnterPress when Enter is pressed", () => {
    const mockOnEnterPress = vi.fn();

    render(<SearchBar onEnterPress={mockOnEnterPress} />);

    const inputElement = screen.getByPlaceholderText("Search for movies...");

    fireEvent.change(inputElement, { target: { value: "Test text" } });
    fireEvent.keyDown(inputElement, { key: "Enter", code: "Enter" });

    expect(mockOnEnterPress).toHaveBeenCalledWith("Test text");
    expect(mockOnEnterPress).toHaveBeenCalledTimes(1);
  });
});

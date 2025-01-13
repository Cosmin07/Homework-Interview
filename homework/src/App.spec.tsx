import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import App from "./App";


describe("App Component", () => {
    it('Should render component without errors', () => {
        render(<App />)
    });

    it('Should the header title app', () => {
        render(<App />)

        const appTitleText = "Movie Search App"
        const title = screen.getByText(appTitleText);

        expect(title).toBeInTheDocument();
    });

})
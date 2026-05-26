import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { ResourceBar } from "@/components/ResourceBar";

describe("battle flow integration", () => {
  it("renders player resources", () => {
    render(<ResourceBar label="Voluntad" value={20} max={30} tone="gold" />);
    expect(screen.getByText("Voluntad")).toBeInTheDocument();
  });
});

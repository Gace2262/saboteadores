import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { PackCostPreview } from "@/components/economy/PackCostPreview";

describe("pack opening integration", () => {
  it("renders pack costs and probabilities", () => {
    render(<PackCostPreview />);
    expect(screen.getByText("Sobre de Pensamientos Intrusivos")).toBeInTheDocument();
    expect(screen.getAllByText("Simular 100").length).toBeGreaterThan(0);
  });
});

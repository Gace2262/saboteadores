import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { DeckPowerMeter } from "@/components/balance/DeckPowerMeter";

describe("deck builder integration", () => {
  it("renders deck power report", () => {
    render(<DeckPowerMeter />);
    expect(screen.getByText("DeckPowerEvaluator")).toBeInTheDocument();
    expect(screen.getByText("Poder total")).toBeInTheDocument();
  });
});

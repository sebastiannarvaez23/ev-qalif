import { FinalGrade, CutWeights } from "@domain/entities/FinalGrade";

export type NeededThirdResult =
  | { kind: "needed"; value: number }
  | { kind: "alreadyPassed" }
  | { kind: "impossible"; maxReachable: number };

export class CalculateNeededThirdCutUseCase {
  execute(
    first: number,
    second: number,
    weights: CutWeights = FinalGrade.DEFAULT_WEIGHTS
  ): NeededThirdResult {
    if ([first, second].some((v) => Number.isNaN(v) || v < 0 || v > 5)) {
      throw new Error("Cortes 1 y 2 deben estar entre 0.0 y 5.0.");
    }
    const partial = first * weights.first + second * weights.second;
    const needed = (FinalGrade.PASSING_GRADE - partial) / weights.third;

    if (needed <= 0) return { kind: "alreadyPassed" };
    if (needed > 5) {
      const maxReachable = partial + 5 * weights.third;
      return { kind: "impossible", maxReachable };
    }
    return { kind: "needed", value: needed };
  }
}

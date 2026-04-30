import { Grade } from "@domain/entities/Grade";
import { FinalGrade } from "@domain/entities/FinalGrade";

export type NeededResult =
  | { kind: "needed"; value: number }
  | { kind: "alreadyPassed"; accumulated: number }
  | { kind: "impossible"; maxReachable: number }
  | { kind: "noRemaining" };

export class CalculateNeededToPassUseCase {
  execute(grades: Grade[]): NeededResult {
    const accumulated = grades.reduce((s, g) => s + g.weighted(), 0);
    const usedWeight = grades.reduce((s, g) => s + g.weight, 0);
    const remainingWeight = 100 - usedWeight;

    if (remainingWeight <= 0) {
      return { kind: "noRemaining" };
    }

    const needed =
      (FinalGrade.PASSING_GRADE - accumulated) / (remainingWeight / 100);

    if (needed <= 0) {
      return { kind: "alreadyPassed", accumulated };
    }
    if (needed > 5) {
      const maxReachable = accumulated + 5 * (remainingWeight / 100);
      return { kind: "impossible", maxReachable };
    }
    return { kind: "needed", value: needed };
  }
}

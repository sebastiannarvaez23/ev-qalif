import { Grade } from "@domain/entities/Grade";

export class CalculateAccumulatedUseCase {
  execute(grades: Grade[]): number {
    return grades.reduce((sum, g) => sum + g.weighted(), 0);
  }
}

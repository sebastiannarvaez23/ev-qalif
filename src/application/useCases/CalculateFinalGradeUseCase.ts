import { FinalGrade } from "@domain/entities/FinalGrade";

export class CalculateFinalGradeUseCase {
  execute(finalGrade: FinalGrade): number {
    return finalGrade.total();
  }
}

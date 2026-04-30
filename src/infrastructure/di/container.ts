import { INotificationService } from "@domain/ports/INotificationService";
import { SweetAlertNotificationService } from "@infrastructure/services/SweetAlertNotificationService";
import { CalculateAccumulatedUseCase } from "@application/useCases/CalculateAccumulatedUseCase";
import { CalculateNeededToPassUseCase } from "@application/useCases/CalculateNeededToPassUseCase";
import { CalculateFinalGradeUseCase } from "@application/useCases/CalculateFinalGradeUseCase";
import { CalculateNeededThirdCutUseCase } from "@application/useCases/CalculateNeededThirdCutUseCase";

export interface AppContainer {
  notifier: INotificationService;
  calculateAccumulated: CalculateAccumulatedUseCase;
  calculateNeededToPass: CalculateNeededToPassUseCase;
  calculateFinalGrade: CalculateFinalGradeUseCase;
  calculateNeededThirdCut: CalculateNeededThirdCutUseCase;
}

export function createContainer(): AppContainer {
  return {
    notifier: new SweetAlertNotificationService(),
    calculateAccumulated: new CalculateAccumulatedUseCase(),
    calculateNeededToPass: new CalculateNeededToPassUseCase(),
    calculateFinalGrade: new CalculateFinalGradeUseCase(),
    calculateNeededThirdCut: new CalculateNeededThirdCutUseCase(),
  };
}

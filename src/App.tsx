import { useMemo } from "react";
import { createContainer } from "@infrastructure/di/container";
import { ContainerProvider } from "@presentation/context/ContainerContext";
import { CalculatorPage } from "@presentation/pages/CalculatorPage";

export default function App() {
  const container = useMemo(() => createContainer(), []);
  return (
    <ContainerProvider container={container}>
      <CalculatorPage />
    </ContainerProvider>
  );
}

import { createContext, ReactNode, useContext } from "react";
import { AppContainer } from "@infrastructure/di/container";

const ContainerContext = createContext<AppContainer | null>(null);

interface Props {
  container: AppContainer;
  children: ReactNode;
}

export function ContainerProvider({ container, children }: Props) {
  return (
    <ContainerContext.Provider value={container}>
      {children}
    </ContainerContext.Provider>
  );
}

export function useContainer(): AppContainer {
  const ctx = useContext(ContainerContext);
  if (!ctx) {
    throw new Error("useContainer debe usarse dentro de un ContainerProvider.");
  }
  return ctx;
}

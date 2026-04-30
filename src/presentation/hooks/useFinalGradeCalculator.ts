import { useCallback, useState } from "react";
import { FinalGrade } from "@domain/entities/FinalGrade";
import { useContainer } from "@presentation/context/ContainerContext";
import { isCompleteDecimal, toNumber, formatGrade } from "@presentation/utils/decimal";

interface ResultState {
  message: string;
  tone: "neutral" | "success" | "warning";
}

interface CutsState {
  c1: string;
  c2: string;
  c3: string;
}

const EMPTY: CutsState = { c1: "", c2: "", c3: "" };

export function useFinalGradeCalculator() {
  const { calculateFinalGrade, calculateNeededThirdCut, notifier } = useContainer();
  const [cuts, setCuts] = useState<CutsState>(EMPTY);
  const [result, setResult] = useState<ResultState>({ message: "", tone: "neutral" });
  const [touched, setTouched] = useState<Set<keyof CutsState>>(new Set());

  const set = useCallback((key: keyof CutsState, value: string) => {
    setCuts((prev) => ({ ...prev, [key]: value }));
  }, []);

  const requireFields = useCallback(
    async (fields: (keyof CutsState)[]): Promise<number[] | null> => {
      const incomplete = fields.filter((f) => !isCompleteDecimal(cuts[f]));
      if (incomplete.length > 0) {
        setTouched((prev) => new Set([...prev, ...incomplete]));
        await notifier.warn(
          "Diligencia los cortes requeridos completos (usa '.' como separador decimal)."
        );
        return null;
      }
      const values = fields.map((f) => toNumber(cuts[f]));
      if (values.some((v) => v < 0 || v > 5)) {
        await notifier.error("Cada corte debe estar entre 0.0 y 5.0.");
        return null;
      }
      return values;
    },
    [cuts, notifier]
  );

  const computeFinal = useCallback(async () => {
    const values = await requireFields(["c1", "c2", "c3"]);
    if (!values) return;
    try {
      const fg = FinalGrade.create(values[0], values[1], values[2]);
      const total = calculateFinalGrade.execute(fg);
      setResult({
        message: `Nota final: ${formatGrade(total)}`,
        tone: total >= 3 ? "success" : "warning",
      });
    } catch (e) {
      await notifier.error((e as Error).message);
    }
  }, [requireFields, calculateFinalGrade, notifier]);

  const computeNeededThird = useCallback(async () => {
    const values = await requireFields(["c1", "c2"]);
    if (!values) return;
    try {
      const r = calculateNeededThirdCut.execute(values[0], values[1]);
      switch (r.kind) {
        case "needed":
          setResult({
            message: `Necesitas en Corte 3: ${formatGrade(r.value)}`,
            tone: "neutral",
          });
          break;
        case "alreadyPassed":
          setResult({
            message: "Ya pasaste con los dos primeros cortes.",
            tone: "success",
          });
          break;
        case "impossible":
          setResult({
            message: `Imposible alcanzar 3.0 (máximo ${formatGrade(r.maxReachable)}).`,
            tone: "warning",
          });
          break;
      }
    } catch (e) {
      await notifier.error((e as Error).message);
    }
  }, [requireFields, calculateNeededThirdCut, notifier]);

  return {
    cuts,
    result,
    touched,
    set,
    computeFinal,
    computeNeededThird,
  };
}

import { useCallback, useMemo, useState } from "react";
import { Grade } from "@domain/entities/Grade";
import { useContainer } from "@presentation/context/ContainerContext";
import { GradeRowData } from "@presentation/components/GradeRow";
import { isCompleteDecimal, toNumber, formatGrade } from "@presentation/utils/decimal";

const newId = () => Math.random().toString(36).slice(2, 10);

interface ResultState {
  message: string;
  tone: "neutral" | "success" | "warning";
}

export function useGradeCalculator() {
  const { calculateAccumulated, calculateNeededToPass, notifier } = useContainer();
  const [rows, setRows] = useState<GradeRowData[]>([]);
  const [result, setResult] = useState<ResultState>({ message: "", tone: "neutral" });
  const [touchedIds, setTouchedIds] = useState<Set<string>>(new Set());

  const totalWeight = useMemo(
    () => rows.reduce((s, r) => s + (isCompleteDecimal(r.weight) ? toNumber(r.weight) : 0), 0),
    [rows]
  );

  const lastIncomplete = useCallback((): GradeRowData | null => {
    if (rows.length === 0) return null;
    const last = rows[rows.length - 1];
    if (!isCompleteDecimal(last.grade) || !isCompleteDecimal(last.weight)) {
      return last;
    }
    return null;
  }, [rows]);

  const addRow = useCallback(async () => {
    const incomplete = lastIncomplete();
    if (incomplete) {
      setTouchedIds((prev) => new Set(prev).add(incomplete.id));
      await notifier.warn(
        "Diligencia completamente la fila actual antes de añadir otra."
      );
      return;
    }
    if (totalWeight >= 100) {
      await notifier.warn("Ya alcanzaste el 100% del peso total.");
      return;
    }
    setRows((prev) => [...prev, { id: newId(), grade: "", weight: "" }]);
  }, [lastIncomplete, totalWeight, notifier]);

  const removeRow = useCallback((id: string) => {
    setRows((prev) => prev.filter((r) => r.id !== id));
    setTouchedIds((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  }, []);

  const updateGrade = useCallback((id: string, value: string) => {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, grade: value } : r)));
  }, []);

  const updateWeight = useCallback((id: string, value: string) => {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, weight: value } : r)));
  }, []);

  const validateAll = useCallback(async (): Promise<Grade[] | null> => {
    if (rows.length === 0) {
      await notifier.warn("Agrega al menos una calificación.");
      return null;
    }
    const incompleteIds = rows
      .filter((r) => !isCompleteDecimal(r.grade) || !isCompleteDecimal(r.weight))
      .map((r) => r.id);
    if (incompleteIds.length > 0) {
      setTouchedIds((prev) => new Set([...prev, ...incompleteIds]));
      await notifier.warn(
        "Completa todas las calificaciones y porcentajes (usa '.' como separador decimal)."
      );
      return null;
    }
    if (totalWeight > 100) {
      await notifier.error("La suma de los porcentajes no puede superar el 100%.");
      return null;
    }
    try {
      return rows.map((r) => Grade.create(toNumber(r.grade), toNumber(r.weight)));
    } catch (e) {
      await notifier.error((e as Error).message);
      return null;
    }
  }, [rows, totalWeight, notifier]);

  const computeAccumulated = useCallback(async () => {
    const grades = await validateAll();
    if (!grades) return;
    const total = calculateAccumulated.execute(grades);
    setResult({
      message: `Nota acumulada: ${formatGrade(total)}`,
      tone: total >= 3 ? "success" : "neutral",
    });
  }, [validateAll, calculateAccumulated]);

  const computeNeeded = useCallback(async () => {
    const grades = await validateAll();
    if (!grades) return;
    const r = calculateNeededToPass.execute(grades);
    switch (r.kind) {
      case "needed":
        setResult({
          message: `Necesitas ${formatGrade(r.value)} en el porcentaje restante.`,
          tone: "neutral",
        });
        break;
      case "alreadyPassed":
        setResult({
          message: `Ya pasaste con lo acumulado (${formatGrade(r.accumulated)}).`,
          tone: "success",
        });
        break;
      case "impossible":
        setResult({
          message: `No es posible pasar: máximo alcanzable ${formatGrade(r.maxReachable)}.`,
          tone: "warning",
        });
        break;
      case "noRemaining":
        setResult({
          message: "No queda porcentaje disponible para calcular.",
          tone: "warning",
        });
        break;
    }
  }, [validateAll, calculateNeededToPass]);

  return {
    rows,
    result,
    totalWeight,
    touchedIds,
    addRow,
    removeRow,
    updateGrade,
    updateWeight,
    computeAccumulated,
    computeNeeded,
  };
}

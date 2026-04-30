import { AtomLogo } from "@presentation/components/AtomLogo";
import { Button } from "@presentation/components/Button";
import { DecimalInput } from "@presentation/components/DecimalInput";
import { Footer } from "@presentation/components/Footer";
import { GradeRow } from "@presentation/components/GradeRow";
import { ResultBanner } from "@presentation/components/ResultBanner";
import { Section } from "@presentation/components/Section";
import { useFinalGradeCalculator } from "@presentation/hooks/useFinalGradeCalculator";
import { useGradeCalculator } from "@presentation/hooks/useGradeCalculator";
import { isCompleteDecimal } from "@presentation/utils/decimal";

export function CalculatorPage() {
  const cut = useGradeCalculator();
  const fin = useFinalGradeCalculator();

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-header__title">Calculadora de Notas</h1>
        <AtomLogo />
      </header>

      <main className="container">
        <Section title="Calculadora de Notas por Corte">
          <div className="grades">
            {cut.rows.length === 0 && (
              <p className="empty-hint">
                Aún no hay calificaciones. Pulsa "Agregar Calificación" para empezar.
              </p>
            )}
            {cut.rows.map((row) => (
              <GradeRow
                key={row.id}
                data={row}
                onGradeChange={cut.updateGrade}
                onWeightChange={cut.updateWeight}
                onRemove={cut.removeRow}
                invalidGrade={
                  cut.touchedIds.has(row.id) && !isCompleteDecimal(row.grade)
                }
                invalidWeight={
                  cut.touchedIds.has(row.id) && !isCompleteDecimal(row.weight)
                }
              />
            ))}
          </div>

          <div className="weight-summary">
            Peso usado: <strong>{cut.totalWeight.toFixed(2)}%</strong> / 100%
          </div>

          <div className="actions">
            <Button onClick={cut.addRow}>
              <i className="bx bx-plus" /> Agregar Calificación
            </Button>
            <Button variant="secondary" onClick={cut.computeAccumulated}>
              Calcular Nota
            </Button>
            <Button variant="ghost" onClick={cut.computeNeeded}>
              ¿Cuánto necesito para pasar?
            </Button>
          </div>

          <ResultBanner message={cut.result.message} tone={cut.result.tone} />
        </Section>

        <Section title="Nota Final de la Materia">
          <div className="cuts-grid">
            <label className="cut-field">
              <span className="cut-field__label">Corte 1 (30%)</span>
              <DecimalInput
                placeholder="Ej: 4.2"
                value={fin.cuts.c1}
                onValueChange={(v) => fin.set("c1", v)}
                min={0}
                max={5}
                invalid={fin.touched.has("c1") && !isCompleteDecimal(fin.cuts.c1)}
              />
            </label>
            <label className="cut-field">
              <span className="cut-field__label">Corte 2 (30%)</span>
              <DecimalInput
                placeholder="Ej: 3.8"
                value={fin.cuts.c2}
                onValueChange={(v) => fin.set("c2", v)}
                min={0}
                max={5}
                invalid={fin.touched.has("c2") && !isCompleteDecimal(fin.cuts.c2)}
              />
            </label>
            <label className="cut-field">
              <span className="cut-field__label">Corte 3 (40%)</span>
              <DecimalInput
                placeholder="Ej: 4.0"
                value={fin.cuts.c3}
                onValueChange={(v) => fin.set("c3", v)}
                min={0}
                max={5}
                invalid={fin.touched.has("c3") && !isCompleteDecimal(fin.cuts.c3)}
              />
            </label>
          </div>

          <div className="actions">
            <Button onClick={fin.computeFinal}>Calcular Nota Final</Button>
            <Button variant="secondary" onClick={fin.computeNeededThird}>
              ¿Qué necesito en Corte 3?
            </Button>
          </div>

          <ResultBanner message={fin.result.message} tone={fin.result.tone} />
        </Section>
      </main>

      <Footer />
    </div>
  );
}

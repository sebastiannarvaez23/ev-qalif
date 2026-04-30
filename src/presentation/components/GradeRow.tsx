import { DecimalInput } from "./DecimalInput";

export interface GradeRowData {
  id: string;
  grade: string;
  weight: string;
}

interface Props {
  data: GradeRowData;
  onGradeChange: (id: string, value: string) => void;
  onWeightChange: (id: string, value: string) => void;
  onRemove: (id: string) => void;
  invalidGrade?: boolean;
  invalidWeight?: boolean;
}

export function GradeRow({
  data,
  onGradeChange,
  onWeightChange,
  onRemove,
  invalidGrade,
  invalidWeight,
}: Props) {
  return (
    <div className="row">
      <div className="row__inputs">
        <DecimalInput
          placeholder="Nota (0.0 - 5.0)"
          value={data.grade}
          onValueChange={(v) => onGradeChange(data.id, v)}
          min={0}
          max={5}
          invalid={invalidGrade}
          aria-label="Nota"
        />
        <DecimalInput
          placeholder="%"
          value={data.weight}
          onValueChange={(v) => onWeightChange(data.id, v)}
          min={0}
          max={100}
          invalid={invalidWeight}
          aria-label="Porcentaje"
        />
      </div>
      <button
        type="button"
        className="delete-btn"
        onClick={() => onRemove(data.id)}
        aria-label="Eliminar fila"
      >
        <i className="bx bx-trash" />
      </button>
    </div>
  );
}

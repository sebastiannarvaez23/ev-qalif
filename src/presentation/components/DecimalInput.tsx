import { ChangeEvent, FocusEvent, forwardRef, InputHTMLAttributes } from "react";
import { sanitizeDecimal } from "@presentation/utils/decimal";

type BaseProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "value" | "onChange" | "type"
>;

export interface DecimalInputProps extends BaseProps {
  value: string;
  onValueChange: (value: string) => void;
  min?: number;
  max?: number;
  invalid?: boolean;
}

export const DecimalInput = forwardRef<HTMLInputElement, DecimalInputProps>(
  function DecimalInput(
    { value, onValueChange, min, max, invalid, onBlur, ...rest },
    ref
  ) {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      const cleaned = sanitizeDecimal(e.target.value);
      onValueChange(cleaned);
    };

    const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
      let v = sanitizeDecimal(e.target.value);
      if (v.endsWith(".")) v = v.slice(0, -1);
      if (v !== "") {
        const num = Number(v);
        if (!Number.isNaN(num)) {
          if (typeof min === "number" && num < min) v = String(min);
          if (typeof max === "number" && num > max) v = String(max);
        }
      }
      if (v !== value) onValueChange(v);
      onBlur?.(e);
    };

    return (
      <input
        {...rest}
        ref={ref}
        type="text"
        inputMode="decimal"
        autoComplete="off"
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        aria-invalid={invalid || undefined}
        className={`decimal-input${invalid ? " decimal-input--invalid" : ""}${
          rest.className ? ` ${rest.className}` : ""
        }`}
      />
    );
  }
);

export class Grade {
  public readonly value: number;
  public readonly weight: number;

  private constructor(value: number, weight: number) {
    this.value = value;
    this.weight = weight;
  }

  static create(value: number, weight: number): Grade {
    if (Number.isNaN(value) || Number.isNaN(weight)) {
      throw new Error("La nota y el porcentaje deben ser numéricos.");
    }
    if (value < 0 || value > 5) {
      throw new Error("La nota debe estar entre 0.0 y 5.0.");
    }
    if (weight <= 0 || weight > 100) {
      throw new Error("El porcentaje debe estar entre 0 y 100.");
    }
    return new Grade(value, weight);
  }

  weighted(): number {
    return this.value * (this.weight / 100);
  }
}

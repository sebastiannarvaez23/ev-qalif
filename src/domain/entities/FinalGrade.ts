export type CutWeights = Readonly<{
  first: number;
  second: number;
  third: number;
}>;

export class FinalGrade {
  static readonly DEFAULT_WEIGHTS: CutWeights = Object.freeze({
    first: 0.3,
    second: 0.3,
    third: 0.4,
  });

  static readonly PASSING_GRADE = 3.0;

  public readonly first: number;
  public readonly second: number;
  public readonly third: number;
  public readonly weights: CutWeights;

  private constructor(
    first: number,
    second: number,
    third: number,
    weights: CutWeights
  ) {
    this.first = first;
    this.second = second;
    this.third = third;
    this.weights = weights;
  }

  static create(
    first: number,
    second: number,
    third: number,
    weights: CutWeights = FinalGrade.DEFAULT_WEIGHTS
  ): FinalGrade {
    [first, second, third].forEach((g) => {
      if (Number.isNaN(g)) {
        throw new Error("Todos los cortes deben ser numéricos.");
      }
      if (g < 0 || g > 5) {
        throw new Error("Cada corte debe estar entre 0.0 y 5.0.");
      }
    });
    return new FinalGrade(first, second, third, weights);
  }

  total(): number {
    return (
      this.first * this.weights.first +
      this.second * this.weights.second +
      this.third * this.weights.third
    );
  }
}

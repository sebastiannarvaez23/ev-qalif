interface Props {
  message: string;
  tone?: "neutral" | "success" | "warning";
}

export function ResultBanner({ message, tone = "neutral" }: Props) {
  if (!message) return null;
  return <div className={`result result--${tone}`}>{message}</div>;
}

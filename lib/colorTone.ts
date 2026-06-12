type Tone = {
  ink: string;
  ring: string;
  text: string;
  badge: string;
  bar: string;
};

export const tone = (score: number): Tone => {
  if (score >= 80)
    return {
      ink: "var(--color-paper-success)",
      ring: "text-[color:var(--color-paper-success)]",
      text: "text-[color:var(--color-paper-success)]",
      badge:
        "border-[color:var(--color-paper-success)] text-[color:var(--color-paper-success)]",
      bar: "bg-[color:var(--color-paper-success)]",
    };
  if (score >= 60)
    return {
      ink: "var(--color-paper-secondary)",
      ring: "text-[color:var(--color-paper-secondary)]",
      text: "text-[color:var(--color-paper-secondary)]",
      badge:
        "border-[color:var(--color-paper-secondary)] text-[color:var(--color-paper-secondary)]",
      bar: "bg-[color:var(--color-paper-secondary)]",
    };
  if (score >= 40)
    return {
      ink: "var(--color-paper-warning)",
      ring: "text-[color:var(--color-paper-warning)]",
      text: "text-[color:var(--color-paper-warning)]",
      badge:
        "border-[color:var(--color-paper-warning)] text-[color:var(--color-paper-warning)]",
      bar: "bg-[color:var(--color-paper-warning)]",
    };
  return {
    ink: "var(--color-paper-danger)",
    ring: "text-[color:var(--color-paper-danger)]",
    text: "text-[color:var(--color-paper-danger)]",
    badge:
      "border-[color:var(--color-paper-danger)] text-[color:var(--color-paper-danger)]",
    bar: "bg-[color:var(--color-paper-danger)]",
  };
};
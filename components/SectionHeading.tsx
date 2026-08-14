export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  light = false,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <div className={`eyebrow ${align === "center" ? "justify-center before:hidden" : ""}`}>
        {eyebrow}
      </div>
      <h2
        className={`mt-3 font-display text-4xl font-700 uppercase leading-[1.05] tracking-tight sm:text-5xl ${
          light ? "text-white" : "text-navy-900"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p className={`mt-4 text-base leading-relaxed ${light ? "text-white/70" : "text-steel-600"}`}>
          {description}
        </p>
      )}
    </div>
  );
}

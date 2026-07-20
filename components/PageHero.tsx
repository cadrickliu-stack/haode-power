import Image from "next/image";

export default function PageHero({
  eyebrow,
  title,
  description,
  image,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  image: string;
}) {
  return (
    <section className="angle-cut-bottom relative overflow-hidden bg-navy-900 pb-16 pt-32 lg:pb-24 lg:pt-40">
      <div className="absolute inset-0">
        <Image src={image} alt="" fill priority className="object-cover opacity-25" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-900/90 to-navy-900/60" />
      </div>
      <div className="container-wide relative z-10">
        <div className="eyebrow before:bg-orange-500">{eyebrow}</div>
        <h1 className="mt-4 max-w-3xl font-display text-5xl font-800 uppercase leading-[0.98] tracking-tight text-white sm:text-6xl">
          {title}
        </h1>
        {description && (
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/70">{description}</p>
        )}
      </div>
    </section>
  );
}

import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] flex-col items-center justify-center bg-navy-900 px-6 text-center text-white">
      <div className="font-mono text-sm uppercase tracking-[0.3em] text-orange-400">Error 404</div>
      <h1 className="mt-4 font-display text-6xl font-800 uppercase tracking-tight sm:text-7xl">
        Page Not Found
      </h1>
      <p className="mt-4 max-w-md text-white/70">
        The page you&apos;re looking for has been moved or doesn&apos;t exist.
        Let&apos;s get you back to reliable power solutions.
      </p>
      <div className="mt-10 flex flex-wrap justify-center gap-4">
        <Link href="/" className="btn-primary">
          Back to Home
        </Link>
        <Link href="/products" className="btn-secondary">
          View Products
        </Link>
      </div>
    </section>
  );
}

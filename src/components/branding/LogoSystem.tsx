import { brandingAssets } from "@/data/brandingAssets";

export function LogoSystem() {
  return (
    <section className="rounded-lg border border-white/10 bg-black/45 p-5 text-white">
      <h2 className="text-3xl font-black uppercase">Sistema de logo</h2>
      <div className="mt-5 grid gap-4 md:grid-cols-5">
        {brandingAssets.logoVariants.map((variant) => (
          <article key={variant.id} className="rounded-lg border border-amber-100/15 bg-white/5 p-4">
            <div className="grid h-28 place-items-center rounded-md border border-amber-100/15 bg-black/55">
              <span className="text-center text-xl font-black uppercase text-amber-100">{variant.id === "icon" ? "OJO" : "SM"}</span>
            </div>
            <h3 className="mt-3 font-black">{variant.name}</h3>
            <p className="mt-1 text-xs text-amber-100/70">{variant.use}</p>
            <p className="mt-2 text-sm text-white/60">{variant.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

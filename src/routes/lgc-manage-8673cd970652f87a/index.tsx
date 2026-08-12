import { createFileRoute, Link } from "@tanstack/react-router";
import { useAdminSession } from "../../lib/admin-auth";
import { loadResolvedResidences, type ResolvedResidence } from "../../lib/residence-content";

export const Route = createFileRoute("/lgc-manage-8673cd970652f87a/")({
  head: () => ({
    meta: [{ title: "Verwaltung" }, { name: "robots", content: "noindex, nofollow" }],
  }),
  loader: () => loadResolvedResidences(),
  component: AdminIndex,
});

function AdminIndex() {
  const residences = Route.useLoaderData() as ResolvedResidence[];
  const { status, error } = useAdminSession();

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="text-2xl font-semibold">Wohnungsverwaltung</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Namen, Beschreibungen und Fotos der vier Residenzen bearbeiten.
      </p>

      {status === "loading" && (
        <p className="mt-6 text-sm text-muted-foreground">Anmeldung läuft…</p>
      )}
      {status === "error" && (
        <p className="mt-6 text-sm text-red-600">Anmeldefehler: {error}</p>
      )}

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {residences.map((r) => (
          <Link
            key={r.slug}
            to="/lgc-manage-8673cd970652f87a/$slug"
            params={{ slug: r.slug }}
            className="group block overflow-hidden rounded-lg border border-border"
          >
            <img
              src={r.resolvedGallery[0]}
              alt={r.name.de}
              className="h-44 w-full object-cover"
            />
            <div className="p-4">
              <p className="font-medium">{r.name.de}</p>
              <p className="text-sm text-muted-foreground">{r.name.en}</p>
              <p className="mt-2 text-xs text-muted-foreground">
                {r.resolvedGallery.length} Fotos
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

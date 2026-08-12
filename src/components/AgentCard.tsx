import { useSiteSettings } from "../lib/site-settings";
import { useI18n } from "../i18n";

export function AgentCard() {
  const { agentName, agentEmail, agentPhotoUrl } = useSiteSettings();
  const { lang } = useI18n();

  if (!agentName && !agentEmail) return null;

  const initials = agentName
    ? agentName
        .split(" ")
        .map((p) => p[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "";

  return (
    <div className="flex items-center gap-5 rounded-lg border border-border bg-card p-6">
      {agentPhotoUrl ? (
        <img
          src={agentPhotoUrl}
          alt={agentName ?? ""}
          width={80}
          height={80}
          className="h-20 w-20 shrink-0 rounded-full object-cover"
        />
      ) : (
        <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-muted text-lg font-medium text-muted-foreground">
          {initials}
        </div>
      )}
      <div className="min-w-0">
        <p className="eyebrow text-accent">
          {lang === "de" ? "Ihr Ansprechpartner" : "Your contact"}
        </p>
        {agentName && <p className="mt-1.5 text-lg font-medium">{agentName}</p>}
        {agentEmail && (
          <a
            href={`mailto:${agentEmail}`}
            className="link-underline mt-1 inline-block text-sm text-muted-foreground"
          >
            {agentEmail}
          </a>
        )}
      </div>
    </div>
  );
}

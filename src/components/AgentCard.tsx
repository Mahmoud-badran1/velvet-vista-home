import { useI18n } from "../i18n";
import type { Agent } from "../lib/agents";

function initialsFor(name: string): string {
  return name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function SingleAgent({ agent }: { agent: Agent }) {
  return (
    <div className="flex items-center gap-5 rounded-lg border border-border bg-card p-6">
      {agent.photoUrl ? (
        <img
          src={agent.photoUrl}
          alt={agent.name}
          width={80}
          height={80}
          className="h-20 w-20 shrink-0 rounded-full object-cover"
        />
      ) : (
        <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-muted text-lg font-medium text-muted-foreground">
          {initialsFor(agent.name)}
        </div>
      )}
      <div className="min-w-0">
        <p className="mt-1.5 text-lg font-medium">{agent.name}</p>
        {agent.email && (
          <a
            href={`mailto:${agent.email}`}
            className="link-underline mt-1 inline-block text-sm text-muted-foreground"
          >
            {agent.email}
          </a>
        )}
      </div>
    </div>
  );
}

export function AgentCard({ agents }: { agents: Agent[] }) {
  const { lang } = useI18n();

  if (agents.length === 0) return null;

  return (
    <div>
      <p className="eyebrow text-accent">
        {lang === "de"
          ? agents.length > 1
            ? "Ihre Ansprechpartner"
            : "Ihr Ansprechpartner"
          : agents.length > 1
            ? "Your contacts"
            : "Your contact"}
      </p>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {agents.map((agent) => (
          <SingleAgent key={agent.id} agent={agent} />
        ))}
      </div>
    </div>
  );
}

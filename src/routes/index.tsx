import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Check,
  CircleDot,
  Copy,
  Eye,
  Gauge,
  ShieldCheck,
  Waves,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// No head() here: the home route inherits title/description/og/twitter from
// __root.tsx, and ships no og:image so serve-time hosting can inject the
// project's social preview (explicit og:image or latest screenshot).
export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Umbrella Capital | On-Chain Treasury" },
      {
        name: "description",
        content: "Explore Umbrella Capital, an on-chain treasury for ETH and tokenized equities on Robinhood Chain.",
      },
      { property: "og:title", content: "Umbrella Capital | On-Chain Treasury" },
      { property: "og:description", content: "An on-chain treasury for ETH, tokenized equities, and strategic capital allocation." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

// Configuration: set this to the deployed meme coin contract address when available.
// When null, the contract field shows an empty state and the copy/explorer controls are disabled.
const CONTRACT_ADDRESS: string | null = null;

// Robinhood Chain explorer base URL; the contract link is built automatically from CONTRACT_ADDRESS.
const ROBINHOOD_CHAIN_EXPLORER_URL = "https://explorer.robinhoodchain.com";

const allocations = [
  { symbol: "ETH", name: "Ethereum", allocation: 34, value: "$4,229,408", trend: "+2.8%", up: true },
  { symbol: "NVDA", name: "NVIDIA Token", allocation: 22, value: "$2,736,676", trend: "+1.4%", up: true },
  { symbol: "TSLA", name: "Tesla Token", allocation: 17, value: "$2,114,704", trend: "−0.6%", up: false },
  { symbol: "AAPL", name: "Apple Token", allocation: 14, value: "$1,741,521", trend: "+0.9%", up: true },
  { symbol: "RSV", name: "Stable Reserve", allocation: 13, value: "$1,617,126", trend: "0.0%", up: true },
];

function UmbrellaMark({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-3" aria-label="Umbrella Capital">
      <svg
        className={`${compact ? "h-8 w-8" : "h-12 w-12"} overflow-visible`}
        viewBox="3.5 3.5 41 41"
        preserveAspectRatio="xMidYMid meet"
        fill="none"
        aria-hidden="true"
      >
        {/* 8 curved wedges meeting at one central point; emerald at top/right/bottom/left, white on the diagonals */}
        <g stroke="#000" strokeWidth="0.9" strokeLinejoin="round">
          <path d="M24 24 L42.48 16.35 Q36.44 11.56 31.65 5.52 Z" fill="#fff"/>
          <path d="M24 24 L31.65 5.52 Q24 6.4 16.35 5.52 Z" fill="currentColor" className="text-primary"/>
          <path d="M24 24 L16.35 5.52 Q11.56 11.56 5.52 16.35 Z" fill="#fff"/>
          <path d="M24 24 L5.52 16.35 Q6.4 24 5.52 31.65 Z" fill="currentColor" className="text-primary"/>
          <path d="M24 24 L5.52 31.65 Q11.56 36.44 16.35 42.48 Z" fill="#fff"/>
          <path d="M24 24 L16.35 42.48 Q24 41.6 31.65 42.48 Z" fill="currentColor" className="text-primary"/>
          <path d="M24 24 L31.65 42.48 Q36.44 36.44 42.48 31.65 Z" fill="#fff"/>
          <path d="M24 24 L42.48 31.65 Q41.6 24 42.48 16.35 Z" fill="currentColor" className="text-primary"/>
        </g>
      </svg>
      <div className="leading-none">
        <span className={`${compact ? "text-sm" : "text-lg"} block font-semibold uppercase tracking-[0.16em] text-foreground`}>Umbrella</span>
        <span className="mt-1 block font-mono text-[10px] uppercase tracking-[0.28em] text-primary">Capital</span>
      </div>
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <div className="mb-5 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-primary"><span className="h-px w-8 bg-primary" />{children}</div>;
}

function shortenAddress(address: string) {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

function ContractAddress() {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    if (!CONTRACT_ADDRESS) return;
    navigator.clipboard.writeText(CONTRACT_ADDRESS);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1.5 backdrop-blur-sm">
      <button
        type="button"
        onClick={handleCopy}
        disabled={!CONTRACT_ADDRESS}
        aria-label={CONTRACT_ADDRESS ? "Copy contract address" : "Contract address coming soon"}
        className="grid h-6 w-6 place-items-center rounded-full border border-border bg-background text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
      >
        {copied ? <Check className="h-3 w-3 text-primary" /> : <Copy className="h-3 w-3" />}
      </button>
      <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
        {CONTRACT_ADDRESS ? (
          <>
            CA{" "}
            <a
              href={`${ROBINHOOD_CHAIN_EXPLORER_URL}/address/${CONTRACT_ADDRESS}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary transition-colors hover:text-primary/80"
            >
              {shortenAddress(CONTRACT_ADDRESS)}
            </a>
          </>
        ) : (
          "CA: Coming soon"
        )}
      </span>
    </div>
  );
}

function Index() {
  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
          <a href="#top" aria-label="Umbrella Capital home"><UmbrellaMark compact /></a>
          <nav className="hidden items-center gap-8 text-xs font-medium text-muted-foreground md:flex">
            <a className="transition-colors hover:text-primary" href="#treasury">Treasury</a>
            <a className="transition-colors hover:text-primary" href="#allocations">Allocations</a>
            <a className="transition-colors hover:text-primary" href="#how">How It Works</a>
            <a className="transition-colors hover:text-primary" href="#community">Community</a>
          </nav>
          <Badge variant="outline" className="border-primary/30 bg-primary/5 py-2 font-mono text-[10px] uppercase tracking-wider text-primary">
            <span className="mr-2 h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />Robinhood Chain
          </Badge>
        </div>
      </header>

      <section id="top" className="relative flex min-h-[92vh] items-center border-b border-border pt-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_38%,var(--primary-glow),transparent_38%)]" />
        <div className="relative mx-auto w-full max-w-7xl px-5 py-20 lg:px-8">
          <div className="mx-auto max-w-5xl text-center">
            <div className="mb-10 inline-flex animate-drift"><UmbrellaMark /></div>
            <Badge variant="outline" className="mb-5 border-border bg-card/60 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Powered by Robinhood Chain</Badge>
            <div className="mb-8">
              <ContractAddress />
            </div>
            <h1 className="text-balance text-5xl font-semibold leading-[1.02] tracking-normal sm:text-7xl lg:text-[96px]">When it rains, <span className="text-primary">we allocate.</span></h1>
            <p className="mx-auto mt-7 max-w-2xl text-balance text-base leading-7 text-muted-foreground sm:text-lg">An on-chain treasury for ETH, tokenized equities, and strategic capital allocation on Robinhood Chain.</p>
            <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
              <Button asChild variant="capital" size="lg" className="h-12 px-6"><a href="#treasury">Explore the Treasury <ArrowDownRight /></a></Button>
              <Button asChild variant="terminal" size="lg" className="h-12 px-6"><a href="#allocations">View Allocations <ArrowRight /></a></Button>
            </div>
          </div>
          <div className="mt-20 flex items-center gap-4 font-mono text-[10px] uppercase tracking-widest text-muted-foreground"><span>Capital desk / Live view</span><span className="h-px flex-1 bg-border"/><span>UTC · 24H</span></div>
        </div>
      </section>

      <section id="treasury" className="border-b border-border py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><SectionLabel>Treasury overview</SectionLabel><h2 className="text-3xl font-semibold sm:text-5xl">Capital under observation.</h2></div><Badge className="w-fit bg-primary/10 font-mono text-[10px] uppercase tracking-widest text-primary shadow-none hover:bg-primary/10">Demo Data</Badge></div>
          <div className="capital-panel overflow-hidden rounded-lg">
            <div className="grid lg:grid-cols-[1.35fr_.65fr]">
              <div className="border-b border-border p-6 sm:p-10 lg:border-b-0 lg:border-r">
                <div className="flex items-center justify-between"><span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Total Treasury Value</span><CircleDot className="h-4 w-4 text-primary" /></div>
                <div className="mt-5 text-4xl font-semibold tabular-nums sm:text-6xl">$12,439,435</div>
                <div className="mt-3 flex items-center gap-2 font-mono text-xs text-primary"><ArrowUpRight className="h-3.5 w-3.5" /> 1.84% <span className="text-muted-foreground">24H simulated movement</span></div>
                <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-md bg-border sm:grid-cols-4">
                  {[['ETH Allocation','$4.23M'],['Equity Tokens','$6.59M'],['Stable Reserve','$1.62M'],['Trade Fees','$184.2K']].map(([label,value]) => <div key={label} className="bg-card p-4 sm:p-5"><div className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground">{label}</div><div className="mt-2 text-lg font-medium tabular-nums">{value}</div></div>)}
                </div>
                <div className="mt-8"><div className="mb-3 flex justify-between font-mono text-[10px] uppercase tracking-wider"><span className="text-muted-foreground">Treasury Coverage</span><span className="text-primary">78 / 100</span></div><div className="h-2 overflow-hidden rounded-sm bg-muted"><div className="h-full w-[78%] animate-pulse-bar bg-primary" /></div><p className="mt-3 max-w-lg text-xs leading-5 text-muted-foreground">Fees and stable reserves currently support a strong canopy across modeled market conditions.</p></div>
              </div>
              <div className="flex flex-col items-center justify-center p-8 sm:p-10">
                <div className="relative grid aspect-square w-full max-w-[260px] place-items-center rounded-full allocation-ring shadow-[0_0_60px_var(--primary-glow)]"><div className="grid h-[68%] w-[68%] place-items-center rounded-full bg-card text-center"><div><ShieldCheck className="mx-auto h-6 w-6 text-primary"/><div className="mt-2 font-mono text-[9px] uppercase tracking-wider text-muted-foreground">Canopy Strength</div><div className="mt-1 text-3xl font-semibold">78%</div></div></div></div>
                <div className="mt-8 grid w-full grid-cols-2 gap-x-6 gap-y-3">{allocations.map((item, i) => <div className="flex items-center justify-between font-mono text-[10px]" key={item.symbol}><span className="flex items-center gap-2 text-muted-foreground"><span className={`h-1.5 w-1.5 rounded-full ${i === 0 ? 'bg-primary' : i === 1 ? 'bg-chart-3' : i === 2 ? 'bg-chart-4' : i === 3 ? 'bg-chart-5' : 'bg-terminal-muted'}`} />{item.symbol}</span><span>{item.allocation}%</span></div>)}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-card/40 py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:items-end"><div><SectionLabel>Market conditions</SectionLabel><h2 className="text-3xl font-semibold sm:text-5xl">The Desk Is Watching</h2><p className="mt-5 max-w-md text-lg leading-8 text-muted-foreground">When the market rains, the desk stays deliberate.</p></div>
            <div className="capital-panel divide-y divide-border rounded-lg">{[
              ['Volatility','Elevated','72%'],['Meme Activity','Active','64%'],['Market Sentiment','Cautious','41%'],['ETH Momentum','Constructive','68%'],['Equity Token Flow','Balanced','55%']
            ].map(([name,state,width]) => <div key={name} className="grid grid-cols-[1fr_auto] items-center gap-6 px-5 py-4 sm:grid-cols-[180px_1fr_auto]"><span className="text-sm">{name}</span><div className="hidden h-1 overflow-hidden bg-muted sm:block"><div className="h-full bg-primary/70" style={{width}} /></div><span className="font-mono text-[10px] uppercase tracking-wider text-primary">{state}</span></div>)}</div>
          </div>
        </div>
      </section>

      <section id="how" className="border-b border-border py-24 lg:py-32"><div className="mx-auto max-w-7xl px-5 lg:px-8"><SectionLabel>Operating structure</SectionLabel><h2 className="max-w-xl text-3xl font-semibold sm:text-5xl">How the umbrella works.</h2><div className="mt-14 grid gap-px overflow-hidden rounded-lg bg-border md:grid-cols-3">{[
        ['01','Fees Fill the Canopy','Trading activity contributes fees to the community treasury.'],['02','The Desk Allocates','Capital can be distributed across ETH, tokenized equities, and reserves according to market conditions.'],['03','The Community Sees the Structure','Transparent treasury data gives the community a clear view of what sits under the umbrella.']
      ].map(([n,title,copy]) => <article key={n} className="group bg-card p-7 transition-colors hover:bg-surface-raised sm:p-9"><div className="flex items-center justify-between font-mono text-xs text-primary"><span>STEP {n}</span><ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></div><h3 className="mt-14 text-xl font-semibold">{title}</h3><p className="mt-4 text-sm leading-6 text-muted-foreground">{copy}</p></article>)}</div></div></section>

      <section id="allocations" className="border-b border-border py-24 lg:py-32"><div className="mx-auto max-w-7xl px-5 lg:px-8"><div className="mb-12 flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><SectionLabel>Allocation book</SectionLabel><h2 className="text-3xl font-semibold sm:text-5xl">Under the umbrella.</h2></div><span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Illustrative values · Demo Data</span></div><div className="grid gap-3 md:grid-cols-2 lg:grid-cols-5">{allocations.map((asset) => <article key={asset.symbol} className="capital-panel group rounded-lg p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/50"><div className="flex items-start justify-between"><div className="grid h-10 w-10 place-items-center rounded-sm bg-secondary font-mono text-xs text-primary">{asset.symbol}</div>{asset.up ? <ArrowUpRight className="h-4 w-4 text-primary"/> : <ArrowDownRight className="h-4 w-4 text-destructive"/>}</div><div className="mt-10 text-xs text-muted-foreground">{asset.name}</div><div className="mt-2 text-2xl font-semibold">{asset.allocation}%</div><div className="mt-5 border-t border-border pt-4"><div className="font-mono text-[10px] text-muted-foreground">{asset.value}</div><div className={asset.up ? "mt-2 font-mono text-[10px] text-primary" : "mt-2 font-mono text-[10px] text-destructive"}>{asset.trend}</div></div><div className="mt-6 font-mono text-[8px] uppercase tracking-[0.16em] text-terminal-muted">Under the Umbrella</div></article>)}</div></div></section>

      <section id="contract" className="border-b border-border py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionLabel>Token contract</SectionLabel>
          <h2 className="text-3xl font-semibold sm:text-5xl">Meme Coin Contract</h2>
          <div className="mt-10 max-w-3xl capital-panel rounded-lg p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <Button
                variant="terminal"
                size="icon"
                className="h-11 w-11 shrink-0"
                disabled={!CONTRACT_ADDRESS}
                aria-label="Copy contract address"
                onClick={() => {
                  if (CONTRACT_ADDRESS) {
                    navigator.clipboard.writeText(CONTRACT_ADDRESS);
                  }
                }}
              >
                <Copy className="h-4 w-4" />
              </Button>
              <div className="flex min-w-0 flex-1 items-center rounded-md border border-border bg-background/50 px-4 py-3 font-mono text-sm">
                {CONTRACT_ADDRESS ? (
                  <span className="truncate text-primary">{CONTRACT_ADDRESS}</span>
                ) : (
                  <span className="text-muted-foreground">Contract address coming soon</span>
                )}
              </div>
            </div>
            {CONTRACT_ADDRESS && (
              <a
                href={`${ROBINHOOD_CHAIN_EXPLORER_URL}/address/${CONTRACT_ADDRESS}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-1.5 text-sm text-primary transition-colors hover:text-primary/80"
              >
                View on Robinhood Chain explorer <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            )}
          </div>
        </div>
      </section>

      <section className="border-b border-border py-24 lg:py-36"><div className="mx-auto grid max-w-7xl gap-14 px-5 lg:grid-cols-[.55fr_1fr] lg:px-8"><div><SectionLabel>Manifesto</SectionLabel><BarChart3 className="h-16 w-16 text-primary/30" /></div><blockquote className="max-w-3xl text-2xl font-medium leading-[1.55] sm:text-4xl"><p>Markets change. Narratives rotate. Volatility arrives without warning.</p><p className="mt-8 text-muted-foreground">Umbrella Capital is built around a simple idea: capital should have structure when conditions become uncertain.</p><p className="mt-8 text-primary">One canopy. Multiple assets. A desk that allocates instead of panicking.</p></blockquote></div></section>

      <section id="community" className="py-24 lg:py-32"><div className="mx-auto max-w-7xl px-5 lg:px-8"><div className="relative overflow-hidden rounded-lg border border-primary/30 bg-accent/40 p-7 sm:p-12 lg:p-16"><div className="scanline absolute inset-x-0 top-0 h-px"/><div className="grid gap-12 lg:grid-cols-2 lg:items-end"><div><SectionLabel>Community treasury</SectionLabel><h2 className="max-w-lg text-4xl font-semibold sm:text-6xl">Capital under one canopy.</h2></div><div className="grid gap-4 sm:grid-cols-2">{['Transparent allocations','On-chain treasury visibility','Community-focused structure','ETH and tokenized equity exposure','Dynamic allocation narrative'].map((item) => <div key={item} className="flex items-center gap-3 text-sm"><span className="grid h-5 w-5 shrink-0 place-items-center rounded-full border border-primary/40"><Check className="h-3 w-3 text-primary"/></span>{item}</div>)}</div></div></div></div></section>

      <footer className="border-t border-border bg-card/50"><div className="mx-auto max-w-7xl px-5 py-12 lg:px-8"><div className="flex flex-col justify-between gap-8 border-b border-border pb-10 md:flex-row md:items-center"><UmbrellaMark compact/><div className="flex flex-wrap gap-x-6 gap-y-3 text-xs text-muted-foreground"><a href="#treasury" className="hover:text-primary">Treasury</a><a href="#allocations" className="hover:text-primary">Allocations</a><a href="#how" className="hover:text-primary">How It Works</a><a href="#contract" className="hover:text-primary">Contract</a><a href="#community" className="hover:text-primary">Community</a><span className="text-border">/</span><a href="#" aria-label="X social placeholder" className="hover:text-primary">X</a><a href="#" aria-label="Discord social placeholder" className="hover:text-primary">Discord</a></div><Badge variant="outline" className="w-fit border-primary/30 font-mono text-[9px] uppercase text-primary">Robinhood Chain</Badge></div><div className="mt-8 flex flex-col gap-5 md:flex-row md:justify-between"><p className="max-w-4xl text-[10px] leading-5 text-muted-foreground">Umbrella Capital is an experimental on-chain treasury concept. Digital assets and tokenized assets involve significant risk, including loss of value. Nothing on this website is financial advice, a guarantee of returns, or an offer to buy or sell securities. Treasury data shown in demo mode is illustrative only.</p><span className="shrink-0 font-mono text-[9px] uppercase tracking-widest text-muted-foreground">© 2026 Umbrella Capital</span></div></div></footer>
    </main>
  );
}

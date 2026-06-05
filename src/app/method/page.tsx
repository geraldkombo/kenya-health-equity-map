import SourcesPanel from "@/components/SourcesPanel";

export default function MethodPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <h1 className="text-xl font-semibold tracking-tight text-neutral-900">Methodology</h1>
      <p className="mt-1 text-sm text-neutral-500">
        How the Priority Gap Score (PGS) works, what it measures, and its limitations.
      </p>

      <div className="mt-8 space-y-8">
        <section className="rounded-xl border border-neutral-200 bg-white p-6">
          <h2 className="text-base font-semibold text-neutral-900">Priority Gap Score (PGS)</h2>
          <p className="mt-3 text-sm leading-6 text-neutral-700">
            The PGS is a composite index that combines three dimensions of health-access inequity into a single
            transparent score between 0 (lower priority) and 1 (higher priority). It is designed for comparison
            across wards within Nairobi City County.
          </p>
        </section>

        <section className="rounded-xl border border-neutral-200 bg-white p-6">
          <h2 className="text-base font-semibold text-neutral-900">Components</h2>
          <div className="mt-4 space-y-4 text-sm leading-6 text-neutral-700">
            <div>
              <h3 className="font-medium text-neutral-900">1. Accessibility (default weight: 40%)</h3>
              <p className="mt-1">
                Combines travel time proxy (60%) and facility density (40%, inverted so lower density increases the
                score). These indicate how easily residents can reach health services.
              </p>
            </div>
            <div>
              <h3 className="font-medium text-neutral-900">2. Population pressure (default weight: 30%)</h3>
              <p className="mt-1">
                Uses total ward population as a proxy for service demand pressure. Higher populations may strain
                available health resources.
              </p>
            </div>
            <div>
              <h3 className="font-medium text-neutral-900">3. Vulnerability (default weight: 30%)</h3>
              <p className="mt-1">
                Uses poverty proxy data as a socio-economic vulnerability indicator. Areas with higher poverty rates
                face greater barriers to accessing care.
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-xl border border-neutral-200 bg-white p-6">
          <h2 className="text-base font-semibold text-neutral-900">Formula</h2>
          <div className="mt-3 rounded-lg bg-neutral-50 p-4 font-mono text-xs leading-6 text-neutral-700">
            <p>PGS = (accessibility × W_access) + (vulnerability × W_vuln) + (pop_pressure × W_pop)</p>
            <p className="mt-2 text-neutral-400">Where W_access + W_vuln + W_pop = 1.0 (defaults: 0.4, 0.3, 0.3)</p>
            <p className="mt-2 text-neutral-400">
              Each component is min-max normalised across all Nairobi wards before aggregation.
            </p>
          </div>
        </section>

        <section className="rounded-xl border border-neutral-200 bg-white p-6">
          <h2 className="text-base font-semibold text-neutral-900">Limitations</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-neutral-700">
            <li>
              <strong>Proxy indicators:</strong> The PGS is built from proxy indicators, not clinical outcome measures.
              It indicates relative priority, not absolute need.
            </li>
            <li>
              <strong>Data quality:</strong> Current indicators are synthetic/demo data. Real-world deployment requires
              validated administrative data (e.g., Kenya MFL, census, KHIS).
            </li>
            <li>
              <strong>Spatial granularity:</strong> Ward centroids are used rather than population-weighted means,
              which may introduce error in large wards.
            </li>
            <li>
              <strong>No quality dimension:</strong> The score does not capture facility capacity, staffing, drug
              availability, or quality of care.
            </li>
            <li>
              <strong>Equal weighting assumption:</strong> Default weights are based on literature review but should
              be validated with local stakeholders.
            </li>
          </ul>
        </section>

        <section className="rounded-xl border border-neutral-200 bg-white p-6">
          <h2 className="text-base font-semibold text-neutral-900">Why these proxies?</h2>
          <p className="mt-3 text-sm leading-6 text-neutral-700">
            Travel time and facility density are well-established spatial access measures in health geography.
            Population proxies for demand pressure, and poverty proxies for vulnerability, are standard in
            equity-focussed health planning. These were chosen because they can be derived from open data sources
            without requiring access to restricted health information systems.
          </p>
        </section>

        <SourcesPanel />
      </div>
    </div>
  );
}

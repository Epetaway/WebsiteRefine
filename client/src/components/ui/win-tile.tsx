interface Metric {
  label: string;
  value: string;
  improvement?: string;
}

interface WinTileProps {
  icon: string;
  title: string;
  description: string;
  stack: string;
  bgColor: string;
  iconColor: string;
  metricColor: string;
  metric?: string;       // legacy single-metric label
  improvement?: string;  // legacy single-metric value
  metrics?: Metric[];    // new multi-metrics array
}

export default function WinTile({
  icon,
  title,
  description,
  stack,
  bgColor,
  iconColor,
  metricColor,
  metric,
  improvement,
  metrics
}: WinTileProps) {
  return (
    <div
      className={`${bgColor} p-8 rounded-2xl border hover:shadow-lg transition-shadow duration-300`}
    >
      <div
        className={`w-12 h-12 ${iconColor} rounded-xl flex items-center justify-center mb-6`}
      >
        <i className={`${icon} text-white text-xl`} aria-hidden="true"></i>
      </div>

      <h3
        className="text-xl font-bold mb-4"
        data-testid={`title-${title.toLowerCase().replace(/\s+/g, '-')}`}
      >
        {title}
      </h3>

      {/* Metrics Section */}
      {metrics && metrics.length > 0 ? (
        <dl className="mb-6 space-y-3">
          {metrics.map((m, i) => (
            <div key={i}>
              <dt className="text-sm text-gray-600">{m.label}</dt>
              <dd className={`text-2xl font-bold ${metricColor}`}>
                {m.value}{" "}
                {m.improvement && (
                  <span className="text-sm text-gray-500 ml-1">
                    ({m.improvement})
                  </span>
                )}
              </dd>
            </div>
          ))}
        </dl>
      ) : (
        (metric || improvement) && (
          <div className="mb-6">
            <div
              className={`text-3xl font-bold ${metricColor} mb-1`}
              data-testid={`metric-${title.toLowerCase().replace(/\s+/g, '-')}`}
            >
              {improvement}
            </div>
            <div
              className="text-sm text-gray-600"
              data-testid={`metric-label-${title
                .toLowerCase()
                .replace(/\s+/g, '-')}`}
            >
              {metric}
            </div>
          </div>
        )
      )}

      <p
        className="text-gray-700 text-sm leading-relaxed mb-4"
        data-testid={`description-${title.toLowerCase().replace(/\s+/g, '-')}`}
      >
        {description}
      </p>

      <div
        className="text-xs text-gray-500"
        data-testid={`stack-${title.toLowerCase().replace(/\s+/g, '-')}`}
      >
        {stack}
      </div>
    </div>
  );
}

interface WinTileProps {
  icon: string;
  title: string;
  metric: string;
  improvement: string;
  description: string;
  stack: string;
  bgColor: string;
  iconColor: string;
  metricColor: string;
}

export default function WinTile({
  icon,
  title,
  metric,
  improvement,
  description,
  stack,
  bgColor,
  iconColor,
  metricColor
}: WinTileProps) {
  return (
    <div className={`${bgColor} p-8 rounded-2xl border hover:shadow-lg transition-shadow duration-300`}>
      <div className={`w-12 h-12 ${iconColor} rounded-xl flex items-center justify-center mb-6`}>
        <i className={`${icon} text-white text-xl`}></i>
      </div>
      <h3 className="text-xl font-bold mb-3" data-testid={`title-${title.toLowerCase().replace(/\s+/g, '-')}`}>
        {title}
      </h3>
      <div className="mb-4">
        <div className={`text-3xl font-bold ${metricColor} mb-1`} data-testid={`metric-${title.toLowerCase().replace(/\s+/g, '-')}`}>
          {improvement}
        </div>
        <div className="text-sm text-gray-600" data-testid={`metric-label-${title.toLowerCase().replace(/\s+/g, '-')}`}>
          {metric}
        </div>
      </div>
      <p className="text-gray-700 text-sm leading-relaxed mb-4" data-testid={`description-${title.toLowerCase().replace(/\s+/g, '-')}`}>
        {description}
      </p>
      <div className="text-xs text-gray-500" data-testid={`stack-${title.toLowerCase().replace(/\s+/g, '-')}`}>
        {stack}
      </div>
    </div>
  );
}

interface TechBadgeProps {
  name: string;
  color: string;
}

export default function TechBadge({ name, color }: TechBadgeProps) {
  const colorClasses = {
    red: "bg-red-100 text-red-700",
    blue: "bg-blue-100 text-blue-700",
    cyan: "bg-cyan-100 text-cyan-700",
    purple: "bg-purple-100 text-purple-700",
    green: "bg-green-100 text-green-700",
    orange: "bg-orange-100 text-orange-700",
    yellow: "bg-yellow-100 text-yellow-700",
    gray: "bg-gray-100 text-gray-700"
  };

  return (
    <span 
      className={`px-3 py-1 ${colorClasses[color as keyof typeof colorClasses]} rounded-full text-sm font-medium`}
      data-testid={`badge-${name.toLowerCase().replace(/\s+/g, '-')}`}
    >
      {name}
    </span>
  );
}

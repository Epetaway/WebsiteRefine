interface TechBadgeProps {
  name: string;
  color: 'blue' | 'green' | 'purple' | 'orange' | 'teal' | 'gray';
}

const colorClasses = {
  blue: 'bg-blue-100 text-blue-700',
  green: 'bg-green-100 text-green-700',
  purple: 'bg-purple-100 text-purple-700',
  orange: 'bg-orange-100 text-orange-700',
  teal: 'bg-teal-100 text-teal-700',
  gray: 'bg-gray-100 text-gray-700',
};

export default function TechBadge({ name, color }: TechBadgeProps) {
  return (
    <span 
      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${colorClasses[color]}`}
      data-testid={`tech-badge-${name.toLowerCase().replace(/\s+/g, '-')}`}
    >
      {name}
    </span>
  );
}
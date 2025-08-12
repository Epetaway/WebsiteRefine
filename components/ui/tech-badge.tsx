interface TechBadgeProps {
  name: string
  color: 'blue' | 'yellow' | 'orange' | 'purple' | 'green' | 'gray'
}

const colorClasses = {
  blue: 'bg-blue-100 text-blue-800 border-blue-200',
  yellow: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  orange: 'bg-orange-100 text-orange-800 border-orange-200',
  purple: 'bg-purple-100 text-purple-800 border-purple-200',
  green: 'bg-green-100 text-green-800 border-green-200',
  gray: 'bg-gray-100 text-gray-800 border-gray-200'
}

export default function TechBadge({ name, color }: TechBadgeProps) {
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${colorClasses[color]}`}>
      {name}
    </span>
  )
}
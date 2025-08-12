export default function BlogPage() {
  return (
    <div className="pt-20 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8">Blog</h1>
        <p className="text-lg text-gray-600 mb-12">
          Technical insights and lessons from the mat.
        </p>
        
        <div className="space-y-8">
          <article className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <h2 className="text-2xl font-semibold mb-4">
              The BJJ Mindset: How Brazilian Jiu-Jitsu Makes You a Better Developer
            </h2>
            <p className="text-gray-600 mb-4">
              Exploring the parallels between problem-solving on the mats and debugging code.
            </p>
            <div className="text-sm text-gray-500">
              Published on March 15, 2024
            </div>
          </article>
          
          <article className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <h2 className="text-2xl font-semibold mb-4">
              Modern React Development: Hooks, TypeScript, and Best Practices
            </h2>
            <p className="text-gray-600 mb-4">
              A comprehensive guide to building scalable React applications in 2024.
            </p>
            <div className="text-sm text-gray-500">
              Published on February 28, 2024
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}
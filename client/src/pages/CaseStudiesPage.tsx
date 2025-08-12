export default function CaseStudiesPage() {
  return (
    <div className="pt-20 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8">Case Studies</h1>
        <p className="text-lg text-gray-600 mb-12">
          Real projects with measurable results and production code.
        </p>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <h3 className="text-xl font-semibold mb-4">E-commerce Platform Redesign</h3>
            <p className="text-gray-600 mb-4">
              Complete UI/UX overhaul resulting in +37% conversion rate improvement.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">React</span>
              <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">JavaScript</span>
              <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">CSS3</span>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <h3 className="text-xl font-semibold mb-4">Marketing Website Optimization</h3>
            <p className="text-gray-600 mb-4">
              SEO and performance improvements leading to +25% organic traffic growth.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">HTML5</span>
              <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm">CSS3</span>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">SEO</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
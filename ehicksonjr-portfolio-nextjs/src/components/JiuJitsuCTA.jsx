import Link from 'next/link'

export function JiuJitsuCTA() {
  return (
    <section className="relative w-full h-[60vh] md:h-[75vh] overflow-hidden">
      {/* Background video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/videos/jiujitsu-banner.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-6">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
          Train with Earl the Kaiju
        </h2>
        <p className="mt-4 text-lg sm:text-xl max-w-2xl">
          Private Jiu-Jitsu lessons to unlock your potential — tailored for all levels, taught with passion and precision.
        </p>
        <Link href="/training">
          <span className="mt-6 inline-block px-6 py-3 bg-teal-500 hover:bg-teal-600 text-white font-semibold rounded-md text-lg transition">
            Learn More
          </span>
        </Link>
      </div>
    </section>
  )
}

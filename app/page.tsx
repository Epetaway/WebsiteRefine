import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="parent" style={{fontFamily: "'Inter', sans-serif"}}>
      {/* Magic Pattern Background */}
      <div className="fixed inset-0 w-full h-full bg-white" style={{
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundRepeat: 'repeat',
        backgroundImage: `url("data:image/svg+xml;utf8,%3Csvg viewBox='0 0 2560 1440' xmlns='http://www.w3.org/2000/svg'%3E%3Cmask id='b' x='0' y='0' width='2560' height='1440'%3E%3Cpath fill='url(%23a)' d='M0 0h2560v1440H0z'/%3E%3C/mask%3E%3Cpath fill='%23fff' d='M0 0h2560v1440H0z'/%3E%3Cg mask='url(%23b)'%3E%3Cg transform='scale(1.1)' style='transform-origin:center center'%3E%3Ccircle cx='366' cy='91.5' r='4.608'/%3E%3Ccircle cx='549' cy='91.5' r='4.608'/%3E%3Ccircle cx='732' cy='91.5' r='4.608'/%3E%3Ccircle cx='915' cy='91.5' r='4.608'/%3E%3Ccircle cx='1281' cy='91.5' r='4.608'/%3E%3Ccircle cx='1647' cy='91.5' r='4.608'/%3E%3Ccircle cx='1830' cy='91.5' r='4.608'/%3E%3Ccircle cx='2013' cy='91.5' r='4.608'/%3E%3Ccircle cx='2196' cy='91.5' r='4.608'/%3E%3Ccircle cx='2379' cy='91.5' r='4.608'/%3E%3Ccircle cx='2562' cy='91.5' r='4.608'/%3E%3C/g%3E%3C/g%3E%3Cdefs%3E%3CradialGradient id='a'%3E%3Cstop offset='0' stop-color='%23fff'/%3E%3Cstop offset='1' stop-color='%23fff'/%3E%3C/radialGradient%3E%3C/defs%3E%3C/svg%3E")`
      }}></div>

      {/* Intro Section */}
      <section className="relative section py-28 px-6" id="intro">
        <div className="container mx-auto">
          <div className="flex flex-col-reverse md:flex-row items-center">
            
            {/* Text Content */}
            <div className="md:w-1/2 mt-4 md:mt-0 text-black">
              <h1 className="mb-3 font-bold text-6xl bg-white p-2 rounded" style={{fontFamily: "'Space Grotesk', sans-serif"}}>
                Hi, I'm Earl Hickson Jr.
              </h1>
              <p className="text-xl leading-relaxed bg-white p-2 rounded mb-6">
                Front-End Developer & UI/UX Designer blending design and code to build accessible, high-performance web experiences.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="#contact" className="inline-block px-6 py-3 bg-yellow-400 text-black font-semibold rounded-full shadow-lg hover:transform hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
                  Let's Connect
                </Link>
              </div>
            </div>

            {/* Profile Image */}
            <div className="md:w-1/2 text-center">
              <Image 
                src="/meAnimated.png" 
                alt="Earl Hickson Jr. Profile" 
                width={400} 
                height={400} 
                className="max-w-full h-auto rounded-lg"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="relative section py-28 px-6 bg-white" id="about">
        <div className="container mx-auto">
          <div className="flex justify-between items-center text-black flex-col lg:flex-row">
            {/* Who I Am */}
            <div className="lg:w-1/2 mb-5 lg:mb-0">
              <h2 className="mb-4 bg-white p-2 rounded text-5xl font-bold" style={{fontFamily: "'Space Grotesk', sans-serif"}}>
                Who I Am
              </h2>
              <div className="text-justify space-y-4">
                <p className="bg-white p-2 rounded">
                  I'm a passionate front-end developer with 6+ years of experience. I specialize in building scalable and high-performance interfaces using modern JavaScript frameworks. From responsive design to component-based architecture, I thrive on creating seamless experiences.
                </p>
                <p className="bg-white p-2 rounded">
                  Throughout my career, I've worked across diverse industries including healthcare, marketing, and fintech—leading front-end efforts with React, Angular, and Stencil. I bring a unique blend of design sensibility and coding discipline, honed by my formal education in Graphic Design and Front-End Development.
                </p>
                <p className="bg-white p-2 rounded">
                  Outside of code, I'm an active Brazilian Jiu-Jitsu instructor and competitor. Teaching and training fuels my passion for continuous growth and sharp problem-solving—on the mat and in tech. I'm also a proud father, TCG collector, and builder of fun, community-driven side projects.
                </p>
              </div>
            </div>

            {/* Companies I've Worked With */}
            <div className="lg:w-1/2">
              <h2 className="text-center mb-4 bg-white p-2 rounded text-3xl font-bold" style={{fontFamily: "'Space Grotesk', sans-serif"}}>
                Companies I've Worked With
              </h2>
              <div className="flex flex-wrap justify-center items-center gap-4">
                <div className="flex justify-center flex-wrap gap-4">
                  <Image src="/asembia.png" width={120} height={60} alt="Asembia" className="bg-white grayscale hover:grayscale-0 transition-all duration-300 object-contain" />
                  <Image src="/broadcastmed.png" width={120} height={60} alt="BroadcastMed" className="bg-white grayscale hover:grayscale-0 transition-all duration-300 object-contain" />
                  <Image src="/prosek.png" width={120} height={60} alt="Prosek Partners" className="bg-white grayscale hover:grayscale-0 transition-all duration-300 object-contain" />
                  <Image src="/Merck_Logo.svg" width={120} height={60} alt="Merck" className="bg-white grayscale hover:grayscale-0 transition-all duration-300 object-contain" />
                  <Image src="/verizon.png" width={120} height={60} alt="Verizon" className="bg-white grayscale hover:grayscale-0 transition-all duration-300 object-contain" />
                  <Image src="/Merkle.png" width={120} height={60} alt="Merkle Inc" className="bg-white grayscale hover:grayscale-0 transition-all duration-300 object-contain" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section id="featured-projects" className="relative section py-28 px-6 bg-black text-white">
        <div className="container mx-auto">
          <h2 className="mb-4 text-center text-5xl font-bold" style={{fontFamily: "'Space Grotesk', sans-serif"}}>
            Areas of Expertise
          </h2>
          <div className="flex justify-center gap-4 text-center my-8 flex-wrap">

            {/* Expertise 1 */}
            <div className="cursor-pointer transition-all duration-300 hover:transform hover:-translate-y-2 hover:scale-105 hover:shadow-2xl min-w-[250px] max-w-[300px] min-h-[450px] max-h-[520px] w-full mx-auto"
                 style={{
                   backgroundImage: "url('/project-shape1.png')",
                   backgroundPosition: "center center",
                   backgroundRepeat: "no-repeat",
                   backgroundSize: "contain",
                   padding: "8rem 6rem"
                 }}>
              <div className="project-shape">
                <div className="project-text text-left">
                  <h3 className="font-bold text-lg mb-2">Modern Front-End Development</h3>
                  <p>Enterprise-grade UIs using React, Angular, and Stencil.</p>
                </div>
              </div>
            </div>

            {/* Expertise 2 */}
            <div className="cursor-pointer transition-all duration-300 hover:transform hover:-translate-y-2 hover:scale-105 hover:shadow-2xl min-w-[250px] max-w-[300px] min-h-[450px] max-h-[520px] w-full mx-auto"
                 style={{
                   backgroundImage: "url('/project-shape2.png')",
                   backgroundPosition: "center center",
                   backgroundRepeat: "no-repeat",
                   backgroundSize: "contain",
                   padding: "8rem 6rem"
                 }}>
              <div className="project-shape">
                <div className="project-text text-center">
                  <h3 className="font-bold text-lg mb-2">UI/UX Design & Implementation</h3>
                  <p>Clean, accessible, and mobile-first design execution.</p>
                </div>
              </div>
            </div>

            {/* Expertise 3 */}
            <div className="cursor-pointer transition-all duration-300 hover:transform hover:-translate-y-2 hover:scale-105 hover:shadow-2xl min-w-[250px] max-w-[300px] min-h-[450px] max-h-[520px] w-full mx-auto"
                 style={{
                   backgroundImage: "url('/project-shape3.png')",
                   backgroundPosition: "center center",
                   backgroundRepeat: "no-repeat",
                   backgroundSize: "contain",
                   padding: "8rem 6rem"
                 }}>
              <div className="project-shape">
                <div className="project-text text-left">
                  <h3 className="font-bold text-lg mb-2">Reusable Web Component Architecture</h3>
                  <p>Component systems built for performance and reuse.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="relative section py-28 px-6 text-center text-black bg-white" id="contact">
        <div className="container mx-auto">
          <h2 className="mb-4 text-5xl font-bold" style={{fontFamily: "'Space Grotesk', sans-serif"}}>
            Let's Connect
          </h2>
          <p className="mb-4 text-xl">Whether you're hiring, collaborating, or just want to say hello — drop me a line!</p>
          <div className="flex justify-center">
            <div className="md:w-1/2">
              <div className="p-4 border rounded-lg shadow-sm bg-gray-50 text-left">
                <div className="mb-3 flex items-center">
                  <i className="fas fa-envelope text-lg mr-3 text-green-600"></i>
                  <a href="mailto:e@ehicksonjr.com" className="text-black hover:underline">e@ehicksonjr.com</a>
                </div>
                
                <div className="flex items-center">
                  <i className="fab fa-linkedin text-lg mr-3 text-green-600"></i>
                  <a href="https://linkedin.com/in/earl-hickson-jr" target="_blank" className="text-black hover:underline">linkedin.com/in/earl-hickson-jr</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { getFeaturedProjects } from "@/lib/projects";
import profileImage from "@/images/me.png";

const SITE = "https://www.ehicksonjr.com";

const experiences = [
  {
    title: "Front-End Development",
    years: "6+ Years",
    description: "React, Angular, Vue, TypeScript with focus on accessibility and performance.",
    icon: "💻",
  },
  {
    title: "Healthcare & Enterprise",
    years: "3+ Years",
    description: "Patient portals, HIPAA compliance, complex multi-step workflows.",
    icon: "🏥",
  },
  {
    title: "Design Systems",
    years: "4+ Years",
    description: "Building and maintaining component libraries and design tokens.",
    icon: "🎨",
  },
  {
    title: "WCAG 2.1 AA",
    years: "Certified",
    description: "Accessible interfaces with semantic HTML, ARIA, and keyboard navigation.",
    icon: "♿",
  },
];

export default function Home() {
  const featuredProjects = getFeaturedProjects();
  const title = "Earl Hickson Jr. – Senior Front-End Engineer";
  const description =
    "Senior Front-End Engineer building accessible, responsive, and performance-focused web interfaces. 6+ years with React, Angular, Vue, and TypeScript across healthcare, marketing, and enterprise domains. Based in Parsippany, NJ.";

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={typeof window !== "undefined" ? window.location.href : SITE} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={typeof window !== "undefined" ? window.location.href : SITE} />
        <meta property="og:site_name" content="Earl Hickson Jr." />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
      <div className="bg-teal min-h-screen">
        {/* Hero Section */}
        <section className="w-full flex justify-center px-6 md:px-12 bg-[#f5f5f5] py-12 md:py-24" id="about">
          <div className="w-full max-w-[1040px]">
            <div className="grid lg:grid-cols-[2fr_1fr] gap-4">
              {/* Main Card */}
              <div className="bg-white rounded-2xl p-8 md:p-12 shadow-[0_140px_120px_-80px_rgba(99,106,125,0.04)]">
                <h1 className="text-[40px] md:text-[54px] leading-[1.2] font-medium mb-6 tracking-[-0.07em]" data-testid="hero-title-primary">
                  <span className="text-[#18171e]">Bring Your Web Design Ideas to Life</span>{" "}
                  <span className="text-[#417dfb]">with Framer</span>
                </h1>
                <p className="text-base leading-[1.9em] tracking-[-0.04em] text-[#18171e] mb-8">
                  Hey, I'm Lucas, welcome to my world. I design high-performance, visually stunning websites using Framer—blending creativity, speed, and seamless user experience.
                </p>
                {/* Social Icons */}
                <div className="flex gap-4 mb-8">
                  <a href="https://instagram.com" target="_blank" rel="noopener" className="w-6 h-6 flex items-center justify-center">
                    <svg viewBox="0 0 32 32" fill="currentColor" className="w-6 h-6 text-[#18171e]">
                      <path d="M16 2.883c4.277 0 4.781.018 6.465.095 1.563.07 2.406.33 2.969.549a4.95 4.95 0 0 1 1.837 1.195 4.95 4.95 0 0 1 1.195 1.837c.219.563.479 1.406.549 2.969.077 1.684.095 2.188.095 6.465s-.018 4.781-.095 6.465c-.07 1.563-.33 2.406-.549 2.969a4.95 4.95 0 0 1-1.195 1.837 4.95 4.95 0 0 1-1.837 1.195c-.563.219-1.406.479-2.969.549-1.684.077-2.188.095-6.465.095s-4.781-.018-6.465-.095c-1.563-.07-2.406-.33-2.969-.549a4.95 4.95 0 0 1-1.837-1.195 4.95 4.95 0 0 1-1.195-1.837c-.219-.563-.479-1.406-.549-2.969-.077-1.684-.095-2.188-.095-6.465s.018-4.781.095-6.465c.07-1.563.33-2.406.549-2.969a4.95 4.95 0 0 1 1.195-1.837A4.95 4.95 0 0 1 6.566 3.527c.563-.219 1.406-.479 2.969-.549 1.684-.077 2.188-.095 6.465-.095zm0-2.883c-4.35 0-4.891.018-6.597.096-1.704.078-2.867.35-3.883.746a7.835 7.835 0 0 0-2.832 1.843A7.835 7.835 0 0 0 .845 5.517c-.396 1.016-.668 2.179-.746 3.883C.021 11.109 0 11.65 0 16s.021 4.891.096 6.597c.078 1.704.35 2.867.746 3.883a7.835 7.835 0 0 0 1.843 2.832 7.835 7.835 0 0 0 2.832 1.843c1.016.396 2.179.668 3.883.746C11.109 31.979 11.65 32 16 32s4.891-.021 6.597-.096c1.704-.078 2.867-.35 3.883-.746a7.835 7.835 0 0 0 2.832-1.843 7.835 7.835 0 0 0 1.843-2.832c.396-1.016.668-2.179.746-3.883.078-1.706.096-2.247.096-6.597s-.018-4.891-.096-6.597c-.078-1.704-.35-2.867-.746-3.883a7.835 7.835 0 0 0-1.843-2.832A7.835 7.835 0 0 0 26.48.845c-1.016-.396-2.179-.668-3.883-.746C20.891.021 20.35 0 16 0zm0 7.784a8.216 8.216 0 1 0 0 16.432 8.216 8.216 0 0 0 0-16.432zm0 13.549a5.333 5.333 0 1 1 0-10.666 5.333 5.333 0 0 1 0 10.666zm10.461-13.852a1.919 1.919 0 1 1-3.838 0 1.919 1.919 0 0 1 3.838 0z"/>
                    </svg>
                  </a>
                  {/* ...other social icons... */}
                </div>
                {/* CTA Buttons */}
                <div className="flex flex-wrap gap-2">
                  <Button asChild className="bg-gradient-to-b from-[#9a7aff] to-[#8057ff] text-white border-0 shadow-[0_1px_0_0_rgba(99,106,126,0.6)] backdrop-blur-[100px]" size="lg" data-testid="button-case-studies">
                    <Link to="/projects">
                      Get Template
                    </Link>
                  </Button>
                  <Button asChild variant="secondary" className="bg-gradient-to-b from-[#e7e7e9] to-[#e8e8e8] text-[#18171e] border-0 shadow-[0_1px_0_0_rgba(99,106,126,0.6)] backdrop-blur-[100px]" size="lg" data-testid="button-resume">
                    <a href="/assets/resume.pdf" target="_blank" rel="noopener noreferrer">
                      Get in touch
                    </a>
                  </Button>
                </div>
              </div>
              {/* Profile Card */}
              <div className="bg-white rounded-2xl p-4 pb-8 shadow-[0_140px_120px_-80px_rgba(99,106,125,0.04)] flex flex-col gap-4">
                <div className="bg-[#f7f9fc] rounded-[10px] flex items-end justify-center overflow-hidden h-[300px]">
                  <img
                    src={profileImage}
                    alt="Earl Hickson Jr."
                    className="w-full h-full object-cover"
                    data-testid="hero-image"
                  />
                </div>
                <div className="px-2">
                  <p className="text-lg font-medium tracking-[-0.05em] leading-[1.5] text-[#18171e] mb-1">
                    Lucas Bennet
                  </p>
                  <p className="text-base leading-[1.9em] tracking-[-0.04em] text-[#18171e]">
                    Senior Product Designer at Milano
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Projects Section */}
        <section className="w-full flex justify-center px-6 md:px-12 bg-[#f5f5f5] py-12 md:py-24" id="projects">
          <div className="w-full max-w-[1040px]">
            <div className="flex flex-col lg:flex-row gap-8 mb-8">
              <div className="flex-1">
                <h2 className="text-[40px] md:text-[48px] leading-[1.2] font-medium tracking-[-0.07em] text-left mb-4 text-[#18171e]">
                  Explore<br />
                  my latest{" "}
                  <span className="bg-gradient-to-br from-[#015fff] to-[#558afb] bg-clip-text text-transparent">
                    Projects
                  </span>
                </h2>
                <p className="text-base leading-[1.9em] tracking-[-0.04em] text-[#18171e]">
                  These projects showcase my commitment to crafting unique, high-performance digital experiences tailored to every need.
                </p>
              </div>
              <div className="flex items-center justify-center lg:justify-end">
                <div className="w-24 h-24 rounded-full bg-gradient-to-b from-[#558afb] to-[#015fff] flex items-center justify-center shadow-[inset_0_20px_12px_12px_rgba(255,255,255,0.2),0_0_4px_#e5e1fd,inset_0_-4px_8.23px_#e5e1fd]">
                  <i className="fas fa-dollar-sign text-white text-5xl"></i>
                </div>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-5">
              {featuredProjects.slice(0, 3).map((project) => (
                <Link
                  key={project.slug}
                  to={`/projects/${project.slug}`}
                  className="group block bg-white rounded-2xl p-4 pb-6 shadow-[0_140px_120px_-80px_rgba(99,106,125,0.04)] hover:shadow-[0_140px_120px_-60px_rgba(99,106,125,0.08)] transition-all duration-300"
                >
                  <div className="bg-[#f7f9fc] rounded-2xl mb-4 overflow-hidden h-[320px] flex items-center justify-center">
                    <img
                      src={project.thumbnail}
                      alt={project.title}
                      className="w-full h-full object-cover object-[center_top] group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect fill='%23F7F9FC' width='400' height='300'/%3E%3C/svg%3E";
                      }}
                    />
                  </div>
                  <div className="px-4">
                    <div className="mb-2">
                      <h4 className="text-xl font-medium tracking-[-0.07em] leading-[1.3] text-[#18171e] text-left mb-2">
                        {project.title}
                      </h4>
                      <p className="text-base leading-[1.9em] tracking-[-0.04em] text-[#818898]">
                        {project.role}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
        {/* Experience & Expertise Section */}
        <section className="w-full flex justify-center px-6 md:px-12 bg-[#f5f5f5] py-12 md:py-24">
          <div className="w-full max-w-[1040px]">
            <div className="flex flex-col lg:flex-row gap-8 mb-8">
              <div className="flex-1">
                <h2 className="text-[40px] md:text-[48px] leading-[1.2] font-medium tracking-[-0.07em] text-left mb-4 text-[#18171e]">
                  Experience that's so{" "}
                  <span className="bg-gradient-to-br from-[#015fff] to-[#558afb] bg-clip-text text-transparent">
                    Solid
                  </span>
                </h2>
                <p className="text-base leading-[1.9em] tracking-[-0.04em] text-[#18171e]">
                  With years of experience, I've created innovative, high-performance websites that combine functionality with stunning design.
                </p>
              </div>
              <div className="flex items-center justify-center lg:justify-end">
                <div className="w-24 h-24 rounded-full bg-gradient-to-b from-[#558afb] to-[#015fff] flex items-center justify-center shadow-[inset_0_20px_12px_12px_rgba(255,255,255,0.2),0_0_4px_#e5e1fd,inset_0_-4px_8.23px_#e5e1fd]">
                  <i className="fas fa-check text-white text-5xl"></i>
                </div>
              </div>
            </div>
            {/* 3 Cards Grid */}
            <div className="grid md:grid-cols-3 gap-4">
              {/* Card 1: Main Experience Card (Blue) */}
              <div className="bg-gradient-to-b from-[#417dfb] via-[#015fff] to-[#1743ff] rounded-2xl p-8 shadow-[0_140px_120px_-80px_rgba(99,106,125,0.04)] transition-all duration-300 flex flex-col justify-between">
                <div>
                  <div className="w-14 h-14 rounded-full bg-gradient-to-b from-white to-[#e7e7e9] flex items-center justify-center shadow-[0_10px_6px_rgba(0,0,0,0.05),0_4px_4px_rgba(0,0,0,0.1),0_2px_4px_rgba(0,0,0,0.1)] mb-6">
                    <i className="fas fa-code text-[#015fff] text-2xl"></i>
                  </div>
                  <h3 className="text-[28px] leading-[1.3] font-medium tracking-[-0.04em] text-white mb-4">
                    7+ Years of Experience
                  </h3>
                  <p className="text-base leading-[1.9em] tracking-[-0.04em] text-white/90">
                    With years of experience, I've created innovative, high-performance websites that combine functionality with stunning design.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 mt-6">
                  {['fab fa-react', 'fab fa-vuejs', 'fab fa-js', 'fab fa-html5', 'fab fa-css3-alt', 'fab fa-node'].map((icon, index) => (
                    <div key={index} className="w-10 h-10 rounded-full bg-gradient-to-b from-white to-[#e7e7e9] flex items-center justify-center shadow-[0_10px_6px_rgba(0,0,0,0.05),0_4px_4px_rgba(0,0,0,0.1),0_2px_4px_rgba(0,0,0,0.1)]">
                      <i className={`${icon} text-[#18171e] text-lg`}></i>
                    </div>
                  ))}
                </div>
              </div>
              {/* Card 2: More About Me */}
              <div className="bg-white rounded-2xl p-8 shadow-[0_140px_120px_-80px_rgba(99,106,125,0.04)] transition-all duration-300 flex flex-col justify-between">
                <div>
                  <h3 className="text-[28px] leading-[1.3] font-medium tracking-[-0.04em] text-[#417dfb] mb-4">
                    More About Me
                  </h3>
                  <p className="text-base leading-[1.9em] tracking-[-0.04em] text-[#18171e] mb-6">
                    I craft intuitive, accessible interfaces that prioritize user experience while maintaining visual excellence and brand consistency.
                  </p>
                </div>
                <Button asChild variant="primary" className="btn">
                  <Link to="/about">
                    Learn more about me
                  </Link>
                </Button>
              </div>
              {/* Card 3: Download Resume */}
              <div className="bg-white rounded-2xl p-8 shadow-[0_140px_120px_-80px_rgba(99,106,125,0.04)] transition-all duration-300 flex flex-col justify-between">
                <div>
                  <div className="mb-4">
                    <i className="fas fa-file-download text-[#417dfb] text-5xl mb-4 block"></i>
                  </div>
                  <h3 className="text-[28px] leading-[1.3] font-medium tracking-[-0.04em] text-[#18171e] mb-4">
                    Download Resume
                  </h3>
                  <p className="text-base leading-[1.9em] tracking-[-0.04em] text-[#818898] mb-6">
                    Get a comprehensive overview of my experience, skills, and accomplishments in full-stack development and design.
                  </p>
                </div>
                <Button asChild variant="secondary" className="btn">
                  <a href="/assets/resume.pdf" target="_blank" rel="noopener noreferrer">
                    Download PDF
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>
        {/* Services & Expertise Section */}
        <section className="w-full flex justify-center px-6 md:px-12 bg-[#f5f5f5] py-12 md:py-24" id="services">
          <div className="w-full max-w-[1040px] flex flex-col gap-8 items-center">
            <div className="flex flex-col md:flex-row w-full gap-8 items-center justify-between">
              <div className="flex-1 flex flex-col gap-4">
                <h2 className="text-[40px] md:text-[54px] leading-[1.2] font-medium tracking-[-0.07em] text-left mb-2">
                  Services <br className="hidden md:inline" />made <span className="bg-gradient-to-br from-[#015fff] to-[#558afb] bg-clip-text text-transparent">Effortless</span>
                </h2>
                <p className="text-base leading-[1.9em] tracking-[-0.04em] text-[#18171e] mb-4">
                  We make it easy—one complete service with all you need, no extra fees.
                </p>
              </div>
              <div className="flex items-center justify-center">
                <div className="w-24 h-24 rounded-full bg-gradient-to-b from-[#558afb] to-[#015fff] flex items-center justify-center shadow-[inset_0_20px_12px_12px_rgba(255,255,255,0.2),0_0_4px_#e5e1fd,inset_0_-4px_8.23px_#e5e1fd]">
                  <i className="fas fa-dollar-sign text-white text-5xl"></i>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mt-8">
              {/* UI/UX Design Card */}
              <div className="bg-white rounded-2xl p-8 shadow-[0_140px_120px_-80px_rgba(99,106,125,0.04)] flex flex-col gap-4">
                <div className="flex items-center gap-3 mb-2">
                  <i className="fas fa-object-group text-[#015fff] text-3xl"></i>
                  <h3 className="text-[28px] font-medium tracking-[-0.04em] text-[#18171e]">UI/UX Design</h3>
                </div>
                <p className="text-base text-[#18171e]">Crafting user-centered, visually stunning, and highly intuitive interfaces that deeply engage and resonate with audiences.</p>
              </div>
              {/* Brand Design Card */}
              <div className="bg-white rounded-2xl p-8 shadow-[0_140px_120px_-80px_rgba(99,106,125,0.04)] flex flex-col gap-4">
                <div className="flex items-center gap-3 mb-2">
                  <i className="fas fa-palette text-[#015fff] text-3xl"></i>
                  <h3 className="text-[28px] font-medium tracking-[-0.04em] text-[#18171e]">Brand Design</h3>
                </div>
                <p className="text-base text-[#18171e]">Creates visual identities and develops brand strategies for tech companies around the world.</p>
              </div>
              {/* Product Design Card */}
              <div className="bg-white rounded-2xl p-8 shadow-[0_140px_120px_-80px_rgba(99,106,125,0.04)] flex flex-col gap-4">
                <div className="flex items-center gap-3 mb-2">
                  <i className="fas fa-cube text-[#015fff] text-3xl"></i>
                  <h3 className="text-[28px] font-medium tracking-[-0.04em] text-[#18171e]">Product Design</h3>
                </div>
                <p className="text-base text-[#18171e]">Comprehensive end-to-end design process, from initial ideation and wireframing to interactive prototyping and in-depth usability testing.</p>
              </div>
              {/* Design Consultancy Card */}
              <div className="bg-white rounded-2xl p-8 shadow-[0_140px_120px_-80px_rgba(99,106,125,0.04)] flex flex-col gap-4">
                <div className="flex items-center gap-3 mb-2">
                  <i className="fas fa-lightbulb text-[#015fff] text-3xl"></i>
                  <h3 className="text-[28px] font-medium tracking-[-0.04em] text-[#18171e]">Design Consultancy</h3>
                </div>
                <p className="text-base text-[#18171e]">Provide expert design consultancy for any digital product professional, ensuring seamless user experiences and impactful results.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
      {/* Contact Section */}
      <footer className="w-full flex flex-col items-center bg-[#f5f5f5] py-12 px-6">
        <div className="w-full max-w-[1040px] flex flex-col gap-8 items-center">
          <div className="bg-white rounded-2xl shadow-[0_140px_120px_-80px_rgba(99,106,125,0.04)] flex flex-row gap-8 items-center p-8 md:p-12 w-full justify-center">
            <div className="flex-1 flex flex-col gap-6">
              <h2 className="text-[40px] md:text-[48px] leading-[1.2] font-medium tracking-[-0.07em] text-left mb-2">
                Let’s Collaborate<br />Together
              </h2>
              <p className="text-base leading-[1.9em] tracking-[-0.04em] text-[#18171e] mb-4">
                Let’s turn your ideas into stunning digital experiences with creativity and precision.
              </p>
              <div className="flex gap-4 mt-2">
                <Button asChild variant="primary" className="btn">
                  <a href="https://framer.com/projects/new?duplicateType=siteTemplate&duplicate=HursNTvQAMg4NQ6yBBdO&via=octu&dub_id=lAuJ077OC9cqHw3r" target="_blank" rel="noopener">
                    Get Template
                  </a>
                </Button>
                <Button asChild variant="secondary" className="btn">
                  <a href="/get-in-touch">
                    Get In Touch
                  </a>
                </Button>
              </div>
            </div>
            <div className="w-[368px] h-[368px] rounded-2xl overflow-hidden flex-shrink-0">
              <img src="https://framerusercontent.com/images/FgLwx9z0LICr3PtyupuEGWnCEZQ.png?scale-down-to=1024" alt="Contact" className="w-full h-full object-cover rounded-2xl" />
            </div>
          </div>
          <div className="w-full flex flex-row items-center justify-between px-6 mt-8">
            <p className="text-base text-[#18171e]">© 2025 Prismora Template</p>
            <div className="flex gap-6">
              <a href="https://instagram.com" target="_blank" rel="noopener" aria-label="Instagram">
                <i className="fab fa-instagram text-[#18171e] text-2xl"></i>
              </a>
              <a href="https://x.com" target="_blank" rel="noopener" aria-label="X.com">
                <i className="fab fa-x-twitter text-[#18171e] text-2xl"></i>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener" aria-label="YouTube">
                <i className="fab fa-youtube text-[#18171e] text-2xl"></i>
              </a>
              <a href="https://dribbble.com" target="_blank" rel="noopener" aria-label="Dribbble">
                <i className="fab fa-dribbble text-[#18171e] text-2xl"></i>
              </a>
              <a href="https://behance.com" target="_blank" rel="noopener" aria-label="Behance">
                <i className="fab fa-behance text-[#18171e] text-2xl"></i>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

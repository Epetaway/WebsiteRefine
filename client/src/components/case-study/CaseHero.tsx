import { CaseStudyTheme } from "./types";

type CaseHeroProps = {
  title: string;
  subtitle: string;
  image: string;
  eyebrow?: string;
  theme: CaseStudyTheme;
};

export function CaseHero({ title, subtitle, image, eyebrow, theme }: CaseHeroProps) {
  return (
    <section className="mb-10">
      <div className="relative overflow-hidden rounded-3xl border" style={{ borderColor: theme.colors.border }}>
        <div className="absolute inset-0" style={{ background: theme.gradients.hero }} />
        <img
          src={image}
          alt={`${title} interface collage`}
          className="h-[300px] w-full object-cover object-center sm:h-[380px] lg:h-[520px]"
          loading="eager"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-8 lg:p-10">
          {eyebrow && (
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/85">{eyebrow}</p>
          )}
          <h1 className="font-['Space_Grotesk'] text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
            {title}
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/90 sm:text-base">{subtitle}</p>
        </div>
      </div>
    </section>
  );
}

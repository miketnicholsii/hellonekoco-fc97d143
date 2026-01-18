import { nekoConfig } from "@/lib/neko-config";

const CompaniesSection = () => {
  return (
    <section className="py-20 sm:py-28 bg-white">
      <div className="container mx-auto px-5 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center mb-12 sm:mb-16">
          <span className="inline-block text-[10px] sm:text-xs font-bold tracking-[0.25em] uppercase text-[#334336]/45 mb-5">
            Select collaborators
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#334336] mb-5">
            Companies I&apos;ve built with
          </h2>
          <p className="text-base sm:text-lg text-[#334336]/60">
            A small, selective list across product, strategy, and digital systems.
            Quiet work. Real outcomes.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {nekoConfig.companies.map((company) => {
            const content = (
              <>
                {company.logo ? (
                  <img
                    src={company.logo}
                    alt={company.name}
                    className="h-6 sm:h-7 w-auto max-w-full object-contain"
                  />
                ) : (
                  <span className="text-sm sm:text-base font-semibold tracking-wide text-[#334336]/70">
                    {company.name}
                  </span>
                )}
              </>
            );

            return (
              <div
                key={company.name}
                className="group rounded-2xl border border-[#EDE7E3] bg-[#F7F4F2] px-4 py-6 sm:px-5 sm:py-7 flex items-center justify-center transition-all duration-300 hover:-translate-y-1 hover:border-[#C8BFB5] hover:bg-white"
              >
                {company.url ? (
                  <a
                    href={company.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-full h-full"
                  >
                    {content}
                  </a>
                ) : (
                  <div className="flex items-center justify-center w-full h-full">
                    {content}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <p className="mt-10 text-center text-xs text-[#334336]/50">
          Not exhaustive. Just a glimpse of the kinds of teams that show up here.
        </p>
      </div>
    </section>
  );
};

export default CompaniesSection;

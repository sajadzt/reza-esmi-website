import { notFound } from "next/navigation";

import { projects } from "@/data/projects";
import ProjectVisual from "@/components/projects/ProjectVisual";
import {
  normalizeProjectAssetPath,
  normalizeProjectAssets,
} from "@/lib/project-assets";

interface ProjectPageProps {
  params: Promise<{
    category: string;
    slug: string;
  }>;
}

const categoryAliases: Record<string, string[]> = {
  industrial: ["industrial"],
  "industrial-projects": ["industrial"],

  office: ["office"],
  offices: ["office"],

  villa: ["villa"],
  villas: ["villa"],

  residential: ["residential"],
  residentials: ["residential"],
};

export default async function ProjectPage({
  params,
}: ProjectPageProps) {
  const { category, slug } = await params;

  const decodedCategory = decodeURIComponent(category);
  const decodedSlug = decodeURIComponent(slug);

  const acceptedCategories =
    categoryAliases[decodedCategory] ?? [
      decodedCategory,
    ];

  const project = projects.find(
    (item) =>
      item.slug === decodedSlug &&
      acceptedCategories.includes(item.category)
  );

  if (!project) {
    notFound();
  }

  const hero = normalizeProjectAssetPath(
    project.hero
  );

  const gallery = normalizeProjectAssets(
    project.gallery ?? []
  );

  const plans = normalizeProjectAssets(
    project.plans ?? []
  );

  return (
    <main className="relative min-h-screen bg-black text-white">

      <section className="px-6 pb-10 pt-32 md:px-10 md:pb-16 md:pt-40">

        <div className="grid gap-10 md:grid-cols-[1fr_auto] md:items-end">

          <div>

            <div className="mb-5 flex items-center gap-3">

              <span className="h-1.5 w-1.5 rounded-full bg-[#bc3019]" />

              <span className="text-[9px] uppercase tracking-[0.35em] text-white/40">
                {project.category}
              </span>

            </div>

            <h1 className="max-w-5xl text-4xl font-light tracking-tight text-white md:text-6xl lg:text-7xl">
              {project.title}
            </h1>

          </div>

          <div className="grid grid-cols-2 gap-x-10 gap-y-5 text-[9px] uppercase tracking-[0.2em] text-white/40 md:min-w-[260px]">

            <div>
              <span className="block text-white/20">
                Year
              </span>

              <span className="mt-1 block text-white/70">
                {project.year}
              </span>
            </div>

            <div>
              <span className="block text-white/20">
                Location
              </span>

              <span className="mt-1 block text-white/70">
                {project.location}
              </span>
            </div>

            <div>
              <span className="block text-white/20">
                Area
              </span>

              <span className="mt-1 block text-white/70">
                {project.area
                  ? `${project.area.toLocaleString()} m²`
                  : "—"}
              </span>
            </div>

            <div>
              <span className="block text-white/20">
                Status
              </span>

              <span className="mt-1 block text-white/70">
                {project.status}
              </span>
            </div>

          </div>

        </div>

      </section>

      <section className="relative pb-28 md:pb-40">

        <ProjectVisual
          hero={hero}
          gallery={gallery}
          plans={plans}
          title={project.title}
        />

      </section>

      <section className="border-t border-white/10 px-6 py-20 md:px-10 md:py-28">

        <div className="grid gap-12 md:grid-cols-[280px_1fr]">

          <div>
            <span className="text-[9px] uppercase tracking-[0.35em] text-white/30">
              About the project
            </span>
          </div>

          <div>

            <p className="max-w-4xl text-base leading-8 text-white/60 md:text-lg">
              {project.description}
            </p>

            {project.services &&
              project.services.length > 0 && (
                <div className="mt-12 border-t border-white/10 pt-8">

                  <span className="text-[9px] uppercase tracking-[0.3em] text-white/30">
                    Services
                  </span>

                  <div className="mt-5 flex flex-wrap gap-3">

                    {project.services.map(
                      (service) => (
                        <span
                          key={service}
                          className="
                            border
                            border-white/10
                            px-4
                            py-2
                            text-[9px]
                            uppercase
                            tracking-[0.2em]
                            text-white/55
                          "
                        >
                          {service}
                        </span>
                      )
                    )}

                  </div>

                </div>
              )}

          </div>

        </div>

      </section>

    </main>
  );
}
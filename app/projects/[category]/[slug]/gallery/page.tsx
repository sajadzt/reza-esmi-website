import { notFound } from "next/navigation";

import { projects } from "@/data/projects";
import ProjectVisual from "@/components/projects/ProjectVisual";
import {
  normalizeProjectAssetPath,
  normalizeProjectAssets,
} from "@/lib/project-assets";

interface GalleryPageProps {
  params: Promise<{
    category: string;
    slug: string;
  }>;
}

export default async function GalleryPage({
  params,
}: GalleryPageProps) {
  const { category, slug } = await params;

  const normalizedCategory =
    category.toLowerCase() === "industrial"
      ? "industrial-projects"
      : category.toLowerCase();

  const project = projects.find((item) => {
    const itemCategory =
      item.category.toLowerCase() === "industrial"
        ? "industrial-projects"
        : item.category.toLowerCase();

    return (
      item.slug === slug &&
      itemCategory === normalizedCategory
    );
  });

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
    <main className="min-h-screen bg-black text-white">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <section className="px-6 pb-10 pt-32 md:px-10 md:pb-16 md:pt-40">

        <div className="flex flex-col gap-6">

          <div className="flex items-center gap-3">

            <span className="h-1.5 w-1.5 rounded-full bg-[#bc3019]" />

            <span className="text-[9px] uppercase tracking-[0.35em] text-white/40">
              Project Documentation
            </span>

          </div>

          <h1 className="max-w-6xl text-4xl font-light tracking-tight md:text-6xl lg:text-7xl">
            {project.title}
          </h1>

        </div>

      </section>


      {/* =====================================================
          GALLERY + PLANS
          ===================================================== */}

      <section className="pb-32">

        <ProjectVisual
          hero={hero}
          gallery={gallery}
          plans={plans}
          title={project.title}
        />

      </section>

    </main>
  );
}
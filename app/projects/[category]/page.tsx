import { notFound } from "next/navigation";

import { projects } from "@/data/projects";
import CoverflowCarousel from "@/components/ui/coverflow-carousel";

type CategoryPageProps = {
  params: Promise<{
    category: string;
  }>;
};

export default async function CategoryPage({
  params,
}: CategoryPageProps) {
  const { category } = await params;

  const normalizedCategory = category.toLowerCase();

  // Get ONLY projects belonging to the selected category.
  const categoryProjects = projects.filter(
    (project) =>
      project.category.toLowerCase() === normalizedCategory
  );

  if (categoryProjects.length === 0) {
    notFound();
  }

  const title =
    normalizedCategory.charAt(0).toUpperCase() +
    normalizedCategory.slice(1);

  // Convert only the selected category's projects
  // into Coverflow slides.
  const slides = categoryProjects.map((project) => ({
    src: project.hero,
    alt: project.title,
    title: project.title,
    subtitle: `${project.location} · ${project.year}`,

    href: `/projects/${project.category}/${project.slug}`,

    meta: [
      {
        label: "Area",
        value: project.area
          ? `${project.area.toLocaleString()} m²`
          : "—",
      },
      {
        label: "Client",
        value: project.client || "—",
      },
      {
        label: "Status",
        value: project.status || "—",
      },
    ],
  }));

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <section className="px-[5vw] pt-32 pb-24">
        {/* HEADER */}

        <div className="mb-16">
          <p className="mb-4 text-xs uppercase tracking-[0.25em] text-white/40">
            Selected Projects
          </p>

          <h1 className="text-[clamp(3rem,8vw,8rem)] font-light uppercase leading-[0.85] tracking-[-0.06em]">
            {title}
          </h1>
        </div>

        {/* COVERFLOW */}

        <div className="relative w-full">
          <CoverflowCarousel
            slides={slides}
            cardWidth="clamp(220px, 34vw, 520px)"
            rotate={38}
            depth={0.55}
            perspective={3.2}
            falloff={0.6}
            fade={0.12}
            gap={0.08}
            loop
            showCaption
            showNavigation
            showPagination
            label={`${title} projects`}
          />
        </div>
      </section>
    </main>
  );
}
import Hero from "@/components/home/Hero/Hero";
import Intro from "@/components/home/Intro/Intro";
import ProjectCategories from "@/components/home/ProjectCategories/ProjectCategories";
import { projects } from "@/data/projects";

const categoryItems = [
  {
    id: "industrial",
    title: "Industrial",
    description:
      "Industrial facilities shaped around performance, people and production.",
    image: "/images/projects/industrial.jpg",
    href: "/projects/industrial",
  },
  {
    id: "offices",
    title: "Offices",
    description:
      "Work environments designed for identity, productivity and human experience.",
    image: "/images/projects/offices.jpg",
    href: "/projects/offices",
  },
  {
    id: "villas",
    title: "Villas",
    description:
      "Residential architecture balancing landscape, material and everyday life.",
    image: "/images/projects/villas.jpg",
    href: "/projects/villas",
  },
  {
    id: "residential",
    title: "Residential",
    description:
      "Residential spaces developed around light, comfort and character.",
    image: "/images/projects/residential.jpg",
    href: "/projects/residential",
  },
];

const categoryLabels: Record<string, string> = {
  industrial: "Industrial",
  offices: "Offices",
  villas: "Villas",
  residential: "Residential",
};

const categoryProjects = [
  "industrial",
  "offices",
  "villas",
  "residential",
]
  .map((category) => {
    const project = projects.find(
      (item) => item.category === category
    );

    if (!project) {
      return null;
    }

    return {
      id: category,
      title: categoryLabels[category],
      description:
        project.description ??
        `${categoryLabels[category]} architecture.`,
      tag: categoryLabels[category],
      image: project.hero,
      href: `/projects/${project.category}/${project.slug}`,
    };
  })
  .filter(
    (
      item
    ): item is {
      id: string;
      title: string;
      description: string;
      tag: string;
      image: string;
      href: string;
    } => item !== null
  );

export default function Home() {
  return (
    <main>

      <Hero />

      <Intro />

      {/* your existing manifesto / sections */}

<section className="relative w-full bg-black pt-28 pb-32 md:pt-40 md:pb-44">
  <div className="mx-auto w-full max-w-[1200px] px-6">
    <ProjectCategories />
  </div>
</section>
      {/* keep the existing Services */}
      {/* keep the existing Studio */}
      {/* keep the existing Contact */}

    </main>
  );
}
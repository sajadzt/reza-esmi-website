"use client";

import CircularCarousel, {
  type CarouselItem,
} from "@/components/ui/circular-carousel";

const categoryProjects: CarouselItem[] = [
  {
    id: "industrial",
    title: "Industrial",
    description:
      "Industrial facilities shaped around performance, people and production.",
    image:
      "/images/projects/industrial.jpg",
    href: "/projects/industrial",
  },

  {
    id: "office",
    title: "Offices",
    description:
      "Work environments designed for identity, productivity and human experience.",
    image:
      "/images/projects/offices.jpg",
    href: "/projects/office",
  },

  {
    id: "villa",
    title: "Villas",
    description:
      "Residential architecture balancing landscape, material and everyday life.",
    image:
      "/images/projects/villas.jpg",
    href: "/projects/villa",
  },

  {
    id: "residential",
    title: "Residential",
    description:
      "Residential spaces developed around light, comfort and character.",
    image:
      "/images/projects/residential.jpg",
    href: "/projects/residential",
  },
];

export default function ProjectCategories() {
  return (
    <div className="relative w-full">
      <CircularCarousel
        items={categoryProjects}
        className="w-full"
      />
    </div>
  );
}
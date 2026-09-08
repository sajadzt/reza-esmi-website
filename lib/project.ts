import { projects } from "@/data/projects";

export function getProject(slug: string) {
    return projects.find((p) => p.slug === slug);
}

export function getFeaturedProjects() {
    return projects.filter((p) => p.featured);
}

export function getProjects(category?: string) {

    if (!category) return projects;

    return projects.filter((p) => p.category === category);

}

export function getRelatedProjects(slug: string) {

    const project = getProject(slug);

    if (!project) return [];

    return projects
        .filter(
            (p) =>
                p.category === project.category &&
                p.slug !== slug
        )
        .slice(0, 3);
}
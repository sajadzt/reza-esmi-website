import Container from "@/components/layout/Container";
import ProjectItem from "./ProjectItem";
import { projects } from "@/data/projects";

export default function Projects() {
  return (
    <section>
      <Container>
        {projects.map((project) => (
          <ProjectItem key={project.id} project={project} />
        ))}
      </Container>
    </section>
  );
}
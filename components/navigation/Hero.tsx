import Button from "../ui/Button";
import Container from "../layout/Container";

export default function Hero() {
  return (
    <section className="flex min-h-screen items-center">
      <Container>
        <div className="max-w-4xl">
          <p className="mb-6 uppercase tracking-[0.35em] text-neutral-400">
            Reza Esmi Architecture
          </p>
          <h1 className="mb-8 text-6xl font-black leading-none lg:text-8xl">
            Building Beyond Concrete
          </h1>
          <p className="mb-12 max-w-2xl text-xl leading-9 text-neutral-300">
            Designing environments where architecture,
            business and people grow together.
          </p>
          <Button>
            Explore Our Work
          </Button>
        </div>
      </Container>
    </section>
  );
}
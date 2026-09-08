import Image from "next/image";
import Button from "../ui/Button";
import Container from "../layout/Container";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden">

      {/* Background */}

      <div className="absolute inset-0">

        <Image
          src="/images/hero.jpg"
          alt="Reza Esmi Architecture"
          fill
          priority
          quality={100}
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/55" />

      </div>

      {/* Content */}

      <Container className="relative z-10">

        <div className="max-w-5xl">

          <p className="mb-8 text-sm uppercase tracking-[0.45em] text-neutral-300">

            Reza Esmi Architecture

          </p>

          <h1 className="mb-8 text-6xl font-semibold leading-[0.95] md:text-7xl xl:text-[7rem]">

            Building
            <br />
            Beyond Concrete

          </h1>

          <p className="mb-14 max-w-2xl text-lg leading-9 text-neutral-300">

            We design industrial facilities,
            office buildings and commercial
            environments that improve productivity,
            human experience and long-term performance.

          </p>

          <Button>

            View Projects

          </Button>

        </div>

      </Container>

      {/* Scroll Indicator */}

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2">

        <div className="flex flex-col items-center gap-3">

          <span className="text-xs uppercase tracking-[0.35em] text-neutral-400">

            Scroll

          </span>

          <div className="h-10 w-px bg-neutral-500 animate-pulse" />

        </div>

      </div>

    </section>
  );
}
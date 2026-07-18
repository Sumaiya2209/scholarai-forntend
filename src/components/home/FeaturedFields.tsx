import Link from "next/link";
import { Cpu, Globe, Flask, GraduationCap, BookOpen, Layers } from "@gravity-ui/icons";
import { Container } from "@/components/ui/Container";
import { RESEARCH_FIELDS } from "@/lib/constants";

const fieldIcons = [Cpu, Globe, Flask, GraduationCap, BookOpen, Layers];
const fields = RESEARCH_FIELDS.map((name, i) => ({ name, icon: fieldIcons[i] }));

export function FeaturedFields() {
  return (
    <div className="border-y border-parchment-line bg-white">
      <Container className="py-14">
        <h2 className="mb-8 font-display text-2xl font-semibold text-ink">Browse by field</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {fields.map(({ name, icon: FieldIcon }) => (
            <Link
              key={name}
              href={`/explore?field=${encodeURIComponent(name)}`}
              className="group flex flex-col items-center gap-3 rounded-lg border border-parchment-line p-5 text-center transition-colors hover:border-amber hover:bg-amber/5"
            >
              <FieldIcon width={26} height={26} className="text-navy group-hover:text-amber-dark" />
              <span className="text-[13px] font-medium text-ink-muted group-hover:text-ink">{name}</span>
            </Link>
          ))}
        </div>
      </Container>
    </div>
  );
}
import { Container } from "@/components/ui/Container";
import Image from "next/image";
import cartoonImage from "../../../image/smiling-man-cartoon-character.jpg";

const tips = [
  { title: "Pick something you care about", detail: "You'll research it more thoroughly if the topic actually interests you." },
  { title: "Stay original", detail: "Build on existing work, but make sure your angle or findings are your own." },
  { title: "Get advice early", detail: "Share drafts with professors or peers before you're too deep in to change course." },
  { title: "Do thorough research", detail: "Read widely before you write — a strong paper rests on strong sources." },
  { title: "Make an outline first", detail: "Structure your argument before you draft full paragraphs." },
  { title: "Know your main points", detail: "Every section should clearly support 2–3 core claims, not wander." },
  { title: "Document everything", detail: "Cite sources as you go — reconstructing citations later wastes hours." },
];

const tabColors = ["#D98E2B", "#2F6E5B", "#5B4B8A", "#3D6A8A"];

export function ResearchTips() {
  return (
    <div className="bg-white">
      <Container className="grid grid-cols-1 items-center gap-10 py-16 lg:grid-cols-[320px_1fr]">
        {/* Illustration cluster: cartoon + notepad */}
        <div className="relative mx-auto w-full max-w-[280px] h-[300px]">
          {/* Cartoon character — sits behind/left, slightly lower */}
          <div className="absolute -left-22 -top-10 w-[200px] drop-shadow-[0_10px_16px_rgba(28,43,58,0.10)]">
            <Image
              src={cartoonImage}
              alt="Excited researcher"
              className="w-full h-auto"
            />
          </div>

          {/* Notepad — sits in front/right, overlapping the cartoon */}
          <div className="absolute right-0 top-0 w-[190px]">
            {/* sticky tabs */}
            <div className="absolute -left-4 top-10 flex flex-col gap-2 z-10">
              {tabColors.map((c) => (
                <div key={c} style={{ background: c }} className="h-6 w-8 rounded-r-sm opacity-90" />
              ))}
            </div>

            <svg viewBox="0 0 220 260" className="w-full drop-shadow-[0_10px_20px_rgba(28,43,58,0.15)]">
              <rect x="10" y="20" width="200" height="230" rx="10" fill="#FFFFFF" stroke="#DDD6C4" strokeWidth="2" />
              {Array.from({ length: 9 }).map((_, i) => (
                <circle key={i} cx={30 + i * 20} cy="20" r="5" fill="none" stroke="#B7AF98" strokeWidth="3" />
              ))}
              {Array.from({ length: 6 }).map((_, i) => (
                <line key={i} x1="30" y1={70 + i * 28} x2="190" y2={70 + i * 28} stroke="#EFEAE0" strokeWidth="2" />
              ))}
              {[1, 2, 3, 4, 5, 6].map((n, i) => (
                <text key={n} x="30" y={66 + i * 28} fontFamily="IBM Plex Mono, monospace" fontSize="12" fill="#2F6E5B">
                  {n}
                </text>
              ))}
              <g transform="rotate(35 170 60)">
                <rect x="160" y="20" width="14" height="120" rx="3" fill="#D98E2B" />
                <polygon points="160,140 174,140 167,158" fill="#EAD9B8" />
                <rect x="160" y="16" width="14" height="8" rx="2" fill="#1C2B3A" />
              </g>
            </svg>
          </div>
        </div>

        {/* Tips list */}
        <div>
          <h2 className="mb-1 font-display text-4xl font-bold text-ink">
            7 tips for a stronger research paper
          </h2>
          <p className="mb-7 text-[13px] text-ink-faint">Worth reading before you hit submit.</p>

          <ol className="grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2">
            {tips.map((tip, i) => (
              <li key={tip.title} className="flex gap-3">
                <span className="font-display text-lg font-semibold text-amber-dark">{i + 1}.</span>
                <div>
                  <div className="text-[14px] font-semibold text-ink">{tip.title}</div>
                  <div className="text-[12.5px] leading-relaxed text-ink-faint">{tip.detail}</div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </div>
  );
}
export default ResearchTips;

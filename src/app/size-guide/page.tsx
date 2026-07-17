import Link from "next/link";

export const metadata = {
  title: "Size Guide — Fashion Store",
  description: "Find your perfect fit with Fashion Store's comprehensive size guide.",
};

const categories = [
  {
    name: "Panjabi / Kurta",
    sizes: [
      { size: "S",   chest: "36–38",  length: "42", shoulder: "16.5" },
      { size: "M",   chest: "38–40",  length: "43", shoulder: "17.5" },
      { size: "L",   chest: "40–42",  length: "44", shoulder: "18.5" },
      { size: "XL",  chest: "42–44",  length: "45", shoulder: "19.5" },
      { size: "XXL", chest: "44–46",  length: "46", shoulder: "20.5" },
    ],
  },
  {
    name: "T-Shirts / Outerwear",
    sizes: [
      { size: "S",   chest: "34–36",  length: "27", shoulder: "16"   },
      { size: "M",   chest: "38–40",  length: "28", shoulder: "17"   },
      { size: "L",   chest: "40–42",  length: "29", shoulder: "18"   },
      { size: "XL",  chest: "44–46",  length: "30", shoulder: "19"   },
      { size: "XXL", chest: "46–48",  length: "31", shoulder: "20"   },
    ],
  },
  {
    name: "Trousers",
    sizes: [
      { size: "28", chest: "28",  length: "40", shoulder: "10" },
      { size: "30", chest: "30",  length: "41", shoulder: "10" },
      { size: "32", chest: "32",  length: "42", shoulder: "10" },
      { size: "34", chest: "34",  length: "42", shoulder: "10" },
      { size: "36", chest: "36",  length: "43", shoulder: "10" },
    ],
    altHeaders: ["Waist", "Length (in)"],
  },
  {
    name: "Footwear",
    sizes: [
      { size: "UK 6",  chest: "EU 39", length: "US 7",   shoulder: "24.5 cm" },
      { size: "UK 7",  chest: "EU 41", length: "US 8",   shoulder: "25.5 cm" },
      { size: "UK 8",  chest: "EU 42", length: "US 9",   shoulder: "26.5 cm" },
      { size: "UK 9",  chest: "EU 43", length: "US 10",  shoulder: "27 cm"   },
      { size: "UK 10", chest: "EU 44", length: "US 11",  shoulder: "28 cm"   },
    ],
    altHeaders: ["EU Size", "US Size", "Foot Length"],
  },
];

function SizeTable({ cat }: { cat: typeof categories[0] }) {
  const h = cat.altHeaders || ["Chest (in)", "Length (in)", "Shoulder (in)"];
  return (
    <div className="overflow-x-auto rounded-2xl border mb-8" style={{ borderColor: "var(--cream-dark)" }}>
      <table className="w-full text-sm">
        <thead style={{ background: "var(--navy)", color: "#fff" }}>
          <tr>
            <th className="px-4 py-3 text-left text-xs uppercase tracking-widest">Size</th>
            {h.map((header) => (
              <th key={header} className="px-4 py-3 text-left text-xs uppercase tracking-widest">{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {cat.sizes.map((row, i) => (
            <tr key={row.size} style={{ background: i % 2 === 0 ? "#fff" : "var(--cream)" }}>
              <td className="px-4 py-3 font-bold" style={{ color: "var(--brand)" }}>{row.size}</td>
              <td className="px-4 py-3 text-gray-700">{row.chest}</td>
              <td className="px-4 py-3 text-gray-700">{row.length}</td>
              <td className="px-4 py-3 text-gray-700">{row.shoulder}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function SizeGuidePage() {
  return (
    <div style={{ fontFamily: "var(--font-body)" }}>
      <div className="info-page-hero">
        <p className="section-label mb-3">Sizing</p>
        <h1 className="text-white" style={{ fontFamily: "var(--font-editorial)", fontSize: "clamp(2.2rem,5vw,3.5rem)" }}>
          Size Guide
        </h1>
        <p className="text-white/60 mt-4 text-sm">Find your perfect fit. All measurements in inches unless noted.</p>
      </div>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
        {/* How to measure */}
        <div className="p-6 rounded-2xl border mb-12" style={{ borderColor: "var(--cream-dark)", background: "var(--cream)" }}>
          <h2 style={{ fontFamily: "var(--font-editorial)", fontSize: "1.4rem", color: "var(--navy)" }} className="mb-4">
            How to Measure Yourself
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-gray-700">
            <div className="p-4 bg-white rounded-xl border" style={{ borderColor: "var(--cream-dark)" }}>
              <p className="font-bold mb-1" style={{ color: "var(--navy)" }}>Chest</p>
              Measure around the fullest part of your chest, keeping the tape horizontal.
            </div>
            <div className="p-4 bg-white rounded-xl border" style={{ borderColor: "var(--cream-dark)" }}>
              <p className="font-bold mb-1" style={{ color: "var(--navy)" }}>Length</p>
              Measure from the highest point of your shoulder straight down to your desired hem length.
            </div>
            <div className="p-4 bg-white rounded-xl border" style={{ borderColor: "var(--cream-dark)" }}>
              <p className="font-bold mb-1" style={{ color: "var(--navy)" }}>Shoulder</p>
              Measure across the back, from shoulder seam to shoulder seam.
            </div>
          </div>
        </div>

        {/* Tables */}
        {categories.map((cat) => (
          <section key={cat.name} className="mb-10">
            <h2 style={{ fontFamily: "var(--font-editorial)", fontSize: "1.4rem", color: "var(--navy)" }} className="mb-4">
              {cat.name}
            </h2>
            <SizeTable cat={cat} />
          </section>
        ))}

        <div className="text-sm text-gray-500 p-5 rounded-xl" style={{ background: "var(--cream)" }}>
          <strong style={{ color: "var(--navy)" }}>Tip:</strong> When between sizes, we recommend sizing up for comfort. Still unsure?{" "}
          <Link href="/contact" style={{ color: "var(--brand)" }} className="underline">Contact our team</Link> — we&apos;re happy to help you pick the right size.
        </div>
      </div>
    </div>
  );
}

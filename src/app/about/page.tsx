import Link from "next/link";
import { Users, Target, Leaf, Award } from "lucide-react";

const values = [
  { icon: <Users size={28} />, title: "Community First", desc: "We build relationships with our customers, artisans, and partners. Every thread in every garment carries the commitment of people who care." },
  { icon: <Target size={28} />, title: "Purposeful Design", desc: "Each piece in our collection is selected with rigorous attention to material quality, construction, and timeless aesthetics — not fleeting trends." },
  { icon: <Leaf size={28} />, title: "Sustainable Sourcing", desc: "We actively prioritise responsibly sourced fabrics and partner with manufacturers who share our commitment to fair wages and low environmental impact." },
  { icon: <Award size={28} />, title: "Uncompromising Quality", desc: "Our quality promise: if a piece doesn't meet our standards, it doesn't reach our shelves. We stand behind every product with a 30-day return guarantee." },
];

const team = [
  { name: "Rahul Ahmed", role: "Founder & Creative Director", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop" },
  { name: "Sadia Hossain", role: "Head of Curation", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop" },
  { name: "Tanvir Karim", role: "Operations Lead", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop" },
];

export const metadata = {
  title: "About Us — Fashion Store",
  description: "Learn about Fashion Store's story, values, and the team behind our curated collection.",
};

export default function AboutPage() {
  return (
    <div style={{ fontFamily: "var(--font-body)" }}>
      {/* Hero */}
      <div className="info-page-hero">
        <p className="section-label mb-3">Our Story</p>
        <h1 className="text-white" style={{ fontFamily: "var(--font-editorial)", fontSize: "clamp(2.2rem,5vw,3.5rem)" }}>
          Crafted with Intention
        </h1>
        <p className="text-white/60 mt-4 text-sm max-w-lg mx-auto leading-relaxed">
          Fashion Store was born from a simple belief — that great design and premium quality should be accessible to everyone.
        </p>
      </div>

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16 space-y-20">
        {/* Mission */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="section-label mb-3">Our Mission</p>
            <h2 style={{ fontFamily: "var(--font-editorial)", fontSize: "2.2rem", color: "var(--navy)", lineHeight: 1.1 }}>
              Redefining Modern Simplicity
            </h2>
            <p className="text-gray-600 mt-4 leading-relaxed">
              We curate contemporary fashion essentials for the modern wardrobe. Founded in Dhaka in 2020, Fashion Store bridges the gap between international style trends and South Asian craftsmanship — delivering pieces that feel premium, look timeless, and last for years.
            </p>
            <p className="text-gray-600 mt-3 leading-relaxed">
              Today, we work with artisans across Bangladesh, sourcing locally and ethically, while continuously expanding our collection to include international fashion-forward pieces.
            </p>
            <Link href="/products" className="btn-brand inline-flex mt-6">
              Explore Collection
            </Link>
          </div>
          <div className="relative h-80 rounded-2xl overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=800&auto=format&fit=crop"
              alt="Fashion Store craftsmanship"
              className="w-full h-full object-cover"
            />
          </div>
        </section>

        {/* Values */}
        <section>
          <div className="text-center mb-10">
            <p className="section-label mb-3">What We Stand For</p>
            <h2 style={{ fontFamily: "var(--font-editorial)", fontSize: "2rem", color: "var(--navy)" }}>Our Values</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {values.map((v) => (
              <div key={v.title} className="p-6 rounded-2xl border hover:shadow-md transition-shadow" style={{ borderColor: "var(--cream-dark)" }}>
                <span style={{ color: "var(--brand)" }} className="mb-4 block">{v.icon}</span>
                <h3 className="font-bold text-base mb-2" style={{ color: "var(--navy)" }}>{v.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Team */}
        <section>
          <div className="text-center mb-10">
            <p className="section-label mb-3">The People</p>
            <h2 style={{ fontFamily: "var(--font-editorial)", fontSize: "2rem", color: "var(--navy)" }}>Meet the Team</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {team.map((m) => (
              <div key={m.name} className="text-center">
                <div className="relative w-28 h-28 rounded-full overflow-hidden mx-auto mb-4 border-4" style={{ borderColor: "var(--brand-light)" }}>
                  <img src={m.image} alt={m.name} className="w-full h-full object-cover" />
                </div>
                <p className="font-bold" style={{ color: "var(--navy)" }}>{m.name}</p>
                <p className="text-sm text-gray-500 mt-0.5">{m.role}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Stats */}
        <section className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center py-10 border-y" style={{ borderColor: "var(--cream-dark)" }}>
          {[
            { value: "23+", label: "Curated Products" },
            { value: "4.7★", label: "Avg. Rating" },
            { value: "2020", label: "Est. Year" },
            { value: "100%", label: "Authentic" },
          ].map((s) => (
            <div key={s.label}>
              <p className="text-3xl font-bold" style={{ fontFamily: "var(--font-editorial)", color: "var(--brand)" }}>{s.value}</p>
              <p className="text-xs text-gray-500 uppercase tracking-widest mt-1">{s.label}</p>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}

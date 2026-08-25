import { SectionTitle } from "@/components/SectionTitle";
import { blogPosts } from "@/lib/constants";

export default function BlogPage() {
  return (
    <div className="mx-auto w-full max-w-7xl space-y-10 px-4 py-12 sm:space-y-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      <SectionTitle
        eyebrow="Blog"
        title="Useful travel notes for planning Sri Lanka"
        description="This page is ready for SEO-led articles, destination advice, and itinerary inspiration."
      />
      <div className="grid gap-6 lg:grid-cols-3">
        {blogPosts.map((post) => (
          <article
            key={post.slug}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-lg shadow-slate-200/50 sm:rounded-[2rem] sm:p-6"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-700">
              {post.category}
            </p>
            <h2 className="mt-4 text-xl font-semibold text-slate-950 sm:text-2xl">{post.title}</h2>
            <p className="mt-4 text-sm leading-7 text-slate-600">{post.excerpt}</p>
            <p className="mt-6 text-sm font-semibold text-slate-500">{post.readTime}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

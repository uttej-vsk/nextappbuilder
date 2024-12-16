import BlogContent from "@/app/components/BlogContent";
import { notFound } from "next/navigation";

export default async function BlogArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  const article = await builder.get("blog-article", {
    url: `/${params.slug}`,
  });

  if (!article) {
    notFound();
  }

  return (
    <div>
      <h1>{article?.data?.title}</h1>
      <BlogContent article={article} />
    </div>
  );
}
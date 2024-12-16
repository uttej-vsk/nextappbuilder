import BlogContent from "@/app/components/BlogContent";
import builder from "@builder.io/react";
import { notFound } from "next/navigation";

export default async function BlogArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  const article = await builder.get("blog-article", {
    options: {
      enrich: true,
    },
  });

  console.log(article);

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
import BlogContent from "@/app/components/BlogContent";
import { builder } from "@builder.io/react";
import { notFound } from "next/navigation";

// Fetch article data from Builder.io on the server
async function fetchArticle(slug: string) {
  try {
    const article = await builder
      .get("blog-article", {
        options: { enrich: true },
      })
      .promise();

    return article;
  } catch (error) {
    console.error("Error fetching article:", error);
    return null;
  }
}

export default async function BlogArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  const article = await fetchArticle(params.slug);

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

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const article = await fetchArticle(params.slug);

  return {
    title: article?.data?.title || "Blog Article",
    description: article?.data?.blurb || "",
    openGraph: {
      images: [article?.data?.image || ""],
    },
  };
}

import { builder } from "@builder.io/react";
import { notFound } from "next/navigation";
import ArticleRenderer from "@/app/components/ArticleRenderer";

builder.init("ee9f13b4981e489a9a1209887695ef2b");

// Fetch article data from Builder.io
async function fetchArticle(slug: string) {
  try {
    const article = await builder
      .get("blog-article", {
        options: { includeRefs: true },
        query: { "data.handle": slug },
      })
      .promise();

    return article || null;
  } catch (error) {
    console.error("Error fetching article:", error);
    return null;
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const article = await fetchArticle(params.slug);
  
  return {
    title: article?.data?.title || "Blog Article",
    description: article?.data?.blurb || "",
    openGraph: {
      images: [article?.data?.image || ""],
    },
  };
}

export default async function BlogArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  const article = await fetchArticle(params.slug);

  if (!article) {
    notFound(); // Trigger a 404 page
  }

  return (
    <ArticleRenderer
      article={article}
      metadata={{
        title: article?.data?.title || "Blog Article",
        description: article?.data?.blurb || "",
        image: article?.data?.image || "",
      }}
    />
  );
}

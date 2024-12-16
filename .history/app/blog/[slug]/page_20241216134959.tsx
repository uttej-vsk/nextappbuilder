"use client";

import BlogContent from "@/app/components/BlogContent";
import { builder } from "@builder.io/react";
import { notFound } from "next/navigation";

async function fetchArticle(handle: string) {
  try {
    const article = await builder
      .get("blog-article", {
        query: {
          "data.handle": handle,
        },
      })
      .toPromise();
    return article;
  } catch (error) {
    console.error("Error fetching article:", error);
    return null;
  }
}

export default async function BlogArticlePage({
  params,
}: {
  params: { handle: string };
}) {
  const article = await fetchArticle(params.handle);

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

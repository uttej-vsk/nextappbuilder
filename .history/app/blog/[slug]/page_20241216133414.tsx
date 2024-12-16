import React from "react";
import { builder } from "@builder.io/react";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import Head from "next/head";

builder.init("ee9f13b4981e489a9a1209887695ef2b");

const BuilderComponent = dynamic(() =>
  import("@builder.io/react").then((mod) => mod.BuilderComponent)
);

const BuilderContent = dynamic(() =>
  import("@builder.io/react").then((mod) => mod.BuilderContent)
);

// Fetch article data from Builder.io on the server
async function fetchArticle(handle: string) {
  const article = await builder
    .get("blog-article", {
      options: { includeRefs: true },
      query: { "data.handle": handle },
    })
    .toPromise();

  console.log(article);

  return article || null;
}

export default async function BlogArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  const article = await fetchArticle(params.slug);

  if (!article) {
    notFound(); // Trigger a 404 if the article is not found
  }

  return (
    <>
      <Head>
        <title>{article?.data?.title || "Blog Article"}</title>
        <meta name="description" content={article?.data?.blurb || ""} />
        <meta name="og:image" content={article?.data?.image || ""} />
      </Head>
      <div>
        <h1>{article?.data?.title}</h1>
        <BuilderContent
          content={article}
          options={{ includeRefs: true }}
          model="blog-article"
        >
          {(data, loading, fullContent) => (
            <BuilderComponent
              model="blog-article"
              content={fullContent}
              options={{ includeRefs: true }}
            />
          )}
        </BuilderContent>
      </div>
    </>
  );
}

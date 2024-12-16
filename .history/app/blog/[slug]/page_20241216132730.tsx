import { builder, BuilderComponent, BuilderContent } from "@builder.io/react";
import React from "react";
import { notFound } from "next/navigation";
import Head from "next/head";
import { RenderBuilderContent } from "@/app/components/builder";

builder.init("ee9f13b4981e489a9a1209887695ef2b");

export default async function BlogArticlePage({
  params,
}: {
  params: { handle: string };
}) {
  const { handle } = params;
  const article = await builder
    .get("blog-article", {
      options: { enrich: true },
      query: { "data.handle": handle },
    })
    .toPromise();

  console.log(article);

  if (!article) {
    notFound();
  }

  return (
    <BuilderContent
      content={article}
      options={{ enrich: true }}
      model="blog-article"
    >
      {(data, loading, fullContent) => (
        <React.Fragment>
          <Head>
            <title>{data?.title}</title>
            <meta name="description" content={data?.blurb} />
            <meta name="og:image" content={data?.image} />
          </Head>
          <div>
            <h1>{data?.title}</h1>
            <RenderBuilderContent
              model="blog-article"
              content={fullContent}
              options={{ enrich: true }}
            />
          </div>
        </React.Fragment>
      )}
    </BuilderContent>
  );
}

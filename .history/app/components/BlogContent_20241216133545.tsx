"use client";

import React from "react";
import { BuilderComponent } from "@builder.io/react";
import Head from "next/head";

export default function ArticleRenderer({
  article,
  metadata,
}: {
  article: any;
  metadata: { title: string; description: string; image: string };
}) {
  return (
    <>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="og:image" content={metadata.image} />
      </Head>
      <div>
        <h1>{metadata.title}</h1>
        <BuilderComponent
          model="blog-article"
          content={article}
          options={{ includeRefs: true }}
        />
      </div>
    </>
  );
}

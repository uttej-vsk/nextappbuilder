import { builder, BuilderComponent, BuilderContent } from "@builder.io/react";
import React from "react";

builder.init("ee9f13b4981e489a9a1209887695ef2b");
export default async function BlogArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  const article = await builder.get("blog-article", {
    options: { includeRefs: true },
  });

  if (!article) {
    return <div>Article not found</div>;
  }

  return (
    <BuilderContent
      content={article}
      options={{ includeRefs: true }}
      model="blog-article"
    >
      {(data, loading, fullContent) => (
        <React.Fragment>
          <div>
            <h1>{data?.title}</h1>
            <BuilderComponent
              model="blog-article"
              content={fullContent}
              options={{ includeRefs: true }}
              apiKey="ee9f13b4981e489a9a1209887695ef2b"
            />
          </div>
        </React.Fragment>
      )}
    </BuilderContent>
  );
}

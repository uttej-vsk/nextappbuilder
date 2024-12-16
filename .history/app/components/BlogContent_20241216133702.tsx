"use client";

import { BuilderComponent, BuilderContent } from "@builder.io/react";

export default function BlogContent({ article }) {
  return (
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
  );
}

"use client";

import { BuilderComponent, BuilderContent } from "@builder.io/react";

export default function BlogContent({ article }: { article: any }) {
  return (
    <BuilderContent
      content={article}
      options={{ includeRefs: true }}
      model="blog-article"
    >
      {(data, loading, fullContent) => (
        <Bui
          model="blog-article"
          content={fullContent}
          options={{ includeRefs: true }}
        />
      )}
    </BuilderContent>
  );
}

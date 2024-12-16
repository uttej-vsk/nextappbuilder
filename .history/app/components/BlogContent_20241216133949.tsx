"use client";

import { BuilderComponent, BuilderContent } from "@builder.io/react";
import { RenderBuilderContent } from "./builder";

export default function BlogContent({ article }: { article: any }) {
  return (
    <BuilderContent
      content={article}
      options={{ includeRefs: true }}
      model="blog-article"
    >
      {(data, loading, fullContent) => (
        <RenderBuilderContent
          model="blog-article"
          content={fullContent}
          options={{ includeRefs: true }}
        />
      )}
    </BuilderContent>
  );
}

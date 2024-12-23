"use client";
import { ComponentProps } from "react";
import { builder } from "@builder.io/react";
import { BuilderComponent, useIsPreviewing } from "@builder.io/react";

// Replace with your Public API Key
builder.init("ee9f13b4981e489a9a1209887695ef2b");

type BuilderPageProps = ComponentProps<typeof BuilderComponent>;

export function RenderBuilderContent(props: BuilderPageProps) {
  // Call the useIsPreviewing hook to determine if
  // the page is being previewed in Builder
  const isPreviewing = useIsPreviewing();
  // If "content" has a value or the section is being previewed in Builder,
  // render the BuilderComponent with the specified content and model props.
  if (props.content || isPreviewing) {
    return <BuilderComponent {...props} />;
  }

  return null;
}

// Example file structure, app/[...page]/page.tsx
// You could alternatively use src/app/[...page]/page.tsx
import { builder } from "@builder.io/sdk";
import { RenderBuilderContent } from "../../components/builder";

// Replace with your Public API Key
builder.init("");

interface PageProps {
  params: {
    page: string[];
  };
}

export default async function Page(props: PageProps) {
  const model = "announcement-bar";
  const content = await builder
    // Get the page content from Builder with the specified options
    .get("announcement-bar", {
      userAttributes: {
        // Use the page path specified in the URL to fetch the content
        urlPath: "/" + (props?.params?.page?.join("/") || ""),
      },
      // Set prerender to false to return JSON instead of HTML
      prerender: false,
    })
    // Convert the result to a promise
    .toPromise();

  return (
    <>
      {/* Render the announcemnt bar */}
      <RenderBuilderContent content={content} model={model} />
    </>
  );
}
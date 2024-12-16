import { builder, BuilderContent, getAsyncProps } from "@builder.io/react";
import React from "react";
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
    return <div>Not found</div>;
  }

  return (
    <BuilderContent
      content={article}
      options={{ enrich: true }}
      model="blog-article"
    >
      {(data, loading, fullContent) =>
        loading ? (
          <div>Loading...</div>
        ) : (
          <>
            {/* <Head>
              <title>{data?.title}</title>
              <meta name="description" content={data?.blurb} />
              <meta name="og:image" content={data?.image} />
            </Head> */}
            <div>
              <h1>{data?.title}</h1>
              <RenderBuilderContent
                model="blog-article"
                content={fullContent}
                options={{ enrich: true }}
              />
            </div>
          </>
        )
      }
    </BuilderContent>
  );
}

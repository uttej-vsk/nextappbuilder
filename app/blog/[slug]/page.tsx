import BlogContent from "@/app/components/BlogContent";
import { builder } from "@builder.io/sdk";
import { notFound } from "next/navigation";

builder.init("ee9f13b4981e489a9a1209887695ef2b");

export default async function BlogArticlePage({ params }: { params: any }) {
  const article = await builder
    .get("blog-article", {
      userAttributes: { urlPath: `/blog/${params.slug}` },
      options: { includeRefs: true },
      // query: {
      //   data: {
      //     handle: params.handle,
      //   },
      // },
    })
    .toPromise();

  if (!article) {
    notFound();
  }

  return (
    <div>
      <h1>{article?.data?.title}</h1>
      <BlogContent article={article} />
    </div>
  );
}

import BlogContent from "./BlogContent";
import { notFound } from "next/navigation";

export default async function BlogArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  const article = await fetchArticle(params.slug);

  return {
    title: article?.data?.title || "Blog Article",
    description: article?.data?.blurb || "",
    openGraph: {
        images: [article?.data?.image || ""],
      },
    };
  }

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
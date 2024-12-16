import BlogContent from './BlogContent';

export default async function BlogArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  const article = await fetchArticle(params.slug);

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
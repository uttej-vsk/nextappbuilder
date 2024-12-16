// Example file structure, app/[...page]/page.tsx
// You could alternatively use src/app/[...page]/page.tsx
import { builder } from "@builder.io/sdk";

// Replace with your Public API Key
builder.init();

interface PageProps {
  params: {
    page: string[];
  };
}

export default async function Page(props: PageProps) {
  const content = await builder

    .get("blog-article", {
      // Set prerender to false to return JSON instead of HTML
      prerender: false,
    })
    // Convert the result to a promise
    .toPromise();

  return <></>;
}



  
  // Function to fetch article data
  async function fetchArticle(handle: string) {
    const article = await builder
      .get("blog-article", {
        options: { includeRefs: true },
        query: { "data.handle": handle },
      })
      .promise();
  
    return article || null;
  }
  
  // Function to generate static parameters (similar to `getStaticPaths`)
  export async function generateStaticParams() {
    const articles = await builder.getAll("blog-article", {
      options: { includeRefs: true },
    });
  
    return articles.map((article) => ({
      handle: article.data.handle,
    }));
  }
  
  // The main page component
  export default async function BlogArticlePage({
    params,
  }: {
    params: { handle: string };
  }) {
    const { handle } = params;
    const article = await fetchArticle(handle);
  
    if (!article) {
      notFound();
    }
  
    return (
      <BuilderContent
        content={article}
        options={{ includeRefs: true }}
        model="blog-article"
      >
        {(data, loading, fullContent) => (
          <React.Fragment>
            <Head>
              <title>{data?.title}</title>
              <meta name="description" content={data?.blurb} />
              <meta name="og:image" content={data?.image} />
            </Head>
            <div>
              <h1>{data?.title}</h1>
              <BuilderComponent
                model="blog-article"
                content={fullContent}
                options={{ includeRefs: true }}
              />
            </div>
          </React.Fragment>
        )}
      </BuilderContent>
    );
  }
  
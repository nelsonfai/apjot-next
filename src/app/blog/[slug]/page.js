import React from 'react';
import FormattedText from '@/components/FormattedText';
import ArticleCard from '@/components/ArticleCard';
import LikeButton from '@/components/LikeButton';
import CommentsSection from '@/components/CommentsSection';
import CommentCounter from '@/components/CommentCounter';
import { HighlightButton } from '@/components/Highlights';
import "@/styles/blog.css";

// Format date for display
const formatDate = (date) => {
  return new Date(date).toLocaleDateString();
};

const ArticleDetails = async ({ params }) => {
  const { slug } = params;
  const baseUrl = 'https://www.apjot.blog/'
  //const baseUrl = 'http://localhost:3000/'
  // Fetch article data and related articles with no cache
  const articleResponse = await fetch(`${baseUrl}api/article/${slug}`, {
    cache: 'no-store'
  });
  const relatedResponse = await fetch(`${baseUrl}api/article/related`, {
    cache: 'no-store'
  });

  const data = await articleResponse.json();
  const relatedArticles = await relatedResponse.json();

  // Handle error if the article is not found
  if (!data || articleResponse.status !== 200) {
    return <div>Article not found</div>;
  }

  return (
    <>
      <title>{data?.title || "Apjot Blog Post"}</title>
      <meta name="description" content={data?.meta_description || "Default description"} />
      <meta name="keywords" content={data?.meta_keywords?.join(", ") || ""} />

      <div style={{ padding: '1rem', maxWidth: '800px', margin: 'auto', width: '100%' }}>
        <h1 className="title">{data?.title}</h1>
        <p className="tagline">{data?.tagline}</p>
        {data?.created && <p className="date">{formatDate(data?.created)}</p>}
        <div className="article_actions">
          <div style={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <LikeButton initialCount={data?.applauds} articleId={data.$id} />
            <CommentCounter initialCount={data?.comments?.length} articleId={data.$id} />
            <HighlightButton articleId={data.$id} />
          </div>
          <div className="audio_actions">
            {data?.audio && (
              <audio controls>
                <source src={data.audio} type="audio/ogg" />
                <source src={data.audio} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            )}
          </div>
        </div>
        <div style={{ marginBottom: '1rem' }} className="detailImage">
          <img src={data?.image} alt="" width="100%" />
        </div>
        <div className="audio_inline">
          {data?.audio && (
            <div>
              <p style={{ fontWeight: 'bold' }}>Listen to article</p>
              <audio controls style={{ marginTop: 10 }}>
                <source src={data.audio} type="audio/ogg" />
                <source src={data.audio} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </div>
          )}
        </div>
        <FormattedText body={data?.body} />
        <p>{data?.author}</p>
        <p style={{ marginBlock: '1rem' }}>
          Tags: {data?.tags && data.tags.map((tag, index) => (
            <span key={index} className="tag">
              {tag}{index !== data.tags.length - 1 && ' '}
            </span>
          ))}
        </p>
        <CommentsSection articleId={data.$id} initialComments={data?.comments} />
        <div className="hideScroll" style={{ display: 'flex', gap: 5, overflowX: 'scroll', marginBlock: 10 }}>
          {relatedArticles && relatedArticles.map((article) => (
            <ArticleCard key={article.slug} article={article} width="250px" height="150px" fontsize="16px" />
          ))}
        </div>
      </div>
    </>
  );
};

export default ArticleDetails;

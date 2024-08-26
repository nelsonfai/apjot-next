// app/blog/page.js
import {
  getAllDocuments,

} from "@/lib/context/article";
import "@/styles/blog.css";
import { generateRssFeed } from "@/lib/generateRssFeed";

import BlogContent from "@/components/BlogContent";

// This component is a Server Component by default in app directory
export default async function Blog() {
  const { data: initialData, lastId } = await getAllDocuments();
  if (initialData){
    generateRssFeed(initialData);

  }

  return (
    
    <BlogContent initialData={initialData} lastId={lastId}  className="blogContent"/>
  );
}

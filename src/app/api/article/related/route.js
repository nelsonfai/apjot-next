// app/api/article/related/route.js

import { getRelated } from '@/lib/context/article';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const relatedArticles = await getRelated();

    if (!relatedArticles || relatedArticles.length === 0) {
      return NextResponse.json({ error: 'No related articles found' }, { status: 404 });
    }

    return NextResponse.json(relatedArticles, { status: 200 });
  } catch (error) {
    console.error('Error fetching related articles:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

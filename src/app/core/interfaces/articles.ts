import { ArticleSource } from "./articles-source";

export interface Articles {
    source: ArticleSource,
    author: string,
    title: string,
    description: string,
    url: string,
    urlToImage: string,
    publishedAt: Date,
    content: string
}
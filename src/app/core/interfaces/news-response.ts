export interface NewsResponse{ 
    status: string;
    totalResults: number;
    articles: Array<Articles>;
}

export interface ArticleSource {
    id: string
    name: string
}

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
import { Articles } from "./articles";

export interface NewsResponse{ 
    status: string;
    totalResults: number;
    articles: Array<Articles>;
}
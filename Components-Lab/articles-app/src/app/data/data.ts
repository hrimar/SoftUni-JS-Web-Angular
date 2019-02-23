import { Article } from '../model/article.model';
import { data } from '../data/seed';

export class ArticleData {
  
    getData(): Array<Article> {
        const articles: Array<Article> = [];

    for (let i = 0; i < data.length; i++) {
      const currentArticle = new Article(
        data[i].title,
        data[i].description,
        data[i].author,
        data[i].imageUrl
      );

      articles.push(currentArticle);
    }

    return articles;
  }
}

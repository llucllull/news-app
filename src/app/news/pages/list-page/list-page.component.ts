import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {NewsListModuleComponent} from "../../components/news-list-module/news-list-module.component";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";
import {CommonModule} from "@angular/common";
import {NewsService} from "../../services/news.service";

@Component({
  selector: 'list-page',
  standalone: true,
  imports: [NewsListModuleComponent, CommonModule],
  templateUrl: './list-page.component.html',
  styleUrl: './list-page.component.scss'
})
export class ListPageComponent implements OnInit, OnDestroy {
  category: string | null = null;
  categorySubscription: Subscription | null = null;

  news: any[] = [];
  newsSubscription: Subscription | null = null;

  constructor(private route: ActivatedRoute, private newsService: NewsService) {}

  ngOnInit() {
    this.categorySubscription = this.route.paramMap.subscribe(paramMap => {
      this.category = paramMap.get('category');
      if (this.category) {
        this.fetchNewsByCategory(this.category);
      }
    });
  }

  fetchNewsByCategory(category: string) {
    if (this.newsSubscription) {
      this.newsSubscription.unsubscribe();
    }

    this.newsSubscription = this.newsService.getNewsByCategory(category).subscribe(
      data => {
        this.news = data.articles.filter(this.isNewsValid);
      },
      error => {
        console.error('Error fetching news:', error);
      }
    );
  }

  isNewsValid(newsItem: any): boolean {
    return !(
      newsItem.title === '[Removed]' ||
      newsItem.description === '[Removed]' ||
      newsItem.author === null ||
      newsItem.title === null ||
      newsItem.urlToImage === null ||
      newsItem.content === '[Removed]'
    );
  }

  ngOnDestroy() {
    if (this.categorySubscription) {
      this.categorySubscription.unsubscribe();
    }
    if (this.newsSubscription) {
      this.newsSubscription.unsubscribe();
      this.news = [];
    }
  }
}

import {Component, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {NewsModuleComponent} from "../../components/news-module/news-module.component";
import {NewsService} from "../../services/news.service";

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, NewsModuleComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent implements OnInit{
  firstArticle: any[] = [];
  news: any[] = [];

  constructor(private newsService: NewsService) {}

  ngOnInit() {
    this.newsService.getTopHeadlinesNews().subscribe(data => {
      this.firstArticle = data.articles[0];
      this.news = data.articles.slice(1);
    },
    error => console.error('Error fetching news:', error)
    );
  }
}

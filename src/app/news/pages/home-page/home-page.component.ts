import {Component, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {NewsModuleComponent} from "../../components/news-module/news-module.component";
import {NewsService} from "../../services/news.service";
import {PreferencesService} from "../../services/preferences.service";

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
  data: any[] = [];
  activePreferences: string[] = [];

  constructor(private newsService: NewsService, private preferencesService: PreferencesService) {}

  ngOnInit() {
    this.newsService.getTopHeadlinesNews().subscribe(data => {
      this.data = data.articles.filter(this.isNewsValid);
      this.firstArticle = this.data[0];
      this.news = this.data.slice(1);
    },
    error => console.error('Error fetching news:', error)
    );
    this.preferencesService.preferences$.subscribe(prefs => {
      this.activePreferences = prefs;
    });
  }

  isNewsValid(newsItem: any): boolean {
    return !(
      newsItem.title === '[Removed]'
    );
  }
}

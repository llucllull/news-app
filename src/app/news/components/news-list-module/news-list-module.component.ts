import {Component, Input} from '@angular/core';
import {CommonModule} from "@angular/common";

@Component({
  selector: 'news-list-module',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './news-list-module.component.html',
  styleUrl: './news-list-module.component.scss'
})
export class NewsListModuleComponent {
  @Input() newsItem: any;
}

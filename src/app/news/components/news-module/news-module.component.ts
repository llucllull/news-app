import {Component, Input} from '@angular/core';
import {CommonModule} from "@angular/common";

@Component({
  selector: 'news-module',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './news-module.component.html',
  styleUrl: './news-module.component.scss'
})
export class NewsModuleComponent{
  @Input() newsItem: any;
  @Input() showImage: boolean = true;
  @Input() showDescription: boolean = true;
}

import { Component } from '@angular/core';
import {NavBarComponent} from "./components/nav-bar/nav-bar.component";
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'news',
  standalone: true,
  imports: [NavBarComponent, RouterOutlet],
  templateUrl: './news.component.html',
  styleUrl: './news.component.scss'
})
export class NewsComponent {

}

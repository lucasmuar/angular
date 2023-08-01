import { Component } from '@angular/core';
import { GifsService } from 'src/app/gifs/services/gifs.service';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  constructor(private gifsService: GifsService) { }

  // public tags = this.gifsService.tagsHistory;
  get tags() {
    return this.gifsService.tagsHistory;
  }

  clickTag(tag: string) {
    return this.gifsService.searchTags(tag)
  }
}

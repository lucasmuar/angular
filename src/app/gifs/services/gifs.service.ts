import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  public gifsList: Gif[] = [];

  private _tagsHistory: string[] = [];
  private apiKey: string = 'tCog0GwcVSdOQwHVwiTD3fd4f3Ou5HSk';
  private serviceUrl = 'http://api.giphy.com/v1/gifs';

  constructor(private http: HttpClient) {
    this.loadLocalStorage();
  }

  get tagsHistory(): string[] {
    return [...this._tagsHistory];
  }

  private organizeHistory(tag: string){
    tag = tag.toLowerCase();

    if(this._tagsHistory.includes(tag)){
      this._tagsHistory = this._tagsHistory.filter( (oldTag) => oldTag !== tag);
    }

    this._tagsHistory.unshift(tag);
    this._tagsHistory = this._tagsHistory.slice(0, 10);
    this.saveLocalStorage();
  }

  searchTags(tag: string): void {

    if(tag.length === 0) return;
    this.organizeHistory(tag);

    const params = new HttpParams()
                  .set('api_key', this.apiKey)
                  .set('limit', 10)
                  .set('q', tag);

    this.http.get<SearchResponse>(`${this.serviceUrl}/search?${params}`)
    .subscribe( (res) => {
        this.gifsList = res.data;

        console.log(this.gifsList);

      });
  }

  private saveLocalStorage(){

    localStorage.setItem('history', JSON.stringify(this.tagsHistory));

  }

  private loadLocalStorage(){

    if(!localStorage.getItem('history')) return ;

    this._tagsHistory = JSON.parse(localStorage.getItem('history')! );

    if(this._tagsHistory.length === 0) return ;

     this.searchTags(this._tagsHistory[0]);

  }



}

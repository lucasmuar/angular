import { Component, OnInit } from '@angular/core';
import {  Input } from '@angular/core';
import { Gif } from 'src/app/gifs/interfaces/gifs.interfaces';


@Component({
  selector: 'gifs-card',
  templateUrl: './gif-card.component.html',
})
export class GifCardComponent implements OnInit{

  @Input()
  public gif!: Gif;

  ngOnInit(): void {
    if( !this.gif )  throw new Error('Method not implemented.');
  }
}

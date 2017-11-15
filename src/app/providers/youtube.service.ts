import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class YoutubeService {

  private youtubeUrl:string = "https://www.googleapis.com/youtube/v3";
  private apikey:string = "AIzaSyCCCFI6cpDNGX2CGWMMeG20FZ-4FgFVnKc";
  private playlist:string = "UUuaPTYj15JSkETGnEseaFFg";
  private nextPageToken:string = "";
  // Lista uploads UUz3Nxrk_2nqVO2O40iD03Fw     UUuaPTYj15JSkETGnEseaFFg     CAoQAA



  constructor( public http:Http ) { }

  getVideos(){
    let url = `${ this.youtubeUrl }/playlistItems`;

    // esto ayuda a no tener que poner los parametros en url ya que complicaria la url
    let params = new URLSearchParams();

    params.set('part','snippet');
    params.set('maxResults','10');
    params.set('playlistId',this.playlist);
    params.set('key',this.apikey);

    if ( this.nextPageToken ) {
          params.set('pageToken',this.nextPageToken);
    }

    return this.http.get( url, { search: params } )
              .map( res=>{
                 console.log(res.json() );
                 this.nextPageToken = res.json().nextPageToken;

                 let videos:any[]=[];
                 for( let video of res.json().items ){
                   let snippet = video.snippet;
                   videos.push( snippet );
                 }

                 return videos;
              })
  }

}

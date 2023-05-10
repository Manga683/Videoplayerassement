import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ViewChild ,OnInit} from '@angular/core';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-videoscreen',
  templateUrl: './videoscreen.component.html',
  styleUrls: ['./videoscreen.component.scss']
})
export class VideoscreenComponent implements OnInit{

  authtoken=""

  name = 'Video events';
  videoSource = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4";

@ViewChild('videoPlayer') videoplayer: any;
public startedPlay:boolean = false;
public show:boolean = false;
videos:any= [
  // {
  //   "id": "1",
  //   "name": "Big Buck Bunny",
  //   "url": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
  // },
  // {
  //   "id": "10",
  //   "name": "Tears of Steel",
  //   "url": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4"
  // },
  // {
  //   "id": "2",
  //   "name": "Big Buck Bunny",
  //   "url": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
  // },
  // {
  //   "id": "10",
  //   "name": "Tears of Steel",
  //   "url": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4"
  // },
  // {
  //   "id": "3",
  //   "name": "Big Buck Bunny",
  //   "url": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
  // },
  // {
  //   "id": "10",
  //   "name": "Tears of Steel",
  //   "url": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4"
  // }
]
newArray:any=[];
headers: HttpHeaders | undefined;

constructor(private http:HttpClient,private serv:AuthService){

}
ngOnInit():void{

  this.getvideolinks();
  console.log(this.videos);

}

pauseVideo(videoplayer:any)
{
  videoplayer.nativeElement.play();
  // this.startedPlay = true;
  // if(this.startedPlay == true)
  // {
     setTimeout(() =>
     {
      videoplayer.nativeElement.pause();
       if(videoplayer.nativeElement.paused)
      {
        this.show = !this.show;
      }
     }, 5000);
  // }
}

// closebutton(videoplayer:any){
//   this.show = !this.show;
//   videoplayer.nativeElement.play();
// }

getvideolinks(){
  this.headers = new HttpHeaders({
    'Authorization': `Bearer ${this.serv.authtoken}`
  });
  console.log("headers",this.headers);

  this.http.get("http://localhost:3000/api/videos",{ 'headers': this.headers }).subscribe((data:any)=>{
    console.log("data",data);
    this.videos=data.videos;
    console.log("manga",this.videos);

  })
}





video(id:any){
  this.newArray=this.videos.filter((eachItem:any)=>{
    console.log("hi",eachItem.id , id)
    if(eachItem.id == id){
      console.log("h1",eachItem)
      return eachItem
    }
  });
  // console.log(this.videos);
  console.log("newarray",this.newArray);
}

}

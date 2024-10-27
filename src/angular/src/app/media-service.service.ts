import { Injectable } from '@angular/core';
import { User } from './models/user';
import { Media, Video, Picture } from './models/media';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

export class MediaServiceService {
  media: Media
  video: Video
  pic: Picture
  baseUrl: string
  uploadUrl: string
  getMediaUrl: string

  constructor(private http: HttpClient) {
    this.media = this.mediaObj()
    this.baseUrl = 'http://127.0.0.1:5000/'
    this.uploadUrl = this.baseUrl + 'upload/'
    this.getMediaUrl = this.baseUrl + 'media/search/all/'
   }

  public uploadMediaMetadata(media_metadata) {
    console.log("Uploading Media service call")
    return this.http.post<Media>(this.uploadUrl, media_metadata)
  }

  public getUserMedia(uid){
    console.log("Get all user media service call")
    return this.http.get(this.getMediaUrl + uid)
  }

  public mediaObj() {
    console.log("Instantiate media object")
    let ts = new Date()
    let data:Media = {
    _id: '1',
    filename: '',
    owner: '',
    type: '',
    path: '',
    ext: '',
    visible: false,
    timestamp: ts
  }
    return data
  }
}

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Media } from '../models/media';
import { Form, FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MediaServiceService } from '../media-service.service';
import { UserServiceService } from '../user-service.service';
import { User } from '../models/user';
// import * as fs from 'file-system';
import { mkdir } from 'fs';
import { File } from 'buffer';
 
@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.scss'
})
export class UploadComponent {
  readonly uploadForm = inject(MatDialog)
  openForm() {
    this.uploadForm.open(UploadFormComponent)
  }
}

@Component({
  selector: 'upload-form',
  templateUrl: 'upload-form.html',
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent, 
            MatDialogActions, MatDialogClose, 
            MatButtonModule, ReactiveFormsModule,
            MatSlideToggleModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UploadFormComponent {
    public = true
    file: any
    media: Media
    imagePath: string
    videoPath: string
    baseUrl: string
    uploadForm = new FormGroup({
    filename: new FormControl('', Validators.required),
    path: new FormControl('', Validators.required)
  })
  constructor(private mediaService:MediaServiceService, private userService:UserServiceService) {
    this.media = this.mediaService.mediaObj()
  }
  onSubmit = () => {
    console.log(this.public)
    console.log("Submitting Upload")
    this.media.filename = this.uploadForm.value['filename']
    this.media.owner = this.userService.fetchUsrID()
    this.media.path = this.uploadForm.value['path']
    this.media.type = 'IMG'
    this.media.visible = this.public
    this.media.timestamp = new Date()

    console.log(this.media)
    this.mediaService.uploadMediaMetadata(this.media).subscribe(data  => {
      if (data._id != '1'){
        console.log("successful metadata upload");
        Promise.resolve(this.uploadFile(event, this.media, 1));
      }
    })
  }

  onFileChange = (event) => {
    const file = event.target.files[0];
    console.log(file);
    this.file = file;
  }

  uploadFile = (event, media_metadata, dPath) => {
    console.log(this.file);
    console.log(oPath);
    console.log(dPath);
    let file = this.file;
    const uploadData = new FormData();
    uploadData.append('uploadFile', file, )

  }

  togglePublic() {
    console.log(this.public)
    this.public == true ? this.public = false : this.public = true 
    console.log(this.public)
  }
}
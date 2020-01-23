import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ImageCroppedEvent, OutputType } from 'ngx-image-cropper';

@Component({
    selector: 'app-profile-image-dialog',
    templateUrl: './profile-image-dialog.template.ng.html',
    styleUrls: ['profile-image-dialog.component.scss'],
})
export class ProfileImageDialogComponent implements OnInit {
    public readonly outputType: OutputType = 'both';
    public bytesForOneMb = 1048576;
    public imageChangedEvent: Event;
    public croppedImage: Blob;
    public previewImage: string;
    public allowedImageTypes = [
        'image/jpg',
        'image/jpeg',
        'image/tif',
        'image/png',
        'image/gif',
    ];
    public showCropper = false;
    public fileSizeInMb: number;
    public fileType: string;
    public isOfCorrectType = true;
    public readonly allowedImageSizeInMb = 2;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: Event,
        private readonly dialogRef: MatDialogRef<ProfileImageDialogComponent>,
    ) {}

    public ngOnInit(): void {
        this.validateImage(this.data);
        this.imageChangedEvent = this.data;
    }

    public imageCropped(event: ImageCroppedEvent): void {
        this.previewImage = event.base64;
        this.croppedImage = event.file;
    }

    public imageLoaded(): void {
        this.showCropper = true;
    }

    public fileChange(fileEvent: Event): void {
        this.validateImage(fileEvent);
        this.imageChangedEvent = fileEvent;
    }

    public validateImage(fileEvent: Event): void {
        const fileSizeInBytes = (fileEvent.target as any).files[0].size;
        this.fileType = (fileEvent.target as any).files[0].type;
        this.isOfCorrectType = this.allowedImageTypes.includes(this.fileType);
        this.fileSizeInMb = this.getFileSizeInMb(fileSizeInBytes);
    }

    public handleSave(): void {
        const imageDataToEmit = {
            imageAsBase64: this.previewImage,
            imageAsFile: this.croppedImage,
        };

        this.dialogRef.close(imageDataToEmit);
    }

    private getFileSizeInMb(fileSizeInBytes: number): number {
        return fileSizeInBytes / this.bytesForOneMb;
    }
}

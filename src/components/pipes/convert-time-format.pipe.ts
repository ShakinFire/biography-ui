import { Pipe, PipeTransform } from '@angular/core';
import { BiographyService } from '../services/biography.service';

@Pipe({ name: 'convertTimeFormat' })
export class ConvertTimeFormatPipe implements PipeTransform {
    constructor(private readonly biographyService: BiographyService) {}

    public transform(createdAtComment: Date): string {
        return this.biographyService.convertDateFormat(createdAtComment);
    }
}

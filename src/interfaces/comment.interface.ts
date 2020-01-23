import { ILifecycleTimestamps } from './base.interface';

export interface IComment extends ILifecycleTimestamps {
    id: string;
    content: string;
    biographyId: string;
    userId: string;
}

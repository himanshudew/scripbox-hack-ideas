export interface IhackIdea {
    _id?: string;
    title: string;
    description: string;
    tags: string | string[];
    upvote: number;
    creationDateTime: string;
}
export interface IEBook {
    id: number;
    title: string;
    genreId: number[];
    authorId: number[];
    languageId: number;
    publisherId: number;
    description: string;
    download: number;
    views: number;
    rating: number;
    coverImage: Buffer;
    file: Buffer;
}
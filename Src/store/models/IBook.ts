export interface IBook {
    id: number;
    title: string;
    genreId: number[];
    authorId: number[];
    languageId: number;
    publisherId: number;
    description: string;
    number: number;
    numberAvailable: number;
    coverImage: Buffer;
}
export interface IBooks{
    id:string  ;
    title: string;
    author: string;
    image: string;
    genre: string;
    summary: string;
    publicationDate:number;
    comments:string[];
    addedBy: string | null;
    
}
export interface IWish{
    id:string,
    bookId:string,
    userEmail:string
    
}


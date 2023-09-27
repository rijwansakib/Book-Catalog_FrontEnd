import { Button } from '@/components/ui/button'
import { IBooks } from '@/types/globalTypes'
import { Link } from 'react-router-dom'

export default function BookCard({ book }: { book: IBooks }) {
    return (
        <div key={book.id} className="rounded-xl  flex flex-col 
         justify-between p-5 overflow-hidden 
         shadow-md border border-gray-100 hover:shadow-2xl
          hover:scale-[102%] transition-all gap-2 items-center">

            <img className='w-2/3' src={book.image} alt="book" />
            <h1 className="text-xl font-semibold">{book.title}</h1>
            <p>
                <span className="text-gray-500 font-bold">Author: {book.author}</span>
            </p>
            <p>
                <span className="text-gray-500 font-bold">Genre: {book.genre}</span>
            </p>
            
            <p>
                <span className="text-gray-500 font-bold">Publication Date: {book.publicationDate}</span>
            </p>

            <Link to={`/book-details/${book.id}`}>
                <Button variant="default">
                    See Details
                </Button>
            </Link>

        </div>
    )
}

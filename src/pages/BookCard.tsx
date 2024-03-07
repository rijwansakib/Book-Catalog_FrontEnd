import { IBooks } from '@/types/globalTypes'
import { Link } from 'react-router-dom'

export default function BookCard({ book }: { book: IBooks }) {
    return (
        <div key={book.id} className="border rounded">
            <div className='flex justify-center'>
                <img className='w-full h-72 object-fill' src={book.image} alt="book" />
            </div>
            <div className='py-2 px-2 text-base font-semibold '>
                <h1 >{book.title}</h1>
            </div>
            <div className='py-2 px-2 text-sm '>
                <p>Author: <span className='font-semibold'>{book.author}</span></p>
                <p>Genre: <span className='font-semibold'>{book.genre}</span></p>
                <p>Publication Date: <span className='font-semibold'>{book.publicationDate}</span></p>
            </div>

            <div className='px-2 py-1'>
                <Link to={`/book-details/${book.id}`}>
                    <button className='text-base px-2 py-1 border text-white bg-blue-500 rounded
                    hover:bg-blue-900
                    '>
                        See Details
                    </button>
                </Link>
            </div>

        </div>
    )
}

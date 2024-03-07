import { Link } from 'react-router-dom'
import { useGetBooksQuery } from '@/redux/book/bookApi';
import { IBooks } from '@/types/globalTypes';
export default function Books() {
  const { data, isLoading } = useGetBooksQuery(undefined);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data || data.length === 0) {
    return <div>No books available.</div>;
  }
  //Get the last 10 books from the data array
  const last10Books = data.data.slice(-10);
  return (
    <div className='w-3/4 m-auto grid grid-cols-4 gap-4'>
      {last10Books.map((book: IBooks) => (
        <div key={book.id} className="rounded-xl flex flex-col items-center justify-center p-5 overflow-hidden shadow-md border border-gray-100 hover:shadow-2xl hover:scale-[102%] transition-all gap-2">
          <Link to={`/book-details/${book.id}`} className="w-full">
            <img className='w-40 h-40 object-fill' src={book.image} alt="book" />
            <div className='py-2 px-2'>
              <h1 className="text-base  font-semibold">{book.title}</h1>
              <h1 className="text-md">{book.author}</h1>
            </div>
          </Link>
        </div>
      ))}

    </div>
  )
}
import { useGetDetailsBooksQuery } from '@/redux/book/bookApi'
import { Link, useParams, } from 'react-router-dom';
import ReviewBooks from './ReviewBooks';
import { Button } from '@/components/ui/button';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import DeleteBook from './DeleteBook';
import { addToWishlist } from '@/redux/wishList/wishListSlice';
import { useAddToWishlistMutation } from '@/redux/wishList/wishListApi';
export default function BooksDetails() {
    const { user } = useAppSelector(state => state.user)
    const [addToWishlistAPI] = useAddToWishlistMutation();
    const dispatch = useAppDispatch();
    const { id } = useParams()
    const { data, isLoading, isError } = useGetDetailsBooksQuery(id, {
        refetchOnMountOrArgChange: true,
        pollingInterval: 10000,
    });
    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (isError) {
        return <div>Error loading book details</div>;
    }

    const books = data.data;
    const varifyUser = user.email && books.addedBy === user.email
    const wishlistItem = {
        bookId: books.id,
        userEmail: user.email,
    };
    const handleAddBook = () => { 
        dispatch(addToWishlist(books));      
        addToWishlistAPI(wishlistItem)
    };

    return (
        <div>
            <h1 className='text-5xl text-center font-serif mt-5'>Book Details</h1>
            {books ? (
                <>
                    <div className='flex items-center justify-center mt-16 gap-x-16' key={books.id}>
                        <div>
                            <img className='w-80' src={books.image} alt="book" />
                        </div>
                        <div className='mt-10'>
                            <h1 className='font-bold text-3xl'>Title:{books?.title}</h1>
                            <p className='font-bold text-xl'>Author:{books?.author}</p>
                            <p className='font-bold text-xl'>Genre:{books?.genre}</p>
                            <p className='font-bold text-xl'>PublicationYear:{books?.publicationDate}</p>
                        </div>

                    </div>
                    {/* ... other code */}
                    <div className='flex justify-end gap-4 mb-10 p-10'>
                        {user.email &&
                            <div >
                                <Button variant="default"
                                    onClick={handleAddBook}
                                >
                                    Add to Wish List
                                </Button>
                            </div>

                        }
                        {varifyUser && (
                            <div className='flex gap-5'>
                                <Link to={`/edit-book/${books.id}`}>
                                    <Button>Edit</Button>
                                </Link>
                                {user ? (
                                    <DeleteBook />
                                ) : (
                                    <p>Loading user data...</p>
                                )}
                            </div>
                        )}
                    </div>

                    <div className='bg-slate-100 shadow-gray-100 '>
                        <h1 className='font-bold text-4xl text-center p-5'>Book Summary</h1>
                        <div className='w-5/6 m-auto mt-10 mb-20'>
                            <p className='font-semibold text-lg p-10 '>{books?.summary}</p>
                        </div>
                    </div>

                </>


            ) : (
                <div>No book data available</div>
            )}

            <ReviewBooks></ReviewBooks>

        </div>

    );
}


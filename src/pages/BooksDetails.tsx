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
            {books ? (
                <>
                    <div className='bg-sky-800 h-96 relative'>
                        <div className='absolute bottom-[-25%] left-[45%]'>
                            <img className='w-64 h-72  border' src={books.image} alt="book" />
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
                        <h1 className='font-bold text-lg px-2'>Book Summary</h1>
                            <p className='font-semibold text-md px-2 py-2'>{books?.summary}</p>
                    </div>

                </>


            ) : (
                <div>No book data available</div>
            )}

            <ReviewBooks></ReviewBooks>

        </div>
    );
}


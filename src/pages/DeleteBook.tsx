import { Button } from '@/components/ui/button';
import { useDeleteBookMutation, useGetDetailsBooksQuery } from '@/redux/book/bookApi';
import { useAppSelector } from '@/redux/hook';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function DeleteBook() {
    const [isDeleted, setIsDeleted] = useState(false);
    const [deleteBook] = useDeleteBookMutation();
    const { user } = useAppSelector(state => state.user)
    const { id } = useParams()
    const { data } = useGetDetailsBooksQuery(id);  
    const books = data.data;
    const varifyUser = books.addedBy === user.email
    const navigate = useNavigate()
    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this book?")) {
            if (varifyUser) {
                await deleteBook(id);
                setIsDeleted(true);
            }
            setTimeout(() => {
                navigate("/all-books");
            }, 500);
        }
    };


    return (
        <div>
            <div>
                <h1>{}</h1>
            </div>
            {isDeleted ? (
                <p>Book has been deleted.</p>
            ) : (
                <Button onClick={handleDelete}>Delete Book</Button>
            )}
        </div>
    );
}

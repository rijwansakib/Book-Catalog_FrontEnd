import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useGetWishlistsQuery } from "@/redux/wishList/wishListApi";
import { IBooks } from "@/types/globalTypes";
import { useParams } from "react-router-dom";
import DeleteWish from "./DeleteWish";
import { useAppSelector } from "@/redux/hook";

export default function WishListCart() {
    const { id } = useParams();
    const { data } = useGetWishlistsQuery(id);
    const wishlistId = data?.data || [];
    const wishlist = wishlistId.map((dataItem: { _id: unknown; }) => dataItem._id);
    const book = data?.data || [];
    const bookIdObjects = book.map((dataItem: { bookId: IBooks[]; }) => dataItem.bookId[0]);
    const { user } = useAppSelector((state) => state.user);
    const loginUser = user.email
    const wishlistEmail = wishlistId.map((dataItem: { userEmail: string; }) => dataItem.userEmail);

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline">Wish List</Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Wish List</SheetTitle>
                </SheetHeader>
                <ScrollArea className="h-[650px] w-[350px] rounded-md border p-4">
                    <div className="space-y-5">
                        {bookIdObjects?.map((book: IBooks, index: number) => {
                            const bookWishlistId = wishlist[index];
                            if (loginUser === wishlistEmail[index]) {
                                return (
                                    <div key={book.id} className="flex justify-between items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                                        <img className="rounded-t-lg md:h-auto w-24 object-contain  md:rounded-none md:rounded-s-lg" src={book?.image} alt="" />
                                        <div className="">
                                            <h5 className="text-sm font-bold tracking-tight text-gray-900 dark:text-white">{book?.title.slice(0,10)+'...'}</h5>
                                            <p className="font-normal text-gray-700 dark:text-gray-400">{book?.author}</p>
                                        </div> 
                                        <div className="px-1">
                                            <DeleteWish key={index} wishlistId={bookWishlistId} />
                                        </div>
                                    </div>

                                );
                            } else {
                                return null;
                            }
                        })}
                    </div>
                </ScrollArea>
            </SheetContent>
        </Sheet>
    );
}
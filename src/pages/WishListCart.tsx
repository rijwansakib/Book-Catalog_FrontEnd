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
                                    <div className="border h-36 p-3 flex  rounded-md" key={book.id}>
                                        <div className="border-r shrink-0">
                                            <img src={book?.image} alt="" className="h-full" />
                                        </div>
                                        <div className="px-2 w-full flex flex-col gap-3">
                                            <h4 className="text-sm font-semibold self-center">{book?.title}</h4>
                                            <p className="text-sm self-center">Author: {book?.author}</p>
                                        </div>
                                        <div className="border-l pl-5 flex flex-col justify-between">
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
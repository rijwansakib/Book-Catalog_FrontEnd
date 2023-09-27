import { Button } from '@/components/ui/button';
import { useRemoveFromWishlistsMutation } from '@/redux/wishList/wishListApi';
import { HiOutlineTrash,} from 'react-icons/hi';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function DeleteWish({ wishlistId}:any) {    
    const [removeFromWishlist] = useRemoveFromWishlistsMutation();
    return (
        <div>
            <Button onClick={() => removeFromWishlist(wishlistId)}>
                <HiOutlineTrash size="20" />
            </Button>
        </div>
    );
}

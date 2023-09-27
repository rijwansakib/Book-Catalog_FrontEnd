import { Button } from '@/components/ui/button'
import logo from '../assets/image/logo.png'
import { Link } from 'react-router-dom'
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { useAppDispatch, useAppSelector } from '@/redux/hook'
import { signOut } from 'firebase/auth'
import { auth } from '@/lib/fireBase'
import { setUser } from '@/redux/user/userSlice'
import WishListCart from '@/pages/WishListCart'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

export default function Navbar() {

  const { user } = useAppSelector(state => state.user)
  const dispatch = useAppDispatch()

  const handelLogout = () => {
    signOut(auth).then(() => {
      dispatch(setUser(null));
    });
  }
  return (
    <nav className="w-full h-16 fixed top backdrop-blur-lg z-10">
      <div className="h-full w-full bg-white/60">
        <div className="flex items-center justify-between w-full md:max-w-7xl h-full mx-auto ">
          <div>
            <Link to="/">
              <img className="h-32" src={logo} alt="log" />
            </Link>
          </div>
          <div>
            <ul className="flex items-center">
              <li>
                <Button variant="link" asChild>
                  <Link to="/">Home</Link>
                </Button>
              </li>
              <li>
                <Button variant="link" asChild>
                  <Link to="/all-books">Books</Link>
                </Button>
              </li>
              <li>
                <WishListCart />
              </li>
              <li>

              </li>
              <li className="ml-5">

                <Sheet>
                  <SheetTrigger asChild>
                    <Avatar>
                      <AvatarImage className='w-10 rounded-full' src="https://github.com/shadcn.png" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </SheetTrigger>

                  <SheetContent>
                    <SheetHeader>
                      <SheetTitle>Profile</SheetTitle>
                      {user.email &&
                        <>
                          <SheetClose asChild>
                            <Link to="/profile">
                              PROFILE
                            </Link>
                          </SheetClose>
                          <SheetClose asChild>
                            <Link to="/add-book">
                              Add Book
                            </Link>
                          </SheetClose>
                        </>
                      }
                      {!user.email && <>
                        <SheetClose asChild>
                          <Link to="/login">
                            Login
                          </Link>
                        </SheetClose>
                        <SheetClose asChild>
                          <Link to="/signup">
                            signUp
                          </Link>
                        </SheetClose>
                      </>
                      }{
                        user.email &&
                        (
                          <SheetClose asChild>
                            <Link onClick={handelLogout} to={''}>
                              Logout
                            </Link>
                          </SheetClose>

                        )
                      }

                    </SheetHeader>
                  </SheetContent>
                </Sheet>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav >
  )
}


import { useEffect } from "react";
import MainLayout from "./layouts/MainLayout"
import { useAppDispatch } from "./redux/hook";
import { setLoding, setUser } from "./redux/user/userSlice";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./lib/fireBase";
function App() {
  const dispatch = useAppDispatch();

  useEffect(()=>{
    dispatch (setLoding(true));
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setUser(user.email));
        dispatch(setLoding(false))
      } else{
        dispatch(setLoding(false))
      }
    });
  },[dispatch])
  return (
    <>
    <MainLayout/>
    </>
  )
}

export default App

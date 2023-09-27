import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { useAppSelector } from '@/redux/hook';

export default function profile() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { user } = useAppSelector((state) => state.user);
  const loginUser = user.email

  return (
    loginUser ? (

      <div className="container mx-auto rounded-lg bg-gradient-to-r
    from-stone-800 via-slate-600 to-slate-300 text-white mt-10 p-6">
        <div>
          <div className="col-span-1 md:border-r border-white border-opacity-30">
            <div className="text-center">
              <img
                className="w-32 h-32 mx-auto rounded-full mb-3 border-4 border-white border-opacity-40"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfyzTkEY3Uui9Tnb6aL9XX36iYGrQ_Fiy1KEn98K9ndNPXQCN5t7Tgr-7gl4szcWlhnzU&usqp=CAU"
                alt="Profile"
              />
              <h2 className="text-xl font-semibold">{(user.email)?.slice(0,6)}</h2>
              <p className="text-gray-300">{user.email}</p>
            </div>
          </div>
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">User Information</h3>
          <div className="">
            <div>
              <p className="text-gray-500">Name</p>
              <p className="font-semibold">{(user.email)?.slice(0,6)}</p>
            </div>
            {/* <div>
              <p className="text-gray-500">Last Name</p>
              <p className="font-semibold">Sakib</p>
            </div> */}
            <div>
              <p className="text-gray-500">Email</p>
              <p className="font-semibold">{user.email}</p>
            </div>
            {/* <div>
              <p className="text-gray-500">Address</p>
              <p className="font-semibold">Kishoreganj</p>
            </div> */}

          </div>
        </div>
        <div className='text-right'>
          <Link to='/update-profile'>
            <Button>
              UPDATE PROFILE
            </Button>

          </Link>
        </div>
        <p>Complite prolile Comming soon</p>
      </div>



    ) : null
  )
}

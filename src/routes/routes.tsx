import { createBrowserRouter } from 'react-router-dom';
import App from '@/App';
import NotFound from '@/pages/NotFound';
import Home from '@/pages/Home';
import BooksDetails from '@/pages/BooksDetails';
import AdminPanel from '@/Admin/AdminLayout/AdminPanel';
import BookFilter from '@/pages/AllBooks';
import { Login } from '@/pages/Login';
import { SignUp } from '@/pages/SignUp';
import Editbook from '@/pages/Editbook';
import AddBook from '@/pages/AddBook';
import PrivateRoute from './privateRoute';
import Profile from '@/pages/profile/profile';
import UpdateProfile from '@/pages/profile/UpdateProfile';

const routes = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/all-books',
        element: <BookFilter />,
      },
      {
        path: '/book-details/:id',
        element: < BooksDetails />,
      },
      {
        path: '/add-book',
        element:(
          <PrivateRoute>
            <AddBook />
          </PrivateRoute>
        )
      },
  {
    path: '/profile',
    element: (
      <PrivateRoute>
        <Profile />
      </PrivateRoute>
    ),
  },
  {
    path: '/update-profile',
    element: (
      <PrivateRoute>
        <UpdateProfile />
      </PrivateRoute>
    )
  },
  {
    path: '/admin',
    element: (
      <PrivateRoute>
        <AdminPanel/>
      </PrivateRoute>
    )
  },
  {
    path: '/edit-book/:id',
    element:(
      <PrivateRoute>
        <Editbook />
      </PrivateRoute>
    )
  },

  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <SignUp />,
  },


],
  },
{
  path: '*',
    element: <NotFound />,
  },
]);


export default routes;

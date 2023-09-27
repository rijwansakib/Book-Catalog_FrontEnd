import { useAppSelector } from '@/redux/hook';
import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface IProps {
  children: ReactNode;
}

export default function PrivateRoute({ children }: IProps) {
  const { user, isLoding } = useAppSelector((state) => state.user);

  const { pathname } = useLocation();

  if (isLoding) {
    return <p>Loading...</p>;
  }

  if (!user.email && !isLoding) {
    return <Navigate to="/login" state={{ path: pathname }} />;
  }

  return children;
}
'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form';
import { FcGoogle } from 'react-icons/fc';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { loginUser } from '@/redux/user/userSlice';

type UserAuthFormProps = React.HTMLAttributes<HTMLDivElement>;

interface LoginFormInputs {
  email: string;
  password: string;
}

export function Login({ className, ...props }: UserAuthFormProps) {

  // email - password
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const { user, isLoding } = useAppSelector(state => state.user)
  const dispatch = useAppDispatch()
  const onSubmit = (data: LoginFormInputs) => {
    dispatch(loginUser({ email: data.email, password: data.password }))
  };
  const navigate = useNavigate();
  useEffect(() => {
    if (user.email && !isLoding) {
      navigate('/')
    }
  }, [isLoding, navigate, user.email])

  return (
    <div className=' w-2/4 mx-auto rounded-lg bg-gradient-to-r
    from-stone-800 via-slate-600 to-slate-300 text-white m-10 p-10'>
      <h1 className='text-2xl p-5 text-center'>LOGIN</h1>
      <div className={cn('grid gap-6', className)} {...props}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-5">
            <div className="grid gap-3">
              <Label className="sr-only" htmlFor="email">
                Email
              </Label>
              <Input
                id="email"
                placeholder="name@example.com"
                type="email"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
                {...register('email', { required: 'Email is required' })}
              />
              {errors.email && <p>{errors.email.message}</p>}
              <Input
                id="password"
                placeholder="your password"
                type="password"
                autoCapitalize="none"
                autoComplete="password"
                {...register('password', { required: 'Password is required' })}
              />
              {errors.password && <p>{errors.password.message}</p>}
            </div>
            <Button className='w-1/5 m-auto' >Login with email</Button>
            <p className="text-sm">
              Don't have any account,{" "}
              <Link to='/signup'
                className="text-amber-700"
              >
                sign up
              </Link>
            </p>
          </div>
        </form>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>
        <Button
          variant="outline"
          type="button"
          className='w-1/5 m-auto'
          // onClick={onGoogleClick}
        >
          <p>Google</p>
          <FcGoogle />
        </Button>
      </div>
    </div>
  );
}
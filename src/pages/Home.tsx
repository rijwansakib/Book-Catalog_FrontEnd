import { Button } from '@/components/ui/button';
import banner from '@/assets/image/banner.png';
import hero from '@/assets/image/hero.png';
import { Link } from 'react-router-dom';
import Footer from '@/layouts/Footer';
import Books from './Books';

export default function Home() {
  return (
    <>
      <div className="flex justify-between items-center h-[calc(100vh-80px)] max-w-7xl mx-auto ">
        <div>
          <h1 className="text-6xl font-black text-primary mb-2">
            BOOKS <br /> STORE
          </h1>
          <p className="text-secondary font-semibold text-xl">
            Meet Your favorite books
          </p>
          <div className="text-primary mt-20">
            <p>Opening a book is like stepping into a new world</p>
            <p> where the pages become windows to endless adventures and knowledge.</p>
          </div>
          <Button className="mt-10" asChild>
            <Link to="/all-books">Brows all Books</Link>
          </Button>
        </div>
        <div className="relative -right-14">
          <img src={banner} alt="" />
        </div>
      </div>
      <div className="mb-96">
        <div>
          <img className="mx-auto" src={hero} alt="" />
        </div>
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-5xl font-black text-primary uppercase mt-10">
          The top 10 recently added books
          </h1>
          <div className='mt-10'>
            <Books></Books>
          </div>
          <Button className="mt-10" asChild>
            <Link to="/all-books">Brows all Books</Link>
          </Button>
        </div>
      </div>
      <Footer />
    </>
  );
}

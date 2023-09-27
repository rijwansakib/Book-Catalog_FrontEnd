import { Slider } from "@/components/ui/slider";
import { useGetBooksQuery } from "@/redux/book/bookApi";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { clearFilter, filter, search, setYear } from "@/redux/book/bookSlice";
import { IBooks } from "@/types/globalTypes";
import { Button } from "@/components/ui/button";
import BookCard from "./BookCard";

export default function BookFilter() {
    const { data } = useGetBooksQuery(undefined,{
        refetchOnMountOrArgChange: true,
        pollingInterval: 10000,
      });
    const { publicationDate, keywords, filterOptions } = useAppSelector(state => state.book);
    const dispatch = useAppDispatch();
    const books = data?.data;

    let booksData: IBooks[] = books;
    booksData = books
        ?.filter((book: IBooks) => {
            if (keywords && publicationDate > 0) {
                return book.title
                    .toLocaleLowerCase()
                    .includes(keywords.toLocaleLowerCase());
            } else {
                return book.publicationDate < publicationDate;
            }

        })
        .filter((book: IBooks) => {
            if (filterOptions.length) return filterOptions.includes(book.genre);
            return book;
        });


    const handleSlider = (value: number[]) => {
        dispatch(setYear(value[0]));
    };
    const handleSelectChange = (e: { target: { value: unknown; }; }) => {
        const selectedValue = e.target.value;
        dispatch(filter(selectedValue));
    };


    return (
        <div className='w-3/4 m-auto mt-20'>
            <div className="flex gap-4 justify-evenly">
                {/*genre */}
                <div className="">
                    <h1 className="text-lg mb-2 uppercase">Genre</h1>          
                        <select onChange={handleSelectChange}>
                            <option value="Fiction">Fiction</option>
                            <option value="Mystery">Mystery</option>
                            <option value="Romance">Romance</option>
                            <option value="Fantasy">Fantasy</option>
                            <option value="Science Fiction">Science Fiction</option>
                            <option value="Dystopian Fiction">Dystopian Fiction</option>
                        </select>               
                </div>
                {/* publication year */}
                <div className="">
                    <h1 className="text-lg uppercase">publicationYear</h1>
                        <div>From 1800 To {publicationDate}</div>
                        <Slider

                            defaultValue={[2023]}
                            max={2023}
                            min={1800}
                            step={10}
                            onValueChange={(value) => handleSlider(value)}
                        />
                </div>

                {/* searchInput */}
                <div className="flex gap-2">
                    <div className="text-xl">Search Book Name</div>
                    <div className="">
                        <input
                            type="text"
                            className="border-2 border-slate-500 select-ghost w-full max-w-[200px]"
                            onChange={(e) => {
                                dispatch(search(e.target.value));
                            }}
                        />
                    </div>
                    <Button
                        className="bg-slate-500 text-white"
                        onClick={() => dispatch(clearFilter())}
                    >
                        Clear
                    </Button>

                </div>

            </div>

            <div className="col-span-9 grid grid-cols-3 gap-10 pb-20 m-10">
                {booksData?.map((book: IBooks) => (
                    <BookCard key={book.id} book={book} />
                ))}
            </div>
        </div>
    )
}





{/* <div>






</div> */}
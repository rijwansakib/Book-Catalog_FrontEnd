import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useGetBooksQuery, useUpdateBookMutation } from "@/redux/book/bookApi";
import { IBooks } from "@/types/globalTypes";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";

export default function Editbook() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data: book } = useGetBooksQuery(id!,{
        refetchOnMountOrArgChange: true,
        pollingInterval: 10000,
      });
    const [updateBook] = useUpdateBookMutation();

    const { register, handleSubmit, formState: { errors }, } = useForm<IBooks>();

    const onSubmit = (data: IBooks) => {
        const updatedBookData: IBooks = {
            ...book,
            ...(data.title && { title: data.title }), 
            ...(data.author && { author: data.author }),
            ...(data.genre && { genre: data.genre }), 
            ...(data.publicationDate && { publicationDate: data.publicationDate }), 
            ...(data.image && { image: data.image }),
            ...(data.summary && { summary: data.summary })
        };

        const payload = { id, data: updatedBookData }; updateBook(payload);

        setTimeout(() => {
            navigate("/all-books");
        }, 500);
    };
    return (
        <>
            <div className=" w-2/4 m-auto">
                <h2 className="section_title text-center text-4xl p-10 text-red-400">Update Book</h2>
                <div>
                    <form className="" onSubmit={handleSubmit(onSubmit)}>
                        <div className="m-2">
                            <label>
                                <span className="text-xl text-red-400">Title</span>
                            </label>
                            <Input
                                type="text"
                                defaultValue={book?.title || ""}
                                placeholder="Book Title"
                                className="input input-bordered
                                border-solid border
                                border-sky-400
                                rounded-sm
                                "
                                {...register("title")}
                            />
                        </div>
                        <div className="m-2">
                            <label className="label">
                                <span className="text-xl text-red-400">Author</span>
                            </label>
                            <Input
                                type="text"
                                defaultValue={book?.author || ""}
                                placeholder="Book Author Name"
                                className="input input-bordered  
                                border-solid border
                                border-sky-400
                                rounded-sm"
                                {...register("author")}
                            />
                        </div>
                        <div className="m-2">
                            <label className="label">
                                <span className="text-xl text-red-400">Genre</span>
                            </label>
                            <select
                                {...register("genre")}
                                defaultValue={book?.genre || ""}
                                className="select w-full 
                                border-solid border
                                 border-sky-400
                                 rounded-sm
                                 "
                                {...register("genre")}
                            >
                                <option selected >Fiction</option>
                                <option>Mystery</option>
                                <option>Romance</option>
                                <option>Fantasy</option>
                                <option>Science Fiction</option>
                                <option>Dystopian Fiction</option>
                            </select>
                        </div>
                        <div className="m-2">
                            <label className="label">
                                <span className="text-xl text-red-400">Publication Date</span>
                            </label>
                            <Input
                                type="number"
                                defaultValue={book?.publicationDate || ""}
                                className="input input-bordered
                                border-solid border
                                border-sky-400
                                rounded-sm
                                "
                                min="1800"
                                max="2023"
                                step="1" 
                                {...register("publicationDate")}
                            />
                            {errors.publicationDate && (
                                <p className="form_error">{errors.publicationDate.message}</p>
                            )}
                        </div>
                        <div className="m-2">
                            <label className="label">
                                <span className="text-xl text-red-400">Image</span>
                            </label>
                            <Input
                                type="text"
                                defaultValue={book?.image|| ""}
                                placeholder="IMAGE URL"
                                className="input input-bordered
                                border-solid border
                                border-sky-400
                                rounded-sm
                                "
                                {...register("image")}
                            />
                        </div>
                        <div className="m-2">
                            <label className="label">
                                <span className="text-xl text-red-400">Summary</span>
                            </label>
                            <Input
                                type="text"
                                defaultValue={book?.summary || ""}
                                placeholder="SUMMARY"
                                className="input input-bordered
                                border-solid border
                                border-sky-400
                                rounded-sm
                                "
                                {...register("summary")}
                            />
                        </div>
                        <div className="form-control mt-6">
                            <Button>Update Book</Button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

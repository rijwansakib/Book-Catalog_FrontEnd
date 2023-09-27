import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { usePostBookMutation } from "@/redux/book/bookApi"
import { useAppSelector } from "@/redux/hook";
import { IBooks } from "@/types/globalTypes";
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";


export default function AddBook() {
    const navigate = useNavigate();
    const [addBook] = usePostBookMutation();
    const { user } = useAppSelector((state) => state.user);
    const { register, handleSubmit, reset, } = useForm<IBooks>();

    const onSubmit = (data: IBooks) => {
        const payload = { ...data, addedBy: user.email }
        addBook(payload);
        reset();
        // Display a success toast
        toast.success("Book Added successfully", {
            position: "top-right",
        });
        setTimeout(() => {
            navigate("/all-books");
        }, 500);

    }

    return (
        <>
            <div className=" w-2/4 m-auto">
                <h2 className="section_title text-center text-4xl p-10 text-red-400">ADD NEW BOOK</h2>
                <div>
                    <form className="" onSubmit={handleSubmit(onSubmit)}>
                        <div className="m-2">
                            <label>
                                <span className="text-xl text-red-400">Title</span>
                            </label>
                            <Input
                                type="text"
                                placeholder="BOOk TITLE"
                                className="input input-bordered
                                border-solid border
                                border-sky-400
                                rounded-sm"
                                {...register("title", { required: "Title is required" })}
                            />
                        </div>
                        <div className="m-2">
                            <label className="label">
                                <span className="text-xl text-red-400">Author</span>
                            </label>
                            <Input
                                type="text"
                                placeholder="Book Author Name"
                                className="input input-bordered  
                                border-solid border
                                border-sky-400
                                rounded-sm"
                                {...register("author", { required: "Author is required" })}
                            />
                        </div>
                        <div className="m-2">
                            <label className="label">
                                <span className="text-xl text-red-400">Genre</span>
                            </label>
                            <select
                                className="select w-full 
                                border-solid border
                                 border-sky-400
                                 rounded-sm"
                                {...register("genre", { required: "Genre is required" })}
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
                        </div>
                        <div className="m-2">
                            <label className="label">
                                <span className="text-xl text-red-400">Book Image</span>
                            </label>
                            <Input
                                type="url"
                                placeholder="Image URL"
                                className="input input-bordered
                                border-solid border
                                border-sky-400
                                rounded-sm"
                                {...register("image", { required: "Book Image is required" })}
                            />
                        </div>
                        <div className="m-2">
                            <label className="label">
                                <span className="text-xl text-red-400">SUMMARY</span>
                            </label>
                            <Input
                                type="summary"
                                placeholder="SUMMARY"
                                className="input input-bordered
                                border-solid border
                                border-sky-400
                                rounded-sm"
                                {...register("summary", { required: "summary is required" })}
                            />
                        </div>
                        <div className="form-control mt-6">
                            <Button>Add Book</Button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

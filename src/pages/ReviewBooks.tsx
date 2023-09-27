import { useParams } from "react-router-dom"
import { SetStateAction, useState } from "react";
import { FiSend } from 'react-icons/fi';
import { useGetCommmentsQuery, usePostCommentsMutation } from "@/redux/review/reviewApi";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { useAppSelector } from "@/redux/hook";


export default function ProductReview() {
  const {user} = useAppSelector(state=>state.user)  
  const {id} = useParams();
  // post comment

  const [inputValue, setInputValue] = useState('')

  const [postComment] = usePostCommentsMutation()

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    const options = {
      id: id,
      data: { comment: inputValue }
    }

    postComment(options)
    setInputValue('')
  }

  const handleChange = (e: { target: { value: SetStateAction<string>; }; }) => {
    setInputValue(e.target.value)
  }

  //get comment 
  const { data: comments } = useGetCommmentsQuery(id, {
    refetchOnMountOrArgChange: true,
    pollingInterval: 10000,
  })
   
  const comment = comments?.data?.comments
  
  
  return (
    <>

      <div className="max-w-7xl mx-auto mt-5">
      {user.email && 
              <form className="flex gap-5 items-center" onSubmit={handleSubmit}>
              <Textarea
                className="min-h-[30px]"
                onChange={handleChange}
                value={inputValue}
              />
              <Button
                type="submit"
                className="rounded-full h-10 w-10 p-2 text-[25px]"
              >
                <FiSend />
              </Button>
            </form>
      }
        <div className="mt-10">
          {comment?.map((comment: string, index: number) => (
            <div key={index} className="flex gap-3 items-center mb-5">
              <Avatar>
                <AvatarImage className="w-12 rounded-full" src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <p>{comment}</p>
            </div>
          ))}
        </div>
      </div>

    </>
  )
}

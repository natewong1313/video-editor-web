import { useIsSubmitting } from "remix-validated-form"
import { Loader2 } from "lucide-react"
import cn from "@/utils/cn"

type Props = {
    children: React.ReactNode
}
export default function SubmitButton({ children }: Props) {
  const isSubmitting = useIsSubmitting()
  return (
    <button 
      type="submit"
      disabled={isSubmitting}
      className={cn("flex w-full flex-row items-center justify-center rounded-md py-2.5 font-medium text-white transition duration-150 bg-lilac-600", isSubmitting ? "opacity-50 cursor-not-allowed": "hover:bg-lilac-700")}
    >
      {isSubmitting ? <Loader2 className="mr-2 animate-spin" /> : null}{children}
    </button>
  )
}
import { Button as Btn } from "react-aria-components"
import { cn } from "@/utils/cn"
type Props = {
  children?: React.ReactNode
  className?: string
  disabled?: boolean
  type?: "button" | "submit" | "reset" | undefined
  onPress?: () => void
}
export default function Button({ children, className, disabled = false, type, onPress }: Props) {
  return (
    <Btn
      className={cn(
        "bg-sky-500 data-[hovered]:bg-sky-600 rounded-md flex items-center justify-center text-white font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900",
        className,
      )}
      onPress={onPress}
      isDisabled={disabled}
      type={type}
    >
      {children}
    </Btn>
  )
}

import { Button as Btn } from "react-aria-components"
import clsx from "clsx"
type Props = {
  text: string
  className?: string
  disabled?: boolean
  type?: "button" | "submit" | "reset" | undefined
}
export default function Button({ text, className, disabled = false, type }: Props) {
  return (
    <Btn
      className={clsx(
        "bg-sky-500 data-[hovered]:bg-sky-600 rounded-md h-12 font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900",
        className,
      )}
      isDisabled={disabled}
      type={type}
    >
      {text}
    </Btn>
  )
}

import { TextField, Text, Label, Input } from "react-aria-components"
import clsx from "clsx"

type Props = {
  label?: string
  type?: string
  name?: string
  placeholder?: string
  defaultValue?: string
  autoComplete?: string
  className?: string
  errorMessage?: string
}

export default function StyledTextField(props: Props) {
  return (
    <TextField {...props}>
      <Label className="text-sm text-white">{props.label}</Label>
      <Input
        className={clsx(
          "w-full mt-1 flex h-10 rounded-md border bg-transparent py-2 px-3 text-sm font-medium placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-offset-2 border-zinc-700 text-slate-50  focus:ring-offset-slate-900",
          props.className,
        )}
        name={props.name}
        type={props.type}
        placeholder={props.placeholder}
        defaultValue={props.defaultValue}
        autoComplete={props.autoComplete}
      />
      {props.errorMessage && (
        <Text slot="errorMessage" className="text-sm mt-1 text-red-500">
          {props.errorMessage}
        </Text>
      )}
    </TextField>
  )
}

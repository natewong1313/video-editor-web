import clsx from "clsx"
import { Input, Label, Text, TextField } from "react-aria-components"

type Props = {
  label?: string
  type?: string
  name?: string
  placeholder?: string
  defaultValue?: string
  autoComplete?: string
  className?: string
  errorMessage?: string
  value?: string
  /* eslint-disable @typescript-eslint/no-explicit-any */
  onChange?: (value: any) => void
}

export default function StyledTextField(props: Props) {
  return (
    <TextField {...props}>
      <Label className="text-sm text-white">{props.label}</Label>
      <Input
        className={clsx(
          "mt-1 flex h-10 w-full rounded-md border border-zinc-700 bg-transparent px-3 py-2 text-sm font-medium text-slate-50 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-offset-2  focus:ring-offset-slate-900",
          props.className,
        )}
        name={props.name}
        type={props.type}
        placeholder={props.placeholder}
        defaultValue={props.defaultValue}
        autoComplete={props.autoComplete}
        value={props.value}
        onChange={props.onChange}
      />
      {props.errorMessage && (
        <Text slot="errorMessage" className="mt-1 text-sm text-red-500">
          {props.errorMessage}
        </Text>
      )}
    </TextField>
  )
}

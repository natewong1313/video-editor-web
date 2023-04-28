import { Eye, EyeOff } from "lucide-react"
import { useState } from "react"
import { useField } from "remix-validated-form"

type Props = {
    type?: "text" | "password" | "email"
    label: string
    name: string
    description?: string
    autoComplete?: string
    className?: string
    defaultValue?: string
    errorMessage?: string
}
export default function Input(props: Props) {
  const [showPassword, setShowPassword] = useState(false)
  const { error, getInputProps } = useField(props.name)

  return (
    <div className="flex flex-col">
      <label htmlFor="email" className="text-sm font-medium text-white">
        {props.label}
      </label>
      <div className="relative mt-1 w-full">
        <input
          type={props.type === "password" && showPassword ? "text" : (props.type || "text")}
          name={props.name}
          {...getInputProps({ id: props.name })}
          // id="email"
          autoComplete={props.autoComplete}
          className="block w-full rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2 shadow-sm transition duration-150 focus:border-lilac-500 focus:outline-none focus:ring-lilac-500 sm:text-sm"
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-1.5">
          {props.type === "password" ? 
            <button tabIndex={-1} type="button" className="rounded-md bg-zinc-700 p-1.5 text-xs text-zinc-500 transition duration-150 hover:text-zinc-100">
              {showPassword ? (
                <Eye className="h-4 w-4" onClick={() => setShowPassword(false)} />
              ) : (
                <EyeOff className="h-4 w-4" onClick={() => setShowPassword(true)} />
              )}
            </button>
            : null}
        </div>
      </div>
      {props.description ? (
        <p className="mt-1 text-sm text-zinc-500">{props.description}</p>
      ): null}
      {error ? (
        <span className="mt-1 text-sm text-red-500">{error}</span>
      ): null}
    </div>
  )
}
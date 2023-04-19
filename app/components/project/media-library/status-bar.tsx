import cn from "classnames"
type Props = {
  marginTop: number
  msg: string
}
export default function StatusBar({ marginTop, msg }: Props) {
  return (
    <div className="absolute z-10" style={{ marginTop: marginTop }}>
      <div
        className={cn(
          "h-fit rounded-lg border border-zinc-700 bg-zinc-800 p-3 text-sm shadow-md",
          msg === "" ? "hidden" : null,
        )}
      >
        <span className="text-white">{msg}</span>
      </div>
    </div>
  )
}

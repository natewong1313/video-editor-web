import { Button } from "react-aria-components"

export default function IconBtn({ onPress, children }: { onPress: () => void; children: React.ReactNode }) {
  return (
    <Button
      onPress={onPress}
      className="rounded-lg border border-zinc-700 bg-zinc-900 px-2 py-2 text-zinc-500 focus:outline-none data-[hovered]:border-zinc-500 data-[pressed]:border-sky-500 data-[hovered]:text-zinc-300"
    >
      {children}
    </Button>
  )
}

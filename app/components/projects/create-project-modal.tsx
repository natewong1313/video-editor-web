import { Fragment } from "react"
import { Dialog, Transition } from "@headlessui/react"
import { Cancel, AddMediaVideo } from "iconoir-react"
import Button from "@/components/ui/Button"
import TextField from "@/components/ui/TextField"

type Props = {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}
export default function CreateProjectModal(props: Props) {
  console.log(props.isOpen)
  return (
    <Transition.Root show={props.isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => props.setIsOpen(false)}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-zinc-900 ring-1 ring-zinc-400/20 px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                <div>
                  <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                    <button
                      type="button"
                      className="rounded-full text-zinc-500 focus:outline-none focus:ring-0"
                      onClick={() => props.setIsOpen(false)}
                    >
                      <Cancel className="h-7 w-7" />
                    </button>
                  </div>
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-sky-700/50">
                    <AddMediaVideo className="text-sky-500" />
                  </div>
                  <div className="mt-4 text-center">
                    <Dialog.Title as="h1" className="text-base font-medium leading-6 text-white">
                      Create a New Project
                    </Dialog.Title>
                    <p className="text-sm mt-1 text-gray-500">Enter the name of your project below.</p>
                    <form>
                      <div className="mt-4">
                        <TextField placeholder="Enter project name" className="text-center" />
                      </div>
                      <div className="mt-3">
                        <Button className="w-full h-10 py-6" type="submit">
                          Create New
                        </Button>
                      </div>
                    </form>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

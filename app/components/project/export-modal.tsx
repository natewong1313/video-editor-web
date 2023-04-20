import { Dialog, Transition } from "@headlessui/react"
import { PlusSquare, X, Film } from "lucide-react"
import { Fragment, useState, useEffect } from "react"
import { Button as RAButton } from "react-aria-components"
import { Progress } from "@/components/ui/ProgressBar"
import Button from "@/components/ui/Button"

type Props = {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  progress: number
  setProgress: React.Dispatch<React.SetStateAction<number>>
  exportUrl: string
}
export default function CreateProjectModal(props: Props) {
  const closeModal = () => {
    props.setIsOpen(false)
  }

  const updateProgress = () => {
    if (props.progress < 50) {
      props.setProgress((progress) => progress + 2)
    }
  }
  useEffect(() => {
    if (props.isOpen) {
      const id = setInterval(() => updateProgress(), 5000)
      return () => {
        clearInterval(id)
      }
    }
  }, [props.isOpen]);
  return (
    <Transition.Root show={props.isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => null}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-70 transition-opacity" />
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
                    <RAButton
                      type="button"
                      className="rounded-full text-zinc-500 data-[hovered]:text-white focus:outline-none focus:ring-0"
                      onPress={closeModal}
                    >
                      <X className="h-7 w-7" />
                    </RAButton>
                  </div>
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-sky-700/50">
                    <Film className="text-sky-500" />
                  </div>
                  <div className="mt-4 text-center">
                    <Dialog.Title as="h1" className="text-base font-medium leading-6 text-white">
                      Exporting Project
                    </Dialog.Title>
                    <p className="text-sm mt-1 text-gray-500">Your project is beginning the rendering process. Don't close out of this page.</p>
                    {props.exportUrl === "" ?
                      <div className="flex justify-center mt-4">
                        <Progress value={props.progress} className="w-[60%]" />
                      </div>
                      :
                      <Button className="w-full h-12" onPress={() => window?.open(props.exportUrl, '_blank')?.focus()}>
                        Download
                      </Button>
                    }
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

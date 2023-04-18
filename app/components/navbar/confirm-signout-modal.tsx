import { Dialog, Transition } from "@headlessui/react"
import { AlertTriangle, X } from "lucide-react"
import { Fragment } from "react"
import { Button } from "react-aria-components"

type Props = {
  children: React.ReactNode
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  onSignOut: () => Promise<void>
}

export default function ConfirmSignoutModal(props: Props) {
  const closeModal = () => {
    props.setIsOpen(false)
  }
  return (
    <Transition.Root show={props.isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
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
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-zinc-900 ring-1 ring-zinc-400/20  text-left shadow-xl transition-all max-w-lg">
                <div className="px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="flex flex-shrink-0 items-center justify-center rounded-full bg-red-700/20 h-10 w-10">
                      <AlertTriangle className="h-5 w-5 text-red-500" />
                    </div>
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <Dialog.Title as="h1" className="text-base font-medium leading-6 text-white">
                        Sign out
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-sm text-zinc-500">
                          Are you sure you want to sign out of your account? You'll need to sign in again to continue
                          using the app.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="px-4 pb-3 pt-2 sm:flex sm:flex-row-reverse sm:px-6">
                  <Button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-red-500 px-3 py-2 text-sm font-medium text-white shadow-sm data-[hovered]:bg-red-600 sm:ml-3 sm:w-auto focus:outline-none"
                    onPress={props.onSignOut}
                  >
                    Sign Out
                  </Button>
                  <Button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-zinc-800 px-3 py-2 text-sm text-zinc-500 shadow-sm ring-1 ring-inset ring-zinc-700 data-[hovered]:bg-zinc-800/50 sm:mt-0 sm:w-auto  focus:outline-none"
                    onPress={closeModal}
                  >
                    Cancel
                  </Button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

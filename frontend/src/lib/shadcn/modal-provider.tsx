import { createContext, useContext, useEffect, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@atoms/dialog'
import { Button } from '@atoms/button'
import { CircleAlert, CircleCheck } from 'lucide-react'
import { CheckCircle, XCircle } from 'phosphor-react'
import { cn } from '@/core/utils/shadcn-utils'

export type Theme = 'dark' | 'light'

type ModalProviderProps = {
  children: React.ReactNode
}

type ModalConfig = {
  type?: 'success' | 'error' | 'default'
  title?: string
  desc?: string
  footer?: boolean
  closeText?: string
  okText?: string
  closeButton?: boolean
  okButton?: boolean
  okOnClick?: () => void
}

const ModalConfigDefault: ModalConfig = {
  type: 'default',
  title: 'Title',
  desc: 'Enter message in here',
  footer: true,
  closeText: 'Close',
  okText: 'OK',
  closeButton: true,
  okButton: true,
  okOnClick: () => {},
}

type ModalProviderState = {
  showModal: (config: ModalConfig) => void
  closeModal: () => void
}

const initialState: ModalProviderState = {
  showModal: () => {},
  closeModal: () => {},
}

const ModalProviderContext = createContext<ModalProviderState>(initialState)

export function ModalProvider({ children, ...props }: ModalProviderProps) {
  const [config, setConfig] = useState<ModalConfig>(ModalConfigDefault)
  const [open, setOpen] = useState<boolean>()

  const value: ModalProviderState = {
    showModal: (config) => {
      setOpen(true)
      setConfig({ ...ModalConfigDefault, ...config })
    },
    closeModal: () => setOpen(false),
  }

  return (
    <ModalProviderContext.Provider {...props} value={value}>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle
              className={cn({
                'text-success': config.type === 'success',
                'text-danger': config.type === 'error',
              })}
            >
              {config.title}
            </DialogTitle>
            {config?.desc && (
              <DialogDescription>{config.desc}</DialogDescription>
            )}
          </DialogHeader>
          {config?.footer && (
            <DialogFooter className="w-full">
              {config?.closeButton && (
                <Button variant="outline" onClick={() => setOpen(false)}>
                  {config?.closeText}
                </Button>
              )}
              {config?.okButton && (
                <Button onClick={config?.okOnClick}>{config?.okText}</Button>
              )}
            </DialogFooter>
          )}
        </DialogContent>
      </Dialog>
      {children}
    </ModalProviderContext.Provider>
  )
}

export const useModal = () => {
  const context = useContext(ModalProviderContext)

  if (context === undefined)
    throw new Error('useTheme must be used within a ModalProvider')

  return context
}

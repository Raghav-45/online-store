import { FC } from 'react'
import { Input } from './ui/input'
import CopyToClipboardButton from './CopyButton'

interface InputWithCopyButtonProps {
  text?: string
}

const InputWithCopyButton: FC<InputWithCopyButtonProps> = ({ text }) => {
  return (
    <div className="flex gap-x-2">
      <Input value={text} type="text" placeholder={text} disabled />
      <CopyToClipboardButton text={text!} />
    </div>
  )
}

export default InputWithCopyButton

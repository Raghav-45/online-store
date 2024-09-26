import { useState } from 'react'
import copy from 'clipboard-copy'
import { ClipboardIcon, CopyIcon } from 'lucide-react'
import { Button } from './ui/button'

const CopyToClipboardButton = ({ text }: { text: string }) => {
  const [isCopied, setIsCopied] = useState(false)

  const handleCopyClick = async () => {
    try {
      await copy(text)
      setIsCopied(true)
    } catch (error) {
      console.error('Failed to copy text to clipboard', error)
    }
  }

  return (
    <Button
      className="flex-none"
      variant="outline"
      size="icon"
      onClick={handleCopyClick}
    >
      {isCopied ? (
        <ClipboardIcon className="h-4 w-4" />
      ) : (
        <CopyIcon className="h-4 w-4" />
      )}
    </Button>
  )
}

export default CopyToClipboardButton

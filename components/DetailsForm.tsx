import { FC } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import LocationButton from './LocationButton'
import { LocateIcon } from 'lucide-react'
import { Label } from './ui/label'

interface DetailsFormProps { }

const DetailsForm: FC<DetailsFormProps> = ({ }) => {
  return (
    <div className='flex flex-col gap-y-4 pt-4'>
      <div className="grid w-full items-center gap-1.5">
        <Label className='ml-0.5' htmlFor="email">Name</Label>
        <Input className="border-neutral-700" type="text" id="email" placeholder="" />
      </div>
      <div className="grid w-full items-center gap-1.5">
        <Label className='ml-0.5' htmlFor="email">Contact</Label>
        <Input className="border-neutral-700" type="text" id="email" placeholder="" />
      </div>
      <div className="grid w-full items-center gap-1.5">
        <Label className='ml-0.5' htmlFor="email">Pincode</Label>
        <div className='flex gap-x-4'>
          <Input className='w-1/2 border-neutral-700' type="text" id="email" placeholder="" />
          <Button className='w-1/2'>
            <LocateIcon className="mr-1.5 h-4 w-4" /> Use my location
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="grid w-full items-center gap-1.5">
          <Label className='ml-0.5' htmlFor="email">State</Label>
          <Input className="border-neutral-700" type="text" id="email" placeholder="" />
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label className='ml-0.5' htmlFor="email">City</Label>
          <Input className="border-neutral-700" type="text" id="email" placeholder="" />
        </div>
      </div>

      <div className="grid w-full items-center gap-1.5">
        <Label className='ml-0.5' htmlFor="email">House No., Building Name (Required)</Label>
        <Input className="border-neutral-700" type="text" id="email" placeholder="" />
      </div>
      <div className="grid w-full items-center gap-1.5">
        <Label className='ml-0.5' htmlFor="email">Road name, Area, Colony (Required)</Label>
        <Input className="border-neutral-700" type="text" id="email" placeholder="" />
      </div>
      <div className="grid w-full items-center gap-1.5">
        <Label className='ml-0.5' htmlFor="email">Add Nearby Famous SHop / Mall / Landmark</Label>
        <Input className="border-neutral-700" type="text" id="email" placeholder="" />
      </div>

      <LocationButton />
    </div>
  )
}

export default DetailsForm

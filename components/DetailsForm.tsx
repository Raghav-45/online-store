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
        <Label className='ml-0.5' htmlFor="name">Name</Label>
        <Input className="border-neutral-700" type="text" id="name" placeholder="" />
      </div>
      <div className="grid w-full items-center gap-1.5">
        <Label className='ml-0.5' htmlFor="contact">Contact</Label>
        <Input className="border-neutral-700" type="text" id="contact" placeholder="" />
      </div>
      <div className="grid w-full items-center gap-1.5">
        <Label className='ml-0.5' htmlFor="pincode">Pincode</Label>
        <div className='flex gap-x-4'>
          <Input className='w-1/2 border-neutral-700' type="text" id="pincode" placeholder="" />
          <Button className='w-1/2'>
            <LocateIcon className="mr-1.5 h-4 w-4" /> Use my location
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="grid w-full items-center gap-1.5">
          <Label className='ml-0.5' htmlFor="state">State</Label>
          <Input className="border-neutral-700" type="text" id="state" placeholder="" />
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label className='ml-0.5' htmlFor="city">City</Label>
          <Input className="border-neutral-700" type="text" id="city" placeholder="" />
        </div>
      </div>

      <div className="grid w-full items-center gap-1.5">
        <Label className='ml-0.5' htmlFor="house">House No., Building Name (Required)</Label>
        <Input className="border-neutral-700" type="text" id="house" placeholder="" />
      </div>
      <div className="grid w-full items-center gap-1.5">
        <Label className='ml-0.5' htmlFor="area">Road name, Area, Colony (Required)</Label>
        <Input className="border-neutral-700" type="text" id="area" placeholder="" />
      </div>
      <div className="grid w-full items-center gap-1.5">
        <Label className='ml-0.5' htmlFor="nearby">Add Nearby Famous Shop / Mall / Landmark</Label>
        <Input className="border-neutral-700" type="text" id="nearby" placeholder="" />
      </div>

      <Button className='w-full mt-2'>Save Details</Button>
      {/* <LocationButton /> */}
    </div>
  )
}

export default DetailsForm

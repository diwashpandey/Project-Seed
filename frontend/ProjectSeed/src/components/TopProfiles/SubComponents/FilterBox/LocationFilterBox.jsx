// imports from third-pary libraries
import Select from "react-select"

// additional imports
import { selectBoxStyle } from "../../selectBoxStyle"


function LocationFilterBox() {

  const collegeOptions = [
    { value: 'presidential-graduate-school', label: 'Presidential Graduate School' }
  ]

  return (
    <Select 
    options = {collegeOptions}
    styles={selectBoxStyle()}
    placeholder="Select Location"
    onChange={(selectedOption) => setForm({ ...form, name: selectedOption.value })} // Update form state
    />
  )
}

export default LocationFilterBox
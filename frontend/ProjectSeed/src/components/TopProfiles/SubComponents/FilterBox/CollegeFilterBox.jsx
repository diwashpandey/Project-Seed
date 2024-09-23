// imports from react
import { useState } from "react"

// imports from third-pary libraries
import { useQuery } from "react-query"
import Select from "react-select"

// additional imports
import { selectBoxStyle } from "../../selectBoxStyle"
import { fetchCollegesList } from "../../../../fetchers/TopProfiles/fetchCollegesList"

function CollegeFilterBox({form, setForm}) {

  const [collegeOptions, setCollegeOptions] = useState([])

  useQuery({
    "queryKey":"collegesList",
    "queryFn": fetchCollegesList,
    "onSuccess":(data)=>{
      const newCollegeOptions = data.map((college)=>({
        value:college.college_identifier,
        label:college.name
      }))
      setCollegeOptions(newCollegeOptions)
    }
  })

  return (
    <Select 
    options = {collegeOptions}
    styles={selectBoxStyle()}
    placeholder="Select College"
    onChange={(selectedOption) => setForm({ ...form, name: selectedOption.value })} // Update form state
    />
  )
}

export default CollegeFilterBox
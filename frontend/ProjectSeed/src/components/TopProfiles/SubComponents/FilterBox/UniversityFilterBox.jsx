// imports from react
import { useState } from "react"

// imports from third-pary libraries
import { useQuery } from "react-query"
import Select from "react-select"

// additional imports
import { selectBoxStyle } from "../../selectBoxStyle"
import { fetchUniversitiesList } from "../../../../fetchers/TopProfiles/fetchUniversitiesList"

function CollegeFilterBox({form, setForm}) {

  const [universitiesOptions, setUniversitiesOptions] = useState([])

  useQuery({
    "queryKey":"universitiesList",
    "queryFn": fetchUniversitiesList,
    "onSuccess":(data)=>{
      const newUniversitiesOptions = data.map((college)=>({
        value:college.university_identifier,
        label:college.name
      }))
      setUniversitiesOptions(newUniversitiesOptions)
    }
  })

  return (
    <Select 
    options = {universitiesOptions}
    styles={selectBoxStyle()}
    placeholder="Select University"
    onChange={(selectedOption) => setForm({ ...form, name: selectedOption.value })} // Update form state
    />
  )
}

export default CollegeFilterBox
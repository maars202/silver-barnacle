// import { Accordion } from '@mui/material'
import Accordionoption from '../components/Accordianoption'
import React from 'react'

import Checkbox from '@mui/material/Checkbox';



// export default function ControlledCheckbox() {
//   const [checked, setChecked] = React.useState(true);

//   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setChecked(event.target.checked);
//   };

//   return (
//     <Checkbox
//       checked={checked}
//       onChange={handleChange}
//       inputProps={{ 'aria-label': 'controlled' }}
//       className="bg-white"
//     />
//   );
// }

type Props = {}

const Votingpage = (props: Props) => {

  const upcomingElections = [{"electionName": "Upstate Elections", "date": "02/04/2022"}]

  const otherElections = [
  {"name": "New York State Elections", "age": "04/04/2022", "party": "", "education": ""}, 
  {"name": "New York State Elections", "age": "04/04/2022", "party": "", "education": ""}, 
  {"name": "New York State Elections", "age": "04/04/2022", "party": "", "education": ""}, ]
  return (
    <div>
      <p className='text-xl font-bold my-4'>Other Elections:</p>
      <div >
      {otherElections.map((item, idx) => {
        const {name, age, party, education} = item
        return (
          <Accordionoption name={name} age={age} party={party} education={education} selected={true}/>
        )
      })
      }
    


    <div className="flex">
      <div className="flex items-center h-5">
          <input id="helper-checkbox" aria-describedby="helper-checkbox-text" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
      </div>
      <div className="ml-2 text-sm">
      {/* <p className='text-xl text-white font-semibold mt-2'>I have selected Baburao from independent as my candidate.</p> */}
          <p id="helper-checkbox-text" className="text-xl font-normal text-gray-500 dark:text-gray-300">I have selected Baburao from independent as my candidate.</p>
      </div>
    </div>

    <div className='flex justify-center my-4'>
    <button className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800">
  <span className="w-44 relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
      Submit
  </span>
</button>
    </div>

    


     
  
      
      </div>

      


    </div>
  )
}

export default Votingpage
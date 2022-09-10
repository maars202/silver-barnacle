// import { Dashboard } from '@mui/icons-material'
import React from 'react'
import Dashboard from '../components/Dashboard'

type Props = {}

const Aboutpage = (props: Props) => {
  return (
    <div className='w-full'>
      {/* <Navbar2 style={"width: 100%; position: fixed; top: 0;"} /> */}

      <div>
      <Dashboard/>

          {/* <a id="About"></a>
          <AboutMe />

          
          <a id="projects"></a>
          <Development />

          <a id="timeline"></a>
          <Education />


          <a id="contact"></a>
          <ContactDetails /> */}
        
      </div>
    </div>
  )
}

export default Aboutpage
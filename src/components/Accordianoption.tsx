import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { PublicKey } from '@solana/web3.js';

// export interface NFTInterface {
//   sellerKey: PublicKey;
//   mintPubKey: PublicKey;
//   tokenPubKey: PublicKey;
//   imageUrl: string;
//   name: string;
//   // price: number;
// }

export interface NFTInterface {

    name: string;
    age: string;
    party: string;
    education: string
    selected: boolean;
    
    // price: number;
  }

export default function ControlledAccordions({name, age, party, education, selected }: NFTInterface) {
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')} className="mb-2">
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
          
        >
          {/* <Typography sx={{ width: '33%', flexShrink: 0, color: 'text.secondary'}} className="font-bold">
            Upstate Elections
          </Typography> */}
          <div className='flex flex-row justify-between w-full'>
            <div className={`rounded-full hover:bg-blue-500 border-2 p-3 special`} onClick={(el) => {
              console.log(el)
            }}></div>
          <p className="font-bold text-xl text-blue-900 ">{name}</p>
          <p className="font-bold text-xl text-blue-900">{age}</p>
          </div>
         
          {/* <Typography sx={{ color: 'text.secondary' }}>I am an accordion</Typography> */}
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat.
            Aliquam eget maximus est, id dignissim quam.
          </Typography>
        </AccordionDetails>
      </Accordion>
      

  );
}

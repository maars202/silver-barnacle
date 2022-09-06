// import { Accordion } from '@mui/material'
import Accordionoption from '../components/Accordianoption'
import React, { useEffect, useRef, useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import { PublicKey } from '@solana/web3.js';
import { AnchorWallet, useAnchorWallet } from '@solana/wallet-adapter-react';
import _ from 'lodash';
import { QRCodeCanvas } from "qrcode.react";
import axios from 'axios'
import {
  BrowserRouter as Router,
  // Switch,
  Route,
  useParams
} from "react-router-dom";
// import nftimage from "../../public/images/Ivysaur 1.png"

type Props = {}

export interface NFTInterface {
  sellerKey: PublicKey;
  mintPubKey: PublicKey;
  tokenPubKey: PublicKey;
  imageUrl: string;
  name: string;
  price: number;
}

interface cardNFTInterface {
  nft: NFTInterface;
  wallet: AnchorWallet | undefined;
  setStates: (walletPubKey: AnchorWallet) => Promise<void>;
  isListed: boolean;
}



const CardNFT = ({ nft, wallet, setStates, isListed }: cardNFTInterface) => {
  const { imageUrl, name } = nft;
  console.log("imageUrl: ", imageUrl, " name: ", name);
  const [imgLoading, setImgLoading] = useState<boolean>(true);

  return (
      <div className="shadow-xl bg-slate-800 rounded-lg col-span-12 lg:col-span-3 flex flex-col">
          {imageUrl === 'loading' && (
              <div className="w-full bg-slate-600 animate-pulse rounded-t-lg">
                  <div style={{ marginTop: '100%' }}></div>
              </div>
          )}
          {imageUrl !== 'loading' && (
              <div
                  className="flex flex-col relative justify-center h-0"
                  style={{ paddingBottom: '50%', paddingTop: '50%' }}
              >
                  <img
                      className={`rounded-t-lg absolute inset-0 h-full w-full ${imgLoading ? 'hidden' : ''}`}
                      alt="example"
                      src={
                          imageUrl === ''
                              ?  'https://user-images.githubusercontent.com/47315479/81145216-7fbd8700-8f7e-11ea-9d49-bd5fb4a888f1.png'
                              : imageUrl
                      }
                      onLoad={() => setImgLoading(false)}
                  />
                  <div className={`w-full bg-slate-600 animate-pulse rounded-t-lg ${imgLoading ? '' : 'hidden'}`}>
                      <div style={{ marginTop: '100%' }}></div>
                  </div>
              </div>
          )}
          <div className="px-3 py-5 text-gray-200 text-center">
          <button class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800">
<span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
    View Details
</span>
</button>
          </div>
          
      </div>
  );
};

// import { useStateContext } from "../Context"
import { TodoContext } from '../ContextProvider';
import { TodoContextType, ITodo, NFT} from '../@types/todo.d';
import approved from "../../public/images/approved.svg"

// import React from "react";



interface modalInterface {
  sellerKey: PublicKey
}

 function Modal(props: modalInterface) {
  const { saveTodo, todos, setnft, currNFT } = React.useContext(TodoContext) as TodoContextType;
  console.log("model currNFT: ", currNFT?.mintPubKey)
  const [showModal, setShowModal] = React.useState(false);
  const [showModal2, setShowModal2] = React.useState(false);

  const [url, setUrl] = useState(props.sellerKey == null ? "No key detected" : props.sellerKey.toBase58());

  const downloadQRCode = (e) => {
    e.preventDefault();
    setUrl("");
  };

  const qrCodeEncoder = (e) => {
    setUrl(e.target.value);
  };

  const qrcode = (
    <QRCodeCanvas
      id="qrCode"
      value={url}
      size={300}
      bgColor={"#ffffff"}
      level={"H"}
    />
  );

  interface updateInputs{
    // mintPubkey: String | undefined
    mintPubkey: string 
  }


const updatenft2 = async (inputs :updateInputs) => {
//   var axios = require('axios');
// var FormData = require('form-data');
// var fs = require('fs');
var data = new FormData();
data.append('network', 'devnet');
data.append('private_key', '3eJHxayX14X6dj9kbkAcC7hWwMFKbZEZUFYeXqz67G6wi5uWMAvyUddTodtRfkpgHQ2W46ZNX5w7PwBkY4MHXd3x');

// const url = 'https://cdn.shopify.com/s/files/1/0234/8017/2591/products/young-man-in-bright-fashion_925x_f7029e2b-80f0-4a40-a87b-834b9a283c39.jpg?v=1572867553'
const url = "https://bafkreicxnh7myglvvbe5qriqgelfybrcsneujg7qgknguazbuwvupup3pi.ipfs.nftstorage.link/"
const fileName = 'myFile.jpg'
let file = undefined;
await fetch(url)
  .then(async response => {
    const contentType = response.headers.get('content-type')
    const blob = await response.blob()
    file = new File([blob], fileName, { contentType })
    // access file here
    console.log("file created successfully from url!:", file)
  })


  if (file == undefined){
   return 
  }
// data.append('file', fs.createReadStream('/Users/maarunipandithurai/Downloads/bestnftever.png'));
data.append('file', file);
data.append('attributes', '[{"trait_type": "speed", "value": 200},\n{"trait_type": "aggression", "value": "mild"},\n{"trait_type": "energy", "value": "very high"}]');
// data.append('token_address', 'ChpHD1w6ocV1xtvoQKJgjazGZc9FqU7Z9vVpPMx5Lrjq');
// data.append('token_address', inputs.mintPubkey);
data.append('token_address', inputs.mintPubkey?.toString());


var config = {
  method: 'post',
  url: 'https://api.shyft.to/sol/v1/nft/update',
  headers: { 
    'x-api-key': '-3iYNcRok7Gm4EMl', 
    // ...data.getHeaders()
  },
  data : data
};

await axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});
}


  useEffect(() => {
    
  }, [showModal])
  

  return (
    <>
      <button
        className='my-10 w-full text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2'
        type="button"
        onClick={async () => {
          const sleep = (ms: number) => new Promise((r) => {
            console.log("1 passed")
            setTimeout(r, ms)});

          // setShowModal(true)
          // await sleep(5000);
          // setShowModal(false)
          setShowModal2(true)
          console.log("2 passed")
          
          // await sleep(5000);
          
          console.log("simulating getting approval from organisor and upgrading nft")
          console.log("currNFT?.mintPubKey.toBase58() 1: ", currNFT?.mintPubKey)
          // await updateNft({mintPubkey: currNFT?.mintPubKey.toString()})
          await updatenft2({mintPubkey: currNFT?.mintPubKey.toString()})
          
          setShowModal2(false)

        }}
      >
        Redeem
      </button>
      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold text-black">
                    Verification
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                <div className='bg-yellow grid justify-items-center'>{qrcode}</div>
                  <p className="my-4 text-slate-500 text-lg leading-relaxed">
                  Show this QR code to Person in charge
                  </p>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button id="closeModal"
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}

{showModal2 ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold text-black">
                    Verification
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal2(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                <div className='bg-yellow grid justify-items-center'><img src={approved} alt="" /></div>
                  <p className="my-4 text-slate-500 text-lg leading-relaxed w-60">
                    
                    You have been approved and your NFT has been upgraded. Please refresh page to see new nft.
                  </p>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button id="closeModal"
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal2(false)}
                  >
                    Close
                  </button>
                  {/* <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Save Changes
                  </button> */}
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}

const Nftpage = (props: Props) => {

  // const { activeMenu, setActiveMenu, theme, setTheme } = useStateContext();
  const { saveTodo, todos, setnft, currNFT } = React.useContext(TodoContext) as TodoContextType;
  const [formData, setFormData] = React.useState<ITodo | {}>();
  // let displayNFT = NFT({"sellerKey":"ErcPkkza1vaumtDKho6VddVvrLnwWA6yKqMuEYLE4JSZ",
  // "mintPubKey":"29GBRuuwkdxzJuvrsW2x1UaSPpHqAXNzQdd4u97fpSA8",
  // "tokenPubKey":"5CmeYs5TrRTzuuLSr1C1wpQTzPk62TmCcvYwE9FbaRRX",
  // "imageUrl":"https://bafkreiep6um5ivn33iskqlot33e4fu2qe77xnbujalsbi7nmj6xm5u3y3a.ipfs.nftstorage.link/",
  // "name":"Number #0002",
  // "price":1000000})

  
  // if (currNFT != null){
  //   displayNFT = currNFT
  // }


  useEffect(() => {
    // let { slug } = useParams();
    console.log("props:", props)
    console.log("todos:", todos)
    console.log("currNFT: ", JSON.stringify(currNFT))
  }, [])
  

  const upcomingElections = [{"electionName": "Upstate Elections", "date": "02/04/2022"}]

  const otherElections = [
  {"name": "New York State Elections", "age": "04/04/2022", "party": "", "education": ""}, 
  {"name": "New York State Elections", "age": "04/04/2022", "party": "", "education": ""}, 
  {"name": "New York State Elections", "age": "04/04/2022", "party": "", "education": ""}, ]
  return (
    <div className='flex flex-col mx-20 mt-20'>

        {/* <div className='bg-[#2c2c39] rounded-lg m-2 mt-5 justify-items-center grid'>
          Home/Explore
        </div> */}

        <div className='flex flex-col md:flex-row'>
      <div className='w-full md:w-3/5 justify-items-center align-middle'>

        <div className='bg-[#2c2c39] w-4/5 rounded-lg m-2 mt-5 justify-items-center grid'>
          <img src={currNFT?.imageUrl}  className="max-h-screen"/>
        </div>
      </div>
     
     <div className='w-full md:w-2/5'>

      <div className='text-white text-3xl font-bold'>{currNFT == null ? "Not Available" : currNFT.name}</div>

      <div className='text-[#a1a0ae] text-lg font-bold my-2'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sodales mi felis, pretium tincidunt lorem varius ac. Curabitur mauris lacus, pretium vel neque nec, blandit pharetra nulla.</div>
      
      
     <div className='bg-[#2c2c39] w-4/5 rounded-lg mt-5 justify-items-start grid p-3'>
        <div className='text-[#a1a0ae] text-xl font-bold'>Seller : <span className='text-white text-lg font-bold'>{(currNFT?.sellerKey.toBase58().substring(0, 10) + "....")}</span></div>
        <div className='text-[#a1a0ae] text-xl font-bold'>Size : <span className='text-white text-lg font-bold'>{(currNFT?.tokenPubKey.toBase58().substring(0, 10) + "....")}</span></div>
        <div className='text-[#a1a0ae] text-xl font-bold'>Prize : <span className='text-white text-xl font-bold'>{currNFT?.price}</span></div>
    </div>

    {/* <button type="button" class="my-10 w-full text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Redeem</button> */}


    <Modal sellerKey={currNFT?.sellerKey}/>


     </div>
     </div>

    </div>
  )
}

export default Nftpage
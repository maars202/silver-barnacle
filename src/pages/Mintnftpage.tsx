import React, {useRef, useEffect, useState} from 'react'
import axios from 'axios'
type Props = {}

const Mintnftpage = (props: Props) => {
  const inputRef = useRef(null);
  const [preview, setPreview] = useState<String>()
  const [selectedFile, setSelectedFile] = useState<File | null>()
  const [name, setName] = useState<String>()
  const [symbol, setSymbol] = useState<String>()
  const [desc, setDesc] = useState<string>()
  const [attr, setAttr] = useState<String>()
  const [royalty, setRoyalty] = useState<String>()

  type data = {
    name: string;
    symbol: string;
    desc: string;
  };
  const [allData, setAllData] = useState<data | null>()


  const mintNow2 = async () => {

    if (!selectedFile || !name){
      console.log("name", name)
      return
    }


    // if (!selectedFile || !name || !symbol || !desc || !attr || !royalty){

    //   console.log("invalid data set")
    //   console.log("name: ", name)
    //   console.log("symbol: ", symbol)
    //   console.log("desc: ", desc)
    //   console.log("attr: ", attr)
    //   console.log("royalty: ", royalty)

    //   return
    // }

//     var axios = require('axios');
// var FormData = require('form-data');
// var fs = require('fs');

// const name = "Maarss";

// const symbol = "MAARSS";
// const desc = "Maars second nft";
// const attr = '[{"trait_type": "speed", "value": 100},\n{"trait_type": "aggression", "value": "crazy"},\n{"trait_type": "energy", "value": "very high"}]';

const extUrl = 'https://shyft.to/';


var data = new FormData();
data.append('network', 'devnet');
data.append('private_key', '3eJHxayX14X6dj9kbkAcC7hWwMFKbZEZUFYeXqz67G6wi5uWMAvyUddTodtRfkpgHQ2W46ZNX5w7PwBkY4MHXd3x');
data.append('name', name.toString());
console.log("data name added")
// data.append('symbol', symbol.toString());
// data.append('description', desc.toString());
// data.append('attributes', attr.toString());
// data.append('external_url', extUrl);
// data.append('royalty', royalty.toString());

// data.append('name', 'Shyft Founders');
data.append('symbol', 'SF');
data.append('description', 'Shyft Founders Bio');
data.append('attributes', '[{"trait_type": "speed", "value": 100},\n{"trait_type": "aggression", "value": "crazy"},\n{"trait_type": "energy", "value": "very high"}]');
data.append('external_url', 'https://shyft.to/');
data.append('royalty', '10');


data.append('file', selectedFile);

var config = {
  method: 'post',
  url: 'https://api.shyft.to/sol/v1/nft/create',
  headers: { 
    'x-api-key': 'aOchcpaocDw6uyPm', 
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



  const displayFile = (event: React.ChangeEvent<HTMLInputElement>) => {

   
    if (selectedFile){
      console.log("display: ", selectedFile);
    }
    mintNow2()

  }

  useEffect(() => {
    if (!selectedFile) {
        setPreview(undefined)
        return
    }

    const objectUrl = URL.createObjectURL(selectedFile)
    setPreview(objectUrl)

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl)
}, [selectedFile])


  // const form = useRef();


  // // const sendEmail = async(e) => {
  // //   e.preventDefault();
  // //   console.log(form.current)

  // //   emailjs.sendForm("service_s22eq14", "template_1ar5q4a", form.current, "Cz55Jg65l961cPNcN")
  // //     .then((result) => {
  // //         console.log(result.text);
  // //     }, (error) => {
  // //         console.log(error.text);
  // //     });
  // // };

  // let state = {
  //   text: "",
  // };

  // // typing on RIGHT hand side of =
  // let onChange = (e: React.FormEvent<HTMLInputElement>): void => {
  //   this.setState({ text: e.currentTarget.value });
  // };

  const onFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.files[0]);
    setSelectedFile(event.target.files[0]);
    // if (event.target.files[0]){
    //   console.log(event.target.files[0]);
    // }
  };

    const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
    setName(event.target.value);
  };



  const onSymbolChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
    setSymbol(event.target.value);
  };


  const onAttrChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
    setAttr(event.target.value);
  };

  const onRoyaltyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
    setRoyalty(event.target.value);
  };

  const onDescrInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    console.log(event.target.value);
    setDesc(event.target.value);
  };








  

  return (
    <div>
        <div className='bg-[#324265] w-full m-1 py-3 px-2 rounded-md min-h-screen'>

          <div>name: {name}</div>
          <div>description: {desc}</div>
        {/* <form className='w-full' ref={form} onSubmit={sendEmail}> */}
        <form className='w-full'>
  <label className="block">
    <span className="block font-medium text-[#ABAEB0] text-xl mb-2">NFT Collection Name</span>
    <input onChange={onNameChange} type="text" className='peer w-full bg-inherit outline outline-offset-1 dark:text-white dark:outline-green-400 outline-[#FF6464] outline-2 rounded-md p-4' placeholder='Enter your name'/>
    <p className="mt-2 invisible peer-invalid:visible text-pink-600 text-sm">
      Please provide a valid email address.
    </p>
  </label>
  <label className="block">
    <span className="block font-medium text-[#ABAEB0] text-xl mb-2">Your Symbol</span>
    <input onChange={onSymbolChange} type="text" className='peer w-full bg-inherit outline outline-offset-1 dark:text-white dark:outline-green-400 outline-[#FF6464] outline-2 rounded-md p-4' placeholder='Enter your email'/>
    <p className="mt-2 invisible peer-invalid:visible text-pink-600 text-sm">
      Please provide a valid email address.
    </p>
  </label>

  <label className="block">
    <span className="block font-medium text-[#ABAEB0] text-xl mb-2">Your Attributes</span>
    <input onChange={onAttrChange} type="text" className='peer w-full bg-inherit outline outline-offset-1 dark:text-white dark:outline-green-400 outline-[#FF6464] outline-2 rounded-md p-4' placeholder='Enter your email'/>
    <p className="mt-2 invisible peer-invalid:visible text-pink-600 text-sm">
      Please provide a valid email address.
    </p>
  </label>

  <label className="block">
    <span className="block font-medium text-[#ABAEB0] text-xl mb-2">Your Royalty</span>
    <input onChange={onRoyaltyChange} type="text" className='peer w-full bg-inherit outline outline-offset-1 dark:text-white dark:outline-green-400 outline-[#FF6464] outline-2 rounded-md p-4' placeholder='Enter your email'/>
    <p className="mt-2 invisible peer-invalid:visible text-pink-600 text-sm">
      Please provide a valid email address.
    </p>
  </label>





  <label className="block">
    <span className="block font-medium text-[#ABAEB0] text-xl mb-2">Description</span>
    <textarea onChange={onDescrInputChange} cols={40} rows={5} className='peer w-full bg-inherit outline outline-offset-1 dark:text-white dark:outline-green-400 outline-[#FF6464] outline-2 rounded-md p-4' placeholder='Enter your message'/>
    <p className="mt-2 invisible peer-invalid:visible text-pink-600 text-sm">
      Please provide a valid email address.
    </p>
  </label>


  <span className="block font-medium text-[#ABAEB0] text-sm mb-2">Upload folder with images</span>
  <label className="block">
  
    <span className="sr-only">Choose profile photo</span>
    <input type="file" className="block w-full text-sm text-slate-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-violet-50 file:text-pink-600
      hover:file:bg-violet-100
    "
    ref={inputRef}
    accept="image/*"
    onChange={onFileInputChange}
    />
  </label>

  {/* <button className="focus:outline-none focus-visible:ring">
  Submit
</button> */}

<button className="bg-blue-500 active:bg-blue-600">
  Submit
</button>
</form>


<button onClick={displayFile}>hello</button>
<img src={selectedFile != null ? selectedFile : ""} alt="" />
        </div>
    </div>
  )
}

export default Mintnftpage
import React, { MouseEventHandler } from "react";
import { Metaplex, toMetaplexFileFromBrowser,keypairIdentity} from "@metaplex-foundation/js";
// import {nftStorage} from "@metaplex-foundation/js-plugin-nft-storage";
import { Connection, clusterApiUrl, Keypair, } from "@solana/web3.js";
// import { NFTStorage, File, Blob } from 'nft.storage'


const Mintnftpage2: React.FunctionComponent = () => {


const connection = new Connection(clusterApiUrl("devnet"));
// const metaplex = new Metaplex(connection);
const keypair = Keypair.fromSecretKey(Buffer.from([35,128,50,124,169,56,22,117,80,23,221,50,177,89,109,254,211,71,69,25,171,245,64,48,216,167,255,68,130,79,238,98,43,250,92,2,235,252,173,61,95,200,18,71,176,63,150,33,245,176,92,224,77,192,86,143,204,28,38,49,55,127,12,58]));
const metaplex = Metaplex.make(connection)
    .use(keypairIdentity(keypair))
    // .use(nftStorage({ token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEQ0OTgxREViRTVmQzJFQjZlRGE5OTJBYzdGNmNhYjJhNTVBNkEzMzUiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY1OTc3ODAyODczOCwibmFtZSI6ImZpcnN0In0.4zDW4UyctUE2nSpe7VgFRX9tjXVt4JMz2kY0CQVH5Uc" }))
  


  const NFT_STORAGE_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEQ0OTgxREViRTVmQzJFQjZlRGE5OTJBYzdGNmNhYjJhNTVBNkEzMzUiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY2MTU5MDAzOTc3NSwibmFtZSI6ImZpZnRoIn0.-OTPSaXv_Ra6XTq2O3ijMz2Ujst0JPEdDKrRTAifMB8'
  // const client = new NFTStorage({ token: NFT_STORAGE_TOKEN })

  const [name, setName] = React.useState("")
  const [option, setOption] = React.useState("")
  const [fileSelected, setFileSelected] = React.useState<FileList | null>(null);
  const [counter, setCounter] = React.useState<number>(0);
  const form = new FormData();
  const [formData, setFormData] = React.useState<FormData | null>(form);

  
  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value)
  }
  
  const onChangeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setOption(event.target.value)
  }

  const onChangeFile = async(event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("onChangeFile: ")
    setFileSelected(event.target.files)
    // const formData = new FormData();
    if (fileSelected){
      const file = fileSelected.item(0);
      if (file && formData){
          formData.append(counter.toString() + ".png", file, counter.toString());
          console.log(formData);
          console.log("item", formData.get(counter.toString() + ".png"));
          // let uploading: File[] = [];
          // if (formData.get(counter.toString() + ".png") !=  null){
          //   uploading.push(formData.get(counter.toString() + ".png"));
          // }
          
          // create uri:
          // await uploadFileMeta(file);
          console.log("uploadFileMeta(uploading) DONE");

      // Display the key/value pairs

      console.log("formData.entries(): ", formData.getAll(""));
      for (var pair of formData.entries()) {
        
        console.log("pair: ", pair," opened:", pair[0]+ ', ' + pair[1]); 
      }
          setCounter(counter+1);
      }else{
        console.log("file or formdata is null , ....file: ", file, ", formData: ", formData)
      }

    }
    
  }

  const uploadFileMeta = async(f: File | null | undefined) => {
    if (!f){
      return "Invalid";
    }
    // Assuming the user uploaded two images via an input field of type "file".
// const browserFiles = event.target.files;
const browserFiles = f;

// const { uri, metadata } = await metaplex
//     .nfts()
//     .uploadMetadata({
//         name: "My NFT",
//         image: await toMetaplexFileFromBrowser(browserFiles),
//         properties: {
//             files: [
//                 {
//                     type: "video/mp4",
//                     // uri: await toMetaplexFileFromBrowser(browserFiles[1]),
//                     uri: await toMetaplexFileFromBrowser(browserFiles),
//                 },
//             ]
//         }
//     })
//     .run();

// console.log(metadata.image) // https://arweave.net/123
// // console.log(metadata.properties.files[0].uri) // https://arweave.net/456
// console.log(uri) // https://arweave.net/789


const metadata = await client.store({
  name: 'My sweet NFT',
  description: 'Just try to funge it. You can\'t do it.',
  image: imageFile
})


  }


  // const uploadFile = function (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) {
    const uploadFile1 = function (event: React.ChangeEvent<HTMLInputElement>) {
      if (event) {
          const formData = new FormData();
          // formData.append("image", fileSelected, fileSelected.name);
          console.log("event.target: ", event.currentTarget.files);
          // for (let file of event.currentTarget.files){

          // }
          // formData.append("image", event, fileSelected.name);

          for (const file of event.currentTarget.files) {
            console.log(file.name); // prints file name
          }
      }
  };

  const uploadFile = function (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) {
    if (fileSelected) {
        const formData = new FormData();
        formData.append("image", fileSelected, fileSelected.name);
    }
};

  // https://stackoverflow.com/questions/64488160/typescript-and-react-with-file-upload-typing

//   // const uploadFile = function (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) {
//     const uploadFile = function (e: React.ChangeEventHandler<HTMLInputElement>) {
//     if (fileSelected) {
//         const formData = new FormData();
//         formData.append("image", fileSelected, fileSelected.name);
//     }
// };

  const onSubmit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault()
    console.log("Submitted")
  }

  const buttonClick = async (event: MouseEventHandler<HTMLButtonElement>) => {
    console.log("hellooooo");
    await uploadFileMeta(fileSelected?.item(0));
  }
 
  return (
    <div>
      <form onSubmit={onSubmit}>
        <h1>{name}</h1>
        <h1>{option}</h1>
        <label for="name">Name</label>
        <input type="text" id="name" name="name" onChange={onChangeInput}/>
        <select onChange={onChangeSelect} value={option} id="options" name="options">
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
        <option value="option4">Option4</option>
        
      </select>
      <input type="file" name="" id="" onChange={onChangeFile}/>
      {formData?.forEach((val, key) => {
        console.log("val: ", val, ", key: ", key);
        return(
          <img src={val}/>
        )
      })}
      <input type="submit" value="send"/>
      </form>
      <button onClick={buttonClick}>hello</button>
    </div>
  )
}

export default Mintnftpage2
import React from 'react'
import gif1 from "./gifs/gif1.gif"
import gif2 from "./gifs/gif2.gif"
import gif3 from "./gifs/gif3.gif"
import gif4 from "./gifs/gif4.gif"
import gif5 from "./gifs/gif5.gif"
// import logo from "./gifs/personalPic.jpg"
// src/gifs/Venusaur 1.png
type Props = {}

const Dashboard = (props: Props) => {
  return (
    <div>



            <div className=''>

            <div className='flex flex-row'>
              <div class="flex flex-col md:w-2/3 w-full p-20 bg-cover bg-hero-pattern2 md:bg-none overflow-hidden" >
                {/* <div className='pac dark:text-white text-white md:text-5xl md:text-black text-2xl py-4 opacity-0 duration-[3000ms]' 
        x-intersect="$el.classList.add('opacity-100')" >Perfection is achieved not when there is nothing more to add, but rather when there is nothing more to take away.</div> */}
                <div className='text-bold py-4 dark:text-[#01e473] md:text-5xl text-transparent bg-clip-text bg-gradient-to-br from-sky-400 to-purple-500 text-sm translate-y-full duration-[3000ms]' 
        x-intersect="$el.classList.add('opacity-100', 'translate-y-0')">Token Gating with Evolving NFTs</div>
        <div className='italic text-bold py-4 dark:text-[#01e473] md:text-xl text-gray-400 text-sm translate-y-full duration-[3000ms]' 
        x-intersect="$el.classList.add('opacity-100', 'translate-y-0')">Guide on how to use our platform</div>
                <div className='py-4'>

              {/* animate-bounce delay-150 duration-300 */}
                
                </div>
              </div>
              <div className='md:w-1/3 w-0 rounded-l-full overflow-hidden bg-slate-500'>
                <img className='bg-slate-200 min-h-full' src={"https://cdn.hackernoon.com/images/3NUCzSFHYLaT7248YjvrSAVSc3f2-on03gd9.png"}/>
              </div>
        </div>

        

        <div className='w-full flex md:flex-row flex-col p-1 md:p-0 md:border-none border-red-500 border-b-2 border-dotted'>
            {/* <div className='flex flex-col md:w-2/5 p-10 bg-green-200'>
            
            <img src={gif1} alt="" />
                </div> */}

                <div className='flex flex-col md:w-2/5 p-10'>
          
            {/* <img className='shadow-inner rounded-xl shadow-blue-200/40' 
        src={gif1}/> */}

<img className='shadow-inner rounded-xl shadow-blue-200/40 opacity-0 duration-[3000ms]' 
        x-intersect="$el.classList.add('opacity-100')"src={gif1}/>
          </div>
        

          <div className='md:w-3/5 md:p-10 flex flex-col'>
          
          <p className='dark:text-green-400 text-[#FF6464] text-2xl font-bold items-center py-6 mt-20 opacity-0 duration-[3000ms]' 
        x-intersect="$el.classList.add('opacity-100')">Redeem Nft at Events</p>
        {/* <h1 class="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-pink-400 to-red-600">
  Hello, world!
</h1> */}

          <div className='text-xl md:text-xl text-white py-6 leading-relaxed mr-4 opacity-0 duration-[3000ms]' 
        x-intersect="$el.classList.add('opacity-100')">
          Navigate to "My Nfts" page to view your nfts. Click "View Details" to view more information about your nft such as its properties and owner.
          Click on the "Redeem" button for QR code verification to be done on site by the event organisors who minted the nfts for you. Get access to the event upon successful verification!
          </div>
                
          </div>
          
        </div>
        
            </div>



            <div className='w-full '>
        <div className='w-full flex md:flex-row flex-col p-1 md:p-0 md:border-none border-red-500 border-b-2 border-dotted'>


          <div className='md:w-3/5 md:p-10 flex flex-col'>
          <p className='dark:text-green-400 text-[#FF6464] text-2xl font-bold items-center py-6 mt-20 opacity-0 duration-[3000ms]' 
        x-intersect="$el.classList.add('opacity-100')">Mint NFTs as Event Organisors</p>

          <div className='text-xl md:text-xl text-white py-6 leading-relaxed mr-4 opacity-0 duration-[3000ms]' 
        x-intersect="$el.classList.add('opacity-100')">
          Navigate to "Mint" page to fill a form and mint NFTs. 
          </div>
          </div>

          <div className='flex flex-col md:w-2/5 p-10'>
<img className='shadow-inner rounded-xl shadow-blue-200/40 opacity-0 duration-[3000ms]' 
        x-intersect="$el.classList.add('opacity-100')"src={gif2}/>
          </div>
        </div>
            </div>

            <div className='w-full '>
        <div className='w-full flex md:flex-row flex-col p-1 md:p-0 md:border-none border-red-500 border-b-2 border-dotted'>
        <div className='flex flex-col md:w-2/5 p-10'>
<img className='shadow-inner rounded-xl shadow-blue-200/40 opacity-0 duration-[3000ms]' 
        x-intersect="$el.classList.add('opacity-100')"src={gif5}/>
          </div>
          <div className='md:w-3/5 md:p-10 flex flex-col'>
          <p className='dark:text-green-400 text-[#FF6464] text-2xl font-bold items-center py-6 mt-20 opacity-0 duration-[3000ms]' 
        x-intersect="$el.classList.add('opacity-100')">Mint multiple NFTs according to Tiers</p>

          <div className='text-xl md:text-xl text-white py-6 leading-relaxed mr-4 opacity-0 duration-[3000ms]' 
        x-intersect="$el.classList.add('opacity-100')">
         Use this kanban board to place your preferred images according to tiers before minting them. After minting the first tier nfts, users will be able to upgrade their nfts to one of the other images in other levels as stated in your kanban boards.
        <br></br>
         E.g. From level 1 "1" image to another randomly selected image from level 2 such as the "bicycle" image. 
          </div>
          </div>

        </div>
            </div>


            <div className='w-full'>
        <div className='w-full flex md:flex-row flex-col p-1 md:p-0 md:border-none border-red-500 border-b-2 border-dotted'>
                
          <div className='md:w-3/5 md:p-10 flex flex-col'>
          <p className='dark:text-green-400 text-[#FF6464] text-2xl font-bold items-center py-6 mt-20 opacity-0 duration-[3000ms]' 
        x-intersect="$el.classList.add('opacity-100')">Place NFTs on marketplace for others</p>

          <div className='text-xl md:text-xl text-white py-6 leading-relaxed mr-4 opacity-0 duration-[3000ms]' 
        x-intersect="$el.classList.add('opacity-100')">
          
          </div>
          </div>
          <div className='flex flex-col md:w-2/5 p-10'>
<img className='shadow-inner rounded-xl shadow-blue-200/40 opacity-0 duration-[3000ms]' 
        x-intersect="$el.classList.add('opacity-100')"src={gif3}/>
          </div>

        </div>
            </div>


            <div className='w-full '>
        <div className='w-full flex md:flex-row flex-col p-1 md:p-0 md:border-none border-red-500 border-b-2 border-dotted'>
        <div className='flex flex-col md:w-2/5 p-10'>
<img className='shadow-inner rounded-xl shadow-blue-200/40 opacity-0 duration-[3000ms]' 
        x-intersect="$el.classList.add('opacity-100')"src={gif4}/>
          </div>
          <div className='md:w-3/5 md:p-10 flex flex-col'>
          <p className='dark:text-green-400 text-[#FF6464] text-2xl font-bold items-center py-6 mt-20 opacity-0 duration-[3000ms]' 
        x-intersect="$el.classList.add('opacity-100')">Buy NFTs from marketplace</p>

          <div className='text-xl md:text-xl text-white py-6 leading-relaxed mr-4 opacity-0 duration-[3000ms]' 
        x-intersect="$el.classList.add('opacity-100')">
          
          </div>
          </div>
          
        </div>
            </div>

            

            {/* <div class="mx-auto bg-white rounded-xl shadow-md overflow-hidden md:w-full">
  <div class="md:flex">
    <div class="md:shrink-0">
      <img class="h-48 w-full object-cover md:h-full md:w-4/5" src={gif1} alt="Man looking at item at a store"/>
    </div>
    <div class="p-8">
      <div class="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Case study</div>
      <a href="#" class="block mt-1 text-lg leading-tight font-medium text-black hover:underline">Finding customers for your new business</a>
      <p class="mt-2 text-slate-500">Getting a new business off the ground is a lot of hard work. Here are five ideas you can use to find your first customers.</p>
    </div>
  </div>
</div> */}

</div>
  )
}

export default Dashboard;
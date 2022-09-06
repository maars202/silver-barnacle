import { AnchorWallet, useAnchorWallet } from '@solana/wallet-adapter-react';
import { PublicKey } from '@solana/web3.js';
import React, { useEffect, useRef, useState } from 'react';
import { createFakeWallet, initEscrowMarketplaceClient } from '../../client/common';
import { getMintsMetadata } from '../../utils';
import CardNFT, { NFTInterface } from '../common/cardNFT';
import CreateListing from '../manageNFTs/createListing';

const Home = () => {
    const wallet = useAnchorWallet();
    const [walletPubKey, setWalletPubKey] = useState<PublicKey>();
    const [allListedCardsNftInfo, setAllListedCardsNftInfo] = useState<NFTInterface[]>();
    const [allCompleteListedNft, setAllCompleteListedNft] = useState<NFTInterface[]>();
    const [searchTerm, setSearchTerm] = useState<string>();
    // HTMLButtonElement,HTMLInputElement

    const searchInput = async (event: React.ChangeEvent<HTMLInputElement>) => {
        // event.preventDefault();
        console.log("searchInput: ",event.target.value);
        setSearchTerm(event.target.value);

        if (event.target.value == ""){
            console.log("here: ", allCompleteListedNft)
            setAllListedCardsNftInfo(allCompleteListedNft)
            return
        }
    }
    const OnSearchTermChange = async (event: React.MouseEventHandler<HTMLButtonElement>) => {
        // // event.preventDefault();
        // console.log("",event.target.value);
        // setSearchTerm(event.target.value);

        // if (event.target.value == ""){
        //     console.log("here: ", allCompleteListedNft)
        //     setAllListedCardsNftInfo(allCompleteListedNft)
        //     return
        // }

        const emClient = await initEscrowMarketplaceClient();
        const allListingProofAccounts = await emClient.fetchAllListingProofAcc();

        const availMintsMetadata = await getMintsMetadata(
            allListingProofAccounts.map((tokenAccountInfo) => tokenAccountInfo.account.nftMint)
        );

        const searchFilteredNfts =  allListedCardsNftInfo?.filter((tokenAccountInfo, index) => {
            console.log(tokenAccountInfo.name)
            if (!searchTerm){
                return true
            }
            // console.log("tokenAccountInfo: ", tokenAccountInfo, tokenAccountInfo.name in (searchTerm != undefined ? searchTerm.toString() : ""))
            console.log("tokenAccountInfo: ", tokenAccountInfo, tokenAccountInfo.name.toLowerCase().includes(searchTerm))
            
            return tokenAccountInfo.name.toLowerCase().includes(searchTerm)
                
        })
        setAllListedCardsNftInfo(searchFilteredNfts)
        console.log(searchFilteredNfts)
        // setAllListedCardsNftInfo(

        // );

      };



    const setAllListedStates = async (wallet: AnchorWallet) => {
        const emClient = await initEscrowMarketplaceClient();
        const allListingProofAccounts = await emClient.fetchAllListingProofAcc();

        setAllListedCardsNftInfo(
            allListingProofAccounts.map((tokenAccountInfo) => {
                return {
                    sellerKey: tokenAccountInfo.account.sellerKey,
                    mintPubKey: tokenAccountInfo.account.nftMint,
                    tokenPubKey: tokenAccountInfo.account.escrowToken,
                    imageUrl: 'loading',
                    name: 'loading',
                    price: 0,
                };
            })
        );

        const availMintsMetadata = await getMintsMetadata(
            allListingProofAccounts.map((tokenAccountInfo) => tokenAccountInfo.account.nftMint)
        );

        const allListednfts = allListingProofAccounts.map((tokenAccountInfo, index) => {

            return {
                sellerKey: tokenAccountInfo.account.sellerKey,
                mintPubKey: tokenAccountInfo.account.nftMint,
                tokenPubKey: tokenAccountInfo.account.escrowToken,
                imageUrl: availMintsMetadata[index].imageUrl,
                name: availMintsMetadata[index].name,
                price: tokenAccountInfo.account.listPrice.toNumber(),
            };
        })

        setAllListedCardsNftInfo(allListednfts);
        setAllCompleteListedNft(allListednfts);
    };

    useEffect(() => {
        (async () => {
            const fakeWallet = createFakeWallet();
            await setAllListedStates(fakeWallet);
        })();
       
    }, []);
                {/* onKeyDown={OnSearchTermChange} */}
    return (

        <div>
            {/* <div className='my-20'>{searchTerm}</div>
                        <form className="flex items-center my-10">   
    <label for="simple-search" class="sr-only">Search</label>
    <div className="relative w-full">
        <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
            <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
        </div>

        <input onchange={searchInput} type="text" id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" required />
    </div>
    <button onClick={OnSearchTermChange} type="submit" className="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        <span className="sr-only">Search</span>
    </button>
</form> */}

<div className="grid grid-cols-12 gap-6">
            {/* <CreateListing /> */}


            {allListedCardsNftInfo?.map((cardInfoNFT, index) => (
                <CardNFT
                    nft={cardInfoNFT}
                    wallet={wallet}
                    setStates={setAllListedStates}
                    isListed={true}
                    key={index}
                />
            ))}
        </div>


        </div>

    );
};

export default Home;

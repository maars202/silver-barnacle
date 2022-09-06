// import React, { useEffect, useRef, useState } from 'react';
import { PublicKey } from '@solana/web3.js';
import { AnchorWallet, useAnchorWallet } from '@solana/wallet-adapter-react';
import _ from 'lodash';
import { conn, initEscrowMarketplaceClient } from '../../client/common';
import CreateListing from '../manageNFTs/createListing';
import CancelListing from '../manageNFTs/cancelListing';
import PurchaseListing from '../home/purchaseListing';
import { Link, useLocation } from 'react-router-dom';

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

import React, { createContext, useContext, useState, FC, ReactNode, useEffect} from "react";
// import React, { FC, ReactNode, useMemo } from 'react';
import { TodoContextType, ITodo, NFT } from '../../@types/todo.d';
import { TodoContext } from '../../ContextProvider';

const CardNFT = ({ nft, wallet, setStates, isListed }: cardNFTInterface) => {
    const { saveTodo, todos, setnft, currNFT } = React.useContext(TodoContext) as TodoContextType;
    const [formData, setFormData] = React.useState<ITodo | {}>();
    // console.log("card: ", nft)

    const { imageUrl, name } = nft;
    const [imgLoading, setImgLoading] = useState<boolean>(true);
    const go = () => {
        // console.log("buy thisss")
    }

    useEffect(() => {

    }, [])
    

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


          
  {!isListed ? 
  <div>

        <button onClick={go} class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800">
        <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            <Link onClick={() => {setnft(nft)}} to="/nftpage" params={{ testvalue: "hello" }}>View Details</Link>

            </span>
        </button>

        <button onClick={go} class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800">
        <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
        <CreateListing nft={nft} wallet={wallet} setOverallStates={setStates} />

            </span>
        </button>





  </div> : (
                        wallet?.publicKey.equals(nft.sellerKey) ? (
                            <CancelListing nft={nft} wallet={wallet} setOverallStates={setStates} />
                        ) : (
                            <PurchaseListing nft={nft} wallet={wallet} setAllListedStates={setStates} />
                        )
                    )
  }


            </div>
            
        </div>
    );
};

export default CardNFT;

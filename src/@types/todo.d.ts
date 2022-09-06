// @types.todo.ts
import { PublicKey } from '@solana/web3.js';
export interface ITodo {
    id: number;
    title: string;
    description: string;
    status: boolean;
  }

  export interface NFT {
    sellerKey: PublicKey;
    mintPubKey: PublicKey;
    tokenPubKey: PublicKey;
    imageUrl: string;
    name: string;
    price: number;
  }
  export type TodoContextType = {
    todos: ITodo[];
    currNFT: NFT | null;
    saveTodo: (todo: ITodo) => void;
    updateTodo: (id: number) => void;
    setnft: (nft: NFT | null) => void;
    savenft: (nft: NFT) => void;
  };
import React, { FC, } from 'react';
import Context from './Context';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/home';
import ManageNFTs from './components/manageNFTs';
import ManageNFTs2 from './components/manageNFTs2';
import NavBar from './components/common/NavBar';
import Main from './components/common/Main';
import Elections from './pages/Elections';
import Votingpage from './pages/Votingpage';
import Mintnftpage from './pages/Mintnftpage';
import Mintnftpage2 from './pages/Mintnftpage2';
import Updatenftpage from './pages/Updatenftpage';
import Nftpage from './pages/Nftpage';
import Toggle from './pages/Toggle';
// import { ContextProvider } from './ContextProvider';
import { TodoProvider } from './ContextProvider';
import Aboutpage from './pages/Aboutpage';


export const App: FC = () => {

    return (
        <Context>
            <TodoProvider>
            <BrowserRouter>
                <NavBar />
                <Main
                    childComp={
                        <Routes>
                             <Route path="/" element={<Home />} />
                             <Route path="/mynfts" element={<ManageNFTs2 />} />
                            <Route path="/mintnft" element={<Mintnftpage />} />
                            <Route path="/nftpage" element={<Nftpage />} />
                            <Route path="/toggle" element={<Toggle />} />
                            <Route path="/marketplace" element={<Aboutpage />} />
                            
                        </Routes>
                    }
                />
            </BrowserRouter>
            </TodoProvider>
        </Context>
    );
};

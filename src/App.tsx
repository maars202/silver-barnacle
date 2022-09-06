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
// import { ContextProvider } from './ContextProvider';
import { TodoProvider } from './ContextProvider';


export const App: FC = () => {

    return (
        <Context>
            {/* <ContextProvider> */}

            <TodoProvider>
            <BrowserRouter>
                <NavBar />
                <Main
                    childComp={
                        <Routes>
                             <Route path="/marketplace" element={<Home />} />
                             <Route path="/mynfts" element={<ManageNFTs2 />} />
                            <Route path="/wallet" element={<ManageNFTs />} >
                                {/* <Route name="ideas" path="/:testvalue" handler={Nftpage} /> */}
                            </Route>
                            <Route path="/" element={<Elections />} />
                            <Route path="/elections" element={<Elections />} />
                            <Route path="/vote" element={<Votingpage />} />
                            <Route path="/mintnft" element={<Mintnftpage />} />
                            <Route path="/update" element={<Updatenftpage />} />
                            <Route path="/nftpage" element={<Nftpage />} />
                            {/* <Route name="/wallet/ideas" path="/wallet/ideas/:testvalue" handler={Nftpage} /> */}
                            {/* <Route path="/mintnft2" element={<Mintnftpage2 />} /> */}
                        </Routes>
                    }
                />
            </BrowserRouter>
            </TodoProvider>
            {/* </ContextProvider> */}
        </Context>
    );
};

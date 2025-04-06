import { Buffer } from 'buffer/';
import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import MyNFTs from "./components/MyNFTS";
import WalletConnect from "./components/WalletConnect";
import Login from "./components/Login";
import Playlists from "./components/Playlists";
import MintForm from "./components/MintForm";
import NFTDisplay from "./components/NFTDisplay";
import Dashboard from './components/Dashboard';
import AboutUs from './components/AboutUs';
import NFTView from './pages/NFTView';

window.Buffer = Buffer;

const Callback = ({ setToken }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const hash = window.location.hash;
    let storedToken = localStorage.getItem("token");

    if (!storedToken && hash) {
      const newToken = new URLSearchParams(hash.replace("#", "?")).get("access_token");
      window.location.hash = "";

      if (newToken) {
        localStorage.setItem("token", newToken);
        setToken(newToken);
        navigate("/playlists");
      }
    }
  }, [navigate, setToken]);

  return null;
};

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  return (
    <Routes>
      <Route path="/" element={!token ? <Login /> : <Navigate to="/playlists" />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/aboutus" element={<AboutUs />} />
      <Route path="/callback" element={<Callback setToken={setToken} />} />
      <Route path="/playlists" element={token ? <Playlists token={token} setToken={setToken} /> : <Navigate to="/" />} />
      <Route path="/mint-form" element={<MintForm />} />
      <Route path="/my-nfts" element={<MyNFTs />} />
      <Route path="/wallet-connect" element={<WalletConnect />} />
      <Route path="/nft-view" element={<NFTView />} />
      <Route path="/nft-display" element={<NFTDisplay />} /> 
    </Routes>
  );
};

export default App;

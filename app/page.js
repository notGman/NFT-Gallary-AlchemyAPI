"use client";

import { useState } from "react";
import NFTCard from "../components/NFTCard";
import Loader from "@/components/Loader";

const Home = () => {
  const [wallatAddress, setWallatAddress] = useState("");
  const [collectionAddress, setCollectionAddress] = useState("");
  const [getCollection, setGetCollection] = useState(false);
  const [nfts, setNfts] = useState([]);
  const [loader,setloader] = useState(false);

  const fetchNFTs = async (e) => {
    e.preventDefault();
    setNfts(e=>[]);
    setloader(true);
    let apikey = process.env.NEXT_API_KEY;
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    const baseURL = `https://eth-mainnet.g.alchemy.com/nft/v2/${apikey}/getNFTs`;

    if (!collectionAddress.length) {
      const fetchURL = `${baseURL}?owner=${wallatAddress}`;
      try {
        const response = await fetch(fetchURL, requestOptions).then((res) => res.json());
        setNfts(e=>response.ownedNfts)
      } catch (error) {
        console.log(error);
      }
    } else if (getCollection === true) {
      const baseURL = `https://eth-mainnet.g.alchemy.com/nft/v2/${apikey}/getNFTsForCollection`;
      const fetchURL = `${baseURL}?contractAddress=${collectionAddress}&withMetadata=true`;
      try {
        const response = await fetch(fetchURL, requestOptions).then((res) => res.json());
        setNfts(e=>response.nfts)
      } catch (error) {
        console.log(error);
      }
    } else {
      const fetchURL = `${baseURL}?owner=${wallatAddress}&contractAddresses%5B%5D=${collectionAddress}`;
      try {
        const response = await fetch(fetchURL, requestOptions).then((res) => res.json());
        setNfts(e=>response.ownedNfts)
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    }
    setloader(false)
  };

  return (
    <div className="flex flex-col items-center mt-[3em]">
      <form className="flex flex-col w-full text-center gap-3">
        <div className="w-full">
          <input
            type="text"
            placeholder="Enter wallat address"
            className={"border-2 border-gray-300 bg-gray-200 text-black rounded-md w-[90%] px-2 py-1 md:w-[50%] disabled:bg-gray-400"}
            disabled={getCollection?true:false}
            onChange={(e) => setWallatAddress(e.target.value)}
            value={wallatAddress}
          />
        </div>
        <div className="w-full">
          <input
            type="text"
            placeholder="Enter collection address"
            className="border-2 border-gray-300 bg-gray-200 text-black rounded-md w-[90%] px-2 py-1 md:w-[50%]"
            onChange={(e) => setCollectionAddress(e.target.value)}
            value={collectionAddress}
          />
        </div>
        <div>
          <label>
            <input type="checkbox" className="mr-2" onChange={() => setGetCollection((e) => !e)} />
            Get collection
          </label>
        </div>
        <div>
          <button onClick={fetchNFTs} className="bg-[#87CEEB] w-[50%] md:w-[20%] p-1 text-white shadow-md font-bold">
            Fetch NFTs
          </button>
        </div>
      </form>
      {loader && nfts?.length===0 && <Loader/>}
      <div className="grid grid-cols-1 md:grid-cols-3 place-items-center mt-16"> 
        {nfts?.length>0 && nfts.map(nft=>{
          return <NFTCard key={nft.id.tokenId} nft={nft}/>
        })}
      </div>
    </div>
  );
};

export default Home;

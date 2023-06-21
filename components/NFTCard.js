"use client";

import React from "react";

const NFTCard = ({ nft }) => {
  return (
    <div className="bg-slate-300 rounded-md flex flex-col m-4 justify-between md:w-[20em] h-[30em]">
      <div>
        <div>
          <img loading="lazy" src={nft.media[0].gateway} alt="" className="object-cover w-full h-[20em]" />
        </div>
        <div className="p-2">
          <div>
            <h2 className="font-[600]">{nft.title}</h2>
            <p>{nft.id.tokenId.substr(nft.id.tokenId.length - 4)}</p>
            <p>
              {nft.id.tokenId.substr(0, 5)}...{nft.id.tokenId.substr(nft.id.tokenId.length - 4)}
            </p>
            <p>{nft.description?.substr(0,20)}</p>
          </div>
        </div>
      </div>
      <a
        className="bg-black text-center p-3 font-[600] text-white hover:text-slate-300"
        href={`https://etherscan.io/token/${nft.contract.address}`}
        target="_blank">
        <button>view in etherscan</button>
      </a>
    </div>
  );
};

export default NFTCard;

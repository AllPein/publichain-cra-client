import React, { FC } from 'react';

import DefaultNftCard from '@/assets/icons/diamond.png';
import { EthereumIcon } from '@/components/Icons/EthereumIcon';
import { PolygonIcon } from '@/components/Icons/PolygonIcon';
import { NetworkType, NftState } from '@/types/nft';

const networkToIcon = {
  [NetworkType.ETHEREUM]: <EthereumIcon className="cursor-pointer h-4 w-4" />,
  [NetworkType.POLYGON]: <PolygonIcon className="cursor-pointer h-4 w-4" />,
};

type NftProps = {
  data: NftState;
};

export const Nft: FC<NftProps> = ({ data }) => {
  return (
    <div className="w-full flex justify-center my-12">
      <div className="text-center max-w-sm bg-white border border-gray-200 rounded-xl shadow">
        {data?.imageUrl ? (
          <img
            className="rounded-t-xl"
            style={{ width: 382, height: 382 }}
            src={data?.imageUrl}
            alt=""
          />
        ) : (
          <div
            className="bg-gray-100 rounded-t-xl flex items-center justify-center"
            style={{ width: 382, height: 382 }}
          >
            <img src={DefaultNftCard} className="w-32 h-32" alt="" />
          </div>
        )}
        <div className="p-5">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
            {data.name}
          </h5>
          <a
            target="_blank"
            href={`https://etherscan.io/address/${data.tokenAddress}`}
            rel="noreferrer"
          >
            <span className="transition duration-300 ease-in-out inline-block  cursor-pointer bg-gray-100 hover:bg-gray-200 rounded-full px-3 py-1 text-xs font-normal text-gray-500 hover:text-gray-700 mr-2 mb-2">
              {data.tokenAddress.slice(0, 10)}...
            </span>
          </a>
          <div className="flex justify-end">{networkToIcon[data.network]}</div>
        </div>
      </div>
    </div>
  );
};

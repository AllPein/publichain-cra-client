import React, { FC, useCallback, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import debounce from 'lodash.debounce';

import DefaultNftCard from '@/assets/icons/diamond.png';
import { Button } from '@/components/Button/Button';
import { Modal } from '@/components/Modal/Modal';
import { Select } from '@/components/Select/Select';
import { ModalActions, ModalData } from '@/store/Modal/ModalActions';
import { selectNftModal } from '@/store/Modal/ModalSelectors';
import { RootState } from '@/store/StoreTypes';
import { NftAction } from '@/store/nft/NftActions';
import {
  selectNftInformation,
  selectNftInformationError,
} from '@/store/nft/NftSelectors';
import { NetworkType, NetworkTypeToName } from '@/types/nft';

const networkOptions = [
  {
    name: NetworkTypeToName[NetworkType.ETHEREUM],
    value: NetworkType.ETHEREUM,
  },
  {
    name: NetworkTypeToName[NetworkType.POLYGON],
    value: NetworkType.POLYGON,
  },
  {
    name: NetworkTypeToName[NetworkType.GOERLI],
    value: NetworkType.GOERLI,
  },
];

const CHANGE_DEBOUNCE_TIME = 300;

export const AddNftModal: FC = () => {
  /** Store */
  const dispatch = useDispatch();
  const modalData: ModalData<string> = useSelector(selectNftModal);
  const nftInformation = useSelector((state: RootState) =>
    selectNftInformation(state, modalData.payload || ''),
  );
  const nftInformationError = useSelector((state: RootState) =>
    selectNftInformationError(state, modalData.payload || ''),
  );

  const [tokenAddress, setTokenAddress] = useState('');
  const [tokenId, setTokenId] = useState('');
  const [network, setNetwork] = useState(networkOptions[0]);

  /** Methods */
  const onClose = useCallback(() => {
    dispatch(ModalActions.closeModal('nft'));
  }, [dispatch]);

  const handleCreateBlock = useCallback(() => {
    onClose();
  }, [onClose]);

  const handleChangeTokenAddress = (e) => {
    setTokenAddress(e.target.value);
  };

  const findNftInfo = useMemo(
    () =>
      debounce((value) => {
        dispatch(
          NftAction.getNftInformation({
            id: modalData.payload as string,
            tokenAddress,
            tokenId: value,
            network: network.value,
          }),
        );
      }, CHANGE_DEBOUNCE_TIME),
    [dispatch, modalData.payload, tokenAddress, network.value],
  );

  const handleChangeTokenId = (e) => {
    const value = e.target.value;
    setTokenId(value);
    if (value.length && tokenAddress.length) {
      findNftInfo(value);
    }
  };

  const handleChangeNetwork = (value) => {
    setNetwork(value);
  };

  if (!modalData || !modalData.payload) {
    return null;
  }

  const body = (
    <div
      style={{ height: 450 }}
      className="flex overflow-hidden bg-white rounded-lg shadow-lg w-full mt-12"
    >
      <div className="text-center w-1/2 cursor-pointer bg-white border border-gray-200 rounded-xl shadow">
        {nftInformation?.imageUrl ? (
          <img
            style={{ height: 340 }}
            className="rounded-t-xl w-full"
            src={nftInformation?.imageUrl}
            alt=""
          />
        ) : (
          <div
            className="bg-gray-100 rounded-t-xl w-full flex items-center justify-center"
            style={{ height: 340 }}
          >
            <img src={DefaultNftCard} className="w-32 h-32" alt="" />
          </div>
        )}
        <div className="p-5">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
            {nftInformation?.name || (
              <div role="status" className="w-full animate-pulse">
                <div className="h-6 bg-gray-200 rounded-full mb-4"></div>
              </div>
            )}
          </h5>
          {!nftInformation?.tokenAddress ? (
            <div
              role="status"
              className="w-full flex justify-center animate-pulse"
            >
              <div className="h-3 w-48 bg-gray-200 rounded-full mb-4"></div>
            </div>
          ) : (
            <a
              target="_blank"
              href={`https://etherscan.io/address/${nftInformation?.tokenAddress}`}
              rel="noreferrer"
            >
              <span className="inline-block bg-gray-200 hover:bg-gray-100 rounded-full px-3 py-1 text-xs font-light text-gray-700 mr-2 mb-2">
                {nftInformation?.tokenAddress.slice(0, 10)}...
              </span>
            </a>
          )}
        </div>
      </div>
      <div className="py-12 px-6 text-gray-800 flex flex-col justify-between w-1/2">
        <form className="space-y-8" action="#">
          <div>
            <label className="block my-2 text-base font-medium text-gray-900">
              Network
            </label>
            <Select
              value={network}
              options={networkOptions}
              onChange={handleChangeNetwork}
            />
          </div>
          <div>
            <label className="block my-2 text-base font-medium text-gray-900">
              Contract Address
            </label>
            <input
              type="tokenAddress"
              name="tokenAddress"
              id="tokenAddress"
              onChange={handleChangeTokenAddress}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="e.g. 0xff9c…13d7"
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-base font-medium text-gray-900">
              Token ID
            </label>
            <input
              name="tokenId"
              onChange={handleChangeTokenId}
              id="tokenId"
              placeholder="e.g. 420"
              className="bg-gray-50 border max-h-64 border-gray-300 text-gray-900 text-basae rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            />
          </div>
        </form>
        {nftInformationError && (
          <div className="mt-4 break-word text-red-600">
            NFT with provided data has not been found
          </div>
        )}
      </div>
    </div>
  );

  const footer = (
    <Button
      disabled={!nftInformation || !tokenId.length}
      className="mt-6 text-center"
      onClick={handleCreateBlock}
    >
      Create block
    </Button>
  );

  return (
    <Modal
      onClose={onClose}
      closable
      title="Embed NFT"
      isOpen={modalData.isOpen}
      footer={footer}
    >
      {body}
    </Modal>
  );
};

import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Button } from '@/components/Button/Button';
import { UserAction } from '@/store/user/UserAction';
import { selectUserInfo } from '@/store/user/UserSelectors';
import { trimAccountAddress } from '@/utils/stringHelper';

export const AccountPage = () => {
  const dispatch = useDispatch();

  const accountInfo = useSelector(selectUserInfo);

  const [name, setName] = useState<string>('');
  const [bio, setBio] = useState<string>('');

  useEffect(() => {
    if (accountInfo) {
      setName(accountInfo.name);
      setBio(accountInfo.bio || '');
    }
  }, [accountInfo]);

  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  const handleChangeBio = (e) => {
    setBio(e.target.value);
  };

  const handleUpdateUser = useCallback(() => {
    dispatch(
      UserAction.initUpdateUser({ address: accountInfo!.address!, name, bio }),
    );
  }, [dispatch, accountInfo, name, bio]);

  return (
    <div className="flex justify-center font-poppins pt-2">
      <div className="shadow-xl w-1/2 text-center py-12 rounded-t-sm">
        <div className="flex justify-center">
          <img
            src={accountInfo?.imageUrl}
            className="rounded-full w-32 h-32"
            alt=""
            loading="lazy"
          />
        </div>
        {name.length ? (
          <h1 className="text-xl mt-6 mb-2 h-6">{name}</h1>
        ) : (
          <div className="w-full flex justify-center">
            <div role="status" className="mt-6 w-64 text-center animate-pulse">
              <div className="h-6 bg-gray-200 rounded-md mb-2"></div>
            </div>
          </div>
        )}
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-xs mt-2 font-light text-gray-700 mr-2 mb-2">
          {trimAccountAddress(accountInfo?.address || '')}
        </span>
        <form className="space-y-8 mt-8 px-12 text-left">
          <div>
            <label className="block my-4 text-lg font-normal text-gray-900">
              Your full name
            </label>
            <input
              type="name"
              name="name"
              value={name}
              onChange={handleChangeName}
              id="name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Jane Doe"
              required
            />
          </div>
          <div className="mt-12">
            <label className="block mb-4 text-lg font-normal text-gray-900">
              Tell everyone about yourself
            </label>
            <textarea
              value={bio}
              onChange={handleChangeBio}
              name="description"
              id="description"
              placeholder="Your bio here"
              className="bg-gray-50 border max-h-32 border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </div>
        </form>

        <Button onClick={handleUpdateUser} className="mt-10 w-48">
          Save
        </Button>
      </div>
    </div>
  );
};

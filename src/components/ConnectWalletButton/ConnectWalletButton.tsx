import React from 'react';
import { useDispatch } from 'react-redux';

import { Button } from '@/components/Button/Button';
import { LoaderAction } from '@/store/loader/LoaderActions';
import { WebsocketAction } from '@/store/websocket/websocketActions';

const ConnectWalletButton = ({ loading }) => {
  const dispatch = useDispatch();

  const handleConnectWalletClick = () => {
    dispatch(LoaderAction.setLoading('auth'));
    dispatch(
      WebsocketAction.sendMessage({
        event: 'LOGIN',
      }),
    );
  };

  return (
    <Button onClick={handleConnectWalletClick} loading={loading}>
      Connect wallet
    </Button>
  );
};

export { ConnectWalletButton };

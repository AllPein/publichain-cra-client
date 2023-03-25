import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ReactComponent as Logo } from '@/assets/icons/logo.svg';
import { AccountMenu } from '@/components/AccountMenu/AccountMenu';
import { ConnectWalletButton } from '@/components/ConnectWalletButton/ConnectWalletButton';
import { useMount } from '@/hooks/useMount';
import { selectAuthLoading } from '@/store/loader/LoaderSelectors';
import { selectIsLoggedIn, selectUserInfo } from '@/store/user/UserSelectors';
import { createWebsocket } from '@/utils/WebsocketHelper';
import { goTo } from '@/utils/routerActions';

const ApplicationHeader = () => {
  const dispatch = useDispatch();
  const accountInfo = useSelector(selectUserInfo);
  const isLoading = useSelector(selectAuthLoading);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  useMount(() => {
    const init = async () => {
      await createWebsocket({ dispatch });
    };

    init();
  });

  return (
    <nav
      className="flex-no-wrap relative flex w-full items-center justify-between bg-white py-4 shadow-black/5 lg:flex-wrap lg:justify-start"
      data-te-navbar-ref
    >
      <div className="flex w-full flex-wrap items-center justify-between px-6">
        <div
          className="!visible hidden flex-grow basis-[100%] items-center lg:!flex lg:basis-auto"
          id="navbarSupportedContent1"
          data-te-collapse-item
        >
          <a
            className="cursor-pointer mt-2 mr-2 flex items-center text-neutral-900 hover:text-neutral-900 focus:text-neutral-900 lg:mt-0"
            onClick={() => goTo('/explore')}
          >
            {/* <img src={Logo} style={{ height: '50px' }} alt="" loading="lazy" /> */}
            <Logo style={{ height: '50px' }} />
          </a>
        </div>

        {isLoggedIn ? (
          <AccountMenu accountInfo={accountInfo} />
        ) : (
          <ConnectWalletButton loading={isLoading} />
        )}
      </div>
    </nav>
  );
};

export { ApplicationHeader };

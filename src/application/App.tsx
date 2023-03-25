import React from 'react';

import { Provider } from '@/application/Provider/Provider';
import { Root } from '@/application/Root/Root';
import { Modals } from '@/components/Modals/Modals';
import ScrollRestoration from '@/components/ScrollRestoration/ScrollRestoration';
import { ScrollToTop } from '@/components/ScrollToTop/ScrollToTop';
import { useMount } from '@/hooks/useMount';
import { projectService } from '@/services/ProjectService';
import { AxiosClient } from '@/services/axios-client';

const App = () => {
  useMount(() => {
    const init = async () => {
      try {
        const axiosClient = new AxiosClient();
        axiosClient.init(process.env.REACT_APP_BASE_API_URL!);

        await projectService.init(axiosClient);
      } catch (e) {
        throw e;
      }
    };

    init();
  });

  return (
    <Provider>
      <ScrollRestoration />
      <Root />
      <Modals />
      <ScrollToTop />
    </Provider>
  );
};

export { App };

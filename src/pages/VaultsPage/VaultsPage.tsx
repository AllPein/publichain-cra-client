import React from 'react';

import { goTo } from '@/utils/routerActions';

const VaultsPage: React.FC = () => {
  return <button onClick={() => goTo('/article/1')}>Read article</button>;
};

export { VaultsPage };

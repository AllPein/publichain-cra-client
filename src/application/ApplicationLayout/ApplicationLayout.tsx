import { ApplicationHeader } from '@/components/ApplicationHeader/ApplicationHeader';
import React from 'react';

type Props = {
  children: React.ReactNode;
};

const ApplicationLayout: React.FC<Props> = ({ children }) => (
  <>
    <ApplicationHeader />
    {children}
  </>
);

export { ApplicationLayout };

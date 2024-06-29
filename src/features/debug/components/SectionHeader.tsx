import React, { PropsWithChildren } from 'react';

const SectionHeader = ({ children }: PropsWithChildren) => {
  return <div className="text-lg font-bold">{children}</div>;
};

export default SectionHeader;

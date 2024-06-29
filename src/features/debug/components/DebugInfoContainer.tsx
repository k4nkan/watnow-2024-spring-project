import React, { PropsWithChildren } from 'react';

const DebugInfoContainer = ({ children }: PropsWithChildren) => {
  return <div className="flex flex-col gap-2">{children}</div>;
};

export default DebugInfoContainer;

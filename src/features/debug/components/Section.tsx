import { PropsWithChildren } from 'react';

const Section = ({ children }: PropsWithChildren) => {
  return <div className="flex flex-col gap-3">{children}</div>;
};

export default Section;

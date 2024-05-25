import Image from 'next/image';

interface sizeProps {
  size: number;
}

function GoogleGLogo({ size }: sizeProps) {
  return (
    <Image src="/GoogleGLogo.svg" width={size} height={size} alt="GoogleLogo" />
  );
}

export default GoogleGLogo;

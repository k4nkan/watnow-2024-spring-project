import Link from 'next/link';

export default function Page() {
  return (
    <div className="mx-auto max-w-xl px-6 py-12">
      <h1 className="mb-6 text-center text-4xl font-bold text-gray-900">
        sanchezyspace Next.js Template
      </h1>
      <p className="mb-4 text-lg text-gray-600">
        This is a template for Next.js (App Router) + TypeScript + Tailwind CSS
        + Firebase
      </p>
      <p className="text-lg text-gray-600">
        We welcome contributions! Please visit our GitHub repository to
        contribute:{' '}
        <Link
          href="https://github.com/sanchezyspace/next-template"
          className="text-blue-600 transition duration-100 ease-in-out hover:text-blue-300"
        >
          GitHub Repository
        </Link>
      </p>
    </div>
  );
}

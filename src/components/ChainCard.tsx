import { ChainData } from '@/types/chain'
import Image from 'next/image'

interface ChainCardProps {
  chain: ChainData
}

export default function ChainCard({ chain }: ChainCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-6">
      <div className="flex items-center mb-4">
        {chain.icon && (
          <Image
            src={chain.icon}
            width={32}
            height={32}
            alt={`${chain.name} icon`}
            className="w-8 h-8 mr-3 rounded-full"
            onError={(e) => {
              e.currentTarget.style.display = 'none'
            }}
          />
        )}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {chain.name}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {chain.shortName}
          </p>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex justify-between">
          <span className="text-sm text-gray-600 dark:text-gray-300">Chain ID:</span>
          <span className="text-sm font-medium text-gray-900 dark:text-white">
            {chain.chainId}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-600 dark:text-gray-300">Currency:</span>
          <span className="text-sm font-medium text-gray-900 dark:text-white">
            {chain.nativeCurrency.symbol}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-600 dark:text-gray-300">RPC Count:</span>
          <span className="text-sm font-medium text-gray-900 dark:text-white">
            {chain.rpc.length}
          </span>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {chain.explorers?.slice(0, 2).map((explorer, index) => (
          <a
            key={index}
            href={explorer.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-blue-100 text-blue-800 hover:bg-blue-200 transition-colors"
          >
            {explorer.name}
          </a>
        ))}
      </div>

      {chain.infoURL && (
        <a
          href={chain.infoURL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          Learn More
          <svg
            className="w-4 h-4 ml-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        </a>
      )}
    </div>
  )
}

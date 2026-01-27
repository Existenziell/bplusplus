import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import TransactionDetail from '@/app/components/TransactionDetail'
import Footer from '@/app/components/Footer'
import { SITE_URL } from '@/app/utils/metadata'

interface PageProps {
  params: Promise<{ txid: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { txid } = await params
  return {
    title: `Transaction ${txid.slice(0, 8)}... | B++`,
    description: `Bitcoin transaction details including inputs, outputs, fees, and more.`,
    openGraph: {
      title: `Transaction ${txid.slice(0, 8)}... | B++`,
      description: `Bitcoin transaction details`,
      url: `${SITE_URL}/block-visual/tx/${txid}`,
    },
  }
}

export default async function TransactionPage({ params }: PageProps) {
  const { txid } = await params

  if (!txid || txid.length !== 64) {
    notFound()
  }

  return (
    <main className="flex-1 page-bg flex flex-col">
      <div className="flex-grow">
        <div className="container-content">
          <div className="max-w-7xl mx-auto">
            <TransactionDetail txid={txid} />
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}

import React from 'react'
import { Eye } from 'phosphor-react'

/**
 * RecentInvoices Component
 * Displays list of recent invoices
 */
const RecentInvoices = () => {
  const invoices = [
    {
      id: '#PAVC500021',
      patientName: 'Adrian Marshall',
      initial: 'A',
      date: '03 Nov 2024',
      amount: 450,
      color: 'bg-blue-500'
    },
    {
      id: '#PAVC500022',
      patientName: 'Patricia Smith',
      initial: 'P',
      date: '02 Nov 2024',
      amount: 350,
      color: 'bg-green-500'
    },
    {
      id: '#PAVC500023',
      patientName: 'George Wilson',
      initial: 'G',
      date: '01 Nov 2024',
      amount: 500,
      color: 'bg-gray-500'
    },
    {
      id: '#PAVC500024',
      patientName: 'Sarah Johnson',
      initial: 'S',
      date: '31 Oct 2024',
      amount: 400,
      color: 'bg-purple-500'
    },
    {
      id: '#PAVC500025',
      patientName: 'Michael Brown',
      initial: 'M',
      date: '30 Oct 2024',
      amount: 600,
      color: 'bg-yellow-500'
    },
    {
      id: '#PAVC500026',
      patientName: 'Emily Davis',
      initial: 'E',
      date: '29 Oct 2024',
      amount: 300,
      color: 'bg-pink-500'
    }
  ]

  return (
    <div className='bg-white rounded-lg p-5 border border-gray-200'>
      <div className='flex items-center justify-between mb-4'>
        <h3 className='text-lg font-semibold text-gray-800'>Recent Invoices</h3>
        <button className='text-sm text-blue-600 hover:text-blue-700 font-medium'>
          View All &gt;
        </button>
      </div>

      <div className='space-y-3'>
        {invoices.map((invoice, index) => (
          <div
            key={index}
            className='flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors'
          >
            {/* Avatar */}
            <div
              className={`w-10 h-10 rounded-full ${invoice.color} flex items-center justify-center text-white font-semibold`}
            >
              {invoice.initial}
            </div>

            {/* Invoice Info */}
            <div className='flex-1'>
              <p className='font-medium text-gray-800'>{invoice.patientName}</p>
              <p className='text-xs text-gray-500'>{invoice.id}</p>
              <p className='text-xs text-gray-500 mt-1'>{invoice.date}</p>
            </div>

            {/* Amount and View Button */}
            <div className='flex items-center gap-3'>
              <div className='text-right'>
                <p className='text-sm font-medium text-gray-800'>
                  Amount: {invoice.amount} ₹
                </p>
              </div>
              <button className='p-2 hover:bg-blue-50 rounded-lg transition-colors'>
                <Eye size={18} className='text-blue-600' />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RecentInvoices


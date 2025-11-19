import React from 'react'
import { Paperclip, FilePdf, ImageSquare, FileText, CloudArrowDown } from 'phosphor-react'

const getIcon = (type) => {
  if (!type) return <Paperclip size={18} className='text-gray-500' />
  if (type.includes('pdf')) return <FilePdf size={18} className='text-red-500' />
  if (type.includes('image')) return <ImageSquare size={18} className='text-indigo-500' />
  if (type.includes('doc')) return <FileText size={18} className='text-sky-500' />
  return <Paperclip size={18} className='text-gray-500' />
}

const formatSize = (size) => {
  if (!size) return ''
  const kb = size / 1024
  if (kb < 1024) return `${kb.toFixed(0)} KB`
  return `${(kb / 1024).toFixed(1)} MB`
}

const AttachmentPreview = ({ title, subtitle, files = [] }) => {
  return (
    <div className='bg-gray-50 border border-dashed border-gray-200 rounded-xl p-4 space-y-3'>
      <div className='flex items-center justify-between'>
        <div>
          <p className='text-sm font-semibold text-gray-700'>{title}</p>
          {subtitle && <p className='text-xs text-gray-500'>{subtitle}</p>}
        </div>
        <Paperclip size={18} className='text-gray-400' />
      </div>

      {files.length === 0 ? (
        <p className='text-xs text-gray-400'>No uploads yet</p>
      ) : (
        <div className='flex flex-wrap gap-3'>
          {files.map((file, index) => (
            <div
              key={`${file.name}-${index}`}
              className='flex items-center gap-3 bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 shadow-sm'
            >
              <div className='flex items-center gap-2'>
                {getIcon(file.type || file.name)}
                <div>
                  <p className='font-medium text-gray-800 truncate max-w-[160px]' title={file.name}>
                    {file.name}
                  </p>
                  <p className='text-xs text-gray-400'>{formatSize(file.size)}</p>
                </div>
              </div>
              <button className='p-1.5 rounded-md bg-gray-100 hover:bg-gray-200 transition-colors'>
                <CloudArrowDown size={16} className='text-gray-500' />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default AttachmentPreview



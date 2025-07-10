'use client'

import { useState } from 'react'
import { Upload, FileText, Download, Trash2, Eye, Calendar, DollarSign, Search, Filter, CheckCircle, AlertCircle, Info } from 'lucide-react'

interface Document {
  id: string
  name: string
  type: 'peco' | 'hoa' | 'legal' | 'insurance' | 'tax' | 'other'
  uploadDate: string
  size: string
  amount?: number
  dueDate?: string
  status: 'pending' | 'paid' | 'overdue' | 'review'
  originalName?: string
}

interface RenameNotification {
  id: string
  originalName: string
  newName: string
  type: string
  amount?: number
  extractedDate: string
  timestamp: number
}

export default function DocumentManagement() {
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: '1',
      name: 'PECO_Electric_Bill_Dec2024.pdf',
      type: 'peco',
      uploadDate: '2024-12-15',
      size: '245 KB',
      amount: 127.45,
      dueDate: '2025-01-15',
      status: 'pending'
    },
    {
      id: '2',
      name: 'HOA_Payment_Nov2024.pdf',
      type: 'hoa',
      uploadDate: '2024-11-30',
      size: '189 KB',
      amount: 813.00,
      dueDate: '2024-12-01',
      status: 'paid'
    },
    {
      id: '3',
      name: 'Property_Insurance_Policy.pdf',
      type: 'insurance',
      uploadDate: '2024-10-20',
      size: '1.2 MB',
      amount: 1200.00,
      dueDate: '2025-10-20',
      status: 'review'
    },
    {
      id: '4',
      name: 'Divorce_Settlement_Agreement.pdf',
      type: 'legal',
      uploadDate: '2024-09-15',
      size: '856 KB',
      status: 'review'
    }
  ])

  const [filter, setFilter] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [dragActive, setDragActive] = useState(false)
  const [notifications, setNotifications] = useState<RenameNotification[]>([])

  const documentTypes = [
    { id: 'all', label: 'All Documents', count: documents.length },
    { id: 'peco', label: 'PECO Bills', count: documents.filter(d => d.type === 'peco').length },
    { id: 'hoa', label: 'HOA Payments', count: documents.filter(d => d.type === 'hoa').length },
    { id: 'legal', label: 'Legal Documents', count: documents.filter(d => d.type === 'legal').length },
    { id: 'insurance', label: 'Insurance', count: documents.filter(d => d.type === 'insurance').length },
    { id: 'tax', label: 'Tax Documents', count: documents.filter(d => d.type === 'tax').length },
    { id: 'other', label: 'Other', count: documents.filter(d => d.type === 'other').length }
  ]

  const filteredDocuments = documents.filter(doc => {
    const matchesFilter = filter === 'all' || doc.type === filter
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'text-neon-green'
      case 'pending': return 'text-yellow-400'
      case 'overdue': return 'text-red-400'
      case 'review': return 'text-neon-blue'
      default: return 'text-gray-400'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'peco': return '⚡'
      case 'hoa': return '🏢'
      case 'legal': return '⚖️'
      case 'insurance': return '🛡️'
      case 'tax': return '📊'
      default: return '📄'
    }
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files)
    }
  }

  // Intelligent document analysis and renaming
  const analyzeAndRenameDocument = (file: File) => {
    const fileName = file.name.toLowerCase()
    const fileContent = fileName // In real app, would use OCR/text extraction
    
    // Extract dates from filename or content
    const extractDate = (text: string): string => {
      // Look for various date formats
      const datePatterns = [
        /(\d{4})[_-](\d{1,2})[_-](\d{1,2})/,  // YYYY-MM-DD or YYYY_MM_DD
        /(\d{1,2})[_-](\d{1,2})[_-](\d{4})/,  // MM-DD-YYYY or MM_DD_YYYY
        /(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*[_\s-]*(\d{4})/i, // Month YYYY
        /(\d{4})[_\s-]*(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i, // YYYY Month
        /(january|february|march|april|may|june|july|august|september|october|november|december)[_\s-]*(\d{4})/i,
        /(\d{1,2})[_\s-]*(january|february|march|april|may|june|july|august|september|october|november|december)[_\s-]*(\d{4})/i
      ]
      
      for (const pattern of datePatterns) {
        const match = text.match(pattern)
        if (match) {
          try {
            let year, month, day
            
            if (pattern.source.includes('jan|feb|mar')) {
              // Month name patterns
              const monthNames = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec']
              const fullMonthNames = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december']
              
              if (match[1] && match[2]) {
                const monthStr = match[1].toLowerCase().substring(0, 3)
                month = monthNames.indexOf(monthStr) + 1
                year = parseInt(match[2])
              } else if (match[2] && match[1]) {
                const monthStr = match[2].toLowerCase().substring(0, 3)
                month = monthNames.indexOf(monthStr) + 1
                year = parseInt(match[1])
              }
              day = 1 // Default to first of month
            } else if (match[1] && match[2] && match[3]) {
              // Numeric date patterns
              if (match[1].length === 4) {
                // YYYY-MM-DD format
                year = parseInt(match[1])
                month = parseInt(match[2])
                day = parseInt(match[3])
              } else {
                // MM-DD-YYYY format
                month = parseInt(match[1])
                day = parseInt(match[2])
                year = parseInt(match[3])
              }
            }
            
            if (year && month && year > 2000 && year < 2030 && month >= 1 && month <= 12) {
              return `${year}-${month.toString().padStart(2, '0')}-${(day || 1).toString().padStart(2, '0')}`
            }
          } catch (e) {
            continue
          }
        }
      }
      
      // Default to current date if no date found
      return new Date().toISOString().split('T')[0]
    }
    
    // Determine document type and extract relevant info
    const determineDocumentType = (fileName: string, content: string) => {
      const text = (fileName + ' ' + content).toLowerCase()
      
      // PECO/Electric bills
      if (text.includes('peco') || text.includes('electric') || text.includes('utility') || text.includes('kwh')) {
        return { type: 'peco' as const, category: 'Electric' }
      }
      
      // HOA payments
      if (text.includes('hoa') || text.includes('homeowner') || text.includes('association') || text.includes('condo fee') || text.includes('maintenance fee')) {
        return { type: 'hoa' as const, category: 'HOA' }
      }
      
      // Legal documents
      if (text.includes('legal') || text.includes('divorce') || text.includes('settlement') || text.includes('agreement') || text.includes('contract') || text.includes('deed')) {
        return { type: 'legal' as const, category: 'Legal' }
      }
      
      // Insurance
      if (text.includes('insurance') || text.includes('policy') || text.includes('coverage') || text.includes('premium')) {
        return { type: 'insurance' as const, category: 'Insurance' }
      }
      
      // Tax documents
      if (text.includes('tax') || text.includes('1099') || text.includes('w2') || text.includes('irs') || text.includes('property tax')) {
        return { type: 'tax' as const, category: 'Tax' }
      }
      
      return { type: 'other' as const, category: 'Other' }
    }
    
    // Extract amount from filename (basic pattern matching)
    const extractAmount = (text: string): number | undefined => {
      const amountPatterns = [
        /\$(\d{1,3}(?:,\d{3})*(?:\.\d{2})?)/,  // $123.45 or $1,234.56
        /(\d{1,3}(?:,\d{3})*(?:\.\d{2})?)\s*(?:dollars?|usd|\$)/i,  // 123.45 dollars
        /amount[:\s]*\$?(\d{1,3}(?:,\d{3})*(?:\.\d{2})?)/i,  // amount: $123.45
        /total[:\s]*\$?(\d{1,3}(?:,\d{3})*(?:\.\d{2})?)/i   // total: $123.45
      ]
      
      for (const pattern of amountPatterns) {
        const match = text.match(pattern)
        if (match && match[1]) {
          const amount = parseFloat(match[1].replace(/,/g, ''))
          if (amount > 0 && amount < 100000) { // Reasonable range
            return amount
          }
        }
      }
      return undefined
    }
    
    const extractedDate = extractDate(fileName)
    const { type, category } = determineDocumentType(fileName, '')
    const amount = extractAmount(fileName)
    
    // Generate standardized filename
    const dateFormatted = new Date(extractedDate).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short'
    }).replace(' ', '')
    
    const extension = file.name.split('.').pop() || 'pdf'
    const standardizedName = `${category}_${dateFormatted}.${extension}`
    
    return {
      originalName: file.name,
      standardizedName,
      type,
      extractedDate,
      amount,
      category
    }
  }

  const handleFiles = (files: FileList) => {
    Array.from(files).forEach(file => {
      const analysis = analyzeAndRenameDocument(file)
      
      // In a real app, you would upload the file to a server with the new name
      const newDoc: Document = {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        name: analysis.standardizedName,
        type: analysis.type,
        uploadDate: new Date().toISOString().split('T')[0],
        size: `${Math.round(file.size / 1024)} KB`,
        amount: analysis.amount,
        dueDate: analysis.type === 'peco' || analysis.type === 'hoa' ?
          new Date(new Date(analysis.extractedDate).getTime() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] :
          undefined,
        status: analysis.amount ? 'pending' : 'review',
        originalName: analysis.originalName
      }
      
      setDocuments(prev => [newDoc, ...prev])
      
      // Create notification for user feedback
      const notification: RenameNotification = {
        id: newDoc.id,
        originalName: analysis.originalName,
        newName: analysis.standardizedName,
        type: analysis.category,
        amount: analysis.amount,
        extractedDate: analysis.extractedDate,
        timestamp: Date.now()
      }
      
      setNotifications(prev => [notification, ...prev.slice(0, 4)]) // Keep only 5 most recent
      
      // Auto-remove notification after 10 seconds
      setTimeout(() => {
        setNotifications(prev => prev.filter(n => n.id !== notification.id))
      }, 10000)
    })
  }

  const deleteDocument = (id: string) => {
    setDocuments(prev => prev.filter(doc => doc.id !== id))
  }

  const dismissNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }

  return (
    <div className="space-y-6">
      {/* Intelligent Renaming Notifications */}
      {notifications.length > 0 && (
        <div className="fixed top-4 right-4 z-50 space-y-2 max-w-md">
          {notifications.map(notification => (
            <div
              key={notification.id}
              className="card-dark border border-neon-green/30 shadow-lg animate-slide-in"
            >
              <div className="flex items-start space-x-3">
                <CheckCircle className="text-neon-green mt-1 flex-shrink-0" size={20} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium text-neon-green">Document Intelligently Renamed</h4>
                    <button
                      onClick={() => dismissNotification(notification.id)}
                      className="text-gray-400 hover:text-white"
                    >
                      ×
                    </button>
                  </div>
                  <div className="mt-2 space-y-1 text-xs">
                    <div className="text-gray-400">
                      <span className="font-medium">Original:</span> {notification.originalName}
                    </div>
                    <div className="text-white">
                      <span className="font-medium">Renamed:</span> {notification.newName}
                    </div>
                    <div className="flex items-center space-x-4 text-gray-300">
                      <span>📁 {notification.type}</span>
                      <span>📅 {new Date(notification.extractedDate).toLocaleDateString()}</span>
                      {notification.amount && (
                        <span className="text-neon-green">💰 ${notification.amount.toFixed(2)}</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upload Area */}
      <div className="card-dark">
        <h3 className="text-lg font-semibold mb-4 neon-text flex items-center">
          <Upload className="mr-2" size={20} />
          Document Upload
        </h3>
        
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            dragActive 
              ? 'border-neon-green bg-neon-green/5' 
              : 'border-dark-border hover:border-neon-green/50'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <Upload className="mx-auto mb-4 text-gray-400" size={48} />
          <p className="text-lg font-medium text-white mb-2">
            Drop files here or click to upload
          </p>
          <p className="text-sm text-gray-400 mb-4">
            Supports PDF, JPG, PNG files up to 10MB
          </p>
          <input
            type="file"
            multiple
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={(e) => e.target.files && handleFiles(e.target.files)}
            className="hidden"
            id="file-upload"
          />
          <label
            htmlFor="file-upload"
            className="btn-neon cursor-pointer inline-block"
          >
            Choose Files
          </label>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="card-dark">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
          <h3 className="text-lg font-semibold neon-text flex items-center">
            <FileText className="mr-2" size={20} />
            Document Library
          </h3>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                placeholder="Search documents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-dark pl-10 w-full sm:w-64"
              />
            </div>
            
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="input-dark w-full sm:w-auto"
            >
              {documentTypes.map(type => (
                <option key={type.id} value={type.id}>
                  {type.label} ({type.count})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Document Type Filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          {documentTypes.map(type => (
            <button
              key={type.id}
              onClick={() => setFilter(type.id)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                filter === type.id
                  ? 'bg-neon-green text-black'
                  : 'bg-dark-bg text-gray-400 hover:text-white hover:bg-dark-border'
              }`}
            >
              {type.label} ({type.count})
            </button>
          ))}
        </div>

        {/* Documents Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-dark-border">
                <th className="text-left py-3 text-gray-300">Document</th>
                <th className="text-left py-3 text-gray-300">Type</th>
                <th className="text-right py-3 text-gray-300">Amount</th>
                <th className="text-center py-3 text-gray-300">Due Date</th>
                <th className="text-center py-3 text-gray-300">Status</th>
                <th className="text-center py-3 text-gray-300">Upload Date</th>
                <th className="text-center py-3 text-gray-300">Size</th>
                <th className="text-center py-3 text-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredDocuments.map(doc => (
                <tr key={doc.id} className="border-b border-dark-border/50 hover:bg-dark-bg/50">
                  <td className="py-3">
                    <div className="flex items-center space-x-3">
                      <span className="text-lg">{getTypeIcon(doc.type)}</span>
                      <div>
                        <div className="font-medium text-white">{doc.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3">
                    <span className="px-2 py-1 rounded text-xs bg-dark-bg text-gray-300 capitalize">
                      {doc.type}
                    </span>
                  </td>
                  <td className="py-3 text-right">
                    {doc.amount ? (
                      <span className="font-medium text-white">${doc.amount.toFixed(2)}</span>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                  <td className="py-3 text-center">
                    {doc.dueDate ? (
                      <span className="text-gray-300">{new Date(doc.dueDate).toLocaleDateString()}</span>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                  <td className="py-3 text-center">
                    <span className={`px-2 py-1 rounded text-xs font-medium capitalize ${getStatusColor(doc.status)}`}>
                      {doc.status}
                    </span>
                  </td>
                  <td className="py-3 text-center text-gray-300">
                    {new Date(doc.uploadDate).toLocaleDateString()}
                  </td>
                  <td className="py-3 text-center text-gray-300">
                    {doc.size}
                  </td>
                  <td className="py-3">
                    <div className="flex items-center justify-center space-x-2">
                      <button className="text-gray-400 hover:text-neon-blue transition-colors">
                        <Eye size={16} />
                      </button>
                      <button className="text-gray-400 hover:text-neon-green transition-colors">
                        <Download size={16} />
                      </button>
                      <button 
                        onClick={() => deleteDocument(doc.id)}
                        className="text-gray-400 hover:text-red-400 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredDocuments.length === 0 && (
          <div className="text-center py-8">
            <FileText className="mx-auto mb-4 text-gray-400" size={48} />
            <p className="text-gray-400">No documents found matching your criteria.</p>
          </div>
        )}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card-dark">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Total Documents</p>
              <p className="text-2xl font-bold text-white">{documents.length}</p>
            </div>
            <FileText className="text-neon-blue" size={32} />
          </div>
        </div>

        <div className="card-dark">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Pending Payments</p>
              <p className="text-2xl font-bold text-yellow-400">
                {documents.filter(d => d.status === 'pending').length}
              </p>
            </div>
            <Calendar className="text-yellow-400" size={32} />
          </div>
        </div>

        <div className="card-dark">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Total Amount Due</p>
              <p className="text-2xl font-bold text-red-400">
                ${documents
                  .filter(d => d.status === 'pending' && d.amount)
                  .reduce((sum, d) => sum + (d.amount || 0), 0)
                  .toFixed(2)}
              </p>
            </div>
            <DollarSign className="text-red-400" size={32} />
          </div>
        </div>
      </div>
    </div>
  )
}
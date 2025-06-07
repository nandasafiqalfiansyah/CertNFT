import type { CertificateMetadata } from '../types'

// Generate mock NFT hash
export const generateNFTHash = (): string => {
  const prefix = '0x'
  const chars = '0123456789abcdef'
  let hash = prefix
  
  for (let i = 0; i < 64; i++) {
    hash += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  
  return hash
}

// Generate mock IPFS hash
export const generateIPFSHash = (): string => {
  const prefix = 'Qm'
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let hash = prefix
  
  for (let i = 0; i < 44; i++) {
    hash += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  
  return hash
}

// Create certificate metadata for NFT
export const createCertificateMetadata = (data: {
  recipientName: string
  institutionName: string
  description: string
  issueDate: string
}): CertificateMetadata => {
  return {
    name: `Certificate - ${data.recipientName}`,
    description: data.description,
    image: `https://images.pexels.com/photos/5427648/pexels-photo-5427648.jpeg?auto=compress&cs=tinysrgb&w=800`,
    attributes: [
      {
        trait_type: 'Recipient',
        value: data.recipientName
      },
      {
        trait_type: 'Issuer',
        value: data.institutionName
      },
      {
        trait_type: 'Issue Date',
        value: new Date(data.issueDate).toLocaleDateString('id-ID')
      },
      {
        trait_type: 'Type',
        value: 'Academic Certificate'
      },
      {
        trait_type: 'Status',
        value: 'Valid'
      }
    ],
    issuer: data.institutionName,
    recipient: data.recipientName,
    issuedAt: data.issueDate
  }
}

// Hash generator for blockchain simulation
export const generateHash = (input: string): string => {
  let hash = 0
  if (input.length === 0) return hash.toString()
  
  for (let i = 0; i < input.length; i++) {
    const char = input.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash // Convert to 32bit integer
  }
  
  return Math.abs(hash).toString(16).padStart(8, '0')
}

// Validate Ethereum address format
export const isValidEthereumAddress = (address: string): boolean => {
  return /^0x[a-fA-F0-9]{40}$/.test(address)
}

// Validate NFT hash format
export const isValidNFTHash = (hash: string): boolean => {
  return /^0x[a-fA-F0-9]{64}$/.test(hash)
}

// Format hash for display (truncate middle)
export const formatHash = (hash: string, startChars = 6, endChars = 4): string => {
  if (hash.length <= startChars + endChars) return hash
  return `${hash.slice(0, startChars)}...${hash.slice(-endChars)}`
}

// Generate certificate ID
export const generateCertificateId = (): string => {
  return Date.now().toString() + Math.random().toString(36).substring(2, 9)
}
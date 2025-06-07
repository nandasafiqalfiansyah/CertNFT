export interface Certificate {
  id: string
  recipientName: string
  institutionName: string
  description: string
  issueDate: string
  nftHash: string
  ipfsHash: string
  metadata: CertificateMetadata
  fileUrl?: string
}

export interface CertificateMetadata {
  name: string
  description: string
  image: string
  attributes: Array<{
    trait_type: string
    value: string
  }>
  issuer: string
  recipient: string
  issuedAt: string
}

export interface CertificateForm {
  recipientName: string
  institutionName: string
  description: string
  file?: File
}

export interface VerificationResult {
  isValid: boolean
  certificate?: Certificate
  message: string
}
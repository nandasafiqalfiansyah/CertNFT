import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Certificate } from '../types'

export const useCertificateStore = defineStore('certificate', () => {
  const certificates = ref<Certificate[]>([])
  const isLoading = ref(false)

  // Load certificates from localStorage on store creation
  const loadCertificates = () => {
    const stored = localStorage.getItem('certificates')
    if (stored) {
      certificates.value = JSON.parse(stored)
    }
  }

  // Save certificates to localStorage
  const saveCertificates = () => {
    localStorage.setItem('certificates', JSON.stringify(certificates.value))
  }

  // Add a new certificate
  const addCertificate = (certificate: Certificate) => {
    certificates.value.push(certificate)
    saveCertificates()
  }

  // Find certificate by hash
  const findCertificateByHash = (hash: string): Certificate | undefined => {
    return certificates.value.find(cert => cert.nftHash === hash)
  }

  // Get certificates for current user (simplified - using localStorage)
  const getUserCertificates = (): Certificate[] => {
    return certificates.value
  }

  // Initialize store
  loadCertificates()

  return {
    certificates,
    isLoading,
    addCertificate,
    findCertificateByHash,
    getUserCertificates,
    loadCertificates
  }
})
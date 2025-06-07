<script setup lang="ts">
import { ref } from 'vue'
import { useCertificateStore } from '../stores/certificate'
import CertificatePreview from '../components/CertificatePreview.vue'
import type { VerificationResult } from '../types'
import { 
  MagnifyingGlassIcon, 
  CheckCircleIcon, 
  XCircleIcon,
  ExclamationTriangleIcon
} from '@heroicons/vue/24/outline'

const certificateStore = useCertificateStore()

const searchHash = ref('')
const isLoading = ref(false)
const verificationResult = ref<VerificationResult | null>(null)

const verifyCertificate = async () => {
  if (!searchHash.value.trim()) return
  
  isLoading.value = true
  verificationResult.value = null
  
  try {
    // Simulate verification delay
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    const certificate = certificateStore.findCertificateByHash(searchHash.value.trim())
    
    if (certificate) {
      verificationResult.value = {
        isValid: true,
        certificate,
        message: 'Sertifikat valid dan terverifikasi!'
      }
    } else {
      verificationResult.value = {
        isValid: false,
        message: 'Sertifikat tidak ditemukan atau hash NFT tidak valid.'
      }
    }
  } catch (error) {
    verificationResult.value = {
      isValid: false,
      message: 'Terjadi kesalahan saat memverifikasi sertifikat.'
    }
  } finally {
    isLoading.value = false
  }
}

const resetVerification = () => {
  searchHash.value = ''
  verificationResult.value = null
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script>

<template>
  <div class="min-h-screen py-12 bg-gray-50 dark:bg-gray-900">
    <div class="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-gray-900 dark:text-white">
          Verifikasi Sertifikat
        </h1>
        <p class="mt-4 text-lg text-gray-600 dark:text-gray-300">
          Masukkan hash NFT untuk memverifikasi keaslian sertifikat
        </p>
      </div>

      <!-- Search Section -->
      <div class="card mb-8">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
          Cari Sertifikat
        </h2>

        <div class="space-y-4">
          <div>
            <label class="form-label">Hash NFT atau Alamat Wallet</label>
            <div class="relative">
              <input
                v-model="searchHash"
                type="text"
                class="form-input pr-12"
                placeholder="Masukkan hash NFT sertifikat..."
                @keyup.enter="verifyCertificate"
              />
              <div class="absolute inset-y-0 right-0 flex items-center pr-3">
                <MagnifyingGlassIcon class="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>

          <div class="flex space-x-4">
            <button
              @click="verifyCertificate"
              :disabled="!searchHash.trim() || isLoading"
              :class="[
                'flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-medium transition-colors',
                searchHash.trim() && !isLoading
                  ? 'bg-primary-600 hover:bg-primary-700 text-white'
                  : 'bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed'
              ]"
            >
              <MagnifyingGlassIcon v-if="!isLoading" class="h-5 w-5" />
              <div v-if="isLoading" class="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              <span>{{ isLoading ? 'Memverifikasi...' : 'Verifikasi Sertifikat' }}</span>
            </button>

            <button
              @click="resetVerification"
              class="btn-secondary"
            >
              Reset
            </button>
          </div>
        </div>

        <!-- Sample Hashes for Demo -->
        <div class="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <h4 class="text-sm font-medium text-blue-900 dark:text-blue-100 mb-2">
            Contoh Hash untuk Testing:
          </h4>
          <div class="space-y-1">
            <button
              v-for="certificate in certificateStore.certificates.slice(0, 3)"
              :key="certificate.nftHash"
              @click="searchHash = certificate.nftHash"
              class="block text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 font-mono bg-white dark:bg-gray-800 px-2 py-1 rounded border truncate w-full text-left"
            >
              {{ certificate.nftHash }}
            </button>
          </div>
        </div>
      </div>

      <!-- Verification Results -->
      <div v-if="verificationResult" class="card">
        <!-- Success Result -->
        <div v-if="verificationResult.isValid" class="space-y-6">
          <div class="flex items-center space-x-3 text-success-600 dark:text-success-400">
            <CheckCircleIcon class="h-8 w-8" />
            <div>
              <h3 class="text-xl font-semibold">Sertifikat Terverifikasi</h3>
              <p class="text-gray-600 dark:text-gray-300">{{ verificationResult.message }}</p>
            </div>
          </div>

          <!-- Certificate Details -->
          <div v-if="verificationResult.certificate" class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div class="space-y-4">
              <h4 class="text-lg font-medium text-gray-900 dark:text-white">Detail Sertifikat</h4>
              
              <div class="space-y-3">
                <div>
                  <label class="text-sm font-medium text-gray-500 dark:text-gray-400">Penerima</label>
                  <p class="text-gray-900 dark:text-white">{{ verificationResult.certificate.recipientName }}</p>
                </div>
                
                <div>
                  <label class="text-sm font-medium text-gray-500 dark:text-gray-400">Institusi</label>
                  <p class="text-gray-900 dark:text-white">{{ verificationResult.certificate.institutionName }}</p>
                </div>
                
                <div>
                  <label class="text-sm font-medium text-gray-500 dark:text-gray-400">Tanggal Terbit</label>
                  <p class="text-gray-900 dark:text-white">{{ formatDate(verificationResult.certificate.issueDate) }}</p>
                </div>
                
                <div>
                  <label class="text-sm font-medium text-gray-500 dark:text-gray-400">Hash NFT</label>
                  <p class="text-gray-900 dark:text-white font-mono text-sm break-all">{{ verificationResult.certificate.nftHash }}</p>
                </div>
                
                <div>
                  <label class="text-sm font-medium text-gray-500 dark:text-gray-400">Hash IPFS</label>
                  <p class="text-gray-900 dark:text-white font-mono text-sm break-all">{{ verificationResult.certificate.ipfsHash }}</p>
                </div>
              </div>
            </div>

            <div>
              <h4 class="text-lg font-medium text-gray-900 dark:text-white mb-4">Preview Sertifikat</h4>
              <CertificatePreview :certificate="verificationResult.certificate" />
            </div>
          </div>
        </div>

        <!-- Error Result -->
        <div v-else class="text-center py-8">
          <XCircleIcon class="mx-auto h-16 w-16 text-red-500 mb-4" />
          <h3 class="text-xl font-semibold text-red-600 dark:text-red-400 mb-2">
            Sertifikat Tidak Valid
          </h3>
          <p class="text-gray-600 dark:text-gray-300">{{ verificationResult.message }}</p>
          
          <div class="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
            <div class="flex items-start space-x-3">
              <ExclamationTriangleIcon class="h-6 w-6 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
              <div class="text-left">
                <h4 class="text-sm font-medium text-yellow-800 dark:text-yellow-200">Tips Verifikasi:</h4>
                <ul class="mt-2 text-sm text-yellow-700 dark:text-yellow-300 space-y-1">
                  <li>• Pastikan hash NFT yang dimasukkan benar dan lengkap</li>
                  <li>• Hash NFT bersifat case-sensitive</li>
                  <li>• Sertifikat harus sudah di-mint dan tersimpan di blockchain</li>
                  <li>• Hubungi penerbit sertifikat jika masih mengalami masalah</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Information Section -->
      <div class="mt-12 card bg-gradient-to-r from-primary-50 to-blue-50 dark:from-primary-900/20 dark:to-blue-900/20">
        <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Cara Verifikasi Sertifikat
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 class="font-medium text-gray-900 dark:text-white mb-2">1. Dapatkan Hash NFT</h4>
            <p class="text-gray-600 dark:text-gray-300 text-sm">
              Hash NFT biasanya disediakan bersama sertifikat atau dapat ditemukan di metadata sertifikat.
            </p>
          </div>
          <div>
            <h4 class="font-medium text-gray-900 dark:text-white mb-2">2. Masukkan Hash</h4>
            <p class="text-gray-600 dark:text-gray-300 text-sm">
              Copy dan paste hash NFT ke dalam field pencarian di atas.
            </p>
          </div>
          <div>
            <h4 class="font-medium text-gray-900 dark:text-white mb-2">3. Klik Verifikasi</h4>
            <p class="text-gray-600 dark:text-gray-300 text-sm">
              Sistem akan memverifikasi hash NFT dengan database blockchain.
            </p>
          </div>
          <div>
            <h4 class="font-medium text-gray-900 dark:text-white mb-2">4. Lihat Hasil</h4>
            <p class="text-gray-600 dark:text-gray-300 text-sm">
              Jika valid, detail sertifikat dan metadata akan ditampilkan.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
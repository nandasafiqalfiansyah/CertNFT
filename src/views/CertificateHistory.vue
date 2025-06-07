<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useCertificateStore } from '../stores/certificate'
import CertificateCard from '../components/CertificateCard.vue'
import { AcademicCapIcon, DocumentDuplicateIcon } from '@heroicons/vue/24/outline'

const certificateStore = useCertificateStore()

const certificates = computed(() => certificateStore.getUserCertificates())

onMounted(() => {
  certificateStore.loadCertificates()
})

const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text)
  // Could add toast notification here
}
</script>

<template>
  <div class="min-h-screen py-12 bg-gray-50 dark:bg-gray-900">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-gray-900 dark:text-white">
          Riwayat Sertifikat
        </h1>
        <p class="mt-4 text-lg text-gray-600 dark:text-gray-300">
          Kelola dan pantau semua sertifikat NFT yang telah Anda terbitkan
        </p>
      </div>

      <!-- Statistics Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div class="card text-center">
          <div class="flex items-center justify-center w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg mx-auto mb-4">
            <AcademicCapIcon class="h-6 w-6 text-primary-600 dark:text-primary-400" />
          </div>
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white">{{ certificates.length }}</h3>
          <p class="text-gray-600 dark:text-gray-300">Total Sertifikat</p>
        </div>
        
        <div class="card text-center">
          <div class="flex items-center justify-center w-12 h-12 bg-success-100 dark:bg-success-900 rounded-lg mx-auto mb-4">
            <DocumentDuplicateIcon class="h-6 w-6 text-success-600 dark:text-success-400" />
          </div>
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white">{{ certificates.length }}</h3>
          <p class="text-gray-600 dark:text-gray-300">Aktif</p>
        </div>
        
        <div class="card text-center">
          <div class="flex items-center justify-center w-12 h-12 bg-warning-100 dark:bg-warning-900 rounded-lg mx-auto mb-4">
            <AcademicCapIcon class="h-6 w-6 text-warning-600 dark:text-warning-400" />
          </div>
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white">
            {{ certificates.length > 0 ? new Date(certificates[certificates.length - 1].issueDate).getFullYear() : '-' }}
          </h3>
          <p class="text-gray-600 dark:text-gray-300">Tahun Terakhir</p>
        </div>
      </div>

      <!-- Certificates Grid -->
      <div v-if="certificates.length > 0">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <CertificateCard
            v-for="certificate in certificates"
            :key="certificate.id"
            :certificate="certificate"
            @copy-hash="copyToClipboard"
          />
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-12">
        <AcademicCapIcon class="mx-auto h-24 w-24 text-gray-300 dark:text-gray-600 mb-8" />
        <h3 class="text-2xl font-medium text-gray-900 dark:text-white mb-4">
          Belum Ada Sertifikat
        </h3>
        <p class="text-gray-600 dark:text-gray-300 mb-8 max-w-md mx-auto">
          Anda belum menerbitkan sertifikat NFT. Mulai buat sertifikat pertama Anda sekarang.
        </p>
        <RouterLink to="/issue" class="btn-primary">
          Terbitkan Sertifikat Pertama
        </RouterLink>
      </div>
    </div>
  </div>
</template>
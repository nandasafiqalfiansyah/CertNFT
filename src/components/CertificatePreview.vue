<script setup lang="ts">
import type { Certificate } from '../types'
import { AcademicCapIcon, CheckBadgeIcon } from '@heroicons/vue/24/outline'

interface Props {
  certificate: Certificate
}

defineProps<Props>()

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script>

<template>
  <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-8 shadow-lg">
    <!-- Certificate Header -->
    <div class="text-center mb-8">
      <div class="flex justify-center mb-4">
        <div class="bg-primary-100 dark:bg-primary-900 p-4 rounded-full">
          <AcademicCapIcon class="h-12 w-12 text-primary-600 dark:text-primary-400" />
        </div>
      </div>
      <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
        SERTIFIKAT DIGITAL
      </h2>
      <div class="w-20 h-1 bg-primary-600 mx-auto rounded"></div>
    </div>

    <!-- Certificate Body -->
    <div class="text-center space-y-6">
      <p class="text-gray-600 dark:text-gray-300">
        Diberikan kepada
      </p>
      
      <h3 class="text-3xl font-bold text-gray-900 dark:text-white">
        {{ certificate.recipientName }}
      </h3>
      
      <div class="max-w-md mx-auto">
        <p class="text-gray-600 dark:text-gray-300 mb-4">
          Atas partisipasi dan pencapaian dalam
        </p>
        <p class="text-lg font-medium text-gray-900 dark:text-white mb-4">
          {{ certificate.description }}
        </p>
        <p class="text-gray-600 dark:text-gray-300">
          yang diselenggarakan oleh
        </p>
        <p class="text-xl font-semibold text-primary-600 dark:text-primary-400">
          {{ certificate.institutionName }}
        </p>
      </div>

      <div class="pt-8">
        <div class="flex items-center justify-center space-x-2 mb-4">
          <CheckBadgeIcon class="h-6 w-6 text-success-600" />
          <span class="text-success-600 font-medium">Verified on Blockchain</span>
        </div>
        
        <p class="text-sm text-gray-500 dark:text-gray-400">
          Diterbitkan pada {{ formatDate(certificate.issueDate) }}
        </p>
        
        <div class="mt-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <p class="text-xs text-gray-500 dark:text-gray-400 mb-1">NFT Hash:</p>
          <p class="text-xs font-mono text-gray-700 dark:text-gray-300 break-all">
            {{ certificate.nftHash }}
          </p>
        </div>
      </div>
    </div>

    <!-- Decorative Elements -->
    <div class="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-primary-300 dark:border-primary-700"></div>
    <div class="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-primary-300 dark:border-primary-700"></div>
    <div class="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-primary-300 dark:border-primary-700"></div>
    <div class="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-primary-300 dark:border-primary-700"></div>
  </div>
</template>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
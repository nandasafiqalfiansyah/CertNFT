<script setup lang="ts">
import { ref } from 'vue'
import type { Certificate } from '../types'
import { 
  AcademicCapIcon, 
  CalendarDaysIcon, 
  LinkIcon,
  EyeIcon,
  DocumentDuplicateIcon,
  CheckIcon
} from '@heroicons/vue/24/outline'

interface Props {
  certificate: Certificate
}

interface Emits {
  (e: 'copy-hash', hash: string): void
}

defineProps<Props>()
defineEmits<Emits>()

const showDetails = ref(false)
const copied = ref(false)

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const copyHash = (hash: string, emit: Emits) => {
  navigator.clipboard.writeText(hash)
  emit('copy-hash', hash)
  copied.value = true
  setTimeout(() => {
    copied.value = false
  }, 2000)
}

const toggleDetails = () => {
  showDetails.value = !showDetails.value
}
</script>

<template>
  <div class="card hover:shadow-lg transition-shadow duration-200">
    <!-- Header -->
    <div class="flex items-start justify-between mb-4">
      <div class="flex items-center space-x-3">
        <div class="bg-primary-100 dark:bg-primary-900 p-2 rounded-lg">
          <AcademicCapIcon class="h-6 w-6 text-primary-600 dark:text-primary-400" />
        </div>
        <div class="flex-1">
          <h3 class="font-semibold text-gray-900 dark:text-white truncate">
            {{ certificate.recipientName }}
          </h3>
          <p class="text-sm text-gray-500 dark:text-gray-400 truncate">
            {{ certificate.institutionName }}
          </p>
        </div>
      </div>
      <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-success-100 text-success-800 dark:bg-success-900 dark:text-success-200">
        Aktif
      </span>
    </div>

    <!-- Description -->
    <p class="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
      {{ certificate.description }}
    </p>

    <!-- Meta Info -->
    <div class="space-y-2 mb-4">
      <div class="flex items-center text-sm text-gray-500 dark:text-gray-400">
        <CalendarDaysIcon class="h-4 w-4 mr-2" />
        {{ formatDate(certificate.issueDate) }}
      </div>
      <div class="flex items-center text-sm text-gray-500 dark:text-gray-400">
        <LinkIcon class="h-4 w-4 mr-2" />
        <span class="font-mono truncate">{{ certificate.nftHash.substring(0, 20) }}...</span>
        <button
          @click="copyHash(certificate.nftHash, $emit)"
          class="ml-2 p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
          :title="copied ? 'Copied!' : 'Copy hash'"
        >
          <CheckIcon v-if="copied" class="h-4 w-4 text-success-600" />
          <DocumentDuplicateIcon v-else class="h-4 w-4" />
        </button>
      </div>
    </div>

    <!-- Actions -->
    <div class="flex space-x-2">
      <button
        @click="toggleDetails"
        class="flex-1 flex items-center justify-center space-x-2 py-2 px-3 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg transition-colors text-sm font-medium"
      >
        <EyeIcon class="h-4 w-4" />
        <span>{{ showDetails ? 'Sembunyikan' : 'Lihat Detail' }}</span>
      </button>
    </div>

    <!-- Expanded Details -->
    <div v-if="showDetails" class="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
      <div class="space-y-3">
        <div>
          <label class="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
            Hash NFT
          </label>
          <p class="text-sm text-gray-900 dark:text-white font-mono break-all bg-gray-50 dark:bg-gray-700 p-2 rounded mt-1">
            {{ certificate.nftHash }}
          </p>
        </div>
        
        <div>
          <label class="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
            Hash IPFS
          </label>
          <p class="text-sm text-gray-900 dark:text-white font-mono break-all bg-gray-50 dark:bg-gray-700 p-2 rounded mt-1">
            {{ certificate.ipfsHash }}
          </p>
        </div>

        <div v-if="certificate.metadata">
          <label class="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
            Attributes
          </label>
          <div class="mt-1 space-y-1">
            <div
              v-for="attr in certificate.metadata.attributes"
              :key="attr.trait_type"
              class="flex justify-between text-sm bg-gray-50 dark:bg-gray-700 p-2 rounded"
            >
              <span class="text-gray-600 dark:text-gray-300">{{ attr.trait_type }}:</span>
              <span class="text-gray-900 dark:text-white font-medium">{{ attr.value }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
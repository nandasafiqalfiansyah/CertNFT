<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useCertificateStore } from '../stores/certificate'
import { generateNFTHash, generateIPFSHash, createCertificateMetadata } from '../utils/crypto'
import CertificatePreview from '../components/CertificatePreview.vue'
import type { CertificateForm, Certificate } from '../types'
import { 
  DocumentArrowUpIcon, 
  EyeIcon, 
  CubeIcon,
  CheckCircleIcon 
} from '@heroicons/vue/24/outline'

const router = useRouter()
const certificateStore = useCertificateStore()

const form = ref<CertificateForm>({
  recipientName: '',
  institutionName: '',
  description: '',
  file: undefined
})

const showPreview = ref(false)
const isLoading = ref(false)
const mintSuccess = ref(false)
const previewCertificate = ref<Certificate | null>(null)

const fileInput = ref<HTMLInputElement>()
const fileName = ref('')

const isFormValid = computed(() => {
  return form.value.recipientName.trim() !== '' &&
         form.value.institutionName.trim() !== '' &&
         form.value.description.trim() !== ''
})

const canMint = computed(() => {
  return isFormValid.value && showPreview.value
})

const handleFileUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files[0]) {
    form.value.file = target.files[0]
    fileName.value = target.files[0].name
  }
}

const generatePreview = () => {
  if (!isFormValid.value) return
  
  const mockCertificate: Certificate = {
    id: Date.now().toString(),
    recipientName: form.value.recipientName,
    institutionName: form.value.institutionName,
    description: form.value.description,
    issueDate: new Date().toISOString(),
    nftHash: 'preview-' + Date.now(),
    ipfsHash: 'preview-ipfs-hash',
    metadata: createCertificateMetadata({
      recipientName: form.value.recipientName,
      institutionName: form.value.institutionName,
      description: form.value.description,
      issueDate: new Date().toISOString()
    }),
    fileUrl: form.value.file ? URL.createObjectURL(form.value.file) : undefined
  }
  
  previewCertificate.value = mockCertificate
  showPreview.value = true
}

const mintNFT = async () => {
  if (!canMint.value) return
  
  isLoading.value = true
  
  try {
    // Simulate minting process
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    const nftHash = generateNFTHash()
    const ipfsHash = generateIPFSHash()
    
    const certificate: Certificate = {
      id: Date.now().toString(),
      recipientName: form.value.recipientName,
      institutionName: form.value.institutionName,
      description: form.value.description,
      issueDate: new Date().toISOString(),
      nftHash,
      ipfsHash,
      metadata: createCertificateMetadata({
        recipientName: form.value.recipientName,
        institutionName: form.value.institutionName,
        description: form.value.description,
        issueDate: new Date().toISOString()
      }),
      fileUrl: form.value.file ? URL.createObjectURL(form.value.file) : undefined
    }
    
    certificateStore.addCertificate(certificate)
    mintSuccess.value = true
    
    // Redirect to history after success
    setTimeout(() => {
      router.push('/history')
    }, 2000)
    
  } catch (error) {
    console.error('Minting failed:', error)
  } finally {
    isLoading.value = false
  }
}

const resetForm = () => {
  form.value = {
    recipientName: '',
    institutionName: '',
    description: '',
    file: undefined
  }
  fileName.value = ''
  showPreview.value = false
  mintSuccess.value = false
  previewCertificate.value = null
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}
</script>

<template>
  <div class="min-h-screen py-12 bg-gray-50 dark:bg-gray-900">
    <div class="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-gray-900 dark:text-white">
          Terbitkan Sertifikat NFT
        </h1>
        <p class="mt-4 text-lg text-gray-600 dark:text-gray-300">
          Buat dan terbitkan sertifikat digital yang tersimpan aman di blockchain
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Form Section -->
        <div class="card">
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Informasi Sertifikat
          </h2>
          
          <form @submit.prevent class="space-y-6">
            <div>
              <label class="form-label">Nama Penerima</label>
              <input
                v-model="form.recipientName"
                type="text"
                class="form-input"
                placeholder="Masukkan nama penerima sertifikat"
                required
              />
            </div>

            <div>
              <label class="form-label">Nama Institusi</label>
              <input
                v-model="form.institutionName"
                type="text"
                class="form-input"
                placeholder="Masukkan nama institusi penerbit"
                required
              />
            </div>

            <div>
              <label class="form-label">Deskripsi Sertifikat</label>
              <textarea
                v-model="form.description"
                rows="4"
                class="form-input"
                placeholder="Jelaskan tentang sertifikat ini (program, pencapaian, dll.)"
                required
              ></textarea>
            </div>

            <div>
              <label class="form-label">Upload File (Opsional)</label>
              <div class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-lg hover:border-primary-400 transition-colors">
                <div class="space-y-1 text-center">
                  <DocumentArrowUpIcon class="mx-auto h-12 w-12 text-gray-400" />
                  <div class="flex text-sm text-gray-600 dark:text-gray-400">
                    <label class="relative cursor-pointer bg-white dark:bg-gray-800 rounded-md font-medium text-primary-600 hover:text-primary-500 focus-within:outline-none">
                      <span>Upload file</span>
                      <input
                        ref="fileInput"
                        type="file"
                        class="sr-only"
                        accept=".pdf,.jpg,.jpeg,.png"
                        @change="handleFileUpload"
                      />
                    </label>
                    <p class="pl-1">atau drag and drop</p>
                  </div>
                  <p class="text-xs text-gray-500 dark:text-gray-400">
                    PDF, JPG, PNG hingga 10MB
                  </p>
                  <p v-if="fileName" class="text-sm text-primary-600 font-medium">
                    {{ fileName }}
                  </p>
                </div>
              </div>
            </div>

            <div class="flex space-x-4">
              <button
                @click="generatePreview"
                :disabled="!isFormValid"
                :class="[
                  'flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-medium transition-colors',
                  isFormValid
                    ? 'bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed'
                ]"
              >
                <EyeIcon class="h-5 w-5" />
                <span>Generate Preview</span>
              </button>

              <button
                @click="mintNFT"
                :disabled="!canMint || isLoading"
                :class="[
                  'flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-medium transition-colors',
                  canMint && !isLoading
                    ? 'bg-primary-600 hover:bg-primary-700 text-white'
                    : 'bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed'
                ]"
              >
                <CubeIcon v-if="!isLoading && !mintSuccess" class="h-5 w-5" />
                <CheckCircleIcon v-if="mintSuccess" class="h-5 w-5" />
                <div v-if="isLoading" class="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>
                  {{ isLoading ? 'Minting...' : mintSuccess ? 'Berhasil!' : 'Mint NFT' }}
                </span>
              </button>
            </div>

            <button
              @click="resetForm"
              type="button"
              class="w-full btn-secondary"
            >
              Reset Form
            </button>
          </form>
        </div>

        <!-- Preview Section -->
        <div>
          <div v-if="!showPreview" class="card text-center py-12">
            <EyeIcon class="mx-auto h-16 w-16 text-gray-300 dark:text-gray-600 mb-4" />
            <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Preview Sertifikat
            </h3>
            <p class="text-gray-500 dark:text-gray-400">
              Isi form dan klik "Generate Preview" untuk melihat preview sertifikat
            </p>
          </div>

          <div v-else>
            <CertificatePreview 
              v-if="previewCertificate" 
              :certificate="previewCertificate" 
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
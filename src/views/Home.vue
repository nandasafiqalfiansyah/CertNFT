<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { 
  ShieldCheckIcon, 
  CubeTransparentIcon,
  ClockIcon,
  GlobeAltIcon
} from '@heroicons/vue/24/outline'

const features = [
  {
    name: 'Keaslian Terjamin',
    description: 'Setiap sertifikat tersimpan dalam blockchain yang tidak dapat dipalsukan',
    icon: ShieldCheckIcon,
  },
  {
    name: 'NFT Technology',
    description: 'Menggunakan teknologi NFT untuk memastikan kepemilikan yang unik',
    icon: CubeTransparentIcon,
  },
  {
    name: 'Verifikasi Instan',
    description: 'Verifikasi keaslian sertifikat dalam hitungan detik',
    icon: ClockIcon,
  },
  {
    name: 'Akses Global',
    description: 'Sertifikat dapat diakses dan diverifikasi dari mana saja di dunia',
    icon: GlobeAltIcon,
  },
]

const steps = [
  {
    step: '01',
    title: 'Input Data Sertifikat',
    description: 'Masukkan informasi penerima, institusi, dan deskripsi sertifikat'
  },
  {
    step: '02',
    title: 'Generate Preview',
    description: 'Sistem akan membuat preview sertifikat berdasarkan data yang diinput'
  },
  {
    step: '03',
    title: 'Mint NFT',
    description: 'Sertifikat akan di-mint sebagai NFT dan tersimpan di blockchain'
  },
  {
    step: '04',
    title: 'Verifikasi & Bagikan',
    description: 'Sertifikat siap untuk diverifikasi dan dibagikan kepada penerima'
  }
]
</script>

<template>
  <div>
    <!-- Hero Section -->
    <section class="relative bg-gradient-to-br from-primary-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-20 sm:py-32">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h1 class="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
            Sertifikat Digital Berbasis
            <span class="text-gradient">NFT & Blockchain</span>
          </h1>
          <p class="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Platform inovatif untuk menerbitkan, mengelola, dan memverifikasi sertifikat akademik 
            menggunakan teknologi NFT dan smart contract. Pastikan keaslian sertifikat Anda dengan teknologi blockchain.
          </p>
          <div class="mt-10 flex items-center justify-center gap-x-6">
            <RouterLink to="/issue" class="btn-primary text-lg px-8 py-3">
              Terbitkan Sertifikat
            </RouterLink>
            <RouterLink to="/verify" class="btn-secondary text-lg px-8 py-3">
              Verifikasi Sertifikat
            </RouterLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-24 bg-white dark:bg-gray-800">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h2 class="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Mengapa Memilih CertNFT?
          </h2>
          <p class="mt-4 text-lg text-gray-600 dark:text-gray-300">
            Solusi terdepan untuk sertifikasi digital yang aman dan terpercaya
          </p>
        </div>

        <div class="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div v-for="feature in features" :key="feature.name" class="text-center group">
            <div class="mx-auto flex h-16 w-16 items-center justify-center rounded-xl bg-primary-100 dark:bg-primary-900 group-hover:bg-primary-200 dark:group-hover:bg-primary-800 transition-colors duration-200">
              <component :is="feature.icon" class="h-8 w-8 text-primary-600 dark:text-primary-400" />
            </div>
            <h3 class="mt-6 text-lg font-semibold text-gray-900 dark:text-white">{{ feature.name }}</h3>
            <p class="mt-2 text-gray-600 dark:text-gray-300">{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- How It Works Section -->
    <section class="py-24 bg-gray-50 dark:bg-gray-900">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h2 class="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Cara Kerja Platform
          </h2>
          <p class="mt-4 text-lg text-gray-600 dark:text-gray-300">
            Proses sederhana untuk menerbitkan sertifikat NFT dalam 4 langkah
          </p>
        </div>

        <div class="mt-20">
          <div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div v-for="(step, index) in steps" :key="step.step" class="relative">
              <div class="flex flex-col items-center text-center">
                <div class="flex h-16 w-16 items-center justify-center rounded-full bg-primary-600 text-white font-bold text-xl">
                  {{ step.step }}
                </div>
                <h3 class="mt-6 text-lg font-semibold text-gray-900 dark:text-white">{{ step.title }}</h3>
                <p class="mt-2 text-gray-600 dark:text-gray-300">{{ step.description }}</p>
              </div>
              
              <!-- Arrow connector (hidden on last item) -->
              <div v-if="index < steps.length - 1" class="hidden lg:block absolute top-8 left-full w-full">
                <div class="h-px bg-gray-300 dark:bg-gray-600 relative">
                  <div class="absolute right-0 top-1/2 transform -translate-y-1/2 -translate-x-1">
                    <div class="h-2 w-2 rotate-45 bg-gray-300 dark:bg-gray-600"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="bg-primary-600 py-20">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h2 class="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Siap Untuk Mulai?
          </h2>
          <p class="mt-4 text-lg text-primary-100">
            Buat sertifikat NFT pertama Anda sekarang juga dan rasakan keamanan blockchain
          </p>
          <div class="mt-8 flex items-center justify-center gap-x-6">
            <RouterLink 
              to="/issue" 
              class="bg-white text-primary-600 hover:bg-gray-50 font-medium py-3 px-8 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-600"
            >
              Mulai Sekarang
            </RouterLink>
            <RouterLink 
              to="/verify" 
              class="text-white border border-white hover:bg-white hover:text-primary-600 font-medium py-3 px-8 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-600"
            >
              Verifikasi Sertifikat
            </RouterLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
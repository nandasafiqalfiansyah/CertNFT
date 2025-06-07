<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { Bars3Icon, XMarkIcon, AcademicCapIcon } from '@heroicons/vue/24/outline'

const route = useRoute()
const mobileMenuOpen = ref(false)

const navigation = [
  { name: 'Beranda', href: '/', current: false },
  { name: 'Terbitkan Sertifikat', href: '/issue', current: false },
  { name: 'Riwayat', href: '/history', current: false },
  { name: 'Verifikasi', href: '/verify', current: false },
]

const isCurrentRoute = (href: string) => {
  return route.path === href
}
</script>

<template>
  <header class="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
    <nav class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 justify-between items-center">
        <!-- Logo -->
        <div class="flex items-center">
          <RouterLink to="/" class="flex items-center space-x-2">
            <div class="bg-primary-600 p-2 rounded-lg">
              <AcademicCapIcon class="h-6 w-6 text-white" />
            </div>
            <span class="font-bold text-xl text-gray-900 dark:text-white">CertNFT</span>
          </RouterLink>
        </div>

        <!-- Desktop Navigation -->
        <div class="hidden md:block">
          <div class="ml-10 flex items-baseline space-x-4">
            <RouterLink
              v-for="item in navigation"
              :key="item.name"
              :to="item.href"
              :class="[
                isCurrentRoute(item.href)
                  ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-200'
                  : 'text-gray-500 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-700 dark:hover:text-white',
                'px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200'
              ]"
            >
              {{ item.name }}
            </RouterLink>
          </div>
        </div>

        <!-- Mobile menu button -->
        <div class="md:hidden">
          <button
            @click="mobileMenuOpen = !mobileMenuOpen"
            class="bg-gray-50 dark:bg-gray-700 p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
          >
            <Bars3Icon v-if="!mobileMenuOpen" class="h-6 w-6" />
            <XMarkIcon v-else class="h-6 w-6" />
          </button>
        </div>
      </div>

      <!-- Mobile Navigation -->
      <div v-show="mobileMenuOpen" class="md:hidden">
        <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <RouterLink
            v-for="item in navigation"
            :key="item.name"
            :to="item.href"
            @click="mobileMenuOpen = false"
            :class="[
              isCurrentRoute(item.href)
                ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-200'
                : 'text-gray-500 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-700 dark:hover:text-white',
              'block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200'
            ]"
          >
            {{ item.name }}
          </RouterLink>
        </div>
      </div>
    </nav>
  </header>
</template>
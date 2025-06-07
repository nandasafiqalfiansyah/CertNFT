<script setup lang="ts">
import { AcademicCapIcon } from '@heroicons/vue/24/outline'
</script>

<template>
  <footer class="bg-gray-900 text-white">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <!-- Brand -->
        <div class="col-span-2">
          <div class="flex items-center space-x-2 mb-4">
            <div class="bg-primary-600 p-2 rounded-lg">
              <AcademicCapIcon class="h-6 w-6 text-white" />
            </div>
            <span class="font-bold text-xl">CertNFT</span>
          </div>
          <p class="text-gray-300 max-w-md">
            Platform sertifikasi akademik berbasis NFT dan blockchain. Memastikan keaslian dan keamanan sertifikat digital Anda.
          </p>
        </div>

        <!-- Quick Links -->
        <div>
          <h3 class="font-semibold text-lg mb-4">Tautan Cepat</h3>
          <ul class="space-y-2">
            <li><RouterLink to="/" class="text-gray-300 hover:text-white transition-colors">Beranda</RouterLink></li>
            <li><RouterLink to="/issue" class="text-gray-300 hover:text-white transition-colors">Terbitkan Sertifikat</RouterLink></li>
            <li><RouterLink to="/verify" class="text-gray-300 hover:text-white transition-colors">Verifikasi</RouterLink></li>
          </ul>
        </div>

        <!-- Info -->
        <div>
          <h3 class="font-semibold text-lg mb-4">Informasi</h3>
          <ul class="space-y-2">
            <li><a href="#" class="text-gray-300 hover:text-white transition-colors">Tentang Kami</a></li>
            <li><a href="#" class="text-gray-300 hover:text-white transition-colors">FAQ</a></li>
            <li><a href="#" class="text-gray-300 hover:text-white transition-colors">Dukungan</a></li>
          </ul>
        </div>
      </div>

      <div class="border-t border-gray-800 mt-8 pt-8 text-center">
        <p class="text-gray-400">
          © 2025 Nanda Safiq Alfiansyah. Dibuat untuk keperluan akademik dan pembelajaran.
        </p>
      </div>
    </div>
  </footer>
</template>
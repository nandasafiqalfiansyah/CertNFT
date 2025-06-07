import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import IssueCertificate from '../views/IssueCertificate.vue'
import CertificateHistory from '../views/CertificateHistory.vue'
import VerifyCertificate from '../views/VerifyCertificate.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/issue',
      name: 'IssueCertificate',
      component: IssueCertificate
    },
    {
      path: '/history',
      name: 'CertificateHistory',
      component: CertificateHistory
    },
    {
      path: '/verify',
      name: 'VerifyCertificate',
      component: VerifyCertificate
    }
  ]
})

export default router
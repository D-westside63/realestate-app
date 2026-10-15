import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Viteの設定ファイル
export default defineConfig({
  plugins: [react()],
  server: {
    // IPv6(::1)のみでなくIPv4(127.0.0.1)でも接続できるようにする
    host: '127.0.0.1',
  },
})

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
export default defineConfig({plugins:[react()],server:{host:'127.0.0.1',port:5173,strictPort:true,proxy:{'/socket.io':{target:'http://localhost:3001',ws:true}}},resolve:{alias:{'@':path.resolve(process.cwd(),'src')}}});

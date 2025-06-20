import { Manager, Socket } from 'socket.io-client';
import { error, log } from '../loggers/logger';

export let socket: Socket;

export const connectToServer = (token: string | undefined) => {
  const manager = new Manager('http://192.168.1.74:3000', {
    extraHeaders: {
        authentication: token ?? '',
    },
    reconnection: true,
    reconnectionAttempts: 10,
    reconnectionDelay: 2000
  }); // O IP real si usas emulador Android

  socket = manager.socket('/');

  socket.on('connect', () => {
    log('✅ Conectado al socket:', socket.id)
  });

  socket.on('connect_error', (err) => {
    error('❌ Error de conexión:', err.message)
  });
  
  socket.on('disconnect', () => {
    log('Socket desconectado por el servidor')
});

socket.on('reconnect_attempt', attempt => {
  log('🔄 Intento de reconexión:', attempt)
});

socket.on('reconnect_failed', () => {
  error('❌ Reconexión fallida. No se pudo reconectar.')
});
};


export const disconnectSocket = () => {
    if(socket) {
        socket.disconnect();
        console.log('Socket manualmente desconectado')
    }
}


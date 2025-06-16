import { Manager, Socket } from 'socket.io-client';

export let socket: Socket;

export const connectToServer = (token: string | undefined) => {
  const manager = new Manager('http://192.168.1.74:3000', {
    extraHeaders: {
        authentication: token ?? '',
    }
  }); // O IP real si usas emulador Android

  socket = manager.socket('/');

  socket.on('connect', () => {
    console.log('✅ Conectado al socket:', socket.id);
  });

  socket.on('connect_error', (err) => {
    console.error('❌ Error de conexión:', err.message);
  });
  socket.on('prueba', (mensaje: string) => {
    console.log('Prueba completada   ', mensaje)
  })
};


export const disconnectSocket = () => {
    if(socket) {
        socket.disconnect();
        console.log('Socket manualmente desconectado')
    }
}
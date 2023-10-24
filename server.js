const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

const initialNotifications = {
  read: [],
  unread: [],
};

wss.on('connection', (ws) => {
  ws.send(
    JSON.stringify({
      type: 'notification.initial',
      msg: initialNotifications,
    })
  );

  const updateInterval = setInterval(() => {
    const newNotification = createRandomNotification(); 
    ws.send(
      JSON.stringify({
        type: 'notification.update',
        msg: newNotification,
      })
    );
  }, 10000);

  ws.on('close', () => {
    clearInterval(updateInterval);
  });
});

function createRandomNotification() {
  return {
    title: 'New Notification',
    content: 'This is a new notification.',
    read: false,
    type: 'GENERAL',
    module: 1,
    date: new Date().toUTCString(),
    id: Math.floor(Math.random() * 1000),
  };
}

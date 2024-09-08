# cmail

[`cmail`](https://localhost:5137) is a web messaging platform which is designed to simulate communication across civilizations amongst celestial bodies within our solar system, created for the Fall 2024 EmP Hackfest.

## Connection to the Theme

Even though the speed of light is approximately 3*10^8 m/s, EM radio signals still take significant amounts of time to travel betweeen different celestial bodies. c-mail accounts for the delay between messages sent and recieved, providing assurance to planetary explorers that their messages have been delivered.

One planetary profile will be established per planet by the governing body of space exploration for that planet (ex. NASA for Earth). With a strong AM radio wave transmitter, reciever, and decoder, any planet can be connected to the c-mail system.

Estimated arrival times for outgoing messages can be seen in the <a href="/test/inbox">inbox</a>. Incoming messages are automatically updated as soon as they are recieved. To send a message, click on the destination planet in the home screen or select it on the <a href="/test/send">send</a> page.<br>

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npm create svelte@latest

# create a new project in my-app
npm create svelte@latest my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.

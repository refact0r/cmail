# cmail

[`cmail`](https://localhost:5137) is a web messaging platform which is designed to simulate communication across civilizations amongst celestial bodies within our solar system, created for the Fall 2024 EmP Hackfest.

## About the site

Even though the speed of light is approximately 3*10^8 m/s, EM radio signals still take significant amounts of time to travel betweeen different celestial bodies. cmail accounts for the delay between messages sent and recieved, providing assurance to planetary explorers that their messages have been delivered.

One planetary profile will be established per planet by the governing body of space exploration for that planet (ex. NASA for Earth). With a strong AM radio wave transmitter, reciever, and decoder, any planet can be connected to the cmail system.

Estimated arrival times for outgoing messages can be seen in the [`inbox`](https://localhost:5137/inbox). Incoming messages are  updated as they are recieved. To send a message, click on the destination planet in the home screen or select it on the [`send`](https://localhost:5137/send) page.

## Connection to theme

The Fall 2024 EmP Hackfest theme was to develop a solution that assists in space exploration or technology. Initially, we came up with many different ideas, but we decided the best concept to address would be communication through space. 

As space technologies improve and human civilizations expands to other celestial bodies, maintaining communication between groups of people is essential to making progress. However, as we travel further into the depths of space, it becomes ever more difficult to communicate with one another, as information received and delivered becomes further and further delayed.

We designed our web app to illustrate these limitations on our current means of communication through adding accurate delays on messages between planets. These delays portray the difficulties in communication as distances increase, where messages can be received within minutes or hours, depending on the distance between planets along their orbits, just within our solar system. By demonstrating these issues, our web app assists with future space exploration as future space explorers are made aware of communication restraints.

Additionally, our web app has data of current and future planet positions and distances, courtesy of the [`NASA JPL Horizons API`](https://ssd.jpl.nasa.gov/horizons/#api), allowing users to use our site to plan the best conditions for communication for future explorations.

## Resources used

Our main framework was [`SvelteKit`](https://kit.svelte.dev/docs/introduction), a web UI framework designed to streamline the coding process of web development. We used Svelte, CSS, and Javascript as our main languages. To store messages, we used [`Supabase`](https://supabase.com/), an open-source version of the popular database Firebase. We retrieved our planetary data from [`NASA JPL Horizons API`](https://ssd.jpl.nasa.gov/horizons/#api). No AI was used.

## Developers

Fall 2024 EmP Hackfest - Team 3E
- [`refactor`](https://github.com/refact0r)
- [`shibest`](https://github.com/shibest)
- [`ben-6`](https://github.com/ben-6)
- [`raymon-zhang`](https://github.com/raymon-zhang)

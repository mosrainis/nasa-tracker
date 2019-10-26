# NasaTracker

[LIVE DEMO](https://elegant-stallman-fa85fc.netlify.com)

NasaTracker is an open-source web application that tracks Nasa activities and displays them to users.
As you can see, this is just the first step and there are so much work to do but for now, we have just two tools ready to use.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.1.2.

### Astronauts In Space
You can watch for all astronauts that currently living in space. This basic tool also automatially gives you a wikipedia page about these astronauts. feel free to try it.
This tool uses http://open-notify.org/ API to show the list on astronauts.

### ISS Tracker
ISS Tracker is the main module of this application. this tool displays the ground track of International Space Station (ISS) on a 2D map. It also shows the current position of the station. ISS Tracker only need internet connection at startup, so you can use it in offline mode.
incase of developing, I'm using [Satellite.js](https://github.com/shashwatak/satellite-js) to convert the [TLE](https://en.wikipedia.org/wiki/Two-line_element_set) strings into longitude and latitude. also there is [D3-Geo](https://github.com/d3/d3-geo) library for drawing stuffs.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Contributing
- fork it!
- Enjoy coding
- Push to the branch
- Submit a PR

Please read [Task list](https://github.com/mosrainis/nasa-tracker/issues/1) for more details.

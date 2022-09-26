# PageViewUpdater
A page view counter script for personal websites.

## Introduction
Sometimes static personal websites are in need of page view counter. The project is an API server designed for static Jekyll template [jekyll-TeXt-theme](https://github.com/kitian616/jekyll-TeXt-theme/tree/9e6bc41f19a6cb0f6a27ab68f4f5dfe4e954b13e).

## Prerequisite
- A server with public IP, any kind is fine.
- [Node.js](https://nodejs.org/en/) on the server
- npm packages such as `express`, `async-mutex`

## Usage
- clone the repository to the server (or local)
- Change the default port (6789) in `index.js` if needed
- Setting up environments (install `Node.js`, packages)
- Start the server by running `.\hupbot` in the directory
- Stop the server: run `.\killbot`

## Integration with Jekyll-TeXt-theme
- In the template directory locate `_includes/pageview-providers/custom/`
- Paste `home.html` and `post.html` in `custom\` of the repository into the target folder
- Modify `{your_server_ip}` and `{your_server_port}` accordingly in the two files
- Enjoy!

## Run on Startup (Optional)
- Please refer to [this link](https://www.youtube.com/watch?v=DnTby19qBYQ&ab_channel=ChristianAugustoRomeroGoyzuetaII).

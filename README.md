# fredrikburmester-express
> My own personal photography website build with Express and Pug.

Link: [portfolio.fredrikburmester.com](https://portfolio.fredrikburmester.com)

## Info
This website was built with [Node](https://nodejs.org/en/) and [Express](https://expressjs.com/) in the backend, with [Pug](https://github.com/pugjs/pug) in the frontend. 

This being a photography websites demands a good lazy-loading system, so this was really important to me. That's why a implemented lazy-loading and loading higher quality images when the ligthbox is opened. 

The website requires only 171 kB to be transferred to your device! And everything after that lazyloads.

#### :snail: Lazy-loading
This websites supports lazy-loading in all modern browsers, both in the gallery **and** in the Lightbox. This drastically reduces network load since some galleries contain more than 200 images. 

#### :rocket: Lightbox
The Lightbox lazy-loads one image in advance and support left-right swiping on mobile and desktop. 

#### :globe_with_meridians: Hosting
This website is hosted on my own local server with Nginx as the webproxy, which is also serving all static files. 

This website auto download updates from the github master every 15 minutes with a cronjob and automatically re-loads the Express server with [PM2](https://pm2.keymetrics.io/docs/usage/quick-start/). This makes it really easy for me to deploy updates. Before updating the master i push to the dev branch and check that everything is working before merging with the master.  

## To-do
- Handle trailing slash in url for menu highlighting.
- Disable vertical scrolling when the lightbox is open. 

## How-to
If you want to use this gallery type website for your own pictures here's how to install it!
1. Clone the rep `git clone https://github.com/fredrikburmester/fredrikburmester-express.git`
2. Create two json files. One for images and one for menu links (albums).
  - The albums json file will have the following structure:
  ```
  [{
  link	"Home"
  title	"My name is Fredrik Burmester"
  menu-link	"Home"
  description	""
  }]
  ```
  - The photos json file can be created with my pyton script: [Photos to JSON](https://github.com/fredrikburmester/photos-to-json)
3. Change all relevant code:
  - Links and titles in `index.jade`, `layout.jade` and `ìndex.js`.

## Contributing
1. Fork it (<https://github.com/fredrikburmester/fredrikburmester-express/fork>)
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request

# fredrikburmester-express
> My own personal photography website build with Express and Pug.

[fredrikburmester.com](https://fredrikburmester.com)

## Info

This website was built with [Node](https://nodejs.org/en/) and [Express](https://expressjs.com/) in the backend, with [Pug](https://github.com/pugjs/pug) in the frontend. 

**Lazy-loaing**

This websites supports Lazy-loading in all modern browsern, both in the gallery **and** in the Lightbox. This drastically reduces network load since some galleries contain more than 200 images. 

**Lightbox**

The Lightbox lazy-loads one image in advance and support left-right swiping on mobile and desktop. 

**Hosting**

This website is hosted on my own local server with Nginx as the webproxy, which is also serving all static files. 

This website auto-updates from the github master every 15 minutes with a cronjob. This makes it really easy for me to deploy updates. Before updating the master i push to the dev branch and check that everything is working before merging with the master.  

## To-do

- Handle trailing slash in url for menu highlighting.
- Disable vertical scrolling when the lightbox is open. 

## Contributing

1. Fork it (<https://github.com/fredrikburmester/fredrikburmester-express/fork>)
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request

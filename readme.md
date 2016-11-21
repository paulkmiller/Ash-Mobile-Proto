
Card Swiping + Mapbox Demo
===========

In this project, I will look at the compatability of using the [Swing.js](https://github.com/gajus/swing) library in conjunction with [Mapbox-Gl-JS](https://www.mapbox.com/mapbox-gl-js/api/)


## Environment

```
ruby 2.3.0
rack 1.5.0
vienna
```

---

#### To-Do's
- Increase cross-browser support, specifically for animations on Safari
- Change active listing-icon to ```#03a9f4``` on Swipe
- Build "full-page" view, only available after card has been expanded
- On clicking a marker, have its corresponding card returned; see [Mapbox-GL-JS Listings Demo](https://www.mapbox.com/help/building-a-store-locator/) for similar behavior
- Fix janky expansion animations
- Improve animation FPS on mobile; will require ancillary research into FPS boosting techniques
- Write JS for ```swiping up as "Yes"``` and ```swiping down as "No"```
- Better design needed for ad placements and general information display

---


## Get started

```
bundle install
```

```
bundle exec rackup
```

```
sass --watch scss:css
```

```
Visit localhost:9292
```
---


## Resources

#### Card Related
- [Draggable Physics Animation (jQuery Only)](https://codepen.io/suez/pen/gfxrt)
- [Tinderesque](https://github.com/codepo8/tinderesque/blob/master/README.md)
- [Creating Tinder-like Animations with CSS](http://smotko.si/tinder-css/)
- [Ionic Ion Tinder Cards 2](https://github.com/loringdodge/ionic-ion-tinder-cards-2) + [Tutorial](https://www.thepolyglotdeveloper.com/2015/01/making-tinder-style-swipe-cards-ionic-framework/) + [Another Tutorial](http://loring-dodge.azurewebsites.net/ionic-tinder-cards-2/)
- [jTinder](https://github.com/do-web/jTinder/) + [Demo](http://netcup-gutschein.x5c.de/jtinder/)
- [Elastic Circle Slideshow](http://tympanus.net/codrops/2016/01/27/elastic-circle-slideshow/)
- [Rails, ElasticSearch & SearchKick in Depth](http://www.webascender.com/Blog/ID/752/Rails-ElasticSearch-SearchKick-in-Depth#.WAuIW5MrLdR) BY JOHN STEMLER

#### Potential Alternatives
- [PageSwitch](https://github.com/qiqiboy/pageSwitch)

---


## License

This work is licensed under a Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International License.

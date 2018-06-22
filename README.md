# Short Message Templates with Vue.js

> A short message / template editor with Vue.js

## Overview
This app is a basic editor for short messages, with a couple of “extra” features. The user can use free text, location information and previously saved snippets of text to assemble a short passage of text, which can be saved as a _template_. I might convert it to a mobile app, to allow actually _sending_ the messages as SMS, or connect to a _web to SMS_ service — though this is rather unlikelly since it costs too much for a hobby! The editor relies on the `contentEditable` attribute on HTML elements which is a [web thing](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Editable_content).

I made this app while I learn Vue.js and I mix and match various features, techniques and components. The code -while heavily documented- might be strange at times, or make little sence, and certainly could be done differently — it’s part of the process.

[webpack 3](https://webpack.js.org/) is used to run this thing, with [Mocha](https://mochajs.org/) and [expect](https://facebook.github.io/jest/docs/en/expect.html) for [TDD](https://en.wikipedia.org/wiki/Test-driven_development). I also use [Vuex](https://vuex.vuejs.org/en/), [vue-router](https://router.vuejs.org/en/), [axios](https://github.com/axios/axios), the [Google Geocode API](https://developers.google.com/maps/documentation/geocoding/start) for location suggestions based on user input or GPS position (if available), and [Vue-multiselect](https://vue-multiselect.js.org/). [vuex-persistedstate](https://github.com/robinvdvleuten/vuex-persistedstate) is used to save the state in `localStorage`, but it shouldn’t be difficult to use Firebase or something else instead. The [Bulma](https://bulma.io/) framework is used for styling (because, why not) and a single [Buefy](https://buefy.github.io/#/) component is loaded too.

## ToDo
- [ ] Fix the issue with vuex-persistedstate saving the currently edited template without pressing _save_ first — my bad!
- [ ] Use the [Selection API](https://developer.mozilla.org/en-US/docs/Web/API/Selection) to better handle location / snippet insertion…
- [ ] …maybe allow editing of previously entered location information of text, or finally…
- [ ] …investigate [Quill](https://github.com/quilljs/quill) integration — though a full-fledged editor is beyond the scope of this project!
- [ ] Learn how to test / mock Vuex actions and mutations!
- [ ] Localize the interface· currently, only the location suggestion that is returned from the Geocoding API is localized. Maybe use [vuex-i18n](https://github.com/dkfbasel/vuex-i18n)?
- [ ] Turn this to an Android app, maybe iOS too, to actually send SMS, or…
- [ ] …investigate the option to use a _web to SMS_ service
- [ ] So much to do so little time!

## Instructions
If you want to run this project, you will need a [Google Geocoding API](https://developers.google.com/maps/documentation/geocoding/start#get-a-key) key, saved in Vuex state — there is a related comment in `/src/js/vue/store.js`.

There are 4 _npm scripts_:
* `npm run dev` starts the _webpack-dev-server_ with your local IP at the default port (8080), for you to develop your application. I still have an issue with rebuilding and injecting the stylesheets and I will find a solution, sooner or later…
* `npm run build` compiles production-ready styles and scripts
* `npm run test` runs the Mocha / expect tests, once
* `npm run watch` runs the above tests continuously, to enable test driven development

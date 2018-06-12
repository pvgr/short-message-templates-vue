<template>
  <div class="panel-container">
    <div class="container">
      <transition name="slide">
        <p class="notification" :class="message.className" v-if="message.text">{{ message.text }}</p>
      </transition>

      <div class="panel">
        <div class="panel-heading">
          <p>Insert your location to SMS</p>
        </div>

        <div class="panel-block">
          <p class="field is-grouped">
            <label class="label control is-expanded" for="getGPS">Use your GPS to find your location</label>
            <span class="control">
              <button id="getGPS" class="button is-info getGPS" type="button" @click="geolocation"><svg class="icon"><use xlink:href="#icon-location"></use></svg></button>
            </span>
          </p>
        </div>

        <div class="panel-block">
          <p class="field is-grouped">
            <label class="label control">or search</label>
            <span class="control is-expanded">
              <multiselect
                class="select-location"
                v-model="value"
                :label="label"
                :track-by="label"
                :options="options"
                :allow-empty="false"
                :custom-label="showLocation"
                :internal-search="false"
                :loading="isLoading"
                :options-limit="10"
                :showLabels="false"
                :show-no-results="false"
                @search-change="onSearch"
              ></multiselect>
            </span>
          </p>
        </div>

        <div class="panel-block">
          <div class="field is-grouped is-grouped-centered">
            <button class="control button" type="button" @click="onCancelLocation">Forget about it</button>
            <button class="control button is-primary" type="button" @click="onAcceptLocation">Looks good!</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import _debounce from 'lodash/debounce';
  import Multiselect from 'vue-multiselect';

  export default {
    components: { Multiselect },

    data () {
      return {
        isLoading: false,
        options: [],
        message: {
          className: 'is-primary',
          text: ''
        },
        value: {
          coords: this.$store.state.location.coords,
          label: this.$store.state.location.text
        }
      }
    },

    methods: {
      // gets a list of place suggestions, returned from Google Geocode API, and feeds them to the Vue Select, via the _options_ data
      buildLocationSuggestList (list) {
        this.options = [];

        list.forEach((item) => {
          this.options.push({
            coords: item.geometry.location,
            label: item.formatted_address
          });
        });
      },

      // executes when the browser can’t or the user won’t allow the use of GPS location
      geoError (error) { /* eslint-disable-line */
        // just disable the button!
        document.querySelector('.getGPS').disabled = true;
      },

      // executes when the GPS location is available, and tries to find Latitude and Longitude from Google Geocode API
      geoSuccess (position) {
        // got us the current location, maybe
        let pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        // request location “friendly” name from Google
        this.$store.dispatch('fetchLocationFromCoords', pos).then((response) => { /* eslint-disable-line */
          const places = response.data;

          if (response.data.results.length) {
            // start over
            this.options = [];

            // update the location text
            this.options.push(response.data.results[0].formatted_address);
            this.$store.state.location.text = response.data.results[0].formatted_address;
          } else {
            this.message.className = 'is-danger';

            if (places.status == 'ZERO_RESULTS') {
              this.message.text = 'There is something wrong with those coords dude!';
            } else {
              this.message.text = 'The API answered something completely useless!';
            }
          }
        }).catch((error) => { /* eslint-disable-line */
          this.message.className = 'is-warning';
          this.message.text = 'You must be online to search for a location!';
        });
      },

      // tries to find out the GPS position information of the browser — requires HTTPS and user approval
      geolocation () {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(this.geoSuccess, this.geoError);
        }
      },

      onCancelLocation () {
        this.$store.dispatch('closeActivePanel', this);
      },

      onAcceptLocation () {
        this.$store.commit('updateLocation', [this.value.coords, this.value.label]);

        this.$store.dispatch('copyLocationText', [this.value.label, this]);

        this.$store.dispatch('closeActivePanel', this);
      },

      onSearch (query) {
        this.changeLocation(query, this);
      },

      // executes 500 ms after the last _keyup_ in Vue Multiselect, and requests location suggestions from Google Geocode API
      changeLocation: _debounce ((txt, vm) => {
        if (txt.length > 2) {
          vm.isLoading = true;

          // request location suggestions from Google Geocode API
          vm.$store.dispatch('fetchLocationSuggestions', encodeURI(txt)).then((response) => { /* eslint-disable-line */
            let places = response.data;

            if (places.results.length) {
              vm.message.text = '';

              vm.buildLocationSuggestList(places.results);
            } else {
              vm.message.className = 'is-danger';

              if (places.status == 'ZERO_RESULTS') {
                vm.message.text = 'Cannot find the entered location!';
              } else {
                vm.message.text = 'The API answered something completely useless!';
              }
            }
          }).catch((error) => { /* eslint-disable-line */
            vm.message.className = 'is-warning';
            vm.message.text = 'Are you even online?';
          });

          vm.isLoading = false;
        }
      }, 500),

      showLocation ({ label }) {
        // TODO: maybe use a computed property instead?
        return `${label}`;
      }
    },

    mounted () {
      // disable the GPS button, if the browser does not support the API at all
      if (!navigator.geolocation) {
        document.querySelector('.getGPS').disabled = true;
      }
    }
  }
</script>

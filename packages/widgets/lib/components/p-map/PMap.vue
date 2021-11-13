<template>
  <div class="p-map" :style="style">
    <div id="info">
      <div v-if="attraction.name">
        <p>
          <strong>Name:</strong>
          {{ attraction.name }}
        </p>
        <p>
          <strong>Address:</strong>
          {{ attraction.address }}
        </p>
        <p>
          <strong>Type:</strong>
          {{ attraction.category }}
        </p>
      </div>
    </div>
    <div id="mapContainer"></div>
  </div>
</template>

<script>
/* eslint-disable */
// https://blog.logrocket.com/building-an-interactive-map-with-vue-and-leaflet/
import { ref, computed, watch, onMounted } from '@vue/composition-api'
import { useWidget, useWotProperty } from '../../use'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import data from './historic-landmarks.json'
import axios from 'axios'

// TODO: zoom-into current location?
// import { useGeolocation } from '@vueuse/core'
// const { coords, locatedAt, error } = useGeolocation()

export default {
  name: 'PMap',
  props: {
    ctx: { type: Object, required: true }
  },
  emits: [],
  setup(props, context) {
    const { uid, i, _id, $console, topic } = useWidget(props.ctx)

    const {
      property,
      // wot:
      thing,
      name,
      options,
      // wot-property:
      isValidInput,
      value,
      readProperty,
      writeProperty,
      observeProperty
    } = useWotProperty(props.ctx, [0, 0])

    const attrs = computed(() => ({
      ...context.$attrs
      // TODO: replace listeners with vue3 $attrs (class, style, onClick, onFocus)
    }))

    const style = computed(() => ({
      backgroundImage: `url('${props.ctx.widget.display.bgImageUrl}')`,
      color: props.ctx.widget.display.textColor
    }))

    const displayProps = computed(() => ({
      ...context.$props,
      color: props.ctx.widget.display.color
    }))

    const listeners = { ...context.$listeners }

    // leaflet map:

    const center = ref([37.7749, -122.4194])
    // const data = ref([])
    const map = ref(null)
    const attraction = ref({
      name: '',
      address: '',
      category: ''
    })
    const clientSecret = ref('FTZGMLOIQWFY3A0ELEZIZSUU3M4EKOJKEPXKWUWTMWK1EY4H')
    const clientID = ref('GOSFGAOZKCSLMWADY1ORYJV2A4GUNNHAHBVWY500S1IM42CS')

    onMounted(() => {
      setupLeafletMap()
    })

    function setupLeafletMap() {
      map.value = L.map('mapContainer').setView(center.value, 13)
      L.tileLayer(
        'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}',
        {
          attribution:
            'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
          maxZoom: 18,
          id: 'mapbox/streets-v11',
          accessToken:
            'pk.eyJ1IjoiYWJpZGlzaGFqaWEiLCJhIjoiY2l3aDFiMG96MDB4eDJva2l6czN3MDN0ZSJ9.p9SUzPUBrCbH7RQLZ4W4lQ'
        }
      ).addTo(map.value)
      L.geoJSON(data, {
        onEachFeature: onEachFeature,
        style: styleMap
      })
        .addTo(map.value)
        .on('click', onClick)
    }

    function styleMap(feature) {
      const year = feature.properties.datelisted
        ? parseInt(feature.properties.datelisted.slice(0, 4))
        : 0
      const color = year > 2000 ? 'red' : 'blue'
      return { color: color }
    }

    function onEachFeature(feature, layer) {
      if (feature.properties && feature.properties.name) {
        layer.bindPopup(feature.properties.name)
        layer.on('mouseover', () => {
          layer.openPopup()
        })
        layer.on('mouseout', () => {
          layer.closePopup()
        })
      }
    }

    function onClick(e) {
      const name = e.layer.feature.properties.name
      axios
        .get(
          `https://api.foursquare.com/v2/venues/search?client_id=${clientID.value}&client_secret=${clientSecret.value}&v=20180323&limit=1&near=San Francisco, CA&query=${name}`
        )
        .then((data) => {
          attraction.value = {
            name: name,
            address:
              data.data.response.venues[0].location.formattedAddress.join(' '),
            category: data.data.response.venues[0].categories[0].name
          }
        })
    }

    return { attrs, style, displayProps, listeners, attraction }
  }
}
</script>

<style scoped>
:root {
  overflow: overlay;
}

.p-map {
  display: flex;
}

#info {
  width: auto;
  height: 100%;
}

#mapContainer {
  width: 80vw;
  height: 100vh;
}
</style>

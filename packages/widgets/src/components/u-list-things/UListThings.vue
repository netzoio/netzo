<template>
  <div class="u-list-things" :style="style">
    <v-toolbar v-if="!displayProps.hideSearch" flat dense fixed>
      <v-text-field
        v-model="search"
        :height="32"
        flat
        label="Filter things"
        single-line
        hide-details="auto"
        outlined
        dense
        hide
        class="px-0"
      />
    </v-toolbar>

    <v-list v-if="filteredItems.length" :dense="displayProps.denseList">
      <template v-for="(item, index) in filteredItems">
        <v-hover v-slot="{ hover }" :key="`dropdown-item-${item._id}-${index}`">
          <v-list-item
            class="px-2"
            @click="
              $router.push({
                ...$route,
                name: 'Thing',
                params: { id: item._id }
              })
            "
          >
            <v-list-item-avatar :size="displayProps.denseList ? 24 : 28" left>
              <img
                v-if="item.display && item.display.imageUrl"
                loading="lazy"
                :src="item.display.imageUrl"
                :alt="item.name"
              />
              <v-icon v-else :size="20" style="font-size: 16px">
                {{ item.name.substring(0, 1).toUpperCase() }}
              </v-icon>
            </v-list-item-avatar>
            <v-list-item-content class="text-left pa-0">
              <v-list-item-title>
                {{ item.name }}
              </v-list-item-title>
              <v-tooltip bottom>
                <template #activator="{ on }">
                  <v-list-item-subtitle class="font-weight-thin" v-on="on">
                    {{ item.description }}
                  </v-list-item-subtitle>
                </template>
                <span>{{ item.description }}</span>
              </v-tooltip>
            </v-list-item-content>
            <v-list-item-action v-if="hover">
              <v-icon> chevron_right </v-icon>
            </v-list-item-action>
          </v-list-item>
        </v-hover>

        <v-divider
          v-if="index < filteredItems.length"
          :key="`dropdown-item-divider-${index}`"
        />
      </template>
    </v-list>

    <template v-else-if="!filteredItems.length && items.length">
      <app-content-placeholder
        icon="filter_list"
        html-content="No results found.<br />Try searching with other keywords."
      />
    </template>

    <template v-else-if="!filteredItems.length && !items.length">
      <app-content-placeholder
        icon="sensors"
        html-content="No things.<br/>New things will appear here."
      />
    </template>
  </div>
</template>

<script>
import { ref, computed, watch } from '@vue/composition-api'
import { useWidget, useWotProperty } from '../../use'
import { useFind } from 'feathers-vuex'

/* eslint-disable */

export default {
  name: 'UListThings',
  components: {
    AppContentPlaceholder: () =>
      import('@/common/components/AppContentPlaceholder.vue')
  },
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
    } = useWotProperty(props.ctx)

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
      hideSearch: props.ctx.widget.display.hideSearch,
      denseList: props.ctx.widget.display.denseList
    }))

    const listeners = { ...context.$listeners }

    // things:

    const { $store, $FeathersVuex } = context.root
    const { Thing } = $FeathersVuex.api

    const query = ref({ $limit: 1000 })
    const params = computed(() => ({
      query: { accountId: $store.state.route.query.accountId, ...query.value }
    }))
    const { items, isPending } = useFind({
      model: Thing,
      params
      // queryWhen: computed(() => Thing.findInStore(params).data.length < 2)
    })

    // search:

    const search = ref('')

    const filteredItems = computed(() =>
      items.value ? filterItemsByProps(items.value) : null
    )

    function filterItemsByProps(items) {
      // v-data-table custom-filter prop expects no params to be passed
      let lowerCaseSearch = search.value.toString().toLowerCase()
      return items.filter(
        (row) =>
          // eslint-disable-next-line prettier/prettier
          row['_id'].toString().toLowerCase().match(lowerCaseSearch) ||
          // eslint-disable-next-line prettier/prettier
          row['name'].toString().toLowerCase().match(lowerCaseSearch) ||
          // eslint-disable-next-line prettier/prettier
          row['description'].toString().toLowerCase().match(lowerCaseSearch)
      )
    }

    return {
      value,
      displayProps,
      attrs,
      style,
      listeners,
      // things:
      items,
      // search:
      search,
      filteredItems,
      filterItemsByProps
    }
  }
}
</script>

<style scoped>
.u-list-things {
  width: 100%;
  height: 100%;
}

>>> .v-list {
  background: none;
}

>>> .v-toolbar__content {
  padding: 0px 4px !important;
}

>>> .v-input,
>>> .v-input__control,
>>> .v-input__slot {
  /* allows denser (medium) input field heights */
  min-height: auto !important;
}
</style>

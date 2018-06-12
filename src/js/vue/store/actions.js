import axios from 'axios';

// close any panel left open
export const closeActivePanel = ({ commit, state }, $vm) => {
  if (state.activePanel) {
    $vm.$root.$el.querySelector('.panel-container').classList.remove('is_visible');

    setTimeout(() => {
      commit('resetActivePanel');
    }, 300); // there is a sliding transition on each panel that runs for 300ms, wait for it before removing the component
  }
}

// remove a template from the store
export const confirmDelete = ({ commit, dispatch }, [key, $vm]) => {
  dispatch('closeActivePanel', $vm);
  dispatch('hideToolbars', $vm);

  $vm.$dialog.confirm({
    message: 'Are you sure you want to delete this template?',
    onConfirm: () => {
      commit('deleteTemplate', key);
    }
  });
};

// save the edited template
export const confirmSave = ({ commit, dispatch, state }, $vm) => {
  const tpl = state.currentlyEditing;
  const key = tpl.closest('.template-wrapper').getAttribute('data-key');
  const title = tpl.closest('.template-wrapper').querySelector('.template-title').textContent;

  $vm.$dialog.prompt({
    inputAttrs: {
      value: title
    },
    message: 'Template title?',
    onConfirm: (value) => {
      commit('saveTemplate', [key, value]);
      dispatch('closeActivePanel', $vm);
      dispatch('hideToolbars', $vm);
    }
  });
}

// copy the selected Location text from the Panel to the “active” template
export const copyLocationText = ({ commit, dispatch, state }, [newLocationText, $vm]) => {
  const locationRe = /<span class=".*is_location">.*?<\/span>/gm;
  const tpl = state.currentlyEditing;
  const key = tpl.closest('.template-wrapper').getAttribute('data-key');
  const message = tpl.innerHTML;

  let text;

  // if there is already a location tag in the text, replace it, otherwise insert one
  if (locationRe.test(message)) {
    text = message.replace(locationRe, `<span class="template-snippet is_location">${newLocationText}</span>`);
  } else {
    tpl.focus(); // sometimes this helps, to insert the new snippet at where the cursor was, on Firefox at least
    document.execCommand('insertHTML', false, `<span class="template-snippet is_location">${newLocationText}</span>`);
    tpl.focus();

    text = state.currentlyEditing.innerHTML;
  }

  dispatch('closeActivePanel', $vm);

  commit('addLocationText', [key, text]);
}

// copy the selected Snippet of text from the Panel to the “active” template
export const copySnippetText = ({ commit, dispatch, state }, [newSnippetText, $vm]) => {
  const tpl = state.currentlyEditing;
  const key = tpl.closest('.template-wrapper').getAttribute('data-key');

  tpl.focus(); // sometimes this helps, to insert the new snippet at where the cursor was, on Firefox at least
  document.execCommand('insertHTML', false, `<span class="template-snippet is_snippet">${newSnippetText}</span>`);
  tpl.focus();

  dispatch('closeActivePanel', $vm);

  commit('addSnippetText', [key, state.currentlyEditing.innerHTML]);
}

// request location suggestions from Google Geocode API
export const fetchLocationSuggestions = ({ state }, address) => {
  return new Promise((resolve, reject) => {
    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(address)}&language=${state.lang}&key=${state.geocodingApiKey}`)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => { /* eslint-disable-line */
        reject(error);
      });
  });
};

// request location “friendly” name from Google
export const fetchLocationFromCoords = ({ state }, location) => {
  return new Promise((resolve, reject) => {
    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&language=${state.lang}&key=${state.geocodingApiKey}`)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => { /* eslint-disable-line */
        reject(error);
      });
  });
};

// hide editing toolbars
export const hideToolbars = ({ commit, state }, $vm) => {
  if (state.toolbarsAreVisible) {
    $vm.$root.$el.querySelectorAll('.toolbar-container').forEach((el) => {
      el.classList.remove('is_visible');
    });

    setTimeout(() => {
      if (state.currentlyEditing) {
        state.currentlyEditing.removeAttribute('contentEditable');
      }

      commit('resetToolbars');
    }, 150); // there is a sliding transition on each toolbar that runs for 150ms, wait for it before removing the component
  }
}

// show location panel
export const openLocationPanel = ({ commit, state }, $vm) => {
  if (state.activePanel && state.activePanel != 'LocationPanel') {
    // quickly hide the previous open panel, to replace it with the Location
    $vm.$root.$el.querySelector('.panel-container').classList.remove('is_visible');
    commit('resetActivePanel');
  }

  // get me the Location panel please!
  commit('showLocation');

  // Vue.nextTick does not show my enter transition — should I use <transition> instead of just CSS?
  // TODO: investigate further
  setTimeout(() => {
    $vm.$root.$el.querySelector('.panel-container').classList.add('is_visible');
  }, 50);
}

// show snippets panel
export const openSnippetsPanel = ({ commit, state }, $vm) => {
  if (state.activePanel && state.activePanel != 'SnippetsPanel') {
    // quickly hide the previous open panel, to replace it with the Location
    $vm.$root.$el.querySelector('.panel-container').classList.remove('is_visible');
    commit('resetActivePanel');
  }

  // get me the Snippets panel please!
  commit('showSnippets');

  // Vue.nextTick does not show my enter transition — should I use <transition> instead of just CSS?
  // TODO: investigate further
  setTimeout(() => {
    $vm.$root.$el.querySelector('.panel-container').classList.add('is_visible');
  }, 50);
}

// show editing toolbars
export const showToolbars = ({ commit, state }, el) => {
  commit('showToolbars', el);
}

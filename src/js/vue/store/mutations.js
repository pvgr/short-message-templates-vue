export const addLocationText = (state, [key, text]) => {
  const templateStateIndex = state.templates.findIndex((item) => item.key == key);

  if (templateStateIndex > -1) {
    state.templates[templateStateIndex].text = text;
  }
}

export const addSnippetText = (state, [key, text]) => {
  const templateStateIndex = state.templates.findIndex((item) => item.key == key);

  if (templateStateIndex > -1) {
    state.templates[templateStateIndex].text = text;
  }
}

export const addSnippet = (state, text) => {
  state.snippets.push(text);
}

export const deleteTemplate = (state, key) => {
  if (state.templates.findIndex(item => item.key == key) > -1) {
    state.currentlyEditing = undefined;
    state.templates = state.templates.filter((item) => {
      return item.key != key;
    });
  }
}

export const resetActivePanel = (state) => {
  state.activePanel = undefined;
}

export const resetToolbars = (state) => {
  state.currentlyEditing = undefined;
  state.toolbarsAreVisible = false;
}

export const saveTemplate = (state, [key, title]) => {
  const templateStateIndex = state.templates.findIndex((item) => item.key == key);

  if (templateStateIndex > -1) {
    state.templates[templateStateIndex].text = state.currentlyEditing.innerHTML;
    state.templates[templateStateIndex].title = title;
  } else {
    state.templates.push({
      key: key,
      title: title,
      text: state.currentlyEditing.innerHTML
    });
  }
}

export const showLocation = (state) => {
  state.activePanel = 'LocationPanel';
}

export const showSnippets = (state) => {
  state.activePanel = 'SnippetsPanel';
}

export const showToolbars = (state, el) => {
  state.currentlyEditing = el;
  state.toolbarsAreVisible = true;
}

export const updateLocale = (state, lang) => {
  state.lang = lang;
};

export const updateLocation = (state, [coords, label]) => {
  state.location.coords = coords;
  state.location.text = label;
};

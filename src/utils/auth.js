export function setLocal(name, data) {
  return window.localStorage.setItem(name, JSON.stringify(data));
}

export function removeLocal(name) {
  try {
    return window.localStorage.removeItem(name);
  } catch (error) {
    console.log(error);
  }
}

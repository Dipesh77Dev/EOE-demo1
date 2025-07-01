const storagePrefix = 'eoe_admin_react_';

const storage = {
  clearToken: () => {
    window.localStorage.removeItem(`${storagePrefix}token`);
  },
  setToLS: (key: string, value: any) => {
    window.localStorage.setItem(`${storagePrefix + key}`, JSON.stringify(value));
  },
  getFromLS: (key: string) => {
    const value = window.localStorage.getItem(`${storagePrefix + key}`);

    if (value) {
      return JSON.parse(value);
    }

    return '';
  },
};

export default storage;

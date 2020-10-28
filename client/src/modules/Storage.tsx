export class LocalStorageWrapper {
  storageSupported: boolean;

  constructor() {
    //Check if browser supports local storage
    this.storageSupported = typeof Storage != undefined;
  }

  set(key: string, item: string): void {
    if (this.storageSupported) {
      localStorage.setItem(key, item);
    }
  }

  // Returns null if local storage is not supported
  // or if the key has no associated value
  get(key: string): string | null {
    if (this.storageSupported) {
      return localStorage.getItem(key);
    } else {
      return null;
    }
  }

  keyExists(key: string): boolean {
    if (localStorage.getItem(key) !== null) {
      return true;
    } else {
      return false;
    }
  }

  // Removes the item with key
  remove(key: string): void {
    if (this.storageSupported) {
      localStorage.removeItem(key);
    }
  }

  // Deletes all data in local storage
  clear(): void {
    if (this.storageSupported) {
      localStorage.clear();
    }
  }
}

export class SessionStorageWrapper {
  storageSupported: boolean;

  constructor() {
    //Check if browser supports local storage
    this.storageSupported = typeof Storage != undefined;
  }

  set(key: string, item: string): void {
    if (this.storageSupported) {
      sessionStorage.setItem(key, item);
    }
  }

  // Returns null if local storage is not supported
  // or if the key has no associated value
  get(key: string): string | null {
    if (this.storageSupported) {
      return sessionStorage.getItem(key);
    } else {
      return null;
    }
  }

  keyExists(key: string): boolean {
    if (sessionStorage.getItem(key) !== null) {
      return true;
    } else {
      return false;
    }
  }

  // Removes the item with key
  remove(key: string): void {
    if (this.storageSupported) {
      sessionStorage.removeItem(key);
    }
  }

  // Deletes all data in session storage
  clear(): void {
    if (this.storageSupported) {
      sessionStorage.clear();
    }
  }
}

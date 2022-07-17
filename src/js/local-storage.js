class WorkLocalStorage {
  VALUE_HOME = 'HOME';
  VALUE_WATCHED = 'WATCHED';
  VALUE_QUEUE = 'QUEUE';

  #KEY_LOCATION = 'UserLocationPage';
  #KEY_WATCHED = 'UserWatched';
  #KEY_QUEUE = 'UserQueue';

  constructor() {}

  save(key, value) {
    try {
      const serializedState = JSON.stringify(value);
      localStorage.setItem(key, serializedState);
    } catch (error) {
      console.error('Set state error: ', error.message);
    }
  }

  load(key) {
    try {
      const serializedState = localStorage.getItem(key);
      return serializedState === null ? undefined : JSON.parse(serializedState);
    } catch (error) {
      console.error('Get state error: ', error.message);
    }
  }

  /* Работа с ЛОКАЦИЕЙ user */
  getUserLocationPage() {
    return this.load(this.#KEY_LOCATION);
  }
  setUserLocationPage(value) {
    this.save(this.#KEY_LOCATION, value);
  }

  /* Работа с WATCHED, get-возвращ массив id, add - добавл id, del - удал id с массива */
  getUserWatched() {
    return this.load(this.#KEY_WATCHED);
  }
  addUserWatched(id) {
    const array = this.getUserWatched();
    if (array) {
      array.push(id);
      this.save(this.#KEY_WATCHED, array);
    } else {
      const arr = [];
      arr.push(id);
      this.save(this.#KEY_WATCHED, arr);
    }
  }
  delUserWatched(id) {
    const array = this.getUserWatched();
    if (!array) return;
    const newArr = array.filter(value => value !== id);
    this.save(this.#KEY_WATCHED, newArr);
  }

  /* Работа с QUEUE, get-возвращ массив id, add - добавл id, del - удал id с массива */
  getUserQUEUE() {
    return this.load(this.#KEY_QUEUE);
  }
  addUserQUEUE(id) {
    const array = this.getUserQUEUE();
    if (array) {
      array.push(id);
      this.save(this.#KEY_QUEUE, array);
    } else {
      const arr = [];
      arr.push(id);
      this.save(this.#KEY_QUEUE, arr);
    }
  }
  delUserQUEUE(id) {
    const array = this.getUserQUEUE();
    if (!array || array.length === 0) return;
    const newArr = array.filter(value => value !== id);
    this.save(this.#KEY_QUEUE, newArr);
  }
}

const workLocStorage = new WorkLocalStorage();
export { workLocStorage };

import AsyncStorage from '@react-native-async-storage/async-storage';

export default class RNStorage {
  public static constKey = '';

  public static setItem(key, value) {
    // console.log('local data store :->> ', key, value);
    if (typeof value !== 'string') {
      value = JSON.stringify(value);
    }

    return AsyncStorage.setItem(`${this.constKey}${key}`, value);
  }

  public static getItem(key): Promise<string> {
    return new Promise((fulfill, reject) => {
      AsyncStorage.getItem(`${this.constKey}${key}`, (err, result) => {
        if (err) return reject(err);

        fulfill(result!);
      });
    });
  }

  public static removeItem(key) {
    return AsyncStorage.removeItem(`${this.constKey}${key}`);
  }
}

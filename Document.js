export default class Document {
  // obiekt tworzony za pomocą tej klasy ma właściwość id
  constructor(id) {
    this.id = id;
  }

  getDocumentID(id) {
    return new Promise((resolve, reject) => {
      if (id === this.id) {
        this.async(() => {
          // gdy przekazane przez argument ID zgadza się z ID obiektu, zwracamy to ID
          resolve(this.id);
        });
      } else {
        this.async(() => {
          // jeśli to ID się nie zgadza, rzucamy błędem
          reject('Provided ID does not exist.');
        });
      }
    });
  }

  changeDocumentID(id) {
    return new Promise((resolve, reject) => {
      // jeśli ID zostało podane...
      if (id) {
        this.async(() => {
          // ustawiamy obiektowi nowe ID i wyświetlamy komunikat o sukcesie
          this.id = id;
          resolve('Document was successfully added.');
        });
      } else {
        this.async(() => {
          // w przeciwnym razie rzucamy błędem
          reject('Operation failed.');
        });
      }
    });
  }

  // symulacja kodu asynchronicznego
  async(callback, ...params) {
    setTimeout(() => {
      callback(...params);
    }, Math.random() * 100);
  }
}

import Document from './Document';

// ZAPIS z .then
test('Does the document have an ID provided', () => {
  // ustalamy ID, które otrzyma dokument
  const id = 2;
  // tworzymy obiekt o tym ID na podstawie naszej klasy
  const doc = new Document(id);

  // wywołujemy testowaną metodę z prawidłowym ID
  const promise = doc.getDocumentID(id);
  // spodziewamy się, że ID obiektu jest takie, jakie ustawiliśmy podczas jego tworzenia
  return promise.then(documentID => expect(documentID).toBe(id));
});

// ZAPIS async...await
xtest('Does the document have an ID provided', async () => {
  const id = 2;
  const doc = new Document(id);

  const documentID = await doc.getDocumentID(id);
  expect(documentID).toBe(id);
});

// ZAPIS z .then
xtest('Does document ID change', () => {
  const newID = 5;
  const doc = new Document(2);

  const promise = doc.changeDocumentID(newID);
  return promise
    .then(message => expect(message).toBe('Document was successfully added.'))
    .then(() => doc.getDocumentID(newID))
    .then(documentID => expect(documentID).toBe(newID));
});

// ZAPIS async...await
xtest('Does document ID change', async () => {
  expect.assertions(2);

  const newID = 5;
  const doc = new Document(2);

  const message = await doc.changeDocumentID(newID);
  expect(message).toBe('Document was successfully added.');

  const documentID = await doc.getDocumentID(newID);
  expect(documentID).toBe(newID);
});

xtest('Does getDocumentID throw error with non-existent ID', async () => {
  expect.assertions(1);
  const id = 2;
  const doc = new Document(id);

  try {
    await doc.getDocumentID(id); // błąd w teście. Zwróć uwagę, że testujemy rzucanie błędem, więc powinniśmy wprowadzić tu niepoprawne ID, np. 5
  } catch (error) {
    expect(error).toMatch('Provided ID does not exist.');
  }
});

xtest('Does the document have an ID provided', () => {
  const id = 2;
  const doc = new Document(id);

  const promise = doc.getDocumentID(id);
  promise.then(id => expect(id).toBe(5)); // zapomnieliśmy o "return" i choć mamy błąd w teście (5 zamiast zmiennej id), to przechodzi on jako poprawny
});
// wersja z DONE()
xtest('Does the document have an ID provided', done => {
  expect.assertions(1);
  const id = 2;
  const doc = new Document(id);

  const promise = doc.getDocumentID(id);
  promise.then(id => {
    expect(id).toBe(id);
    done(); // Wywołujemy done() dopiero po zakończeniu asynchronicznego kodu
  });
});

xtest('Does document ID change (with assertions)', () => {
  expect.assertions(2);

  const newID = 5;
  const doc = new Document(2);

  const promise = doc.changeDocumentID(newID);
  return promise
    .then(message => expect(message).toBe('Document was successfully added.'))
    .then(() => doc.getDocumentID(newID))
    .then(documentID => documentID === newID); // pomyliliśmy sposób sprawdzania wartości
});
import { openDB } from "idb";

const initdb = async () =>
  openDB("jate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

// method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log("PUT to the database");
  const jateDB = await openDB("jate", 1);
  const tx = jateDB.transaction("jate", "readwrite");
  const store = tx.objectStore("jate");
  const request = store.add({ jate: content });
  const result = await request;
  result
    ? console.log("🚀 - data saved to the database", result)
    : console.error("putDb not implemented");
};

// method that gets all the content from the database
export const getDb = async () => {
  console.log("GET all from the database");
  const jateDB = await openDB("jate", 1);
  const tx = jateDB.transaction("jate", "readonly");
  const store = tx.objectStore("jate");
  const request = store.getAll();
  const result = await request;
  if (result) {
    console.log("result.value", result);
    return result;
  } else {
    console.error("getDb not implemented");
  }
};

initdb();

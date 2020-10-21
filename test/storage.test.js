import chai from 'chai';
import GSLocalStorage from './../src/index.js'
import mocks from 'mock-browser'

var mock = new mocks.mocks.MockBrowser();
const storage = mock.getLocalStorage()

const store = new GSLocalStorage('documents', { debug: true, storage: storage })
const expect = chai.expect
const assert = chai.assert

function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
        currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}

describe("Instance", () => {
    it("localStorage key created", () => {
        assert.isString(storage.getItem("documents"))
        assert.isObject(store)
    })
})
describe("Set/Get", () => {
    it("Set value", () => {
        store.set("data_key", 1234, 0.00001)
        assert.equal(store.get("data_key"), 1234)
    })
})
describe("Get after timeout", () => {
    it("Set value", () => {
        sleep(10)
        assert.equal(store.get("data_key"), null)
    })
})

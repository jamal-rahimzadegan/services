import ss from './session-service';

describe('Session Service should work for single operations ', () => {
  const singleKey = 'singleKey';
  let testValue;

  const createItem = (value) => {
    ss.set(singleKey, value);
    testValue = ss.get(singleKey);
  };

  it('number', () => {
    createItem(7);
    expect(testValue).toBe(7);
  });

  it('string', () => {
    createItem('random-string');
    expect(testValue).toBe('random-string');
  });

  it('null', () => {
    createItem(null);
    expect(testValue).toBe(null);
  });

  it('undefined', () => {
    createItem(undefined);
    expect(testValue).toBe('undefined');
  });

  it('object', () => {
    const MOCK_OBJECT = [{ name: 'John Doe', isDeveloper: true, city: null, info: { age: 16 } }];
    createItem(MOCK_OBJECT);
    expect(testValue).toStrictEqual(MOCK_OBJECT);
  });

  it('remove', () => {
    ss.remove(singleKey);
    expect(ss.get(singleKey)).toStrictEqual(null);
  });
});

//------------------------------------------------------------------
describe('Session Service should work for multiple operations ', () => {
  const items = { name: 'John', family: 'Doe', info: { age: 16 } };
  const multipleKeyToGet = Object.keys(items);
  ss.setMultiple(items);

  it('getMultiple', () => {
    const multiResult = ss.getMultiple(multipleKeyToGet);
    const allResult = ss.getAll();

    expect(multiResult).toStrictEqual(items);
    expect(allResult).toStrictEqual(items);
  });

  it('removeMultiple', () => {
    ss.removeMultiple(multipleKeyToGet);
    expect(ss.getAll()).toStrictEqual({});
  });

  it('removeAll', () => {
    ss.removeAll();
    expect(ss.getAll()).toStrictEqual({});
  });
});

//------------------------------------------------------------------
//Todo: Enable this test if you want to test internals and you should make them public

// describe("Session Service internal should work", () => {
// 	const { checkPrimitive, checkJSON } = ls;
//
// 	it("checkPrimitive", () => {
// 		expect(checkPrimitive(null)).toBe(true);
// 		expect(checkPrimitive(true)).toBe(true);
// 		expect(checkPrimitive("string")).toBe(true);
// 		expect(checkPrimitive(7)).toBe(true);
// 		expect(checkPrimitive(Symbol("id"))).toBe(true);
// 		expect(checkPrimitive(() => {})).toBe(false);
// 		expect(checkPrimitive({})).toBe(false);
// 	});
//
// 	it("checkJSON", () => {
// 		expect(checkJSON("random-string")).toBe(false);
// 		expect(checkJSON(JSON.stringify({ key: "value" }))).toBe(true);
// 	});
// });

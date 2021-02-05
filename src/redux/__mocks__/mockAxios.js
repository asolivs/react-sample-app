import MockAdapter from "axios-mock-adapter";

export default function mockAxios(axios) {
  const mock = new MockAdapter(axios, { delayResponse: 300 });

  // mockAuth(mock);
  // mockCustomers(mock);
  // mockProducts(mock);
  // mockRemarks(mock);
  // mockSpecifications(mock);

  return mock;
}

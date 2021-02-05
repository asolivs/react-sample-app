import axios from "axios";

export const CUSTOMERS_URL = "https://jsonplaceholder.typicode.com/users";

// CREATE =>  POST: add a new customer to the server
export function createCustomer(customer) {
  return axios.post(CUSTOMERS_URL, { customer });
}

// READ
export async function getAllCustomers(getAllCustomers) {
  return new Promise(async (resolve, reject) => {
    console.log(getAllCustomers);

    await axios.get(CUSTOMERS_URL).then((responde) => {
      const data = responde.data.filter((item) => {
        if (
          item.name.indexOf(getAllCustomers.filter.lastName) != -1 ||
          item.email.indexOf(getAllCustomers.filter.lastName) != -1
        ) {
          return item;
        }
      });

      const newdata = data.sort(function(a, b) {
        if (getAllCustomers.sortOrder == "desc") {
          if (getAllCustomers.sortField == "id") {
            return b[getAllCustomers.sortField] - a[getAllCustomers.sortField];
          }

          if (a[getAllCustomers.sortField] > b[getAllCustomers.sortField]) {
            return 1;
          }
          if (a[getAllCustomers.sortField] < [getAllCustomers.sortField]) {
            return -1;
          }
          // a must be equal to b
          return 0;
        } else {
          if (getAllCustomers.sortField == "id") {
            return a[getAllCustomers.sortField] - b[getAllCustomers.sortField];
          }

          if (a[getAllCustomers.sortField] < b[getAllCustomers.sortField]) {
            return 1;
          }
          if (a[getAllCustomers.sortField] > [getAllCustomers.sortField]) {
            return -1;
          }
          // a must be equal to b
          return 0;
        }
      });
      return resolve({ data: newdata });
    });
  });
  // return axios.get(CUSTOMERS_URL);
}

export function getCustomerById(customerId) {
  return axios.get(`${CUSTOMERS_URL}/${customerId}`);
}

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export function findCustomers(queryParams) {
  return axios.post(`${CUSTOMERS_URL}/find`, { queryParams });
}

// UPDATE => PUT: update the customer on the server
export function updateCustomer(customer) {
  return axios.put(`${CUSTOMERS_URL}/${customer.id}`, { customer });
}

// UPDATE Status
export function updateStatusForCustomers(ids, status) {
  return axios.post(`${CUSTOMERS_URL}/updateStatusForCustomers`, {
    ids,
    status,
  });
}

// DELETE => delete the customer from the server
export function deleteCustomer(customerId) {
  return axios.delete(`${CUSTOMERS_URL}/${customerId}`);
}

// DELETE Customers by ids
export function deleteCustomers(ids) {
  return axios.post(`${CUSTOMERS_URL}/deleteCustomers`, { ids });
}

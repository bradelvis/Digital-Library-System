// You no longer need to define baseURL because Vite will handle the proxy.
export const endpoints = {
  login: `/api/v1/auth/login`,         
  signup: `/api/v1/auth/register`,     
  addBook: `/api/v1/book/addBook`,     
  getAvailableBooks: `/api/v1/book/getAvailableBooks`,  
  borrowBook: `/api/v1/transaction/borrow`,  
  returnBook: `/api/v1/transaction/return`,  
  getBooks: `/api/v1/book/getBooks`,  
  getIssuedBooks: `/api/v1/book/getIssuedBooks`,  
};
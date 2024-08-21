

const backendDomin = "http://localhost:8080"

const SummaryApi = {
  signUP: {
    url: `${backendDomin}/api/signup`,
    method: "post",
  },
  signIn: {
    url: `${backendDomin}/api/signin`,
    method: "post",
  },
  current_user: {
    url: `${backendDomin}/api/user-details`,
    method: "get",
  },
  logout_user: {
    url: `${backendDomin}/api/userLogout`,
    method: "get",
  },
  allUser: {
    url: `${backendDomin}/api/all-user`,
    method: "get",
  },
  updateUser: {
    url: `${backendDomin}/api/update-user`,
    method: "post",
  },
  uploadProduct: {
    url: `${backendDomin}/api/upload-product`,
    method: "post",
  },
  uploadProductForHome: {
    url: `${backendDomin}/api/upload-product-for-home`,
    method: "post",
  },
  allProduct: {
    url: `${backendDomin}/api/get-product`,
    method: "get",
  },
  updateProduct: {
    url: `${backendDomin}/api/update-product`,
    method: "post",
  },
  categoryProduct: {
    url: `${backendDomin}/api/get-categoryProduct`,
    method: "get",
  },
  categoryWiseProduct: {
    url: `${backendDomin}/api/category-product`,
    method: "post",
  },
  productDetails: {
    url: `${backendDomin}/api/product-details`,
    method: "post",
  },
  addToCartProduct: {
    url: `${backendDomin}/api/addtocart`,
    method: "post",
  },
  addToCartProductCount: {
    url: `${backendDomin}/api/countAddToCartProduct`,
    method: "get",
  },
  addToCartProductView: {
    url: `${backendDomin}/api/view-card-product`,
    method: "get",
  },
  updateCartProduct: {
    url: `${backendDomin}/api/update-cart-product`,
    method: "post",
  },
  deleteCartProduct: {
    url: `${backendDomin}/api/delete-cart-product`,
    method: "post",
  },
  searchProduct: {
    url: `${backendDomin}/api/search`,
    method: "get",
  },
  filterProduct: {
    url: `${backendDomin}/api/filter-product`,
    method: "post",
  },
  allEwasteUploads: {
    url: `${backendDomin}/api/all-ewaste-uploads`,
    method: "get",
  },
  allTraderss: {
    url: `${backendDomin}/api/all-traders`,
    method: "get",
  },
  allTraders: {
    url: `${backendDomin}/api/all-traders`,
    method: "post",
  },
  assignTraders: {
    url: `${backendDomin}/api/assign-trader`,
    method: "put",
  },
  assignTasks: {
    url: `${backendDomin}/api/assignments`,
    method: "post",
  },
  allTasks: {
    url: `${backendDomin}/api/assignments`,
    method: "get",
  },
  deleteTaskAndProduct: {
    url: `${backendDomin}/api/assignments`, // Make sure this URL is correct
    method: "DELETE",
  },
  getTaskByUserEmail: {
    url: `${backendDomin}/api/get-tasks-by-user-email`,
    method: "get",
  },
  getTraderByEmail: {
    url: `${backendDomin}/api/get-trader-by-email`,
    method: "get",
  },
  payment: {
    url: `${backendDomin}/api/checkout`,
    method: "post",
  },
};


export default SummaryApi

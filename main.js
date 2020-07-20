new Vue({
  el: '#app',
  data: {
    products: [],
    tempProduct: {
      imageUrl: [],
    },
    pagination: {},
    isNew: false,
    user: {
      token: '',
      uuid: 'fb51b371-f18c-4c36-bc07-26304c376f66'
    }
  },
  methods: {
    getProducts(page=1) {
      const api = `https://course-ec-api.hexschool.io/api/${this.user.uuid}/admin/ec/products?page=${page}`;
      axios.get(api)
        .then((res)=>{
          this.products= res.data.data;
          this.pagination = res.data.meta.pagination;
        })
        .catch((error)=>{
          console.log(error);
        });
    },
    openModel(method,item) {
      if(method == 'createProduct') {
        this.tempProduct = {
          imageUrl: [],
        };
        this.isNew = true;
        $('#exampleModal').modal('show');
      }else if(method == 'updateProduct') {
        this.tempProduct = JSON.parse(JSON.stringify(item));
        this.isNew = false;
        this.getProduct();
      }else if(method == 'deleteProduct') {
        this.tempProduct = JSON.parse(JSON.stringify(item));
        $('#delProductModal').modal('show');
      }
    },
    updateProduct() {
      let api = `https://course-ec-api.hexschool.io/api/${this.user.uuid}/admin/ec/product`;
      if(this.isNew) {
        axios.post(api,this.tempProduct)
          .then((res)=>{
            this.getProducts();
            this.tempProduct = {
              imageUrl: [],
            };
            $('#exampleModal').modal('hide');
          })
          .catch((error)=>{
            console.log(error);
          });
      }else {
        api = `${api}/${this.tempProduct.id}`
        axios.patch(api,this.tempProduct)
          .then((res)=>{
            console.log(res);
            this.getProducts();
            this.tempProduct = {
              imageUrl: [],
            };
            $('#exampleModal').modal('hide');
          })
          .catch((error)=>{
            console.log(error);
          });
      }
    },
    getProduct() {
      let api = `https://course-ec-api.hexschool.io/api/${this.user.uuid}/admin/ec/product/${this.tempProduct.id}`;
      axios.get(api)
        .then((res)=>{
          // this.tempProduct.description = res.data.data.description;
          this.tempProduct = res.data.data;
          // console.log(res);
          $('#exampleModal').modal('show');
        })
        .catch((error)=>{
          console.log(error);
        });
    },
    deleteProduct() {
      let api = `https://course-ec-api.hexschool.io/api/${this.user.uuid}/admin/ec/product/${this.tempProduct.id}`;
      axios.delete(api)
        .then((res)=>{
          $('#delProductModal').modal('hide');
          this.tempProduct = {
            imageUrl: [],
          };
          this.getProducts();
        })
        .catch((error)=>{
          console.log(error);
        });
    },
    clearTemp() {
      this.tempProduct = {
        imageUrl: [],
      };
    }
  },
  created() {
    this.user.token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    axios.defaults.headers.common['Authorization'] = `Bearer ${this.user.token}`;
    if(this.user.token == '') {
      window.location = 'login.html';
    }
    this.getProducts();
  }
});



Vue.component('pagination',{

  template: `<nav aria-label="Page navigation example">
    <ul class="pagination">
      <li class="page-item">
        <a class="page-link" :class="{'disabled': pages.current_page === 1}" href="#" aria-label="Previous" @click.prevent="updatePages(pages.current_page-1)">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li class="page-item" :class="{'active': item == pages.current_page}" v-for="(item,key) in pages.total_pages" :key="key"><a class="page-link" href="#" @click.prevent="updatePages(item)">{{item}}</a></li>
      <li class="page-item">
        <a class="page-link" :class="{'disabled': pages.current_page === pages.total_pages}" href="#" aria-label="Next" @click.prevent="updatePages(pages.current_page+1)">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>`,
  props: ['pages'],
  methods: {
    updatePages(num) {
      this.$emit('update',num);
    }
  }



});


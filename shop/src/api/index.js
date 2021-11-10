export default class Api {
    static async fetchData(url) {
      const response = await fetch(url);
      if (!response.ok) throw new Error(response.statusText);
      return await response.json();
    }

    static async sendData(url, body) {
        const response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json;charset=utf-8' },
          body: JSON.stringify(body),
        });
    
        if (!response.ok) throw new Error(response.statusText);
        return true;
      }
    
      static async fetchHitsSales() {
        return Api.fetchData('http://localhost:7070/api/top-sales');
      }
    
      static async fetchCatalogCategories() {
        return Api.fetchData('http://localhost:7070/api/categories');
      }
    
      static async fetchCatalogItems(params = {}) {
        const search = new URLSearchParams(params);
        return Api.fetchData(`http://localhost:7070/api/items?${search}`);
      }
    
      static async fetchCatalogItem(id) {
        return Api.fetchData(`http://localhost:7070/api/items/${id}`);
      }
    
      static async sendCart(data) {
        return Api.sendData('http://localhost:7070/api/order', data);
      }
}
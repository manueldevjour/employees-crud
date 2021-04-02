import http from "../http-common";

class PersonDataService {
    getAll() {
        return http.get("/person");
    }

    get(id) {
        return http.get(`/person/${id}`);
    }

    create(data) {
        return http.post("/person/create", data);
    }

    update(id, data) {
        return http.put(`person/update/${id}`, data);
    }

    delete(id) {
        return http.delete(`person/delete/${id}`);
    }
}

export default new PersonDataService();
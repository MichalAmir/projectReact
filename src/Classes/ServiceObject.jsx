import { makeObservable, observable, action, computed, runInAction } from 'mobx';

const baseUrl = 'http://localhost:8787';

class ServiceObject {
    list = [];

    constructor() {
        makeObservable(this, {
            list: observable,
            addService: action,
            getList: computed,
            setList: action
        });
        this.initList();
    }

    async initList() {
        try {
            const res = await fetch(`${baseUrl}/services`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
            });
            if (res.ok) {
                const data = await res.json();
                runInAction(() => {
                    this.setList(data);
                });
            } else {
                console.error('Failed to fetch services');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    // Action to set list
    setList(data) {
        this.list = data;
    }

    async addService(service) {
        try {
            const res = await fetch(`${baseUrl}/service`, {
                method: 'POST',
                body: JSON.stringify(service),
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
            });
            if (res.ok) {
                const data = await res.json();
                runInAction(() => {
                    this.list.push(data);
                });
            } else {
                console.error('Failed to add service');
            }
        } catch (error) {
            console.error('Error adding service:', error);
        }
    }

    get getList() {
        return this.list;
    }
}

const singleton = new ServiceObject();
export default singleton;
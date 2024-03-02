import { makeObservable, observable, action, computed, runInAction } from 'mobx';

const baseUrl = 'http://localhost:8787';

class BusinessObject {
    list = [];

    constructor() {
        makeObservable(this, {
            list: observable,
            addBusiness: action,
            getList: computed,
            setList: action
        });
        this.initList();
    }

    async initList() {
        try {
            const res = await fetch(`${baseUrl}/business`, {
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
                console.error('Failed to fetch business');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    // Action to set list
    setList(data) {
        this.list = data;
    }

    async addBusiness(business) {
        try {
            const res = await fetch(`${baseUrl}/business`, {
                method: 'POST',
                body: JSON.stringify(business),
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
                console.error('Failed to add business');
            }
        } catch (error) {
            console.error('Error adding business:', error);
        }
    }

    get getList() {
        return this.list;
    }
}

const singleton = new BusinessObject();
export default singleton;
import { makeObservable, observable, action, runInAction } from 'mobx';

const baseUrl = 'http://localhost:8787';

class BusinessDataObject {
    businessDataList = {
        id: "1",
        phone: "03-6165899",
        name:'HOME SWEET HOME',
        address: "Tel-Aviv dizengoff 82",
        email: "hsweeth@gmail.com",
        owner: "Yigal Allon",
        logo: "https://images.desenio.com/zoom/10369_1.jpg",
        //https://rukminim2.flixcart.com/image/850/1000/jwmfcsw0/name-plate/e/e/f/ds-147-100yellow-original-imafh9zghswk9u6p.jpeg?q=90&crop=false
    };
    constructor() {
        makeObservable(this, {
            businessDataList: observable,
            addBusinessData: action,
            getLast: action
        });
    }
    async addBusinessData(businessData) {
        try {
            const response = await fetch(`${baseUrl}/businessData`, {
                method: 'POST',
                body: JSON.stringify(businessData),
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
            });
            if (response.ok) {
                const newBusinessData = await response.json();
                console.log({ newBusinessData });
                this.businessDataList = { ...businessData };
                console.log("BusinessData added successfully");
            } else {
                console.log("Error: BusinessData not added (status code: " + response.status + ")");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }

    async getLast() {
        try {
            const response = await fetch(`${baseUrl}/businessData`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
            });
            if (response.ok) {
                const newBusinessData = await response.json();
                console.log(newBusinessData)
                return newBusinessData;
            } else {
                console.log("Error: Failed to get businessData (status code: " + response.status + ")");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }
}
const businessDataObject = new BusinessDataObject();
export default businessDataObject;
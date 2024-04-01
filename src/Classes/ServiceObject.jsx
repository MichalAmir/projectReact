import { makeObservable, observable, computed, action} from 'mobx';
import { observer } from 'mobx-react-lite';
const baseUrl = 'http://localhost:8787';
class ServiesStore{
    Servieslist=[
  //{
  //     id: "1",
  //     name: "Hudula Villa",
  //     description: "Get to know a spectacular and carefully designed hospitality villa with a high level of cleaning service, 5 bedrooms and a private bathroom for each, a luxurious living room, a large and fully equipped kitchen, access to a yard abundant with garden furniture, a huge heated swimming pool, a hot spa jacuzzi, a garden kitchen and a lovely view to the sea.",
  //     price: 3500,
  //     duration: 6050,
  //     img: "https://www.zohar-arc.co.il/webp/6453b24b656561683206731_1_file.webp"
  //     },
  //     {
  //     id: "2",
  //     name: "The Sultan's pool",
  //     description: "In the complex there is an indoor heated pool at your disposal for parties. Our pool parties can take place both on the green lawns and in the indoor hospitality space. All types of parties can be held there, from concept parties for company employees, through bar/bat mitzvah parties to birthday parties for all ages.",
  //     price: 800,
  //     duration: 1600,
  //     img: "https://www.galimganim.com/wp-content/uploads/2022/12/shl13.jpg"

  //   },
  //   {
  //     id: "3",
  //     name: "Zimmers in the Sea of Galilee",
  //     description: "A rich and delicious breakfast is served to the guest houses by prior arrangement and additional payment. The guests of the guest houses enjoy ending the day with a dip in the jacuzzi, sleep well in a comfortable bed and wake up in the morning to a Galilean breakfast and a dip in the private pool in the yard.",
  //     price: 1500,
  //     duration: 3000,
  //     img: "https://i0.wp.com/zimmer-north.co.il/wp-content/uploads/2022/05/%D7%94%D7%99%D7%9C%D7%99%D7%95%D7%A1-%D7%A1%D7%95%D7%95%D7%99%D7%98%D7%95%D7%AA-%D7%99%D7%95%D7%A7%D7%A8%D7%94-55.jpg"
  // },
  //   {
  //     id: "4",
  //     name: "Jerusalem Gardens Hotel",
  //     description: "The hotel employees are here for you, with great courtesy, they will give you a feeling of LIKE HOME.  The main emphasis is the cleanliness, the toilets, the capsules, the showers, the rooms, the lobby, everything is clean and smells good.",
  //     price: 600,
  //     duration: 2500,
  //     img: "https://www.jerusalem-hotelz.co.il/wp-content/uploads/2016/07/ramada-jerusalem8.jpg"
  //   },
  //   {
  //   id: "5",
  //   name: "Legendary Penthouse",
  //   description: "Lovely 4-room penthouse apartment. The apartment is spacious and bright with a spectacular view. A prestigious building with 2 elevators, covered parking and a luxurious lobby. The location is central and close to public transportation, for those looking for comfort and proximity to everywhere.",
  //   price: 1500,
  //   duration: 4000,
  //   img: "https://kampinski.co.il/wp-content/uploads/Terrace.jpg"
  // }
  //   {
  //   id: "6",
  //   name: "Luxurious family Villa",
  //   description: "A clear swimming pool, lawns with a variety of seating areas, a heated spa jacuzzi suitable for 12 people, a drinking bar and an equipped kitchen that includes refrigerators and freezers, a stove, a chipper and a barbecue station, a dining table and seating areas.",
  //   price: 4500,
  //   duration: 7000,
  //   img: "https://magdilim.co.il/wp-content/uploads/2020/05/%D7%91%D7%90%D7%93%D7%99%D7%91%D7%95%D7%AA-%D7%97%D7%91%D7%A8%D7%AA-%D7%A4%D7%9C%D7%92%D7%99%D7%9D-%D7%A2%D7%99%D7%A6%D7%95%D7%91-%D7%99%D7%A9%D7%A8%D7%90%D7%9C-%D7%9B%D7%A4%D7%99%D7%A8-%D7%99%D7%97%D7%A6-2.jpg"
  // }
];

constructor() {


        makeObservable(this, {
            Servieslist: observable,
            addServies: action,
            getList: computed,
            fetchServicesFromServer: action, // Adding action decorator
        });

        // Fetch services from server when the store is instantiated
        this.fetchServicesFromServer();
    }


    async addServies(newService) {
        try {
            const res = await fetch(`${baseUrl}/service`, {
                method: 'POST',
                body: JSON.stringify(newService),
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
            });
            console.log(res)
            if (res.status === 200) {
                console.log("Service added successfully!");
                // If the service is added successfully, update the list from the server
                await this.fetchServicesFromServer();
            } else {
                console.error("Failed to add service:", res.statusText);
            }
        } catch (error) {
            console.error("Failed to add service:", error);
        }
    }

    get getList() {
        return this.Servieslist;
    }

    async fetchServicesFromServer() {
        try {
            const res = await fetch(`${baseUrl}/services`); // Sending a GET request to get services from the server
            const data = await res.json(); // Reading the response in JSON format

            console.log("Data from server:", data); // Printing the data from the server to the console

            // Assigning the data from the server to the list of services in the client
            this.Servieslist = data;
        } catch (error) {
            console.error("Failed to fetch services:", error);
        }
    }
}

const ServiceStore = new ServiesStore();
export default ServiceStore;



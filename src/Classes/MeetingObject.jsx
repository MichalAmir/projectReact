import { makeObservable, observable, action, computed, runInAction } from 'mobx';

// כתובת בסיסית לשרת האפליקציה
const baseUrl = 'http://localhost:8787';

// מחלקה שמייצגת את החנות לניהול פגישות
class MeetingObject {
    // רשימת פגישות
    list = [];

    constructor() {
        // איתחול ה-Observable, Actions ו-Computed של המחלקה
        makeObservable(this, {
            list: observable,
            addMeeting: action,
            getList: computed,
            setList: action
        });
        // קריאה לפונקציה לאיתחול רשימת הפגישות
        this.initList();
    }

    // פונקציה המבצעת בקרת API לקבלת רשימת הפגישות מהשרת
     async initList() {
        try {
            const res = await fetch(`${baseUrl}/appointments`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
            });
            if (res.ok) {
                const data = await res.json();
                // הפעלת הפעולה setList בתוך ה-action
                runInAction(() => {
                    this.setList(data);
                });
            } else {
                console.error('Failed to fetch meetings');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    // Action לעדכון רשימת הפגישות
    setList(data) {
        this.list = data;
    }

    // פונקציה להוספת פגישה חדשה
    async addMeeting(meeting) {
        try {
          
            console.log(meeting);
            const res = await fetch(`${baseUrl}/appointment`, {
                method: 'POST',
                body: JSON.stringify(meeting),
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
            });
            if (res.ok) {
                const data = await res.json();
                // הפעלת הפעולה push בתוך ה-action
                runInAction(() => {
                    this.list.push(data);
                    console.log('Updated meetings list:', this.list); // הדפסה של רשימת הפגישות לאחר ההוספ
                });
            } else {
                console.error('Failed to add meeting');
            }
        } catch (error) {
            console.error('Error adding meeting:', error);
        }
    }

    // קומפיוטד המחזיר את רשימת הפגישות
    get getList() {
        return this.list;
    }
}

// יצירת מופע יחיד של החנות וייצואו
const singleton = new MeetingObject();
export default singleton;
import * as moment from 'moment';

export class User {
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  gender: 'male' | 'female';
  id: number;
  phone: string;
  regDate: moment.Moment;

  constructor(json?) {
    if (json) {
      this.firstName = json.firstName;
      this.lastName = json.lastName;
      this.fullName = [this.firstName, this.lastName].join(' ');
      this.email = json.email;
      this.gender = json.gender;
      this.id = json.id;
      this.phone = json.phone;
      this.regDate = moment(json.regDate);
    }
  }

  getForDB() {
    let obj = Object.assign({}, this) as any;
    obj.regDate = this.regDate.isValid() ? this.regDate.toISOString() : null;
    delete obj.id;
    return obj;
  }
}

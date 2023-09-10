import * as moment from 'moment';
import {Author} from './Author';
import {Category} from './Category';

export class Article {
  id?: number;
  date?: moment.Moment;
  modifiedDate?: moment.Moment;
  link?: string;
  title?: string;
  content?: string;
  excerpt?: string;
  author?: Author;
  images: {
    thumbnail?: string;
    fullSize?: string;
  };
  categories: Category[];

  constructor(json?) {
    if (json) {
      this.id = json.id;
      this.date = moment(json.date);
      this.modifiedDate = moment(json.modifiedDate);
      this.link = json.link;
      this.title = json.title;
      this.content = json.content;
      this.excerpt = json.excerpt;
      this.author = new Author(json.author);
      this.images = {
        thumbnail: json.thumb || null,
        fullSize: json.full || null,
      };
      this.categories = json.categories.map(cat => new Category(cat));
    }
  }

  getForDB() {
    let obj = Object.assign({}, this) as any;
    obj.date = obj.date.isValid() ? obj.date.toISOString() : null;
    obj.modifiedDate = obj.modifiedDate.isValid()
      ? obj.modifiedDate.toISOString()
      : null;
    obj.thumb = obj.images ? obj.images.thumbnail : null;
    obj.full = obj.images ? obj.images.fullSize : null;
    obj.authorID = obj.author.id;
    obj.categories = obj.categories.map(cat => cat.id);

    return obj;
  }

  static fromWordpress(data) {
    data.title = data.title.rendered;
    data.content = data.content.rendered;
    data.excerpt = data.excerpt.rendered;
    data.modifiedDate = data.modified;
    data.author = {id: data.author};
    data.categories = data.categories.map(cat => ({id: cat}));
    return new Article(data);
  }
}

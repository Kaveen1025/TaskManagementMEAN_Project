export class FileUpload {
  key!: string;
  name!: string;
  url!: string;
  file: File;

  constructor(file: File) {
    this.file = file;
  }

  setValues(name: string, url: string, file: File){
    this.file = file;
    this.name = name;
    this.url = url;
  }
}

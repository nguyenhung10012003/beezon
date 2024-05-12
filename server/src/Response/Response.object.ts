export default class ResponseObj {

  constructor(
    public status: number,
    public message: string,
    public data: any,
    public timestamp: Date = new Date(),
  ) {
  }
}
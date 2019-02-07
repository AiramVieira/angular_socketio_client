export class Accounting {
  externalId: string;
  user: string;
  token: string;

  constructor(build: any) {
    this.externalId = build.externalId;
    this.user = build.user;
    this.token = build.token;
  }

  static get Builder() {
    class Builder {
      externalId: string;
      user: string;
      token: string;

      constructor(externalId) {
        this.externalId = externalId;
      }
      withUser(user: string) {
        this.user = user; return this;
      }
      withToken(token: string) {
        this.token = token; return this;
      }
    }
    return Builder;
  }
}
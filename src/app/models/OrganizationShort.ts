export class OrganizationShort {
  id: number;

  name: string;

  constructor(build) {
    this.id = build.id;

    this.name = build.name;
  }

  static get Builder() {
    class Builder {
      id: number;
    
      name: string;
    
      constructor(id) {
        this.id = id;
      }

      public empty() {
        this.id = 0;
        this.name = '';
        return this;
      }

      withName(name: string) {
        this.name = name;
        return this;
      }

      build() {
        return new OrganizationShort(this);
      }

    }
    return Builder;
  }
}

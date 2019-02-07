import { OrganizationShort } from "./OrganizationShort";

export class Organization {
  id: number;

  name: string;

  organization: OrganizationShort;

  constructor(build) {
    this.id = build.id;

    this.name = build.name;

    if (typeof build.organization != "undefined" && build.organization != null) {
      this.organization = new OrganizationShort(build.organization);
    } else {
      this.organization = null;
    }
  }

  static get Builder() {
    class Builder {
      id: number;

      name: string;

      organization: OrganizationShort;

      constructor(id) {
        this.id = id;
      }

      public empty() {
        this.id = 0;
        this.name = '';
        this.organization = new OrganizationShort.Builder(null).empty().build();
        return this;
      }

      withName(name: string) {
        this.name = name;
        return this;
      }

      withOrganization(organization: any) {
        if (typeof organization != "undefined" && organization != null) {
          this.organization = new OrganizationShort(organization);
        } else {
          this.organization = null;
        }
        return this;
      }

      build() {
        return new Organization(this);
      }

    }
    return Builder;
  }
}

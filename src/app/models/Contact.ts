export class Contact {

  id: number
  externalId: string;
  description: string;
  shortDescription: string;
  thumbnail: string;
  type: number;
  tagDescription: string;

  constructor(build) {
    this.id = build.id
    this.externalId = build.externalId;
    this.description = build.description;
    this.shortDescription = build.shortDescription;
    this.thumbnail = build.thumbnail;
    this.type = build.type;
    this.tagDescription = build.tagDescription;
  }

  static get Builder() {
    class Builder {
      id: number
      externalId: string;
      description: string;
      shortDescription: string;
      thumbnail: string;
      type: number;
      tagDescription: string;

      constructor(id) {
        this.id = id;
      }

      public empty() {
        this.id = null;
        this.externalId = '';
        this.description = ''; 
        this.shortDescription = '';
        this.thumbnail = '';
        this.tagDescription = '';
        return this;
      }

      withExternalId(externalId: string) {
        this.externalId = externalId; return this;
      }

      withDescription(description: string) {
        this.description = description; return this;
      }
      withShortDescription(shortDescription: string) {
        this.shortDescription = shortDescription; return this;
      }

      withThumbnail(thumbnail: string) {
        this.thumbnail = thumbnail; return this;
      }

      withType(type: number) {
        this.type = type; return this;
      }

      withTagDescription(tagDescription: string) {
        this.tagDescription = tagDescription; return this;
      }

      build() {
        return new Contact(this);
      }
    }
    return Builder;
  }
}

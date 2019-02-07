import { Contact } from "./Contact";

export class Chat {
   id: number;

   externalId: string;
   subject: string;

   contactFrom: Contact;
   contactTo: Contact;

   organizationFrom: any;
   organizationTo: any;

   closedDate: Date;
   createdAt: Date;

   confidential: boolean;
   readOnly: boolean;
   typeChat: number;

   constructor(build) {
      this.id = build.id;

      this.externalId = build.externalId;
      this.subject = build.subject;

      this.confidential = build.confidential;
      this.readOnly = build.readOnly;
      this.typeChat = build.typeChat;


      if (typeof build.contactFrom != "undefined" && build.contactFrom != null) {
         this.contactFrom = new Contact(build.contactFrom);
      } else {
         this.contactFrom = null;
      }
      if (typeof build.contactTo != "undefined" && build.contactTo != null) {
         this.contactTo = new Contact(build.contactTo);
      } else {
         this.contactTo = null;
      }

      if (build.closedDate != new Date(0) && build.closedDate != null) {
         this.closedDate = new Date(build.closedDate);
      } else {
         this.closedDate = null;
      }
      if (build.createdAt != new Date(0) && build.createdAt != null) {
         this.createdAt = new Date(build.createdAt);
      } else {
         this.createdAt = null;
      }

      if (typeof build.organizationFrom != "undefined" && build.organizationFrom != null) {
         this.organizationFrom = build.organizationFrom;
      } else {
         this.organizationFrom = null;
      }

      if (typeof build.organizationTo != "undefined" && build.organizationTo != null) {
         this.organizationTo = build.organizationTo;

      } else {
         this.organizationTo = null;
      }
   }

   static get Builder() {
      class Builder {
         id: number;

         externalId: string;
         subject: string;

         contactFrom: Contact;
         contactTo: Contact;

         organizationFrom: any;
         organizationTo: any;

         closedDate: Date;
         createdAt: Date;

         confidential: boolean;
         readOnly: boolean;
         typeChat: number;

         constructor(id) {
            this.id = id;
         }

         withConfidential(confidential: boolean) {
            this.confidential = confidential;
            return this;
         }

         withReadOnly(readOnly: boolean) {
            this.readOnly = readOnly;
            return this;
         }

         withtypeChat(typeChat: number) {
            this.typeChat = typeChat;
            return this;
         }

         withExternalId(externalId: string) {
            this.externalId = externalId;
            return this;
         }

         withSubject(subject: string) {
            this.subject = subject;
            return this;
         }

         withContactFrom(contactFrom: any) {
            if (typeof contactFrom != "undefined" && contactFrom != null) {
               this.contactFrom = new Contact(contactFrom);
            } else {
               this.contactFrom = null;
            }
            return this;
         }

         withContactTo(contactTo: any) {
            if (typeof contactTo != "undefined" && contactTo != null) {
               this.contactTo = new Contact(contactTo);
            } else {
               this.contactTo = null;
            }
            return this;
         }

         withClosedDate(closedDate: Date) {
            if (closedDate != new Date(0) && closedDate != null) {
               this.closedDate = new Date(closedDate);

            } else {
               this.closedDate = null;
            }
            return this;
         }

         withCreatedAt(createdAt: Date) {
            if (createdAt != new Date(0) && createdAt != null) {
               this.createdAt = new Date(createdAt);

            } else {
               this.createdAt = null;
            }
            return this;
         }

         withOrganizationFrom(organizationFrom: any) {
            if (typeof organizationFrom != "undefined" && organizationFrom != null) {
               this.organizationFrom = organizationFrom;
            } else {
               this.organizationFrom = null;
            }
            return this;
         }

         withOrganizationTo(organizationTo: any) {
            if (organizationTo != "undefined" && organizationTo != null) {
               this.organizationTo = organizationTo;
            } else {
               this.organizationTo = null;
            }
            return this;
         }

         build() {
            return new Chat(this);
         }

      }
      return Builder;
   }
}

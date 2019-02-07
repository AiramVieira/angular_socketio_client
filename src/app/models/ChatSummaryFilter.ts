import { Contact } from "./Contact";

export class ChatSummaryFilter {

  /**
   * Filtro de Assunto da Conversa
   */
  subject: string;

  contactFrom: Contact;

  contactTo: Contact;

  participant: Contact;

  // 
  periodStart: Date;

  periodEnd: Date;

  //
  messageStatus: number;

  messageStatusPeriod: number;

  //
  closedStatus: number;

  type: number;

  constructor(build) {
    this.subject = build.subject;

    if (build.contactFrom != "undefined" && build.contactFrom != null) {
      this.contactFrom = new Contact(build.contactFrom);
    } else {
      this.contactFrom = null;
    }

    if (build.contactTo != "undefined" && build.contactTo != null) {
      this.contactTo = new Contact(build.contactTo);
    } else {
      this.contactTo = null;
    }

    if (build.participant != "undefined" && build.participant != null) {
      this.participant = new Contact(build.participant);
    } else {
      this.participant = null;
    }

    if (build.periodStart != new Date(0) && build.periodStart != null) {
      this.periodStart = new Date(build.periodStart);
    } else {
      this.periodStart = null;
    }

    if (build.periodEnd != new Date(0) && build.periodEnd != null) {
      this.periodEnd = new Date(build.periodEnd);
    } else {
      this.periodEnd = null;
    }

    this.messageStatus = build.messageStatus;
    this.messageStatusPeriod = build.messageStatusPeriod;
    this.closedStatus = build.closedStatus;
    this.type = build.type;
  }

  static get Builder() {
    class Builder {
      /**
       * Filtro de Assunto da Conversa
       */
      subject: string;

      contactFrom: Contact;

      contactTo: Contact;

      participant: Contact;

      // 
      periodStart: Date;

      periodEnd: Date;

      //
      messageStatus: number;

      messageStatusPeriod: number;

      //
      closedStatus: number;

      type: number;

      constructor() { }

      public withSubject(subject: string) {
        this.subject = subject;
        return this;
      }

      public withContactFrom(contactFrom: any) {
        if (contactFrom != "undefined" && contactFrom != null) {
          this.contactFrom = new Contact(contactFrom);
        } else {
          this.contactFrom = null;
        }
        return this;
      }

      public withContactTo(contactTo: any) {
        if (contactTo != "undefined" && contactTo != null) {
          this.contactTo = new Contact(contactTo);
        } else {
          this.contactTo = null;
        }
        return this;
      }

      public withParticipant(participant: any) {
        if (participant != "undefined" && participant != null) {
          this.participant = new Contact(participant);
        } else {
          this.participant = null;
        }
        return this;
      }

      public withPeriodStart(periodStart: Date) {
        if (periodStart != new Date(0) && periodStart != null) {
          this.periodStart = new Date(periodStart);
        } else {
          this.periodStart = null;
        }
        return this;
      }

      public withPeriodEnd(periodEnd: Date) {
        if (periodEnd != new Date(0) && periodEnd != null) {
          this.periodEnd = new Date(periodEnd);
        } else {
          this.periodEnd = null;
        }
        return this;
      }

      public withMessageStatus(messageStatus: number) {
        this.messageStatus = messageStatus;
        return this;
      }

      public withMessageStatusPeriod(messageStatusPeriod: number) {
        this.messageStatusPeriod = messageStatusPeriod;
        return this;
      }

      public withClosedStatus(closedStatus: number) {
        this.closedStatus = closedStatus;
        return this;
      }

      public withType(type: number) {
        this.type = type;
        return this;
      }

      build() {
        return new ChatSummaryFilter(this);
      }
    }
    return Builder;
  }
}
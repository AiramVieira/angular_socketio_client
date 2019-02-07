import { Contact } from "./Contact";
import { Message } from "./Message";

export class ChatLido {

    contact: Contact;

    message: Message;

    received: boolean;
    seen: boolean;

    constructor(build) {

        if (typeof build.contact != "undefined") {
            this.contact = new Contact(build.contact);
        } else {
            this.contact = null;
        }

        if (typeof build.message != "undefined") {
            this.message = new Message(build.message);
        } else {
            this.message = null;
        }

        if (typeof build.received != "undefined") {
            this.received = build.received;
        } else {
            this.received = null;
        }

        if (typeof build.seen != "undefined") {
            this.seen = build.seen;
        } else {
            this.seen = null;
        }
    }

    static get Builder() {
        class Builder {

            contact: Contact;

            message: Message;

            received: boolean;
            seen: boolean;

            constructor() { }

            withContact(contact: Contact) {
                this.contact = contact;
                return this;
            }

            withMessage(message: Message) {
                this.message = message;
                return this;
            }

            withReceived(received: boolean) {
                this.received = received;
                return this;
            }

            withSeen(seen: boolean) {
                this.seen = seen;
                return this;
            }

            build() {
                return new ChatLido(this);
            }
        }
        return Builder;
    }
}

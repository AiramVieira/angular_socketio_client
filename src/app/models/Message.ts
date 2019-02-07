import { Contact } from "./Contact";
import { Chat } from "./Chat";

export class Message {

    serverId: number;
    deviceId: number;

    contact: Contact;

    chat: Chat;

    status: number;
    state: number;
    type: number;

    content: string;

    createdAt: Date;
    updatedAt: Date;

    constructor(build) {
        this.serverId = build.serverId;
        this.deviceId = build.deviceId;

        if (typeof build.contact != "undefined" && build.contact != null) {
            this.contact = new Contact(build.contact);
        } else {
            this.contact = null;
        }

        if (typeof build.chat != "undefined" && build.chat != null) {
            this.chat = new Chat(build.chat);
        } else {
            this.chat = null;
        }

        this.status = build.status;
        this.state = build.state;
        this.type = build.type;

        this.content = build.content;

        if (build.createdAt != new Date(0) && build.createdAt != null) {
            this.createdAt = new Date(build.createdAt);
        } else {
            this.createdAt = null;
        }

        if (build.updatedAt != new Date(0) && build.updatedAt != null) {
            this.updatedAt = new Date(build.updatedAt);
        } else {
            this.updatedAt = null;
        }
    }
    static get Builder() {
        class Builder {

            serverId: number;
            deviceId: number;

            contact: Contact;

            chat: Chat;

            status: number;
            state: number;
            type: number;

            content: string;

            createdAt: Date;
            updatedAt: Date;

            constructor() { }

            withServerId(serverId: number) {
                this.serverId = serverId;
                return this;
            }
            withDeviceId(deviceId: number) {
                this.deviceId = deviceId;
                return this;
            }

            withContact(contact: any) {
                if (typeof contact != "undefined" && contact != null) {
                    this.contact = new Contact(contact);
                } else {
                    this.contact = null;
                }
                return this;
            }

            withChat(chat: any) {
                if (typeof chat != "undefined" && chat != null) {
                    this.chat = new Chat(chat);
                } else {
                    this.chat = null;
                }
                return this;
            }

            withStatus(status: number) {
                this.status = status;
                return this;
            }

            withState(state: number) {
                this.state = state;
                return this;
            }

            withType(type: number) {
                this.type = type;
                return this;
            }

            withContent(content: string) {
                this.content = content;
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

            withUpdatedAt(updatedAt: Date) {
                if (updatedAt != new Date(0) && updatedAt != null) {
                    this.updatedAt = new Date(updatedAt);
                } else {
                    this.updatedAt = null;
                }
                return this;
            }

            build() {
                return new Message(this);
            }
        }
        return Builder;
    }
}

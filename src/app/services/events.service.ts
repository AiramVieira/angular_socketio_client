// import { Subject } from 'rxjs/Subject';
// import { BehaviorSubject } from 'rxjs/BehaviorSubject';
// import { Subscription } from 'rxjs/Subscription';
import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, Subscription } from 'rxjs';

@Injectable()
export class Events {
  /**
   * Hash map of subjects
   * @type {Subject}
   */
  private subjects: { [key: string]: Subject<any> } = {};

  private immediate = true;

  /**
   * Emits events through a subject to all subscribed broadcaster
   * @param name {string} Name of an event
   * @param data {any} Event data
   */
  next(name: string, data?: any) {
    if (typeof this.subjects[name] === 'undefined') {
      this.subjects[name] = (this.immediate ? new Subject() : new BehaviorSubject(null));
    }
    this.subjects[name].next(data);
  }

  /**
   * Subscribes a Observer (listener) to an event.
   * @param name {string} Name of an event
   * @param handler {any} Callback of the listener (subscriber)
   * @returns {Subscription}
   */
  subscribe(name: string, handler: any): Subscription {
    if (typeof this.subjects[name] === 'undefined') {
      this.subjects[name] = (this.immediate ? new Subject() : new BehaviorSubject(null));
    }
    return this.subjects[name].subscribe(handler);
  }


  /**
   * Cleans up a Subject and remove all its observers.
   * Also it removes the subject from subject map.
   */
  dispose(name: string) {
    if (this.subjects[name]) {
      this.subjects[name].unsubscribe();
      delete this.subjects[name];
    }
  }

  /**
   * Clean up all Observers and clean up map of Subjects
   */
  disposeAll() {
    const subjects = this.subjects;
    const hasOwnProp: Function = {}.hasOwnProperty;
    for (const prop in subjects) {
      if (hasOwnProp.call(subjects, prop)) {
        subjects[prop].unsubscribe();
      }
    }

    this.subjects = {};
  }
}
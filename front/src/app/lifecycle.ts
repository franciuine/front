import {Injectable, OnDestroy} from "@angular/core";

@Injectable()
export abstract class Lifecycle implements OnDestroy {

    private _subscriptions: any[];

    constructor() {
        this._subscriptions = [];
    }

    get subscriptions(): any[] {
        return this._subscriptions;
    }

    protected addSubscriptions(subscriptions: any[]) {
        subscriptions.forEach(sub => this.subscriptions.push(sub));
    }

    ngOnDestroy() {
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }
}


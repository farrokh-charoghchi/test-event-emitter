import { EventEmitter } from "events";

class SimpleEvent{
    private defaltEventName = "DefaultEvent";
    event:EventEmitter = new EventEmitter();
    subscribe(listener: (...args: any[]) => void){
        this.event.on(this.defaltEventName,listener);
    }
    emitt(...args:any[]){
        this.event.emit(this.defaltEventName,args);
    }
}

export{
    SimpleEvent
}
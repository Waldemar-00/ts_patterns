"use strict";
class Task {
    constructor(munTsk) {
        this.munTsk = munTsk;
    }
}
class TskList {
    constructor() {
        this.tasks = [];
    }
    sortTskList() {
        this.tasks = this.tasks.sort((a, b) => a.munTsk - b.munTsk);
    }
    addTask(tsk) {
        this.tasks.push(tsk);
        this.sortTskList();
    }
    getTasks() { return this.tasks; }
    lengthOfTskList() { return this.tasks.length; }
    getIterator() { return new TskIterator(this); }
}
class TskIterator {
    constructor(tskList) {
        this.position = 0;
        tskList.sortTskList();
        this.tskList = tskList;
    }
    current() {
        return this.tskList.getTasks()[this.position];
    }
    prev() {
        this.position -= 1;
        return this.tskList.getTasks()[this.position];
    }
    next() {
        this.position += 1;
        return this.tskList.getTasks()[this.position];
    }
    index() {
        return this.position;
    }
}
const taskList = new TskList();
taskList.addTask(new Task(100));
taskList.addTask(new Task(50));
taskList.addTask(new Task(700));
taskList.addTask(new Task(70));
taskList.addTask(new Task(10));
taskList.addTask(new Task(200));
const iterator = taskList.getIterator();
console.log(iterator);
iterator.current();
console.log(iterator.current());
iterator.tskList.addTask(new Task(1));
console.log(iterator.current());
console.log(iterator.next());

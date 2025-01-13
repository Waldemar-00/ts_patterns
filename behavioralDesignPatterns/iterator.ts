class Task
{
    constructor( public munTsk: number ) {}
}

class TskList
{
    private tasks: Task[] = []

    sortTskList ()
    {
        this.tasks = this.tasks.sort((a, b) => a.munTsk - b.munTsk)
    }
    addTask ( tsk: Task )
    {
        this.tasks.push( tsk )
        this.sortTskList()
    }
    getTasks (): Task[] { return this.tasks }
    lengthOfTskList (): number { return this.tasks.length }
    getIterator() { return new TskIterator( this ) }
}

interface IIterator<T>
{
    current (): T | undefined
    prev (): T | undefined
    next (): T | undefined
    index (): number
}

class TskIterator implements IIterator<Task>
{
    private position: number = 0
    tskList: TskList

    constructor ( tskList: TskList )
    {
        tskList.sortTskList()
        this.tskList = tskList
    }
    current (): Task | undefined
    {
       return this.tskList.getTasks()[this.position]
    }
    prev (): Task | undefined
    {
        this.position -= 1
       return this.tskList.getTasks()[this.position]
    }
    next (): Task | undefined
    {
        this.position += 1
        return this.tskList.getTasks()[this.position]
    }
    index (): number
    {
        return this.position
    }

}

const taskList = new TskList()
taskList.addTask( new Task( 100 ) )
taskList.addTask( new Task( 50 ) )
taskList.addTask( new Task( 700 ) )
taskList.addTask( new Task( 70 ) )
taskList.addTask( new Task( 10 ) )
taskList.addTask( new Task( 200 ) )
const iterator = taskList.getIterator()
console.log( iterator )
iterator.current()
console.log( iterator.current() )

iterator.tskList.addTask( new Task( 1 ) )
console.log( iterator.current() )
console.log( iterator.next() )
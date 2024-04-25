export class CircularQueue<T> {
    private capacity: number;
    private queue: T[];
    private front: number;
    private rear: number;
    private size: number;
  
    constructor(capacity: number) {
      this.capacity = capacity;
      this.queue = new Array(capacity);
      this.front = 0;
      this.rear = 0;
      this.size = 0;
    }
  
    enqueue(element: T): T | undefined{
      if (this.isFull()) {
        console.error("La cola está llena");
        return undefined;
      }
      this.queue[this.rear] = element;
      this.rear = (this.rear + 1) % this.capacity;
      this.size++;
      return element;
    }
  
    dequeue(): T | undefined {
        if (this.isEmpty()) {
            throw new Error("La cola está vacía");
          }
      const element = this.queue[this.front];
      this.front = (this.front + 1) % this.capacity;
      this.size--;
      return element;
    }
  
    peek(): T | undefined {
      if (this.isEmpty()) {
        throw new Error("La cola está vacía");
      }
      return this.queue[this.front];
    }
  
    isEmpty(): boolean {
      return this.size === 0;
    }
  
    isFull(): boolean {
      return this.size === this.capacity;
    }
  
    getSize(): number {
      return this.size;
    }
  
    print(): void {
      if (this.isEmpty()) {
        console.log("La cola está vacía");
        return;
      }
      let result = "";
      let i = this.front;
      while (i !== this.rear) {
        result += this.queue[i] + " ";
        i = (i + 1) % this.capacity;
      }
      console.log(result);
    }
  }
  
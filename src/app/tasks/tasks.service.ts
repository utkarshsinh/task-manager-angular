import { Injectable, inject, signal } from "@angular/core";
import { Task, TaskStatus } from "./task.model";
import { LoggingService } from "../logging.service";

@Injectable({
    providedIn: 'root'
})
export class TaskService{
    private tasks = signal<Task[]>([]);
    private loggingsevice = inject(LoggingService);
    allTasks = this.tasks.asReadonly();
    
    addTask(taskData: {title: string; description: string}){
        const newTask: Task = {
            ...taskData,
            id: Math.random().toString(),
            status: 'OPEN'
        };
        this.tasks.update((oldTasks) => [...oldTasks, newTask])
        this.loggingsevice.log('Added task with title' + taskData.title);
    }
    updateTaskStaus(taskId: string, newStatus: TaskStatus){
        this.tasks.update((oldTasks) =>
        oldTasks.map((task) =>
            task.id === taskId ? {...task, status: newStatus} : task
        )
    );
    this.loggingsevice.log('Changed task status to new status ' + newStatus);
    }
    
}
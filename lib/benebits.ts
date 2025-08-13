import { useEffect, useState } from 'react';

export interface Task {
  id: string;
  title: string;
  icon: string;
  completed: boolean;
  rewarded: boolean; // Tracks if the reward has been given
  reward: number;
  repetitions: number;
  currentCount: number;
}

const STORAGE_KEYS = {
  TASKS: 'bene:tasks',
  BENE_BITS: 'bene:bits',
  BENE_BITS_LEGACY: 'beneBits'
} as const;

// Initialize default tasks
const DEFAULT_TASKS: Task[] = [
  {
    id: 'walk',
    title: 'Fazer caminhada',
    icon: 'footprints',
    completed: false,
    rewarded: false,
    reward: 10,
    repetitions: 1,
    currentCount: 0,
  },
  {
    id: 'fruit',
    title: 'Comer fruta',
    icon: 'apple',
    completed: false,
    rewarded: false,
    reward: 10,
    repetitions: 1,
    currentCount: 0,
  },
  {
    id: 'sleep',
    title: 'Dormir cedo',
    icon: 'moon',
    completed: false,
    rewarded: false,
    reward: 10,
    repetitions: 1,
    currentCount: 0,
  },
  {
    id: 'water',
    title: 'Beber água',
    icon: 'droplets',
    completed: false,
    rewarded: false,
    reward: 10,
    repetitions: 8,
    currentCount: 0,
  },
];

// Singleton store to manage state
class BenebitsStore {
  private static instance: BenebitsStore;
  private listeners: Array<() => void> = [];
  private tasks: Task[] = [];
  private beneBits: number = 0;
  private isInitialized: boolean = false;

  private constructor() {
    this.initialize();
  }

  public static getInstance(): BenebitsStore {
    if (!BenebitsStore.instance) {
      BenebitsStore.instance = new BenebitsStore();
    }
    return BenebitsStore.instance;
  }

  private initialize() {
    if (this.isInitialized) return;
    
    try {
      // Load tasks
      const savedTasks = localStorage.getItem(STORAGE_KEYS.TASKS);
      this.tasks = savedTasks ? JSON.parse(savedTasks) : [...DEFAULT_TASKS];
      
      // Ensure all tasks have the rewarded field for backward compatibility
      this.tasks = this.tasks.map(task => ({
        ...task,
        rewarded: task.rewarded || false
      }));
      
      // Load Benebits
      const savedBits = localStorage.getItem(STORAGE_KEYS.BENE_BITS) || 
                       localStorage.getItem(STORAGE_KEYS.BENE_BITS_LEGACY) || '0';
      this.beneBits = parseInt(savedBits, 10) || 0;
      
      // Ensure both keys are set
      localStorage.setItem(STORAGE_KEYS.BENE_BITS, this.beneBits.toString());
      localStorage.setItem(STORAGE_KEYS.BENE_BITS_LEGACY, this.beneBits.toString());
      
      this.isInitialized = true;
      this.notify();
    } catch (error) {
      console.error('Failed to initialize Benebits store:', error);
      this.tasks = [...DEFAULT_TASKS];
      this.beneBits = 0;
    }
  }

  private notify() {
    this.listeners.forEach(listener => listener());
  }

  public subscribe(listener: () => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  public getState() {
    return {
      tasks: [...this.tasks],
      beneBits: this.beneBits
    };
  }

  public updateTask(id: string, updates: Partial<Task>) {
    const taskIndex = this.tasks.findIndex(t => t.id === id);
    if (taskIndex === -1) return;

    const oldTask = this.tasks[taskIndex];
    const newTask = { ...oldTask, ...updates };
    
    // Check if task is being marked as completed and hasn't been rewarded yet
    if (updates.completed === true && !oldTask.completed && !oldTask.rewarded) {
      this.addBenebits(newTask.reward);
      // Mark as rewarded when completing the task for the first time
      newTask.rewarded = true;
    }

    this.tasks[taskIndex] = newTask;
    this.saveTasks();
    // Notify listeners
    this.notify();
  }

  public addTask(task: Task) {
    this.tasks = [...this.tasks, task];
    this.saveTasks();
    this.notify();
  }

  public deleteTask(id: string) {
    this.tasks = this.tasks.filter(task => task.id !== id);
    this.saveTasks();
    this.notify();
  }

  private saveTasks() {
    localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(this.tasks));
  }

  private saveBenebits() {
    localStorage.setItem(STORAGE_KEYS.BENE_BITS, this.beneBits.toString());
    localStorage.setItem(STORAGE_KEYS.BENE_BITS_LEGACY, this.beneBits.toString());
    this.notify();
  }

  public addBenebits(amount: number) {
    this.beneBits = Math.max(0, this.beneBits + amount); // Prevent negative Benebits
    this.saveBenebits();
  }

  public reset() {
    this.tasks = [...DEFAULT_TASKS];
    this.beneBits = 0;
    localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(this.tasks));
    localStorage.setItem(STORAGE_KEYS.BENE_BITS, '0');
    localStorage.setItem(STORAGE_KEYS.BENE_BITS_LEGACY, '0');
    this.notify();
  }
}

// Create the singleton instance
const benebitsStore = BenebitsStore.getInstance();

// React hook to use the store
export function useBenebits() {
  const [state, setState] = useState(benebitsStore.getState());

  useEffect(() => {
    // Subscribe to store changes
    const unsubscribe = benebitsStore.subscribe(() => {
      setState(benebitsStore.getState());
    });

    // Initial sync
    setState(benebitsStore.getState());

    // Handle storage events from other tabs
    const handleStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEYS.BENE_BITS || e.key === STORAGE_KEYS.BENE_BITS_LEGACY) {
        const newValue = parseInt(e.newValue || '0', 10);
        if (!isNaN(newValue) && newValue !== state.beneBits) {
          benebitsStore.addBenebits(0); // This will trigger a re-render
        }
      } else if (e.key === STORAGE_KEYS.TASKS) {
        // Force update if tasks change
        setState(benebitsStore.getState());
      }
    };

    window.addEventListener('storage', handleStorage);
    
    return () => {
      unsubscribe();
      window.removeEventListener('storage', handleStorage);
    };
  }, [state.beneBits]);

  return {
    ...state,
    updateTask: benebitsStore.updateTask.bind(benebitsStore),
    addTask: benebitsStore.addTask.bind(benebitsStore),
    deleteTask: benebitsStore.deleteTask.bind(benebitsStore),
    addBenebits: benebitsStore.addBenebits.bind(benebitsStore),
    reset: benebitsStore.reset.bind(benebitsStore)
  };
}

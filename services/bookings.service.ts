/**
 * Bookings Service
 * Handles all booking-related API calls to Supabase
 */

import { supabase } from '@/lib/supabase';
import { Database } from '@/types/database';

type Task = Database['public']['Tables']['tasks']['Row'];

export interface CreateTaskData {
  title: string;
  description?: string;
  postalCode: string;
  location?: string;
  scheduledFor?: string;
}

export const BookingsService = {
  /**
   * Get all tasks for a client
   */
  getClientTasks: async (clientId: string) => {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('client_id', clientId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data as Task[];
  },

  /**
   * Get all tasks for a service provider
   */
  getProviderTasks: async (providerId: string) => {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('tasker_id', providerId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data as Task[];
  },

  /**
   * Get a single task by ID
   */
  getTaskById: async (taskId: string) => {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('id', taskId)
      .single();

    if (error) throw error;
    return data as Task;
  },

  /**
   * Create a new task
   */
  createTask: async (clientId: string, taskData: CreateTaskData) => {
    const { title, description, postalCode, location, scheduledFor } = taskData;
    
    const newTask = {
      title,
      description,
      status: 'pending' as const,
      postal_code: postalCode,
      location,
      client_id: clientId,
      scheduled_for: scheduledFor,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from('tasks')
      .insert(newTask)
      .select()
      .single();

    if (error) throw error;
    return data as Task;
  },

  /**
   * Update a task's status
   */
  updateTaskStatus: async (taskId: string, status: Task['status']) => {
    const updates = {
      status,
      updated_at: new Date().toISOString(),
      ...(status === 'completed' ? { completed_at: new Date().toISOString() } : {}),
    };

    const { error } = await supabase
      .from('tasks')
      .update(updates)
      .eq('id', taskId);

    if (error) throw error;
  },

  /**
   * Assign a task to a service provider
   */
  assignTask: async (taskId: string, providerId: string) => {
    const updates = {
      tasker_id: providerId,
      status: 'assigned' as const,
      updated_at: new Date().toISOString(),
    };

    const { error } = await supabase
      .from('tasks')
      .update(updates)
      .eq('id', taskId);

    if (error) throw error;
  },

  /**
   * Cancel a task
   */
  cancelTask: async (taskId: string) => {
    const updates = {
      status: 'cancelled' as const,
      updated_at: new Date().toISOString(),
    };

    const { error } = await supabase
      .from('tasks')
      .update(updates)
      .eq('id', taskId);

    if (error) throw error;
  },
};
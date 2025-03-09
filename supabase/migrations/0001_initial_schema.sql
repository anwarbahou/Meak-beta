-- Create profiles table that extends the auth.users table
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  first_name text,
  last_name text,
  phone text,
  postal_code text,
  avatar_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create tasks table
create table public.tasks (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  description text,
  status text not null default 'pending',
  price decimal(10,2),
  location text,
  postal_code text not null,
  client_id uuid references auth.users not null,
  tasker_id uuid references auth.users,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  scheduled_for timestamp with time zone,
  completed_at timestamp with time zone,
  constraint status_values check (status in ('pending', 'assigned', 'in_progress', 'completed', 'cancelled'))
);

-- Create task categories table
create table public.categories (
  id uuid default gen_random_uuid() primary key,
  name text not null unique,
  description text,
  icon text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create junction table for tasks and categories
create table public.task_categories (
  task_id uuid references public.tasks on delete cascade,
  category_id uuid references public.categories on delete cascade,
  primary key (task_id, category_id)
);

-- Create reviews table
create table public.reviews (
  id uuid default gen_random_uuid() primary key,
  task_id uuid references public.tasks on delete cascade not null,
  reviewer_id uuid references auth.users not null,
  reviewee_id uuid references auth.users not null,
  rating integer not null check (rating >= 1 and rating <= 5),
  comment text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  constraint unique_review unique (task_id, reviewer_id, reviewee_id)
);

-- Create RLS (Row Level Security) policies
alter table public.profiles enable row level security;
alter table public.tasks enable row level security;
alter table public.categories enable row level security;
alter table public.task_categories enable row level security;
alter table public.reviews enable row level security;

-- Profiles policies
create policy "Public profiles are viewable by everyone"
  on public.profiles for select
  using (true);

create policy "Users can insert their own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

create policy "Users can update their own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Tasks policies
create policy "Tasks are viewable by everyone"
  on public.tasks for select
  using (true);

create policy "Authenticated users can create tasks"
  on public.tasks for insert
  with check (auth.role() = 'authenticated');

create policy "Users can update their own tasks"
  on public.tasks for update
  using (auth.uid() = client_id or auth.uid() = tasker_id);

-- Categories policies
create policy "Categories are viewable by everyone"
  on public.categories for select
  using (true);

-- Task categories policies
create policy "Task categories are viewable by everyone"
  on public.task_categories for select
  using (true);

create policy "Task owners can manage task categories"
  on public.task_categories for all
  using (
    exists (
      select 1 from public.tasks
      where id = task_categories.task_id
      and (client_id = auth.uid() or tasker_id = auth.uid())
    )
  );

-- Reviews policies
create policy "Reviews are viewable by everyone"
  on public.reviews for select
  using (true);

create policy "Authenticated users can create reviews"
  on public.reviews for insert
  with check (auth.role() = 'authenticated');

create policy "Users cannot update reviews"
  on public.reviews for update
  using (false);

-- Create functions and triggers
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql;

-- Add updated_at triggers
create trigger handle_updated_at
  before update on public.profiles
  for each row
  execute function public.handle_updated_at();

create trigger handle_updated_at
  before update on public.tasks
  for each row
  execute function public.handle_updated_at();

-- Initial categories
insert into public.categories (name, description, icon) values
  ('Cleaning', 'House cleaning, deep cleaning, and organizing services', 'cleaning'),
  ('Handyman', 'General repairs, maintenance, and installations', 'tools'),
  ('Moving', 'Help with moving, packing, and furniture assembly', 'truck'),
  ('Gardening', 'Lawn care, gardening, and landscaping services', 'plant'),
  ('Pet Care', 'Pet sitting, dog walking, and pet services', 'paw');

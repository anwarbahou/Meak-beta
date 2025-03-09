# مساعد - Moroccan Home Services App

A mobile application connecting Moroccan homeowners with local service providers. Built with React Native, Expo, and Supabase.

## Features

- 🌙 Dark Mode with RTL Support
- 🔍 Real-time Search
- 📱 Modern UI/UX
- 🗣️ Full Arabic Interface
- ⭐ Provider Ratings & Reviews
- 📅 Booking Management
- 💬 Chat System

## Tech Stack

- **Frontend**: React Native, Expo Router
- **Backend**: Supabase
- **Authentication**: Supabase Auth
- **Database**: PostgreSQL with RLS
- **Storage**: Supabase Storage
- **Icons**: Lucide React Native

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/moroccan-services-app.git
cd moroccan-services-app
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file with your Supabase credentials:
```env
EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

4. Start the development server:
```bash
npx expo start
```

## Database Schema

- **profiles**: Extended user profiles with contact information
- **tasks**: Service requests and bookings
- **categories**: Service categories
- **reviews**: Provider ratings and reviews
- **messages**: Chat system messages

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Modal } from 'react-native';
import { Link, router } from 'expo-router';
import { X } from 'lucide-react-native';
import { useAuth } from '@/store/auth';
import { supabase } from '@/lib/supabase';

export default function SignUp() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const signUp = useAuth((state) => state.signUp);

  const validateForm = () => {
    if (!firstName.trim()) return 'First name is required';
    if (!lastName.trim()) return 'Last name is required';
    if (!email.trim()) return 'Email is required';
    if (!password.trim()) return 'Password is required';
    if (password.length < 6) return 'Password must be at least 6 characters';
    if (!phone.trim()) return 'Phone number is required';
    
    // Validate Moroccan phone number
    const phoneRegex = /^\+212[5-7][0-9]{8}$/;
    if (!phoneRegex.test(phone)) {
      return 'Please enter a valid Moroccan phone number starting with +212';
    }
    
    if (!postalCode.trim()) return 'Postal code is required';
    return null;
  };

  const handleSignUp = async () => {
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setError(null);
      setLoading(true);

      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
            phone,
            postal_code: postalCode,
          },
        },
      });

      if (signUpError) {
        if (signUpError.message.includes('already registered')) {
          setError('An account with this email already exists');
        } else if (signUpError.message.includes('rate limit')) {
          setError('Please wait a few minutes before trying again');
        } else {
          throw signUpError;
        }
        return;
      }

      if (data?.user) {
        setShowVerificationModal(true);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <X size={24} color="#000" />
        </Pressable>
        <Text style={styles.headerTitle}>Sign Up</Text>
        <Text style={styles.headerRight}>US</Text>
      </View>

      {/* Logo */}
      <Text style={styles.logoText}>Meak</Text>

      {/* Form */}
      <View style={styles.form}>
        {error && <Text style={styles.errorText}>{error}</Text>}

        <View style={styles.nameRow}>
          <TextInput
            style={[styles.input, styles.halfInput]}
            placeholder="First Name"
            value={firstName}
            onChangeText={setFirstName}
            autoCapitalize="words"
          />
          <TextInput
            style={[styles.input, styles.halfInput]}
            placeholder="Last Name"
            value={lastName}
            onChangeText={setLastName}
            autoCapitalize="words"
          />
        </View>

        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <View style={styles.phoneInput}>
          <View style={styles.countryCode}>
            <Text style={styles.countryCodeText}>+212</Text>
          </View>
          <TextInput
            style={[styles.input, styles.phoneNumber]}
            placeholder="Phone number"
            value={phone.startsWith('+212') ? phone.slice(4) : phone}
            onChangeText={(text) => {
              // Remove any non-digit characters
              const cleaned = text.replace(/\D/g, '');
              // Always prepend +212
              setPhone(cleaned ? `+212${cleaned}` : '');
            }}
            keyboardType="phone-pad"
            maxLength={9} // +212 + 9 digits
          />
        </View>

        <TextInput
          style={styles.input}
          placeholder="Postal Code"
          value={postalCode}
          onChangeText={setPostalCode}
          keyboardType="number-pad"
        />

        <Text style={styles.helperText}>
          Your phone and zip code help us match and connect you with the right Taskers.
        </Text>

        <Pressable
          style={[styles.signUpButton, loading && styles.signUpButtonDisabled]}
          onPress={handleSignUp}
          disabled={loading}
        >
          <Text style={styles.signUpButtonText}>
            {loading ? 'Creating Account...' : 'Sign up'}
          </Text>
        </Pressable>

        <Text style={styles.terms}>
          By signing up, you agree to our{' '}
          <Text style={styles.termsLink}>Terms of Service</Text>, and{' '}
          <Text style={styles.termsLink}>Privacy Policy</Text>.
        </Text>

        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Already have an account? </Text>
          <Link href="/(auth)/login" asChild>
            <Text style={styles.loginLink}>Log in</Text>
          </Link>
        </View>
      </View>

      {/* Verification Modal */}
      <Modal
        visible={showVerificationModal}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Check your email</Text>
            <Text style={styles.modalText}>
              We've sent a verification link to {email}. Click the link to verify your account.
            </Text>
            <Pressable
              style={styles.modalButton}
              onPress={() => {
                setShowVerificationModal(false);
                router.replace('/(auth)/login');
              }}
            >
              <Text style={styles.modalButtonText}>Got it</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  logoText: {
    fontSize: 42,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 30,
    color: '#000',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    padding: 8,
    marginLeft: -8,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  headerRight: {
    fontSize: 16,
    color: '#666',
  },
  form: {
    paddingHorizontal: 16,
  },
  errorText: {
    color: '#E11900',
    marginBottom: 16,
  },
  nameRow: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 16,
  },
  input: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginBottom: 16,
  },
  halfInput: {
    flex: 1,
  },
  phoneInput: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  countryCode: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  countryCodeText: {
    fontSize: 16,
  },
  phoneNumber: {
    flex: 1,
    marginBottom: 0,
  },
  helperText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 24,
  },
  signUpButton: {
    backgroundColor: '#E6E6E3',
    paddingVertical: 16,
    borderRadius: 100,
    alignItems: 'center',
    marginBottom: 16,
  },
  signUpButtonDisabled: {
    opacity: 0.7,
  },
  signUpButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  terms: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
  },
  termsLink: {
    color: '#008000',
    textDecorationLine: 'underline',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginText: {
    fontSize: 16,
    color: '#000',
  },
  loginLink: {
    fontSize: 16,
    color: '#008000',
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    width: '100%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
    textAlign: 'center',
  },
  modalText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
  },
  modalButton: {
    backgroundColor: '#E6E6E3',
    paddingVertical: 16,
    borderRadius: 100,
    alignItems: 'center',
  },
  modalButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
}); 
'use client';

import OnboardingForm from '@/components/frontend/OnboardingForm';
import React, { useEffect, useState } from 'react';
import { getData } from '@/lib/getData';

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
  phone?: number; // Optional fields
  location?: string;
  city?: string;
};

type FarmerUser = {
  id: string;
  name: string;
  email: string;
  phone: number; // phone must be strictly a number
  location: string;
  city: string;
  profileImageUrl: string;
};

const Onboarding: React.FC<{ params: { id: string } }> = ({ params }) => {
  const { id } = params;
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (!id) {
        setLoading(false);
        return;
      }

      try {
        const userData = await getData<User>(`users/${id}`);
        setUser(userData || null);
      } catch (err) {
        console.error('Error fetching user:', err);
        setError('Failed to load user.');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  const prefilledData: FarmerUser | undefined = user
    ? {
        id: user.id.toString(), // Include the user ID
        name: user.name,
        email: user.email,
        phone: user.phone ? Number(user.phone) : 0, // Ensure phone is a number
        location: user.location || '',
        city: user.city || '',
        profileImageUrl: '', // Handle profile image URL logic
      }
    : undefined;

  return (
    <div className="flex flex-col gap-4 p-5">
      <div className="max-w-4xl mx-auto">
        <h2>Welcome, {user?.name}!</h2>
        <p>Tell us more about yourself</p>
      </div>
      <OnboardingForm user={prefilledData} />
    </div>
  );
};

export default Onboarding;
import toast from 'react-hot-toast';

// Define the function types
type SetLoadingType = (loading: boolean) => void;
type ResetType = () => void;
type RedirectType = () => void;

interface AddCategoryFormData {
  title: string;
  slug?: string; // Optional field
  imageUrl: string;
}

interface AddDiscountFormData {
  title: string;
  code: string; // Discount code
  expiryDate: string; // Expiry date for the discount
}

interface AddProductFormData {
  title: string;
  stock: number;
  price: number;
  discount: number;
  categoryId: string; // Use string array to represent category
  description: string;
  slug?: string; // Optional field
  imageUrl: string[];
  location: string;
  city: string;
  priceRange: string; // Add priceRange field
}
interface AddFarmerFormData {
  name: string;
  email: string;
  phone: number;
  profileImageUrl: string;
  location: string;
  city: string;
}

interface AddStaffFormData {
  email: string;
  name: string;
  password: string;
  phoneNumber: string;
  dateJoining: string;
  imageUrl: string;
  role: string;
}

// Combine data types for POST and PUT requests
type RequestData =
  | AddCategoryFormData
  | AddDiscountFormData
  | AddProductFormData
  | AddFarmerFormData
  | AddStaffFormData;

export async function makePostRequest(
  setLoading: SetLoadingType,
  endpoint: string,
  data: RequestData,
  resourceName: string,
  reset?: ResetType
): Promise<void> {
  try {
    setLoading(true);
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const response = await fetch(`${baseUrl}/${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      toast.success(`New ${resourceName} Created Successfully`);
      if (reset) reset(); // Only call reset if it's provided
    } else {
      const errorMessage = await response.json();
      toast.error(errorMessage.message || 'Something went wrong');
    }
  } catch (error) {
    console.error(error);
    toast.error('An error occurred. Please try again later.');
  } finally {
    setLoading(false); // Ensure loading is set back to false after the request completes
  }
}

export async function makePutRequest(
  setLoading: SetLoadingType,
  endpoint: string,
  data: RequestData,
  resourceName: string,
  redirect: RedirectType,
  reset?: ResetType // Mark reset as optional
): Promise<void> {
  try {
    setLoading(true);
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const response = await fetch(`${baseUrl}/${endpoint}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      toast.success(`${resourceName} Updated Successfully`);
      redirect();
      if (reset) reset(); // Only call reset if it's provided
    } else {
      const errorMessage = await response.json();
      toast.error(errorMessage.message || 'Something went wrong');
    }
  } catch (error) {
    console.error(error);
    toast.error('An error occurred. Please try again later.');
  } finally {
    setLoading(false); // Ensure loading is set back to false after the request completes
  }
}

// Define the function types

export async function makeGetRequest<T>(
  setLoading: SetLoadingType,
  endpoint: string
): Promise<T | null> {
  try {
    setLoading(true);
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const response = await fetch(`${baseUrl}/${endpoint}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const data = await response.json();
      return data as T;
    } else {
      const errorMessage = await response.json();
      toast.error(errorMessage.message || 'Failed to fetch data');
      return null;
    }
  } catch (error) {
    console.error(error);
    toast.error('An error occurred while fetching data.');
    return null;
  } finally {
    setLoading(false); // Ensure loading is set back to false after the request completes
  }
}

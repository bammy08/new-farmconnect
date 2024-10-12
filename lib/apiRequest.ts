import toast from 'react-hot-toast';

// Define the function types
type SetLoadingType = (loading: boolean) => void;
type ResetType = () => void;
type RedirectType = () => void;

interface AddCategoryFormData {
  title: string;
  description: string;
  slug?: string; // Optional field
  imageUrl: string;
}
interface AddDiscountFormData {
  title: string;
  code: string; // Discount code
  expiryDate: string; // Expiry date for the discount
}

export async function makePostRequest(
  setLoading: SetLoadingType,
  endpoint: string,
  data: AddCategoryFormData | AddDiscountFormData,
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
      setLoading(false);
      toast.success(`New ${resourceName} Created Successfully`);
      if (reset) reset(); // Only call reset if it's provided
    } else {
      setLoading(false);
      if (response.status === 409) {
        toast.error('Something went wrong');
      } else {
        toast.error('Something went wrong');
      }
    }
  } catch (error) {
    setLoading(false);
    console.log(error);
  }
}

export async function makePutRequest(
  setLoading: SetLoadingType,
  endpoint: string,
  data: AddCategoryFormData | AddDiscountFormData,
  resourceName: string,
  redirect: RedirectType,
  reset?: ResetType // Mark reset as optional
): Promise<void> {
  try {
    setLoading(true);
    fetch('http://localhost:3000/api/categries');
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const response = await fetch(`${baseUrl}/${endpoint}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      console.log(response);
      setLoading(false);
      toast.success(`${resourceName} Updated Successfully`);
      redirect();
      if (reset) reset(); // Only call reset if it's provided
    } else {
      setLoading(false);
      toast.error('Something went wrong');
    }
  } catch (error) {
    setLoading(false);
    console.log(error);
  }
}

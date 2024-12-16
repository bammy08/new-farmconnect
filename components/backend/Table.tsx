import { columns, Categories } from '@/app/table/columns';
import { DataTable } from '@/components/data-table';
import Heading from './Heading';
import { getData } from '@/lib/getData';

export default async function Table() {
  // Fetch categories using the getData function
  const data = await getData<Categories[]>('categories'); // Replace 'categories' with your actual API endpoint

  return (
    <section className="py-24">
      <div className="container">
        <Heading title="Categories Table" />
        {data ? (
          <DataTable columns={columns} data={data} />
        ) : (
          <p className="text-red-500">Failed to load categories</p>
        )}
      </div>
    </section>
  );
}

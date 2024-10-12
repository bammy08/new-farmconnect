import { columns, User } from '@/app/table/columns';
import { DataTable } from '@/components/data-table';
import Heading from './Heading';

async function getUsers(): Promise<User[]> {
  const res = await fetch('https://6704e6f5031fd46a830dd622.mockapi.io/users');
  const data = await res.json();
  return data;
}

export default async function Table() {
  const data = await getUsers();

  return (
    <section className="py-24">
      <div className="container">
        <Heading title="Product Table" />
        <DataTable columns={columns} data={data} />
      </div>
    </section>
  );
}

'use client';

import { ColumnDef } from '@tanstack/react-table';

import { MoreHorizontal, ArrowUpDown } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Checkbox } from '@/components/ui/checkbox';
import Image from 'next/image';

export type Categories = {
  id: string;
  title: string;
  imageUrl: string;
};

export const columns: ColumnDef<Categories>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'id',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          ID
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: 'imageUrl',
    header: 'Image',
    cell: ({ row }) => (
      <div className="">
        <Image
          width={80}
          height={80}
          src={row.getValue('imageUrl') as string}
          alt={(row.getValue('title') as string) || 'Category Image'}
          className=" object-cover rounded-md"
        />
      </div>
    ),
  },

  {
    accessorKey: 'title',
    header: 'Title',
  },
  {
    header: 'Actions',
    id: 'actions',
    cell: () => {
      // const user = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="bg-white shadow-md p-2 cursor-pointer"
          >
            {/* <DropdownMenuLabel>Actions</DropdownMenuLabel> */}
            {/* <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(user.id)}
            >
              Copy user ID
            </DropdownMenuItem> */}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="bg-blue-400 cursor-pointer hover:bg-blue-800 hover:text-blue-800">
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem className="bg-red-400 cursor-pointer mt-2 hover:bg-red-800">
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const booksData = [
  {
    id: 1,
    title: "Atomic Habits",
    author: "James Clear",
    price: 20,
    image: "/book.png",
  },
  {
    id: 2,
    title: "Deep Work",
    author: "Cal Newport",
    price: 18,
    image: "/book.png",
  },
];

const ITEMS_PER_PAGE = 5;

const Books = () => {
  const [search, setSearch] = useState("");
  const [author, setAuthor] = useState("all");
  const [page, setPage] = useState(1);

  const filteredBooks = booksData.filter((book) => {
    const matchSearch = book.title.toLowerCase().includes(search.toLowerCase());
    const matchAuthor = author === "all" || book.author === author;
    return matchSearch && matchAuthor;
  });

  const totalPages = Math.ceil(filteredBooks.length / ITEMS_PER_PAGE);
  const paginatedBooks = filteredBooks.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-3xl font-bold">Books</h1>

        <Dialog>
          <DialogTrigger asChild>
            <Button>Add Book</Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Book</DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              <Input placeholder="Book Title" />
              <Input placeholder="Author" />
              <Input placeholder="Price" />
              <Input type="file" />
              <Button className="w-full">Save Book</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="p-4 flex flex-col md:flex-row gap-4">
        <Input
          placeholder="Search by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <Select value={author} onValueChange={setAuthor}>
          <SelectTrigger className="md:w-56">
            <SelectValue placeholder="Filter by author" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Authors</SelectItem>
            <SelectItem value="James Clear">James Clear</SelectItem>
            <SelectItem value="Cal Newport">Cal Newport</SelectItem>
          </SelectContent>
        </Select>
      </Card>

      <Card className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {paginatedBooks.map((book) => (
              <TableRow key={book.id}>
                <TableCell>
                  <img
                    src={book.image}
                    alt={book.title}
                    className="h-12 w-10 object-cover rounded"
                  />
                </TableCell>
                <TableCell className="font-medium">{book.title}</TableCell>
                <TableCell>{book.author}</TableCell>
                <TableCell>${book.price}</TableCell>
                <TableCell>
                  <Button size="sm" variant="outline">
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <div className="flex justify-end gap-2">
        <Button
          variant="outline"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Prev
        </Button>
        <span className="px-3 py-2 text-sm">
          Page {page} of {totalPages}
        </span>
        <Button
          variant="outline"
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default Books;

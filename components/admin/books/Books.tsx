"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
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

import { BOOK_API_END_POINT } from "@/constant/books";
import Loading from "@/components/Loading";

export const BOOK_CATEGORIES = [
  "Philosophy",
  "Technology",
  "History",
  "Science",
  "Biography",
  "Business",
  "Self-Help",
  "Fiction",
];

const ITEMS_PER_PAGE = 5;

const Books = () => {
  const [allBooks, setAllBooks] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [author, setAuthor] = useState("all");
  const [page, setPage] = useState(1);

  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);

  const [formData, setFormData] = useState({
    title: "",
    bookAuthor: "",
    price: 0,
    discount: 0,
    stock: 0,
    file: null as File | null,
    category: "",
    description: "",
  });

  //  FETCH BOOKS
  const fetchAllBooks = async () => {
    try {
      setFetchLoading(true);
      const res = await axios.get(BOOK_API_END_POINT);
      setAllBooks(res.data.data);
    } catch (error) {
      toast.error("Failed to fetch books");
    } finally {
      setFetchLoading(false);
    }
  };

  useEffect(() => {
    fetchAllBooks();
  }, []);

  const handleInputChange = (field: string, value: any) => {
    if (["price", "discount", "stock"].includes(field)) {
      setFormData((prev) => ({ ...prev, [field]: Number(value) || 0 }));
    } else {
      setFormData((prev) => ({ ...prev, [field]: value }));
    }
  };

  const handleSaveBook = async () => {
    try {
      setLoading(true);

      const data = new FormData();
      data.append("title", formData.title);
      data.append("authorName", formData.bookAuthor);
      data.append("price", formData.price.toString());
      data.append("discount", formData.discount.toString());
      data.append("stock", formData.stock.toString());
      data.append("category", formData.category);
      data.append("description", formData.description);

      if (formData.file) data.append("image", formData.file);

      await axios.post(BOOK_API_END_POINT, data);

      toast.success("Book added successfully");

      setIsOpen(false);
      setFormData({
        title: "",
        bookAuthor: "",
        price: 0,
        discount: 0,
        stock: 0,
        file: null,
        category: "",
        description: "",
      });

      fetchAllBooks();
    } catch (error) {
      toast.error("Failed to add book");
    } finally {
      setLoading(false);
    }
  };

  // FILTER + PAGINATION
  const filteredBooks = allBooks.filter((book) => {
    const matchSearch = book.title.toLowerCase().includes(search.toLowerCase());
    const matchAuthor = author === "all" || book.authorName === author;
    return matchSearch && matchAuthor;
  });

  const totalPages = Math.ceil(filteredBooks.length / ITEMS_PER_PAGE);

  const paginatedBooks = filteredBooks.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE,
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Books</h1>

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button>Add Book</Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Book</DialogTitle>
              <DialogDescription>Enter book details</DialogDescription>
            </DialogHeader>

            <div className="space-y-3">
              <Input
                placeholder="Title"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
              />

              <Input
                placeholder="Author"
                value={formData.bookAuthor}
                onChange={(e) =>
                  handleInputChange("bookAuthor", e.target.value)
                }
              />

              <label htmlFor="price" className="block font-medium mb-1">
                Description
              </label>
              <Input
                type="text"
                placeholder="description"
                value={formData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
              />

              <label htmlFor="price" className="block font-medium mb-1">
                Price
              </label>
              <Input
                type="number"
                placeholder="Price"
                value={formData.price}
                onChange={(e) => handleInputChange("price", e.target.value)}
              />

              <label htmlFor="discount" className="block font-medium mb-1">
                Discount
              </label>
              <Input
                type="number"
                placeholder="Discount"
                value={formData.discount}
                onChange={(e) => handleInputChange("discount", e.target.value)}
              />
              <label htmlFor="stock" className="block font-medium mb-1">
                Stock
              </label>
              <Input
                type="number"
                placeholder="Stock"
                value={formData.stock}
                onChange={(e) => handleInputChange("stock", e.target.value)}
              />

              <Input
                type="file"
                onChange={(e) =>
                  handleInputChange("file", e.target.files?.[0] || null)
                }
              />

              <Select
                value={formData.category}
                onValueChange={(v) => handleInputChange("category", v)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {BOOK_CATEGORIES.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button
                className="w-full"
                onClick={handleSaveBook}
                disabled={loading}
              >
                {loading ? "Saving..." : "Save Book"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="p-4 flex gap-4">
        <Input
          placeholder="Search by title"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Card>

      {fetchLoading ? (
        <Loading />
      ) : (
        <>
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Image</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Discount</TableHead>
                  <TableHead>Total Price</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Category</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {paginatedBooks.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8">
                      No books found
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedBooks.map((book) => {
                    const finalPrice = book.price - book.discount;
                    return (
                      <TableRow key={book._id}>
                        <TableCell>
                          <img
                            src={book.image}
                            alt={book.title}
                            className="h-12 w-10 rounded object-cover"
                          />
                        </TableCell>
                        <TableCell className="font-medium">
                          {book.title}
                        </TableCell>
                        <TableCell>{book.authorName}</TableCell>
                        <TableCell>Rs{book.price}</TableCell>
                        <TableCell>Rs{book.discount}</TableCell>
                        <TableCell className="font-semibold text-green-600">
                          Rs{finalPrice}
                        </TableCell>
                        <TableCell>{book.stock}</TableCell>
                        <TableCell>{book.category}</TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </Card>

          {totalPages > 1 && (
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
          )}
        </>
      )}
    </div>
  );
};

export default Books;

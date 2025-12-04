import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, BookOpen, Search, ExternalLink } from "lucide-react";

const Books = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const books = [
    {
      id: 1,
      title: "Testing Spring Boot Applications Demystified",
      category: "Java",
      previewLink: "https://codersguild.net/download/2409_Testing-Spring-Boot-Applications-Demystified.pdf",
      image: "📗"
    },
    {
      id: 2,
      title: "Systems Programming with C# and .NET",
      category: "C#",
      previewLink: "https://codersguild.net/read-online?url=L2Rvd25sb2FkLzIyMDlfc3lzdGVtcy1wcm9ncmFtbWluZy13aXRoLWMtYW5kLW5ldC5wZGY=",
      image: "📘"
    },
    {
      id: 3,
      title: "Java 23 Key Concepts in Brief",
      category: "Java",
      previewLink: "https://codersguild.net/read-online?url=L2Rvd25sb2FkLzMwMDlfSmF2YS0yMy1LZXktQ29uY2VwdHMtaW4tQnJpZWYucGRm",
      image: "📙"
    },
    {
      id: 4,
      title: "CSS: The Definitive Guide: Web Layout and Presentation",
      category: "CSS",
      previewLink: "https://codersguild.net/read-online?url=L2Rvd25sb2FkLzI4MDlfY3NzLXRoZS1kZWZpbml0aXZlLWd1aWRlLnBkZg==",
      image: "📕"
    },
    {
      id: 5,
      title: "You Don't Know JS: this & Object Prototypes",
      category: "JavaScript",
      previewLink: "https://codersguild.net/read-online?url=L2Rvd25sb2FkLzI2MDlfWW91LURvbnQtS25vdy1KUy10aGlzLU9iamVjdC1Qcm90b3R5cGVzLnBkZg==",
      image: "📘"
    },
    {
      id: 6,
      title: "Kubernetes Security for Dummies",
      category: "DevOps",
      previewLink: "https://codersguild.net/read-online?url=L2Rvd25sb2FkLzE4MDlfa3ViZXJuZXRlcy1zZWN1cml0eS1mb3ItZHVtbWllcy5wZGY=",
      image: "📗"
    },
    {
      id: 7,
      title: "Financial Applications using Excel Add-in in C/C++",
      category: "C/C++",
      previewLink: "https://codersguild.net/read-online?url=L2Rvd25sb2FkLzE2MDlfRmluYW5jaWFsLUFwcGxpY2F0aW9ucy1Vc2luZy1FeGNlbC1BZGQtaW4tRGV2ZWxvcG1lbnQtaW4tQ0MucGRm",
      image: "📙"
    },
    {
      id: 8,
      title: "Think Python",
      category: "Python",
      previewLink: "https://greenteapress.com/thinkpython2/thinkpython2.pdf",
      image: "📕"
    },
    {
      id: 9,
      title: "Java A Beginner's Guide, 6th Edition",
      category: "Java",
      previewLink: "https://drive.google.com/file/d/0B6xeB9nZ-6_IVGgtbVd1QXQyRkk/view?resourcekey=0-f_lIDOE6JqDs9e2UFunp5w",
      image: "📘"
    },
    {
      id: 10,
      title: "Web Development Toolkit for Java Developers",
      category: "Java",
      previewLink: "https://codersguild.net/read-online?url=L2Rvd25sb2FkLzI5MDhfV2ViLURldmVsb3BtZW50LVRvb2xraXQtZm9yLUphdmEtRGV2ZWxvcGVycy5wZGY=",
      image: "📗"
    },
    {
      id: 11,
      title: "Learn Java Fundamentals",
      category: "Java",
      previewLink: "https://codersguild.net/read-online?url=L2Rvd25sb2FkLzA1MDhfTGVhcm5fSmF2YV9GdW5kYW1lbnRhbHMucGRm",
      image: "📙"
    },
    {
      id: 12,
      title: "JavaScript Interview Questions and Answers for Junior Developers",
      category: "JavaScript",
      previewLink: "https://codersguild.net/download/interview/javascript-for-junior.pdf",
      image: "📕"
    }
  ];

  const categories = ["All", "Java", "JavaScript", "Python", "CSS", "C#", "C/C++", "DevOps"];
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || book.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background py-4 sm:py-8 px-3 sm:px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="mb-3 text-sm"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
          
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <BookOpen className="h-8 w-8 text-primary" />
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-[var(--gradient-primary)] bg-clip-text text-transparent">
                Programming Books
              </h1>
            </div>
            <p className="text-sm sm:text-base text-muted-foreground">
              Free programming books with online preview
            </p>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search books..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Badge
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                className="cursor-pointer hover:bg-primary/80"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredBooks.map((book) => (
            <Card key={book.id} className="bg-card border-border/50 hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="text-4xl mb-2">{book.image}</div>
                <CardTitle className="text-base line-clamp-2">{book.title}</CardTitle>
                <CardDescription className="text-xs">
                  <Badge variant="secondary" className="text-xs">{book.category}</Badge>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  size="sm" 
                  className="w-full text-xs"
                  onClick={() => window.open(book.previewLink, '_blank')}
                >
                  <ExternalLink className="h-3 w-3 mr-1" />
                  Read Online
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredBooks.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No books found</h3>
            <p className="text-sm text-muted-foreground">Try adjusting your search or filter criteria</p>
          </div>
        )}

        {/* Info Section */}
        <Card className="mt-8 bg-card/50 border-border/50">
          <CardContent className="p-6">
            <h3 className="font-semibold text-foreground mb-2">📚 Free Programming Books</h3>
            <p className="text-sm text-muted-foreground">
              Access free programming books online. Click "Read Online" to open the book in a new tab and start learning!
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Books;

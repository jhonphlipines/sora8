import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, BookOpen, Search, ExternalLink, Star, Download } from "lucide-react";

const Books = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const books = [
    {
      id: 1,
      title: "JavaScript: The Good Parts",
      author: "Douglas Crockford",
      category: "JavaScript",
      rating: 4.5,
      description: "Most programming languages contain good and bad parts, but JavaScript has more than its share of the bad.",
      image: "📘",
      level: "Intermediate"
    },
    {
      id: 2,
      title: "Clean Code",
      author: "Robert C. Martin",
      category: "Best Practices",
      rating: 4.8,
      description: "A handbook of agile software craftsmanship. Learn how to write code that is easy to read and maintain.",
      image: "📗",
      level: "All Levels"
    },
    {
      id: 3,
      title: "Python Crash Course",
      author: "Eric Matthes",
      category: "Python",
      rating: 4.6,
      description: "A hands-on, project-based introduction to programming. Perfect for beginners.",
      image: "📙",
      level: "Beginner"
    },
    {
      id: 4,
      title: "Eloquent JavaScript",
      author: "Marijn Haverbeke",
      category: "JavaScript",
      rating: 4.4,
      description: "A modern introduction to programming with JavaScript. Free to read online.",
      image: "📕",
      level: "Beginner"
    },
    {
      id: 5,
      title: "You Don't Know JS",
      author: "Kyle Simpson",
      category: "JavaScript",
      rating: 4.7,
      description: "A series of books diving deep into the core mechanisms of JavaScript.",
      image: "📘",
      level: "Advanced"
    },
    {
      id: 6,
      title: "The Pragmatic Programmer",
      author: "David Thomas & Andrew Hunt",
      category: "Best Practices",
      rating: 4.9,
      description: "Your journey to mastery. One of the most influential books in software development.",
      image: "📗",
      level: "All Levels"
    },
    {
      id: 7,
      title: "Learning React",
      author: "Alex Banks & Eve Porcello",
      category: "React",
      rating: 4.3,
      description: "Modern patterns for developing React apps. Learn hooks, context, and more.",
      image: "📙",
      level: "Intermediate"
    },
    {
      id: 8,
      title: "Head First Java",
      author: "Kathy Sierra & Bert Bates",
      category: "Java",
      rating: 4.5,
      description: "A brain-friendly guide to learning Java. Makes learning enjoyable and effective.",
      image: "📕",
      level: "Beginner"
    }
  ];

  const categories = ["All", "JavaScript", "Python", "React", "Java", "Best Practices"];
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchTerm.toLowerCase());
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
              Curated collection of recommended programming books
            </p>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search books or authors..."
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
                <CardDescription className="text-xs">{book.author}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="secondary" className="text-xs">{book.category}</Badge>
                  <Badge variant="outline" className="text-xs">{book.level}</Badge>
                </div>
                <div className="flex items-center gap-1 mb-3">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs text-muted-foreground">{book.rating}</span>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-3 mb-4">
                  {book.description}
                </p>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1 text-xs">
                    <ExternalLink className="h-3 w-3 mr-1" />
                    Preview
                  </Button>
                  <Button size="sm" className="flex-1 text-xs">
                    <Download className="h-3 w-3 mr-1" />
                    Get Book
                  </Button>
                </div>
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
            <h3 className="font-semibold text-foreground mb-2">📚 Why Read Programming Books?</h3>
            <p className="text-sm text-muted-foreground">
              Books provide in-depth knowledge and structured learning that tutorials often miss. 
              They help you understand the "why" behind concepts, not just the "how". 
              Our curated collection includes both classic texts and modern resources to accelerate your learning journey.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Books;
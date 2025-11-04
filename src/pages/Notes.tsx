import { useEffect, useState, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { FileText, Download, Trash2, Edit, Plus, Search, Calendar, Type } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Note {
  id: string;
  title: string;
  content: string;
  video_id?: string;
  video_title?: string;
  created_at: string;
  updated_at: string;
}

const Notes = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const { data, error } = await supabase
        .from("user_notes")
        .select("*")
        .order("updated_at", { ascending: false });

      if (error) throw error;
      setNotes(data || []);
    } catch (error) {
      console.error("Error fetching notes:", error);
      toast({
        title: "Error",
        description: "Failed to load notes. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase.from("user_notes").delete().eq("id", id);

      if (error) throw error;

      setNotes(notes.filter((note) => note.id !== id));
      toast({
        title: "Note deleted",
        description: "Your note has been deleted successfully.",
      });
    } catch (error) {
      console.error("Error deleting note:", error);
      toast({
        title: "Error",
        description: "Failed to delete note. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleSaveNote = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;

    if (!title.trim() || !content.trim()) {
      toast({
        title: "Validation error",
        description: "Title and content are required.",
        variant: "destructive",
      });
      return;
    }

    try {
      if (editingNote) {
        const { error } = await supabase
          .from("user_notes")
          .update({ title, content })
          .eq("id", editingNote.id);

        if (error) throw error;

        setNotes(notes.map((note) => 
          note.id === editingNote.id 
            ? { ...note, title, content, updated_at: new Date().toISOString() }
            : note
        ));

        toast({
          title: "Note updated",
          description: "Your note has been updated successfully.",
        });
      } else {
        const { data: userData } = await supabase.auth.getUser();
        if (!userData.user) throw new Error("User not authenticated");

        const { data, error } = await supabase
          .from("user_notes")
          .insert([{ title, content, user_id: userData.user.id }])
          .select()
          .single();

        if (error) throw error;

        setNotes([data, ...notes]);
        toast({
          title: "Note created",
          description: "Your note has been created successfully.",
        });
      }

      setIsDialogOpen(false);
      setEditingNote(null);
    } catch (error) {
      console.error("Error saving note:", error);
      toast({
        title: "Error",
        description: "Failed to save note. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleExport = () => {
    const exportData = notes.map((note) => ({
      title: note.title,
      content: note.content,
      video: note.video_title || "N/A",
      created: new Date(note.created_at).toLocaleDateString(),
      updated: new Date(note.updated_at).toLocaleDateString(),
    }));

    const jsonString = JSON.stringify(exportData, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `notes-export-${new Date().toISOString().split("T")[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast({
      title: "Export successful",
      description: "Your notes have been exported as JSON.",
    });
  };

  const handleExportAsText = () => {
    const textContent = notes.map((note, index) => {
      const separator = "=".repeat(60);
      return `${separator}
NOTE ${index + 1}: ${note.title}
${separator}

Created: ${new Date(note.created_at).toLocaleString()}
Updated: ${new Date(note.updated_at).toLocaleString()}
${note.video_title ? `Video: ${note.video_title}` : ""}

Content:
${note.content}

`;
    }).join("\n");

    const fullText = `MY NOTES EXPORT
Generated: ${new Date().toLocaleString()}
Total Notes: ${notes.length}

${textContent}`;

    const blob = new Blob([fullText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `notes-export-${new Date().toISOString().split("T")[0]}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast({
      title: "Export successful",
      description: "Your notes have been exported as text file.",
    });
  };

  const applyFormatting = (type: 'color' | 'size', value: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = textarea.value.substring(start, end);

    if (!selectedText) {
      toast({
        title: "No text selected",
        description: "Please select text to format.",
        variant: "destructive",
      });
      return;
    }

    let formattedText = '';
    if (type === 'color') {
      formattedText = `<span style="color: ${value}">${selectedText}</span>`;
    } else if (type === 'size') {
      formattedText = `<span style="font-size: ${value}">${selectedText}</span>`;
    }

    const newContent = 
      textarea.value.substring(0, start) +
      formattedText +
      textarea.value.substring(end);

    textarea.value = newContent;
    textarea.focus();
    textarea.setSelectionRange(start, start + formattedText.length);
  };

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent mb-2">
              My Notes
            </h1>
            <p className="text-muted-foreground text-lg">
              Manage and organize your learning notes
            </p>
          </div>
          <div className="flex gap-3">
            <Button onClick={handleExport} variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Export JSON
            </Button>
            <Button onClick={handleExportAsText} variant="outline" className="gap-2">
              <FileText className="h-4 w-4" />
              Export Text
            </Button>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2" onClick={() => setEditingNote(null)}>
                  <Plus className="h-4 w-4" />
                  New Note
                </Button>
              </DialogTrigger>
              <DialogContent>
                <form onSubmit={handleSaveNote}>
                  <DialogHeader>
                    <DialogTitle>{editingNote ? "Edit Note" : "Create New Note"}</DialogTitle>
                    <DialogDescription>
                      {editingNote ? "Update your note details" : "Add a new note to your collection"}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Title</label>
                      <Input
                        name="title"
                        placeholder="Enter note title..."
                        defaultValue={editingNote?.title || ""}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Content</label>
                      <div className="flex gap-2 mb-2 flex-wrap">
                        <div className="flex gap-1">
                          <Button
                            type="button"
                            size="sm"
                            variant="outline"
                            onClick={() => applyFormatting('color', '#ef4444')}
                            className="h-8 w-8 p-0 bg-red-500 hover:bg-red-600"
                            title="Red"
                          />
                          <Button
                            type="button"
                            size="sm"
                            variant="outline"
                            onClick={() => applyFormatting('color', '#3b82f6')}
                            className="h-8 w-8 p-0 bg-blue-500 hover:bg-blue-600"
                            title="Blue"
                          />
                          <Button
                            type="button"
                            size="sm"
                            variant="outline"
                            onClick={() => applyFormatting('color', '#22c55e')}
                            className="h-8 w-8 p-0 bg-green-500 hover:bg-green-600"
                            title="Green"
                          />
                          <Button
                            type="button"
                            size="sm"
                            variant="outline"
                            onClick={() => applyFormatting('color', '#eab308')}
                            className="h-8 w-8 p-0 bg-yellow-500 hover:bg-yellow-600"
                            title="Yellow"
                          />
                          <Button
                            type="button"
                            size="sm"
                            variant="outline"
                            onClick={() => applyFormatting('color', '#a855f7')}
                            className="h-8 w-8 p-0 bg-purple-500 hover:bg-purple-600"
                            title="Purple"
                          />
                        </div>
                        <Select onValueChange={(value) => applyFormatting('size', value)}>
                          <SelectTrigger className="w-[120px] h-8">
                            <Type className="h-4 w-4 mr-2" />
                            <SelectValue placeholder="Size" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="12px">Small</SelectItem>
                            <SelectItem value="14px">Normal</SelectItem>
                            <SelectItem value="18px">Large</SelectItem>
                            <SelectItem value="24px">Extra Large</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Textarea
                        ref={textareaRef}
                        name="content"
                        placeholder="Write your note here... Select text to apply formatting."
                        defaultValue={editingNote?.content || ""}
                        className="min-h-[200px] font-mono text-sm"
                        required
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit">
                      {editingNote ? "Update" : "Create"}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search notes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading notes...</p>
          </div>
        ) : filteredNotes.length === 0 ? (
          <div className="text-center py-12">
            <FileText className="h-16 w-16 mx-auto text-muted-foreground mb-4 opacity-50" />
            <h3 className="text-xl font-semibold mb-2">No notes found</h3>
            <p className="text-muted-foreground mb-6">
              {searchQuery ? "Try a different search term" : "Start by creating your first note"}
            </p>
            {!searchQuery && (
              <Button onClick={() => setIsDialogOpen(true)} className="gap-2">
                <Plus className="h-4 w-4" />
                Create Note
              </Button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNotes.map((note) => (
              <Card key={note.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-lg line-clamp-1">{note.title}</CardTitle>
                      {note.video_title && (
                        <Badge variant="secondary" className="mt-2">
                          {note.video_title}
                        </Badge>
                      )}
                    </div>
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setEditingNote(note);
                          setIsDialogOpen(true);
                        }}
                        className="h-8 w-8 p-0"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(note.id)}
                        className="h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-32">
                    <CardDescription 
                      className="whitespace-pre-wrap"
                      dangerouslySetInnerHTML={{ __html: note.content }}
                    />
                  </ScrollArea>
                  <div className="flex items-center gap-2 mt-4 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    <span>{new Date(note.updated_at).toLocaleDateString()}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Notes;

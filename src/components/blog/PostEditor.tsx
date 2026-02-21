"use client"

import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Placeholder from "@tiptap/extension-placeholder"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

interface PostEditorProps {
  post?: {
    id: string
    title: string
    content: string
    excerpt: string | null
    published: boolean
  }
}

export default function PostEditor({ post }: PostEditorProps) {
  const [title, setTitle] = useState(post?.title || "")
  const [excerpt, setExcerpt] = useState(post?.excerpt || "")
  const [published, setPublished] = useState(post?.published || false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Write your post content here...",
      }),
    ],
    content: post?.content || "",
    editorProps: {
      attributes: {
        class:
          "prose prose-lg dark:prose-invert max-w-none min-h-[300px] p-4 focus:outline-none",
      },
    },
  })

  useEffect(() => {
    if (post?.content && editor) {
      editor.commands.setContent(post.content)
    }
  }, [post?.content, editor])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    setSaving(true)

    const content = editor?.getHTML() || ""

    if (!title.trim()) {
      setError("Title is required")
      setSaving(false)
      return
    }

    if (!content.trim() || content === "<p></p>") {
      setError("Content is required")
      setSaving(false)
      return
    }

    try {
      const url = post ? `/api/posts/${post.id}` : "/api/posts"
      const method = post ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          content,
          excerpt: excerpt || null,
          published,
        }),
      })

      if (response.ok) {
        router.push("/admin/posts")
        router.refresh()
      } else {
        const data = await response.json()
        setError(data.error || "Failed to save post")
      }
    } catch {
      setError("An error occurred. Please try again.")
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-500/20 text-red-600 dark:text-red-400 px-4 py-2 rounded-lg text-sm">
          {error}
        </div>
      )}

      <div>
        <label htmlFor="title" className="block text-sm font-medium mb-2">
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2 rounded-lg bg-[var(--background)] border border-[var(--sidebar-bg)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
          placeholder="Post title"
        />
      </div>

      <div>
        <label htmlFor="excerpt" className="block text-sm font-medium mb-2">
          Excerpt (optional)
        </label>
        <textarea
          id="excerpt"
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          rows={2}
          className="w-full px-4 py-2 rounded-lg bg-[var(--background)] border border-[var(--sidebar-bg)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] resize-none"
          placeholder="Brief description of the post"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Content</label>
        <div className="bg-[var(--background)] border border-[var(--sidebar-bg)] rounded-lg overflow-hidden">
          {/* Toolbar */}
          <div className="flex flex-wrap gap-1 p-2 border-b border-[var(--sidebar-bg)]">
            <button
              type="button"
              onClick={() => editor?.chain().focus().toggleBold().run()}
              className={`px-3 py-1 rounded text-sm ${
                editor?.isActive("bold")
                  ? "bg-[var(--sidebar-bg)]"
                  : "hover:bg-[var(--card-bg)]"
              }`}
            >
              Bold
            </button>
            <button
              type="button"
              onClick={() => editor?.chain().focus().toggleItalic().run()}
              className={`px-3 py-1 rounded text-sm ${
                editor?.isActive("italic")
                  ? "bg-[var(--sidebar-bg)]"
                  : "hover:bg-[var(--card-bg)]"
              }`}
            >
              Italic
            </button>
            <button
              type="button"
              onClick={() => editor?.chain().focus().toggleStrike().run()}
              className={`px-3 py-1 rounded text-sm ${
                editor?.isActive("strike")
                  ? "bg-[var(--sidebar-bg)]"
                  : "hover:bg-[var(--card-bg)]"
              }`}
            >
              Strike
            </button>
            <span className="w-px h-6 bg-[var(--sidebar-bg)] mx-1 self-center" />
            <button
              type="button"
              onClick={() =>
                editor?.chain().focus().toggleHeading({ level: 2 }).run()
              }
              className={`px-3 py-1 rounded text-sm ${
                editor?.isActive("heading", { level: 2 })
                  ? "bg-[var(--sidebar-bg)]"
                  : "hover:bg-[var(--card-bg)]"
              }`}
            >
              H2
            </button>
            <button
              type="button"
              onClick={() =>
                editor?.chain().focus().toggleHeading({ level: 3 }).run()
              }
              className={`px-3 py-1 rounded text-sm ${
                editor?.isActive("heading", { level: 3 })
                  ? "bg-[var(--sidebar-bg)]"
                  : "hover:bg-[var(--card-bg)]"
              }`}
            >
              H3
            </button>
            <span className="w-px h-6 bg-[var(--sidebar-bg)] mx-1 self-center" />
            <button
              type="button"
              onClick={() => editor?.chain().focus().toggleBulletList().run()}
              className={`px-3 py-1 rounded text-sm ${
                editor?.isActive("bulletList")
                  ? "bg-[var(--sidebar-bg)]"
                  : "hover:bg-[var(--card-bg)]"
              }`}
            >
              Bullet List
            </button>
            <button
              type="button"
              onClick={() => editor?.chain().focus().toggleOrderedList().run()}
              className={`px-3 py-1 rounded text-sm ${
                editor?.isActive("orderedList")
                  ? "bg-[var(--sidebar-bg)]"
                  : "hover:bg-[var(--card-bg)]"
              }`}
            >
              Ordered List
            </button>
            <button
              type="button"
              onClick={() => editor?.chain().focus().toggleCodeBlock().run()}
              className={`px-3 py-1 rounded text-sm ${
                editor?.isActive("codeBlock")
                  ? "bg-[var(--sidebar-bg)]"
                  : "hover:bg-[var(--card-bg)]"
              }`}
            >
              Code
            </button>
            <button
              type="button"
              onClick={() => editor?.chain().focus().toggleBlockquote().run()}
              className={`px-3 py-1 rounded text-sm ${
                editor?.isActive("blockquote")
                  ? "bg-[var(--sidebar-bg)]"
                  : "hover:bg-[var(--card-bg)]"
              }`}
            >
              Quote
            </button>
          </div>
          <EditorContent editor={editor} />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="published"
          checked={published}
          onChange={(e) => setPublished(e.target.checked)}
          className="w-4 h-4 rounded border-[var(--sidebar-bg)]"
        />
        <label htmlFor="published" className="text-sm font-medium">
          Publish immediately
        </label>
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={saving}
          className="px-6 py-3 bg-[var(--sidebar-bg)] text-[var(--foreground)] rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {saving ? "Saving..." : post ? "Update Post" : "Create Post"}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-3 bg-[var(--card-bg)] text-[var(--foreground)] rounded-lg font-semibold hover:opacity-90 transition-opacity"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}

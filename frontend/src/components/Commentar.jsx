import React, { useState, useEffect, useRef, useCallback, memo } from "react";
import { addComment, fetchComments } from "../firebase-comment";
import {
  MessageCircle,
  UserCircle2,
  Loader2,
  AlertCircle,
  Send,
  ImagePlus,
  X,
} from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

// Single Comment Display
const Comment = memo(({ comment, formatDate }) => (
  <div className="px-4 pt-4 pb-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all group hover:shadow-lg hover:-translate-y-0.5">
    <div className="flex items-start gap-3">
      {comment.profileImage ? (
        <img
          src={comment.profileImage}
          alt={`${comment.userName}'s profile`}
          className="w-10 h-10 rounded-full object-cover border-2 border-indigo-500/30"
          loading="lazy"
        />
      ) : (
        <div className="p-2 rounded-full bg-indigo-500/20 text-indigo-400 group-hover:bg-indigo-500/30 transition-colors">
          <UserCircle2 className="w-5 h-5" />
        </div>
      )}

      <div className="flex-grow min-w-0">
        <div className="flex items-center justify-between gap-4 mb-2">
          <h4 className="font-medium text-white truncate">
            {comment.userName}
          </h4>

          <span className="text-xs text-gray-400 whitespace-nowrap">
            {formatDate(comment.createdAt)}
          </span>
        </div>

        <p className="text-gray-300 text-sm break-words leading-relaxed relative bottom-2">
          {comment.content}
        </p>
      </div>
    </div>
  </div>
));

// Comment Form
const CommentForm = memo(({ onSubmit, isSubmitting }) => {
  const [newComment, setNewComment] = useState("");
  const [userName, setUserName] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const textareaRef = useRef(null);
  const fileInputRef = useRef(null);

  const handleImageChange = useCallback((e) => {
    const file = e.target.files[0];

    if (file && file.size <= 5 * 1024 * 1024) {
      setImageFile(file);

      const reader = new FileReader();

      reader.onloadend = () => {
        setImagePreview(reader.result);
      };

      reader.readAsDataURL(file);
    }
  }, []);

  const handleTextareaChange = useCallback((e) => {
    setNewComment(e.target.value);

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      if (!newComment.trim() || !userName.trim()) return;

      await onSubmit({
        newComment,
        userName,
        imageFile,
      });

      setNewComment("");
      setUserName("");
      setImagePreview(null);
      setImageFile(null);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
    },
    [newComment, userName, imageFile, onSubmit]
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-white mb-2">
          Name
        </label>

        <input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="Enter your name"
          className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-white mb-2">
          Message
        </label>

        <textarea
          ref={textareaRef}
          value={newComment}
          onChange={handleTextareaChange}
          placeholder="Write your message here..."
          className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 resize-none min-h-[120px]"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-white mb-2">
          Profile Photo (optional)
        </label>

        <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
          {imagePreview ? (
            <div className="flex items-center gap-4">
              <img
                src={imagePreview}
                alt="preview"
                className="w-16 h-16 rounded-full object-cover border-2 border-indigo-500"
              />

              <button
                type="button"
                onClick={() => {
                  setImagePreview(null);
                  setImageFile(null);

                  if (fileInputRef.current) {
                    fileInputRef.current.value = "";
                  }
                }}
                className="flex items-center gap-2 px-4 py-2 bg-red-500/20 text-red-400 rounded-full"
              >
                <X className="w-4 h-4" />
                Remove
              </button>
            </div>
          ) : (
            <>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                className="hidden"
                onChange={handleImageChange}
              />

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-indigo-500/20 text-indigo-400 border border-dashed border-indigo-500"
              >
                <ImagePlus className="w-5 h-5" />
                Choose Profile Photo
              </button>
            </>
          )}
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full h-12 bg-gradient-to-r from-[#6366f1] to-[#a855f7] rounded-xl font-medium text-white"
      >
        {isSubmitting ? (
          <div className="flex items-center justify-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin" />
            Posting...
          </div>
        ) : (
          <div className="flex items-center justify-center gap-2">
            <Send className="w-4 h-4" />
            Post Comment
          </div>
        )}
      </button>
    </form>
  );
});

// Main Component
const Commentar = () => {
  const [comments, setComments] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    AOS.init({
      once: false,
      duration: 1000,
    });
  }, []);

  const loadComments = useCallback(async () => {
    const data = await fetchComments();
    setComments(data || []);
  }, []);

  useEffect(() => {
    loadComments();
  }, [loadComments]);

  const handleCommentSubmit = useCallback(
    async ({ newComment, userName, imageFile }) => {
      setError("");
      setIsSubmitting(true);

      try {
        await addComment(
          userName,
          newComment,
          imageFile
        );

        await loadComments();
      } catch (e) {
        console.error(e);
        setError("Failed to post comment. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    },
    [loadComments]
  );

  const formatDate = useCallback((timestamp) => {
    if (!timestamp) return "";

    const date = timestamp.toDate
      ? timestamp.toDate()
      : timestamp;

    const now = new Date();

    const diffMinutes = Math.floor(
      (now - date) / (1000 * 60)
    );

    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMinutes < 1) return "Just now";
    if (diffMinutes < 60) return `${diffMinutes}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;

    return date.toLocaleDateString();
  }, []);

  return (
    <div className="w-full bg-gradient-to-b from-white/10 to-white/5 rounded-2xl overflow-hidden backdrop-blur-xl shadow-xl">
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-indigo-500/20">
            <MessageCircle className="w-6 h-6 text-indigo-400" />
          </div>

          <h3 className="text-xl font-semibold text-white">
            Comments
            <span className="text-indigo-400">
              {" "}
              ({comments.length})
            </span>
          </h3>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {error && (
          <div className="flex items-center gap-2 p-4 text-red-400 bg-red-500/10 rounded-xl">
            <AlertCircle className="w-5 h-5" />
            {error}
          </div>
        )}

        <CommentForm
          onSubmit={handleCommentSubmit}
          isSubmitting={isSubmitting}
        />

        <div className="space-y-4 h-[300px] overflow-y-auto">
          {comments.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              No comments yet. Start the conversation!
            </div>
          ) : (
            comments.map((comment) => (
              <Comment
                key={comment.id}
                comment={comment}
                formatDate={formatDate}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Commentar;
import React, { useState, useRef, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { ref, get, child, set } from "firebase/database";
import { db } from "../firebase";

const DiscussionPage = () => {
  const fileInputRef = useRef(null);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [discussions, setDiscussions] = useState([]);
  const [discussion, setDiscussion] = useState({
    id: 0,
    title: "",
    desc: "",
    createdBy: "",
    createdAt: "",
    total_messages: 0,
  });

  useEffect(() => {
    // Fetch discussions on page load
    fetchDiscussions();
  }, []);

  const fetchDiscussions = async () => {
    try {
      // Reference to the 'threads' node in Firebase Realtime Database
      const threadsRef = ref(db);

      // Fetch discussions
      const snapshot = await get(child(threadsRef, "threads"));

      const discussionsArray = [];
      snapshot.forEach((threadSnapshot) => {
        const { id, title, desc, createdBy, createdAt, total_messages } =
          threadSnapshot.val();

        // Create a discussion object
        const discussion = {
          id,
          title,
          desc,
          createdBy,
          createdAt,
          total_messages,
        };

        discussionsArray.push(discussion);
      });

      setDiscussions(discussionsArray);
    } catch (error) {
      console.error("Error fetching discussions:", error.message);
    }
  };

  const handlePost = async () => {
    try {
      const threadsRef = ref(db);

      const newThread = {
        ...discussion,
        id: generateUniqueId(),
        createdBy: "Test User",
        createdAt: new Date().toISOString(),
        total_messages: 0,
      };

      await set(child(threadsRef, `threads/${newThread.id}`), newThread);

      fetchDiscussions();
    } catch (error) {
      console.error("Error posting thread:", error.message);
    }
    closeModal();
  };

  const generateUniqueId = () => {
    return new Date().getTime().toString();
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto mt-4 p-4 min-h-screen bg-white shadow-lg rounded">
        {/* Modal for new discussion */}
        <Dialog
          open={isModalOpen}
          onClose={closeModal}
          className="fixed z-10 inset-0 overflow-y-auto"
        >
          <div className="flex items-center justify-center min-h-screen">
            <Dialog.Overlay className="f bg-gray-500 bg-opacity-75 transition-opacity" />
            <div className="bg-white rounded-lg p-4 w-[90vw]">
              <div className="text-lg font-bold mb-4">
                Create New Discussion
              </div>
              <input
                type="text"
                name="title"
                placeholder="Enter topic title..."
                className="px-4 py-2 border rounded w-full mb-4"
                onChange={(e) =>
                  setDiscussion({ ...discussion, title: e.target.value })
                }
              />
              <input
                type="text"
                name="tags"
                placeholder="Enter tags, separated by commas"
                className="px-4 py-2 border rounded w-full mb-4"
              />
              <textarea
                type="text"
                name="description"
                placeholder="Enter the description "
                className="px-4 py-2 border rounded w-full mb-4"
                rows={"10"}
                onChange={(e) =>
                  setDiscussion({ ...discussion, desc: e.target.value })
                }
              />
              <button
                onClick={handlePost}
                className="px-4 py-2 bg-black  text-white rounded-lg"
              >
                Post
              </button>
              <button
                onClick={closeModal}
                className="px-4 py-2 ml-2 bg-gray-700 text-white rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </Dialog>
        <div className="flex flex-row justify-between mb-4">
          {/* Tabs */}
          <div className="flex">
            <div className="mr-2 px-4 py-2 text-sm font-semibold text-gray-800 bg-gray-100 rounded-t">
              Discusions
            </div>
            {/* More tabs... */}
          </div>
          {/* Search box */}
          <div>
            <input
              type="text"
              placeholder="Search question"
              className="px-4 py-2 border rounded"
            />
          </div>
          <div>
            <button
              onClick={openModal}
              className="px-3 bg-black rounded-lg text-white h-10"
            >
              Post
            </button>
          </div>
        </div>
        {/* Discussions list */}

        <div>
          {discussions.map((discussion) => (
            <Link to={`/threads/${discussion.id}`}>
              <div
                key={discussion.id}
                className="flex flex-row justify-between items-center py-4 border-b border-gray-300"
              >
                <div className="flex-grow">
                  <h3 className="text-lg font-semibold">{discussion.title}</h3>
                  <p className="text-sm text-gray-600">
                    Created at: {discussion.createdAt}
                  </p>
                  {discussion.desc}
                  {/* <div className="flex mt-2">
                    {discussion.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-sm text-white p-1 bg-gray-700 rounded-full px-2 mr-2"
                      >
                        {tag}
                      </span>
                    ))}
                  </div> */}
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-sm font-semibold">
                    {discussion.total_messages} Posts
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Tags section */}
        <div className="w-1/4">{/* Tags would go here */}</div>
      </div>
    </>
  );
};

export default DiscussionPage;

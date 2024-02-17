import React, { useState, useRef } from 'react';
import { Dialog } from '@headlessui/react';
import { Link } from 'react-router-dom';
import DashboardNav from '../components/dashboard/DashboardNav';
import { BsSendPlusFill } from "react-icons/bs";


const DiscussionPage = () => {
  const fileInputRef = useRef(null);
  const { name, value } = (e) => e.target;
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  console.log(isModalOpen)
  const [newDiscussion, setNewDiscussion] = useState({
    title: '',
    tags: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'tags') {
      setNewDiscussion({ ...newDiscussion, [name]: value.split(',').map(tag => tag.trim()) });
    } else {
      setNewDiscussion({ ...newDiscussion, [name]: value });
    }
  };

  const handleFilechange = (event) => {
    // Handle the file change event
    // You can access the selected files using event.target.files
    console.log(event.target.files);
    // ... additional code to handle the files
  };
  const triggerFileInput = () => {
    // Trigger the file input click event
    fileInputRef.current.click();
  };

  const handleSubmit = async () => {
    // Validate input data
    if (!newDiscussion.title || !newDiscussion.tags.length) {
      alert('Please fill in all fields.');
      return;
    }

    // Add the new discussion to the discussions state
    const updatedDiscussions = [
      ...discussions,
      {
        ...newDiscussion,
        id: discussions.length + 1, // Generate a new ID for example purposes
        replies: 0,
        views: '0',
        createdDate: new Date().toLocaleDateString(),
        lastReplyDate: 'Just now',
      },
    ];
    setDiscussions(updatedDiscussions);

    // Post the discussion to an API endpoint
    try {
      // await axios.post('/api/discussions', newDiscussion);
      closeModal();
    } catch (error) {
      console.error('Error posting new discussion', error);
    }
  };
  const [discussions, setDiscussions] = useState([
    {
      id: 1,
      title: 'How to write an Interview Question post',
      tags: ['google', 'online assessment'],
      replies: 475,
      views: '156.2K',
      createdDate: 'April 28, 2018',
      lastReplyDate: '16 hours ago'
    },
    {
      id: 2,
      title: 'How to write an Interview Question post',
      tags: ['google', 'online assessment'],
      replies: 475,
      views: '156.2K',
      createdDate: 'April 28, 2018',
      lastReplyDate: '16 hours ago'
    },
 
  ]);
  console.log(discussions)
  // Placeholder data - you would fetch this from an API in a real app


  return (
   <>
   <DashboardNav LOGO={true}/>
   <div className='h-[100px]'></div>
    <div className="container mx-auto mt-4 p-4 min-h-screen border-2 border-black  rounded-lg">
          {/* Modal for new discussion */}
      <Dialog open={isModalOpen} onClose={closeModal} className="fixed z-10 inset-0 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen">
          <Dialog.Overlay className=" bg-gray-500 bg-opacity-75 transition-opacity" />
          <div className="bg-white rounded-lg p-4 w-[90vw]">    
            <div className="text-2xl mb-4 text-gradient font-bold">Create New Discussion</div>
            <input
              type="text"
              name="title"
              placeholder="Enter topic title..."
              onChange={handleInputChange}
              value={newDiscussion.title}
              className="px-4 py-2 border-2 focus:none border-black  rounded-xl w-full mb-4"
            />
            <input
              type="text"
              name="tags"
              placeholder="Enter tags, separated by commas"
              onChange={handleInputChange}
              value={newDiscussion.tags.join(', ')}
              className="px-4 py-2  rounded-xl  border-2 focus:none border-black  w-full mb-4"
            />
            <textarea
              type="text"
              name="description"
              placeholder="Enter the description "
              onChange={handleInputChange}
              value={newDiscussion.desc}
              className="px-4 py-2 rounded-xl  border-2 focus:none border-black  w-full mb-4"
              rows={'10'}
            />
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Upload a photo
              </label>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFilechange}
                style={{ display: 'none' }} // Hide the file input
                className="block w-full text-sm text-gray-500
                   file:mr-4 file:py-2 file:px-4
                   file:rounded-full file:border-0
                   file:text-sm file:font-semibold
                   file:bg-gradient-to-br from-green-400 to-blue-600  file:text-blue-700
                   hover:file:bg-blue-100"
                multiple // Remove this if you want only single file selection
              />
              <button
                onClick={triggerFileInput}
                className="py-2 px-4 rounded-full bg-black text-white font-semibold"
              >
                Upload Files
              </button>
            </div>
            <button onClick={handleSubmit} className="px-4 py-2 bg-black text-white rounded-full">Post</button>
            <button onClick={closeModal} className="px-4 py-2 ml-2 bg-gray-700 text-white rounded-lg">Cancel</button>
          </div>
        </div>
      </Dialog>
      <div className="flex flex-row justify-between mb-4">
        {/* Tabs */}
        <div className="flex">
          <div className="mr-2 px-4 py-2 text-2xl text-gradient  text-gray-800 font-bold   rounded-lg">
              Discusions
          </div>
          {/* More tabs... */}
        </div>
        {/* Search box */}
        <div>
          <input type="text" placeholder="Search question" className="px-4 py-2 border-2  border-black rounded-lg" />
        </div>
        <div>
          <button onClick={openModal} className="px-3 bg-black font-bold text-white rounded-lg  h-10"><div className='flex p-2'>Post<BsSendPlusFill className='m-1 mx-2' /></div>
 </button>
        </div>
      </div>
      {/* Discussions list */}
      
      <div>
        {discussions.map((discussion) => (
          <Link to={`/discussions/id`}>
          <div key={discussion.id} className="flex flex-row justify-between items-center py-4 border-b border-gray-300">
            <div className="flex-grow">
              <h3 className="text-lg font-semibold">{discussion.title}</h3>
              <p className="text-sm text-gray-600">Created at: {discussion.createdDate} | Last Reply: {discussion.lastReplyDate}</p>it
              <div className="flex mt-2">
                {discussion.tags.map(tag => <span key={tag} className="text-sm text-white p-1 bg-gray-800 rounded-full px-3 py-3 mr-2">{tag}</span>)}
              </div>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-sm font-semibold">{discussion.replies} coments</span>
              <span className="text-sm text-gray-500">{discussion.views} s</span>
            </div>
          </div>
          </Link>
        ))}
      </div>
      
      {/* Tags section */}
      <div className="w-1/4">
        {/* Tags would go here */}
      </div>
    </div>
    </>
  );
};

export default DiscussionPage;

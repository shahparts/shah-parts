// components/SocialIcons.js
import React from 'react';

const SocialIcons = () => {
    return (
        <div className="flex space-x-4">
            <a href="https://www.facebook.com/shahpart/" target="_blank" className="text-blue-600 hover:text-blue-800">
                <img src="/path/to/facebook-icon" alt="Facebook" />
            </a>
            <a href="https://www.instagram.com/learn.drift/" target="_blank" className="text-pink-600 hover:text-pink-800">
                <img src="/path/to/instagram-icon" alt="Instagram" />
            </a>
            <a href="https://twitter.com/shahpartsdotcom" target="_blank" className="text-blue-400 hover:text-blue-600">
                <img src="/path/to/twitter-icon" alt="Twitter" />
            </a>
            <a href="mailto:askar3481@gmail.com" className="text-gray-600 hover:text-gray-800">
                <img src="/path/to/email-icon" alt="Email" />
            </a>
        </div>
    );
};

export default SocialIcons;
import React from 'react';

const ChatsComponent = () => {
  return (
    <div className="col-span-12 py-6 border rounded-sm bg-black-2 border-stroke shadow-default dark:border-meta-9 dark:bg-white xl:col-span-4">
      <h4 className="mb-6 px-7.5 text-xl font-bold text-black dark:text-black-2">
        Chats
      </h4>

      <div>
        {/* Lista de chats */}
        {[
          { user: 'Devid Heilo', message: 'Hello, how are you?', time: '12 min', unreadCount: 3, image: './image/user/user-03.png' },
          { user: 'Henry Fisher', message: 'I am waiting for you', time: '5:54 PM', image: './image/user/user-04.png' },
          { user: 'Wilium Smith', message: 'Where are you now?', time: '10:12 PM', image: './image/user/user-05.png' },
          { user: 'Henry Deco', message: 'Thank you so much!', time: 'Sun', unreadCount: 2, image: './images/user/user-01.png' },
          { user: 'Jubin Jack', message: 'I really love that!', time: 'Oct 23', image: './image/user/user-02.png' },
          { user: 'Wilium Smith', message: 'Where are you now?', time: 'Sep 20', image: './image/user/user-05.png' },
        ].map((chat, index) => (
          <a key={index} href="messages.html" className="flex items-center gap-5 py-3 px-7.5 hover:bg-meta-9 dark:hover:bg-black">
            <div className="relative rounded-full h-14 w-14">
              <img src={chat.image} alt="User" />
              <span className="absolute right-0 bottom-0 h-3.5 w-3.5 rounded-full border-2 border-white bg-meta-3"></span>
            </div>

            <div className="flex items-center justify-between flex-1">
              <div>
                <h5 className={chat.unreadCount ? "font-medium text-white dark:text-black-2" : "font-medium"}>
                  {chat.user}
                </h5>
                <p>
                  <span className="text-sm font-medium">{chat.message}</span>
                  <span className="text-xs"> . {chat.time}</span>
                </p>
              </div>
              {chat.unreadCount && (
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary">
                  <span className="text-sm font-medium text-white">{chat.unreadCount}</span>
                </div>
              )}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

export default ChatsComponent;

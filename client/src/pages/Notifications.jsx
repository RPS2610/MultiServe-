import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {

    getNotifications,
    markAsRead,
    markAllAsRead,
    deleteNotification

} from "../api/notificationApi";

function Notifications() {

    const currentUser = JSON.parse(localStorage.getItem("user"));

    const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    loadData();
}, []);

const loadData = async () => {
    try {
        await markAllAsRead(currentUser._id);

        const data = await getNotifications(currentUser._id);

        setNotifications(data);
    } catch (error) {
        console.log(error);
    }
};

  const handleRead = async (id) => {

    try {
        await markAsRead(id);

        const data = await getNotifications(currentUser._id);

        setNotifications(data);

    } catch (error) {
        console.log(error);
    }

};

   const handleDelete = async (id) => {

    try {
        await deleteNotification(id);

        const data = await getNotifications(currentUser._id);

        setNotifications(data);

    } catch (error) {
        console.log(error);
    }

};

    return (

        <>

            <Navbar />

            <div className="max-w-4xl mx-auto py-10 px-6">

                <h1 className="text-4xl font-bold mb-8">

                    🔔 Notifications

                </h1>

                {

                    notifications.length === 0 ?

                    (

                        <div className="bg-white rounded-xl shadow p-10 text-center">

                            No Notifications

                        </div>

                    )

                    :

                    notifications.map((item) => (

                        <div

                            key={item._id}

                            className={`rounded-xl shadow-lg p-6 mb-5 ${

                                item.isRead ?

                                "bg-gray-100"

                                :

                                "bg-blue-50"

                            }`}

                        >

                            <div className="flex justify-between">

                                <div>

                                    <h2 className="text-xl font-bold">

                                        {item.title}

                                    </h2>

                                    <p className="mt-2">

                                        {item.message}

                                    </p>

                                    <p className="text-sm text-gray-500 mt-2">

                                        {

                                            new Date(

                                                item.createdAt

                                            ).toLocaleString()

                                        }

                                    </p>

                                </div>

                                <div className="flex gap-2">

                                    {

                                        !item.isRead &&

                                        <button

                                            onClick={() => handleRead(item._id)}

                                            className="bg-green-600 text-white px-4 py-2 rounded"

                                        >

                                            Read

                                        </button>

                                    }

                                    <button

                                        onClick={() => handleDelete(item._id)}

                                        className="bg-red-600 text-white px-4 py-2 rounded"

                                    >

                                        Delete

                                    </button>

                                </div>

                            </div>

                        </div>

                    ))

                }

            </div>

            <Footer />

        </>

    );

}

export default Notifications;
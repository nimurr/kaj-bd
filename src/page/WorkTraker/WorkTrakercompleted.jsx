import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa"; // Importing the back arrow icon
import { IoMdTime } from "react-icons/io";

const WorkTrakercompleted = () => {

    // User details visibility state
    const [detailsVisible, setDetailsVisible] = useState(false);

    // Toggle the details visibility when the user clicks on the profile
    const handleShowDetails = () => {
        setDetailsVisible(!detailsVisible); // Toggle visibility
    }

    return (
        <section className="p-5 ">
            <div className="border border-gray-200 p-5 rounded-lg">
                <div className="flex border border-gray-200 p-2 rounded-lg items-center justify-between gap-5 mb-5 ">
                    <h2 className="text-3xl font-semibold">Work Traker</h2>
                    <span className="text-green-400 bg-green-100 py-1 px-3 rounded-lg">Completed</span>
                </div>

                <h2 className=" border border-purple-300 p-2 rounded-lg text-xl bg-[#ddb3ff] font-semibold capitalize mb-5">Proof of work complete information  </h2>
                <h2 className=" border border-purple-300 p-2 rounded-lg text-xl bg-[#ddb3ff] font-semibold capitalize mb-5">Services Booking Information </h2>

                <div>
                    <div>
                        <h2 className="text-xl font-semibold">Booking Order Date & time</h2>
                        <span className="flex items-center gap-3"><IoMdTime className="!text-purple-400" /> Jun 17, 2025  09:31AM </span>
                    </div>
                </div>




                <div className="flex items-center gap-5 my-5" >
                    <img className="w-20 cursor-pointer rounded-full h-20" onClick={handleShowDetails} src="https://thumbs.dreamstime.com/b/close-up-portrait-young-indian-man-standing-outside-his-forehead-looking-seriously-camera-301326364.jpg" alt="User" />
                    <div>
                        <h2 className="text-2xl font-semibold">Bashar islam  </h2>
                        <p>User</p>
                    </div>
                </div>
            </div>

            {/* Provider Details Section */}
            <div className={`${detailsVisible ? "block" : "hidden"} duration-500`}>
                <div className="w-full md:w-3/4 mx-auto border-2 border-[#778beb] p-2 rounded-lg relative">

                    <div onClick={() => setDetailsVisible(false)} className="absolute bg-[#778beb] p-3 rounded-full -top-5 -left-5 cursor-pointer">
                        <FaArrowLeft className="text-xl text-yellow-50" />
                    </div>

                    {/* Provider Profile Section */}
                    <div className="flex items-center justify-between gap-5 mb-5">
                        <div className="flex items-center gap-5">
                            <img
                                className="w-24 h-24 rounded-full"
                                src="https://via.placeholder.com/150"  // Placeholder image
                                alt="Provider"
                            />
                            <h1 className="text-2xl font-semibold">Imran Khan</h1>
                        </div>
                    </div>

                    {/* Provider Details Section */}
                    <div className="space-y-3">
                        <div className="flex items-center justify-between py-3 border-2 p-2 rounded-lg border-[#ccc]">
                            <span className="font-semibold">Name</span>
                            <span>Imran Khan</span>
                        </div>
                        <div className="flex items-center justify-between py-3 border-2 p-2 rounded-lg border-[#ccc]">
                            <span className="font-semibold">Work Type</span>
                            <span>AC-repair</span>
                        </div>
                        <div className="flex items-center justify-between py-3 border-2 p-2 rounded-lg border-[#ccc]">
                            <span className="font-semibold">Years of Experience</span>
                            <span>4 Years</span>
                        </div>
                        <div className="flex items-center justify-between py-3 border-2 p-2 rounded-lg border-[#ccc]">
                            <span className="font-semibold">Email</span>
                            <span>Support@gmail.com</span>
                        </div>
                        <div className="flex items-center justify-between py-3 border-2 p-2 rounded-lg border-[#ccc]">
                            <span className="font-semibold">Phone Number</span>
                            <span>1233333333</span>
                        </div>
                        <div className="flex items-center justify-between py-3 border-2 p-2 rounded-lg border-[#ccc]">
                            <span className="font-semibold">Gender</span>
                            <span>Male</span>
                        </div>
                        <div className="flex items-center justify-between py-3 border-2 p-2 rounded-lg border-[#ccc]">
                            <span className="font-semibold">Date of Birth</span>
                            <span>11-11-1999</span>
                        </div>
                        <div className="flex items-center justify-between py-3 border-2 p-2 rounded-lg border-[#ccc]">
                            <span className="font-semibold">Address</span>
                            <span>Rangpur Bangladesh</span>
                        </div>
                        <div className=" py-3 border-2 p-2 rounded-lg border-[#ccc]">
                            <span className="font-semibold block">Other Documents</span>
                            <div>
                                <span>NID/Driving License/Passport (Font Side) Image </span>
                                <img className="w-full mt-1" src="https://imgv2-1-f.scribdassets.com/img/document/658369930/original/352985ad62/1?v=1" alt="" />
                            </div>

                            <div>
                                <span>NID/Driving License/Passport (Back Side) Image</span>
                                <img className="w-full mt-1" src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/NID_%28Back%29.png/250px-NID_%28Back%29.png" alt="" />
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </section >
    );
};

export default WorkTrakercompleted;

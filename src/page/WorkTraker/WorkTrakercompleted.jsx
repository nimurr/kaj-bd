import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa"; // Importing the back arrow icon

const WorkTrakercompleted = () => {

    // User details visibility state
    const [detailsVisible, setDetailsVisible] = useState(false);

    // Toggle the details visibility when the user clicks on the profile
    const handleShowDetails = () => {
        setDetailsVisible(!detailsVisible); // Toggle visibility
    }

    return (
        <section>
            <div>
                <div onClick={handleShowDetails}>
                    <img src="https://thumbs.dreamstime.com/b/close-up-portrait-young-indian-man-standing-outside-his-forehead-looking-seriously-camera-301326364.jpg" alt="User" />
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

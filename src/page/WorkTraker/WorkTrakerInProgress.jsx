

import { useState } from "react";
import { FaArrowLeft, FaStar } from "react-icons/fa";
import { IoLocationSharp, IoTime } from "react-icons/io5";
import { SiCcleaner } from "react-icons/si";
import { Link } from "react-router-dom";

const workData = {
    status: "In Progress",
    bookingDateTime: "Jun 17, 2025 09:31AM",
    duration: "Jun 17, 2025  09:31AM",
    completionDateTime: "Jun 18, 2025 09:31AM",
    address: "Rampura Dhaka, Bangladesh",
    proofImage: "/image/floor.png",
    services: [
        {
            name: "Home cleaning",
            startPrice: 30.9,
            otherParts: 500,
            totalCost: 530.9,
        },
    ],
    user: {
        name: "Bashar Islam",
        email: "support@gmail.com",
        phone: "1233333333",
        gender: "Male",
        dob: "11-11-1999",
        address: "Rangpur Bangladesh",
        workType: "Home cleaning",
        rating: 4.5,
        image:
            "https://thumbs.dreamstime.com/b/close-up-portrait-young-indian-man-standing-outside-his-forehead-looking-seriously-camera-301326364.jpg",
    },
    provider: {
        name: "Ripon Mia",
        email: "support@gmail.com",
        phone: "1233333333",
        gender: "Male",
        dob: "11-11-1999",
        address: "Rangpur Bangladesh",
        workType: "Home cleaning",
        experience: "4 Years",
        rating: 4.5,
        image: "https://via.placeholder.com/150",
        nidFront:
            "https://imgv2-1-f.scribdassets.com/img/document/658369930/original/352985ad62/1?v=1",
        nidBack:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/NID_%28Back%29.png/250px-NID_%28Back%29.png",
    },
};

const WorkTrakerInProgress = () => {
    const [detailsVisible, setDetailsVisible] = useState(false);
    const [viewTarget, setViewTarget] = useState(null);

    const handleShowDetails = (target) => {
        setDetailsVisible(true);
        setViewTarget(target);
    };

    const handleBack = () => {
        setDetailsVisible(false);
        setViewTarget(null);
    };

    const selectedPerson =
        viewTarget === "user" ? workData.user : workData.provider;

    return (
        <section className={`p-5 ${detailsVisible && "flex gap-5 items-start"}`}>
            {/* Summary Section */}
            <div className="border border-gray-200 p-5 rounded-lg w-full">
                <div className="flex items-center justify-between mb-8">
                    <Link to={'/work-traker'} className="text-3xl font-semibold flex items-center gap-2"><FaArrowLeft /> Work Tracker</Link>
                    <span
                        className={`py-1 px-3 rounded-lg text-white ${workData.status === "Completed"
                            ? "bg-green-500"
                            : workData.status === "In Progress"
                                ? "bg-yellow-500"
                                : "bg-red-500"
                            }`}
                    >
                        {workData.status}
                    </span>
                </div>

                <h2 className="border p-2 rounded-lg text-xl font-semibold bg-blue-100 mb-5">
                    Services Booking Information
                </h2>

                <div className="border-t-2 border-b-2 border-dashed border-gray-300 my-5 py-2">
                    <h2 className="text-xl font-semibold mb-2">Working Address</h2>
                    <span className="flex items-center gap-2 text-gray-600">
                        <IoLocationSharp className="text-[#778aebe0] text-2xl" /> {workData.address}
                    </span>
                </div>
                <div className="my-5">
                    <h2 className="text-xl font-semibold">Booking Order Date & time</h2>
                    <span className="flex items-center gap-2 text-gray-600">
                        <IoTime className="text-[#778aebe0]" /> {workData.duration}
                    </span>
                </div>

                <h2 className="flex items-center justify-between gap-5 border p-2 rounded-lg bg-blue-100 text-xl font-semibold">
                    <span className="flex items-center gap-2">
                        <SiCcleaner className="text-[#778aebe0]" /> Home Cleaning
                    </span>
                    <span>
                        Services Start from Price:
                        <span className="text-[#778aebe0] text-2xl font-semibold">
                            ${workData.services[0].startPrice}
                        </span>
                    </span>
                </h2>

                {/* User and Provider */}
                {["user", "provider"].map((role) => {
                    const person = workData[role];
                    return (
                        <div
                            key={role}
                            className="flex items-center gap-5 my-5 border p-3 rounded-lg cursor-pointer"
                            onClick={() => handleShowDetails(role)}
                        >
                            <img
                                className="w-20 h-20 rounded-full"
                                src={person.image}
                                alt={person.name}
                            />
                            <div>
                                <h2 className="text-2xl font-semibold">{person.name}</h2>
                                <p>{person.workType}</p>
                                {person.rating && (
                                    <span className="flex items-center gap-2 bg-[#778aebe0] rounded-full justify-center text-white py-1 px-3 mt-1">
                                        {person.rating} <FaStar />
                                    </span>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Details Drawer */}
            {detailsVisible && (
                <div className="w-full md:w-2/5 border-2 border-blue-400 p-4 rounded-lg relative">
                    <div
                        onClick={handleBack}
                        className="absolute bg-[#778aebe0] p-3 rounded-full -top-5 -left-5 cursor-pointer"
                    >
                        <FaArrowLeft className="text-white text-xl" />
                    </div>
                    <div className="flex items-center gap-5 mb-5">
                        <img
                            className="w-24 h-24 rounded-full"
                            src={selectedPerson.image}
                            alt={selectedPerson.name}
                        />
                        <h1 className="text-2xl font-semibold">{selectedPerson.name}</h1>
                    </div>

                    <div className="space-y-3">
                        <InfoRow label="Name" value={selectedPerson.name} />
                        <InfoRow label="Work Type" value={selectedPerson.workType} />
                        {selectedPerson.experience && (
                            <InfoRow label="Years of Experience" value={selectedPerson.experience} />
                        )}
                        <InfoRow label="Email" value={selectedPerson.email} />
                        <InfoRow label="Phone Number" value={selectedPerson.phone} />
                        <InfoRow label="Gender" value={selectedPerson.gender} />
                        <InfoRow label="Date of Birth" value={selectedPerson.dob} />
                        <InfoRow label="Address" value={selectedPerson.address} />

                        {/* Show NID images only for provider */}
                        {viewTarget === "provider" && (
                            <div className="py-3 border p-2 rounded-lg border-gray-300">
                                <span className="font-semibold block mb-1">Other Documents</span>
                                <div className="mb-2">
                                    <span className="block mb-1">NID/Driving License/Passport (Front Side)</span>
                                    <img
                                        className="w-full rounded-md"
                                        src={workData.provider.nidFront}
                                        alt="NID Front"
                                    />
                                </div>
                                <div>
                                    <span className="block mb-1">NID/Driving License/Passport (Back Side)</span>
                                    <img
                                        className="w-full rounded-md"
                                        src={workData.provider.nidBack}
                                        alt="NID Back"
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </section>
    );
};

const InfoRow = ({ label, value }) => (
    <div className="flex items-center justify-between py-2 border p-2 rounded-lg border-gray-300">
        <span className="font-semibold">{label}</span>
        <span>{value}</span>
    </div>
);

export default WorkTrakerInProgress;

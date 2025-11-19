import { useState } from "react";
import { FaArrowLeft, FaStar } from "react-icons/fa";
import { IoLocationSharp, IoTime } from "react-icons/io5";
import { SiCcleaner } from "react-icons/si";
import { Link, useParams } from "react-router-dom";
import { useGetFullCompletedWorkTrakerQuery } from "../../redux/features/WorkTraker/workTraker";
import moment from "moment";
import Url from "../../redux/baseApi/forImageUrl";
import { Image } from "antd";

const workData = {
    status: "Completed",
    bookingDateTime: "Jun 17, 2025 09:31AM",
    duration: "1 Day",
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

const WorkTrakercompleted = () => {

    const { id } = useParams();

    const { data } = useGetFullCompletedWorkTrakerQuery(id);
    const fullCompletedData = data?.data?.attributes;

    console.log(fullCompletedData)

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
                    Proof of work complete information
                </h2>

                <h2 className="border p-2 rounded-lg text-xl font-semibold bg-blue-100 mb-5">
                    Services Booking Information
                </h2>

                <div className="border p-5 rounded-lg flex flex-wrap gap-5 justify-between">
                    <div>
                        <h2 className="text-xl font-semibold">Booking Order Date & Time</h2>
                        <span className="flex items-center gap-2 text-gray-600">
                            <IoTime className="text-[#778aebe0]" /> {moment(fullCompletedData?.serviceBooking?.bookingDateTime).format("MMM DD, YYYY hh:mm A")}
                        </span>
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold">Duration Time</h2>
                        <span className="flex items-center gap-2 text-gray-600">
                            <IoTime className="text-[#778aebe0]" /> {fullCompletedData?.serviceBooking?.duration} day
                        </span>
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold">Completion Date & Time</h2>
                        <span className="flex items-center gap-2 text-gray-600">
                            <IoTime className="text-[#778aebe0]" /> {moment(fullCompletedData?.serviceBooking?.completionDateTime).format("MMM DD, YYYY hh:mm A")}
                        </span>
                    </div>
                </div>

                <div className="border-t-2 border-b-2 border-dashed border-gray-300 my-5 py-2">
                    <h2 className="text-xl font-semibold mb-2">Working Address</h2>
                    <span className="flex items-center gap-2 text-gray-600">
                        <IoLocationSharp className="text-[#778aebe0] text-2xl" /> {fullCompletedData?.serviceBooking?.address?.en}
                    </span>
                </div>

                <div className="border p-3 rounded-lg">
                    <h2 className="mb-2 text-xl font-semibold">Proof of work</h2>
                    <div className="space-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {
                            fullCompletedData?.serviceBooking?.attachments?.map((img, idx) => (
                                img?.attachmentType == "image" ?
                                    <Image
                                        key={idx}
                                        className="w-full  rounded-lg"
                                        src={img?.attachment?.includes('amazonaws') ? img?.attachment : Url + img?.attachment}
                                        alt="Proof"
                                    />
                                    :
                                    <iframe src={img?.attachment?.includes('amazonaws') ? img?.attachment : Url + img?.attachment} width="100%" frameborder="0"></iframe>
                            ))
                        }
                    </div>

                </div>

                <div className="border p-3 my-5 rounded-lg">
                    <h2 className="mb-2 text-xl font-semibold">Services Payment Summary</h2>
                    <div className="space-y-2">
                        <div className="flex justify-between bg-blue-100 p-2 rounded-lg">
                            <span className="font-medium text-base">Initial Cost</span>
                            <span>
                                Start from: <span className="text-[#778aebe0] font-bold text-xl">৳{fullCompletedData?.serviceBooking.startPrice}</span>
                            </span>
                        </div>
                        {
                            fullCompletedData?.additionalCosts?.map((s, index) => (
                                <div key={index} className="flex justify-between bg-blue-100 p-2 rounded-lg">
                                    <span className="font-medium text-base">{s.costName}</span>
                                    <span className="text-[#778aebe0] font-bold text-xl">৳{s.price}</span>
                                </div>
                            ))
                        }
                        <hr />
                        <div className="flex justify-between bg-green-100 p-2 rounded-lg">
                            <span className="font-medium text-base">Sub Total Cost</span>
                            <span className="text-[#778aebe0] font-bold text-xl">৳{fullCompletedData?.serviceBooking?.totalCost}</span>
                        </div>
                        <div className="flex justify-between bg-blue-100 p-2 rounded-lg">
                            <span className="font-medium text-base">Admin Percentage Of Start Price</span>
                            <span className="text-[#778aebe0] font-bold text-xl">-৳{fullCompletedData?.serviceBooking?.adminPercentageOfStartPrice.toFixed(2) || 0}</span>
                        </div>
                        <div className="flex justify-between bg-green-100 p-2 rounded-lg">
                            <span className="font-semibold text-xl">Total Cost</span>
                            <span className="text-[#778aebe0] font-bold text-xl">৳{fullCompletedData?.serviceBooking?.totalCost - fullCompletedData?.serviceBooking?.adminPercentageOfStartPrice || 0}</span>
                        </div>
                    </div>

                </div>

                {/* <h2 className="flex items-center justify-between gap-5 border p-2 rounded-lg bg-blue-100 text-xl font-semibold">
                    <span className="flex items-center gap-2">
                        <SiCcleaner className="text-[#778aebe0]" /> Home Cleaning
                    </span>
                    <span>
                        Services Start from Price:
                        <span className="text-[#778aebe0] text-2xl font-semibold">
                            ${workData.services[0].startPrice}
                        </span>
                    </span>
                </h2> */}

                {/* User and Provider */}
                {["user", "provider"].map((role) => {
                    const person = workData[role];
                    const personRole = role === "user" ? fullCompletedData?.serviceBooking?.userId : fullCompletedData?.serviceBooking?.providerId;
                    return (
                        <div>
                            <div
                                className="flex items-center gap-5 my-5 border p-3 rounded-lg cursor-pointer"
                                onClick={() => handleShowDetails(role)}
                            >
                                <img
                                    className="w-20 h-20 rounded-full"
                                    src={personRole.profileImage?.imageUrl.includes('amazonaws') ? personRole.profileImage?.imageUrl : Url + personRole.profileImage?.imageUrl}
                                    alt={personRole.name}
                                />
                                <div>
                                    {/* // role show here  */}
                                    <h2 className="text-2xl font-semibold">{personRole.providerId ? personRole.name : personRole.name}</h2>
                                    <h2 className="text-xl font-medium text-gray-500">{role === "user" ? "User" : "Provider"}</h2>
                                </div>
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
                        <Image
                            className="max-w-20 max-h-20 w-full h-full rounded-full"
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

export default WorkTrakercompleted;